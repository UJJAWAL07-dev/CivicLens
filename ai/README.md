# CivicLens AI

Member 3 — AI / Computer Vision

## Overview

The CivicLens AI module provides image preprocessing, YOLO-based object detection,
confidence filtering, structured detection results, and optional annotated images.

The main inference interface is:

```python
from src.inference.detector import run_inference

result = run_inference("path/to/image.jpg")




Directory Structure:
ai/
├── src/
│   ├── inference/
│   │   └── detector.py
│   ├── preprocessing/
│   │   └── image.py
│   └── utils/
│       ├── classes.py
│       └── errors.py
│
├── models/
│   └── yolo26n.pt
│
├── datasets/
│   └── test/
│       ├── issue/
│       └── no_issue/
│
├── tests/
│
├── notebooks/
│
├── outputs/
│
└── README.md