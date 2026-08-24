from pathlib import Path

from PIL import Image, UnidentifiedImageError


SUPPORTED_FORMATS = {".jpg", ".jpeg", ".png", ".webp"}


class ImageValidationError(ValueError):
    """Raised when an input image is invalid."""


def validate_image(path: str | Path) -> Image.Image:
    image_path = Path(path)

    if not image_path.exists():
        raise ImageValidationError(f"Image not found: {image_path}")

    if not image_path.is_file():
        raise ImageValidationError(f"Path is not a file: {image_path}")

    if image_path.suffix.lower() not in SUPPORTED_FORMATS:
        raise ImageValidationError(
            f"Unsupported image format: {image_path.suffix}"
        )

    try:
        image = Image.open(image_path)
        image.verify()

        # Re-open after verify() because verify() invalidates the image object.
        image = Image.open(image_path)
        image.load()

    except (UnidentifiedImageError, OSError) as exc:
        raise ImageValidationError(
            f"Invalid or corrupted image: {image_path}"
        ) from exc

    if image.width <= 0 or image.height <= 0:
        raise ImageValidationError("Image has invalid dimensions.")

    return image.convert("RGB")