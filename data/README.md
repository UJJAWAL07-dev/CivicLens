# CivicLens Data

## Owner
Member 5 — Data Engineering & Analytics

## Mission
The data layer for CivicLens powers civic intelligence by collecting, validating, transforming, and analyzing public service and infrastructure signals. It turns noisy, fragmented civic data into structured insights that support issue detection, prioritization, geospatial risk analysis, and reporting.

## Core Responsibilities
- Data ingestion from public APIs, government feeds, user reports, and geospatial sources
- Data cleaning, deduplication, and schema validation
- Temporal and geospatial enrichment for civic events
- ETL and transformation pipelines for analytics workloads
- Historical dataset storage and versioning
- Quality monitoring, anomaly detection, and reporting
- Supporting AI and GIS modules with reliable, query-ready datasets

## Tech Stack
- Python
- Pandas / Polars
- PostgreSQL
- PostGIS
- DuckDB or SQLite for lightweight analytics
- dbt for warehouse transformation workflows
- Apache Airflow or Prefect for orchestration
- GeoPandas for spatial processing
- Jupyter notebooks for exploration and prototyping

## Data Sources
1. Citizen-generated issue reports
2. Government service and infrastructure datasets
3. Public utility and sanitation records
4. Road, drainage, and municipal maintenance datasets
5. Environmental, traffic, and public health indicators
6. Geospatial and location metadata
7. Historical incident and complaint archives

## Data Architecture
CivicLens follows a layered data model:

- Raw layer: unprocessed source data
- Staging layer: normalized and validated records
- Curated layer: cleaned, deduplicated, and enriched datasets
- Analytics layer: aggregated metrics for reporting and prediction
- Spatial layer: point, polygon, and proximity-based geodata

## Dataset Structure
Raw input files belong in `data/raw/` and are never modified by the pipeline. Processed outputs are written to `data/processed/`:

```text
data/
  raw/sample_reports.csv          # source CSV, unchanged
  processed/cleaned_reports.csv   # valid records only
  processed/invalid_records.csv   # flagged records with reasons
  processed/validation_report.json
  processed/analytics_report.json
```

The canonical CSV columns are `report_id`, `issue_type`, `latitude`, `longitude`, `severity`, `status`, `reported_date`, and `resolution_date`.

## Expected Data Domains
- Reports and complaint records
- Issue severity and category classification
- Location and neighborhood metadata
- Service response and resolution history
- Temporal trends and recurrence analysis
- Spatial hotspots and risk clusters

## Data Quality Standards
- Mandatory field validation for report IDs, timestamps, and locations
- Duplicate detection across ingestion cycles
- Standardized categories and status codes
- Geocode verification and location confidence checks
- Null handling and missing-value tracking
- Time-series continuity checks for historical datasets

## Cleaning and Validation Rules
- Required columns must all be present before rows are read.
- Text values are trimmed and normalized to lowercase.
- Issue categories use the documented canonical names; unknown categories are invalid.
- Severity values are `low`, `medium`, `high`, or `critical`.
- Status values are `open`, `pending`, `in_progress`, `resolved`, `closed`, or `reopened`.
- Dates accept common input formats and are written as `YYYY-MM-DD`.
- `reported_date` is required; `resolution_date` may be empty for unresolved reports.
- Latitude must be between -90 and 90; longitude must be between -180 and 180.
- Numeric coordinates are written as decimal numbers in processed data.
- Exact duplicate rows are flagged and excluded from cleaned output.
- Missing or invalid values are written to `invalid_records.csv` with row number and reason.
- A resolution date before the reported date is invalid.

Invalid rows are reported rather than silently discarded. The raw source remains unchanged.

## Recommended Directory Structure
```text
/data
  /raw                 # source files and external exports
  /staging             # transformed but not fully curated data
  /curated             # cleaned and validated civic datasets
  /spatial             # geospatial and GIS-ready datasets
  /warehouse           # analytical tables for dashboards and queries
  /models             # feature tables and ML-ready datasets
  /etl                # pipeline scripts and orchestration logic
  /notebooks          # analysis, profiling, and experimentation
  /schemas            # db and table schema definitions
  /docs               # data dictionary and governance notes
```

## Proposed Core Tables
- issues
- issue_reports
- categories
- locations
- neighborhoods
- resolutions
- incidents_history
- service_requests
- spatial_hotspots

## Data Pipeline Flow
1. Collect raw civic data from sources
2. Validate schema integrity and required fields
3. Clean and standardize values
4. Enrich with geospatial and temporal attributes
5. Deduplicate repeated reports and anomalies
6. Load into curated and analytics datasets
7. Expose curated tables to AI, GIS, and backend services

## Pipeline Execution
Run the complete flow with one command from the repository root:

```bash
python -m data.run_pipeline
```

This generates the reproducible sample input at `data/raw/sample_reports.csv` when no input is supplied. To process an existing raw CSV without changing it:

```bash
python -m data.run_pipeline --raw-csv data/raw/reports.csv --output-dir data/processed
```

The command creates cleaned records, flagged invalid records, a validation report, and an analytics report.

## Analytics Output
`analytics_report.json` contains total reports, counts by issue type, severity, and status, resolved versus unresolved counts, and average resolution time in days. The analytics are calculated from cleaned records only.

## Backend Integration Schema
The backend can consume `processed/cleaned_reports.csv` or the equivalent records from a database. Each processed record has this schema:

| Field | Type | Allowed values / format |
| --- | --- | --- |
| `report_id` | string | non-empty unique source identifier |
| `issue_type` | string | `pothole`, `streetlight`, `water_leakage`, `garbage`, `drainage`, `road_damage`, `traffic_signal`, `manhole` |
| `latitude` | float | -90 to 90, decimal degrees |
| `longitude` | float | -180 to 180, decimal degrees |
| `severity` | string | `low`, `medium`, `high`, `critical` |
| `status` | string | `open`, `pending`, `in_progress`, `resolved`, `closed`, `reopened` |
| `reported_date` | string | ISO date: `YYYY-MM-DD` |
| `resolution_date` | string or null | ISO date, null when unresolved |

Example processed record:

```json
{
  "report_id": "CIV-0042",
  "issue_type": "pothole",
  "latitude": 12.345678,
  "longitude": 76.54321,
  "severity": "high",
  "status": "resolved",
  "reported_date": "2025-01-05",
  "resolution_date": "2025-01-15"
}
```

## Testing
Run the data tests with:

```bash
python -m pytest -q tests/test_data_pipeline.py
```

## Governance and Privacy
- Protect personally identifiable information where applicable
- Mask or anonymize sensitive fields when needed
- Track dataset ownership and update timestamps
- Keep audit logs for transformations and ingestion events
- Define retention policies for historical civic datasets

## Success Metrics
- Data freshness within acceptable SLA windows
- Data completeness > 95% for key civic fields
- Duplicate rate below defined threshold
- Geocoding success rate above target
- Query and dashboard availability for reporting stakeholders

## Next Steps
- Define source-specific schemas
- Set up ingestion jobs for pilot datasets
- Create data quality checks and validation rules
- Build initial analytical tables for issue trends and hotspots
- Align with GIS and AI teams on shared feature and location standards

This data layer is the foundation for CivicLens’ civic intelligence engine and is responsible for ensuring that every incident, trend, and hotspot is accurate, usable, and operationally relevant.
