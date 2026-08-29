# CivicLens GIS - Backend Integration Contract

## 1. Purpose

The GIS module provides coordinate validation, civic issue mapping,
GeoJSON generation, distance calculation, and nearby-issue search.

The GIS module is independent of the frontend.

## 2. Input

The backend should provide:

- latitude: float
- longitude: float
- radius_meters: float

Example:

```json
{
  "latitude": 22.5726,
  "longitude": 88.3639,
  "radius_meters": 5000
}