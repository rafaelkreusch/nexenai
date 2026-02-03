import logging
import os
import subprocess
import tempfile
from pathlib import Path
from typing import Optional, Tuple


logger = logging.getLogger("chatdevalor.audio")


def _convert_to_ogg_opus(data: bytes) -> Optional[bytes]:
    """Attempt to transcode arbitrary audio into an OGG/Opus mono file."""
    if not data:
        return None
    try:
        import imageio_ffmpeg  # type: ignore
    except Exception as exc:  # pragma: no cover - dependency missing
        logger.debug("imageio_ffmpeg indisponivel para conversao: %s", exc)
        return None

    src_fd, src_name = tempfile.mkstemp(suffix=".audio")
    dst_fd, dst_name = tempfile.mkstemp(suffix=".ogg")
    os.close(src_fd)
    os.close(dst_fd)
    src_path = Path(src_name)
    dst_path = Path(dst_name)
    try:
        src_path.write_bytes(data)
        cmd = [
            imageio_ffmpeg.get_ffmpeg_exe(),
            "-y",
            "-i",
            str(src_path),
            "-vn",
            "-ac",
            "1",
            "-c:a",
            "libopus",
            "-b:a",
            os.getenv("AUDIO_VOICE_NOTE_BITRATE", "24000"),
            str(dst_path),
        ]
        timeout = int(os.getenv("AUDIO_CONVERT_TIMEOUT", "25"))
        completed = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True,
            timeout=timeout,
        )
        converted = dst_path.read_bytes()
        if not converted:
            logger.warning("Conversao de audio retornou arquivo vazio. stderr=%s", completed.stderr[:200])
            return None
        return converted
    except subprocess.CalledProcessError as exc:  # pragma: no cover - depends on ffmpeg
        stderr = exc.stderr.decode("utf-8", "ignore") if exc.stderr else str(exc)
        logger.warning("FFmpeg falhou convertendo audio: %s", stderr)
        return None
    except Exception as exc:  # pragma: no cover - defensivo
        logger.warning("Erro desconhecido convertendo audio: %s", exc)
        return None
    finally:
        try:
            src_path.unlink(missing_ok=True)
        except Exception:  # pragma: no cover - defensivo
            pass
        try:
            dst_path.unlink(missing_ok=True)
        except Exception:  # pragma: no cover - defensivo
            pass


def ensure_voice_note_audio(
    data: bytes,
    *,
    filename: Optional[str],
    content_type: Optional[str],
) -> Tuple[bytes, str, str, bool]:
    """
    Garantir que o blob esteja pronto para ser enviado como ptt:
    - Converte para OGG/Opus quando possivel;
    - Normaliza nome e content-type.
    Retorna (data, filename, content_type, converted?)
    """
    sanitized_name = filename or "audio-message.ogg"
    sanitized_type = (content_type or "").lower()
    if ";" in sanitized_type:
        sanitized_type = sanitized_type.split(";", 1)[0].strip()
    lowered_name = sanitized_name.lower()
    already_voice_note = any(
        token in sanitized_type for token in ("ogg", "opus")
    ) or lowered_name.endswith((".ogg", ".opus"))
    if already_voice_note:
        final_name = sanitized_name if Path(sanitized_name).suffix else f"{sanitized_name}.ogg"
        return data, final_name, "audio/ogg", False

    converted = _convert_to_ogg_opus(data)
    if not converted:
        fallback_type = (content_type or "audio/webm").split(";", 1)[0].strip() or "audio/webm"
        return data, sanitized_name, fallback_type, False

    base = Path(sanitized_name).stem or "audio-message"
    final_name = f"{base}.ogg"
    return converted, final_name, "audio/ogg", True
