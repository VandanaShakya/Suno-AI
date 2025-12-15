import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe, Sparkles } from 'lucide-react';
import images from '../../assets/images';
import { reelsData, aiVoices } from '../../data/data';
import { FiPlay } from "react-icons/fi";
import Pricing from './Pricing';

// ---------- Typing constants ----------
const PHRASES = [
  "Gentle jazz melodies for tending plants",
];
const TYPING_SPEED = 70;   // ms per character when typing
const DELETING_SPEED = 40; // ms per character when deleting
const PAUSE_DURATION = 1500; // pause after finishing typing before deleting

const Home = () => {
  // Typing state
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Video refs
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);

  // Basic guards
  const safePhrases = Array.isArray(PHRASES) && PHRASES.length > 0 ? PHRASES : [""];
  const currentPhrase = safePhrases[phraseIndex % safePhrases.length];

  // Typing/Deleting step handler
  const handleTypingEffect = useCallback(() => {
    // If there is no phrase, do nothing
    if (!currentPhrase) return;

    if (!isDeleting) {
      // Typing phase
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
        // finished deleting - move to next phrase and start typing again
        setIsDeleting(false);
        setPhraseIndex(i => (i + 1) % safePhrases.length);
      }
    }
  }, [charIndex, currentPhrase, isDeleting, safePhrases.length]);

  // Schedule typing/deleting steps
  useEffect(() => {
    // Nothing to do if phrase is empty string
    if (currentPhrase === "") return;

    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const id = setTimeout(() => {
      handleTypingEffect();
    }, speed);

    return () => clearTimeout(id);
  }, [displayedText, handleTypingEffect, isDeleting, currentPhrase]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor(s => !s), 500);
    return () => clearInterval(id);
  }, []);

  // Generate handler (keeps your original)
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
      // update UI/state here if needed
    } catch (error) {
      console.error("Error generating track:", error);
    } finally {
      setLoading(false);
    }
  };

  // Play-card state
  const [playingId, setPlayingId] = useState(null);
  const togglePlay = (id) => setPlayingId(playingId === id ? null : id);

  // Video autoplay & loop helpers
  useEffect(() => {
    const refs = [mobileVideoRef.current, desktopVideoRef.current].filter(Boolean);

    refs.forEach((v) => {
      try {
        v.loop = true;
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch (err) {}

      const onEnded = () => {
        try {
          v.currentTime = 0.001;
          v.play();
        } catch (e) {}
      };
      v.addEventListener('ended', onEnded);

      const onCanPlay = () => {
        try {
          const p = v.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } catch (e) {}
      };
      v.addEventListener('canplay', onCanPlay, { once: true });

      // cleanup for each video element
      return () => {
        v.removeEventListener('ended', onEnded);
        v.removeEventListener('canplay', onCanPlay);
      };
    });
  }, []);

  // Framer Motion Variants (ADD THIS)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};


  return (
    <div className="overflow-x-hidden">
    <motion.section
  className="relative min-h-screen flex items-center justify-center px-4 py-6 md:p-8 overflow-hidden"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* BACKGROUND IMAGE */}
  <img
    src={images.sunoHeroImage}
    alt="Hero background"
    className="absolute inset-0 w-full h-full object-cover -z-20"
    style={{ objectPosition: "65% center" }}
    draggable={false}
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/65 -z-10 pointer-events-none" />

  {/* CONTENT CONTAINER */}
  <div className="w-full max-w-[1200px] mx-auto relative z-20">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

      {/* LEFT COLUMN — TEXT + INPUT */}
      <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
        <motion.div
          className="text-white pt-2 md:pt-10 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 pt-10 text-white">
  Create Stunning Music Instantly.
  <span
    className="ml-2 text-transparent bg-clip-text"
    style={{
      backgroundImage: "linear-gradient(90deg, #5B77DD, #5B77DD)",
      textShadow: `
        0 0 6px rgba(161,70,234,0.6),
        0 0 12px rgba(161,70,234,0.6),
        0 0 20px rgba(75,125,218,0.7)
      `,
    }}
  >
    Type, Generate, Enjoy
  </span>
</h1>


          <p className="text-base md:text-lg text-white mb-4">
            <span>{displayedText}</span>
            <span className="ml-1">{showCursor ? "|" : "\u00A0"}</span>
          </p>

          <p className="text-base md:text-lg text-white">
            Turn your ideas into high-quality music tracks in seconds with our
            AI-powered music generator.
          </p>
        </motion.div>

        {/* INPUT */}
        <div className="w-full md:max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Describe the track you want..."
              className="w-full pr-32 px-4 py-3 md:py-4 rounded-xl bg-[#1F2531] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A146EA]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 md:py-3 rounded-lg font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(90deg, #A146EA, #4B7DDA)",
              }}
            >
              {loading ? "Generating..." : "Generate Now"}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — IMAGE BLOCK (NEW, ADDED) */}
      <motion.div
        className="relative w-full flex justify-center md:justify-end"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
       <motion.div
  className="relative w-[360px] sm:w-[420px] md:w-[420px] lg:w-[480px] aspect-square"
  animate={{
    y: [0, -14, 0, 14, 0],   // wave motion
  }}
  transition={{
    duration: 6,           // slower = smoother
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  {/* OPTIONAL GLOW */}
  {/* <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#A146EA]/30 to-[#4B7DDA]/30 blur-2xl" /> */}

  {/* IMAGE */}
  <img
    src={images.sunoRight}
    alt="Suno preview"
    className="relative z-10 w-[400px] h-full object-cover"
    draggable={false}
  />
</motion.div>
      </motion.div>

    </div>
  </div>
</motion.section>


      <section className="px-4 py-16 bg-black min-h-screen">
        <div className="relative flex flex-col items-center justify-center text-center px-2 sm:px-4 w-full max-w-[95%] md:max-w-[80%] mx-auto">
          <h1
            className="text-white font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-snug md:leading-tight drop-shadow-lg text-left md:text-center"
          >
            Experience the Future of{" "}
            <span className="bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] bg-clip-text text-transparent">
              AI-Powered Music Creation
            </span>
          </h1>

          <p className="text-white/90 mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl md:max-w-2xl drop-shadow text-left md:text-center">
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
             <motion.div className="group relative border border-[#A146EA]/30 rounded-3xl p-6 flex flex-col justify-between">
  
  {/* IMAGE ON TOP */}
  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-6">
    <img
      src={voice.image}
      alt={voice.name}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-black/25" />
  </div>

  {/* ICON + TEXT */}
  <div className="flex items-center space-x-4 mb-6">
    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#A146EA]/50 to-[#4B7DDA]/50">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="font-semibold text-lg text-white">{voice.name}</h3>
      <p className="text-sm text-white/70">{voice.style}</p>
    </div>
  </div>

  {/* WAVE ANIMATION */}
  {/* PLAY BUTTON */}
  {/* DESCRIPTION */}

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

        <section className="bg-black py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden w-full py-4">
              <div className="marquee flex space-x-4 md:space-x-6">
                {[...reelsData, ...reelsData].map((reel, index) => (
                  <motion.div
                    key={index}
                    className="relative flex-shrink-0 w-[150px] sm:w-[180px] lg:w-[200px] h-[350px] sm:h-[400px] lg:h-[450px] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${reel.imageUrl})`, backgroundColor: '#333' }}
                    >
                      <svg className="absolute top-4 left-4 w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 3l12 9-12 9V3z" />
                      </svg>

                      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
                        {reel.label.toUpperCase()}
                      </div>

                      <div className="absolute bottom-4 left-4 text-white text-sm font-bold bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                        {reel.username}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-10 flex justify-center w-full">
              <button
                className="
                  px-6 sm:px-10 
                  py-3 sm:py-4 
                  text-base sm:text-lg 
                  font-bold text-white 
                  rounded-full shadow-lg 
                  transition-all duration-300 
                  transform hover:scale-105 
                  w-auto
                "
                style={{ background: "linear-gradient(90deg, #A146EA, #4B7DDA)" }}
              >
                Sign up for free
              </button>
            </div>
          </div>
        </section>
      </section>

      {/* pricing section */}
      <Pricing />

    <section className="bg-gradient-to-b from-black to-[#131B27] py-12 sm:py-16">
  <div className="mx-auto w-[90%] md:w-[85%] lg:w-[80%] max-w-7xl px-2 sm:px-4">
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12 text-center">
      Everything you need to <span className="text-[#A146EA]">explore</span> and get inspired
    </h2>

    {/* GRID CONTAINER */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
      
      {/* CARD 1 */}
      <div className="animated-border border rounded-2xl bg-[#131B27] h-full">
        <motion.div
          className="card-inner p-4 sm:p-6 rounded-2xl relative overflow-hidden isolate h-full flex flex-col justify-between"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Background gradient layer */}
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: "linear-gradient(180deg, rgba(124,58,237,0.02), rgba(6,182,212,0.01))",
            }}
          />

          {/* Card content */}
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              <span className="text-[#A146EA]">10</span> Daily Inspirations
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-5">
              Dive into new ideas instantly. Fresh prompts, concepts, and thought-starters daily to
              fuel your next creation. Free forever — no signup.
            </p>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#A146EA]/10 rounded-full flex items-center justify-center border-2 border-[#A146EA]">
              <Sparkles className="w-6 h-6 text-[#A146EA]" />
            </div>
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              background: "linear-gradient(180deg, rgba(124,58,237,0.03), rgba(6,182,212,0.02))",
            }}
          />
        </motion.div>
      </div>

      {/* CARD 2 */}
      <div className="animated-border border rounded-2xl bg-[#131B27] h-full">
        <motion.div
          className="card-inner p-4 sm:p-6 rounded-2xl relative overflow-hidden h-full flex flex-col justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
          style={{ boxShadow: "0 8px 30px rgba(17, 24, 39, 0.6)" }}
        >
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              Free <span className="text-[#4B7DDA]">AI</span> Idea Generator
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4">
              Unleash creativity with a market-leading AI generator. Explore curated themes,
              trending prompts, and style variations to kickstart any project.
            </p>

            <div className="relative h-40 sm:h-44 w-full overflow-hidden rounded-lg bg-gray-800 p-2 flex items-center justify-center hover:-translate-y-2 transition-transform duration-300">
              <img
                src={images?.feature7}
                alt="feature"
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(180deg, rgba(75,125,218,0.03), rgba(124,58,237,0.02))" }}
          />
        </motion.div>
      </div>

      {/* CARD 3 */}
      <div className="animated-border border rounded-2xl bg-[#131B27] h-full">
        <motion.div
          className="card-inner p-4 sm:p-6 rounded-2xl relative overflow-hidden h-full flex flex-col justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          style={{ boxShadow: "0 8px 30px rgba(17, 24, 39, 0.6)" }}
        >
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              Share your <span className="text-[#A146EA]">Journey</span> with the world
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4">
              Connect your creations with a global community — share progress, get feedback, and
              turn ideas into movements.
            </p>

            <div className="relative h-20 sm:h-24 w-full flex items-center justify-end">
              <div className="absolute right-0 top-0 w-12 sm:w-14 h-12 sm:h-14 bg-[#A146EA] opacity-75 rounded-lg transform rotate-3 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="absolute right-6 top-3 w-14 h-14 bg-[#4B7DDA] rounded-lg transform -rotate-3 flex items-center justify-center shadow-lg">
                <p className="text-white font-bold text-sm">5k</p>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.03), rgba(75,125,218,0.02))" }}
          />
        </motion.div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
