import React, { useState } from 'react';
import { Music, Sparkles, Settings, Download, Zap, BookOpen, HelpCircle, Copy, ChevronDown, Play, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import images from '../assets/images';

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const samplePrompts = [
    'A chill lofi beat, warm piano chords, vinyl crackle, rain field recording — 60s, 85 BPM.',
    'Energetic synthwave with punchy bass, 120 BPM, 80s neon movie chase mood.',
    'Mournful acoustic folk, female vocal texture, acoustic guitar & cello, 3:10, intimate.',
    'Epic orchestral score building to a huge climax with brass & timpani, 2:30+.'
  ];

  const faqs = [
    { q: 'Can I use the music commercially?', a: 'Yes — generated music is available under the license you choose at download. Paid plans include commercial licenses; see Terms for limits.' },
    { q: 'Why does my track sound off?', a: 'Vague or conflicting descriptors cause mismatches. Try simplifying your prompt (genre + mood + 1–2 instruments) and set explicit BPM/duration.' },
    { q: 'Can I add vocals?', a: 'You can request vocal textures and vocal chops. For lyrical or real-voice performances, add your own recorded vocals or use stems to integrate vocals later.' },
    { q: 'How long does generation take?', a: 'Usually 30s–2min depending on length and quality. High-quality WAV stems take longer.' },
    { q: 'What if the song sounds similar to another?', a: 'Change the seed or adjust prompt specifics (different instruments, tempo, or references). Report concerns to support for review.' },
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0118 0%, #030712 50%, #020817 100%)' }}>
      {/* <div className="relative overflow-hidden bg-[#0f1720] min-h-[100vh] sm:min-h-[100vh] flex items-center">
     <div className="absolute inset-0 opacity-30 pointer-events-none">
        
         <div className="absolute inset-0 bg-gradient-to-br from-[#1a2233] via-[#141e2c] to-[#0d121a] opacity-60" />

         <div
            className="absolute top-10 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600 rounded-full blur-3xl"
            style={{ filter: 'blur(80px)' }}
        />

         <div
            className="absolute bottom-10 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500 rounded-full blur-3xl"
            style={{ filter: 'blur(80px)' }}
        />

         <div
            className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px]"
            style={{ transform: 'translate(-50%, -50%)', opacity: 0.35 }}
        />

         <div
            className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-400 rounded-full blur-[120px]"
            style={{ opacity: 0.35 }}
        />

         <div
            className="absolute bottom-0 left-1/2 w-[450px] h-[450px] bg-purple-700 rounded-full blur-[150px]"
            style={{ transform: 'translateX(-50%)', opacity: 0.25 }}
        />

         <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-10 h-10 bg-pink-400 rounded-full blur-2xl opacity-40 animate-pulse"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        filter: "blur(30px)"
                    }}
                />
            ))}
        </div>
    </div>

     <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-32 text-center z-10 w-full">

        <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 mx-auto"
            style={{
                background: 'rgba(124, 58, 237, 0.10)',
                border: '1px solid rgba(124, 58, 237, 0.25)',
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M12 1v3"/><path d="m3.5 20.5 2.5-2.5"/><path d="M4 12H1"/><path d="m20.5 3.5-2.5 2.5"/><path d="M12 23v-3"/><path d="m20.5 20.5-2.5-2.5"/><path d="M23 12h-3"/><path d="m3.5 3.5 2.5 2.5"/></svg>
            <span className="text-xs sm:text-sm text-purple-300 font-medium">
                Help & Support
            </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Need a hand? Get fast, friendly support for Suno AI
            </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Our support team and Knowledge Center are here to help you deliver your best music. Find quick answers, step-by-step guides, troubleshooting help, and tips for composing, exporting stems, collaboration, and account management — whether you’re a new user or a seasoned producer.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
            <a
                href="#help-center"
                className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-white transition-all text-sm sm:text-base shadow-lg"
                style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
            >
                Visit Help Center
            </a>

            <a
                href="#contact-support"
                className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-white transition-all text-sm sm:text-base"
                style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                }}
            >
                Contact Support
            </a>
        </div>

        <p className="mt-5 text-sm text-white/50 text-center max-w-xl mx-auto">
            24/7 support, community forums, and tutorials — trusted by creators globally to resolve issues quickly and keep you making music.
        </p>

    </div>
</div>  */}



{/* hero section  */}
 <div className="relative overflow-hidden min-h-[100vh] flex items-center">

  {/* 🔹 BACKGROUND IMAGE */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <img
      src={images.helpBackImage}
      alt="Background"
      className="w-full h-full object-cover"
      draggable={false}
    />
  </div>

  {/* 🔹 OVERLAY (opacity controlled here) */}
  <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />
  {/* change bg-black/50 → bg-black/30 or bg-black/60 as needed */}

  {/* 🔹 CONTENT */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-32 text-center w-full text-white">

    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 mx-auto border border-white/20 bg-black/30 backdrop-blur">
      <span className="text-xs sm:text-sm font-medium">
        About Suno AI
      </span>
    </div>
    

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 leading-tight ">
       Need a hand? Get fast, friendly support for Suno AI
    </h1>

    <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            Our support team and Knowledge Center are here to help you deliver your best music. Find quick answers, step-by-step guides, troubleshooting help, and tips for composing, exporting stems, collaboration, and account management — whether you’re a new user or a seasoned producer.
    </p>

    <div className="flex flex-wrap justify-center gap-4">
      <a
        href="#features"
        className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold bg-purple-600"
      >
        Visit Help Center
      </a>

      <a
        href="#quick-start"
        className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold border border-white/30 bg-black/30 backdrop-blur"
      >
        Get Started
      </a>
    </div>
<p className="mt-5 text-sm text-white/50 text-center max-w-xl mx-auto">
            24/7 support, community forums, and tutorials — trusted by creators globally to resolve issues quickly and keep you making music.
        </p>

  </div>
</div>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Quick Start - Visual Journey */}

        <section id="quick-start" className="mb-12 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-[#9B49E9]" size={26} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">Quick Start</h2>
          </div>

          <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-3xl">
            Generate your first professional track in under 60 seconds. Follow this simple 4-step workflow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: 1, title: 'Enter Prompt', desc: 'Describe genre, mood, instruments, and duration', icon: <BookOpen size={28} /> },
              { step: 2, title: 'Configure Settings', desc: 'Set BPM, key, stems, and quality options', icon: <Settings size={28} /> },
              { step: 3, title: 'Generate Track', desc: 'Click Generate and wait for AI processing', icon: <Play size={28} /> },
              { step: 4, title: 'Download & Export', desc: 'Choose MP3, WAV, or stems to export', icon: <Download size={28} /> },
            ].map((s, idx) => (
              <motion.div
                key={s.step}
                className="group relative"
                initial={{ y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.36, delay: idx * 0.12 }}
              >
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 sm:opacity-100 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6 sm:p-8 rounded-2xl border transition-all duration-300" style={{ border: '1px solid #507ADB' }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl mb-3 sm:mb-4" style={{ background: 'linear-gradient(135deg, #507ADB, #9B49E9)' }}>
                    {s.icon}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#507ADB] mb-2">STEP {s.step}</div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Key Features Grid */}
        <section id="features" className="mb-12 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Sliders className="text-pink-400" size={26} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">Powerful Features</h2>
          </div>

          {/* Use a color map and inline gradients to avoid Tailwind JIT purging dynamic classes */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {(() => {
              const features = [
                { icon: <Music size={20} />, title: 'Single-Prompt Generation', desc: 'Create complete tracks with one natural language prompt', color: 'purple' },
                { icon: <Settings size={20} />, title: 'Advanced Controls', desc: 'Fine-tune BPM, key, structure, and instrument selection', color: 'pink' },
                { icon: <Download size={20} />, title: 'Stem Exports', desc: 'Export isolated drums, bass, melody, and vocal stems', color: 'cyan' },
                { icon: <Zap size={20} />, title: 'Quality Settings', desc: 'Choose between fast standard or high-quality audio', color: 'blue' },
                { icon: <Sparkles size={20} />, title: 'Seed Control', desc: 'Lock seeds for reproducibility or explore variations', color: 'purple' },
                { icon: <Music size={20} />, title: 'Multiple Formats', desc: 'Download as MP3, WAV, or full stem packages', color: 'pink' },
              ];

              const gradientMap = {
                purple: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                pink: 'linear-gradient(135deg, #f472b6, #ec4899)',
                cyan: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                blue: 'linear-gradient(135deg, #3b82f6, #2563eb)'
              };

              return features.map((f, i) => (
                <div key={i} className="group p-4 sm:p-6 rounded-2xl border transition-all duration-300 hover:scale-105 flex items-start gap-4" style={{ background: 'rgba(10, 1, 24, 0.6)', borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="flex-shrink-0 rounded-xl p-2 sm:p-3" style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: gradientMap[f.color] }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1">{f.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{f.desc}</p>
                  </div>
                </div>
              ));
            })()}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-12 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="text-purple-400" size={26} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border overflow-hidden transition-all" style={{ background: 'rgba(10, 1, 24, 0.6)', borderColor: openFaq === i ? 'rgba(124, 58, 237, 0.5)' : 'rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 sm:p-6 flex items-center justify-between text-left transition-colors hover:cursor-pointer hover:bg-opacity-5"
                >
                  <span className="font-bold text-white text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown size={20} className={`text-purple-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section className="text-center py-10 sm:py-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 blur-3xl opacity-20"></div>
            <div className="relative p-6 sm:p-12 rounded-2xl border" style={{ background: 'rgba(10, 1, 24, 0.8)', borderColor: 'rgba(255,255,255,0.06)' }}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3">Ready to Create?</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">Start generating professional music with AI. No experience required.</p>
              <Link to="/contact-us">
                <button className="px-6 py-3 sm:px-10 sm:py-4 rounded-lg sm:rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-2xl text-sm sm:text-base" style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}>
                  Start Generating Music
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Help;
