class AIInferenceError(RuntimeError):
    """Raised when YOLO inference fails."""


class ModelLoadError(RuntimeError):
    """Raised when the YOLO model cannot be loaded."""