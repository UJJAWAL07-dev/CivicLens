from pathlib import Path

import numpy as np
from PIL import Image

from src.inference.detector import YOLODetector


class FakeValue:
    def __init__(self, value):
        self.value = value

    def item(self):
        return self.value


class FakeCoordinates:
    def __init__(self, values):
        self.values = values

    def tolist(self):
        return self.values


class FakeBox:
    def __init__(self, class_id, confidence, bbox):
        self.cls = [FakeValue(class_id)]
        self.conf = [FakeValue(confidence)]
        self.xyxy = [FakeCoordinates(bbox)]


class FakeResult:
    names = {
        0: "pothole",
        1: "garbage_waste",
        2: "fallen_tree",
    }

    def __init__(self, boxes):
        self.boxes = boxes

    def plot(self):
        # Fake annotated image for testing.
        return np.zeros((100, 100, 3), dtype=np.uint8)


class FakeYOLO:
    def __init__(self, model_path):
        self.model_path = model_path
        self.result = FakeResult([])

    def predict(self, source, conf, verbose):
        return [self.result]


def create_test_image(tmp_path: Path) -> Path:
    image_path = tmp_path / "test.jpg"

    image = Image.new("RGB", (200, 200))
    image.save(image_path)

    return image_path


def create_fake_model(tmp_path: Path) -> Path:
    model_path = tmp_path / "model.pt"
    model_path.write_bytes(b"fake model")

    return model_path


def create_detector(tmp_path, monkeypatch):
    model_path = create_fake_model(tmp_path)

    monkeypatch.setattr(
        "src.inference.detector.YOLO",
        FakeYOLO,
    )

    detector = YOLODetector(model_path)

    return detector


def test_valid_detection_returns_structured_result(
    tmp_path,
    monkeypatch,
):
    detector = create_detector(tmp_path, monkeypatch)
    image_path = create_test_image(tmp_path)

    detector.model.result = FakeResult(
        [
            FakeBox(
                class_id=0,
                confidence=0.91,
                bbox=[10, 20, 100, 120],
            )
        ]
    )

    result = detector.predict(
        image_path,
        confidence_threshold=0.50,
    )

    assert "detections" in result
    assert len(result["detections"]) == 1

    detection = result["detections"][0]

    assert detection["class"] == "pothole"
    assert detection["confidence"] == 0.91
    assert detection["bbox"] == [10, 20, 100, 120]


def test_no_detection_returns_empty_result(
    tmp_path,
    monkeypatch,
):
    detector = create_detector(tmp_path, monkeypatch)
    image_path = create_test_image(tmp_path)

    detector.model.result = FakeResult([])

    result = detector.predict(
        image_path,
        confidence_threshold=0.50,
    )

    assert result == {
        "detections": []
    }


def test_low_confidence_detection_is_filtered(
    tmp_path,
    monkeypatch,
):
    detector = create_detector(tmp_path, monkeypatch)
    image_path = create_test_image(tmp_path)

    detector.model.result = FakeResult(
        [
            FakeBox(
                class_id=0,
                confidence=0.20,
                bbox=[10, 20, 100, 120],
            )
        ]
    )

    result = detector.predict(
        image_path,
        confidence_threshold=0.50,
    )

    assert result["detections"] == []


def test_multiple_detections_are_returned(
    tmp_path,
    monkeypatch,
):
    detector = create_detector(tmp_path, monkeypatch)
    image_path = create_test_image(tmp_path)

    detector.model.result = FakeResult(
        [
            FakeBox(
                class_id=0,
                confidence=0.90,
                bbox=[10, 20, 100, 120],
            ),
            FakeBox(
                class_id=1,
                confidence=0.80,
                bbox=[50, 60, 150, 160],
            ),
        ]
    )

    result = detector.predict(
        image_path,
        confidence_threshold=0.50,
    )

    assert len(result["detections"]) == 2

    assert result["detections"][0]["class"] == "pothole"
    assert result["detections"][1]["class"] == "garbage_waste"


def test_annotated_image_is_saved(
    tmp_path,
    monkeypatch,
):
    detector = create_detector(tmp_path, monkeypatch)
    image_path = create_test_image(tmp_path)

    detector.model.result = FakeResult(
        [
            FakeBox(
                class_id=0,
                confidence=0.91,
                bbox=[10, 20, 100, 120],
            )
        ]
    )

    output_path = tmp_path / "outputs" / "annotated.jpg"

    detector.predict(
        image_path,
        confidence_threshold=0.50,
        output_path=output_path,
    )

    assert output_path.exists()
    assert output_path.stat().st_size > 0


def test_invalid_confidence_threshold_raises_error(
    tmp_path,
    monkeypatch,
):
    detector = create_detector(tmp_path, monkeypatch)
    image_path = create_test_image(tmp_path)

    try:
        detector.predict(
            image_path,
            confidence_threshold=1.5,
        )
        assert False, "Expected ValueError"
    except ValueError as error:
        assert "confidence_threshold" in str(error)


def test_custom_model_path_is_used(
    tmp_path,
    monkeypatch,
):
    model_path = create_fake_model(tmp_path)

    monkeypatch.setattr(
        "src.inference.detector.YOLO",
        FakeYOLO,
    )

    detector = YOLODetector(model_path)

    assert detector.model_path == model_path
    assert detector.model.model_path == str(model_path)


def test_custom_confidence_threshold_is_passed_to_model(
    tmp_path,
    monkeypatch,
):
    model_path = create_fake_model(tmp_path)
    image_path = create_test_image(tmp_path)

    class TrackingFakeYOLO(FakeYOLO):
        def predict(self, source, conf, verbose):
            self.received_confidence = conf
            return [self.result]

    monkeypatch.setattr(
        "src.inference.detector.YOLO",
        TrackingFakeYOLO,
    )

    detector = YOLODetector(model_path)

    detector.predict(
        image_path,
        confidence_threshold=0.75,
    )

    assert detector.model.received_confidence == 0.75


def test_default_confidence_threshold_is_used(
    tmp_path,
    monkeypatch,
):
    model_path = create_fake_model(tmp_path)
    image_path = create_test_image(tmp_path)

    class TrackingFakeYOLO(FakeYOLO):
        def predict(self, source, conf, verbose):
            self.received_confidence = conf
            return [self.result]

    monkeypatch.setattr(
        "src.inference.detector.YOLO",
        TrackingFakeYOLO,
    )

    detector = YOLODetector(model_path)

    detector.predict(image_path)

    assert detector.model.received_confidence == 0.25


def test_original_image_is_not_modified(
    tmp_path,
    monkeypatch,
):
    detector = create_detector(tmp_path, monkeypatch)
    image_path = create_test_image(tmp_path)

    original_image = image_path.read_bytes()

    detector.model.result = FakeResult(
        [
            FakeBox(
                class_id=0,
                confidence=0.91,
                bbox=[10, 20, 100, 120],
            )
        ]
    )

    output_path = tmp_path / "outputs" / "annotated.jpg"

    detector.predict(
        image_path,
        confidence_threshold=0.50,
        output_path=output_path,
    )

    assert image_path.read_bytes() == original_image


def test_model_loading_failure(
    tmp_path,
    monkeypatch,
):
    model_path = create_fake_model(tmp_path)

    class FailingYOLO:
        def __init__(self, model_path):
            raise RuntimeError("Model failed to load")

    monkeypatch.setattr(
        "src.inference.detector.YOLO",
        FailingYOLO,
    )

    from src.utils.errors import ModelLoadError

    try:
        YOLODetector(model_path)
        assert False, "Expected ModelLoadError"
    except ModelLoadError as error:
        assert "Failed to load YOLO model" in str(error)


def test_preprocessing_failure(
    tmp_path,
    monkeypatch,
):
    model_path = create_fake_model(tmp_path)
    image_path = create_test_image(tmp_path)

    monkeypatch.setattr(
        "src.inference.detector.YOLO",
        FakeYOLO,
    )

    detector = YOLODetector(model_path)

    from src.preprocessing.image import ImageValidationError

    def failing_validation(path):
        raise ImageValidationError("Preprocessing failed")

    monkeypatch.setattr(
        "src.inference.detector.validate_image",
        failing_validation,
    )

    try:
        detector.predict(image_path)
        assert False, "Expected ImageValidationError"
    except ImageValidationError as error:
        assert "Preprocessing failed" in str(error)


def test_output_schema_is_valid(
    tmp_path,
    monkeypatch,
):
    detector = create_detector(tmp_path, monkeypatch)
    image_path = create_test_image(tmp_path)

    detector.model.result = FakeResult(
        [
            FakeBox(
                class_id=0,
                confidence=0.91,
                bbox=[10, 20, 100, 120],
            )
        ]
    )

    result = detector.predict(
        image_path,
        confidence_threshold=0.50,
    )

    assert isinstance(result, dict)
    assert set(result.keys()) == {"detections"}
    assert isinstance(result["detections"], list)

    for detection in result["detections"]:
        assert set(detection.keys()) == {
            "class",
            "confidence",
            "bbox",
        }

        assert isinstance(detection["class"], str)
        assert isinstance(detection["confidence"], float)
        assert isinstance(detection["bbox"], list)

        assert len(detection["bbox"]) == 4

        assert all(
            isinstance(value, (int, float))
            for value in detection["bbox"]
        )