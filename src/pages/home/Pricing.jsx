import React from 'react'
import { pricingData } from '../../data/data'

const Pricing = () => {
  return (
    <>
   <div className="min-h-screen bg-[#131B27] font-inter px-4 py-8 sm:py-12 flex justify-center">
  <div className="w-full max-w-7xl">

    {/* HEADER */}
    <header className="mb-8 sm:mb-12 max-w-4xl mx-auto md:mx-0">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug">
        Straightforward and adaptable — pay solely for what you utilize
      </h1>
    </header>

    {/* GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {pricingData.map((item) => (
        <div
          key={item.plan}
          className="relative flex flex-col p-4 sm:p-6 h-full bg-gray-900 border border-gray-800 rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-300 hover:border-[#A146EA]/50"
        >
          

          {/* Title */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{item.plan}</h3>
            <p className="text-gray-400 text-sm sm:text-base mt-1">{item.description}</p>
          </div>

          {/* Features */}
          <ul className="space-y-2 sm:space-y-3 mb-auto min-h-[100px] sm:min-h-[120px]">
            {item.features.map((feature, index) => (
              <li key={index} className="flex items-start text-gray-300 text-xs sm:text-sm">
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0 text-[#4B7DDA]"
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
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="mt-6 mb-5">
            <p
              className={`font-extrabold ${
                item.highlighted ? "text-white" : "text-gray-300"
              } text-3xl sm:text-4xl md:text-5xl`}
            >
              {item.price}
            </p>
            <p className="text-gray-400 text-sm sm:text-base mt-2">{item.priceDetail}</p>
          </div>

          {/* Button */}
          <button
            className={
              item.isOptimal
                ? "w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-sm font-bold rounded-lg text-white bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] hover:scale-[1.02] transition duration-150 shadow-md"
                : "w-full flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-sm font-bold rounded-lg border border-[#A146EA] text-white bg-gradient-to-r from-[#A146EA]/20 to-[#4B7DDA]/20 hover:from-[#A146EA] hover:to-[#4B7DDA] transition duration-150"
            }
          >
            GET STARTED
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
