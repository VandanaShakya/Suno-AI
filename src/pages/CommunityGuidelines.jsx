import React from 'react';
import { guidelines } from '../data/data';

export default function CommunityGuidelines() {
  return (
    <div className="min-h-screen bg-black text-slate-100 px-3 py-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-black/60 rounded-2xl p-4 md:p-8 shadow-lg">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <div
              aria-hidden
              className="w-11 h-11 md:w-14 md:h-14 rounded-lg flex items-center justify-center font-bold text-white"
              style={{
                background: 'linear-gradient(90deg,#507ADB,#9B49E9)',
              }}
            >
              S
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-white text-left">
                Community Guidelines
              </h1>

              <p className="text-slate-400 text-sm md:text-base mt-1 max-w-2xl text-left">
                A friendly, inclusive space for creators using Suno AI. Read these
                guidelines to help keep the community safe, healthy and creative.
              </p>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="mt-5 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">

          {/* LEFT SECTION */}
          <section className="md:col-span-2">
            <ul className="space-y-3 md:space-y-4">
              {guidelines.map((g, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 md:gap-4 items-start bg-black/30 p-3 md:p-4 rounded-lg border border-white/5"
                >
                  <span
                    className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4 rounded-full mt-1"
                    style={{
                      background: 'linear-gradient(90deg,#507ADB,#9B49E9)',
                      boxShadow: '0 6px 20px rgba(155,73,233,0.15)',
                    }}
                    aria-hidden
                  />

                  <div>
                    <h3 className="text-white text-base md:text-lg font-medium text-left">
                      {g.title}
                    </h3>

                    <p className="text-slate-300 text-sm mt-1 text-left">
                      {g.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 md:mt-6 text-xs md:text-sm text-slate-400 text-left">
              <p>
                <strong>Enforcement:</strong> Violations may result in content removal,
                warnings, or account suspension depending on severity.
              </p>

              <p className="mt-3">
                <strong>Contact:</strong> For appeals or questions, email{' '}
                <a href="mailto:support@suno.ai" className="underline text-slate-100">
                  support@suno.ai
                </a>.
              </p>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="md:col-span-1 bg-white/5 rounded-xl p-4 md:p-6">
            <h4 className="text-white font-semibold text-left text-base md:text-lg">
              Quick summary
            </h4>

            <p className="text-slate-300 text-sm mt-2 text-left">
              Short and practical rules to follow:
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-100">
              <li className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'linear-gradient(90deg,#507ADB,#9B49E9)' }}
                />
                Be kind • Share only what you own • No harassment
              </li>

              <li className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'linear-gradient(90deg,#507ADB,#9B49E9)' }}
                />
                Protect privacy • Report violations
              </li>
            </ul>

            <a
              className="inline-block mt-5 px-4 py-2 rounded-lg font-semibold text-white text-sm md:text-base
              bg-gradient-to-r from-[#507ADB] to-[#9B49E9]"
              href="#"
            >
              Read full policy
            </a>

            <div className="mt-4 text-slate-300 text-xs text-left">
              Last updated: Dec 5, 2025
            </div>
          </aside>

        </main>
      </div>
    </div>
  );
}
