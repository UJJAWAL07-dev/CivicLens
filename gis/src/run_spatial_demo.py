from gis_demo import create_issue_points
from spatial import issues_near_location


def main():
    latitude = 22.5726
    longitude = 88.3639

    # Create the CivicLens issue dataset
    gdf = create_issue_points(latitude, longitude)

    # Find issues within 500 meters
    nearby = issues_near_location(
        gdf,
        latitude,
        longitude,
        500,
    )

    print("Issues within 500 meters:")
    print()

    for _, issue in nearby.iterrows():
        print(
            f"{issue['reportId']} | "
            f"{issue['issueType']} | "
            f"{issue['severity']} | "
            f"{issue['distance_meters']:.2f} meters"
        )


if __name__ == "__main__":
    main()
    