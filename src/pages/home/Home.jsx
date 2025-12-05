import React, { useState, useEffect, useCallback } from 'react';
import { Plus, SlidersHorizontal, Square, Sparkles } from 'lucide-react';
import images from '../../assets/images';
import { cardsData } from '../../data/data';
import Pricing from './Pricing';
import { MaskContainer } from '../../components/ui/svg-mask-effect.tsx'
import { WavyBackground } from '../../components/ui/wavy-background.tsx'


const PHRASES = [
  "Gentle jazz melodies for tending plants",
];

const TYPING_SPEED = 70;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 1500;

const Home = () => {
  // --- STATE ---
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const currentPhrase = PHRASES[phraseIndex % PHRASES.length];

  // Typing/Deleting step handler (keeps your original flow, cleaned up)
  const handleTypingEffect = useCallback(() => {
    // Typing phase
    if (!isDeleting) {
      if (charIndex < currentPhrase.length) {
        setDisplayedText(prev => prev + currentPhrase.charAt(charIndex));
        setCharIndex(prev => prev + 1);
      } else {
        // finished typing - wait then start deleting
        setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_DURATION);
      }
    } else {
      // Deleting phase
      if (charIndex > 0) {
        setDisplayedText(prev => prev.substring(0, prev.length - 1));
        setCharIndex(prev => prev - 1);
      } else {
         setIsDeleting(false);
        setPhraseIndex(i => (i + 1) % PHRASES.length);
      }
    }
  }, [charIndex, currentPhrase, isDeleting]);

   useEffect(() => {
     const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const id = setTimeout(() => {
      handleTypingEffect();
    }, speed);

    return () => clearTimeout(id);
  }, [displayedText, handleTypingEffect, isDeleting]);

  // cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor(s => !s), 500);
    return () => clearInterval(id);
  }, []);

   const createButtonGradient = "bg-gradient-to-r from-rose-500 via-fuchsia-600 to-indigo-600";

  
  return (
    <>
 
<WavyBackground>
<div className=" text-white flex items-start justify-center p-4 md:p-8 font-['Inter',_sans-serif] align-center">
  <div className="w-[95%] max-w-4xl mx-auto text-center relative translate-y-4">

    {/* Heading with inline cursor */}
    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 md:mb-6 inline-block text-left">
      <span className="inline break-words">{displayedText}</span>
      
      {/* Cursor */}
      <span
        aria-hidden
        className={`inline-block w-1 bg-white rounded-sm align-bottom ml-1 transition-opacity`}
        style={{
          opacity: showCursor ? 1 : 0,
          height: '1em',
        }}
      />
    </h1>

    {/* Subtitle */}
    <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-xl mx-auto px-2">
      Start with a simple prompt or dive into our pro editing tools — your next track is just a step away.
    </p>

    {/* Input / Controls */}
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-neutral-900 border border-neutral-800 p-2 sm:p-3 rounded-xl shadow-2xl flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
        {/* Left buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            aria-label="Add"
            className="p-2 sm:p-2.5 bg-neutral-800 hover:bg-neutral-700 text-gray-300 rounded-lg transition-colors inline-flex items-center justify-center"
          >
            <Plus size={18} />
          </button>

          <button
            aria-label="Advanced options"
            className="flex items-center gap-2 bg-neutral-800 text-sm font-medium text-gray-300 py-1.5 px-3 rounded-full hover:bg-neutral-700 transition-colors"
          >
            <SlidersHorizontal size={14} className="transform rotate-90" />
            <span className="hidden sm:inline">Advanced</span>
          </button>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Chat to make music"
          className="flex-grow bg-transparent text-gray-200 placeholder-gray-500 text-base sm:text-lg focus:outline-none py-2 px-2 w-full min-w-0"
          aria-label="Chat to make music"
        />

        {/* Right buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            aria-label="Pro tools"
            className="p-2 sm:p-2.5 bg-neutral-800 hover:bg-neutral-700 text-gray-300 rounded-lg transition-colors inline-flex items-center justify-center"
          >
            <Square size={18} />
          </button>

          <button
            type="button"
            className={`flex items-center gap-2 text-white py-2 px-3 sm:px-5 rounded-lg font-bold 
bg-gradient-to-r from-[#43D9FA] to-[#FA1CD4] 
shadow-lg transition-all duration-200 hover:scale-[1.03]`}
            aria-label="Create"
          >
            <Sparkles size={18} />
            <span className="text-sm sm:text-base">Create</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

</WavyBackground>

{/* // second section // */}
<section className="min-h-screen bg-black text-white">
      <div className="container mx-auto">
        {/* Main layout grid: 2 columns on medium screens and up, 1 column on small screens */}
        <div className="grid md:grid-cols-2">
          
          {/* --- Left Content Column (Dark Background) --- */}
          <div className="flex flex-col justify-center p-8 md:p-16 lg:p-24 min-h-[40vh] md:min-h-screen">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-extrabold leading-tight mb-6">
              Lab intelligence for driving the future of global innovation
            </h1>
            
            {/* Subtext */}
            <p className="text-gray-400 text-sm sm:text-base max-w-md mb-10">
              Empowering innovation through state-of-the-art laboratory science. 
              <br />
              Discover the future of research and development with our advanced solutions
            </p>
            
            {/* Button */}
<button className="flex items-center justify-center w-40 h-10 text-black font-semibold rounded-lg shadow-lg 
bg-gradient-to-r from-[#43D9FA] to-[#FA1CD4] 
hover:from-[#FA1CD4] hover:to-[#43D9FA] 
transition duration-300 transform hover:scale-[1.03]">              DISCOVER
              {/* Arrow icon (right) */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          </div>
          
       
          <div className="relative min-h-[60vh] w-full overflow-hidden bg-gray-900">
            <img 
              src={images.homePageImage}
              alt="Where science meets artificial intelligence - vibrant abstract image" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          
          </div>
        </div>
      </div>
    </section>


    {/* home third section */}

<div className='w-full bg-black'>
    <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden rounded-xl">

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Text Content */}
  <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
      Experience the Future of <span className="text-pink-400">AI-Powered Music Creation</span>
    </h1>

    <p className="text-white/90 mt-4 text-base md:text-lg lg:text-xl max-w-2xl drop-shadow">
      Discover next-generation AI music generators that transform your ideas into complete songs 
      within seconds. From melody to lyrics, create professional-grade music effortlessly and 
      unlock your creative potential.
    </p>
  </div>
</div>

         <div className="w-4/5 mx-auto h-screen flex items-center justify-center ">
  <div
    className="grid gap-4 p-3 rounded-lg w-full h-[85vh] 
               grid-cols-4 grid-rows-4 auto-rows-fr "
  >
    {/* Salmon */}
    <div className="col-span-1 row-span-4 rounded-lg overflow-hidden shadow-md relative">
      <img
        src={images.feature1}
        alt="Salmon"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-1">
        
        {/* Icons Row */}
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

        {/* Title */}
        <p className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Salmon
        </p>
      </div>
    </div>

    {/* Broccoli */}
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

    {/* Tamago */}
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

    {/* Pork */}
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

    {/* Edamame */}
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

    {/* Tomato */}
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

    {/* Tofu */}
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
</div>

</div>


{/* pricing section */}
            <Pricing/>

    </>
  );
};

export default Home;