from pathlib import Path
from typing import Any

import cv2
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
        output_path: str | Path | None = None,
    ) -> dict[str, list[dict[str, Any]]]:

        if not 0.0 <= confidence_threshold <= 1.0:
            raise ValueError(
                "confidence_threshold must be between 0.0 and 1.0"
            )

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
                confidence = float(box.conf[0].item())

                # Explicit filtering in our code as well.
                if confidence < confidence_threshold:
                    continue

                class_id = int(box.cls[0].item())

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

            if output_path is not None:
                self._save_annotated_image(
                    result,
                    output_path,
                )

        return {
            "detections": detections
        }

    @staticmethod
    def _save_annotated_image(
        result,
        output_path: str | Path,
    ) -> None:
        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        annotated = result.plot()

        success = cv2.imwrite(
            str(output_path),
            annotated,
        )

        if not success:
            raise IOError(
                f"Failed to save annotated image: {output_path}"
            )