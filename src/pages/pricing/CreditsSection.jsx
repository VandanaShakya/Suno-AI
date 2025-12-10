import React from 'react';
import { creditPacks } from '../../data/data';
import { motion } from 'framer-motion';


const CreditSection = () => {
  const primaryColor = '#43D9FA';
  const secondaryColor = '#FA1CD4';
  const neutralBackground = '#131B27';
  const cardBackground = '#131B27';
  const textColor = '#ffffff';

 

  return (
  <div
  className="p-4 md:p-10 lg:p-16"
  style={{ backgroundColor: neutralBackground, color: textColor, fontFamily: 'Inter, sans-serif' }}
>
  <div className="max-w-7xl mx-auto py-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

      {/* Left Content Section */}
      <div className="lg:col-span-4 xl:col-span-5 flex flex-col justify-center">
        <p
          className="text-sm uppercase tracking-widest mb-4 font-medium"
          style={{ color: primaryColor }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(to right, #507ADB, #9B49E9)` }}
          >
            _MUSIC GENERATION CREDITS
          </span>
        </p>
   <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-8">
  <span className="block">Simple and</span>
  <span className="block">flexible.</span>
  <span className="block text-gray-400 mt-4">Only pay for</span>
  <span className="block text-gray-400">what you use.</span>
</h1>

        <p className="text-lg text-gray-400 max-w-md hidden lg:block">
          Generate unique music tracks powered by AI, perfect for content creation, game development, or personal projects.
        </p>
      </div>

      {/* Right Section with 2 credit cards */}
      <div className="lg:col-span-8 xl:col-span-7 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {creditPacks.map((pack) => (
            <div
              key={pack.credits}
              className={`relative w-full h-full p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col transform transition-all duration-500 ${
                pack.isOptimal
                  ? 'z-10 scale-[1.05] shadow-[0_0_20px_0px_rgba(155,73,233,0.5)]'
                  : 'shadow-xl'
              }`}
              style={{
                backgroundColor: cardBackground,
                border: pack.isOptimal ? 'none' : '1px solid #333',
              }}
            >
              {pack.isOptimal && (
                <div
                  className="absolute inset-y-0 left-0 w-2 rounded-l-2xl"
                  style={{ backgroundImage: `linear-gradient(to bottom, #507ADB, #9B49E9)` }}
                >
                  <span className="absolute top-1/2 -translate-y-1/2 -rotate-90 origin-left whitespace-nowrap text-xs font-bold uppercase tracking-widest text-white -left-2 transform -translate-x-full md:left-2 md:-translate-x-0">
                    Optimal
                  </span>
                </div>
              )}

              <div className={`flex-grow ${pack.isOptimal ? 'pl-2 md:pl-0' : ''}`}>
                <h3 className="text-xl font-bold mb-1 text-white">{pack.pack}</h3>
                <p className="text-sm mb-4 text-gray-400">{pack.description}</p>

                <div className="my-6">
                  <span className="text-4xl md:text-5xl font-extrabold text-white">{pack.price}</span>
                  <span className="text-xl font-medium text-gray-500">{' / pack'}</span>
                </div>

                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                  {pack.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-3 flex-shrink-0"
                        style={{ color: '#507ADB' }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4">
                <button
                  className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.03] active:scale-[0.98] ${
                    pack.isOptimal
                      ? 'text-white bg-gradient-to-r from-[#507ADB] to-[#9B49E9]'
                      : 'bg-[#1A1A1A] text-white hover:bg-gradient-to-r hover:from-[#507ADB] hover:to-[#9B49E9]'
                  }`}
                >
                  <span>Buy Credits</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
</div>

  );
};

export default CreditSection;
