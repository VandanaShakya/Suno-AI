import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Download, Loader2, AlertCircle } from "lucide-react";
import { useGetUserAudioQuery } from "../../services/api/generationApi";
import { store } from "../../store/store";
import { API_BASE_URL } from "../../config/api";

// Format duration from seconds to MM:SS
const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function MyAlbum() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  
  const [allTracks, setAllTracks] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  const [audioRefs, setAudioRefs] = useState({});
  const [audioProgress, setAudioProgress] = useState({});
  const [nextCursor, setNextCursor] = useState(undefined);
  const [hasMore, setHasMore] = useState(false);

  const { data, isLoading, error } = useGetUserAudioQuery(
    { limit: 20, cursor: undefined },
    { skip: !isAuthenticated }
  );

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Update tracks when data changes
  useEffect(() => {
    if (data) {
      setAllTracks(data.data || []);
      setNextCursor(data.pagination?.nextCursor);
      setHasMore(data.pagination?.hasMore || false);
    }
  }, [data]);

  // Load more tracks
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMore = async () => {
    if (!nextCursor || isLoadingMore) return;
    
    setIsLoadingMore(true);
    try {
      const token = store.getState().auth?.token;
      const response = await fetch(
        `${API_BASE_URL}/v1/audio?limit=20&cursor=${nextCursor}`,
        {
          headers: {
            authorization: `Bearer ${token || ""}`,
          },
        }
      );
      
      if (response.ok) {
        const result = await response.json();
        setAllTracks((prev) => [...prev, ...(result.data || [])]);
        setNextCursor(result.pagination?.nextCursor);
        setHasMore(result.pagination?.hasMore || false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to load more tracks:", errorData);
      }
    } catch (err) {
      console.error("Failed to load more tracks:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Update audio progress while playing
  useEffect(() => {
    if (!playingId || !audioRefs[playingId]) {
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

    updateProgress();
    const interval = setInterval(updateProgress, 100);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      clearInterval(interval);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [playingId, audioRefs]);

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
        };
        audio.onloadedmetadata = () => {
          setAudioProgress((prev) => ({
            ...prev,
            [id]: { currentTime: 0, duration: audio.duration },
          }));
        };
        setAudioRefs((prev) => ({ ...prev, [id]: audio }));
        audio.play().catch(() => {
          setPlayingId(null);
        });
      } else if (audioRefs[id]) {
        audioRefs[id].play().catch(() => {
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
      console.error("Failed to download audio:", err);
    }
  };

  // Cleanup audio refs on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      });
    };
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-x-hidden">
      <div className="relative z-10 w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[70%] mx-auto py-8 sm:py-12 md:py-16 lg:py-20">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-2">
          My Album
        </h1>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-300">
              {error?.data?.error?.message || error?.message || "Failed to load your music"}
            </span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && allTracks.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-purple-400 mb-4" />
            <p className="text-lg font-semibold">Loading your music...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && allTracks.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-xl sm:text-2xl font-semibold mb-2">No tracks yet</p>
            <p className="text-gray-400 mb-6">Start creating music to see it here</p>
            <button
              onClick={() => navigate("/create")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:scale-105 transition"
            >
              Create Music
            </button>
          </div>
        )}

        {/* Tracks Grid */}
        {allTracks.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {allTracks.map((track) => {
                const progress = audioProgress[track.audioId] || {
                  currentTime: 0,
                  duration: track.duration || 0,
                };
                const progressPercent =
                  progress.duration > 0
                    ? (progress.currentTime / progress.duration) * 100
                    : 0;
                const isPlaying = playingId === track.audioId;
                const hasAudioLoaded =
                  audioRefs[track.audioId] || progress.duration > 0;
                const audioUrl = track.audioUrl || track.streamAudioUrl;

                return (
                  <div
                    key={track.audioId}
                    className="relative bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/20 hover:scale-105 transition group flex flex-col"
                  >
                    <img
                      src={track.imageUrl}
                      alt={track.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />

                    <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base md:text-lg truncate">
                        {track.title}
                      </h3>
                      <span className="text-gray-400 text-[10px] sm:text-xs md:text-sm">
                        {track.modelName}
                      </span>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-gray-300 flex-wrap">
                        <span className="bg-purple-500/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs">
                          {track.tags || "Music"}
                        </span>
                        <span>•</span>
                        <span className="tabular-nums">
                          {formatDuration(progress.duration || track.duration)}
                        </span>
                      </div>

                      {/* Audio Progress Bar */}
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
                              onChange={(e) =>
                                handleSeek(track.audioId, parseFloat(e.target.value))
                              }
                              className="flex-1 min-w-0 accent-purple-500 h-0.5 sm:h-1 cursor-pointer"
                              style={{
                                background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(147 51 234) ${progressPercent}%, rgb(75 85 99) ${progressPercent}%, rgb(75 85 99) 100%)`,
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
                          onClick={() => togglePlay(track.audioId, audioUrl)}
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
                            onClick={() =>
                              handleDownload(track.audioId, audioUrl, track.title)
                            }
                            className="hover:text-white transition p-1.5 sm:p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
                            title="Download"
                            aria-label="Download"
                          >
                            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

