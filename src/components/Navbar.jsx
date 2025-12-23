import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Create", path: "/create" },
  { name: "Pricing", path: "/pricing" },
  { name: "Help", path: "/help" },
  { name: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setAvatarMenuOpen(false);
    setIsOpen(false);
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name[0].toUpperCase();
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full h-20 bg-black z-[70]">
        <nav className="h-full w-full xl:max-w-[70%] mx-auto px-4 flex items-center">
          <div className="flex items-center justify-between w-full">

            {/* LOGO */}
            <Link to="/" className="text-xl font-bold text-white tracking-widest">
              MUSIC.AI
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden xl:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative group py-2 px-1 text-sm md:text-base transition duration-300
                     ${
                       isActive
                         ? "text-white"
                         : "text-white/70 hover:text-white"
                     }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="font-medium">{item.name}</span>
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] rounded-full transition-all duration-300
                        ${
                          isActive
                            ? "w-full bg-gradient-to-r from-[#507ADB] to-[#9B49E9]"
                            : "w-0 bg-white group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
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
                      <div className="absolute right-0 mt-3 w-48 bg-black border border-neutral-800 rounded-lg">
                        <Link
                          to="/user-profile"
                          className="block px-4 py-2 text-white/80 hover:bg-neutral-900"
                          onClick={() => setAvatarMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/my-album"
                          className="block px-4 py-2 text-white/80 hover:bg-neutral-900"
                          onClick={() => setAvatarMenuOpen(false)}
                        >
                          My Album
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

            {/* HAMBURGER */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white"
              >
                ☰
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* ================= OVERLAY ================= */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity z-[60]
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        className={`fixed top-0 right-0 h-full w-1/2 sm:w-[50%] bg-black
        border-l border-neutral-800 transform transition-transform duration-300 z-[80]
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav className="p-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-3 py-3 rounded-md transition
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#507ADB]/20 to-[#9B49E9]/20 text-white"
                    : "text-white hover:bg-neutral-900"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
