import base64
import json
import logging
import os
from typing import Any, Dict, Optional

import requests
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


class EvolutionClient:
    """Helper around the Evolution API with optional per-tenant credentials."""

    def __init__(
        self,
        base_url: Optional[str] = None,
        instance_id: Optional[str] = None,
        token: Optional[str] = None,
        admin_token: Optional[str] = None,
    ) -> None:
        self.base_url = (base_url or os.getenv("EVOLUTION_BASE_URL", "")).rstrip("/")
        self.instance_id = instance_id or os.getenv("EVOLUTION_INSTANCE_ID", "")
        self.token = token or os.getenv("EVOLUTION_TOKEN", "")
        self.admin_token = admin_token or os.getenv("EVOLUTION_ADMIN_API_KEY", "")

    @property
    def is_configured(self) -> bool:
        return all([self.base_url, self.instance_id, self.token])

    def _auth_headers(self) -> Dict[str, str]:
        return {"Authorization": f"Bearer {self.token}", "apikey": self.token}

    def _admin_headers(self) -> Dict[str, str]:
        if not self.admin_token:
            raise RuntimeError("Evolution admin token not configured")
        headers: Dict[str, str] = {
            "Authorization": f"Bearer {self.admin_token}",
        }
        if self.token:
            headers["apikey"] = self.token
        else:
            headers["apikey"] = self.admin_token
        return headers

    @classmethod
    def from_values(
        cls,
        *,
        base_url: Optional[str],
        instance_id: Optional[str],
        token: Optional[str],
        admin_token: Optional[str] = None,
    ) -> "EvolutionClient":
        return cls(
            base_url=base_url,
            instance_id=instance_id,
            token=token,
            admin_token=admin_token,
        )

    def send_text_message(
        self,
        phone_number: str,
        text: str,
        *,
        quoted_message_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        if not self.is_configured:
            logger.info("Evolution API not configured. Returning mocked response for %s", phone_number)
            return {
                "mocked": True,
                "phoneNumber": phone_number,
                "text": text,
            }

        payload: Dict[str, Any] = {"number": phone_number, "text": text}
        if quoted_message_id:
            payload["quotedMessageId"] = quoted_message_id
        url = f"{self.base_url}/message/sendText/{self.instance_id}"
        response = requests.post(url, headers=self._auth_headers(), json=payload, timeout=15)
        response.raise_for_status()
        return response.json()

    def send_audio_message(
        self,
        phone_number: str,
        data: bytes,
        *,
        filename: str = "audio.ogg",
        mime_type: str = "audio/ogg",
        media_url: Optional[str] = None,
        as_voice_note: bool = False,  # compativel, ignorado
        quoted_message_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        if not self.is_configured:
            logger.info("Evolution API not configured. Skipping audio send to %s", phone_number)
            return {"mocked": True, "phoneNumber": phone_number}
        url_media = f"{self.base_url}/message/sendMedia/{self.instance_id}"
        encoded = base64.b64encode(data).decode("ascii")
        # Evolution aceita conteúdo hospedado em URL pública ou base64 puro.
        # Para evitar timeouts com uploads diretos, usamos sempre base64,
        # independente de termos salvo o arquivo em um endpoint público.
        media_value = encoded
        payload: Dict[str, Any] = {
            "number": phone_number,
            "type": "audio",
            "mediaType": "audio",
            "mediatype": "audio",
            "media": media_value,
            "fileName": filename,
            "mimeType": mime_type,
        }
        if quoted_message_id:
            payload["quotedMessageId"] = quoted_message_id
        response = requests.post(url_media, headers=self._auth_headers(), json=payload, timeout=30)
        try:
            response.raise_for_status()
        except requests.HTTPError as exc:  # type: ignore[name-defined]
            body = response.text[:500]
            raise requests.HTTPError(f"{exc} - body: {body}", response=response) from exc
        logger.info(
            "Evolution sendMedia response (status=%s): %s",
            response.status_code,
            response.text[:200],
        )
        return response.json()

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
            logger.info("Evolution API not configurada. Ignorando envio de arquivo para %s", phone_number)
            return {"mocked": True, "phoneNumber": phone_number}
        url_media = f"{self.base_url}/message/sendMedia/{self.instance_id}"
        encoded = base64.b64encode(data).decode("ascii")
        payload = {
            "number": phone_number,
            "type": media_category.lower() if media_category else "document",
            "mediaType": media_category.lower(),
            "mediatype": media_category.lower(),
            "media": encoded,
            "fileName": filename,
            "mimeType": mime_type,
            "text": caption or "",
        }
        if quoted_message_id:
            payload["quotedMessageId"] = quoted_message_id
        response = requests.post(url_media, headers=self._auth_headers(), json=payload, timeout=30)
        try:
            response.raise_for_status()
        except requests.HTTPError as exc:  # type: ignore[name-defined]
            body = response.text[:500]
            raise requests.HTTPError(f"{exc} - body: {body}", response=response) from exc
        logger.info(
            "Evolution sendMedia file response (status=%s): %s",
            response.status_code,
            response.text[:200],
        )
        return response.json()

    def download_media(self, media_url: str, *, return_headers: bool = False):
        if not self.is_configured:
            raise RuntimeError("Evolution API not configured")
        response = requests.get(media_url, headers=self._auth_headers(), timeout=60)
        response.raise_for_status()
        if return_headers:
            return response.content, response.headers
        return response.content

    def fetch_instance_qr(self) -> Optional[str]:
        if not self.is_configured:
            return None
        url = f"{self.base_url}/instance/connect/{self.instance_id}"
        response = requests.get(url, headers=self._admin_headers(), timeout=15)
        if response.status_code != 200:
            logger.warning("Could not fetch QR from Evolution API: %s", response.text)
            return None
        data = response.json()
        if isinstance(data, dict):
            return data.get("base64") or data.get("qr")
        return json.dumps(data)
