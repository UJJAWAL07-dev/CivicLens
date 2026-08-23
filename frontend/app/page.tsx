"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F1E2D1] text-[#541A1A]">

      {/* =========================================================
          FIXED CIVIC PROBLEMS BACKGROUND
          ========================================================= */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <Image
          src="/civic-problems.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.30]"
        />

        {/* Soft parchment wash */}

        <div className="absolute inset-0 bg-[#F1E2D1]/70" />

      </div>


      {/* =========================================================
          PAGE CONTENT
          ========================================================= */}

      <div className="relative z-10">


        {/* =====================================================
            NAVBAR
            ===================================================== */}

        <header className="sticky top-0 z-50 border-b border-[#541A1A]/15 bg-[#F1E2D1]/95">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

            {/* BRAND */}

            <a href="/" className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#810B38] text-xl font-black text-[#F1E2D1]">
                C
              </div>

              <div>

                <p className="text-lg font-black tracking-tight text-[#541A1A]">
                  CivicLens
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#810B38]/70">
                  Civic Intelligence
                </p>

              </div>

            </a>


            {/* NAVIGATION */}

            <nav className="hidden items-center gap-8 md:flex">

              <a
                href="/"
                className="text-sm font-semibold text-[#541A1A] transition hover:text-[#810B38]"
              >
                Home
              </a>

              <a
                href="/report"
                className="text-sm font-semibold text-[#541A1A] transition hover:text-[#810B38]"
              >
                Report Issue
              </a>

              <a
                href="/track"
                className="text-sm font-semibold text-[#541A1A] transition hover:text-[#810B38]"
              >
                Track Report
              </a>

              <a
                href="/map"
                className="text-sm font-semibold text-[#541A1A] transition hover:text-[#810B38]"
              >
                Issue Map
              </a>

            </nav>


            {/* CTA */}

            <a
              href="/report"
              className="border border-[#541A1A] bg-[#810B38] px-5 py-3 text-sm font-bold text-[#F1E2D1] transition hover:bg-[#541A1A]"
            >
              Report an Issue
            </a>

          </div>

        </header>


        {/* =====================================================
            HERO
            ===================================================== */}

        <section className="relative min-h-[calc(100vh-75px)]">

          <div className="mx-auto flex max-w-7xl items-center px-6 py-24 lg:min-h-[calc(100vh-75px)]">


            <div className="max-w-4xl">


              {/* EYEBROW */}

              <div className="mb-7 flex items-center gap-3">

                <span className="h-[2px] w-10 bg-[#810B38]" />

                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#810B38]">
                  Civic intelligence for everyone
                </p>

              </div>


              {/* HEADING */}

              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-[#541A1A] sm:text-6xl lg:text-8xl">

                Your city has
                <br />

                <span className="text-[#810B38]">
                  problems.
                </span>

                <br />

                Make them visible.

              </h1>


              {/* DIVIDER */}

              <div className="mt-8 h-[3px] w-24 bg-[#810B38]" />


              {/* DESCRIPTION */}

              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#541A1A]/75 sm:text-xl">

                CivicLens gives citizens a simple way to report everyday
                civic problems, track what happens next, and understand
                the issues affecting their neighbourhood.

              </p>


              {/* BUTTONS */}

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <a
                  href="/report"
                  className="inline-flex items-center justify-center gap-3 bg-[#810B38] px-7 py-4 text-sm font-black uppercase tracking-wide text-[#F1E2D1] transition hover:bg-[#541A1A]"
                >
                  Report an Issue
                  <span className="text-lg">
                    →
                  </span>
                </a>

                <a
                  href="/map"
                  className="inline-flex items-center justify-center gap-3 border-2 border-[#541A1A] bg-[#F1E2D1]/80 px-7 py-4 text-sm font-black uppercase tracking-wide text-[#541A1A] transition hover:bg-[#DCC3AA]"
                >
                  Explore Issues
                  <span className="text-lg">
                    →
                  </span>
                </a>

              </div>


              {/* SMALL NOTE */}

              <div className="mt-10 flex items-center gap-3 text-sm text-[#541A1A]/65">

                <span className="flex h-7 w-7 items-center justify-center border border-[#541A1A]/30 text-xs">
                  ✓
                </span>

                <span>
                  Simple reporting. Clear tracking. Visible action.
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            STATS
            ===================================================== */}

        <section className="border-y border-[#541A1A]/15 bg-[#DCC3AA]/80">

          <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">

            <Stat
              number="24/7"
              label="Issue Reporting"
            />

            <Stat
              number="1"
              label="Simple Platform"
            />

            <Stat
              number="100%"
              label="Citizen Focused"
            />

            <Stat
              number="AI"
              label="Powered Insights"
            />

          </div>

        </section>


        {/* =====================================================
            WHY CIVICLENS
            ===================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-28">

          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">


            {/* LEFT */}

            <div>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#810B38]">
                Why CivicLens?
              </p>

              <h2 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-[#541A1A] sm:text-5xl">

                Everyday problems
                <br />

                deserve to be
                <br />

                <span className="text-[#810B38]">
                  seen.
                </span>

              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-[#541A1A]/70">

                From flooded streets to broken roads, civic problems
                affect everyday life. CivicLens turns those experiences
                into structured, visible reports.

              </p>

            </div>


            {/* RIGHT CARDS */}

            <div className="grid gap-5 sm:grid-cols-2">

              <FeatureCard
                number="01"
                title="Report Problems"
                description="Upload a photo, describe the issue and share its location."
                icon="📷"
                href="/report"
              />

              <FeatureCard
                number="02"
                title="Track Progress"
                description="Receive a unique report ID and follow what happens next."
                icon="⌕"
                href="/track"
              />

              <FeatureCard
                number="03"
                title="See the Bigger Picture"
                description="Explore reported civic problems through an interactive map."
                icon="◫"
                href="/map"
              />

              <div className="border-2 border-[#810B38] bg-[#810B38] p-7 text-[#F1E2D1]">

                <p className="text-5xl font-black">
                  01
                </p>

                <div className="mt-10 h-[2px] w-12 bg-[#DCC3AA]" />

                <p className="mt-5 text-lg font-bold">
                  One report can start a conversation.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PUBLIC PROBLEMS STORY
            ===================================================== */}

        <section className="border-y border-[#541A1A]/20 bg-[#541A1A] px-6 py-28 text-[#F1E2D1]">

          <div className="mx-auto max-w-7xl">

            <div className="grid items-center gap-16 lg:grid-cols-2">


              {/* TEXT */}

              <div>

                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#DCC3AA]">
                  What citizens see
                </p>

                <h2 className="mt-5 text-5xl font-black leading-[1] tracking-tight sm:text-6xl">

                  Waterlogging.
                  <br />

                  Potholes.
                  <br />

                  <span className="text-[#DCC3AA]">
                    Broken systems.
                  </span>

                </h2>

                <p className="mt-7 max-w-lg text-lg leading-8 text-[#F1E2D1]/75">

                  These aren't abstract problems. They're the road you
                  travel, the water you drink, the street you walk through
                  and the neighbourhood you call home.

                </p>

              </div>


              {/* POSTER */}

              <div className="relative">

                <div className="border border-[#DCC3AA]/40 bg-[#F1E2D1] p-8 text-[#541A1A] shadow-2xl sm:p-12">

                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#810B38]">
                    CivicLens
                  </p>

                  <h3 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">

                    NOT JUST
                    <br />

                    PROBLEMS.

                    <br />

                    <span className="text-[#810B38]">
                      REAL STRUGGLES.
                    </span>

                  </h3>

                  <div className="mt-8 h-[3px] w-20 bg-[#810B38]" />

                  <p className="mt-6 text-sm font-medium leading-7 text-[#541A1A]/70">

                    Make the issue visible.
                    <br />
                    Give it a voice.
                    <br />
                    Track what happens next.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            HOW IT WORKS
            ===================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-28">

          <div className="max-w-2xl">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#810B38]">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-black text-[#541A1A] sm:text-5xl">
              Three steps.
              <br />
              One clearer city.
            </h2>

          </div>


          <div className="mt-16 grid gap-10 md:grid-cols-3">

            <Step
              number="01"
              title="Spot it"
              text="See a pothole, waterlogging, damaged road or another civic issue."
            />

            <Step
              number="02"
              title="Report it"
              text="Upload evidence, describe what happened and share the location."
            />

            <Step
              number="03"
              title="Follow it"
              text="Use your report ID to see its progress and status."
            />

          </div>

        </section>


        {/* =====================================================
            FINAL CTA
            ===================================================== */}

        <section className="px-6 pb-28">

          <div className="mx-auto max-w-7xl border-2 border-[#541A1A] bg-[#DCC3AA] px-7 py-16 sm:px-14">

            <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">

              <div className="max-w-2xl">

                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#810B38]">
                  Your city. Your voice.
                </p>

                <h2 className="mt-4 text-4xl font-black leading-tight text-[#541A1A] sm:text-5xl">

                  See something that
                  <br />

                  <span className="text-[#810B38]">
                    needs fixing?
                  </span>

                </h2>

              </div>


              <a
                href="/report"
                className="shrink-0 bg-[#810B38] px-8 py-5 text-sm font-black uppercase tracking-wide text-[#F1E2D1] transition hover:bg-[#541A1A]"
              >
                Report an Issue →
              </a>

            </div>

          </div>

        </section>


        {/* =====================================================
            FOOTER
            ===================================================== */}

        <footer className="border-t border-[#F1E2D1]/15 bg-[#541A1A] px-6 py-10 text-[#F1E2D1]">

          <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-lg font-black">
                CivicLens
              </p>

              <p className="mt-1 text-xs text-[#DCC3AA]/70">
                Making civic problems visible.
              </p>

            </div>

            <div className="flex gap-6 text-sm text-[#DCC3AA]">

              <a
                href="/report"
                className="hover:text-[#F1E2D1]"
              >
                Report
              </a>

              <a
                href="/track"
                className="hover:text-[#F1E2D1]"
              >
                Track
              </a>

              <a
                href="/map"
                className="hover:text-[#F1E2D1]"
              >
                Map
              </a>

            </div>

            <p className="text-xs text-[#DCC3AA]/50">
              © 2026 CivicLens
            </p>

          </div>

        </footer>

      </div>

    </main>
  );
}


/* =============================================================
   STAT
   ============================================================= */

function Stat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {

  return (

    <div className="border-r border-[#541A1A]/10 px-4 py-9 text-center last:border-r-0">

      <p className="text-3xl font-black text-[#810B38]">
        {number}
      </p>

      <p className="mt-1 text-sm text-[#541A1A]/70">
        {label}
      </p>

    </div>

  );
}


/* =============================================================
   FEATURE CARD
   ============================================================= */

function FeatureCard({
  number,
  title,
  description,
  icon,
  href,
}: {
  number: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}) {

  return (

    <a
      href={href}
      className="group border border-[#541A1A]/15 bg-[#F1E2D1]/90 p-7 transition duration-300 hover:-translate-y-1 hover:border-[#810B38]/50 hover:bg-[#DCC3AA]/70"
    >

      <div className="flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center border border-[#541A1A]/15 bg-[#DCC3AA] text-xl">
          {icon}
        </div>

        <span className="text-xs font-black text-[#810B38]/50">
          {number}
        </span>

      </div>


      <h3 className="mt-7 text-xl font-black text-[#541A1A]">
        {title}
      </h3>


      <p className="mt-3 text-sm leading-7 text-[#541A1A]/65">
        {description}
      </p>


      <div className="mt-6 text-sm font-black text-[#810B38]">
        Explore →
      </div>

    </a>

  );
}


/* =============================================================
   STEP
   ============================================================= */

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {

  return (

    <div className="border-t-2 border-[#810B38] pt-6">

      <p className="text-sm font-black text-[#810B38]">
        {number}
      </p>

      <h3 className="mt-4 text-2xl font-black text-[#541A1A]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#541A1A]/65">
        {text}
      </p>

    </div>

  );
}