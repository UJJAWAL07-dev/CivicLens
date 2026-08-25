import csv
import tempfile
from pathlib import Path

import pytest

from data.civic_pipeline import (
    analyse_cleaned_records,
    clean_civic_records,
    ingest_csv,
    process_csv,
    save_processed_dataset,
)


def test_ingest_csv_requires_required_columns(tmp_path):
    csv_path = tmp_path / "bad_schema.csv"
    with csv_path.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["issue_type", "latitude", "longitude"])
        writer.writeheader()
        writer.writerow({"issue_type": "pothole", "latitude": "12.3", "longitude": "45.6"})

    with pytest.raises(ValueError, match="Missing required columns"):
        ingest_csv(csv_path)


def test_clean_civic_records_normalizes_and_flags_invalid():
    records = [
        {
            "report_id": "R-001",
            "issue_type": "  Pothole ",
            "latitude": "12.345678",
            "longitude": "45.678901",
            "severity": "High",
            "status": "open",
            "reported_date": "2025-01-05",
            "resolution_date": "2025-01-15",
        },
        {
            "report_id": "R-001",
            "issue_type": "pothole",
            "latitude": "12.345678",
            "longitude": "45.678901",
            "severity": "high",
            "status": "OPEN",
            "reported_date": "2025-01-05",
            "resolution_date": "2025-01-15",
        },
        {
            "report_id": "R-002",
            "issue_type": "streetlight",
            "latitude": "91.0",
            "longitude": "180.1",
            "severity": "Low",
            "status": "pending",
            "reported_date": "2025/02/03",
            "resolution_date": "",
        },
        {
            "report_id": "R-003",
            "issue_type": "water leakage",
            "latitude": "",
            "longitude": "23.4",
            "severity": "Medium",
            "status": "resolved",
            "reported_date": "2025-02-30",
            "resolution_date": "2025-03-01",
        },
    ]

    cleaned, invalid = clean_civic_records(records)

    assert len(cleaned) == 1
    assert cleaned[0]["issue_type"] == "pothole"
    assert cleaned[0]["severity"] == "high"
    assert cleaned[0]["status"] == "open"
    assert cleaned[0]["reported_date"] == "2025-01-05"
    assert len(invalid) == 3
    assert any("duplicate" in item["reason"].lower() for item in invalid)
    assert any("latitude" in item["reason"].lower() for item in invalid)
    assert any("date" in item["reason"].lower() for item in invalid)


def test_sample_dataset_generation_is_realistic(tmp_path):
    csv_path = tmp_path / "sample_reports.csv"
    from data.generate_sample_data import write_sample_dataset

    write_sample_dataset(csv_path, record_count=150)

    rows = list(csv.DictReader(csv_path.open()))
    assert 100 <= len(rows) <= 200
    assert set(rows[0].keys()) == {
        "report_id",
        "issue_type",
        "latitude",
        "longitude",
        "severity",
        "status",
        "reported_date",
        "resolution_date",
    }


def test_invalid_coordinates_and_missing_values_are_flagged():
    records = [
        {
            "report_id": "R-101",
            "issue_type": "pothole",
            "latitude": "91.0",
            "longitude": "77.5",
            "severity": "high",
            "status": "open",
            "reported_date": "2025-01-01",
            "resolution_date": "",
        },
        {
            "report_id": "R-102",
            "issue_type": "garbage",
            "latitude": "",
            "longitude": "76.0",
            "severity": "medium",
            "status": "pending",
            "reported_date": "2025-01-02",
            "resolution_date": "",
        },
    ]

    cleaned, invalid = clean_civic_records(records)
    assert cleaned == []
    assert len(invalid) == 2
    assert any("latitude/longitude" in item["reason"].lower() for item in invalid)


def test_invalid_categories_and_dates_are_rejected():
    records = [
        {
            "report_id": "R-201",
            "issue_type": "mystery category",
            "latitude": "12.1",
            "longitude": "76.2",
            "severity": "urgent",
            "status": "unknown",
            "reported_date": "2025-13-01",
            "resolution_date": "",
        }
    ]

    cleaned, invalid = clean_civic_records(records)
    assert cleaned == []
    assert invalid[0]["reason"]
    assert "invalid issue type" in invalid[0]["reason"] or "invalid severity" in invalid[0]["reason"] or "invalid status" in invalid[0]["reason"]


def test_analytics_output_is_correct():
    records = [
        {
            "report_id": "A-001",
            "issue_type": "pothole",
            "latitude": "12.1",
            "longitude": "76.1",
            "severity": "high",
            "status": "resolved",
            "reported_date": "2025-01-01",
            "resolution_date": "2025-01-10",
        },
        {
            "report_id": "A-002",
            "issue_type": "garbage",
            "latitude": "12.2",
            "longitude": "76.2",
            "severity": "low",
            "status": "open",
            "reported_date": "2025-01-03",
            "resolution_date": "",
        },
        {
            "report_id": "A-003",
            "issue_type": "pothole",
            "latitude": "12.3",
            "longitude": "76.3",
            "severity": "medium",
            "status": "resolved",
            "reported_date": "2025-01-05",
            "resolution_date": "2025-01-20",
        },
    ]

    analytics = analyse_cleaned_records(records)
    assert analytics["total_reports"] == 3
    assert analytics["reports_by_issue_type"]["pothole"] == 2
    assert analytics["reports_by_severity"]["high"] == 1
    assert analytics["reports_by_status"]["resolved"] == 2
    assert analytics["resolved_vs_unresolved"]["resolved"] == 2
    assert analytics["resolved_vs_unresolved"]["unresolved"] == 1
    assert analytics["average_resolution_days"] == 12.0


def test_processed_dataset_is_saved_separately(tmp_path):
    raw_csv = tmp_path / "raw_reports.csv"
    output_dir = tmp_path / "processed"

    records = [
        {
            "report_id": "P-001",
            "issue_type": "Pothole",
            "latitude": "12.1",
            "longitude": "76.1",
            "severity": "High",
            "status": "Resolved",
            "reported_date": "2025-01-01",
            "resolution_date": "2025-01-10",
        },
        {
            "report_id": "P-002",
            "issue_type": "BadCategory",
            "latitude": "12.2",
            "longitude": "76.2",
            "severity": "Urgent",
            "status": "Unknown",
            "reported_date": "2025-01-02",
            "resolution_date": "",
        },
    ]

    with raw_csv.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "report_id",
            "issue_type",
            "latitude",
            "longitude",
            "severity",
            "status",
            "reported_date",
            "resolution_date",
        ])
        writer.writeheader()
        writer.writerows(records)

    cleaned, invalid = process_csv(raw_csv)
    save_processed_dataset(output_dir, cleaned, invalid)

    assert (output_dir / "cleaned_reports.csv").exists()
    assert (output_dir / "invalid_records.csv").exists()
    assert raw_csv.exists()
    assert len(cleaned) == 1
    assert len(invalid) == 1
