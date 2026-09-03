import json

from src.gis_demo import create_issue_points, export_geojson


def test_geojson_output(tmp_path):
    gdf = create_issue_points(
        22.5726,
        88.3639,
    )

    output_file = tmp_path / "issues.geojson"

    export_geojson(
        gdf,
        output_file,
    )

    with open(output_file, "r", encoding="utf-8") as file:
        data = json.load(file)

    assert data["type"] == "FeatureCollection"

    assert len(data["features"]) == 4

    first_feature = data["features"][0]

    assert first_feature["geometry"]["type"] == "Point"

    assert first_feature["geometry"]["coordinates"] == [
        88.3639,
        22.5726,
    ]

    assert first_feature["properties"]["issueType"] == "Pothole"

    assert first_feature["properties"]["severity"] == "High"
    