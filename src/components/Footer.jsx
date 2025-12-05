import React from 'react';
import { Mail, ArrowRight, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const companyLinks = [
    { name: 'About', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Help', href: '#' },
    { name: 'Contact Us', href: '#' },
  ];

  const servicesLinks = [
    { name: 'Community Guidelines', href: '/community-guidlines' },
    { name: 'Terms of Service', href: '/terms-of-services' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'FAQs', href: '#' }
  ];

  return (
    <footer className="bg-black text-white font-sans w-full">
      
      {/* 1. Subscription Section */}
      <div className="w-full border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end">
            
            {/* Text */}
            <div className="max-w-xl mb-10 lg:mb-0">
              <h2 className="text-4xl font-semibold mb-4 leading-tight">
                Subscribe for latest updates & insights
              </h2>
              <p className="text-gray-400">
                Pacific hake false trevally queen parrotfish black prickleback
                mosshead warbonnet sweeper! Greenling sleeper.
              </p>
            </div>

            {/* Email Form */}
            <div className="w-full lg:w-96">
              <form className="flex border-b border-gray-500 pb-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="ml-4 p-2 hover:text-gray-400 transition-colors duration-200"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Footer Main Section */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Logo / Social */}
            <div>
              <div className="text-3xl font-bold mb-6 tracking-wider">
                AIGENCY
              </div>
              <div className="flex space-x-6">
                <a href="#"><Facebook className="w-5 h-5 hover:text-gray-400" /></a>
                <a href="#"><Twitter className="w-5 h-5 hover:text-gray-400" /></a>
                <a href="#"><Linkedin className="w-5 h-5 hover:text-gray-400" /></a>
                <a href="#"><Youtube className="w-5 h-5 hover:text-gray-400" /></a>
              </div>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacts</h3>
              <p className="text-gray-300 text-xl font-medium mb-2">1-800 100 97 20</p>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:aigency@mail.co" className="hover:text-gray-400">
                  aigency@mail.co
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {servicesLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-white text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
