import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Pricing from "./pages/pricing/Pricing";
import Support from "./pages/Support";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import TermsOfServices from "./pages/TermsOfServices";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loader shown here during initial mount
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        body {
          background-color: #030712;
        }
      `}</style>

      {/* Wrap everything */}
      <div className="relative min-h-screen">

        {/* ---- FULL SCREEN OVERLAY LOADER ---- */}
        {loading && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-10 bg-transparent pointer-events-none">
            <Loader accent="fuchsia" maxScale={4} speed={0.2} />
           </div>
        )}

        {/* Render content only after loader disappears */}
        {!loading && (
          <>
            <Navbar />
            <main className="pt-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Pricing" element={<Pricing />} />
                <Route path="/Support" element={<Support />} />
                <Route path="/Contact-us" element={<ContactUs />} />
                <Route path="/community-guidlines" element={<CommunityGuidelines/>}/>
                <Route path="/terms-of-services" element={<TermsOfServices/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
              </Routes>
            </main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export default App;
