import React from 'react'
import { ArrowRight } from 'lucide-react';


const ContactUs = () => {
  return (
    <>
      {/* hero section */}
      <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      <div 
        // ADDED: top-1/2 left-1/4 to ensure a starting visible position.
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
        // ADDED: bottom-1/4 right-1/4 to ensure a starting visible position.
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 
                   h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] rounded-full filter blur-3xl opacity-60 **mix-blend-screen** transition-all duration-1000 ease-in-out bubble-2" 
        style={{ 
          // High saturation gradient
          background: 'radial-gradient(circle, rgba(255, 165, 0, 0.9) 0%, rgba(255, 255, 0, 0.7) 100%)',
          willChange: 'transform'
        }}
      ></div>
{/* Heading is assumed to be above this */}
<div className="relative z-10 text-center mt-6 px-4 sm:px-0">
 <p className="max-w-3xl mx-auto text-white/90 text-base sm:text-lg md:text-xl leading-relaxed">
  We’re here to help you get the most out of Suno AI.  
  Whether you need technical assistance, have a question about your account,  
  or want guidance on using AI music tools for your projects — our team is ready to support you.
</p>


  {/* Buttons */}
  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
    {/* Primary CTA */}
   <a
  href="#pricing"
  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white shadow-lg transform transition hover:scale-[1.03]"
  style={{ backgroundImage: 'linear-gradient(90deg,#43D9FA,#FA1CD4)' }}
>
  Contact sales
  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</a>


    
  </div>

  {/* Small pricing hint */}
  <p className="mt-4 text-sm text-white/60 text-center max-w-xl mx-auto">
    Plans from <span className="text-white font-semibold">$0</span> — try free or request a demo for enterprise needs.
  </p>
</div>

      
    </div>


    {/* second section */}
    <div className="w-full bg-black py-20 px-4 md:px-8">
            
            {/* Main content container: max 70% width, centered (mx-auto) */}
            <div className="max-w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">

                {/* Left Section: Text and Contact Info */}
                <div className="space-y-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
                        We're here to assist you and <br />
                        <span className="font-medium">address any questions you may have.</span>
                    </h1>

                    <div className="grid grid-cols-2 gap-8 pt-8">
                        {/* Column 1: Call Center & Email */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Call Center</h3>
                            <p className="text-gray-400">800 100 975 20 34</p>
                            <p className="text-gray-400">+ (123) 1800-234-5678</p>

                            <h3 className="text-lg font-semibold mt-6 mb-3">Email</h3>
                            <p className="text-gray-400">agency@mail.co</p>
                        </div>

                        {/* Column 2: Our Location & Social Network */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Our Location</h3>
                            <p className="text-gray-400">USA, New York - 1060</p>
                            <p className="text-gray-400">Str. First Avenue 1</p>

                            <h3 className="text-lg font-semibold mt-6 mb-3">Social network</h3>
                            <div className="flex space-x-4 text-gray-400">
                                {/* Using placeholder text for icons */}
                                <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">F</a> 
                                <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">t</a>
                                <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">in</a>
                                <a href="#" aria-label="YouTube" className="hover:text-white transition-colors">yt</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Get in Touch Form */}
                <div className="bg-[#181818] p-8 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
                    <p className="text-gray-400 mb-8 text-sm">Define your goals and identify areas where AI can add value to your business.</p>

                    <form className="space-y-6">
                        {/* Full Name */}
                        <div className="relative">
                            <input
                                type="text"
                                id="fullName"
                                placeholder="Full name"
                                className="w-full bg-transparent border-b border-gray-600 focus:border-white focus:outline-none py-3 placeholder:text-gray-500"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                className="w-full bg-transparent border-b border-gray-600 focus:border-white focus:outline-none py-3 placeholder:text-gray-500"
                            />
                        </div>

                        {/* Subject */}
                        <div className="relative">
                            <input
                                type="text"
                                id="subject"
                                placeholder="Subject"
                                className="w-full bg-transparent border-b border-gray-600 focus:border-white focus:outline-none py-3 placeholder:text-gray-500"
                            />
                        </div>

                        {/* Message */}
                        <div className="relative pb-6"> {/* Added pb-6 to match input spacing */}
                            <textarea
                                id="message"
                                placeholder="Message"
                                rows="3" // Adjusted rows for better visibility of the placeholder
                                className="w-full bg-transparent border-b border-gray-600 focus:border-white focus:outline-none pt-3 placeholder:text-gray-500 resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-auto flex items-center justify-between px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors group"
                        >
                            SEND A MESSAGE
                            {/* <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" /> */}
                            <span className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default ContactUs