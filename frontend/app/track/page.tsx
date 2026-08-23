"use client";

import { useState } from "react";

type Report = {
  id: string;
  issue: string;
  location: string;
  submitted: string;
  severity: "Low" | "Medium" | "High";
  status: "Submitted" | "Under Review" | "Assigned" | "Resolved";
};

const demoReport: Report = {
  id: "CL-1024",
  issue: "Road Damage / Pothole",
  location: "Salt Lake, Kolkata",
  submitted: "23 August 2026",
  severity: "High",
  status: "Under Review",
};

const stages = [
  {
    title: "Submitted",
    description: "Your report has been received.",
  },
  {
    title: "Under Review",
    description: "The issue is being assessed.",
  },
  {
    title: "Assigned",
    description: "The concerned authority has been notified.",
  },
  {
    title: "Resolved",
    description: "The civic issue has been addressed.",
  },
];

export default function TrackReport() {
  const [reportId, setReportId] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const cleanId = reportId.trim().toUpperCase();

    if (!cleanId) {
      setReport(null);
      setSearched(true);
      return;
    }

    if (cleanId === demoReport.id) {
      setReport(demoReport);
    } else {
      setReport(null);
    }

    setSearched(true);
  };

  const getStageIndex = (status: Report["status"]) => {
    return stages.findIndex((stage) => stage.title === status);
  };

  const currentStage = report ? getStageIndex(report.status) : -1;

  return (
    <main className="min-h-screen bg-[#F1E2D1] text-[#541A1A]">
      {/* HEADER */}
      <header className="border-b border-[#DCC3AA] bg-[#F1E2D1]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center border-2 border-[#541A1A] bg-[#810B38] text-xl font-bold text-[#F1E2D1] transition-transform duration-200 group-hover:-rotate-3">
              C
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight text-[#541A1A]">
                CivicLens
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#810B38]">
                Citizen Reporting
              </div>
            </div>
          </a>

          <a
            href="/"
            className="text-sm font-medium text-[#541A1A] transition-colors duration-200 hover:text-[#810B38]"
          >
            ← Back to home
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#810B38]">
            REPORT TRACKING
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-[#541A1A] sm:text-5xl lg:text-6xl">
            Know where your report stands.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#541A1A]/75 sm:text-lg">
            Enter your CivicLens report ID to see its current status,
            submission details, and progress toward resolution.
          </p>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="mx-auto max-w-6xl px-6 pb-12 lg:px-8">
        <div className="border border-[#DCC3AA] bg-[#F1E2D1] p-6 shadow-[0_12px_35px_rgba(84,26,26,0.08)] sm:p-8">
          <div className="mb-5">
            <p className="text-sm font-bold text-[#541A1A]">
              Find your report
            </p>

            <p className="mt-1 text-sm text-[#541A1A]/65">
              Your report ID was provided when you submitted the issue.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <label
                htmlFor="report-id"
                className="sr-only"
              >
                Report ID
              </label>

              <input
                id="report-id"
                type="text"
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Enter report ID e.g. CL-1024"
                className="h-14 w-full border border-[#DCC3AA] bg-white px-5 text-sm font-medium text-[#541A1A] outline-none transition-all placeholder:text-[#541A1A]/40 focus:border-[#810B38] focus:ring-2 focus:ring-[#810B38]/10"
              />
            </div>

            <button
              onClick={handleSearch}
              className="h-14 bg-[#810B38] px-8 text-sm font-bold text-[#F1E2D1] transition-all duration-200 hover:bg-[#541A1A] focus:outline-none focus:ring-2 focus:ring-[#810B38] focus:ring-offset-2"
            >
              Search Report
            </button>
          </div>

          <p className="mt-4 text-xs text-[#541A1A]/55">
            Demo report ID:{" "}
            <button
              onClick={() => setReportId("CL-1024")}
              className="font-bold text-[#810B38] underline underline-offset-2"
            >
              CL-1024
            </button>
          </p>
        </div>
      </section>

      {/* SEARCH RESULT */}
      {searched && !report && (
        <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
          <div className="border border-[#DCC3AA] bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#DCC3AA] bg-[#F1E2D1] text-2xl">
              ?
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#541A1A]">
              We couldn't find that report.
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#541A1A]/65">
              Check the report ID and try again. Make sure you include the
              complete ID exactly as it appears in your confirmation.
            </p>
          </div>
        </section>
      )}

      {/* REPORT DETAILS */}
      {report && (
        <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
          {/* REPORT HEADER CARD */}
          <div className="border border-[#DCC3AA] bg-white">
            <div className="flex flex-col gap-6 border-b border-[#DCC3AA] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#810B38]">
                    REPORT
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[#DCC3AA]" />

                  <span className="font-mono text-sm font-bold text-[#541A1A]">
                    {report.id}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#541A1A] sm:text-3xl">
                  {report.issue}
                </h2>
              </div>

              <div className="inline-flex w-fit items-center gap-2 border border-[#DCC3AA] bg-[#F1E2D1] px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#810B38]" />

                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#810B38]">
                  {report.status}
                </span>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid border-b border-[#DCC3AA] sm:grid-cols-2 lg:grid-cols-4">
              <div className="border-b border-[#DCC3AA] p-6 sm:border-r lg:border-b-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#810B38]">
                  Issue
                </p>

                <p className="mt-2 text-sm font-semibold text-[#541A1A]">
                  {report.issue}
                </p>
              </div>

              <div className="border-b border-[#DCC3AA] p-6 lg:border-b-0 lg:border-r">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#810B38]">
                  Location
                </p>

                <p className="mt-2 text-sm font-semibold text-[#541A1A]">
                  {report.location}
                </p>
              </div>

              <div className="border-b border-[#DCC3AA] p-6 sm:border-r lg:border-b-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#810B38]">
                  Submitted
                </p>

                <p className="mt-2 text-sm font-semibold text-[#541A1A]">
                  {report.submitted}
                </p>
              </div>

              <div className="p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#810B38]">
                  Severity
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#810B38]" />

                  <span className="text-sm font-semibold text-[#541A1A]">
                    {report.severity}
                  </span>
                </div>
              </div>
            </div>

            {/* PROGRESS */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#810B38]">
                    Progress
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-[#541A1A]">
                    Your report is moving forward.
                  </h3>
                </div>

                <p className="text-sm font-medium text-[#541A1A]/55">
                  Step {currentStage + 1} of {stages.length}
                </p>
              </div>

              {/* DESKTOP TIMELINE */}
              <div className="mt-10 hidden sm:block">
                <div className="relative">
                  <div className="absolute left-0 right-0 top-5 h-px bg-[#DCC3AA]" />

                  <div
                    className="absolute left-0 top-5 h-px bg-[#810B38] transition-all duration-500"
                    style={{
                      width:
                        currentStage === 0
                          ? "0%"
                          : `${(currentStage / (stages.length - 1)) * 100}%`,
                    }}
                  />

                  <div className="relative grid grid-cols-4">
                    {stages.map((stage, index) => {
                      const completed = index <= currentStage;

                      return (
                        <div
                          key={stage.title}
                          className="flex flex-col items-center text-center"
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center border-2 text-xs font-bold transition-all duration-300 ${
                              completed
                                ? "border-[#810B38] bg-[#810B38] text-[#F1E2D1]"
                                : "border-[#DCC3AA] bg-[#F1E2D1] text-[#541A1A]/45"
                            }`}
                          >
                            {completed ? "✓" : `0${index + 1}`}
                          </div>

                          <p
                            className={`mt-4 text-sm font-bold ${
                              completed
                                ? "text-[#541A1A]"
                                : "text-[#541A1A]/45"
                            }`}
                          >
                            {stage.title}
                          </p>

                          <p className="mt-1 max-w-[150px] text-xs leading-5 text-[#541A1A]/55">
                            {stage.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* MOBILE TIMELINE */}
              <div className="mt-8 space-y-5 sm:hidden">
                {stages.map((stage, index) => {
                  const completed = index <= currentStage;

                  return (
                    <div key={stage.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center border-2 text-xs font-bold ${
                            completed
                              ? "border-[#810B38] bg-[#810B38] text-[#F1E2D1]"
                              : "border-[#DCC3AA] bg-[#F1E2D1] text-[#541A1A]/45"
                          }`}
                        >
                          {completed ? "✓" : `0${index + 1}`}
                        </div>

                        {index < stages.length - 1 && (
                          <div
                            className={`mt-2 h-8 w-px ${
                              index < currentStage
                                ? "bg-[#810B38]"
                                : "bg-[#DCC3AA]"
                            }`}
                          />
                        )}
                      </div>

                      <div className="pt-1">
                        <p
                          className={`text-sm font-bold ${
                            completed
                              ? "text-[#541A1A]"
                              : "text-[#541A1A]/45"
                          }`}
                        >
                          {stage.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#541A1A]/55">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* LOWER INFORMATION */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="border border-[#DCC3AA] bg-[#541A1A] p-7 text-[#F1E2D1] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DCC3AA]">
                What happens next
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Your report is being reviewed.
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#F1E2D1]/75">
                The relevant civic team will assess the reported issue and
                determine the appropriate action. You can return to this page
                anytime using your report ID.
              </p>

              <div className="mt-7 border-t border-[#F1E2D1]/15 pt-5">
                <p className="text-xs font-medium text-[#F1E2D1]/55">
                  Keep your report ID safe
                </p>

                <p className="mt-1 font-mono text-lg font-bold text-[#F1E2D1]">
                  {report.id}
                </p>
              </div>
            </div>

            <div className="border border-[#DCC3AA] bg-[#DCC3AA]/35 p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#810B38]">
                CivicLens
              </p>

              <h3 className="mt-3 text-xl font-bold text-[#541A1A]">
                Your voice creates visibility.
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#541A1A]/65">
                Every useful report helps build a clearer picture of the
                problems affecting our communities.
              </p>

              <a
                href="/report"
                className="mt-6 inline-flex items-center text-sm font-bold text-[#810B38] transition-colors hover:text-[#541A1A]"
              >
                Report another issue
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* INITIAL EMPTY STATE */}
      {!searched && (
        <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
          <div className="border-t border-[#DCC3AA] pt-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <p className="text-xs font-bold text-[#810B38]">01</p>

                <h3 className="mt-3 text-base font-bold text-[#541A1A]">
                  Submit an issue
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#541A1A]/60">
                  Tell CivicLens what is happening in your neighbourhood.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-[#810B38]">02</p>

                <h3 className="mt-3 text-base font-bold text-[#541A1A]">
                  Receive your ID
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#541A1A]/60">
                  Your report receives a unique reference that you can keep.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-[#810B38]">03</p>

                <h3 className="mt-3 text-base font-bold text-[#541A1A]">
                  Follow progress
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#541A1A]/60">
                  Return here to understand what is happening with your
                  report.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}