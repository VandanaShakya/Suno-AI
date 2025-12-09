import React from 'react'
import { termsOfServices } from '../data/data'

const TermsOfServices = () => {
  return (
    <div className="w-full bg-[#030712]">
      <div className="min-h-screen text-slate-100 p-4 md:p-12">
        <div className="w-full md:w-[78%] mx-auto">

          {/* HEADER */}
          <header className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-6 md:py-10">
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center font-bold text-black"
                style={{
                  background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)',
                }}
              >
                T
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-white text-left">
                  Terms of Service
                </h1>
                <p className="text-slate-400 text-sm md:text-base mt-1 max-w-2xl text-left">
                  These Terms govern your use of Suno AI. Read carefully — they affect your legal rights.
                </p>
              </div>
            </div>
          </header>

          {/* MAIN */}
          <main className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Article */}
            <article className="md:col-span-2 space-y-4 md:space-y-6">
              {termsOfServices.map((s, idx) => (
                <section key={idx} className="bg-black/20 p-4 md:p-5 rounded-lg border border-white/5">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-black font-semibold"
                      style={{
                        background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)'
                      }}
                      aria-hidden
                    >
                      {idx + 1}
                    </div>

                    <div>
                      <h3 className="text-white text-base md:text-lg font-medium text-left">{s.title}</h3>
                      <p className="text-slate-300 text-sm mt-2 text-left">{s.content}</p>
                    </div>
                  </div>
                </section>
              ))}

              <div className="text-slate-400 text-sm text-left">
                <p className="mt-2">
                  <strong>Effective date:</strong> Dec 5, 2025
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="md:col-span-1 bg-white/5 rounded-xl p-4 md:p-6">
              <h4 className="text-white font-semibold text-left">At a glance</h4>
              <p className="text-slate-300 text-sm mt-2 text-left">Key points to remember:</p>

              <ul className="mt-4 space-y-3 text-sm text-slate-100">
                <li className="flex items-start gap-3">
                  <span
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)' }}
                  />
                  <span className="text-left">You retain ownership of your content; you grant Suno AI a license to operate the service.</span>
                </li>

                <li className="flex items-start gap-3">
                  <span
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)' }}
                  />
                  <span className="text-left">Paid features and billing are subject to subscription terms.</span>
                </li>

                <li className="flex items-start gap-3">
                  <span
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)' }}
                  />
                  <span className="text-left">We may suspend accounts for violations.</span>
                </li>
              </ul>

              <a
                className="inline-block mt-5 px-3 py-2 rounded-lg font-semibold text-black text-sm md:text-base bg-gradient-to-r from-[#43D9FA] to-[#FA1CD4]"
                href="#"
              >
                Download PDF
              </a>

              <div className="mt-4 text-slate-300 text-xs text-left">
                <div>Last updated: Dec 5, 2025</div>
                <div className="mt-2">Contact: <a href="mailto:support@suno.ai" className="underline">support@suno.ai</a></div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  )
}

export default TermsOfServices
