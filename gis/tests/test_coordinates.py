import pytest

from src.gis_demo import validate_coordinates


def test_valid_coordinates():
    assert validate_coordinates(22.5726, 88.3639) is True


def test_invalid_latitude():
    with pytest.raises(ValueError):
        validate_coordinates(91, 88.3639)


def test_invalid_longitude():
    with pytest.raises(ValueError):
        validate_coordinates(22.5726, 181)


def test_negative_valid_coordinates():
    assert validate_coordinates(-33.8688, 151.2093) is True


def test_boundary_coordinates():
    assert validate_coordinates(90, 180) is True
    assert validate_coordinates(-90, -180) is True
    