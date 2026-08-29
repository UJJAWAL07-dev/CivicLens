# CivicLens GIS

GIS / Geospatial module for the CivicLens project.

This module handles coordinate validation, civic issue mapping,
GeoJSON generation, distance calculation, and nearby-issue search.

## Owner

Member 4 - GIS / Geospatial

## Tech Stack

- Python
- GeoPandas
- Shapely
- Matplotlib
- Pytest
- GeoJSON
- WGS84 / EPSG:4326

## Project Structure

```text
gis/
├── src/
│   ├── gis_demo.py
│   ├── spatial.py
│   └── run_spatial_demo.py
├── maps/
│   ├── civic_issues.geojson
│   └── civic_issues_map.png
├── data/
├── tests/
│   ├── test_coordinates.py
│   ├── test_geojson.py
│   └── test_spatial.py
├── INTEGRATION.md
└── README.md