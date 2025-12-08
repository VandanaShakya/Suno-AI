import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { stats, features } from "../data/data";

/* react-icons */
import { FiMusic, FiZap, FiHeadphones, FiGlobe, FiShield, FiPlay, FiArrowRight } from "react-icons/fi";

/* Theme colors used inline in Tailwind classes via hex */
export default function About() {
  const featureIcons = [FiMusic, FiZap, FiHeadphones, FiGlobe, FiShield, FiPlay];

  return (
    <div className="min-h-screen w-full bg-background text-white">
      {/* HERO */}
     <div className="relative min-h-screen w-full overflow-hidden bg-[#131B27] flex items-center justify-center">
      <div 
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 
                   h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full filter blur-3xl opacity-60 **mix-blend-screen** transition-all duration-1000 ease-in-out bubble-1" 
        style={{ 
          // High saturation gradient
          background: 'radial-gradient(circle, rgba(255, 0, 150, 0.9) 0%, rgba(150, 0, 255, 0.7) 100%)',
          willChange: 'transform'
        }}
      ></div>

      {/* Bubble 2: Orange/Yellow */}
      <div 
         className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 
                   h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] rounded-full filter blur-3xl opacity-60 **mix-blend-screen** transition-all duration-1000 ease-in-out bubble-2" 
        style={{ 
           background: 'radial-gradient(circle, rgba(255, 165, 0, 0.9) 0%, rgba(255, 255, 0, 0.7) 100%)',
          willChange: 'transform'
        }}
      ></div>
 <div className="relative z-10 text-center mt-6 px-4 sm:px-0">
  <p className="max-w-3xl mx-auto text-white/90 text-base sm:text-lg md:text-xl leading-relaxed">
  Suno AI is built to empower creators, developers, and studios with cutting-edge music and audio generation tools.
We combine advanced AI research with intuitive design to help anyone bring ideas to life—faster, smarter, and with limitless creative freedom.
  </p>

  {/* Buttons */}
  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
    {/* Primary CTA */}
   <a
  href="#pricing"
  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white shadow-lg transform transition hover:scale-[1.03]"
  style={{ backgroundImage: 'linear-gradient(90deg,#43D9FA,#FA1CD4)' }}
>
  About
  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</a>


    {/* Secondary CTA */}
    <a
      href="/contact"
      className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-medium text-white/90 bg-black/40 border border-white/10 hover:bg-white/5 transition"
      aria-label="Contact sales"
    >
      Contact sales
    </a>
  </div>

  {/* Small pricing hint */}
  <p className="mt-4 text-sm text-white/60 text-center max-w-xl mx-auto">
    Plans from <span className="text-white font-semibold">$0</span> — try free or request a demo for enterprise needs.
  </p>
</div>

      
    </div>

      {/* STATS */}
  <section className="px-4 sm:px-6 py-12 bg-[#131B27]">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label + index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.06 }}
        >
          {/* Gradient Border Wrapper - ADDED HOVER EFFECT HERE */}
          <div className="group relative rounded-xl p-[2px] transition-all duration-300 ease-in-out group-hover:p-[3px] group-hover:shadow-[0_0_25px_rgba(161,70,234,0.3)]">
             {/* The subtle gradient ring effect on hover */}
             <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(90deg,#A146EA,#4B7DDA)", zIndex: -1 }}>
             </div>

            {/* Inner Card - ENHANCED HOVER EFFECTS HERE */}
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

      {/* FEATURES */}
     {/* FEATURES */}
<section className="px-4 sm:px-6 py-12 bg-[#131B27]">
  <div className="max-w-7xl mx-auto">
    <motion.div
      className="text-center mb-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Why Choose{" "}
        <span className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg,#A146EA,#4B7DDA)" }}>
          SonicAI
        </span>
      </h2>
      <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Experience the most advanced AI music generation platform available today.</p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const Icon = featureIcons[index % featureIcons.length];
        return (
          <motion.div
            key={feature.title + index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + index * 0.06 }}
          >
            {/* ADDED HOVER EFFECTS HERE */}
            <div className="group bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.04)]">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(161,70,234,0.4)]"
                  style={{ background: "linear-gradient(135deg, rgba(161,70,234,0.12), rgba(75,125,218,0.08))" }}>
                <Icon className="w-6 h-6" style={{ color: "#A146EA" }} />
              </div>

              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground flex-1">{feature.description}</p>
              <div className="mt-4">
                {/* ADDED HOVER EFFECT TO LINK */}
                <Link to="/pricing" className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-white"
                      style={{ color: '#A146EA' }}>
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
      <section className="px-4 sm:px-6 py-12 bg-[#131B27]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
          >
            <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12" style={{ background: "linear-gradient(180deg, rgba(161,70,234,0.06), rgba(75,125,218,0.03))", border: "1px solid rgba(255,255,255,0.04)" }}>
              {/* animated subtle stripe */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
                animate={{ x: ["-30%", "30%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ background: "linear-gradient(90deg, rgba(161,70,234,0.04), transparent 40%, rgba(75,125,218,0.04))", mixBlendMode: "overlay" }}
              />

              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#A146EA,#4B7DDA)" }}>
                  <FiPlay className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-2">Ready to Create?</h3>
                <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                  Join thousands of creators using SonicAI to bring their musical ideas to life. Start creating for free today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/" className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm font-semibold transition-transform transform hover:scale-[1.02]" style={{ background: "linear-gradient(90deg,#A146EA,#4B7DDA)", color: "white" }}>
                    Start Creating <FiArrowRight className="w-4 h-4" />
                  </Link>

                  <Link to="/pricing" className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm font-semibold border" style={{ borderColor: "rgba(161,70,234,0.14)", color: "#A146EA" }}>
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
