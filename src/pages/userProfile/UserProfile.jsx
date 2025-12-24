import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGetUserProfileQuery } from '../../services/api/userApi';
import { useGetUserAudioQuery, useGetUserAudioCountQuery, useDownloadAudioMutation } from '../../services/api/generationApi';
import { useGetInvoicesQuery } from '../../services/api/invoiceApi';
import InvoiceCard from '../../components/InvoiceCard';
import InvoiceDetail from '../../components/InvoiceDetail';
import { Play, Pause, Loader2, AlertCircle, Music, Sparkles, Zap, Crown, FileText, Download } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

// Define the theme colors
const THEME_ACCENT = '#507ADB';
const THEME_ACCENT_HOVER = '#9B49E9';
const PAGE_BG = '#131B27';

// Format date to "Joined Month Year"
const formatJoinDate = (dateString) => {
  if (!dateString) return 'Joined recently';
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `Joined ${month} ${year}`;
};

// Format plan name
const formatPlanName = (plan) => {
  const planMap = {
    free: 'Free Plan',
    pro: 'Pro Plan',
    pro_plus: 'Pro+ Plan',
  };
  return planMap[plan] || plan;
};

// Format duration from seconds to MM:SS
const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  
  // Fetch user profile
  const { data: userProfile, isLoading: isLoadingProfile, error: profileError } = useGetUserProfileQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  // Fetch recent tracks (limit to 6 for profile page)
  const { data: tracksData, isLoading: isLoadingTracks } = useGetUserAudioQuery(
    { limit: 6, cursor: undefined },
    { skip: !isAuthenticated, refetchOnMountOrArgChange: true }
  );

  // Fetch total audio count
  const { data: audioCountData } = useGetUserAudioCountQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  // Fetch recent invoices (limit to 5 for profile page)
  const { data: invoicesData, isLoading: isLoadingInvoices } = useGetInvoicesQuery(
    { limit: 5, offset: 0 },
    { skip: !isAuthenticated, refetchOnMountOrArgChange: true }
  );

  const [downloadAudio] = useDownloadAudioMutation();

  const recentTracks = tracksData?.data || [];
  const recentInvoices = invoicesData?.invoices || [];
  const totalTracksCount = audioCountData?.count || 0;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  // Edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  // Update form when profile loads
  useEffect(() => {
    if (userProfile) {
      setForm({ name: userProfile.name || '', email: userProfile.email || '' });
    }
  }, [userProfile]);

  // Audio playback state
  const [playingId, setPlayingId] = useState(null);
  const [audioRefs, setAudioRefs] = useState({});
  const [audioProgress, setAudioProgress] = useState({}); // { id: { currentTime, duration } }
  const progressUpdateIntervalRef = useRef(null);

  // Invoice detail modal state
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceDetailOpen, setIsInvoiceDetailOpen] = useState(false);

  const openEdit = () => {
    if (userProfile) {
      setForm({ name: userProfile.name || '', email: userProfile.email || '' });
    }
    setErrors({});
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
    setErrors({});
  };

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 1) e.name = 'Name required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) e.email = 'Valid email required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsEditing(false);
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Handle audio playback
  const togglePlay = (id, audioUrl) => {
    if (playingId === id) {
      if (audioRefs[id]) {
        audioRefs[id].pause();
      }
      setPlayingId(null);
    } else {
      Object.keys(audioRefs).forEach((key) => {
        if (audioRefs[key]) {
          audioRefs[key].pause();
        }
      });

      if (!audioRefs[id] && audioUrl) {
        const audio = new Audio(audioUrl);
        audio.onended = () => {
          setPlayingId(null);
          setAudioProgress((prev) => ({
            ...prev,
            [id]: { currentTime: 0, duration: prev[id]?.duration || 0 },
          }));
        };
        audio.onerror = () => setPlayingId(null);
        audio.onloadedmetadata = () => {
          setAudioProgress((prev) => ({
            ...prev,
            [id]: { currentTime: 0, duration: audio.duration },
          }));
        };
        setAudioRefs((prev) => ({ ...prev, [id]: audio }));
        audio.play().catch(() => setPlayingId(null));
      } else if (audioRefs[id]) {
        audioRefs[id].play().catch(() => setPlayingId(null));
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
      // Check if user can download (frontend check for UX)
      if (!userProfile?.canDownload) {
        return;
      }

      // Call backend download endpoint
      const result = await downloadAudio(id).unwrap();
      const downloadUrl = result.downloadUrl || result.audioUrl;
      
      if (!downloadUrl) {
        return;
      }

      // Fetch and download the file
      const response = await fetch(downloadUrl);
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
      // Error toast will be shown by baseQueryWithToast for API errors
      console.error("Failed to download audio:", err);
    }
  };

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

  // Cleanup audio refs on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current);
      }
    };
  }, []);

  // Invoice handlers
  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceDetailOpen(true);
  };

  const handleDownloadInvoice = (invoice) => {
    if (invoice.pdfUrl) {
      window.open(invoice.pdfUrl, "_blank");
    } else {
      const pdfUrl = `${API_BASE_URL}/v1/invoices/${invoice.id}/pdf`;
      window.open(pdfUrl, "_blank");
    }
  };

  const handleCloseInvoiceDetail = () => {
    setIsInvoiceDetailOpen(false);
    setSelectedInvoice(null);
  };

  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Loading state
  if (!isAuthenticated || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: PAGE_BG }}>
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="text-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-16 h-16 mx-auto mb-4" style={{ color: THEME_ACCENT }} />
          </motion.div>
          <p className="text-white/70 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (profileError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ backgroundColor: PAGE_BG }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </div>
        <div className="text-center max-w-md relative z-10">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <p className="text-white text-xl mb-2 font-semibold">Failed to load profile</p>
          <p className="text-white/70 text-sm">
            {profileError?.data?.error?.message || profileError?.message || 'Please try again later'}
          </p>
        </div>
      </div>
    );
  }

  // No profile data
  if (!userProfile) {
    return null;
  }

  return (
    <div className="mt-10 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: PAGE_BG }}>
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl relative z-10">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl"
            style={{
              boxShadow: '0 8px 32px rgba(80, 122, 219, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 opacity-50 blur-xl" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 relative z-10">
              {/* Avatar with glow */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-60 animate-pulse" />
                <div
                  className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${THEME_ACCENT}, ${THEME_ACCENT_HOVER})`,
                    boxShadow: '0 0 40px rgba(80, 122, 219, 0.5)',
                  }}
                >
                  {getInitials(userProfile.name)}
                </div>
              </motion.div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
                >
                  {userProfile.name}
                </motion.h1>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10"
                  >
                    <Crown className="w-4 h-4" style={{ color: THEME_ACCENT }} />
                    <span className="text-sm font-semibold text-white">{formatPlanName(userProfile.plan)}</span>
                  </motion.div>
                  
                  <div className="text-sm text-white/60">
                    {formatJoinDate(userProfile.createdAt)}
                  </div>
                </div>

                <p className="text-white/70 mb-6 text-sm sm:text-base">{userProfile.email}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openEdit}
                    className="px-6 py-2.5 rounded-full font-semibold text-white text-sm backdrop-blur-md transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${THEME_ACCENT}, ${THEME_ACCENT_HOVER})`,
                      boxShadow: '0 4px 20px rgba(80, 122, 219, 0.4)',
                    }}
                  >
                    Edit Profile
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/Pricing')}
                    className="px-6 py-2.5 rounded-full font-semibold text-white/90 text-sm backdrop-blur-md border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    Upgrade Plan
                  </motion.button>
                </div>
              </div>

              {/* Credits Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/10 shadow-xl"
                style={{
                  boxShadow: '0 8px 32px rgba(80, 122, 219, 0.2)',
                }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5" style={{ color: THEME_ACCENT }} />
                    <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Credits</p>
                  </div>
                  <p className="text-4xl sm:text-5xl font-black text-white mb-1">{userProfile.generationCredits}</p>
                  <p className="text-xs text-white/50">Available</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Account Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="lg:col-span-2 backdrop-blur-xl bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <Zap className="w-5 h-5" style={{ color: THEME_ACCENT }} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Account Information</h2>
            </div>
            
            <div className="space-y-4">
              <InfoRow label="Plan" value={formatPlanName(userProfile.plan)} />
              <InfoRow label="Download Enabled" value={userProfile.canDownload ? 'Yes' : 'No'} />
              <InfoRow label="Member Since" value={formatJoinDate(userProfile.createdAt)} />
            </div>
          </motion.div>

          {/* Credits & Actions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Generation Credits</h2>

            <div className="flex-1 space-y-6">
              {/* Credits Display */}
              <div className="backdrop-blur-md bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-5 border border-white/10">
                <p className="text-sm font-medium text-white/70 mb-2">Current Credits</p>
                <p className="text-4xl sm:text-5xl font-black text-white mb-4">{userProfile.generationCredits}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/Pricing')}
                  className="w-full py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${THEME_ACCENT}, ${THEME_ACCENT_HOVER})`,
                    boxShadow: '0 4px 20px rgba(80, 122, 219, 0.4)',
                  }}
                >
                  Buy More
                </motion.button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <StatCard value={Math.floor(totalTracksCount / 2)} label="Tracks" />
                <StatCard value={userProfile.generationCredits} label="Credits" />
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/create')}
                className="w-full py-3 rounded-full font-bold text-white text-sm transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${THEME_ACCENT}, ${THEME_ACCENT_HOVER})`,
                  boxShadow: '0 4px 20px rgba(80, 122, 219, 0.4)',
                }}
              >
                Start Generation
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Recent Tracks Section */}
        {recentTracks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Recent Tracks</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/my-album')}
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-2"
                style={{ color: THEME_ACCENT }}
              >
                View All
                <span className="text-lg">→</span>
              </motion.button>
            </div>

            {isLoadingTracks ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: THEME_ACCENT }} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recentTracks.slice(0, 6).map((track, index) => {
                  const audioUrl = track.audioUrl || track.streamAudioUrl;
                  const isPlaying = playingId === track.audioId;
                  const progress = audioProgress[track.audioId] || { currentTime: 0, duration: track.duration || 0 };
                  const progressPercent = progress.duration > 0 
                    ? (progress.currentTime / progress.duration) * 100 
                    : 0;
                  const hasAudioLoaded = audioRefs[track.audioId] || progress.duration > 0;

                  return (
                    <motion.div
                      key={track.audioId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group relative backdrop-blur-xl bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-xl flex flex-col"
                      style={{
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        {track.imageUrl ? (
                          <img
                            src={track.imageUrl}
                            alt={track.title}
                            className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full aspect-square bg-gradient-to-br from-blue-500/50 to-purple-500/50 flex items-center justify-center">
                            <Music className="w-12 h-12 sm:w-16 sm:h-16 text-white/60" />
                          </div>
                        )}
                      </div>

                      {/* Track Info */}
                      <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
                        <h3 className="font-bold text-white truncate text-lg">{track.title}</h3>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-sm text-gray-300 min-w-0">
                          <span 
                            className="px-2 py-1 rounded text-xs truncate max-w-[60%] sm:max-w-[70%]" 
                            title={track.modelName || 'Music'}
                            style={{ backgroundColor: `${THEME_ACCENT}30` }}
                          >
                            {track.modelName || 'Music'}
                          </span>
                          <span className="flex-shrink-0">•</span>
                          <span className="tabular-nums flex-shrink-0 text-white/60">{formatDuration(progress.duration)}</span>
                        </div>

                        {/* Audio Progress Bar */}
                        {hasAudioLoaded && (
                          <div className="w-full my-2 sm:my-3 px-0.5">
                            <div className="w-full flex items-center gap-1.5 sm:gap-2 min-w-0">
                              <span className="text-xs text-white/60 flex-shrink-0 text-right tabular-nums w-[2rem] sm:w-[2.5rem]">
                                {formatDuration(progress.currentTime)}
                              </span>
                              <input
                                type="range"
                                min={0}
                                max={progress.duration || 0}
                                value={progress.currentTime || 0}
                                onChange={(e) => handleSeek(track.audioId, parseFloat(e.target.value))}
                                className="flex-1 min-w-0 h-0.5 sm:h-1 cursor-pointer"
                                style={{ 
                                  accentColor: THEME_ACCENT,
                                  background: `linear-gradient(to right, ${THEME_ACCENT} 0%, ${THEME_ACCENT} ${progressPercent}%, rgb(75 85 99) ${progressPercent}%, rgb(75 85 99) 100%)`
                                }}
                              />
                              <span className="text-xs text-white/60 flex-shrink-0 tabular-nums w-[2rem] sm:w-[2.5rem]">
                                {formatDuration(progress.duration)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Controls */}
                        <div className="flex justify-between items-center mt-auto pt-2">
                          <button 
                            onClick={() => audioUrl && togglePlay(track.audioId, audioUrl)}
                            className="text-white hover:text-white/80 transition p-1.5 sm:p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
                            style={{ color: THEME_ACCENT }}
                            aria-label={isPlaying ? "Pause" : "Play"}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            ) : (
                              <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            )}
                          </button>
                          {userProfile?.canDownload && (
                            <button
                              onClick={() => handleDownload(track.audioId, audioUrl, track.title)}
                              className="text-white/60 hover:text-white transition p-1.5 sm:p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
                              title="Download"
                              aria-label="Download"
                            >
                              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Empty tracks state */}
        {!isLoadingTracks && recentTracks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-16 backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-xl"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Music className="w-20 h-20 mx-auto mb-4 text-white/30" />
            </motion.div>
            <p className="text-white/70 text-xl mb-2 font-semibold">No tracks yet</p>
            <p className="text-white/50 text-sm mb-6">Start creating music to see it here</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create')}
              className="px-8 py-3 rounded-full font-bold text-white transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${THEME_ACCENT}, ${THEME_ACCENT_HOVER})`,
                boxShadow: '0 4px 20px rgba(80, 122, 219, 0.4)',
              }}
            >
              Create Music
            </motion.button>
          </motion.div>
        )}

        {/* Recent Invoices Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <FileText className="w-5 h-5" style={{ color: THEME_ACCENT }} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Recent Invoices</h2>
            </div>
            {recentInvoices.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/invoices')}
                className="text-sm font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-2"
                style={{ color: THEME_ACCENT }}
              >
                View All
                <span className="text-lg">→</span>
              </motion.button>
            )}
          </div>

          {isLoadingInvoices ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-10 h-10 animate-spin" style={{ color: THEME_ACCENT }} />
            </div>
          ) : recentInvoices.length > 0 ? (
            <div className="space-y-4">
              {recentInvoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <InvoiceCard
                    invoice={invoice}
                    onView={handleViewInvoice}
                    onDownload={handleDownloadInvoice}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-xl">
              <FileText className="w-16 h-16 mx-auto mb-4 text-white/30" />
              <p className="text-white/70 text-lg mb-2 font-semibold">No invoices yet</p>
              <p className="text-white/50 text-sm mb-6">Your invoices will appear here after you make a payment</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/Pricing')}
                className="px-6 py-3 rounded-full font-semibold text-white transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${THEME_ACCENT}, ${THEME_ACCENT_HOVER})`,
                  boxShadow: '0 4px 20px rgba(80, 122, 219, 0.4)',
                }}
              >
                View Pricing Plans
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Invoice Detail Modal */}
        <InvoiceDetail
          invoice={selectedInvoice}
          isOpen={isInvoiceDetailOpen}
          onClose={handleCloseInvoiceDetail}
          onDownload={handleDownloadInvoice}
        />

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeEdit}
            />
            <motion.form
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onSubmit={handleSave}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg backdrop-blur-xl bg-white/10 rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Edit Profile</h3>

              <div className="space-y-5">
                <label className="block">
                  <span className="text-sm font-medium text-white/80 mb-2 block">Display Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-2">{errors.name}</p>}
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-white/80 mb-2 block">Email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-2">{errors.email}</p>}
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={closeEdit}
                  className="px-6 py-2.5 rounded-full font-semibold text-white/90 text-sm backdrop-blur-md border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-2.5 rounded-full font-semibold text-white text-sm transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${THEME_ACCENT}, ${THEME_ACCENT_HOVER})`,
                    boxShadow: '0 4px 20px rgba(80, 122, 219, 0.4)',
                  }}
                >
                  Save
                </motion.button>
              </div>
            </motion.form>
          </div>
        )}
      </div>
    </div>
  );
};

// Info Row Component
const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
    <span className="text-sm text-white/60">{label}</span>
    <span className="text-base font-semibold text-white">{value}</span>
  </div>
);

// Stat Card Component
const StatCard = ({ value, label }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -2 }}
    className="backdrop-blur-md bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-4 text-center border border-white/10"
  >
    <p className="text-3xl sm:text-4xl font-black text-white mb-1">{value}</p>
    <p className="text-xs text-white/60 uppercase tracking-wider">{label}</p>
  </motion.div>
);

export default UserProfile;
