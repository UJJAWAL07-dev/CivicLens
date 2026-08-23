"use client";

import { useState } from "react";

type IssueType =
  | "All Issues"
  | "Road Damage"
  | "Water"
  | "Waste"
  | "Drainage";

type Issue = {
  id: string;
  type: Exclude<IssueType, "All Issues">;
  title: string;
  location: string;
  status: "Reported" | "Under Review" | "Assigned" | "Resolved";
  severity: "Low" | "Medium" | "High";
  top: string;
  left: string;
};

const issues: Issue[] = [
  {
    id: "CL-1024",
    type: "Road Damage",
    title: "Large pothole",
    location: "Salt Lake",
    status: "Under Review",
    severity: "High",
    top: "34%",
    left: "28%",
  },
  {
    id: "CL-1031",
    type: "Water",
    title: "Water leakage",
    location: "Bidhannagar",
    status: "Reported",
    severity: "Medium",
    top: "58%",
    left: "43%",
  },
  {
    id: "CL-1042",
    type: "Waste",
    title: "Overflowing garbage",
    location: "New Town",
    status: "Assigned",
    severity: "High",
    top: "25%",
    left: "67%",
  },
  {
    id: "CL-1056",
    type: "Drainage",
    title: "Open drainage",
    location: "Sector V",
    status: "Under Review",
    severity: "High",
    top: "68%",
    left: "61%",
  },
  {
    id: "CL-1063",
    type: "Road Damage",
    title: "Damaged road",
    location: "Park Street",
    status: "Resolved",
    severity: "Medium",
    top: "74%",
    left: "21%",
  },
  {
    id: "CL-1078",
    type: "Water",
    title: "Poor water quality",
    location: "Rajarhat",
    status: "Reported",
    severity: "High",
    top: "45%",
    left: "78%",
  },
];

const filters: IssueType[] = [
  "All Issues",
  "Road Damage",
  "Water",
  "Waste",
  "Drainage",
];

export default function IssueMap() {
  const [activeFilter, setActiveFilter] =
    useState<IssueType>("All Issues");

  const [selectedIssue, setSelectedIssue] =
    useState<Issue | null>(null);

  const filteredIssues =
    activeFilter === "All Issues"
      ? issues
      : issues.filter((issue) => issue.type === activeFilter);

  const getMarkerClass = (type: Issue["type"]) => {
    switch (type) {
      case "Road Damage":
        return "bg-[#810B38]";

      case "Water":
        return "bg-[#541A1A]";

      case "Waste":
        return "bg-[#9A6A45]";

      case "Drainage":
        return "bg-[#6F554A]";

      default:
        return "bg-[#810B38]";
    }
  };

  return (
    <main className="min-h-screen bg-[#F1E2D1] text-[#541A1A]">

      {/* ================= HEADER ================= */}

      <header className="border-b border-[#DCC3AA] bg-[#F1E2D1]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">

          <a
            href="/"
            className="group flex items-center gap-3"
          >
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
            className="text-sm font-medium text-[#541A1A] transition-colors hover:text-[#810B38]"
          >
            ← Back to home
          </a>

        </div>
      </header>


      {/* ================= PAGE INTRO ================= */}

      <section className="mx-auto max-w-7xl px-6 pb-8 pt-14 lg:px-8">

        <div className="max-w-3xl">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#810B38]">
            CIVIC ISSUE MAP
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#541A1A] sm:text-5xl">
            See what your city needs.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#541A1A]/70 sm:text-lg">
            Explore reported civic issues across the city and understand
            where problems are being reported, reviewed, and resolved.
          </p>

        </div>

      </section>


      {/* ================= DASHBOARD STATS ================= */}

      <section className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">

        <div className="grid border border-[#DCC3AA] bg-[#FFFCF8] sm:grid-cols-2 lg:grid-cols-4">

          <div className="border-b border-[#DCC3AA] p-6 sm:border-r lg:border-b-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#810B38]">
              Reports
            </p>

            <p className="mt-2 text-3xl font-bold text-[#541A1A]">
              128
            </p>

            <p className="mt-1 text-xs text-[#541A1A]/55">
              Civic issues reported
            </p>
          </div>


          <div className="border-b border-[#DCC3AA] p-6 lg:border-b-0 lg:border-r">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#810B38]">
              Under review
            </p>

            <p className="mt-2 text-3xl font-bold text-[#541A1A]">
              36
            </p>

            <p className="mt-1 text-xs text-[#541A1A]/55">
              Issues being assessed
            </p>
          </div>


          <div className="border-b border-[#DCC3AA] p-6 sm:border-r lg:border-b-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#810B38]">
              Assigned
            </p>

            <p className="mt-2 text-3xl font-bold text-[#541A1A]">
              21
            </p>

            <p className="mt-1 text-xs text-[#541A1A]/55">
              Sent to relevant teams
            </p>
          </div>


          <div className="p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#810B38]">
              Resolved
            </p>

            <p className="mt-2 text-3xl font-bold text-[#541A1A]">
              71
            </p>

            <p className="mt-1 text-xs text-[#541A1A]/55">
              Issues addressed
            </p>
          </div>

        </div>

      </section>


      {/* ================= MAP DASHBOARD ================= */}

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">

        <div className="overflow-hidden border border-[#DCC3AA] bg-[#FFFCF8]">

          {/* MAP TOOLBAR */}

          <div className="border-b border-[#DCC3AA] p-5 sm:p-6">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#810B38]">
                  LIVE ISSUE OVERVIEW
                </p>

                <h2 className="mt-2 text-xl font-bold text-[#541A1A]">
                  Reported civic issues
                </h2>

              </div>


              {/* FILTERS */}

              <div className="flex flex-wrap gap-2">

                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setSelectedIssue(null);
                    }}
                    className={`border px-4 py-2 text-xs font-bold transition-all duration-200 ${
                      activeFilter === filter
                        ? "border-[#810B38] bg-[#810B38] text-[#F1E2D1]"
                        : "border-[#DCC3AA] bg-[#F1E2D1] text-[#541A1A] hover:border-[#810B38] hover:text-[#810B38]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}

              </div>

            </div>

          </div>


          {/* ================= MAP AREA ================= */}

          <div className="grid lg:grid-cols-[1fr_320px]">

            {/* MAP */}

            <div className="relative min-h-[600px] overflow-hidden bg-[#E9DDCF]">

              {/* MAP GRID */}

              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(#DCC3AA 1px, transparent 1px), linear-gradient(90deg, #DCC3AA 1px, transparent 1px)",
                  backgroundSize: "55px 55px",
                }}
              />


              {/* ABSTRACT ROAD NETWORK */}

              <div className="absolute left-[8%] top-[12%] h-[8px] w-[85%] rotate-[13deg] bg-[#FFFCF8] shadow-sm" />

              <div className="absolute left-[4%] top-[42%] h-[7px] w-[92%] -rotate-[9deg] bg-[#FFFCF8] shadow-sm" />

              <div className="absolute left-[15%] top-[70%] h-[9px] w-[76%] rotate-[18deg] bg-[#FFFCF8] shadow-sm" />

              <div className="absolute left-[25%] top-[-10%] h-[120%] w-[7px] rotate-[20deg] bg-[#FFFCF8] shadow-sm" />

              <div className="absolute left-[59%] top-[-5%] h-[115%] w-[8px] -rotate-[14deg] bg-[#FFFCF8] shadow-sm" />

              <div className="absolute left-[78%] top-[5%] h-[100%] w-[6px] rotate-[8deg] bg-[#FFFCF8] shadow-sm" />


              {/* MAP LABELS */}

              <div className="absolute left-[11%] top-[23%] text-[11px] font-bold uppercase tracking-[0.15em] text-[#541A1A]/40">
                Central
              </div>

              <div className="absolute left-[67%] top-[18%] text-[11px] font-bold uppercase tracking-[0.15em] text-[#541A1A]/40">
                New Town
              </div>

              <div className="absolute left-[35%] top-[55%] text-[11px] font-bold uppercase tracking-[0.15em] text-[#541A1A]/40">
                Salt Lake
              </div>

              <div className="absolute left-[68%] top-[67%] text-[11px] font-bold uppercase tracking-[0.15em] text-[#541A1A]/40">
                Sector V
              </div>


              {/* ISSUE MARKERS */}

              {filteredIssues.map((issue) => (

                <button
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: issue.top,
                    left: issue.left,
                  }}
                  aria-label={`View ${issue.title}`}
                >

                  <span className="absolute inset-0 animate-ping rounded-full bg-[#810B38]/20" />

                  <span
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#FFFCF8] shadow-lg transition-transform duration-200 group-hover:scale-110 ${getMarkerClass(
                      issue.type
                    )}`}
                  >

                    <span className="h-2.5 w-2.5 rounded-full bg-[#F1E2D1]" />

                  </span>

                </button>

              ))}


              {/* MAP CONTROLS */}

              <div className="absolute right-5 top-5 flex flex-col border border-[#DCC3AA] bg-[#FFFCF8] shadow-sm">

                <button
                  className="flex h-10 w-10 items-center justify-center border-b border-[#DCC3AA] text-lg font-bold text-[#541A1A] hover:bg-[#F1E2D1]"
                  aria-label="Zoom in"
                >
                  +
                </button>

                <button
                  className="flex h-10 w-10 items-center justify-center text-lg font-bold text-[#541A1A] hover:bg-[#F1E2D1]"
                  aria-label="Zoom out"
                >
                  −
                </button>

              </div>


              {/* MAP LEGEND */}

              <div className="absolute bottom-5 left-5 border border-[#DCC3AA] bg-[#FFFCF8]/95 p-5 shadow-sm backdrop-blur-sm">

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#541A1A]">
                  Issue categories
                </p>

                <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">

                  <LegendItem
                    color="#810B38"
                    label="Road damage"
                  />

                  <LegendItem
                    color="#541A1A"
                    label="Water"
                  />

                  <LegendItem
                    color="#9A6A45"
                    label="Waste"
                  />

                  <LegendItem
                    color="#6F554A"
                    label="Drainage"
                  />

                </div>

              </div>


              {/* MAP CAPTION */}

              <div className="absolute right-5 bottom-5 hidden border border-[#DCC3AA] bg-[#FFFCF8]/95 px-4 py-3 text-right shadow-sm backdrop-blur-sm sm:block">

                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#810B38]">
                  CivicLens
                </p>

                <p className="mt-1 text-xs text-[#541A1A]/60">
                  Community issue map
                </p>

              </div>

            </div>


            {/* ================= ISSUE PANEL ================= */}

            <aside className="border-t border-[#DCC3AA] bg-[#F1E2D1] lg:border-l lg:border-t-0">

              {!selectedIssue ? (

                <div className="flex h-full min-h-[400px] flex-col justify-between p-7">

                  <div>

                    <div className="flex h-12 w-12 items-center justify-center border border-[#DCC3AA] bg-[#FFFCF8] text-xl text-[#810B38]">
                      ◉
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-[#541A1A]">
                      Explore the map
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#541A1A]/65">
                      Select an issue marker to see more information about
                      the reported problem and its current status.
                    </p>

                  </div>


                  <div className="border-t border-[#DCC3AA] pt-6">

                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#810B38]">
                      Showing
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#541A1A]">
                      {filteredIssues.length}
                    </p>

                    <p className="mt-1 text-xs text-[#541A1A]/55">
                      {activeFilter === "All Issues"
                        ? "issues across the map"
                        : `${activeFilter.toLowerCase()} reports`}
                    </p>

                  </div>

                </div>

              ) : (

                <div className="h-full">

                  {/* SELECTED ISSUE HEADER */}

                  <div className="border-b border-[#DCC3AA] p-7">

                    <button
                      onClick={() => setSelectedIssue(null)}
                      className="text-xs font-bold text-[#810B38] hover:text-[#541A1A]"
                    >
                      ← Back to overview
                    </button>

                    <div className="mt-7">

                      <div className="flex items-center justify-between gap-4">

                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#810B38]">
                          {selectedIssue.type}
                        </span>

                        <span className="border border-[#DCC3AA] bg-[#FFFCF8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#810B38]">
                          {selectedIssue.status}
                        </span>

                      </div>

                      <h3 className="mt-3 text-2xl font-bold leading-tight text-[#541A1A]">
                        {selectedIssue.title}
                      </h3>

                      <p className="mt-2 text-sm text-[#541A1A]/60">
                        {selectedIssue.location}
                      </p>

                    </div>

                  </div>


                  {/* SELECTED ISSUE DETAILS */}

                  <div className="space-y-7 p-7">

                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#810B38]">
                        Report ID
                      </p>

                      <p className="mt-2 font-mono text-sm font-bold text-[#541A1A]">
                        {selectedIssue.id}
                      </p>

                    </div>


                    <div>

                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#810B38]">
                        Severity
                      </p>

                      <div className="mt-2 flex items-center gap-2">

                        <span className="h-2.5 w-2.5 rounded-full bg-[#810B38]" />

                        <span className="text-sm font-semibold text-[#541A1A]">
                          {selectedIssue.severity}
                        </span>

                      </div>

                    </div>


                    {/* STATUS */}

                    <div className="border-t border-[#DCC3AA] pt-6">

                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#810B38]">
                        Current status
                      </p>

                      <div className="mt-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#810B38] text-xs font-bold text-[#F1E2D1]">
                            ✓
                          </div>

                          <div>

                            <p className="text-sm font-bold text-[#541A1A]">
                              {selectedIssue.status}
                            </p>

                            <p className="text-xs text-[#541A1A]/55">
                              Latest available update
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>


                    <a
                      href={`/track?report=${selectedIssue.id}`}
                      className="flex h-12 w-full items-center justify-center bg-[#810B38] text-sm font-bold text-[#F1E2D1] transition-colors hover:bg-[#541A1A]"
                    >
                      View full report
                    </a>

                  </div>

                </div>

              )}

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}


/* ================= LEGEND ITEM ================= */

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />

      <span className="text-[11px] font-medium text-[#541A1A]/65">
        {label}
      </span>

    </div>
  );
}