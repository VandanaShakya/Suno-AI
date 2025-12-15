import React, { useState, useMemo } from "react";
 
const defaultFaqs = [
  {
    q: "Can I use generated music commercially?",
    a: "Yes. Music generated using a paid plan or with a commercial license is licensed for commercial use (streaming, videos, ads, etc.). Check the download modal for license details and any specific restrictions (e.g., resale rules).",
  },
  {
    q: "Can I add sung vocals or lyrics?",
    a: "The model can produce vocal textures and chopped vocal samples, but not guaranteed lifelike sung performances of living artists. For clear lyrics or specific singers, add your recordings to the stems in a DAW or use human vocalists.",
  },
  {
    q: "What are stems and why should I download them?",
    a: "Stems are isolated audio tracks (drums, bass, melody, vocals) exported as separate WAV files. They let you remix, re-balance, or add new elements in a DAW for professional production.",
  },
  {
    q: "What if my track sounds similar to an existing song?",
    a: "Occasional melodic overlaps can happen by chance. If you suspect a close match to a copyrighted work, change the prompt or seed, or contact support with the generated file and prompt for review.",
  },
  {
    q: "How long does generation usually take?",
    a: "Short tracks or standard quality usually generate in seconds to ~1 minute. Longer durations, high-quality WAVs, or stems may take longer. Generation time also depends on server load.",
  },
  {
    q: "Is there an API for programmatic generation?",
    a: "Yes — we provide a developer API for single-prompt generation, seeds, and stem exports. See the Developer docs for rate limits, authentication, and examples.",
  },
  {
    q: "Do you store my prompts or tracks?",
    a: "We retain prompts and generation logs temporarily for safety, analytics, and abuse prevention. See the Privacy Policy for retention windows and how to request deletion.",
  },
  {
    q: "What payment/refund options are available?",
    a: "Subscription and one-time purchase terms are described at checkout and in Billing. Refunds are considered case-by-case; contact support with your order details.",
  },
];

export default function Faqs({ faqs = defaultFaqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [query, setQuery] = useState("");

  // filter FAQs by query (title or answer)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) =>
        f.q.toLowerCase().includes(q) ||
        f.a.toLowerCase().includes(q)
    );
  }, [faqs, query]);

  return (
    <section className="bg-[#030712] py-24">
      <div className="mx-auto w-[92%] md:w-[85%] lg:w-[80%] max-w-6xl">
        <div className="mb-8 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl">
            Quick answers to common questions about generating music with our AI.
            Can't find your question? Reach out to <a className="underline" href="mailto:support@suno.ai">support@suno.ai</a>.
          </p>
        </div>

        

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="p-4 rounded-xl bg-[#0b1116] border border-gray-700 text-gray-300">
              No results found for "<span className="text-white">{query}</span>".
            </div>
          )}

          {filtered.map((faq, idx) => {
            // Map filtered index back to original index for consistent open behavior
            const originalIndex = faqs.indexOf(faq);
            const isOpen = openIndex === originalIndex;

            return (
              <div
                key={originalIndex}
                className="bg-[#0b1116] rounded-xl border border-transparent hover:border-[#4B7DDA]/30 transition duration-200"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : originalIndex)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                >
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                      {faq.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1 hidden sm:block max-w-2xl">
                      {faq.a.slice(0, 120)}{faq.a.length > 120 ? "…" : ""}
                    </p>
                  </div>

                  <div
                    className={`ml-4 flex-shrink-0 rounded-full p-2 transition-transform duration-200 ${
                      isOpen ? "bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] rotate-45" : "bg-transparent"
                    }`}
                    aria-hidden
                  >
                    <svg
                      className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? "transform rotate-45" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </div>
                </button>

                <div
                  role="region"
                  aria-labelledby={`faq-${originalIndex}`}
                  className={`px-4 pb-4 sm:px-5 transition-all duration-300 ${isOpen ? "pt-0 block" : "hidden"}`}
                >
                  <div className="text-sm sm:text-base text-gray-300">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support CTA */}
        <div className="mt-8 text-center">
          <a
            href="mailto:support@suno.ai"
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] text-black font-semibold shadow-lg"
          >
            Contact support
          </a>
        </div>
      </div>
    </section>
  );
}
