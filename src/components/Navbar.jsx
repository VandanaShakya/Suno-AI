import React, { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Help', href: '/help' },
  { name: 'Contact Us', href: '/contact-us' },
];

const linkClasses = "text-white/80 hover:text-white transition duration-300 relative group py-2 px-1";

const NavLink = ({ href, children }) => (
  <a href={href} className={linkClasses}>
    <span className="relative z-10 font-medium text-sm md:text-base">{children}</span>
    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white rounded-full group-hover:w-full transition-all duration-300"></span>
  </a>
);

const Navbar = ({ open, setOpen }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === 'boolean' && typeof setOpen === 'function';
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? setOpen : setInternalOpen;

  // prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-[70] bg-black font-['Inter',_sans-serif]">
      {/* NAV CONTAINER: full width on mobile, constrained on md+ */}
      <nav className="w-full max-w-full md:max-w-[70%] mx-auto px-2 md:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="inline-flex items-center text-xl font-bold text-white tracking-widest">
              MUSIC.AI
            </a>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:space-x-8 md:items-center">
            {NAV_ITEMS.map(item => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a href="/signin" className="px-3 py-1.5 rounded-full text-white/80 hover:bg-neutral-800 transition-colors text-sm">Sign in</a>
            <a
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="block text-center px-4 py-1 rounded-md bg-gradient-to-r from-[#507ADB] to-[#9B49E9] text-white shadow-lg hover:scale-[1.03] transition transform duration-200"
            > 
              Sign up
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:text-white focus:outline-none transition-colors"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'transform rotate-90' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER + OVERLAY */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-60 transition-opacity duration-300 ${isOpen ? 'opacity-60 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Drawer: slides in from the right. full width on small screens, narrower on larger mobile sizes */}
     {isOpen && (
  // BACKDROP - closes sidebar when clicking outside
  <div
    className="fixed inset-0 bg-black/50 z-60"
    onClick={() => setIsOpen(false)}
  />
)}

<aside
  className={`fixed top-0 right-0 z-70 h-full w-1/2 sm:w-[50%] transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    bg-black border-l border-neutral-800 shadow-2xl`}
  role="dialog"
  aria-modal="true"
  onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside sidebar
>
  {/* HEADER */}
  <div className="px-4 py-4 border-b border-neutral-800 relative">
    <a href="/" className="text-lg font-bold text-white">MUSIC.AI</a>

    {/* CLOSE BUTTON - absolute top-right */}
    <button
      onClick={() => setIsOpen(false)}
      aria-label="Close menu"
      className="absolute top-4 right-4 p-2 rounded-md text-white/90 hover:text-white focus:outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  {/* NAV LINKS */}
  <div className="px-3 py-6 overflow-y-auto h-[calc(100%-64px)]">
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(item => (
        <a
          key={item.name}
          href={item.href}
          onClick={() => setIsOpen(false)}
          className="block px-3 py-3 rounded-md text-base font-medium text-white/90 hover:bg-neutral-900 transition-colors"
        >
          {item.name}
        </a>
      ))}
    </nav>

    {/* SIGN IN / SIGN UP */}
    <div className="mt-6 border-t border-neutral-800 pt-4 flex flex-col gap-3">
      <a
        href="/signin"
        onClick={() => setIsOpen(false)}
        className="block text-center px-3 py-3 rounded-md text-base font-medium text-white/80 hover:bg-neutral-900 transition-colors"
      >
        Sign in
      </a>

      <a
        href="/signup"
        onClick={() => setIsOpen(false)}
        className="block text-center px-3 py-3 rounded-md font-bold bg-gradient-to-r from-[#43D9FA] to-[#FA1CD4] text-white shadow-lg hover:scale-[1.03] transition transform duration-200"
      >
        Sign up
      </a>
    </div>
  </div>
</aside>


    </header>
  );
};

export default Navbar;
