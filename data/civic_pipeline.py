from __future__ import annotations

import csv
from collections import Counter
from datetime import datetime
from pathlib import Path
from typing import Dict, List

REQUIRED_COLUMNS = {
    "report_id",
    "issue_type",
    "latitude",
    "longitude",
    "severity",
    "status",
    "reported_date",
    "resolution_date",
}

ISSUE_CATEGORY_MAP = {
    "pothole": "pothole",
    "potholes": "pothole",
    "streetlight": "streetlight",
    "street light": "streetlight",
    "street-lights": "streetlight",
    "water leakage": "water_leakage",
    "water-leakage": "water_leakage",
    "water leak": "water_leakage",
    "garbage": "garbage",
    "trash": "garbage",
    "drainage": "drainage",
    "blocked drain": "drainage",
    "road damage": "road_damage",
    "road-damage": "road_damage",
    "traffic signal": "traffic_signal",
    "signal issue": "traffic_signal",
    "manhole": "manhole",
    "manhole cover": "manhole",
}

SEVERITY_MAP = {
    "low": "low",
    "medium": "medium",
    "high": "high",
    "critical": "critical",
    "l": "low",
    "m": "medium",
    "h": "high",
    "c": "critical",
}

STATUS_MAP = {
    "open": "open",
    "pending": "pending",
    "in progress": "in_progress",
    "in_progress": "in_progress",
    "resolved": "resolved",
    "closed": "closed",
    "reopened": "reopened",
}

VALID_SEVERITIES = {"low", "medium", "high", "critical"}
VALID_STATUSES = {"open", "pending", "in_progress", "resolved", "closed", "reopened"}


def _normalize_text(value):
    if value is None:
        return ""
    return str(value).strip().lower()


def _parse_date(value):
    if value is None or str(value).strip() == "":
        return None

    raw = str(value).strip()
    for fmt in ("%Y-%m-%d", "%Y/%m/%d", "%d-%m-%Y", "%d/%m/%Y"):
        try:
            return datetime.strptime(raw, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return None


def _validate_lat_lon(latitude, longitude):
    try:
        lat = float(latitude)
        lon = float(longitude)
    except (TypeError, ValueError):
        return False

    if not (-90 <= lat <= 90):
        return False
    if not (-180 <= lon <= 180):
        return False
    return True


def _isoformat_date(date_value):
    parsed = _parse_date(date_value)
    if parsed is None:
        return None
    return parsed


def ingest_csv(csv_path):
    path = Path(csv_path)
    if not path.exists():
        raise FileNotFoundError(f"CSV file not found: {path}")

    with path.open("r", newline="") as f:
        reader = csv.DictReader(f)
        if not reader.fieldnames:
            raise ValueError("CSV file is empty or missing headers.")

        missing = sorted(REQUIRED_COLUMNS - set(reader.fieldnames))
        if missing:
            raise ValueError(f"Missing required columns: {', '.join(missing)}")

        rows = list(reader)

    return rows


def clean_civic_records(records):
    cleaned = []
    invalid = []
    seen = set()

    for idx, row in enumerate(records, start=1):
        record = {k: (v.strip() if isinstance(v, str) else v) for k, v in row.items()}
        reason_parts = []

        report_id = str(record.get("report_id", "")).strip()
        if not report_id:
            reason_parts.append("missing report_id")

        issue_type = _normalize_text(record.get("issue_type"))
        normalized_issue = ISSUE_CATEGORY_MAP.get(issue_type)
        if normalized_issue is None:
            reason_parts.append("invalid issue type")

        latitude = record.get("latitude")
        longitude = record.get("longitude")
        if not _validate_lat_lon(latitude, longitude):
            reason_parts.append("latitude/longitude out of range or invalid")

        severity_raw = _normalize_text(record.get("severity"))
        severity = SEVERITY_MAP.get(severity_raw)
        if severity is None:
            reason_parts.append("invalid severity")

        status_raw = _normalize_text(record.get("status"))
        status = STATUS_MAP.get(status_raw)
        if status is None:
            reason_parts.append("invalid status")

        reported_date = _isoformat_date(record.get("reported_date"))
        if reported_date is None:
            reason_parts.append("reported_date invalid")

        resolution_date = _isoformat_date(record.get("resolution_date"))
        if record.get("resolution_date") and resolution_date is None:
            reason_parts.append("resolution_date invalid")

        record_key = (report_id, normalized_issue, latitude, longitude, severity, status, reported_date)
        if report_id and record_key in seen:
            reason_parts.append("duplicate record")
        else:
            seen.add(record_key)

        if reason_parts:
            invalid.append({
                "row_number": idx,
                "report_id": report_id,
                "reason": "; ".join(reason_parts),
                "raw_record": row,
            })
            continue

        cleaned.append({
            "report_id": report_id,
            "issue_type": normalized_issue,
            "latitude": float(latitude),
            "longitude": float(longitude),
            "severity": severity,
            "status": status,
            "reported_date": reported_date,
            "resolution_date": resolution_date,
        })

    return cleaned, invalid


def validate_records(records):
    cleaned, invalid = clean_civic_records(records)
    validation_report = {
        "total_rows": len(records),
        "clean_rows": len(cleaned),
        "invalid_rows": len(invalid),
        "invalid_reasons": dict(Counter(item["reason"] for item in invalid)),
    }
    return cleaned, invalid, validation_report


def save_processed_dataset(output_dir, cleaned, invalid):
    path = Path(output_dir)
    path.mkdir(parents=True, exist_ok=True)

    with (path / "cleaned_reports.csv").open("w", newline="") as f:
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
        writer.writerows(cleaned)

    with (path / "invalid_records.csv").open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["row_number", "report_id", "reason", "raw_record"])
        writer.writeheader()
        for row in invalid:
            writer.writerow({
                "row_number": row["row_number"],
                "report_id": row["report_id"],
                "reason": row["reason"],
                "raw_record": str(row["raw_record"]),
            })

    return path


def _calculate_resolution_days(report):
    if report["status"] not in {"resolved", "closed"}:
        return None
    if not report["resolution_date"]:
        return None

    reported = datetime.strptime(report["reported_date"], "%Y-%m-%d")
    resolved = datetime.strptime(report["resolution_date"], "%Y-%m-%d")
    return (resolved - reported).days


def analyse_cleaned_records(records):
    total_reports = len(records)
    reports_by_issue_type = dict(Counter(record["issue_type"] for record in records))
    reports_by_severity = dict(Counter(record["severity"] for record in records))
    reports_by_status = dict(Counter(record["status"] for record in records))

    resolved_count = sum(1 for record in records if record["status"] in {"resolved", "closed"})
    unresolved_count = total_reports - resolved_count

    resolution_days = [
        days for record in records for days in [_calculate_resolution_days(record)] if days is not None
    ]
    average_resolution_days = sum(resolution_days) / len(resolution_days) if resolution_days else 0.0

    return {
        "total_reports": total_reports,
        "reports_by_issue_type": reports_by_issue_type,
        "reports_by_severity": reports_by_severity,
        "reports_by_status": reports_by_status,
        "resolved_vs_unresolved": {
            "resolved": resolved_count,
            "unresolved": unresolved_count,
        },
        "average_resolution_days": average_resolution_days,
    }


def process_csv(csv_path):
    rows = ingest_csv(csv_path)
    cleaned, invalid = clean_civic_records(rows)
    return cleaned, invalid
