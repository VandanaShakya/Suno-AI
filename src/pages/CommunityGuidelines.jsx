import React from 'react';
 import { guidelines } from '../data/data';


export default function CommunityGuidelines() {
 
  return (
    <div className="min-h-screen bg-black text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto bg-black/60 rounded-2xl p-6 md:p-10 shadow-lg">
        <header className="flex items-start gap-4 md:gap-6 flex-col md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div
              aria-hidden
              className="w-14 h-14 rounded-lg flex items-center justify-center font-bold text-black"
              style={{
                background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)',
              }}
            >
              S
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-white">Community Guidelines</h1>
              <p className="text-slate-400 text-sm md:text-base mt-1 max-w-2xl">
                A friendly, inclusive space for creators using Suno AI. Read these
                guidelines to help keep the community healthy and creative.
              </p>
            </div>
          </div>
        </header>

        <main className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <section className="md:col-span-2">
            <ul className="space-y-4">
              {guidelines.map((g, idx) => (
                <li
                  key={idx}
                  className="flex gap-4 items-start bg-black/20 p-4 rounded-lg border border-white/5"
                >
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full mt-1"
                    style={{
                      background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)',
                      boxShadow: '0 6px 20px rgba(250,28,212,0.08)',
                    }}
                    aria-hidden
                  />

                  <div>
                    <h3 className="text-white text-lg font-medium">{g.title}</h3>
                    <p className="text-slate-300 text-sm mt-1">{g.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-sm text-slate-400">
              <p>
                <strong>Enforcement:</strong> Violations of these guidelines may
                result in content removal, warnings, or account suspension depending on severity.
              </p>

              <p className="mt-3">
                <strong>Contact:</strong> For questions or appeals email{' '}
                <a href="mailto:support@suno.ai" className="underline text-slate-100">
                  support@suno.ai
                </a>
                .
              </p>
            </div>
          </section>

          <aside className="md:col-span-1 bg-white/2 rounded-xl p-5 md:p-6">
            <h4 className="text-white font-semibold">Quick summary</h4>
            <p className="text-slate-300 text-sm mt-2">Short, practical rules to follow:</p>

            <ul className="mt-4 space-y-2 text-sm text-slate-100">
              <li className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)'
                  }}
                />
                Be kind • Share only what you own • No harassment
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)'
                  }}
                />
                Protect privacy • Report violations
              </li>
            </ul>

            <a
              className="inline-block mt-6 px-4 py-2 rounded-lg font-semibold text-black bg-gradient-to-r from-[#43D9FA] to-[#FA1CD4]"
              href="#"
            >
              Read full policy
            </a>

            <div className="mt-4 text-slate-300 text-xs">
              <div>Last updated: Dec 5, 2025</div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
