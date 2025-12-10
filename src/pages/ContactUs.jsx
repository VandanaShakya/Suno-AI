import React from 'react'
import { ArrowRight } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Sparkles } from 'lucide-react';


const ContactUs = () => {
  return (
    <>
      {/* hero section */}
      <div className="relative overflow-hidden bg-[#0f1720]">
        {/* Soft background blobs (visible but subtle) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2
                     h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 0, 150, 0.9) 0%, rgba(150, 0, 255, 0.7) 100%)',
              filter: 'blur(64px)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2
                     h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 165, 0, 0.9) 0%, rgba(255, 255, 0, 0.7) 100%)',
              filter: 'blur(64px)',
            }}
          />
        </div>

        {/* Optional full-bleed background image (uncomment if needed) */}
        {/*
      <img
        src={images.feature5}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.28)', zIndex: 0 }}
      />
      */}

        {/* Main content container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center z-10">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 mx-auto"
            style={{
              background: 'rgba(124, 58, 237, 0.08)',
              border: '1px solid rgba(124, 58, 237, 0.18)',
            }}
          >
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs sm:text-sm text-purple-300 font-medium">
              AI-Powered Music Support
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>

          {/* Contact Page Content */}
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Have a question, need support, or want to collaborate?
            Our team is here to help you with anything related to Suno AI —
            from technical assistance and product guidance to business inquiries.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
  <a
    href="#contact"
    className="
      px-3 py-2          /* smaller mobile */
      sm:px-6 sm:py-3     /* reduced desktop size */
      rounded-lg sm:rounded-xl
      font-semibold text-white
      transition-all hover:scale-105 hover:shadow-2xl
      text-xs sm:text-sm   /* smaller text everywhere */
    "
    style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
    aria-label="Contact support"
  >
    Contact Support
  </a>

  <a
    href="#faq"
    className="
      px-3 py-2            /* smaller mobile */
      sm:px-6 sm:py-3       /* slightly reduced desktop */
      rounded-lg sm:rounded-xl
      font-semibold text-white
      transition-all
      text-xs sm:text-sm    /* smaller text */
    "
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
    }}
    aria-label="View FAQ"
  >
    View FAQ
  </a>
</div>


          <p className="mt-4 text-sm text-white/60 text-center max-w-xl mx-auto">
            Plans from <span className="text-white font-semibold">$0</span> — try free or request a demo for enterprise needs.
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