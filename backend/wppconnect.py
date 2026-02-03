import base64
import logging
from typing import Any, Dict, Optional

import requests

logger = logging.getLogger(__name__)


class WPPConnectClient:
    """Cliente simplificado para gateways baseados em WPPConnect."""

    def __init__(
        self,
        *,
        base_url: Optional[str],
        session_name: Optional[str],
        token: Optional[str] = None,
    ) -> None:
        self.base_url = (base_url or "").rstrip("/")
        self.session_name = (session_name or "").strip()
        self.token = token or ""

    @property
    def is_configured(self) -> bool:
        return bool(self.base_url and self.session_name)

    def _headers(self) -> Dict[str, str]:
        headers: Dict[str, str] = {}
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        return headers

    def _ensure_configured(self) -> None:
        if not self.is_configured:
            raise RuntimeError("Gateway WPPConnect nao configurado")

    def send_text_message(
        self,
        phone_number: str,
        text: str,
        *,
        quoted_message_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        self._ensure_configured()
        payload = {"phone": phone_number, "message": text}
        if quoted_message_id:
            payload["quotedMessageId"] = quoted_message_id
        url = f"{self.base_url}/api/{self.session_name}/send-message"
        response = requests.post(url, headers=self._headers(), json=payload, timeout=30)
        try:
            response.raise_for_status()
        except requests.HTTPError as exc:  # pragma: no cover - rede externa
            logger.error("Erro WPPConnect send-message: %s", response.text[:200])
            raise requests.HTTPError(
                f"{exc} - body: {response.text[:500]}", response=response
            ) from exc
        return response.json()

    def send_audio_message(
        self,
        phone_number: str,
        data: bytes,
        *,
        filename: str = "audio.ogg",
        mime_type: str = "audio/ogg",
        media_url: Optional[str] = None,  # ignorado, mas mantido por compatibilidade
        as_voice_note: bool = False,  # compatibilidade com interface
        quoted_message_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        self._ensure_configured()
        encoded = base64.b64encode(data).decode("ascii")
        payload = {
            "phone": phone_number,
            "filename": filename,
            "base64": f"data:{mime_type};base64,{encoded}",
            "isAudio": True,
        }
        if quoted_message_id:
            payload["quotedMessageId"] = quoted_message_id
        url = f"{self.base_url}/api/{self.session_name}/send-file-base64"
        response = requests.post(url, headers=self._headers(), json=payload, timeout=60)
        try:
            response.raise_for_status()
        except requests.HTTPError as exc:  # pragma: no cover
            logger.error("Erro WPPConnect send-file-base64: %s", response.text[:200])
            raise requests.HTTPError(
                f"{exc} - body: {response.text[:500]}", response=response
            ) from exc
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
        self._ensure_configured()
        encoded = base64.b64encode(data).decode("ascii")
        payload = {
            "phone": phone_number,
            "filename": filename,
            "base64": f"data:{mime_type};base64,{encoded}",
            "caption": caption or "",
            "isAudio": media_category.lower() == "audio",
        }
        if quoted_message_id:
            payload["quotedMessageId"] = quoted_message_id
        url = f"{self.base_url}/api/{self.session_name}/send-file-base64"
        response = requests.post(url, headers=self._headers(), json=payload, timeout=60)
        try:
            response.raise_for_status()
        except requests.HTTPError as exc:  # pragma: no cover
            logger.error("Erro WPPConnect send-file-base64: %s", response.text[:200])
            raise requests.HTTPError(
                f"{exc} - body: {response.text[:500]}", response=response
            ) from exc
        return response.json()
