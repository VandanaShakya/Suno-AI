import React from 'react';
import images from '../assets/images';

// 1. Define the custom CSS for the continuous animation
// NOTE: In a production Tailwind setup, place keyframes in your global CSS file or input layer.
const animationStyles = `
  /* Keyframes for the continuous right-to-left flow */
  @keyframes flow-right-to-left {
    from {
      transform: translateX(0);
    }
    to {
      /* Moves the 200% wide container by half its total width (100% of the viewport) */
      transform: translateX(-50%); 
    }
  }

  /* Keyframes for the musical notes floating, scaling, and fading */
  @keyframes note-float {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.8);
    }
    50% {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px) scale(1.2);
    }
  }

  /* Apply the animation to the rays container */
  .animate-flow-rays {
    animation: flow-right-to-left 20s linear infinite;
  }

  /* Apply the animation to the notes */
  .animate-note-float {
      animation: note-float 4s ease-in-out infinite;
  }
`;

// Helper component for a single musical note
const MusicNote = ({ delay, color, size, style }) => {
  const noteStyle = {
    animationDelay: `${delay}s`, // Stagger the animation start
    ...style // Allows for absolute positioning adjustments
  };
  
  return (
    <span 
      className={`absolute animate-note-float opacity-0 text-${size} ${color} select-none`}
      style={noteStyle}
    >
      🎵
    </span>
  );
};

// Component to define the wave/ray pattern itself (using layers for glow)
const RayDesign = () => (
  // flex-shrink-0 ensures this element doesn't shrink inside the flex container
  <div className="relative w-full h-full flex-shrink-0">
    
    {/* Ray 1: Top wave */}
    <div className="absolute top-0 w-full h-1/4">
      {/* Outer Blur/Glow Layer */}
      <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-70 blur-md rounded-full absolute -top-1/2 left-0 right-0"></div>
      {/* Inner Color Layer */}
      <div className="w-full h-full bg-cyan-400 opacity-50 absolute rounded-full"></div>
    </div>
    
    {/* Ray 2: Middle wave (Most prominent) */}
    <div className="absolute top-1/2 -translate-y-1/2 w-full h-1/2">
      {/* Outer Blur/Glow Layer */}
      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-80 blur-lg rounded-full absolute -top-1/4 left-0 right-0"></div>
      {/* Inner Color Layer */}
      <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-pink-400 absolute opacity-70 rounded-full"></div>
    </div>

    {/* Ray 3: Bottom wave */}
    <div className="absolute bottom-0 w-full h-1/4">
      {/* Outer Blur/Glow Layer */}
      <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-70 blur-md rounded-full absolute -bottom-1/2 left-0 right-0"></div>
      {/* Inner Color Layer */}
      <div className="w-full h-full bg-pink-400 opacity-50 absolute rounded-full"></div>
    </div>
  </div>
);


const Check = () => {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      {/* Inject custom CSS styles for animations */}
      <style>{animationStyles}</style>
      
      {/* The Ray Looping Mechanism (200% width container) */}
      <div className="absolute inset-0 h-full w-[200%]">
        <div className="absolute top-1/2 -translate-y-1/2 h-40 w-[50%] flex animate-flow-rays">
          
          {/* Ray Content 1: This fills the viewport (w-full) */}
          <RayDesign />
          
          {/* Ray Content 2 (Duplicate): This ensures the seamless loop */}
          <RayDesign /> 
        </div>
      </div>

      {/* Musical Notes Layer: Placed directly over the rays container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Central column of notes */}
        <MusicNote delay={0} color="pink-400" size="xl" />
        <MusicNote delay={0.8} color="cyan-400" size="3xl" />
        <MusicNote delay={1.6} color="purple-400" size="2xl" />
        <MusicNote delay={2.4} color="green-400" size="xl" />
        <MusicNote delay={3.2} color="indigo-400" size="3xl" />
        <MusicNote delay={0.4} color="cyan-300" size="base" />
        <MusicNote delay={1.2} color="pink-300" size="base" />
        <MusicNote delay={2.0} color="purple-300" size="base" />
        <MusicNote delay={2.8} color="green-300" size="base" />

        {/* Scattered notes using the style prop for absolute positioning */}
        <MusicNote 
          delay={0.2} 
          color="pink-400" 
          size="xl" 
          style={{ top: '30%', left: '10%' }} 
        />
        <MusicNote 
          delay={1.0} 
          color="cyan-400" 
          size="2xl" 
          style={{ top: '65%', left: '80%' }} 
        />
        <MusicNote 
          delay={1.8} 
          color="purple-400" 
          size="3xl" 
          style={{ top: '40%', left: '50%' }} 
        />
        <MusicNote 
          delay={2.6} 
          color="green-400" 
          size="xl" 
          style={{ top: '55%', left: '25%' }} 
        />
      </div>

    </div>
  );
};


export default Check;







      {/* // second section // */}
//       {<section className="min-h-screen bg-black text-white">
//       <div className="container mx-auto">
//          <div className="grid md:grid-cols-2">
          
//            <div className="flex flex-col justify-center p-8 md:p-16 lg:p-24 min-h-[40vh] md:min-h-screen">
            
//              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-extrabold leading-tight mb-6">
//               Lab intelligence for driving the future of global innovation
//             </h1>
            
//              <p className="text-gray-400 text-sm sm:text-base max-w-md mb-10">
//               Empowering innovation through state-of-the-art laboratory science. 
//               <br />
//               Discover the future of research and development with our advanced solutions
//             </p>
            
//  <button className="flex items-center justify-center w-40 h-10 text-black font-semibold rounded-lg shadow-lg 
// bg-gradient-to-r from-[#43D9FA] to-[#FA1CD4] 
// hover:from-[#FA1CD4] hover:to-[#43D9FA] 
// transition duration-300 transform hover:scale-[1.03]">              DISCOVER
//                <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-5 w-5 ml-2" 
//                 viewBox="0 0 20 20" 
//                 fill="currentColor"
//               >
//                 <path 
//                   fillRule="evenodd" 
//                   d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
//                   clipRule="evenodd" 
//                 />
//               </svg>
//             </button>
//           </div>
          
       
//           <div className="relative min-h-[60vh] w-full overflow-hidden bg-gray-900">
//             <img 
//               src={images.homePageImage}
//               alt="Where science meets artificial intelligence - vibrant abstract image" 
//               className="absolute inset-0 w-full h-full object-cover" 
//             />
          
//           </div>
//         </div>
//       </div>
//     </section> }


      {/* home third section */}

     
        {<div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden rounded-xl">

          <div className="absolute inset-0 bg-black/40" />



        </div> }

        { <div className="w-4/5 mx-auto h-screen flex items-center justify-center ">
  <div
    className="grid gap-4 p-3 rounded-lg w-full h-[85vh] 
               grid-cols-4 grid-rows-4 auto-rows-fr "
  >
     <div className="col-span-1 row-span-4 rounded-lg overflow-hidden shadow-md relative">
      <img
        src={images.feature1}
        alt="Salmon"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

       <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-1">
        
         <div className="flex items-center justify-between text-white text-xs sm:text-sm opacity-90">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>4.8K</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>12K</span>
          </div>
        </div>

         <p className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Salmon
        </p>
      </div>
    </div>

     <div className="col-span-1 row-span-3 rounded-lg overflow-hidden shadow-md relative">
      <img
        src={images.feature2}
        alt="Broccoli"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-1">
        <div className="flex items-center justify-between text-white text-xs sm:text-sm opacity-90">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>3.9K</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>9K</span>
          </div>
        </div>
        <p className="text-white font-medium text-sm sm:text-base md:text-lg">
          Broccoli
        </p>
      </div>
    </div>

     <div className="col-span-1 row-span-2 rounded-lg overflow-hidden shadow-md relative">
      <img
        src={images.feature3}
        alt="Tamago"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-1">
        <div className="flex items-center justify-between text-white text-xs sm:text-sm opacity-90">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>2.4K</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>6K</span>
          </div>
        </div>
        <p className="text-white font-medium text-sm sm:text-base md:text-lg">
          Tamago
        </p>
      </div>
    </div>

     <div className="col-span-1 row-span-3 rounded-lg overflow-hidden shadow-md relative">
      <img
        src={images.feature4}
        alt="Pork"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-1">
        <div className="flex items-center justify-between text-white text-xs sm:text-sm opacity-90">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>5.2K</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>14K</span>
          </div>
        </div>
        <p className="text-white font-medium text-sm sm:text-base md:text-lg">
          Pork
        </p>
      </div>
    </div>

     <div className="col-span-1 row-span-2 rounded-lg overflow-hidden shadow-md relative">
      <img
        src={images.feature5}
        alt="Edamame"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-1">
        <div className="flex items-center justify-between text-white text-xs sm:text-sm opacity-90">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>1.9K</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>7K</span>
          </div>
        </div>
        <p className="text-white font-medium text-sm sm:text-base md:text-lg">
          Edamame
        </p>
      </div>
    </div>

     <div className="col-span-1 row-span-1 rounded-lg overflow-hidden shadow-md relative">
      <img
        src={images.feature6}
        alt="Tomato"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-3 space-y-1">
        <div className="flex items-center justify-between text-white text-xs opacity-90">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>3.1K</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>5K</span>
          </div>
        </div>
        <p className="text-white font-medium text-xs sm:text-sm md:text-base">
          Tomato
        </p>
      </div>
    </div>

     <div className="col-span-1 row-span-1 rounded-lg overflow-hidden shadow-md relative">
      <img
        src={images.feature7}
        alt="Tofu"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-3 space-y-1">
        <div className="flex items-center justify-between text-white text-xs opacity-90">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>2.2K</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>4K</span>
          </div>
        </div>
        <p className="text-white font-medium text-xs sm:text-sm md:text-base">
          Tofu
        </p>
      </div>
    </div>

  </div>
</div> }