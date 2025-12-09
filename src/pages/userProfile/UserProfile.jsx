import React, { useState } from 'react';

// Sample data to simulate a logged-in user
const initialUserData = {
    username: 'SynthMaster_24',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    bio: 'Electronic music enthusiast and sound designer. Currently experimenting with Lo-fi and Ambient textures.',
    joinDate: 'Joined Oct 2025',
    profilePicUrl: 'https://via.placeholder.com/150/000000/FFFFFF?text=AJ',
    credits: 85, // Music generation credits remaining
    tracksGenerated: 145,
    favorites: 32,
};

// Define the theme colors (using your two colors)
const THEME_ACCENT = '#507ADB';
const THEME_ACCENT_HOVER = '#9B49E9';
const PAGE_BG = '#131B27';
// CSS-friendly border-image for gradient border
const THEME_BORDER = 'linear-gradient(90deg, #507ADB 0%, #9B49E9 100%) 1';

const UserProfile = () => {
    const [userData, setUserData] = useState(initialUserData);

    // Edit modal state
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({ name: userData.name, email: userData.email });
    const [errors, setErrors] = useState({});

    const openEdit = () => {
        setForm({ name: userData.name, email: userData.email });
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
        // simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email || !emailRegex.test(form.email)) e.email = 'Valid email required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSave = (ev) => {
        ev.preventDefault();
        if (!validate()) return;
        setUserData(prev => ({ ...prev, name: form.name.trim(), email: form.email.trim() }));
        setIsEditing(false);
    };

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    return (
        <div className="min-h-screen py-40 sm:p-6 lg:p-8" style={{ backgroundColor: PAGE_BG }}>
            {/* Centered Content Container (70% width as requested) */}
            <div className="mx-auto w-[70%] max-w-4xl">

                {/* --- Profile Header Block --- */}
                <div
                    className="p-6 sm:p-8 rounded-xl text-white mb-8"
                    style={{
                        background: 'transparent',
                        border: '1px solid transparent',
                        borderImage: THEME_BORDER,
                    }}
                >
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                        {/* 1. DP (Profile Picture) */}
                        <div className="flex-shrink-0">
                            <img
                                className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover"
                                src={userData.profilePicUrl}
                                alt={`${userData.username}'s profile`}
                            />
                        </div>

                        {/* 2. Name & Main Info */}
                        <div className="text-center md:text-left flex-grow">
                            <div className="flex items-center justify-center md:justify-start space-x-4">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                                        {userData.username}
                                    </h1>
                                    <p className="text-xl font-semibold mt-1 text-white/90">
                                        {userData.name}
                                    </p>
                                    <p className="text-sm mt-1 text-white/80">
                                        {userData.joinDate}
                                    </p>
                                    {/* show email if present */}
                                    <p className="text-sm mt-1 text-white/70">
                                        {userData.email}
                                    </p>
                                </div>

                                {/* Credits pill (visible in header) */}
                                <div className="ml-2">
                                    <div
                                        className="px-3 py-1 rounded-full text-center"
                                        style={{
                                            border: '1px solid transparent',
                                            borderImage: THEME_BORDER,
                                            background: 'transparent',
                                        }}
                                    >
                                        <p className="text-xs text-white/80">Credits</p>
                                        <p className="text-lg font-bold text-white">{userData.credits}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-center md:justify-start space-x-3">
                                <button
                                    onClick={openEdit}
                                    className="px-3 py-2 text-sm font-medium rounded-lg text-white transition duration-200"
                                    style={{ backgroundColor: THEME_ACCENT }}
                                >
                                    Edit Profile
                                </button>
                                <button
                                    className="px-3 py-2 text-sm font-medium rounded-lg border text-white/90 hover:border-transparent transition duration-200"
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid transparent',
                                        borderImage: THEME_BORDER,
                                    }}
                                >
                                    Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Bio and Credits/Stats Block --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Bio / Detailed Info */}
                    <div
                        className="lg:col-span-2 p-6 sm:p-8 rounded-xl"
                        style={{
                            background: 'transparent',
                            border: '1px solid transparent',
                            borderImage: THEME_BORDER,
                        }}
                    >
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-white" style={{ borderColor: 'transparent' }}>
                            About {userData.username}
                        </h2>
                        <p className="text-white/90 leading-relaxed mb-4">
                            {userData.bio}
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-2 text-white/90">Contact & Preferences</h3>
                        <ul className="text-sm text-white/80 space-y-1">
                            <li><span className="font-medium">Favorite Genre:</span> Electronic / Ambient</li>
                            <li><span className="font-medium">Generation Quality:</span> High Fidelity (WAV)</li>
                            <li><span className="font-medium">Public Tracks:</span> Yes</li>
                        </ul>
                    </div>

                    {/* Column 2: Website Credits / Stats (Music Generation Focus) */}
                    <div
                        className="lg:col-span-1 p-6 sm:p-8 rounded-xl"
                        style={{
                            background: 'transparent',
                            border: '1px solid transparent',
                            borderImage: THEME_BORDER,
                        }}
                    >
                        <h2 className="text-2xl font-bold mb-4 pb-2 text-white">
                            Generation Credits
                        </h2>

                        <div className="space-y-4">
                            {/* Credits */}
                            <div
                                className="p-3 rounded-lg flex justify-between items-center"
                                style={{
                                    background: 'transparent',
                                    border: '1px solid transparent',
                                    borderImage: THEME_BORDER,
                                }}
                            >
                                <div>
                                    <p className="text-sm font-medium text-white/80">Current Credits</p>
                                    <p className="text-3xl font-extrabold text-white">{userData.credits}</p>
                                </div>
                                <button
                                    className="px-3 py-2 text-sm font-semibold rounded-full text-white transition duration-200"
                                    style={{ backgroundColor: THEME_ACCENT }}
                                    onMouseOver={e => e.currentTarget.style.backgroundColor = THEME_ACCENT_HOVER}
                                    onMouseOut={e => e.currentTarget.style.backgroundColor = THEME_ACCENT}
                                >
                                    Buy More
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3">
                                <StatCard value={userData.tracksGenerated} label="Tracks Generated" />
                                <StatCard value={userData.favorites} label="Favorite Tracks" />
                            </div>

                            {/* Promotional/Call-to-action */}
                            <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                <p className="text-sm text-white/80 mb-2">
                                    Generate music in a single prompt—start creating now!
                                </p>
                                <button
                                    className="w-full py-2 font-bold rounded-lg text-white transition duration-200"
                                    style={{ backgroundColor: THEME_ACCENT }}
                                    onMouseOver={e => e.currentTarget.style.backgroundColor = THEME_ACCENT_HOVER}
                                    onMouseOut={e => e.currentTarget.style.backgroundColor = THEME_ACCENT}
                                >
                                    Start Generation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Edit Modal (simple inline overlay) --- */}
                {isEditing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60" onClick={closeEdit} />
                        <form
                            onSubmit={handleSave}
                            className="relative w-full max-w-lg rounded-xl p-6 shadow-2xl"
                            style={{
                                background: 'transparent',
                                border: '1px solid transparent',
                                borderImage: THEME_BORDER,
                            }}
                        >
                            <h3 className="text-xl font-semibold text-white mb-4">Edit Profile</h3>

                            <label className="block mb-3">
                                <span className="text-sm text-white/80">Display Name</span>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-md px-3 py-2 bg-transparent text-white"
                                    style={{
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                />
                                {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                            </label>

                            <label className="block mb-3">
                                <span className="text-sm text-white/80">Email</span>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-md px-3 py-2 bg-transparent text-white"
                                    style={{
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                />
                                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                            </label>

                            <div className="mt-4 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeEdit}
                                    className="px-3 py-2 text-sm rounded-lg text-white/90"
                                    style={{
                                        border: '1px solid transparent',
                                        borderImage: THEME_BORDER,
                                        background: 'transparent',
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm rounded-lg font-semibold text-white"
                                    style={{ backgroundColor: THEME_ACCENT }}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};

// Helper component for repeated stats block
const StatCard = ({ value, label }) => (
    <div
        className="p-3 rounded-lg text-center"
        style={{
            background: 'transparent',
            border: '1px solid transparent',
            borderImage: THEME_BORDER,
        }}
    >
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-white/60 uppercase">{label}</p>
    </div>
);

export default UserProfile;
