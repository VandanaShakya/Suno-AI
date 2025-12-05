import React from 'react'
import { privacyData } from '../data/data'

const PrivacyPolicy = () => {
    return (
        <>
            <div className='bg-black w-[70%] m-auto'>
                    <header className=" bg-black text-slate-100 p-6 md:p-12">
                <div className="flex items-center gap-4">
                    <div
                        aria-hidden
                        className="w-14 h-14 rounded-lg flex items-center justify-center font-bold text-black"
                        style={{
                            background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)',
                        }}
                    >
                        P
                    </div>


                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-white">Privacy Policy</h1>
                        <p className="text-slate-400 text-sm md:text-base mt-1 max-w-2xl">
                            This Privacy Policy describes how Suno AI collects and uses your information.
                        </p>
                    </div>
                </div>
            </header>


            <main className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <article className="md:col-span-2 space-y-6">
                    {privacyData.map((s, idx) => (
                        <section key={idx} className="bg-black/20 p-5 rounded-lg border border-white/5">
                            <div className="flex items-start gap-3">
                                <div
                                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-black font-semibold"
                                    style={{
                                        background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)'
                                    }}
                                    aria-hidden
                                >
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-medium">{s.title}</h3>
                                    <p className="text-slate-300 text-sm mt-2">{s.content}</p>
                                </div>
                            </div>
                        </section>
                    ))}


                    <div className="text-slate-400 text-sm">
                        <p className="mt-2">
                            <strong>Effective date:</strong> Dec 5, 2025
                        </p>
                    </div>
                </article>


                <aside className="md:col-span-1 bg-white/2 rounded-xl p-5 md:p-6">
                    <h4 className="text-white font-semibold">Key points</h4>
                    <p className="text-slate-300 text-sm mt-2">What you should know at a glance:</p>


                    <ul className="mt-4 space-y-3 text-sm text-slate-100">
                        <li className="flex items-start gap-3">
                            <span
                                className="w-3 h-3 rounded-full mt-1"
                                style={{ background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)' }}
                            />
                            We collect account, usage, and technical data to operate the service.
                        </li>
                        <li className="flex items-start gap-3">
                            <span
                                className="w-3 h-3 rounded-full mt-1"
                                style={{ background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)' }}
                            />
                            You can request access, correction, or deletion of your data.
                        </li>
                        <li className="flex items-start gap-3">
                            <span
                                className="w-3 h-3 rounded-full mt-1"
                                style={{ background: 'linear-gradient(90deg,#43D9FA,#FA1CD4)' }}
                            />
                            Contact support@suno.ai for privacy requests.
                        </li>
                    </ul>


                    <a className="inline-block mt-6 px-4 py-2 rounded-lg font-semibold text-black bg-gradient-to-r from-[#43D9FA] to-[#FA1CD4]" href="#">
                        Download full policy
                    </a>


                    <div className="mt-4 text-slate-300 text-xs">
                        <div>Last updated: Dec 5, 2025</div>
                        <div className="mt-2">Contact: <a href="mailto:support@suno.ai" className="underline">support@suno.ai</a></div>
                    </div>
                </aside>
            </main>
            </div>
    
   </>
  )
}

export default  PrivacyPolicy