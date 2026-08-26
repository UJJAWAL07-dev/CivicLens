import csv
import random
from datetime import datetime, timedelta
from pathlib import Path


ISSUE_TYPES = [
    "Pothole",
    "Street light",
    "Water leakage",
    "Garbage",
    "Drainage",
    "Road damage",
    "Traffic signal",
    "Manhole",
]

SEVERITIES = ["Low", "Medium", "High", "Critical"]

STATUSES = ["Open", "Pending", "In Progress", "Resolved", "Closed"]


def _random_date(start_year=2024, end_year=2025):
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 12, 31)
    delta = end - start
    random_days = random.randint(0, delta.days)
    return (start + timedelta(days=random_days)).strftime("%Y-%m-%d")


def _resolution_date(reported_date):
    reported = datetime.strptime(reported_date, "%Y-%m-%d")
    return (reported + timedelta(days=random.randint(1, 45))).strftime("%Y-%m-%d")


def _random_coords():
    latitude = round(random.uniform(10.0, 30.0), 6)
    longitude = round(random.uniform(70.0, 90.0), 6)
    return latitude, longitude


def write_sample_dataset(csv_path, record_count=150, seed=42):
    random.seed(seed)
    path = Path(csv_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    rows = []
    for i in range(record_count):
        report_id = f"CIV-{i + 1:04d}"
        issue_type = random.choice(ISSUE_TYPES)
        latitude, longitude = _random_coords()
        severity = random.choice(SEVERITIES)
        status = random.choice(STATUSES)
        reported_date = _random_date()
        resolution_date = _resolution_date(reported_date) if status in {"Resolved", "Closed"} else ""

        rows.append({
            "report_id": report_id,
            "issue_type": issue_type,
            "latitude": latitude,
            "longitude": longitude,
            "severity": severity,
            "status": status,
            "reported_date": reported_date,
            "resolution_date": resolution_date,
        })

    # Intentionally messy records for testing
    messy_records = [
        {
            "report_id": "CIV-0001",
            "issue_type": "pothole",
            "latitude": "12.345678",
            "longitude": "45.678901",
            "severity": "High",
            "status": "Open",
            "reported_date": "2025-01-05",
            "resolution_date": "2025-01-15",
        },
        {
            "report_id": "CIV-9999",
            "issue_type": "",
            "latitude": "91.0",
            "longitude": "180.1",
            "severity": "Low",
            "status": "Pending",
            "reported_date": "2025/02/03",
            "resolution_date": "",
        },
        {
            "report_id": "CIV-10000",
            "issue_type": "water leakage",
            "latitude": "",
            "longitude": "76.5",
            "severity": "Medium",
            "status": "Resolved",
            "reported_date": "2025-02-30",
            "resolution_date": "2025-03-01",
        },
    ]

    rows[:0] = messy_records

    with path.open("w", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "report_id",
                "issue_type",
                "latitude",
                "longitude",
                "severity",
                "status",
                "reported_date",
                "resolution_date",
            ],
        )
        writer.writeheader()
        writer.writerows(rows[: record_count])

    return path
