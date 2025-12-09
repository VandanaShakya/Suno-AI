import React from 'react';
import { pricingPlans } from '../../data/data';
import CreditSection from './CreditsSection';
import { motion } from 'framer-motion';

const Pricing = () => {
  return (
 <>
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


 <div className="relative z-10 text-center mt-6 px-4 sm:px-0 ">
  <p className="max-w-3xl mx-auto text-white/90 text-base sm:text-lg md:text-xl leading-relaxed">
    Simple, flexible pricing — designed for creators and studios.
    Choose a plan that fits your workflow and scale up as you grow.
    High-quality exports, priority rendering, and commercial licenses included.
  </p>

  {/* Buttons */}
  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
    {/* Primary CTA */}
   <a
  href="#pricing"
  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white shadow-lg transform transition hover:scale-[1.03]"
  style={{ backgroundImage: 'linear-gradient(90deg,#43D9FA,#FA1CD4)' }}
>
  View pricing
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