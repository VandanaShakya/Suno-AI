import React, { useState   } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import images from '../../assets/images';

// Theme constants
 
const THEME_ACCENT_HOVER = '#9B49E9';
const PAGE_BG = '#131B27';

export default function SignIn({ onSubmit }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(null);

 
  const validate = () => {
    const e = {};
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
      await new Promise(res => setTimeout(res, 800));
      setSuccess('Signed in successfully');
      setForm({ email: '', password: '' });
      setErrors({});
      if (onSubmit) onSubmit({ email: form.email, password: form.password });
    } catch {
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

            {success && (
              <p className="text-sm text-emerald-400 mb-2">{success}</p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-2 rounded-lg font-semibold text-white transition transform bg-gradient-to-r from-[#507ADB] to-[#9B49E9] hover:cursor-pointer"
              onMouseOver={e =>
                (e.currentTarget.style.backgroundColor = THEME_ACCENT_HOVER)
              }
              onMouseOut={e =>
                (e.currentTarget.style.backgroundColor = THEME_ACCENT)
              }
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

            <div className="text-center text-white/70 text-sm mt-4">
              Don't have an account?{' '}
              <button className="underline text-white/90">Sign up</button>
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
