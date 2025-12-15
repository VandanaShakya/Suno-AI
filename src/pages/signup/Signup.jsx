import React, { useState, useEffect } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import images from '../../assets/images';

// Theme constants
const THEME_ACCENT = '#507ADB';
const THEME_ACCENT_HOVER = '#9B49E9';
const PAGE_BG = '#131B27';

export default function Signup({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(null);
  
    


  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Name required';
    if (!form.email) e.email = 'Email required';
    if (!form.password) e.password = 'Password required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    if (!validate()) return;

    setLoading(true);
    try {
      // Replace with real API call
      await new Promise(res => setTimeout(res, 800));
      setSuccess('Account created successfully');
      const payload = { name: form.name, email: form.email, password: form.password };
      setForm({ name: '', email: '', password: '' });
      setErrors({});
      if (onSubmit) onSubmit(payload);
    } catch (err) {
      setErrors({ submit: 'Something went wrong. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative"
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* Full background image */}
      <img
        src={images.signUp}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.35)', zIndex: 0 }}
      />

      <div className="w-full max-w-md relative z-10">
        <div
          className="rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition transform"
          style={{ border: '1px solid #d1d5db', background: 'rgba(10, 1, 24, 0.72)' }}
        >

          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Create your account</h2>
            <p className="text-sm text-white/70 mt-1">Sign up to start generating music with AI</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* NAME INPUT */}
            <label className="block mb-4">
              <span className="text-sm text-white/80">Name</span>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder='Enter your name'
                className="mt-1 w-full rounded-md px-3 py-2 bg-transparent text-white"
                style={{ border: '1px solid #d1d5db' }}
                aria-invalid={!!errors.name}
                autoComplete="name"
              />
              {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
            </label>

            {/* EMAIL INPUT */}
            <label className="block mb-4">
              <span className="text-sm text-white/80">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                placeholder='Enter your email'
                onChange={handleChange}
                className="mt-1 w-full rounded-md px-3 py-2 bg-transparent text-white"
                style={{ border: '1px solid #d1d5db' }}
                aria-invalid={!!errors.email}
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
            </label>

            {/* PASSWORD INPUT */}
            <label className="block mb-4 relative">
              <span className="text-sm text-white/80">Password</span>
              <div className="mt-1 relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  placeholder='Enter your password'
                  onChange={handleChange}
                  className="w-full rounded-md px-3 py-2 pr-10 bg-transparent text-white"
                  style={{ border: '1px solid #d1d5db' }}
                  aria-invalid={!!errors.password}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  onMouseDown={e => e.preventDefault()}
                  className="absolute inset-y-0 right-2 flex items-center justify-center p-2"
                >
                  <span className="text-white/80">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</span>
                </button>
              </div>

              {errors.password && <p className="text-xs text-rose-400 mt-1">{errors.password}</p>}
            </label>

            {errors.submit && <p className="text-sm text-rose-400 mb-2">{errors.submit}</p>}
            {success && <p className="text-sm text-emerald-400 mb-2">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-2 rounded-lg font-semibold text-white transition transform"
              style={{ background: `linear-gradient(90deg, ${THEME_ACCENT} 0%, ${THEME_ACCENT_HOVER} 100%)` }}
            >
              {loading ? 'Creating…' : 'Sign up'}
            </button>

            <div className="text-center text-white/70 text-sm mt-4">
              Already have an account? <button type="button" className="underline text-white/90">Sign in</button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-white/50 mt-3">By signing up you agree to our Terms of Service.</p>
      </div>
    </div>
  );
}
