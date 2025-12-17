import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import images from "../assets/images";
import { Play, Pause, Bookmark, Share2, Loader2, Download, AlertCircle } from "lucide-react";
import { useGenerateMusicMutation, useLazyGetTaskQuery } from "../services/api/generationApi";

const styles = ["Synthwave", "Lo-Fi", "Classical", "Jazz", "Rock", "Electronic"];
const models = [
  { value: "V4", label: "V4 (Max 4 min, improved vocal quality)" },
  { value: "V4_5", label: "V4.5 (Max 8 min, smarter prompts)" },
  { value: "V4_5PLUS", label: "V4.5+ (Max 8 min, richer sound)" },
  { value: "V4_5ALL", label: "V4.5ALL (Max 8 min)" },
  { value: "V5", label: "V5 (Superior expression, faster)" },
];
const vocalGenders = [
  { value: "", label: "Not specified" },
  { value: "m", label: "Male" },
  { value: "f", label: "Female" }
];

// Model-specific character limits
const MODEL_LIMITS = {
  V4: { prompt: 3000, style: 200 },
  V4_5: { prompt: 5000, style: 1000 },
  V4_5PLUS: { prompt: 5000, style: 1000 },
  V4_5ALL: { prompt: 5000, style: 1000 },
  V5: { prompt: 5000, style: 1000 },
};

// Format duration from seconds to MM:SS
const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Engaging loading messages - each shows only once per generation
const loadingMessages = [
  "Warming up the studio 🎧",
  "Composing melody 🎼",
  "Layering harmonies 🎹",
  "Adding rhythm 🥁",
  "Crafting basslines 🎸",
  "Mixing frequencies 🎚️",
  "Balancing levels ⚖️",
  "Adding reverb 🌊",
  "Fine-tuning vocals 🎤",
  "Polishing the sound ✨",
  "Final mastering 🎶",
  "Creating magic 🎵",
];

export default function Create() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const [customMode, setCustomMode] = useState(false);
  const [modeSelected, setModeSelected] = useState(false);
  const [instrumental, setInstrumental] = useState(true);
  const [model, setModel] = useState("V4");
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Synthwave");
  const [title, setTitle] = useState("");
  const [negativeTags, setNegativeTags] = useState("");
  const [vocalGender, setVocalGender] = useState("");
  const [styleWeight, setStyleWeight] = useState(0.5);
  const [weirdnessConstraint, setWeirdnessConstraint] = useState(0.5);
  const [audioWeight, setAudioWeight] = useState(0.5);
  
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [generatedMusic, setGeneratedMusic] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [audioRefs, setAudioRefs] = useState({});
  const [audioProgress, setAudioProgress] = useState({}); // { id: { currentTime, duration } }
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const startTimeRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const progressUpdateIntervalRef = useRef(null);
  const messageIntervalRef = useRef(null);

  const [generateMusic, { isLoading: isGenerating }] = useGenerateMusicMutation();
  const [getTask, { data: taskData, isLoading: isPolling }] = useLazyGetTaskQuery();

  const handleModeSelection = (mode) => {
    if (mode === "custom") {
      setCustomMode((prev) => !prev);
    } else if (mode === "instrumental") {
      setInstrumental((prev) => !prev);
    }
    setModeSelected(true);
    // Reset prompt when switching to instrumental custom mode
    if (mode === "custom" && instrumental) {
      setPrompt("");
    }
  };

  // Validation helper
  const validateForm = () => {
    setError("");
    const limits = MODEL_LIMITS[model];

    if (!modeSelected) {
      setError("Please select a mode first");
      return false;
    }

    if (customMode) {
      if (instrumental) {
        // Custom Mode + Instrumental: style and title required, no prompt
        if (!style.trim()) {
          setError("Style is required in custom mode");
          return false;
        }
        if (!title.trim()) {
          setError("Title is required in custom mode");
          return false;
        }
        if (prompt.trim()) {
          setError("Prompt should not be provided when instrumental is true");
          return false;
        }
        if (style.length > limits.style) {
          setError(`Style must be at most ${limits.style} characters for model ${model}`);
          return false;
        }
      } else {
        // Custom Mode + Non-Instrumental: style, title, and prompt required
        if (!prompt.trim()) {
          setError("Prompt is required when customMode is true and instrumental is false");
          return false;
        }
        if (!style.trim()) {
          setError("Style is required in custom mode");
          return false;
        }
        if (!title.trim()) {
          setError("Title is required in custom mode");
          return false;
        }
        if (prompt.length > limits.prompt) {
          setError(`Prompt must be at most ${limits.prompt} characters for model ${model}`);
          return false;
        }
        if (style.length > limits.style) {
          setError(`Style must be at most ${limits.style} characters for model ${model}`);
          return false;
        }
      }
      if (title.length > 80) {
        setError("Title must be at most 80 characters");
        return false;
      }
    } else {
      // Non-Custom Mode: only prompt is required
    if (!prompt.trim()) {
        setError("Prompt is required when customMode is false");
        return false;
      }
      if (prompt.length > 500) {
        setError("Prompt must be at most 500 characters when customMode is false");
        return false;
      }
      if (style.trim()) {
        setError("Style should not be provided when customMode is false");
        return false;
      }
      if (title.trim()) {
        setError("Title should not be provided when customMode is false");
        return false;
      }
    }

    return true;
  };

  const handleGenerate = async () => {
    if (!isAuthenticated) {
      setError("Please log in to generate music");
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    setError("");
    setProgress(0);
    setStatus("pending");
    setCurrentMessageIndex(0);
    setLoadingMessage(loadingMessages[0]);
    startTimeRef.current = Date.now();

    try {
    const payload = {
      customMode,
      instrumental,
        model,
    };

    if (customMode) {
      payload.style = style.trim();
      payload.title = title.trim();
        if (!instrumental) {
          payload.prompt = prompt.trim();
        }
      if (vocalGender) payload.vocalGender = vocalGender;
      payload.styleWeight = parseFloat(styleWeight.toFixed(2));
      payload.weirdnessConstraint = parseFloat(weirdnessConstraint.toFixed(2));
      payload.audioWeight = parseFloat(audioWeight.toFixed(2));
      } else {
        payload.prompt = prompt.trim();
    }

    if (negativeTags.trim()) {
      payload.negativeTags = negativeTags.trim();
    }

      const result = await generateMusic(payload).unwrap();
      setCurrentTaskId(result.taskId);
      
      // Start polling
      startPolling(result.taskId);
    } catch (err) {
      setError(err?.data?.error?.message || err?.message || "Failed to start generation");
      setStatus("");
      setProgress(0);
    }
  };

  const startPolling = (taskId) => {
    // Clear any existing polling
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    // Poll immediately
    getTask(taskId);

    // Set up polling interval (every 4 seconds)
    pollingIntervalRef.current = setInterval(() => {
      getTask(taskId);
    }, 4000);
  };

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  // Calculate isProcessing before useEffects
  const isProcessing = isGenerating || isPolling || (currentTaskId && status !== "completed" && status !== "failed");

  // Progress loading messages sequentially (each shows only once)
  useEffect(() => {
    if (!isProcessing) {
      setLoadingMessage("");
      setCurrentMessageIndex(0);
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
        messageIntervalRef.current = null;
      }
      return;
    }

    // Start with first message
    setLoadingMessage(loadingMessages[0]);
    setCurrentMessageIndex(0);

    // Progress to next message every 18 seconds (slow enough to not repeat during 3-4 min generation)
    messageIntervalRef.current = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < loadingMessages.length) {
          setLoadingMessage(loadingMessages[nextIndex]);
          return nextIndex;
        } else {
          // All messages shown, keep showing the last one
          return prevIndex;
        }
      });
    }, 18000); // 18 seconds per message

    return () => {
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
        messageIntervalRef.current = null;
      }
    };
  }, [isProcessing]);

  // Handle task data updates
  useEffect(() => {
    if (!taskData) return;

    const taskStatus = taskData.status;
    setStatus(taskStatus);

    // Update progress based on elapsed time (estimate 3-4 minutes = 180-240 seconds)
    if (startTimeRef.current) {
      const elapsed = (Date.now() - startTimeRef.current) / 1000; // seconds
      const estimatedTotal = 210; // 3.5 minutes average
      const calculatedProgress = Math.min(95, (elapsed / estimatedTotal) * 100);
      setProgress(calculatedProgress);
    }

    if (taskStatus === "completed") {
      stopPolling();
      setProgress(100);
      setLoadingMessage("Complete! 🎉");
      
      // Map audio results to card format
      if (taskData.audioResults && taskData.audioResults.length > 0) {
        const mappedMusic = taskData.audioResults.map((audio) => ({
          id: audio.audioId,
          title: audio.title,
          image: audio.imageUrl,
        artist: "AI Generated",
          duration: audio.duration, // Keep as seconds for progress tracking
          durationFormatted: formatDuration(audio.duration),
          style: audio.tags || style,
          audioUrl: audio.audioUrl || audio.streamAudioUrl,
          streamAudioUrl: audio.streamAudioUrl,
        }));
        setGeneratedMusic((prev) => [...mappedMusic, ...prev]);
      }
      setCurrentTaskId(null);
      setStatus("");
    } else if (taskStatus === "failed") {
      stopPolling();
      setError(taskData.errorMessage || "Generation failed");
      setStatus("");
      setProgress(0);
      setLoadingMessage("");
      setCurrentTaskId(null);
    }
  }, [taskData, style]);

  // Update audio progress while playing
  useEffect(() => {
    if (!playingId || !audioRefs[playingId]) {
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current);
        progressUpdateIntervalRef.current = null;
      }
      return;
    }

    const audio = audioRefs[playingId];
    const updateProgress = () => {
      if (audio) {
        setAudioProgress((prev) => ({
          ...prev,
          [playingId]: {
            currentTime: audio.currentTime,
            duration: audio.duration || 0,
          },
        }));
      }
    };

    // Update immediately
    updateProgress();

    // Update every 100ms for smooth progress bar
    progressUpdateIntervalRef.current = setInterval(updateProgress, 100);

    // Listen to timeupdate event for more accurate updates
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current);
      }
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [playingId, audioRefs]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      stopPolling();
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current);
      }
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
      }
    };
  }, []);

  // Handle audio playback
  const togglePlay = (id, audioUrl) => {
    if (playingId === id) {
      // Pause
      if (audioRefs[id]) {
        audioRefs[id].pause();
      }
      setPlayingId(null);
    } else {
      // Stop any currently playing audio
      Object.keys(audioRefs).forEach((key) => {
        if (audioRefs[key]) {
          audioRefs[key].pause();
        }
      });
      
      // Play new audio
      if (!audioRefs[id] && audioUrl) {
        const audio = new Audio(audioUrl);
        audio.onended = () => {
          setPlayingId(null);
          setAudioProgress((prev) => ({
            ...prev,
            [id]: { currentTime: 0, duration: prev[id]?.duration || 0 },
          }));
        };
        audio.onerror = () => {
          setPlayingId(null);
          setError("Failed to play audio");
        };
        audio.onloadedmetadata = () => {
          setAudioProgress((prev) => ({
            ...prev,
            [id]: { currentTime: 0, duration: audio.duration },
          }));
        };
        setAudioRefs((prev) => ({ ...prev, [id]: audio }));
        audio.play().catch((err) => {
          setError("Failed to play audio");
          setPlayingId(null);
        });
      } else if (audioRefs[id]) {
        audioRefs[id].play().catch((err) => {
          setError("Failed to play audio");
          setPlayingId(null);
        });
      }
      setPlayingId(id);
    }
  };

  // Handle progress bar seeking
  const handleSeek = (id, newTime) => {
    if (audioRefs[id]) {
      audioRefs[id].currentTime = newTime;
      setAudioProgress((prev) => ({
        ...prev,
        [id]: { ...prev[id], currentTime: newTime },
      }));
    }
  };

  // Download audio
  const handleDownload = async (id, audioUrl, title) => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "music"}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError("Failed to download audio");
    }
  };

  const limits = MODEL_LIMITS[model];
  const showPrompt = !customMode || !instrumental;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-x-hidden">
       <img
              src={images.createBackImage}
              alt="background"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.35)', zIndex: 0 }}
            />
      
      <div className="relative z-10 w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[70%] mx-auto py-8 sm:py-12 md:py-16 lg:py-20">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-2">
          AI Music Generator
        </h1>
        
        {/* Main Container */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8">
          {/* Left Form */}
          <div className="flex-1 bg-white/10 backdrop-blur-lg p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 min-w-0">
            <div className="mb-4 sm:mb-5 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2">
                🎵 Melody Lab
              </h2>
              
              {/* Mode Selection Toggles */}
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium whitespace-nowrap">Instrumental</span>
                  <button
                    onClick={() => handleModeSelection("instrumental")}
                    disabled={isProcessing}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      instrumental ? "bg-purple-600" : "bg-gray-600"
                    } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        instrumental ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium whitespace-nowrap">Custom Mode</span>
                  <button
                    onClick={() => handleModeSelection("custom")}
                    disabled={isProcessing}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      customMode ? "bg-pink-600" : "bg-gray-600"
                    } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        customMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>
              </div>
            </div>

            {/* Model Selector */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Model <span className="text-red-400">*</span>
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={isProcessing}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {models.map((m) => (
                  <option key={m.value} value={m.value} className="bg-[#39355C]">
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt */}
            {showPrompt && (
              <div className="mb-4">
                <label className="block mb-2 font-medium text-sm sm:text-base">
                  Prompt <span className="text-red-400">*</span>
                  <span className="text-xs sm:text-sm text-gray-400 ml-2">
                    ({prompt.length}/{customMode ? limits.prompt : 500})
                  </span>
              </label>
              <textarea
                  placeholder={
                    customMode && !instrumental
                      ? "Write or paste your lyrics here..."
                      : "Describe your music idea (e.g., 'Uplifting synthwave with dreamy atmosphere')"
                  }
                value={prompt}
                  onChange={(e) => {
                    const maxLength = customMode ? limits.prompt : 500;
                    setPrompt(e.target.value.slice(0, maxLength));
                  }}
                  disabled={isProcessing}
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-xl resize-none h-28 sm:h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            )}

            {/* Custom Mode Fields */}
            {customMode && (
              <>
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-sm sm:text-base">
                    Style <span className="text-red-400">*</span>
                    <span className="text-xs sm:text-sm text-gray-400 ml-2">
                      ({style.length}/{limits.style})
                    </span>
                  </label>
                  <select
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    value={style}
                    onChange={(e) => setStyle(e.target.value.slice(0, limits.style))}
                    disabled={isProcessing}
                  >
                    {styles.map((s) => (
                      <option key={s} value={s} className="bg-[#39355C]">
                        {s}
                      </option>
                    ))}
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
                    disabled={isProcessing}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {!instrumental && (
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-sm sm:text-base">Vocal Gender</label>
                  <select
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    value={vocalGender}
                    onChange={(e) => setVocalGender(e.target.value)}
                      disabled={isProcessing}
                  >
                    {vocalGenders.map((vg) => (
                        <option key={vg.value} value={vg.value} className="bg-[#39355C]">
                          {vg.label}
                        </option>
                    ))}
                  </select>
                </div>
                )}

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
                    disabled={isProcessing}
                    className="w-full accent-purple-500 disabled:opacity-50"
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
                    disabled={isProcessing}
                    className="w-full accent-purple-500 disabled:opacity-50"
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
                    disabled={isProcessing}
                    className="w-full accent-purple-500 disabled:opacity-50"
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
                disabled={isProcessing}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-red-300">{error}</span>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {status === "pending" ? "Starting..." : status === "processing" ? "Generating..." : "Processing..."}
                </>
              ) : (
                "🎼 Generate Masterpiece"
              )}
            </button>
          </div>

          {/* Right Content Area */}
          {isProcessing ? (
            <div className="flex-1 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 min-w-0">
              <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 animate-spin mx-auto mb-3 sm:mb-4 text-purple-400" />
              <p className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-center px-2">
                {loadingMessage || "Creating your music..."}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-3 sm:mt-4 px-2">
                <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-2">
                  <span className="tabular-nums">{Math.round(progress)}%</span>
                  <span className="text-[10px] sm:text-xs md:text-sm">{status || "Processing"}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 sm:h-2.5">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 sm:h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-gray-400 mt-2 text-[10px] sm:text-xs md:text-sm text-center">
                  This may take 3-4 minutes
                </p>
              </div>
            </div>
          ) : generatedMusic.length === 0 ? (
            <div className="flex-1 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] bg-black/40 backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 flex items-center justify-center p-4 sm:p-6 md:p-8 min-w-0">
              <div className="text-center px-2">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🎵</div>
                <p className="text-base sm:text-lg md:text-xl font-semibold mb-2">Your music will appear here</p>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base">Fill in the form and click generate to create your masterpiece</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                {generatedMusic.slice(0, 4).map((m) => {
                  const progress = audioProgress[m.id] || { currentTime: 0, duration: m.duration || 0 };
                  const progressPercent = progress.duration > 0 
                    ? (progress.currentTime / progress.duration) * 100 
                    : 0;
                  const isPlaying = playingId === m.id;
                  const hasAudioLoaded = audioRefs[m.id] || progress.duration > 0;

                  return (
                    <div key={m.id} className="relative bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:scale-105 transition group flex flex-col">
                    <img src={m.image} alt={m.title} className="w-full h-40 sm:h-48 object-cover" />
                      
                      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
                        <h3 className="font-semibold text-sm sm:text-base md:text-lg truncate">{m.title}</h3>
                        <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm">{m.artist}</span>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-gray-300 flex-wrap">
                          <span className="bg-purple-500/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs">{m.style}</span>
                        <span>•</span>
                          <span className="tabular-nums">{m.durationFormatted || formatDuration(progress.duration)}</span>
                        </div>

                        {/* Audio Progress Bar - Centered horizontally in middle */}
                        {hasAudioLoaded && (
                          <div className="w-full my-2 sm:my-3 px-0.5">
                            <div className="w-full flex items-center gap-1.5 sm:gap-2 min-w-0">
                              <span className="text-[10px] sm:text-xs text-gray-400 flex-shrink-0 text-right tabular-nums w-[2rem] sm:w-[2.5rem]">
                                {formatDuration(progress.currentTime)}
                              </span>
                              <input
                                type="range"
                                min={0}
                                max={progress.duration || 0}
                                value={progress.currentTime || 0}
                                onChange={(e) => handleSeek(m.id, parseFloat(e.target.value))}
                                className="flex-1 min-w-0 accent-purple-500 h-0.5 sm:h-1 cursor-pointer"
                                style={{ 
                                  background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(147 51 234) ${progressPercent}%, rgb(75 85 99) ${progressPercent}%, rgb(75 85 99) 100%)`
                                }}
                              />
                              <span className="text-[10px] sm:text-xs text-gray-400 flex-shrink-0 tabular-nums w-[2rem] sm:w-[2.5rem]">
                                {formatDuration(progress.duration)}
                              </span>
                            </div>
                      </div>
                        )}

                        <div className="flex justify-between items-center mt-auto pt-2">
                        <button 
                            onClick={() => togglePlay(m.id, m.audioUrl)}
                            className="text-purple-400 hover:text-purple-300 transition p-1.5 sm:p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
                            aria-label={isPlaying ? "Pause" : "Play"}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            ) : (
                              <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            )}
                          </button>
                          <div className="flex gap-1.5 sm:gap-2 md:gap-3 text-gray-400">
                            <button
                              onClick={() => handleDownload(m.id, m.audioUrl, m.title)}
                              className="hover:text-white transition p-1.5 sm:p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
                              title="Download"
                              aria-label="Download"
                            >
                              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            </button>
                            <button 
                              className="hover:text-white transition p-1.5 sm:p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
                              aria-label="Bookmark"
                            >
                              <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            </button>
                            <button 
                              className="hover:text-white transition p-1.5 sm:p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
                              aria-label="Share"
                            >
                              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
