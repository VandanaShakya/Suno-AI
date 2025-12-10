import React from 'react';
import { pricingPlans } from '../../data/data';
import CreditSection from './CreditsSection';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Pricing = () => {
  return (
 <>
<div className="relative overflow-hidden bg-[#0f1720]">
      {/* soft background blobs (subtle, decorative) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute top-20 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600 rounded-full"
          style={{ filter: 'blur(64px)' }}
        />
        <div
          className="absolute bottom-20 right-20 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500 rounded-full"
          style={{ filter: 'blur(64px)' }}
        />
      </div>

      {/* main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center z-10">
        {/* badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 mx-auto"
          style={{ background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.18)' }}
        >
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-xs sm:text-sm text-purple-300 font-medium">AI-Powered Music Generation</span>
        </div>

        {/* heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Pricing
          </span>
        </h1>

        {/* pricing content (kept exactly as provided, reduced to a readable paragraph) */}
        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
          Simple, flexible pricing — designed for creators and studios. Choose a plan that fits your workflow and scale up as you grow. High-quality exports, priority rendering, and commercial licenses included.
        </p>

        {/* CTAs (mobile-optimized smaller sizes) */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <a
            href="#pricing"
            className="
              px-4 py-2            /* smaller mobile size */
              sm:px-8 sm:py-4      /* larger on bigger screens */
              rounded-lg sm:rounded-xl
              font-bold text-white
              transition-all hover:scale-105 hover:shadow-2xl
              text-xs sm:text-base /* smaller text on mobile */
            "
            style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
            aria-label="View pricing"
          >
            View pricing
          </a>

          <a
            href="/contact"
            className="
              px-3 py-2
              sm:px-6 sm:py-3
              rounded-lg sm:rounded-xl
              font-medium text-white/90
              transition-all
              text-xs sm:text-base
              inline-flex items-center justify-center
            "
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            aria-label="Contact sales"
          >
            Contact sales
          </a>
        </div>

        <p className="mt-4 text-sm text-white/60 text-center max-w-xl mx-auto">
          Plans from <span className="text-white font-semibold">$0</span> — try free or request a demo for enterprise needs.
        </p>
      </div>
    </div>
    {/* pricing information */}

    <div id="pricing" className="min-h-screen bg-[#131B27] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-12 px-4">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Suno AI Pricing Plans
        </motion.h1>

        {/* Gradient underline */}
        <motion.div
          className="mx-auto w-32 h-1 rounded-full mb-6"
          style={{ background: "linear-gradient(to right, #507ADB, #9B49E9)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        ></motion.div>

        <motion.p
          className="text-white text-lg sm:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Choose a plan that suits your music creation needs. Whether you're experimenting with a few tracks
          or producing high-quality compositions, Suno AI offers flexible pricing that grows with you.
          Pay only for what you use and unlock the full potential of AI-powered music generation.
        </motion.p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-7xl">
  {pricingPlans.map((plan, idx) => (
  <motion.div
  key={idx}
  className={`relative flex flex-col p-6 rounded-xl border border-gray-700 transition-all duration-300 ${
    plan.popular ? "bg-gray-900 shadow-xl" : ""
  }
  transform hover:-translate-y-1 hover:shadow-[0_0_8px_#507ADB,0_0_12px_#9B49E9] hover:border-[2px] hover:border-gradient-to-r hover:from-[#adc2f3] hover:to-[#c383ff]
  md:hover:-translate-y-1 md:hover:shadow-[0_0_8px_#507ADB,0_0_12px_#9B49E9] md:hover:border-[2px]
  md:border-gray-700 md:border-solid md:shadow-none md:transition-all
  `}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: idx * 0.2 }}
>
  {plan.popular && (
    <span
      className="absolute top-3 right-3 font-bold px-3 py-1 rounded-full text-white text-sm"
      style={{ background: "linear-gradient(to right, #507ADB, #9B49E9)" }}
    >
      Most Popular
    </span>
  )}

  <h2 className="text-2xl font-bold text-white mb-2">{plan.title}</h2>
  <p className="text-gray-400 mb-4">{plan.subtitle}</p>
  <p className="text-3xl font-extrabold text-white mb-6">{plan.price}</p>

  <ul className="flex-1 space-y-2 mb-6">
    {plan.features.map((feature, i) => (
      <li key={i} className="text-gray-300 flex items-center">
        <span className="mr-2 text-lg" style={{ color: "#507ADB" }}>•</span> {feature}
      </li>
    ))}
  </ul>

  <motion.button
    className="w-full py-2 rounded-md font-bold text-white hover:opacity-90 transition duration-300"
    style={{ background: "linear-gradient(to right, #507ADB, #9B49E9)" }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.3 }}
  >
    {plan.button.text}
  </motion.button>
</motion.div>

))}


      </div>
    </div>

    {/* credit section */}
    <CreditSection/>
 </>
  );
};

export default Pricing;