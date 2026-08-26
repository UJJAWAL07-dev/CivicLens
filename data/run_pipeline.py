import argparse
from pathlib import Path

from data.civic_pipeline import run_pipeline
from data.generate_sample_data import write_sample_dataset


def main(arguments=None):
    parser = argparse.ArgumentParser(description="Run the CivicLens data MVP pipeline.")
    parser.add_argument(
        "--raw-csv",
        type=Path,
        help="Existing raw CSV to process. If omitted, a reproducible sample is generated.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path(__file__).resolve().parent / "processed",
        help="Directory for cleaned data and reports.",
    )
    args = parser.parse_args(arguments)

    dataset_path = args.raw_csv
    if dataset_path is None:
        dataset_path = Path(__file__).resolve().parent / "raw" / "sample_reports.csv"
        write_sample_dataset(dataset_path, record_count=150)

    result = run_pipeline(dataset_path, args.output_dir)
    print(f"Raw records: {result['raw_rows']}")
    print(f"Cleaned records: {result['cleaned_rows']}")
    print(f"Invalid records flagged: {result['invalid_rows']}")
    print(f"Output directory: {result['output_dir']}")


if __name__ == "__main__":
    main()
