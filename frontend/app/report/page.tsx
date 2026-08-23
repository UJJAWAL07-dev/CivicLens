"use client";

import { ChangeEvent, useState } from "react";

export default function ReportPage() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [showReview, setShowReview] = useState(false);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleReview = () => {
    setShowReview(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const categories = [
    {
      icon: "💧",
      name: "Water & Drainage",
      description: "Waterlogging, drainage, sewage",
    },
    {
      icon: "🛣",
      name: "Roads",
      description: "Potholes, damaged roads",
    },
    {
      icon: "🗑",
      name: "Waste",
      description: "Garbage, dumping, sanitation",
    },
    {
      icon: "💡",
      name: "Street & Public",
      description: "Lights, sidewalks, public spaces",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F1E2D1] text-[#541A1A]">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="border-b border-[#541A1A]/15 bg-[#F1E2D1]">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <a href="/" className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center border-2 border-[#541A1A] bg-[#810B38] text-xl font-black text-[#F1E2D1]">
              C
            </div>

            <div>
              <p className="text-lg font-black tracking-tight">
                CivicLens
              </p>

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#810B38]/70">
                Citizen Reporting
              </p>
            </div>

          </a>

          <a
            href="/"
            className="text-sm font-semibold text-[#541A1A]/75 transition hover:text-[#810B38]"
          >
            ← Back to home
          </a>

        </div>

      </header>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">


        {/* =================================================
            INTRO
            ================================================= */}

        <div className="max-w-3xl">

          <div className="mb-5 flex items-center gap-3">

            <span className="h-[2px] w-9 bg-[#810B38]" />

            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#810B38]">
              Citizen report
            </p>

          </div>

          <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.035em] sm:text-6xl">
            Tell us what's
            <span className="text-[#810B38]"> happening.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#541A1A]/70 sm:text-lg">
            Share what you saw, add a little context, and help make the
            problem visible. Your report will receive a unique ID after
            submission so you can track what happens next.
          </p>

        </div>


        {/* =================================================
            PROGRESS
            ================================================= */}

        <div className="mt-12 border-y border-[#541A1A]/15 py-6">

          <div className="flex items-center">

            <ProgressStep
              number="01"
              title="Report"
              active
            />

            <div className="h-px flex-1 bg-[#541A1A]/15" />

            <ProgressStep
              number="02"
              title="Review"
            />

            <div className="h-px flex-1 bg-[#541A1A]/15" />

            <ProgressStep
              number="03"
              title="Submitted"
            />

          </div>

        </div>


        {/* =================================================
            FORM GRID
            ================================================= */}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">


          {/* =================================================
              LEFT FORM
              ================================================= */}

          <div className="border border-[#541A1A]/15 bg-[#F1E2D1]">


            {/* FORM HEADER */}

            <div className="border-b border-[#541A1A]/15 px-7 py-7 sm:px-9">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#810B38]">
                    Step 01
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Describe the issue
                  </h2>

                  <p className="mt-2 text-sm text-[#541A1A]/65">
                    Give us enough information to understand what is
                    happening.
                  </p>

                </div>

                <span className="hidden border border-[#541A1A]/15 bg-[#DCC3AA]/50 px-3 py-2 text-xs font-bold sm:block">
                  Required fields *
                </span>

              </div>

            </div>


            <div className="space-y-10 px-7 py-8 sm:px-9">


              {/* =================================================
                  PHOTO
                  ================================================= */}

              <div>

                <div className="mb-4">

                  <label className="text-sm font-black">
                    Photo of the issue <span className="text-[#810B38]">*</span>
                  </label>

                  <p className="mt-1 text-sm text-[#541A1A]/60">
                    A clear photo helps people understand the problem
                    immediately.
                  </p>

                </div>


                {!image ? (

                  <label
                    htmlFor="issue-image"
                    className="group flex min-h-[250px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#541A1A]/25 bg-[#DCC3AA]/20 px-6 text-center transition hover:border-[#810B38] hover:bg-[#DCC3AA]/35"
                  >

                    <div className="flex h-16 w-16 items-center justify-center border border-[#541A1A]/20 bg-[#F1E2D1] text-2xl transition group-hover:border-[#810B38]">
                      📷
                    </div>

                    <p className="mt-5 text-base font-black">
                      Upload a photo
                    </p>

                    <p className="mt-2 text-sm text-[#541A1A]/60">
                      JPG, PNG or WEBP · Maximum 10 MB
                    </p>

                    <span className="mt-5 border border-[#541A1A] px-5 py-2 text-xs font-black uppercase tracking-wide transition group-hover:bg-[#810B38] group-hover:text-[#F1E2D1]">
                      Choose file
                    </span>

                    <input
                      id="issue-image"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                  </label>

                ) : (

                  <div className="relative overflow-hidden border border-[#541A1A]/20 bg-[#DCC3AA]/30">

                    <img
                      src={image}
                      alt="Uploaded civic issue"
                      className="max-h-[380px] w-full object-cover"
                    />

                    <div className="flex items-center justify-between gap-4 border-t border-[#541A1A]/15 bg-[#F1E2D1] px-5 py-4">

                      <div className="min-w-0">

                        <p className="truncate text-sm font-bold">
                          {fileName}
                        </p>

                        <p className="mt-1 text-xs text-[#541A1A]/55">
                          Photo uploaded successfully
                        </p>

                      </div>

                      <label
                        htmlFor="replace-image"
                        className="shrink-0 cursor-pointer border border-[#541A1A] px-4 py-2 text-xs font-black uppercase tracking-wide hover:bg-[#810B38] hover:text-[#F1E2D1]"
                      >
                        Replace
                      </label>

                      <input
                        id="replace-image"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                      />

                    </div>

                  </div>

                )}

              </div>


              {/* =================================================
                  CATEGORY
                  ================================================= */}

              <div>

                <div className="mb-4">

                  <label className="text-sm font-black">
                    What kind of issue is this?{" "}
                    <span className="text-[#810B38]">*</span>
                  </label>

                  <p className="mt-1 text-sm text-[#541A1A]/60">
                    Choose the category that best describes the problem.
                  </p>

                </div>


                <div className="grid gap-3 sm:grid-cols-2">

                  {categories.map((item) => (

                    <button
                      type="button"
                      key={item.name}
                      onClick={() => setCategory(item.name)}
                      className={`group border p-4 text-left transition ${
                        category === item.name
                          ? "border-[#810B38] bg-[#810B38] text-[#F1E2D1]"
                          : "border-[#541A1A]/15 bg-[#DCC3AA]/20 hover:border-[#810B38]/60 hover:bg-[#DCC3AA]/40"
                      }`}
                    >

                      <div className="flex items-start gap-4">

                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center border ${
                            category === item.name
                              ? "border-[#F1E2D1]/30 bg-[#541A1A]"
                              : "border-[#541A1A]/15 bg-[#F1E2D1]"
                          }`}
                        >
                          {item.icon}
                        </span>

                        <div>

                          <p className="text-sm font-black">
                            {item.name}
                          </p>

                          <p
                            className={`mt-1 text-xs leading-5 ${
                              category === item.name
                                ? "text-[#F1E2D1]/70"
                                : "text-[#541A1A]/55"
                            }`}
                          >
                            {item.description}
                          </p>

                        </div>

                      </div>

                    </button>

                  ))}

                </div>

              </div>


              {/* =================================================
                  DESCRIPTION
                  ================================================= */}

              <div>

                <div className="mb-4 flex items-end justify-between gap-4">

                  <div>

                    <label
                      htmlFor="description"
                      className="text-sm font-black"
                    >
                      What happened?{" "}
                      <span className="text-[#810B38]">*</span>
                    </label>

                    <p className="mt-1 text-sm text-[#541A1A]/60">
                      Describe what you saw and why it needs attention.
                    </p>

                  </div>

                  <span className="shrink-0 text-xs text-[#541A1A]/45">
                    {description.length}/500
                  </span>

                </div>


                <textarea
                  id="description"
                  value={description}
                  maxLength={500}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: Large pothole near the main entrance of the market. It becomes difficult for vehicles to pass after rain..."
                  rows={6}
                  className="w-full resize-none border border-[#541A1A]/20 bg-[#F1E2D1] px-4 py-4 text-sm text-[#541A1A] outline-none placeholder:text-[#541A1A]/35 focus:border-[#810B38] focus:ring-1 focus:ring-[#810B38]"
                />

              </div>


              {/* =================================================
                  LOCATION
                  ================================================= */}

              <div>

                <label
                  htmlFor="location"
                  className="text-sm font-black"
                >
                  Where did it happen?{" "}
                  <span className="text-[#810B38]">*</span>
                </label>

                <p className="mt-1 text-sm text-[#541A1A]/60">
                  Add a street, landmark, area or nearby location.
                </p>

                <div className="mt-4 flex border border-[#541A1A]/20 bg-[#F1E2D1] focus-within:border-[#810B38]">

                  <span className="flex w-12 items-center justify-center border-r border-[#541A1A]/15 text-lg">
                    ⌖
                  </span>

                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Baguiati Main Road, near XYZ Market"
                    className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm outline-none placeholder:text-[#541A1A]/35"
                  />

                </div>

                <button
                  type="button"
                  className="mt-3 text-xs font-black uppercase tracking-wide text-[#810B38] hover:text-[#541A1A]"
                >
                  ◎ Use my current location
                </button>

              </div>


              {/* =================================================
                  SEVERITY
                  ================================================= */}

              <div>

                <label className="text-sm font-black">
                  How serious is the issue?
                </label>

                <div className="mt-4 grid grid-cols-3 border border-[#541A1A]/15">

                  {["Low", "Moderate", "Urgent"].map((level) => (

                    <button
                      type="button"
                      key={level}
                      onClick={() => setSeverity(level)}
                      className={`border-r border-[#541A1A]/15 px-3 py-4 text-sm font-bold last:border-r-0 transition ${
                        severity === level
                          ? "bg-[#810B38] text-[#F1E2D1]"
                          : "bg-[#F1E2D1] hover:bg-[#DCC3AA]/50"
                      }`}
                    >
                      {level}
                    </button>

                  ))}

                </div>

              </div>


              {/* =================================================
                  REVIEW BUTTON
                  ================================================= */}

              <div className="border-t border-[#541A1A]/15 pt-7">

                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                  <div>

                    <p className="text-sm font-bold">
                      Ready to review?
                    </p>

                    <p className="mt-1 text-xs text-[#541A1A]/55">
                      You can check everything before submitting.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleReview}
                    className="bg-[#810B38] px-7 py-4 text-sm font-black uppercase tracking-wide text-[#F1E2D1] transition hover:bg-[#541A1A]"
                  >
                    Review report →
                  </button>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT SIDEBAR
              ================================================= */}

          <aside className="h-fit border border-[#541A1A]/15 bg-[#DCC3AA]/45">


            <div className="border-b border-[#541A1A]/15 px-6 py-6">

              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#810B38]">
                Before you submit
              </p>

              <h2 className="mt-3 text-2xl font-black leading-tight">
                A useful report
                <br />
                is specific.
              </h2>

            </div>


            <div className="divide-y divide-[#541A1A]/10">


              <Tip
                number="01"
                title="Take a clear photo"
                text="Show the issue from a useful distance. Avoid blurry or dark images."
              />

              <Tip
                number="02"
                title="Describe what you saw"
                text="Mention what is wrong, where it is and anything that may help."
              />

              <Tip
                number="03"
                title="Give the right location"
                text="Add a street, landmark, area or your current location."
              />

              <Tip
                number="04"
                title="Be honest about urgency"
                text="Mark urgent only when the issue creates an immediate risk."
              />

            </div>


            {/* QUICK MESSAGE */}

            <div className="border-t border-[#541A1A]/15 bg-[#541A1A] px-6 py-7 text-[#F1E2D1]">

              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#DCC3AA]">
                Remember
              </p>

              <p className="mt-3 text-lg font-bold leading-7">
                Small reports can create visible change.
              </p>

            </div>

          </aside>

        </div>


        {/* =================================================
            REVIEW PANEL
            ================================================= */}

        {showReview && (

          <div className="mt-10 border-2 border-[#810B38] bg-[#F1E2D1]">

            <div className="border-b border-[#541A1A]/15 bg-[#810B38] px-7 py-6 text-[#F1E2D1]">

              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#DCC3AA]">
                Step 02
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Review your report
              </h2>

            </div>


            <div className="grid gap-8 px-7 py-8 lg:grid-cols-[220px_1fr]">

              {image ? (

                <img
                  src={image}
                  alt="Report preview"
                  className="h-52 w-full object-cover"
                />

              ) : (

                <div className="flex h-52 items-center justify-center border border-dashed border-[#541A1A]/25 bg-[#DCC3AA]/20 text-sm text-[#541A1A]/50">
                  No photo added
                </div>

              )}


              <div className="space-y-5">

                <ReviewRow
                  label="Category"
                  value={category || "Not selected"}
                />

                <ReviewRow
                  label="Location"
                  value={location || "Not provided"}
                />

                <ReviewRow
                  label="Severity"
                  value={severity || "Not selected"}
                />

                <div>

                  <p className="text-xs font-black uppercase tracking-wide text-[#810B38]">
                    Description
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#541A1A]/75">
                    {description || "No description provided."}
                  </p>

                </div>

              </div>

            </div>


            <div className="flex flex-col gap-4 border-t border-[#541A1A]/15 px-7 py-6 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => setShowReview(false)}
                className="border border-[#541A1A] px-6 py-3 text-sm font-black uppercase tracking-wide hover:bg-[#DCC3AA]"
              >
                Edit report
              </button>

              <button
                type="button"
                className="bg-[#810B38] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#F1E2D1] hover:bg-[#541A1A]"
              >
                Submit report →
              </button>

            </div>

          </div>

        )}

      </section>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="border-t border-[#541A1A]/15 bg-[#541A1A] px-6 py-8 text-[#F1E2D1]">

        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>

            <p className="font-black">
              CivicLens
            </p>

            <p className="mt-1 text-xs text-[#DCC3AA]/70">
              Making civic problems visible.
            </p>

          </div>

          <p className="text-xs text-[#DCC3AA]/50">
            © 2026 CivicLens
          </p>

        </div>

      </footer>

    </main>
  );
}


/* =============================================================
   PROGRESS STEP
   ============================================================= */

function ProgressStep({
  number,
  title,
  active = false,
}: {
  number: string;
  title: string;
  active?: boolean;
}) {

  return (

    <div className="flex items-center gap-3">

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center border text-xs font-black ${
          active
            ? "border-[#810B38] bg-[#810B38] text-[#F1E2D1]"
            : "border-[#541A1A]/20 bg-[#F1E2D1] text-[#541A1A]/50"
        }`}
      >
        {number}
      </div>

      <span
        className={`hidden text-sm font-bold sm:block ${
          active ? "text-[#541A1A]" : "text-[#541A1A]/45"
        }`}
      >
        {title}
      </span>

    </div>

  );
}


/* =============================================================
   TIP
   ============================================================= */

function Tip({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {

  return (

    <div className="px-6 py-6">

      <div className="flex gap-4">

        <span className="pt-1 text-xs font-black text-[#810B38]">
          {number}
        </span>

        <div>

          <h3 className="text-sm font-black">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#541A1A]/60">
            {text}
          </p>

        </div>

      </div>

    </div>

  );
}


/* =============================================================
   REVIEW ROW
   ============================================================= */

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div className="flex flex-col gap-1 border-b border-[#541A1A]/10 pb-4 sm:flex-row sm:items-center sm:justify-between">

      <span className="text-xs font-black uppercase tracking-wide text-[#810B38]">
        {label}
      </span>

      <span className="text-sm font-bold sm:text-right">
        {value}
      </span>

    </div>

  );
}