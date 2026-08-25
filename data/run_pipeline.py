from pathlib import Path

from data.civic_pipeline import process_csv
from data.generate_sample_data import write_sample_dataset


def main():
    dataset_path = Path(__file__).resolve().parent / "sample_reports.csv"
    write_sample_dataset(dataset_path, record_count=150)
    cleaned, invalid = process_csv(dataset_path)

    print(f"Cleaned records: {len(cleaned)}")
    print(f"Invalid records flagged: {len(invalid)}")
    if invalid:
        print("Examples:")
        for item in invalid[:5]:
            print(item)


if __name__ == "__main__":
    main()
