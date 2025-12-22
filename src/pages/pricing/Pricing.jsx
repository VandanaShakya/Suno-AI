import React from 'react';
import { useSelector } from 'react-redux';
import { pricingPlans } from '../../data/data';
// import CreditSection from './CreditsSection';
import { motion } from 'framer-motion';
import images from '../../assets/images';
import { usePayment } from '../../hooks/usePayment';
import { useGetUserProfileQuery } from '../../services/api/userApi';


const Pricing = () => {
  const { handlePayment, isLoading, error } = usePayment();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const { data: userProfile } = useGetUserProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  return (
 <>
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
                New: Simple, transparent pricing
            </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Plans for every creator — from hobbyists to teams
            </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Start free, scale affordably. Choose a plan that fits your workflow: Free for quick experiments, Pro for regular creators, and Team for collaboration and enterprise support.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
            <a
                href="#pricing"
                className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-white transition-all text-sm sm:text-base shadow-lg"
                style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
            >
                View Pricing
            </a>

            <a
                href="#contact-sales"
                className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-white transition-all text-sm sm:text-base"
                style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                }}
            >
                Contact Sales
            </a>
        </div>

        <p className="mt-5 text-sm text-white/50 text-center max-w-xl mx-auto">
            Popular starting options — <span className="text-white font-semibold">Free</span>, <span className="text-white font-semibold">Pro $9/mo</span>, <span className="text-white font-semibold">Team $49/mo</span>. Annual billing and custom enterprise plans available.
        </p>

    </div>
</div> */}




{/* hero section  */}
 <div className="relative overflow-hidden min-h-[100vh] flex items-center">

  {/* 🔹 BACKGROUND IMAGE */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <img
      src={images.pricingHeroImage}
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
        Plans for every creator — from hobbyists to teams
    </h1>

    <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            Start free, scale affordably. Choose a plan that fits your workflow: Free for quick experiments, Pro for regular creators, and Team for collaboration and enterprise support.
    </p>

    <div className="flex flex-wrap justify-center gap-4">
      <a
        href="#features"
        className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold bg-purple-600"
      >
        Contact Sales
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

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
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
  {userProfile && userProfile.plan === plan.planType && (
    <span
      className="absolute top-3 left-3 font-bold px-3 py-1 rounded-full text-white text-sm z-10"
      style={{ background: "linear-gradient(to right, #507ADB, #9B49E9)" }}
    >
      Current Plan
    </span>
  )}

  <h2 className={`text-2xl font-bold text-white mb-2 ${
    (plan.popular || (userProfile && userProfile.plan === plan.planType)) ? 'mt-10' : ''
  }`}>{plan.title}</h2>
  <p className="text-gray-400 mb-4">{plan.subtitle}</p>
  <p className="text-3xl font-extrabold text-white mb-6">
    {plan.price}
    {plan.planType !== "free" && <span className="text-lg text-gray-400"> one-time</span>}
  </p>

  <ul className="flex-1 space-y-2 mb-6">
    {plan.features.map((feature, i) => (
      <li key={i} className="text-gray-300 flex items-center">
        <span className="mr-2 text-lg" style={{ color: "#507ADB" }}>•</span> {feature}
      </li>
    ))}
  </ul>

  {error && idx === pricingPlans.length - 1 && (
    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  )}

  <motion.button
    className="w-full py-2 rounded-md font-bold text-white hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    style={{ background: "linear-gradient(to right, #507ADB, #9B49E9)" }}
    whileHover={{ scale: isLoading ? 1 : 1.05 }}
    whileTap={{ scale: isLoading ? 1 : 0.95 }}
    transition={{ duration: 0.3 }}
    onClick={() => handlePayment(plan.planType)}
    disabled={isLoading}
  >
    {isLoading ? "Processing..." : plan.button.text}
  </motion.button>
</motion.div>

))}


      </div>
    </div>

    {/* credit section */}
    {/* <CreditSection/> */}
 </>
  );
};

export default Pricing;