import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'create', href: '/create' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Help', href: '/help' },
  { name: 'Contact Us', href: '/contact-us' },
];

const linkClasses =
  'text-white/80 hover:text-white transition duration-300 relative group py-2 px-1';

const NavLink = ({ href, children }) => (
  <a href={href} className={linkClasses}>
    <span className="relative z-10 font-medium text-sm md:text-base">
      {children}
    </span>
    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white rounded-full group-hover:w-full transition-all duration-300" />
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setAvatarMenuOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name[0].toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[70] bg-black">
      <nav className="w-full xl:max-w-[70%] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <a href="/" className="text-xl font-bold text-white tracking-widest">
            MUSIC.AI
          </a>

          {/* DESKTOP MENU (≥1280px ONLY) */}
          <div className="hidden xl:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* DESKTOP AUTH */}
          <div className="hidden xl:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#507ADB] to-[#9B49E9] text-white font-semibold"
                >
                  {getInitials(user?.name)}
                </button>

                {avatarMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setAvatarMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-black border border-neutral-800 rounded-lg">
                      <Link
                        to="/user-profile"
                        className="block px-4 py-2 text-white/80 hover:bg-neutral-900"
                        onClick={() => setAvatarMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-white/80 hover:bg-neutral-900"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="px-3 py-1.5 rounded-full border text-white/80"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#507ADB] to-[#9B49E9] text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* HAMBURGER (≤1024px incl iPad Pro) */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white"
            >
              <svg
                className={`h-6 w-6 transition-transform ${
                  isOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed top-0 right-0 h-full w-1/2 sm:w-[50%] bg-black border-l border-neutral-800 transform transition-transform duration-300 z-[80]
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b border-neutral-800 flex justify-between">
          <span className="text-white font-bold">MUSIC.AI</span>
          <button onClick={() => setIsOpen(false)} className="text-white">
            ✕
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="px-3 py-3 rounded-md text-white hover:bg-neutral-900"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </aside>
    </header>
  );
};

export default Navbar;
