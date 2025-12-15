import React from 'react'
import { pricingData } from '../../data/data'

const Pricing = () => {
  return (
    <>
   <div className="min-h-screen bg-black font-inter px-4 py-8 sm:py-12 flex justify-center">
<section className="py-16 bg-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Section Title */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
      Choose the Perfect Plan
    </h2>
    <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-12">
      Pick a plan that fits your needs. All plans come with essential features to get you started.
    </p>

    {/* Pricing Cards */}
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 sm:gap-8">
      {pricingData.map((item) => (
        <div
          key={item.plan}
          className="relative flex flex-col p-6 border border-gray-800 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 bg-transparent w-full md:w-80"
        >
          {/* Background Image */}
          <img
            src={item.bgImage}
            alt={`${item.plan} plan background`}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10"
            draggable={false}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/6 rounded-2xl z-20" />

          {/* Content */}
          <div className="relative z-30 flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{item.plan}</h3>
              <p className="text-gray-400 text-sm sm:text-base mt-1">{item.description}</p>
            </div>

            {/* Features */}
            <ul className="space-y-2 sm:space-y-3 mb-auto mt-4 text-left">
              {item.features.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-300 text-sm sm:text-base">
                  <svg
                    className="w-4 h-4 mr-2 flex-shrink-0 text-[#4B7DDA]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{feature}</span>
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
                  ? "w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-bold rounded-lg text-white bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] hover:scale-[1.02] transition duration-150 shadow-md"
                  : "w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-bold rounded-lg border border-[#A146EA] text-white bg-gradient-to-r from-[#A146EA]/20 to-[#4B7DDA]/20 hover:from-[#A146EA] hover:to-[#4B7DDA] transition duration-150"
              }
            >
              GET STARTED
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
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
        </div>
      ))}
    </div>
  </div>
</section>


</div>


    </>
  )
}

export default Pricing
