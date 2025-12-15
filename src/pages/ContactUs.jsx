import React from 'react'
import { ArrowRight } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import images from '../assets/images';

const ContactUs = () => {
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
                Contact Us
            </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                We're here to help — reach out to the Suno AI team
            </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Have questions, feedback, partnership ideas, billing issues, or technical concerns? Our team is ready to assist you. 
            Send us a message and we'll get back to you as soon as possible — usually within 24 hours.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
            <a
                href="#contact-form"
                className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-white transition-all text-sm sm:text-base shadow-lg"
                style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
            >
                Send a Message
            </a>

            <a
                href="mailto:support@suno.ai"
                className="px-7 py-3 sm:px-10 sm:py-4 rounded-xl font-bold text-white transition-all text-sm sm:text-base"
                style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                }}
            >
                Email Support
            </a>
        </div>

        <p className="mt-5 text-sm text-white/50 text-center max-w-xl mx-auto">
            For urgent issues, check our Help Center or reach out directly via email. We're committed to giving every creator the support they deserve.
        </p>

    </div>
</div> */}




{/* hero section  */}
 <div className="relative overflow-hidden min-h-[100vh] flex items-center">

  {/* 🔹 BACKGROUND IMAGE */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <img
      src={images.contactBackImage}
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
         Contact Us
      </span>
    </div>
    

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 leading-tight ">
                We're here to help — reach out to the Suno AI team
    </h1>

    <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
 Have questions, feedback, partnership ideas, billing issues, or technical concerns? Our team is ready to assist you. 
            Send us a message and we'll get back to you as soon as possible — usually within 24 hours.    </p>

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
<p className="mt-5 text-sm text-white text-center max-w-xl mx-auto">
            24/7 support, community forums, and tutorials — trusted by creators globally to resolve issues quickly and keep you making music.
        </p>

  </div>
</div>



      {/* second section */}
      <div className="w-full bg-[#131B27] py-12 md:py-20 px-4 md:px-8">
        {/* Main content container: responsive max width, centered */}
        <div className="mx-auto w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-10 text-white">

          {/* Left Section: Text and Contact Info */}
          <div className="space-y-8 md:space-y-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              We're here to assist you and <br />
              <span className="font-medium">address any questions you may have.</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {/* Column 1: Call Center & Email */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">Call Center</h3>
                <p className="text-gray-400">800 100 975 20 34</p>
                <p className="text-gray-400">+ (123) 1800-234-5678</p>

                <h3 className="text-base sm:text-lg font-semibold mt-6 mb-2">Email</h3>
                <p className="text-gray-400">agency@mail.co</p>
              </div>

              {/* Column 2: Our Location & Social Network */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">Our Location</h3>
                <p className="text-gray-400">USA, New York - 1060</p>
                <p className="text-gray-400">Str. First Avenue 1</p>

                <h3 className="text-base sm:text-lg font-semibold mt-6 mb-2">Social network</h3>
                <div className="flex gap-4">
                  <a href="#" aria-label="Facebook" className="hover:text-white transition-colors text-[#507ADB]">
                    <FaFacebookF size={20} />
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:text-white transition-colors text-[#507ADB]">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors text-[#507ADB]">
                    <FaLinkedinIn size={20} />
                  </a>
                  <a href="#" aria-label="YouTube" className="hover:text-white transition-colors text-[#507ADB]">
                    <FaYoutube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Get in Touch Form */}
          <div className="bg-[#131B27] md:p-8 rounded-xl shadow-2xl">
            <h2 className="text-lg md:text-2xl font-semibold mb-2">Get in Touch</h2>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Define your goals and identify areas where AI can add value to your business.
            </p>

            <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Full Name */}
              <div className="relative">
                <label htmlFor="fullName" className="sr-only">Full name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Full name"
                  className="w-full bg-transparent border-b border-gray-600 focus:border-white focus:outline-none py-2 md:py-3 placeholder:text-gray-500"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-gray-600 focus:border-white focus:outline-none py-2 md:py-3 placeholder:text-gray-500"
                />
              </div>

              {/* Subject */}
              <div className="relative">
                <label htmlFor="subject" className="sr-only">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="w-full bg-transparent border-b border-gray-600 focus:border-white focus:outline-none py-2 md:py-3 placeholder:text-gray-500"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows="3"
                  className="w-full bg-transparent border-b border-gray-600 focus:border-white focus:outline-none pt-2 md:pt-3 placeholder:text-gray-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-start">
                <button
                  type="submit"
                  className="w-full md:w-auto flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-[#507ADB] to-[#9B49E9] text-white font-semibold rounded-full hover:bg-gray-200 transition-colors group"
                >
                  SEND A MESSAGE
                  <span className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs