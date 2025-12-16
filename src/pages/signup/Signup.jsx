import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation, useLoginMutation } from '../../services/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import images from '../../assets/images';

// Theme constants
const THEME_ACCENT = '#507ADB';
const THEME_ACCENT_HOVER = '#9B49E9';
const PAGE_BG = '#131B27';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const loading = isRegistering || isLoggingIn;
  
    


  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.trim()) e.email = 'Email required';
    if (!form.password) e.password = 'Password required';
    if (form.password && form.password.length < 8) {
      e.password = 'Password must be at least 8 characters';
    }
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
      // Register the user
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      }).unwrap();

      // Automatically log in after successful registration
      const loginResult = await login({
        email: form.email.trim(),
        password: form.password,
      }).unwrap();

      // Set credentials in Redux store (login mutation already does this, but ensure it's set)
      dispatch(
        setCredentials({
          user: {
            name: form.name.trim(),
            email: form.email.trim(),
          },
          accessToken: loginResult.accessToken,
          refreshToken: loginResult.refreshToken,
        })
      );

      // Redirect to home page
      navigate('/');
    } catch (err) {
      if (err.data?.error) {
        const errorMessage = err.data.error.message || 'Something went wrong. Try again.';
        setErrors({ submit: errorMessage });
      } else if (err.status === 'FETCH_ERROR') {
        setErrors({ submit: 'Network error. Please check your connection.' });
      } else {
        setErrors({ submit: 'Something went wrong. Try again.' });
      }
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

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-2 rounded-lg font-semibold text-white transition transform"
              style={{ background: `linear-gradient(90deg, ${THEME_ACCENT} 0%, ${THEME_ACCENT_HOVER} 100%)` }}
            >
              {loading ? 'Creating…' : 'Sign up'}
            </button>

            <div className="text-center text-white/70 text-sm mt-4">
              Already have an account? <a href="/signin" className="underline text-white/90">Sign in</a>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-white/50 mt-3">By signing up you agree to our Terms of Service.</p>
      </div>
    </div>
  );
}
