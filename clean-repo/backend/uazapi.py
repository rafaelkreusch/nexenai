import base64
import logging
from typing import Any, Dict, Iterable, Optional, List

import requests

logger = logging.getLogger(__name__)


class UazapiClient:
    """Cliente auxiliar para a Uazapi."""

    def __init__(
        self,
        *,
        base_url: Optional[str],
        instance_id: Optional[str],
        token: Optional[str],
    ) -> None:
        self.base_url = (base_url or "").rstrip("/")
        self.instance_id = (instance_id or "").strip()
        self.token = (token or "").strip()
        self.session = requests.Session()
        self.session.trust_env = False

    @property
    def is_configured(self) -> bool:
        return bool(self.base_url and self.instance_id and self.token)

    def _headers(self) -> Dict[str, str]:
        headers: Dict[str, str] = {
            "accept": "application/json",
            "Content-Type": "application/json",
        }
        if self.token:
            # Os endpoints da Uazapi esperam o token da instância no header `token`.
            headers["token"] = self.token
        return headers

    def _post_variants(
        self, paths: Iterable[str], payload: Dict[str, Any], timeout: int = 30
    ) -> requests.Response:
        """
        Tenta enviar o payload para uma lista de caminhos diferentes.

        Alguns tenants da Uazapi expoem variacoes (ex: /send/media ou /message/sendFileBase64/{session}).
        Antes de abortar com erro, tentamos percorrer todas as alternativas disponiveis.
        """
        last_error: Optional[Exception] = None
        last_response: Optional[requests.Response] = None
        for path in paths:
            url = f"{self.base_url}{path}"
            try:
                response = self.session.post(
                    url, headers=self._headers(), json=payload, timeout=timeout
                )
            except requests.RequestException as exc:  # pragma: no cover - rede externa
                logger.warning("Erro ao chamar Uazapi (%s): %s", url, exc)
                last_error = exc
                continue

            if response.status_code in {404, 405}:
                logger.info("Endpoint Uazapi %s nao aceitou a requisicao (status %s)", path, response.status_code)
                last_response = response
                continue

            if response.status_code >= 500:
                body = response.text[:500]
                logger.error(
                    "Uazapi retornou erro %s em %s: %s",
                    response.status_code,
                    path,
                    body,
                )
                last_error = requests.HTTPError(f"HTTP {response.status_code} - body: {body}", response=response)
                continue

            try:
                response.raise_for_status()
            except requests.HTTPError as exc:
                body = response.text[:500]
                logger.error(
                    "Uazapi retornou erro %s em %s: %s",
                    response.status_code,
                    path,
                    body,
                )
                raise requests.HTTPError(f"{exc} - body: {body}", response=response) from exc
            return response

        if last_error:
            raise last_error

        if last_response is not None:
            last_response.raise_for_status()

        raise RuntimeError("Nenhum endpoint Uazapi aceitou o envio.")

    def send_text_message(
        self,
        phone_number: str,
        text: str,
        *,
        quoted_message_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        payload: Dict[str, Any] = {
            "number": phone_number,
            "text": text,
        }
        if self.instance_id:
            payload["session"] = self.instance_id
        if quoted_message_id:
            payload["replyid"] = quoted_message_id
            # Campos extras por compatibilidade com variantes antigas
            payload["quotedMessageId"] = quoted_message_id
            payload["quoted"] = quoted_message_id
            payload["replyMessageId"] = quoted_message_id
        paths = [
            "/send/text",
            f"/message/sendText/{self.instance_id}",
            "/message/sendText",
        ]
        response = self._post_variants(paths, payload)
        logger.info("Uazapi sendText status=%s body=%s", response.status_code, response.text[:200])
        return response.json()

    def send_audio_message(
        self,
        phone_number: str,
        data: bytes,
        *,
        filename: str = "audio.ogg",
        mime_type: str = "audio/ogg",
        media_url: Optional[str] = None,
        as_voice_note: bool = False,
        quoted_message_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        encoded = base64.b64encode(data).decode("ascii")
        # A Uazapi aceita URLs ou base64 no campo `file`, mas servidores free costumam falhar
        # para baixar via HTTPS (principalmente URLs expostas por ngrok). Forcamos o envio
        # inline em base64 para nao depender de download externo.
        file_value = encoded
        base_payload: Dict[str, Any] = {
            "number": phone_number,
            "file": file_value,
            "text": "",
            "docName": filename,
            "mimetype": mime_type,
        }
        if self.instance_id:
            base_payload["session"] = self.instance_id
        if quoted_message_id:
            base_payload["replyid"] = quoted_message_id
            base_payload["quotedMessageId"] = quoted_message_id
            base_payload["quoted"] = quoted_message_id
            base_payload["replyMessageId"] = quoted_message_id
        paths = [
            "/send/media",
            f"/message/sendFileBase64/{self.instance_id}",
            "/message/sendFileBase64",
        ]
        type_candidates: List[str]
        lowered_mime = (mime_type or "").lower()
        mime_main = lowered_mime.split(";", 1)[0].strip()
        lowered_name = (filename or "").lower()
        effective_voice = as_voice_note or mime_main in {"audio/ogg", "audio/opus", "application/ogg"} or lowered_name.endswith(
            (".ogg", ".opus")
        )
        if effective_voice:
            type_candidates = ["ptt", "myaudio", "audio"]
        else:
            type_candidates = ["audio", "document"]

        last_error: Optional[Exception] = None
        for media_type in type_candidates:
            payload = dict(base_payload)
            payload["type"] = media_type
            try:
                response = self._post_variants(paths, payload, timeout=60)
                logger.info(
                    "Uazapi sendFile type=%s status=%s body=%s",
                    media_type,
                    response.status_code,
                    response.text[:200],
                )
                return response.json()
            except Exception as exc:
                logger.warning("Falha Uazapi sendFile type=%s: %s", media_type, exc)
                last_error = exc
                continue
        if last_error:
            raise last_error
        raise RuntimeError("Uazapi nao aceitou o envio de audio")

    def send_media_file(
        self,
        phone_number: str,
        data: bytes,
        *,
        filename: str,
        mime_type: str,
        media_category: str,
        caption: str = "",
        media_url: Optional[str] = None,
        quoted_message_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        encoded = base64.b64encode(data).decode("ascii")
        # Gateways Uazapi free costumam bloquear downloads HTTPS (ngrok etc.),
        # portanto priorizamos sempre o envio inline em base64 para evitar falhas silenciosas.
        file_value = encoded
        base_payload = {
            "number": phone_number,
            "file": file_value,
            "text": caption or "",
            "docName": filename,
            "mimetype": mime_type,
        }
        if self.instance_id:
            base_payload["session"] = self.instance_id
        if quoted_message_id:
            base_payload["replyid"] = quoted_message_id
            base_payload["quotedMessageId"] = quoted_message_id
            base_payload["quoted"] = quoted_message_id
            base_payload["replyMessageId"] = quoted_message_id
        paths = [
            "/send/media",
            f"/message/sendFileBase64/{self.instance_id}",
            "/message/sendFileBase64",
        ]
        category = (media_category or "").lower()
        type_candidates: List[str]
        if category == "image":
            type_candidates = ["image"]
        elif category == "audio":
            type_candidates = ["ptt", "myaudio", "audio"]
        else:
            type_candidates = ["document", "file", "attachment"]

        last_error: Optional[Exception] = None
        for media_type in type_candidates:
            payload = dict(base_payload)
            payload["type"] = media_type
            try:
                response = self._post_variants(paths, payload, timeout=60)
                logger.info(
                    "Uazapi sendFile type=%s status=%s body=%s",
                    media_type,
                    response.status_code,
                    response.text[:200],
                )
                return response.json()
            except Exception as exc:
                logger.warning("Falha Uazapi sendFile type=%s: %s", media_type, exc)
                last_error = exc
                continue
        if last_error:
            raise last_error
        raise RuntimeError("Uazapi nao aceitou o envio de arquivo")

    def send_mass_campaign(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        url = f"{self.base_url}/sender/advanced"
        response = self.session.post(
            url, headers=self._headers(), json=payload, timeout=120
        )
        response.raise_for_status()
        return response.json()

    def list_mass_campaigns(self, status_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        if not self.is_configured:
            return []
        params: Dict[str, Any] = {}
        if status_filter:
            params["status"] = status_filter
        url = f"{self.base_url}/sender/listfolders"
        response = self.session.get(
            url, headers=self._headers(), params=params or None, timeout=30
        )
        response.raise_for_status()
        try:
            data = response.json()
        except ValueError:
            return []
        if isinstance(data, list):
            return data
        return []

    def list_campaign_messages(
        self,
        folder_id: str,
        *,
        message_status: Optional[str] = None,
        page: int = 1,
        page_size: int = 1000,
    ) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        payload: Dict[str, Any] = {
            "folder_id": folder_id,
            "page": max(1, page),
            "pageSize": max(1, min(page_size, 1000)),
        }
        if message_status:
            payload["messageStatus"] = message_status
        url = f"{self.base_url}/sender/listmessages"
        response = self.session.post(
            url, headers=self._headers(), json=payload, timeout=60
        )
        response.raise_for_status()
        return response.json()

    def start_voice_call(self, phone_number: str) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        payload: Dict[str, Any] = {"number": phone_number}
        if self.instance_id:
            payload["session"] = self.instance_id
        url = f"{self.base_url}/call/make"
        response = self.session.post(
            url, headers=self._headers(), json=payload, timeout=30
        )
        response.raise_for_status()
        return response.json()

    def reject_voice_call(self, *, phone_number: Optional[str] = None, call_id: Optional[str] = None) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        payload: Dict[str, Any] = {}
        if phone_number:
            payload["number"] = phone_number
        if call_id:
            payload["id"] = call_id
        if self.instance_id:
            payload["session"] = self.instance_id
        url = f"{self.base_url}/call/reject"
        response = self.session.post(
            url, headers=self._headers(), json=payload or {}, timeout=30
        )
        response.raise_for_status()
        return response.json()

    def fetch_chat_details(self, number: str, preview: bool = False) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        payload: Dict[str, Any] = {
            "number": number,
            "preview": bool(preview),
        }
        if self.instance_id:
            payload["session"] = self.instance_id
        url = f"{self.base_url}/chat/details"
        response = self.session.post(
            url, headers=self._headers(), json=payload, timeout=30
        )
        response.raise_for_status()
        return response.json()

    def connect_instance(self, phone_number: Optional[str] = None) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        payload: Dict[str, Any] = {}
        if phone_number:
            payload["phone"] = phone_number
        url = f"{self.base_url}/instance/connect"
        response = self.session.post(
            url, headers=self._headers(), json=payload or None, timeout=30
        )
        response.raise_for_status()
        return response.json()

    def fetch_instance_status(self) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        url = f"{self.base_url}/instance/status"
        response = self.session.get(
            url, headers=self._headers(), timeout=30
        )
        response.raise_for_status()
        return response.json()

    def delete_instance(self) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi nao configurada")
        url = f"{self.base_url}/instance"
        response = self.session.delete(
            url, headers=self._headers(), timeout=30
        )
        if response.status_code == 404:
            logger.info(
                "Uazapi delete_instance: instancia %s nao encontrada (404)",
                self.instance_id,
            )
            return {"status": "not_found"}
        response.raise_for_status()
        return response.json()


class UazapiAdminClient:
    """Cliente para operaçoes administrativas da Uazapi (provisionamento)."""

    def __init__(self, *, base_url: Optional[str], admin_token: Optional[str]) -> None:
        self.base_url = (base_url or "").rstrip("/")
        self.admin_token = (admin_token or "").strip()
        self.session = requests.Session()
        self.session.trust_env = False

    @property
    def is_configured(self) -> bool:
        return bool(self.base_url and self.admin_token)

    def _headers(self) -> Dict[str, str]:
        if not self.is_configured:
            raise RuntimeError("Admintoken/URL da Uazapi nao configurados.")
        return {
            "accept": "application/json",
            "Content-Type": "application/json",
            "admintoken": self.admin_token,
            "token": self.admin_token,
        }

    def create_instance(
        self,
        *,
        name: str,
        admin_field_01: Optional[str] = None,
        admin_field_02: Optional[str] = None,
        **extra_fields: Any,
    ) -> Dict[str, Any]:
        """
        Cria uma nova instância via /instance/init.

        Retorna o JSON bruto da Uazapi contendo os metadados da instância e o token.
        """
        if not self.is_configured:
            raise RuntimeError("Uazapi admin nao configurada")
        payload: Dict[str, Any] = {"name": name}
        if admin_field_01:
            payload["adminField01"] = admin_field_01
        if admin_field_02:
            payload["adminField02"] = admin_field_02
        for key, value in extra_fields.items():
            if value is not None:
                payload[key] = value
        url = f"{self.base_url}/instance/init"
        response = self.session.post(
            url, headers=self._headers(), json=payload, timeout=30
        )
        response.raise_for_status()
        return response.json()

    def configure_webhook(
        self,
        *,
        url: str,
        events: List[str],
        exclude_messages: Optional[List[str]] = None,
        instance_token: Optional[str] = None,
    ) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi admin nao configurada")
        payload: Dict[str, Any] = {
            "enabled": True,
            "url": url,
            "events": events,
        }
        if instance_token:
            payload["token"] = instance_token
        if exclude_messages:
            payload["excludeMessages"] = exclude_messages
        webhook_url = f"{self.base_url}/webhook"
        response = self.session.post(
            webhook_url, headers=self._headers(), json=payload, timeout=30
        )
        response.raise_for_status()
        return response.json()

    def delete_instance(self) -> Dict[str, Any]:
        if not self.is_configured:
            raise RuntimeError("Uazapi admin nao configurada")
        url = f"{self.base_url}/instance"
        response = self.session.delete(url, headers=self._headers(), timeout=30)
        if response.status_code == 404:
            logger.info("Uazapi admin delete_instance: instancia nao encontrada (404)")
            return {"status": "not_found"}
        response.raise_for_status()
        return response.json()
