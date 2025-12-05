import React from 'react'
import { pricingData } from '../../data/data'

const Pricing = () => {
  return (
    <>
        <div className="min-h-screen bg-gray-950 font-inter p-6 sm:p-12 flex justify-center">
      <div className="w-full max-w-7xl">

        {/* HEADER */}
        <header className="mb-12 md:mb-16 max-w-4xl mx-auto md:mx-0">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
            Straightforward and adaptable — pay solely for what you utilize
          </h1>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingData.map((item) => (
            <div
              key={item.plan}
              className="relative flex flex-col p-6 h-full bg-gray-900 border border-gray-800 rounded-3xl shadow-xl transition-all duration-300 hover:border-[#F71BDE]/50"
            >
              {/* Ribbon */}
              {item.isOptimal && (
                <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/4 z-10">
                  <div className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#F71BDE] to-[#F65725] shadow-lg shadow-[#F71BDE]/30 whitespace-nowrap">
                    Best match. Save 40%
                  </div>
                </div>
              )}

              {/* Title */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white">{item.plan}</h3>
                <p className="text-gray-400 text-base mt-1">{item.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-auto min-h-[120px]">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300 text-sm">
                    <svg
                      className="w-4 h-4 mr-2 text-[#43D9FA] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="mt-8 mb-6">
                <p
                  className={`text-6xl font-extrabold ${
                    item.highlighted ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item.price}
                </p>
                <p className="text-gray-400 text-base mt-2">{item.priceDetail}</p>
              </div>

              {/* Button */}
              <button
                className={
                  item.isOptimal
                    ? "w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-bold rounded-lg text-black bg-gradient-to-r from-[#43D9FA] to-[#FA1CD4] hover:scale-[1.02] transition duration-150 shadow-md"
                    : "w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-bold rounded-lg border border-[#43D9FA] text-white bg-gradient-to-r from-[#43D9FA]/20 to-[#FA1CD4]/20 hover:from-[#43D9FA] hover:to-[#FA1CD4] transition duration-150"
                }
              >
                GET_STARTED
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17L17 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>



    </>
  )
}

export default Pricing
