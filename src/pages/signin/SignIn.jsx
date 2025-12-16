import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/api/authApi';
import images from '../../assets/images';

// Theme constants
 
const THEME_ACCENT_HOVER = '#9B49E9';
const PAGE_BG = '#131B27';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading: loading }] = useLoginMutation();

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email required';
    if (!form.password) e.password = 'Password required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    try {
      await login({
        email: form.email.trim(),
        password: form.password,
      }).unwrap();

      // Redirect to home page (credentials are set by the login mutation)
      navigate('/');
    } catch (err) {
      if (err.data?.error) {
        const errorMessage = err.data.error.message || 'Invalid email or password.';
        setErrors({ submit: errorMessage });
      } else if (err.status === 'FETCH_ERROR') {
        setErrors({ submit: 'Network error. Please check your connection.' });
      } else {
        setErrors({ submit: 'Invalid email or password.' });
      }
    }
  };



  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative"
      style={{ backgroundColor: PAGE_BG }}
    >

      {/* ⬇️ FULL BACKGROUND IMAGE BEHIND EVERYTHING */}
      <img
        src={images.signUp}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.35)', zIndex: 0 }}
      />

      <div className="w-full max-w-md relative z-10">

        {/* Card */}
        <div
          className="rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:scale-105 transition transform"
          style={{
            border: '1px solid #d1d5db',
            background: 'rgba(10, 1, 24, 0.72)'
          }}
        >

          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
            <p className="text-sm text-white/70 mt-1">
              Use your email and password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* EMAIL INPUT */}
            <label className="block mb-4">
              <span className="text-sm text-white/80">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-md px-3 py-2 bg-transparent text-white"
                style={{ border: '1px solid #d1d5db' }}   
                aria-invalid={!!errors.email}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
              )}
            </label>

            {/* PASSWORD INPUT */}
            <label className="block mb-4 relative">
              <span className="text-sm text-white/80">Password</span>

              <div className="mt-1 relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-md px-3 py-2 pr-10 bg-transparent text-white"
                  style={{ border: '1px solid #d1d5db' }}  
                  aria-invalid={!!errors.password}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  onMouseDown={e => e.preventDefault()}
                  className="absolute inset-y-0 right-2 flex items-center justify-center p-2"
                >
                  <span className="text-white/80">
                    {showPassword ? <EyeOff size={18} className='text-black'/> : <Eye size={18} className='text-black'/>}
                  </span>
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-rose-400 mt-1">{errors.password}</p>
              )}
            </label>

            {errors.submit && (
              <p className="text-sm text-rose-400 mb-2">{errors.submit}</p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-2 rounded-lg font-semibold text-white transition transform bg-gradient-to-r from-[#507ADB] to-[#9B49E9] hover:cursor-pointer"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

            <div className="text-center text-white/70 text-sm mt-4">
              Don't have an account?{' '}
              <a href="/signup" className="underline text-white/90">Sign up</a>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-white/50 mt-3">
          By signing in you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}
