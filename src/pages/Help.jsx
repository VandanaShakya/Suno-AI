import React, { useState } from 'react';
import { Music, Sparkles, Settings, Download, Zap, BookOpen, HelpCircle, Copy, ChevronDown, Play, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


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
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">AI-Powered Music Generation</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Help Center
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Master AI music generation with our comprehensive guide. From your first prompt to professional stems export.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#quick-start" className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-2xl" style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}>
              Get Started
            </a>
            <a href="#faq" className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              View FAQ
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Quick Start - Visual Journey */}
   

<section id="quick-start" className="mb-20">
  <div className="flex items-center gap-3 mb-8">
    <Zap className="text-[#9B49E9]" size={32} />
    <h2 className="text-4xl font-black text-white">Quick Start</h2>
  </div>

  <p className="text-gray-300 text-lg mb-12 max-w-3xl">
    Generate your first professional track in under 60 seconds. Follow this simple 4-step workflow.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { step: 1, title: 'Enter Prompt', desc: 'Describe genre, mood, instruments, and duration', icon: <BookOpen size={32} /> },
      { step: 2, title: 'Configure Settings', desc: 'Set BPM, key, stems, and quality options', icon: <Settings size={32} /> },
      { step: 3, title: 'Generate Track', desc: 'Click Generate and wait for AI processing', icon: <Play size={32} /> },
      { step: 4, title: 'Download & Export', desc: 'Choose MP3, WAV, or stems to export', icon: <Download size={32} /> },
    ].map((s, idx) => (
      <motion.div
        key={s.step}
        className="group relative"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        whileHover={{ y: -5, scale: 1.02 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        {/* Glow background for hover/mobile */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          
        ></div>

        <div
          className="relative p-8 rounded-2xl border transition-all duration-300"
          style={{ border: '1px solid #507ADB' }}
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4"
            style={{ background: 'linear-gradient(135deg, #507ADB, #9B49E9)' }}
          >
            {s.icon}
          </div>
          <div className="text-sm font-bold text-[#507ADB] mb-2">STEP {s.step}</div>
          <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>


     

        {/* Key Features Grid */}
        <section id="features" className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Sliders className="text-pink-400" size={32} />
            <h2 className="text-4xl font-black text-white">Powerful Features</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Music size={24} />, title: 'Single-Prompt Generation', desc: 'Create complete tracks with one natural language prompt', color: 'purple' },
              { icon: <Settings size={24} />, title: 'Advanced Controls', desc: 'Fine-tune BPM, key, structure, and instrument selection', color: 'pink' },
              { icon: <Download size={24} />, title: 'Stem Exports', desc: 'Export isolated drums, bass, melody, and vocal stems', color: 'cyan' },
              { icon: <Zap size={24} />, title: 'Quality Settings', desc: 'Choose between fast standard or high-quality audio', color: 'blue' },
              { icon: <Sparkles size={24} />, title: 'Seed Control', desc: 'Lock seeds for reproducibility or explore variations', color: 'purple' },
              { icon: <Music size={24} />, title: 'Multiple Formats', desc: 'Download as MP3, WAV, or full stem packages', color: 'pink' },
            ].map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl border transition-all duration-300 hover:scale-105" style={{ background: 'rgba(10, 1, 24, 0.6)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-gradient-to-br from-${f.color}-600 to-${f.color}-800`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

       
        {/* FAQ Section */}
        <section id="faq" className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="text-purple-400" size={32} />
            <h2 className="text-4xl font-black text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border overflow-hidden transition-all" style={{ background: 'rgba(10, 1, 24, 0.6)', borderColor: openFaq === i ? 'rgba(124, 58, 237, 0.5)' : 'rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left transition-colors hover:cursor-pointer hover:bg-opacity-5"
                >
                  <span className="font-bold text-white text-lg">{faq.q}</span>
                  <ChevronDown size={24} className={`text-purple-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section className="text-center py-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 blur-3xl opacity-30"></div>
            <div className="relative p-12 rounded-3xl border" style={{ background: 'rgba(10, 1, 24, 0.8)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <h2 className="text-3xl font-black text-white mb-4">Ready to Create?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Start generating professional music with AI. No experience required.</p>
             <Link to="/contact-us">
               <button className="px-10 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-2xl" style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}>
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