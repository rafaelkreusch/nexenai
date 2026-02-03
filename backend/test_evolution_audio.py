import argparse
import base64
import pathlib
from typing import Dict, List

import requests


def auth_headers(token: str) -> Dict[str, str]:
    return {"Authorization": f"Bearer {token}", "apikey": token}


def send_variant(name: str, url: str, payload=None, data=None, files=None, headers=None, json=None):
    print(f"\n=== Testando {name} ===")
    try:
        response = requests.post(
            url,
            headers=headers,
            data=data,
            files=files,
            json=json,
            timeout=30,
        )
        print(f"Status: {response.status_code}")
        print(f"Body: {response.text[:500]}")
    except Exception as exc:
        print(f"Erro: {exc}")


def main():
    parser = argparse.ArgumentParser(description="Testar envio de áudio para Evolution em múltiplos formatos.")
    parser.add_argument("--base-url", required=True, help="URL base da Evolution (ex: https://evolutionapi.seudominio.com)")
    parser.add_argument("--instance-id", required=True, help="ID da instância (ex: minha-instancia)")
    parser.add_argument("--token", required=True, help="Token da instância")
    parser.add_argument("--number", required=True, help="Número destino com DDI (ex: 5547999999999)")
    parser.add_argument("--file", required=True, help="Arquivo de áudio (ogg/webm/mp3)")
    args = parser.parse_args()

    base = args.base_url.rstrip("/")
    instance = args.instance_id
    headers = auth_headers(args.token)
    audio_path = pathlib.Path(args.file)
    data_bytes = audio_path.read_bytes()
    mime = {
        ".ogg": "audio/ogg",
        ".webm": "audio/webm",
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
    }.get(audio_path.suffix.lower(), "audio/ogg")

    # Variant 1: sendVoice (multipart)
    files = {"audio": (audio_path.name, data_bytes, mime)}
    payload = {"number": args.number}
    send_variant(
        "sendVoice",
        f"{base}/message/sendVoice/{instance}",
        data=payload,
        files=files,
        headers=headers,
    )

    # Variant 2: sendAudio (multipart)
    send_variant(
        "sendAudio",
        f"{base}/message/sendAudio/{instance}",
        data=payload,
        files=files,
        headers=headers,
    )

    # Variant 3: sendMedia com URL data
    data_url = f"data:{mime};base64,{base64.b64encode(data_bytes).decode('ascii')}"
    payload_media_url = {
        "number": args.number,
        "type": "audio",
        "mediaType": "audio",
        "mediatype": "audio",
        "media": data_url,
        "fileName": audio_path.name,
        "mimeType": mime,
    }
    send_variant(
        "sendMedia(data-url)",
        f"{base}/message/sendMedia/{instance}",
        json=payload_media_url,
        headers=headers,
    )

    # Variant 4: sendMedia com base64 puro
    payload_media_base64 = payload_media_url.copy()
    payload_media_base64["media"] = base64.b64encode(data_bytes).decode("ascii")
    send_variant(
        "sendMedia(base64 puro)",
        f"{base}/message/sendMedia/{instance}",
        json=payload_media_base64,
        headers=headers,
    )


if __name__ == "__main__":
    main()
