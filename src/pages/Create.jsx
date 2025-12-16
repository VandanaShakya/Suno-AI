import React, { useState } from "react";
import images from "../assets/images";
import { Play, Pause, Bookmark, Share2, Loader2, X } from "lucide-react";

const styles = ["Synthwave", "Lo-Fi", "Classical", "Jazz", "Rock", "Electronic"];
const vocalGenders = [
  { value: "", label: "Not specified" },
  { value: "m", label: "Male" },
  { value: "f", label: "Female" }
];

export default function Create() {
  const [customMode, setCustomMode] = useState(false);
  const [modeSelected, setModeSelected] = useState(false);
  const [instrumental, setInstrumental] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Synthwave");
  const [title, setTitle] = useState("");
  const [negativeTags, setNegativeTags] = useState("");
  const [vocalGender, setVocalGender] = useState("");
  const [styleWeight, setStyleWeight] = useState(0.5);
  const [weirdnessConstraint, setWeirdnessConstraint] = useState(0.5);
  const [audioWeight, setAudioWeight] = useState(0.5);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState([]);
  const [playingId, setPlayingId] = useState(null);

  const handleModeSelection = (mode) => {
    setCustomMode(mode === "custom");
    setInstrumental(mode === "instrumental");
    setModeSelected(true);
  };

  const generateMusic = async () => {
    if (!modeSelected) {
      alert("Please select a mode first");
      return;
    }

    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }
    
    if (customMode && !style.trim()) {
      alert("Style is required in custom mode");
      return;
    }
    
    if (customMode && !title.trim()) {
      alert("Title is required in custom mode");
      return;
    }
    
    if (customMode && title.length > 80) {
      alert("Title must be 80 characters or less");
      return;
    }

    setIsGenerating(true);

    const payload = {
      customMode,
      instrumental,
      prompt: prompt.trim(),
    };

    if (customMode) {
      payload.style = style.trim();
      payload.title = title.trim();
      if (vocalGender) payload.vocalGender = vocalGender;
      payload.styleWeight = parseFloat(styleWeight.toFixed(2));
      payload.weirdnessConstraint = parseFloat(weirdnessConstraint.toFixed(2));
      payload.audioWeight = parseFloat(audioWeight.toFixed(2));
    }

    if (negativeTags.trim()) {
      payload.negativeTags = negativeTags.trim();
    }

    console.log("API Payload:", payload);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const newMusic = [
      {
        id: Date.now() + 1,
        title: customMode ? title : "Ethereal Echoes",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
        artist: "AI Generated",
        duration: "2:45",
        style: style
      },
      {
        id: Date.now() + 2,
        title: customMode ? `${title} (Variation)` : "Nebula Dreams",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
        artist: "AI Generated",
        duration: "3:12",
        style: style
      },
    ];

    setGeneratedMusic([...newMusic, ...generatedMusic]);
    setIsGenerating(false);
  };

  const togglePlay = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  const deleteMusic = (id) => {
    setGeneratedMusic(generatedMusic.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-3 sm:p-4 md:p-8 ">
       <img
              src={images.createBackImage}
              alt="background"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.35)', zIndex: 0 }}
            />
      
      <div className="w-[90%] md:w-[70%] mx-auto py-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Music Generator
        </h1>
        
        {/* Main Container */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-8">
          {/* Left Form */}
          <div className="flex-1 bg-white/10 backdrop-blur-lg p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-white/20">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                🎵 Melody Lab
              </h2>
              
              {/* Mode Selection Toggles */}
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium whitespace-nowrap">Instrumental</span>
                  <button
                    onClick={() => handleModeSelection("instrumental")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      modeSelected && instrumental ? "bg-purple-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        modeSelected && instrumental ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium whitespace-nowrap">Custom Mode</span>
                  <button
                    onClick={() => handleModeSelection("custom")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      modeSelected && customMode ? "bg-pink-600" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        modeSelected && customMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>
              </div>
            </div>

            {/* Prompt */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Prompt <span className="text-red-400">*</span>
              </label>
              <textarea
                placeholder="Describe your music idea (e.g., 'Uplifting synthwave with dreamy atmosphere')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl resize-none h-28 sm:h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>

            {/* Custom Mode Fields */}
            {customMode && (
              <>
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-sm sm:text-base">
                    Style <span className="text-red-400">*</span>
                  </label>
                  <select
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                  >
                    {styles.map((s) => <option key={s} value={s} className="bg-[#39355C]">{s}</option>)}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium text-sm sm:text-base">
                    Title <span className="text-red-400">*</span>
                    <span className="text-xs sm:text-sm text-gray-400 ml-2">({title.length}/80)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Song title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value.slice(0, 80))}
                    maxLength={80}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium text-sm sm:text-base">Vocal Gender</label>
                  <select
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                    value={vocalGender}
                    onChange={(e) => setVocalGender(e.target.value)}
                  >
                    {vocalGenders.map((vg) => (
                      <option key={vg.value} value={vg.value} className="bg-[#39355C]">{vg.label}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium text-sm sm:text-base">
                    Style Weight: {styleWeight.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={styleWeight}
                    onChange={(e) => setStyleWeight(parseFloat(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium text-sm sm:text-base">
                    Weirdness: {weirdnessConstraint.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={weirdnessConstraint}
                    onChange={(e) => setWeirdnessConstraint(parseFloat(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium text-sm sm:text-base">
                    Audio Weight: {audioWeight.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={audioWeight}
                    onChange={(e) => setAudioWeight(parseFloat(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </>
            )}

            {/* Negative Tags */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-sm sm:text-base">Negative Tags (Optional)</label>
              <input
                type="text"
                placeholder="e.g., 'loud, aggressive, distorted'"
                value={negativeTags}
                onChange={(e) => setNegativeTags(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
            </div>

            <button
              onClick={generateMusic}
              disabled={isGenerating || !modeSelected}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                "🎼 Generate Masterpiece"
              )}
            </button>
          </div>

          {/* Right Content Area */}
          {isGenerating ? (
            <div className="flex-1 min-h-[400px] sm:min-h-[500px] bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl border border-white/20 flex items-center justify-center p-4">
              <div className="text-center">
                <Loader2 className="w-12 sm:w-16 h-12 sm:h-16 animate-spin mx-auto mb-4 text-purple-400" />
                <p className="text-lg sm:text-xl font-semibold">Creating your music...</p>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">This may take a few moments</p>
              </div>
            </div>
          ) : generatedMusic.length === 0 ? (
            <div className="flex-1 min-h-[400px] sm:min-h-[500px] bg-black/40 backdrop-blur-lg rounded-2xl md:rounded-3xl border border-white/10 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-4">🎵</div>
                <p className="text-lg sm:text-xl font-semibold mb-2">Your music will appear here</p>
                <p className="text-gray-400 text-sm sm:text-base">Fill in the form and click generate to create your masterpiece</p>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {generatedMusic.slice(0, 4).map((m) => (
                  <div key={m.id} className="relative bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:scale-105 transition group">
                    {/* Delete Button */}
                    <button
                      onClick={() => deleteMusic(m.id)}
                      className="absolute top-2 right-2 z-10 bg-red-600/80 hover:bg-red-700 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <img src={m.image} alt={m.title} className="w-full h-40 sm:h-48 object-cover" />
                    <div className="p-3 sm:p-4 flex flex-col gap-2">
                      <h3 className="font-semibold text-base sm:text-lg truncate">{m.title}</h3>
                      <span className="text-gray-400 text-xs sm:text-sm">{m.artist}</span>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                        <span className="bg-purple-500/30 px-2 py-1 rounded">{m.style}</span>
                        <span>•</span>
                        <span>{m.duration}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <button 
                          onClick={() => togglePlay(m.id)}
                          className="text-purple-400 hover:text-purple-300 transition p-2 hover:bg-white/10 rounded-lg"
                        >
                          {playingId === m.id ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
                        </button>
                        <div className="flex gap-2 sm:gap-3 text-gray-400">
                          <button className="hover:text-white transition p-2 hover:bg-white/10 rounded-lg">
                            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button className="hover:text-white transition p-2 hover:bg-white/10 rounded-lg">
                            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



// import React, { useState } from "react";
// import { Play, Pause, Bookmark, Share2, Loader2 } from "lucide-react";

// const styles = ["Synthwave", "Lo-Fi", "Classical", "Jazz", "Rock", "Electronic"];
// const vocalGenders = [
//   { value: "", label: "Not specified" },
//   { value: "m", label: "Male" },
//   { value: "f", label: "Female" }
// ];

// export default function Create() {
//   const [customMode, setCustomMode] = useState(false);
//   const [instrumental, setInstrumental] = useState(true);
//   const [prompt, setPrompt] = useState("");
//   const [style, setStyle] = useState("Synthwave");
//   const [title, setTitle] = useState("");
//   const [negativeTags, setNegativeTags] = useState("");
//   const [vocalGender, setVocalGender] = useState("");
//   const [styleWeight, setStyleWeight] = useState(0.5);
//   const [weirdnessConstraint, setWeirdnessConstraint] = useState(0.5);
//   const [audioWeight, setAudioWeight] = useState(0.5);
  
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedMusic, setGeneratedMusic] = useState([]);
//   const [playingId, setPlayingId] = useState(null);

//   const generateMusic = async () => {
//     // Validation
//     if (!prompt.trim()) {
//       alert("Please enter a prompt");
//       return;
//     }
    
//     if (customMode && !style.trim()) {
//       alert("Style is required in custom mode");
//       return;
//     }
    
//     if (customMode && !title.trim()) {
//       alert("Title is required in custom mode");
//       return;
//     }
    
//     if (customMode && title.length > 80) {
//       alert("Title must be 80 characters or less");
//       return;
//     }

//     setIsGenerating(true);
//     setGeneratedMusic([]); // Clear previous results

//     // Prepare API payload
//     const payload = {
//       customMode,
//       instrumental,
//       prompt: prompt.trim(),
//     };

//     if (customMode) {
//       payload.style = style.trim();
//       payload.title = title.trim();
//       if (vocalGender) payload.vocalGender = vocalGender;
//       payload.styleWeight = parseFloat(styleWeight.toFixed(2));
//       payload.weirdnessConstraint = parseFloat(weirdnessConstraint.toFixed(2));
//       payload.audioWeight = parseFloat(audioWeight.toFixed(2));
//     }

//     if (negativeTags.trim()) {
//       payload.negativeTags = negativeTags.trim();
//     }

//     console.log("API Payload:", payload);

//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     // Mock generated music
//     const mockMusic = [
//       {
//         id: Date.now() + 1,
//         title: customMode ? title : "Ethereal Echoes",
//         image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
//         artist: "AI Generated",
//         duration: "2:45",
//         style: style
//       },
//       {
//         id: Date.now() + 2,
//         title: customMode ? `${title} (Variation)` : "Nebula Dreams",
//         image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
//         artist: "AI Generated",
//         duration: "3:12",
//         style: style
//       },
//     ];

//     setGeneratedMusic(mockMusic);
//     setIsGenerating(false);
//   };

//   const togglePlay = (id) => {
//     setPlayingId(playingId === id ? null : id);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//           AI Music Generator
//         </h1>
        
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Form */}
//           <div className="flex-1 bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20">
//             <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
//               🎵 Melody Lab
//             </h2>

//             {/* Mode Toggle */}
//             <div className="mb-6 p-4 bg-purple-500/20 rounded-xl">
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={customMode}
//                   onChange={(e) => setCustomMode(e.target.checked)}
//                   className="w-5 h-5 accent-purple-500"
//                 />
//                 <div>
//                   <div className="font-semibold">Custom Mode</div>
//                   <div className="text-sm text-gray-300">Enable advanced options</div>
//                 </div>
//               </label>
//             </div>

//             {/* Instrumental Toggle */}
//             <div className="mb-6 p-4 bg-blue-500/20 rounded-xl">
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={instrumental}
//                   onChange={(e) => setInstrumental(e.target.checked)}
//                   className="w-5 h-5 accent-blue-500"
//                 />
//                 <div>
//                   <div className="font-semibold">Instrumental Only</div>
//                   <div className="text-sm text-gray-300">No vocals/lyrics</div>
//                 </div>
//               </label>
//             </div>

//             {/* Prompt */}
//             <div className="mb-4">
//               <label className="block mb-2 font-medium">
//                 Prompt <span className="text-red-400">*</span>
//               </label>
//               <textarea
//                 placeholder={instrumental ? "Describe the mood and feel (e.g., 'Uplifting synthwave with dreamy atmosphere')" : "Write or paste your lyrics here..."}
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 className="w-full bg-white/5 border border-white/10 p-3 rounded-xl resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             {/* Custom Mode Fields */}
//             {customMode && (
//               <>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">
//                     Style <span className="text-red-400">*</span>
//                   </label>
//                   <select
//                     className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     value={style}
//                     onChange={(e) => setStyle(e.target.value)}
//                   >
//                     {styles.map((s) => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">
//                     Title <span className="text-red-400">*</span>
//                     <span className="text-sm text-gray-400 ml-2">({title.length}/80)</span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Song title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value.slice(0, 80))}
//                     maxLength={80}
//                     className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">Vocal Gender</label>
//                   <select
//                     className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     value={vocalGender}
//                     onChange={(e) => setVocalGender(e.target.value)}
//                   >
//                     {vocalGenders.map((vg) => (
//                       <option key={vg.value} value={vg.value}>{vg.label}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">
//                     Style Weight: {styleWeight.toFixed(2)}
//                   </label>
//                   <input
//                     type="range"
//                     min={0}
//                     max={1}
//                     step={0.01}
//                     value={styleWeight}
//                     onChange={(e) => setStyleWeight(parseFloat(e.target.value))}
//                     className="w-full accent-purple-500"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">
//                     Weirdness: {weirdnessConstraint.toFixed(2)}
//                   </label>
//                   <input
//                     type="range"
//                     min={0}
//                     max={1}
//                     step={0.01}
//                     value={weirdnessConstraint}
//                     onChange={(e) => setWeirdnessConstraint(parseFloat(e.target.value))}
//                     className="w-full accent-purple-500"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">
//                     Audio Weight: {audioWeight.toFixed(2)}
//                   </label>
//                   <input
//                     type="range"
//                     min={0}
//                     max={1}
//                     step={0.01}
//                     value={audioWeight}
//                     onChange={(e) => setAudioWeight(parseFloat(e.target.value))}
//                     className="w-full accent-purple-500"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Negative Tags */}
//             <div className="mb-6">
//               <label className="block mb-2 font-medium">Negative Tags (Optional)</label>
//               <input
//                 type="text"
//                 placeholder="e.g., 'loud, aggressive, distorted'"
//                 value={negativeTags}
//                 onChange={(e) => setNegativeTags(e.target.value)}
//                 className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>

//             <button
//               onClick={generateMusic}
//               disabled={isGenerating}
//               className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isGenerating ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Generating...
//                 </>
//               ) : (
//                 "🎼 Generate Masterpiece"
//               )}
//             </button>
//           </div>

//           {/* Right Results */}
//           <div className="flex-1">
//             {isGenerating ? (
//               <div className="h-full min-h-[400px] bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 flex items-center justify-center">
//                 <div className="text-center">
//                   <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-purple-400" />
//                   <p className="text-xl font-semibold">Creating your music...</p>
//                   <p className="text-gray-400 mt-2">This may take a few moments</p>
//                 </div>
//               </div>
//             ) : generatedMusic.length === 0 ? (
//               <div className="h-full min-h-[400px] bg-black/40 backdrop-blur-lg rounded-3xl border border-white/10 flex items-center justify-center">
//                 <div className="text-center px-6">
//                   <div className="text-6xl mb-4">🎵</div>
//                   <p className="text-xl font-semibold mb-2">Your music will appear here</p>
//                   <p className="text-gray-400">Fill in the form and click generate to create your masterpiece</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {generatedMusic.map((m) => (
//                   <div key={m.id} className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:scale-105 transition">
//                     <img src={m.image} alt={m.title} className="w-full h-48 object-cover" />
//                     <div className="p-4 flex flex-col gap-2">
//                       <h3 className="font-semibold text-lg truncate">{m.title}</h3>
//                       <span className="text-gray-400 text-sm">{m.artist}</span>
//                       <div className="flex items-center gap-2 text-sm text-gray-300">
//                         <span className="bg-purple-500/30 px-2 py-1 rounded">{m.style}</span>
//                         <span>•</span>
//                         <span>{m.duration}</span>
//                       </div>
//                       <div className="flex justify-between items-center mt-2">
//                         <button 
//                           onClick={() => togglePlay(m.id)}
//                           className="text-purple-400 hover:text-purple-300 transition p-2 hover:bg-white/10 rounded-lg"
//                         >
//                           {playingId === m.id ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
//                         </button>
//                         <div className="flex gap-3 text-gray-400">
//                           <button className="hover:text-white transition p-2 hover:bg-white/10 rounded-lg">
//                             <Bookmark className="w-5 h-5" />
//                           </button>
//                           <button className="hover:text-white transition p-2 hover:bg-white/10 rounded-lg">
//                             <Share2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }