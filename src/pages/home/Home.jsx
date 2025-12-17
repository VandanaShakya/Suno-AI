import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Globe, Sparkles,  MoreVertical, Play, Pause, ChevronDown } from 'lucide-react';
import images from '../../assets/images';
import { stepsData, aiVoices, faqData, featuresData  } from '../../data/data';
import { FiPlay } from "react-icons/fi";
import Pricing from './Pricing';

// ---------- Typing constants ----------
const PHRASES = [
  "Gentle jazz melodies for tending plants",
];
const TYPING_SPEED = 70;   
const DELETING_SPEED = 40; 
const PAUSE_DURATION = 1500;  

const Home = () => {
  // Typing state
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
   const [prompt, setPrompt] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
   const navigate = useNavigate();
 

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
   const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
     if (prompt.trim()) {
      // Redirect to create page and pass the prompt via state
      navigate("/create", { state: { initialPrompt: prompt } });
    } else {
      alert("Please enter a description for your track!");
    }
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
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <>
    <div className="overflow-x-hidden">
 <motion.section
  className="relative bg-[#0B0D11] mt-20 min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  {/* BACKGROUND GLOWS */}
  <div className="absolute top-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#A146EA]/10 blur-[120px] rounded-full" />

  <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
    
    {/* LEFT CONTENT */}
    <div className="flex flex-col gap-6 text-center lg:text-left ">
      <motion.h1
  className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight lg:leading-[1.1] text-left"
  initial={{ x: -30, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
>
  Generate Professional Music in <br />
  <span className="text-white">Seconds. Just Type and Listen</span>
</motion.h1>

<p className="text-white/50 text-base text-left max-w-lg">
  AI music generator tool is your AI music generator tool.
</p>


      {/* PILL INPUT BAR */}
      <div className="relative mt-4 group w-full max-w-2xl mx-auto lg:mx-0">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#A146EA]/20 to-[#4B7DDA]/20 rounded-full blur opacity-75 group-focus-within:opacity-100 transition duration-300" />
        
      <div className="relative flex items-center bg-[#1A1D23] border border-white/10 rounded-full p-2 pl-4 sm:pl-6 gap-2 w-full max-w-2xl">
  <input
    type="text"
    placeholder="Describe the track you want..."
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
    className="bg-transparent border-none outline-none text-white flex-1 text-sm sm:text-base placeholder:text-white/30 px-2"
  />

  <button
    onClick={handleGenerate}
    className="bg-gradient-to-r from-[#4B7DDA] to-[#A146EA] text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:scale-105 transition-transform active:scale-95 whitespace-nowrap"
  >
    Generate Now
  </button>
</div>

      </div>
    </div>

    {/* RIGHT CONTENT */}
    <motion.div
      className="relative flex justify-center items-center mt-10 lg:mt-0"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* AUDIO WAVES */}
     

      <img
        src={images.sunoRight}
        alt="AI Music Brain"
        className="relative z-20 w-[70%] sm:w-[65%] md:w-[60%] lg:w-full max-w-md lg:max-w-none drop-shadow-[0_0_50px_rgba(161,70,234,0.3)]"
      />
    </motion.div>

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
          <div className="p-10 bg-[#0B0D11]  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {aiVoices.map((voice) => {
          const isPlaying = playingId === voice.id;

          return (
            <motion.div
              key={voice.id}
              whileHover={{ scale: 1.02 }}
              className="relative bg-[#1A1D23]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col gap-4 group hover:border-[#A146EA]/50 transition-colors shadow-xl"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-white text-base truncate">
                  {voice.name}
                </h3>
                <button className="text-white/40 hover:text-white">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* PLAY + WAVEFORM */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => togglePlay(voice.id)}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A146EA] to-[#4B7DDA] flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause fill="white" size={20} />
                  ) : (
                    <Play fill="white" className="ml-1" size={20} />
                  )}
                </button>

                {/* MOCK WAVEFORM */}
                <div className="flex-1 flex items-center h-12 gap-[2px]">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-gradient-to-t from-[#A146EA] to-[#4B7DDA]"
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                        opacity: isPlaying ? 1 : 0.4,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center">
                <div className="bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                  <p className="text-xs text-white/60 truncate max-w-[150px]">
                    {voice.style}
                  </p>
                </div>
                <span className="text-[10px] text-white/40 font-mono">
                  00:35
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

        {/* Additional Content Section */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Create Music in 3 Simple Steps with Our AI Voices</h2>
          <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] mb-6"></div>
          <p className="text-white/70 text-lg leading-relaxed">
        Start by describing the sound you imagine—whether it’s a catchy pop hook, a hard-hitting rap verse, or a calm ambient atmosphere. 
        Our advanced AI analyzes your prompt to understand the mood, genre, and creative direction behind your idea.
          </p>
        </div>

      <section className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stepsData.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.id * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-[#1A1D23]/60 backdrop-blur-md border border-white/5 rounded-[32px] p-8 min-h-[220px] flex flex-col justify-start group hover:border-[#A146EA]/30 transition-all"
            >
              {/* Step Number */}
              <span className="text-[#A146EA] text-4xl font-light mb-4 block">
                {step.id}
              </span>

              {/* Title */}
              <h3 className="text-white text-xl font-semibold mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed max-w-[90%]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Optional Button (kept from your previous code but styled for this section) */}
        <div className="mt-16 flex justify-center">
          <button
            className="px-10 py-4 text-lg font-bold text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{ background: "linear-gradient(90deg, #A146EA, #4B7DDA)" }}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </section>
      </section>



      {/* key feature */}
            
       <section className="bg-[#0B0D11] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Powerful AI Music Generation, Simplified
          </h2>

          <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] mb-6"></div>

          <p className="text-white/70 text-lg leading-relaxed">
            Our AI-powered music engine combines intelligent text understanding,
            instant audio generation, and full creative control—so you can turn
            ideas into professional-quality tracks faster than ever.
          </p>
        </div>

        {/* FEATURES GRID */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {featuresData.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.id}
            className="relative bg-[#1A1D23]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center
                       hover:border-[#A146EA]/50 transition-all duration-300 shadow-xl"
          >
            {/* ICON */}
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-r from-[#A146EA] to-[#4B7DDA]
                            flex items-center justify-center shadow-lg">
              <Icon className="text-white w-6 h-6" />
            </div>

            {/* TITLE */}
            <h3 className="text-white text-lg font-semibold mb-3">
              {feature.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-white/60 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>

      </div>
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


{/* // faq // */}
 <section className="bg-gradient-to-b from-[#121A26] to-[#010101] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* SECTION HEADING */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            FAQ Section
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#A146EA] to-[#4B7DDA] mx-auto rounded-full" />
        </div>

        {/* FAQ LIST */}
        <div className="space-y-2">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-white/10">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full py-6 flex justify-between items-center text-left transition-colors hover:text-white/80"
              >
                <span className="text-lg md:text-xl font-medium text-white/90">
                  {item.question}
                </span>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-white/40 w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-white/50 leading-relaxed text-base md:text-lg">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;
