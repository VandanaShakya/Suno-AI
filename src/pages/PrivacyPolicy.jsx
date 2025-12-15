import React from 'react'
import { privacyData } from '../data/data'

const PrivacyPolicy = () => {
  return (
    <div className="w-full bg-black">
      <div className="min-h-screen text-slate-100 px-3 py-4 md:p-12">
        <div className="w-full md:w-[78%] mx-auto">

          {/* HEADER */}
          <header className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 py-3 md:py-8">
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="w-11 h-11 md:w-14 md:h-14 rounded-lg flex items-center justify-center font-bold text-white"
                style={{
                  background: 'linear-gradient(90deg,#507ADB,#9B49E9)',
                }}
              >
                P
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-white text-left">
                  Privacy Policy
                </h1>
                <p className="text-slate-400 text-sm md:text-base mt-1 max-w-2xl text-left">
                  This Privacy Policy describes how Suno AI collects and uses your information.
                </p>
              </div>
            </div>
          </header>

          {/* MAIN */}
          <main className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            
            {/* ARTICLE */}
            <article className="md:col-span-2 space-y-3 md:space-y-6">
              {privacyData.map((s, idx) => (
                <section
                  key={idx}
                  className="bg-black/30 p-3 md:p-5 rounded-lg border border-white/5"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{
                        background: 'linear-gradient(90deg,#507ADB,#9B49E9)',
                      }}
                      aria-hidden
                    >
                      {idx + 1}
                    </div>

                    <div>
                      <h3 className="text-white text-base md:text-lg font-medium text-left">
                        {s.title}
                      </h3>
                      <p className="text-slate-300 text-sm mt-2 text-left">
                        {s.content}
                      </p>
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

            {/* SIDEBAR */}
            <aside className="md:col-span-1 bg-white/5 rounded-xl p-4 md:p-6">
              <h4 className="text-white font-semibold text-left">
                Key points
              </h4>
              <p className="text-slate-300 text-sm mt-2 text-left">
                What you should know at a glance:
              </p>

              <ul className="mt-4 space-y-3 text-sm text-slate-100">
                <li className="flex items-start gap-3">
                  <span
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ background: 'linear-gradient(90deg,#507ADB,#9B49E9)' }}
                  />
                  <span className="text-left">
                    We collect account, usage, and technical data to operate the service.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ background: 'linear-gradient(90deg,#507ADB,#9B49E9)' }}
                  />
                  <span className="text-left">
                    You can request access, correction, or deletion of your data.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span
                    className="w-3 h-3 rounded-full mt-1"
                    style={{ background: 'linear-gradient(90deg,#507ADB,#9B49E9)' }}
                  />
                  <span className="text-left">
                    Contact support@suno.ai for privacy requests.
                  </span>
                </li>
              </ul>

              <a
                className="inline-block mt-4 px-4 py-2 rounded-lg font-semibold text-white text-sm md:text-base
                bg-gradient-to-r from-[#507ADB] to-[#9B49E9]"
                href="#"
              >
                Download full policy
              </a>

              <div className="mt-4 text-slate-300 text-xs text-left">
                <div>Last updated: Dec 5, 2025</div>
                <div className="mt-2">
                  Contact:{' '}
                  <a href="mailto:support@suno.ai" className="underline">
                    support@suno.ai
                  </a>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
