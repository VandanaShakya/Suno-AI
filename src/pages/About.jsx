import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { stats, features } from "../data/data";
import { Sparkles } from 'lucide-react';
import images from "../assets/images";

/* react-icons */
import { FiMusic, FiZap, FiHeadphones, FiGlobe, FiShield, FiPlay, FiArrowRight } from "react-icons/fi";

/* Theme colors used inline in Tailwind classes via hex */
export default function About() {
  const featureIcons = [FiMusic, FiZap, FiHeadphones, FiGlobe, FiShield, FiPlay];
  const basic = { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true, amount: 0.2 } };
  const subtle = (delay = 0) => ({ initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { delay, duration: 0.7 }, viewport: { once: true, amount: 0.2 } });
  return (


  <>
      <style>{`
        body {
          background-color: #030712;
        }
      `}</style>
    <div className="min-h-screen w-full bg-background text-white">
      {/* HERO */}
  <div className="relative overflow-hidden min-h-[100vh] flex items-center">

  {/* 🔹 BACKGROUND IMAGE */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <img
      src={images.aboutBack}
      alt="Background"
      className="w-full h-full object-cover"
      draggable={false}
    />
  </div>

  {/* 🔹 OVERLAY (opacity controlled here) */}
  <div className="absolute inset-0 z-[1] bg-black/70 pointer-events-none" />
  {/* change bg-black/50 → bg-black/30 or bg-black/60 as needed */}

  {/* 🔹 CONTENT */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-32 text-center w-full text-white">

    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 mx-auto border border-white/20 bg-black/30 backdrop-blur">
      <span className="text-xs sm:text-sm font-medium">
        About Suno AI
      </span>
    </div>
    

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 leading-tight ">
      Create music faster — powered by AI, built for creators
    </h1>

    <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
      Suno AI combines cutting-edge music models with a simple, friendly interface so anyone can compose, arrange, and polish tracks in minutes.
    </p>

    <div className="flex flex-wrap justify-center gap-4">
      <a
        href="#features"
        className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold bg-purple-600"
      >
        Explore Features
      </a>

      <a
        href="#quick-start"
        className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold border border-white/30 bg-black/30 backdrop-blur"
      >
        Get Started
      </a>
    </div>

  </div>
</div>




      




      {/* STATS */}
     <section className="px-4 sm:px-6 py-12 bg-[#131B27]">
  <div className="max-w-7xl mx-auto">

    {/* --------- Heading + Subtext --------- */}
    <div className="text-center mb-10">
     <div>
  <h2
    className="text-3xl md:text-4xl font-extrabold 
               bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
               bg-clip-text text-transparent">
    Our Performance Stats
  </h2>
</div>

      <p className="text-white/70 mt-3 text-sm md:text-base max-w-xl mx-auto">
        Key numbers that highlight our growth and achievements.
      </p>
    </div>

    {/* --------- Stats Grid --------- */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div key={stat.label + index} {...subtle(0.06 + index * 0.04)}>
          <div className="group relative rounded-xl p-[2px] transition-all duration-300 ease-in-out group-hover:p-[3px] group-hover:shadow-[0_0_25px_rgba(161,70,234,0.3)]">
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(90deg,#A146EA,#4B7DDA)", zIndex: -1 }}
            />
            <div className="relative bg-[rgba(255,255,255,0.03)] rounded-xl p-6 text-center h-full transition-all duration-300 group-hover:scale-[1.03] group-hover:bg-[rgba(255,255,255,0.06)] group-hover:shadow-2xl">
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{
                  backgroundImage: "linear-gradient(90deg,#A146EA,#4B7DDA)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

  </div>
</section>

     {/* gallery design */}
<div className="w-full mx-auto min-h-screen bg-[#131B27] py-16">
  
  {/* HEADING SECTION */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12">
    <h2 className="
      text-3xl sm:text-4xl md:text-5xl font-extrabold
      bg-gradient-to-r from-[#507ADB] to-[#9B49E9]
      bg-clip-text text-transparent
      mb-4
    ">
      Intelligent Music Generation
    </h2>

    <p className="max-w-3xl mx-auto text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
      Experience the power of AI-driven music generation that transforms ideas into
      original soundscapes. From mood-based melodies to genre-specific compositions,
      our system empowers creators with fast, flexible, and royalty-free music for
      videos, games, and digital content.
    </p>
  </div>

  {/* GRID SECTION */}
  <div className="w-full mx-auto flex items-center justify-center">
    <div
      className="
        grid gap-4 p-3 rounded-lg w-full max-w-7xl
        grid-cols-1
        sm:grid-cols-4 sm:grid-rows-4 sm:h-[85vh]
      "
    >
      {/* AI MUSIC COMPOSITION */}
      <div className="relative rounded-lg overflow-hidden shadow-md
                      h-[70vh] sm:h-auto
                      sm:col-span-1 sm:row-span-4">
        <img src={images.feature1} alt="AI Composition" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-2">
          <p className="text-white font-semibold text-xl sm:text-3xl">
            AI Music Composition
          </p>
          <p className="text-gray-200 text-sm sm:text-base">
            Generate unique melodies and harmonies instantly using advanced AI models.
          </p>
        </div>
      </div>

      {/* GENRE ADAPTATION */}
      <div className="relative rounded-lg overflow-hidden shadow-md
                      h-[70vh] sm:h-auto
                      sm:col-span-1 sm:row-span-3">
        <img src={images.feature2} alt="Genre Adaptation" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-2">
          <p className="text-white font-medium text-lg">
            Genre Adaptation
          </p>
          <p className="text-gray-200 text-sm">
            Seamlessly create music across pop, EDM, jazz, classical, and more.
          </p>
        </div>
      </div>

      {/* MOOD BASED */}
      <div className="relative rounded-lg overflow-hidden shadow-md
                      h-[70vh] sm:h-auto
                      sm:col-span-1 sm:row-span-2">
        <img src={images.feature3} alt="Mood Based" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-2">
          <p className="text-white font-medium text-lg">
            Mood-Based Generation
          </p>
          <p className="text-gray-200 text-sm">
            Select emotions like calm, happy, intense, or cinematic instantly.
          </p>
        </div>
      </div>

      {/* LYRICS TO MUSIC */}
      <div className="relative rounded-lg overflow-hidden shadow-md
                      h-[70vh] sm:h-auto
                      sm:col-span-1 sm:row-span-3">
        <img src={images.feature4} alt="Lyrics to Music" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-2">
          <p className="text-white font-medium text-lg">
            Lyrics-to-Music
          </p>
          <p className="text-gray-200 text-sm">
            Convert written lyrics into complete musical compositions.
          </p>
        </div>
      </div>

      {/* TEMPO CONTROL */}
      <div className="relative rounded-lg overflow-hidden shadow-md
                      h-[60vh] sm:h-auto
                      sm:col-span-1 sm:row-span-2">
        <img src={images.feature5} alt="Tempo Control" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-2">
          <p className="text-white font-medium text-lg">
            Tempo & Rhythm Control
          </p>
          <p className="text-gray-200 text-sm">
            Fine-tune BPM, beats, and rhythmic patterns with precision.
          </p>
        </div>
      </div>

      {/* VOICE SYNTHESIS */}
      <div className="relative rounded-lg overflow-hidden shadow-md
                      h-[55vh] sm:h-auto
                      sm:col-span-1 sm:row-span-1">
        <img src={images.feature6} alt="Voice Synthesis" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3 space-y-1">
          <p className="text-white font-medium">
            AI Voice Synthesis
          </p>
          <p className="text-gray-200 text-xs">
            Generate natural-sounding vocals without recording.
          </p>
        </div>
      </div>

      {/* ROYALTY FREE */}
      <div className="relative rounded-lg overflow-hidden shadow-md
                      h-[55vh] sm:h-auto
                      sm:col-span-1 sm:row-span-1">
        <img src={images.feature7} alt="Royalty Free" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3 space-y-1">
          <p className="text-white font-medium">
            100% Royalty-Free
          </p>
          <p className="text-gray-200 text-xs">
            Safe for commercial use across all platforms.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>





      {/* FEATURES */}
      <section className="px-4 sm:px-6 py-12 bg-[#131B27]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-10" {...subtle(0.12)}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Why Choose{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#A146EA,#4B7DDA)" }}>
                SonicAI
              </span>
            </h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Experience the most advanced AI music generation platform available today.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length] || (() => null);
              return (
                <motion.div key={feature.title + index} {...subtle(0.14 + index * 0.04)}>
                  <div className="group bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.04)]">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(161,70,234,0.4)]" style={{ background: "linear-gradient(135deg, rgba(161,70,234,0.12), rgba(75,125,218,0.08))" }}>
                      <Icon className="w-6 h-6" style={{ color: "#A146EA" }} />
                    </div>

                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1">{feature.description}</p>
                    <div className="mt-4">
                      <Link to="/pricing" className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white" style={{ color: '#A146EA' }}>
                        Learn more
                        <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
  className="relative px-4 sm:px-6 py-12 bg-[#131B27] overflow-hidden"
  {...subtle(0.18)}
>
  

  {/* OPTIONAL DARK OVERLAY */}

  <div className="relative z-10 max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div
        className="relative overflow-hidden rounded-2xl p-8 sm:p-12"
        style={{
          background:
            "linear-gradient(180deg, rgba(161,70,234,0.06), rgba(75,125,218,0.03))",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* MOVING GRADIENT OVERLAY */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          animate={{ x: ["-30%", "30%"] }} 
        />

        {/* CONTENT */}
        {/* BACKGROUND IMAGE */}
  <img
    src={images.ctaBackImage}   // <-- your background image
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-cover opacity-80"
  />
    <div className="absolute inset-0" />

        <div className="relative z-10 text-center">
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#A146EA,#4B7DDA)",
            }}
          >
            
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold mb-2">
            Ready to Create?
          </h3>

          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Join thousands of creators using SonicAI to bring their musical
            ideas to life. Start creating for free today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm font-semibold transition-transform transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(90deg,#A146EA,#4B7DDA)",
                color: "white",
              }}
            >
              Start Creating <FiArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/pricing"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm font-semibold border"
              style={{
                borderColor: "rgba(161,70,234,0.14)",
                color: "#A146EA",
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</motion.section>

    </div>
  </>
  );
}
