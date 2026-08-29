import geopandas as gpd
import pytest
from shapely.geometry import Point

from src.spatial import (
    calculate_distance,
    issues_near_location,
)


def test_distance_same_coordinate():
    distance = calculate_distance(
        22.5726,
        88.3639,
        22.5726,
        88.3639,
    )

    assert distance == pytest.approx(0, abs=0.001)


def test_distance_is_positive():
    distance = calculate_distance(
        22.5726,
        88.3639,
        22.5750,
        88.3680,
    )

    assert distance > 0


def test_invalid_coordinate():
    with pytest.raises(ValueError):
        calculate_distance(
            100,
            88.3639,
            22.5726,
            88.3639,
        )


def test_issues_near_location():
    gdf = gpd.GeoDataFrame(
        {
            "issueId": ["CL-001", "CL-002"],
            "issueType": ["Pothole", "Garbage"],
        },
        geometry=[
            Point(88.3639, 22.5726),
            Point(88.3680, 22.5750),
        ],
        crs="EPSG:4326",
    )

    result = issues_near_location(
        gdf,
        22.5726,
        88.3639,
        100,
    )

    assert "CL-001" in result["issueId"].values
def test_empty_dataset():
    import geopandas as gpd

    gdf = gpd.GeoDataFrame(
        {
            "reportId": [],
            "issueType": [],
            "severity": [],
            "status": [],
        },
        geometry=[],
        crs="EPSG:4326",
    )

    result = issues_near_location(
        gdf,
        22.5726,
        88.3639,
        500,
    )

    assert result.empty


def test_no_nearby_results():
    import geopandas as gpd
    from shapely.geometry import Point

    gdf = gpd.GeoDataFrame(
        {
            "reportId": ["CL-001"],
            "issueType": ["Pothole"],
            "severity": ["High"],
            "status": ["Open"],
        },
        geometry=[
            Point(88.3639, 22.5726)
        ],
        crs="EPSG:4326",
    )

    result = issues_near_location(
        gdf,
        23.0000,
        89.0000,
        100,
    )

    assert result.empty    
  