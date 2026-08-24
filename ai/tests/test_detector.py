from pathlib import Path

from PIL import Image

from src.inference.detector import YOLODetector


class FakeBox:
    def __init__(self):
        self.cls = [FakeValue(0)]
        self.conf = [FakeValue(0.91)]
        self.xyxy = [FakeCoordinates([10, 20, 100, 120])]


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


class FakeResult:
    names = {0: "pothole"}

    def __init__(self):
        self.boxes = [FakeBox()]


class FakeYOLO:
    def __init__(self, model_path):
        self.model_path = model_path

    def predict(self, source, conf, verbose):
        return [FakeResult()]


def test_detector_output(tmp_path: Path, monkeypatch):
    image_path = tmp_path / "road.jpg"

    image = Image.new("RGB", (200, 200))
    image.save(image_path)

    model_path = tmp_path / "model.pt"
    model_path.write_bytes(b"fake model")

    monkeypatch.setattr(
        "src.inference.detector.YOLO",
        FakeYOLO,
    )

    detector = YOLODetector(model_path)
    result = detector.predict(image_path)

    assert len(result["detections"]) == 1

    detection = result["detections"][0]

    assert detection["class"] == "pothole"
    assert detection["confidence"] == 0.91
    assert detection["bbox"] == [10, 20, 100, 120]