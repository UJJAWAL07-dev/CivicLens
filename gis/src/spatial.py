from math import radians, sin, cos, sqrt, atan2

try:
    from .gis_demo import validate_coordinates
except ImportError:
    from gis_demo import validate_coordinates


# Earth's approximate radius in meters
EARTH_RADIUS_METERS = 6_371_000


def calculate_distance(
    latitude1,
    longitude1,
    latitude2,
    longitude2,
):
    """
    Calculate the great-circle distance between
    two geographic coordinates using the Haversine formula.

    Returns:
        Distance in meters.
    """

    validate_coordinates(latitude1, longitude1)
    validate_coordinates(latitude2, longitude2)

    lat1 = radians(latitude1)
    lon1 = radians(longitude1)

    lat2 = radians(latitude2)
    lon2 = radians(longitude2)

    delta_lat = lat2 - lat1
    delta_lon = lon2 - lon1

    a = (
        sin(delta_lat / 2) ** 2
        + cos(lat1)
        * cos(lat2)
        * sin(delta_lon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return EARTH_RADIUS_METERS * c


def issues_near_location(
    gdf,
    latitude,
    longitude,
    radius_meters,
):
    """
    Return civic issues within radius_meters
    of the given location.

    The input GeoDataFrame must use EPSG:4326.
    """
    if not hasattr(gdf, "geometry"):
        raise ValueError("GeoDataFrame must contain geometry.")

    validate_coordinates(latitude, longitude)

    if radius_meters < 0:
        raise ValueError("Radius cannot be negative.")

       # Handle empty datasets
    if gdf.empty:
        result = gdf.copy()
        result["distance_meters"] = []
        return result

    distances = gdf.geometry.apply(
        lambda point: calculate_distance(
            latitude,
            longitude,
            point.y,
            point.x,
        )
    )

    result = gdf.copy()

    result["distance_meters"] = distances

    return result[
        result["distance_meters"] <= radius_meters
    ].copy()
