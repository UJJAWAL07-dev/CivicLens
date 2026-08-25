import argparse
import json
from pathlib import Path

import geopandas as gpd
import matplotlib.pyplot as plt
from shapely.geometry import Point


# WGS84 geographic coordinate system
CRS = "EPSG:4326"


def validate_coordinates(latitude, longitude):
    """
    Validate latitude and longitude.

    Latitude must be between -90 and 90.
    Longitude must be between -180 and 180.
    """

    if not (-90 <= latitude <= 90):
        raise ValueError("Latitude must be between -90 and 90.")

    if not (-180 <= longitude <= 180):
        raise ValueError("Longitude must be between -180 and 180.")

    return True


def create_issue_points(latitude, longitude):
    """
    Create a small deterministic civic issue dataset.

    The user-provided location is added as a new issue.
    """

    issues = [
        {
            "issueId": "CL-001",
            "issueType": "Pothole",
            "latitude": 22.5726,
            "longitude": 88.3639,
        },
        {
            "issueId": "CL-002",
            "issueType": "Garbage",
            "latitude": 22.5750,
            "longitude": 88.3680,
        },
        {
            "issueId": "CL-003",
            "issueType": "Streetlight",
            "latitude": 22.5690,
            "longitude": 88.3600,
        },
        {
            "issueId": "USER-001",
            "issueType": "User Report",
            "latitude": latitude,
            "longitude": longitude,
        },
    ]

    geometry = [
        Point(issue["longitude"], issue["latitude"])
        for issue in issues
    ]

    gdf = gpd.GeoDataFrame(
        issues,
        geometry=geometry,
        crs=CRS,
    )

    return gdf


def export_geojson(gdf, output_path):
    """Export the issue points as GeoJSON."""

    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    gdf.to_file(
        output_path,
        driver="GeoJSON"
    )


def plot_issues(gdf, output_path):
    """Plot civic issue points and save the map as PNG."""

    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    ax = gdf.plot(
        figsize=(8, 6),
        markersize=80,
        edgecolor="black",
    )

    ax.set_title("CivicLens Civic Issues")
    ax.set_xlabel("Longitude")
    ax.set_ylabel("Latitude")
    ax.grid(True)

    plt.tight_layout()
    plt.savefig(output_path, dpi=150)
    plt.close()


def main():
    parser = argparse.ArgumentParser(
        description="CivicLens GIS coordinate and mapping demo"
    )

    parser.add_argument(
        "latitude",
        type=float,
        help="Latitude between -90 and 90",
    )

    parser.add_argument(
        "longitude",
        type=float,
        help="Longitude between -180 and 180",
    )

    args = parser.parse_args()

    try:
        validate_coordinates(
            args.latitude,
            args.longitude
        )
    except ValueError as error:
        print(f"Error: {error}")
        return 1

    gdf = create_issue_points(
        args.latitude,
        args.longitude
    )

    geojson_path = Path("maps/civic_issues.geojson")
    image_path = Path("maps/civic_issues_map.png")

    export_geojson(gdf, geojson_path)
    plot_issues(gdf, image_path)

    print("GIS demo completed successfully.")
    print(f"GeoJSON: {geojson_path}")
    print(f"Map:     {image_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
