from pathlib import Path
from typing import Any

from ultralytics import YOLO

from src.preprocessing.image import validate_image


class YOLODetector:
    def __init__(self, model_path: str | Path):
        self.model_path = Path(model_path)

        if not self.model_path.exists():
            raise FileNotFoundError(
                f"YOLO model not found: {self.model_path}"
            )

        self.model = YOLO(str(self.model_path))

    def predict(
        self,
        image_path: str | Path,
        confidence_threshold: float = 0.25,
    ) -> dict[str, list[dict[str, Any]]]:

        image = validate_image(image_path)

        results = self.model.predict(
            source=image,
            conf=confidence_threshold,
            verbose=False,
        )

        detections = []

        for result in results:
            if result.boxes is None:
                continue

            for box in result.boxes:
                class_id = int(box.cls[0].item())
                confidence = float(box.conf[0].item())

                x1, y1, x2, y2 = box.xyxy[0].tolist()

                detections.append(
                    {
                        "class": result.names[class_id],
                        "confidence": round(confidence, 4),
                        "bbox": [
                            round(x1, 2),
                            round(y1, 2),
                            round(x2, 2),
                            round(y2, 2),
                        ],
                    }
                )

        return {"detections": detections}