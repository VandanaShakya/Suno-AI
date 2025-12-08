import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe, Sparkles } from 'lucide-react';
import images from '../../assets/images';
import { reelsData } from '../../data/data';
import { FiPlay } from "react-icons/fi";
import Pricing from './Pricing';
// import { MaskContainer } from '../../components/ui/svg-mask-effect.tsx'
// import { WavyBackground } from '../../components/ui/wavy-background.tsx'
import { aiVoices } from '../../data/data';

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



  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer <token>",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        customMode: true,
        instrumental: true,
        model: "V4",
        callBackUrl: "https://api.example.com/callback",
        style: "Classical",
        title: "Generated Track",
        negativeTags: "Heavy Metal, Upbeat Drums",
        vocalGender: "m",
        styleWeight: 0.65,
        weirdnessConstraint: 0.65,
        audioWeight: 0.65,
        personaId: "persona_123",
      }),
    };

    try {
      const response = await fetch("https://api.example.com/generate", options);
      const data = await response.json();
      console.log("Generated Track:", data);
      // You can update your state or UI with the generated music info
    } catch (error) {
      console.error("Error generating track:", error);
    } finally {
      setLoading(false);
    }
  };


  // third section //
  const [playingId, setPlayingId] = useState(null);

  const togglePlay = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="overflow-x-hidden">

      <motion.section
        className="min-h-screen bg-[#0E141E] flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >

        {/* Centering container and Grid Layout for content and image */}
        <div className="max-w-[80%] mx-auto w-full">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            <motion.div
              className="text-white pt-10 pb-12 md:py-20 order-2 md:order-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >

              {/* Primary Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                Create Stunning Music Instantly. <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #A146EA, #4B7DDA)" }}>Type, Generate, Enjoy</span>
              </h1>

              <p className="text-lg text-gray-400 mb-10 max-w-xl">
                Turn your ideas into high-quality music tracks in seconds with our AI-powered music generator. No experience needed—just type and listen.
              </p>


              <div className="max-w-lg mx-auto">
                <div className="relative flex items-center">
                  {/* Input */}
                  <input
                    type="text"
                    placeholder="Describe the track you want..."
                    className="w-full pr-36 px-6 py-4 rounded-xl text-base bg-[#1F2531] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A146EA]"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />

                  {/* Generate Button inside input */}
                  <button
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-6 py-3 rounded-xl text-base font-semibold transition-transform transform hover:scale-[1.03] shadow-lg"
                    style={{ background: "linear-gradient(90deg, #A146EA, #4B7DDA)", color: "white" }}
                    onClick={handleGenerate}
                    disabled={loading || !prompt}
                  >
                    {loading ? "Generating..." : "Generate Now"}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE: Image/Visual Space */}
            <motion.div
              className="relative h-[300px] md:h-auto md:min-h-[500px] w-full flex items-center justify-center order-1 md:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >

              <div className="w-full h-full">
                <img
                  src={images.sunoHeroImage}
                  alt="AI Brain generating music waveforms"
                  className="w-full h-full object-contain"
                />

                <div className="absolute inset-0 pointer-events-none opacity-50"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(75, 125, 218, 0.15) 0%, transparent 70%)',
                    zIndex: 0
                  }}
                />
              </div>

            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* // second section // */}
      {/* <section className="min-h-screen bg-black text-white">
      <div className="container mx-auto">
         <div className="grid md:grid-cols-2">
          
           <div className="flex flex-col justify-center p-8 md:p-16 lg:p-24 min-h-[40vh] md:min-h-screen">
            
             <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-extrabold leading-tight mb-6">
              Lab intelligence for driving the future of global innovation
            </h1>
            
             <p className="text-gray-400 text-sm sm:text-base max-w-md mb-10">
              Empowering innovation through state-of-the-art laboratory science. 
              <br />
              Discover the future of research and development with our advanced solutions
            </p>
            
 <button className="flex items-center justify-center w-40 h-10 text-black font-semibold rounded-lg shadow-lg 
bg-gradient-to-r from-[#43D9FA] to-[#FA1CD4] 
hover:from-[#FA1CD4] hover:to-[#43D9FA] 
transition duration-300 transform hover:scale-[1.03]">              DISCOVER
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
    </section> */}


      {/* home third section */}

      <div className='w-full bg-black'>
        {/* <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden rounded-xl">

          <div className="absolute inset-0 bg-black/40" />



        </div> */}

        {/* <div className="w-4/5 mx-auto h-screen flex items-center justify-center ">
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
</div> */}

        <section className="px-4 sm:px-6 py-16 bg-[#131B27] min-h-screen">
  <div className="relative flex flex-col items-center justify-center text-center px-4 w-full max-w-[80%] m-auto">
    <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
      Experience the Future of <span className="bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] bg-clip-text text-transparent">
  AI-Powered Music Creation
</span>

    </h1>

    <p className="text-white/90 mt-4 text-base md:text-lg lg:text-xl max-w-2xl drop-shadow">
      Discover next-generation AI music generators that transform your ideas into complete songs
      within seconds. From melody to lyrics, create professional-grade music effortlessly and
      unlock your creative potential.
    </p>
  </div>


  {/* Voice Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 max-w-7xl mx-auto">
    {aiVoices.map((voice) => {
      const Icon = voice.icon;
      const isPlaying = playingId === voice.id;

      return (
        <motion.div
          key={voice.id}
          className="group relative bg-gradient-to-b from-[#4B7DDA]/20 to-[#A146EA]/20 border border-[#A146EA]/30 rounded-3xl p-6 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => togglePlay(voice.id)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: voice.id * 0.05, ease: 'easeOut' }}
        >
          {/* Voice Icon + Details */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#A146EA]/50 to-[#4B7DDA]/50">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">{voice.name}</h3>
              <p className="text-sm text-white/70">{voice.style}</p>
            </div>
          </div>

          {/* Music Waveform Animation */}
          <div className="flex items-end justify-center gap-1 h-10 mb-4">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-gradient-to-b from-[#A146EA] to-[#4B7DDA] transform transition-all duration-500`}
                style={{
                  height: isPlaying
                    ? `${10 + Math.sin((i + Date.now() / 300) % 7) * 15}px`
                    : `${10 + i * 3}px`,
                }}
              />
            ))}
          </div>

          {/* Play Button */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] hover:scale-110 transition-transform duration-300">
            <FiPlay className="w-6 h-6 text-white" />
          </div>

          {/* Extra Info */}
          <p className="text-white/60 text-sm text-center mt-4">
            Ideal for {voice.style.toLowerCase()} tracks. Tap to preview.
          </p>
        </motion.div>
      );
    })}
  </div>

  {/* Additional Content Section */}
  <div className="mt-20 text-center max-w-3xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Why Choose Our AI Voices?</h2>
    <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] mb-6"></div>
    <p className="text-white/70 text-lg leading-relaxed">
      Our AI voices are crafted with the latest neural networks to sound natural, expressive,
      and professional. Whether you're producing a pop song, rap, or ambient music, our voices
      adapt to your style and bring your compositions to life effortlessly.
    </p>
  </div>


  <section className="bg-[#131B27] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Reel Grid Container */}
        <div className="flex justify-center overflow-x-auto p-4 md:overflow-x-visible">
          <div className="flex space-x-4 md:space-x-6 justify-center">
            {reelsData.map((reel) => (
              <motion.div
                key={reel.id}
                 className="relative flex-shrink-0 w-[150px] sm:w-[180px] lg:w-[200px] h-[350px] sm:h-[400px] lg:h-[450px] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: reel.id * 0.04, ease: 'easeOut' }}
              >
                
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${reel.imageUrl})`, backgroundColor: '#333333' }}
                >
                  {/* Play Icon (Top Left) */}
                  <svg className="absolute top-4 left-4 w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 3l12 9-12 9V3z" />
                  </svg>

                  {/* Top Overlay Text */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
                    {reel.label.toUpperCase()}
                  </div>

                  {/* Username (Bottom) */}
                  <div className="absolute bottom-4 left-4 text-white text-sm font-bold bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                    {reel.username}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-12 flex justify-center">
          <button
            className="px-10 py-4 text-lg font-bold text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            // Applying the gradient using the specified colors
            style={{
              background: 'linear-gradient(90deg, #A146EA, #4B7DDA)',
            }}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </section>
</section>


      </div>


      {/* pricing section */}
      <Pricing />


      <section className="bg-[#131B27] py-16">
      <div className="mx-auto w-[80%] max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-12 text-center">
          Everything you need to <span className="text-[#A146EA]">explore</span> and get inspired
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: Daily Inspiration */}
       {/* Card 1: Daily Inspirations */}
<motion.div
  className="p-6 bg-[#131B27] rounded-xl shadow-2xl border border-gray-600 transition-all duration-300 hover:shadow-purple-500/50"
  initial={{ opacity: 0, y: 18 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.45, ease: 'easeOut' }}
>
  <h3 className="text-2xl font-semibold text-white mb-4">
    <span className="text-[#A146EA]">10</span> Daily Inspirations
  </h3>
  <p className="text-gray-400 mb-6">
    Dive into new ideas instantly. Get fresh prompts, concepts, and thought-starters daily to fuel your next creation. Free forever, no registration needed.
  </p>

  <div className="w-16 h-16 bg-[#A146EA]/20 rounded-full flex items-center justify-center border-2 border-[#A146EA]">
    <Sparkles className="w-8 h-8 text-[#A146EA]" />
  </div>
</motion.div>

{/* Card 2: AI Idea Generator */}
<motion.div
  className="p-6 bg-[#131B27] rounded-xl shadow-2xl border border-gray-600 transition-all duration-300 hover:shadow-blue-500/50"
  initial={{ opacity: 0, y: 18 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.45, delay: 0.05, ease: 'easeOut' }}
>
  <h3 className="text-2xl font-semibold text-white mb-4">
    Free <span className="text-[#4B7DDA]">AI</span> Idea Generator
  </h3>
  <p className="text-gray-400 mb-6">
    Unleash creativity with the market-leading AI generator. Explore millions of curated themes, styles, and data points—from trending topics to deep-dive research.
  </p>

  <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-800 p-2 flex items-center justify-center">
    <Zap className="w-12 h-12 text-[#4B7DDA] opacity-80" />
    <div className="absolute top-0 right-0 w-8 h-8 bg-[#4B7DDA] rounded-full blur-sm"></div>
    <div className="absolute bottom-0 left-0 w-10 h-10 bg-[#A146EA] rounded-full blur-sm"></div>
  </div>
</motion.div>

{/* Card 3: Share Your Journey */}
<motion.div
  className="p-6 bg-[#131B27] rounded-xl shadow-2xl border border-gray-600 transition-all duration-300 hover:shadow-purple-500/50"
  initial={{ opacity: 0, y: 18 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
>
  <h3 className="text-2xl font-semibold text-white mb-4">
    Share your <span className="text-[#A146EA]">Journey</span> with the world
  </h3>
  <p className="text-gray-400 mb-6">
    Connect your creations with a global community. Share your progress, get feedback, and turn your inner spark into a movement. Your next project can inspire millions.
  </p>

  <div className="relative h-16 w-full flex items-center justify-end">
    <div className="absolute right-0 top-0 w-14 h-14 bg-[#A146EA] opacity-70 rounded-lg transform rotate-6 flex items-center justify-center">
      <Globe className="w-6 h-6 text-white" />
    </div>
    <div className="absolute right-4 top-2 w-16 h-16 bg-[#4B7DDA] rounded-lg transform -rotate-3 flex items-center justify-center shadow-lg">
      <p className="text-white font-bold text-sm">5k</p>
    </div>
  </div>
</motion.div>


        </div>
      </div>
    </section>

    </div>
  );
};

export default Home;