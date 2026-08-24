from pathlib import Path

import pytest
from PIL import Image

from src.preprocessing.image import (
    ImageValidationError,
    validate_image,
)


def test_valid_image(tmp_path: Path):
    image_path = tmp_path / "test.jpg"

    image = Image.new("RGB", (100, 100))
    image.save(image_path)

    result = validate_image(image_path)

    assert result.size == (100, 100)
    assert result.mode == "RGB"


def test_missing_image():
    with pytest.raises(ImageValidationError):
        validate_image("does_not_exist.jpg")


def test_unsupported_format(tmp_path: Path):
    file_path = tmp_path / "test.txt"
    file_path.write_text("not an image")

    with pytest.raises(ImageValidationError):
        validate_image(file_path)


def test_corrupted_image(tmp_path: Path):
    image_path = tmp_path / "broken.jpg"
    image_path.write_bytes(b"not a real image")

    with pytest.raises(ImageValidationError):
        validate_image(image_path)