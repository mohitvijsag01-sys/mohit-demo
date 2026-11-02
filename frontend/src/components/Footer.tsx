import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, PhoneCall, Mail, MapPin, Instagram, Facebook, Youtube, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, navigateToBrand, openModal } = useApp();

  const luxuryBrands = [
    'Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Toyota'
  ];

  return (
    <footer className="bg-forest-deep text-ivory border-t border-sage/20 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amberGlow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-sage/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* Brand Banner with Tagline */}
        <div className="pb-12 border-b border-sage/20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full border border-amberGlow/60 flex items-center justify-center bg-forest-light">
                <svg className="w-6 h-6 text-amberGlow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l2-5h14l2 5M5 13v6a1 1 0 001 1h1m10-7v6a1 1 0 001 1h1M7 17h.01M17 17h.01M5 13h14" />
                </svg>
              </div>
              <span className="font-serif tracking-widest text-3xl font-bold text-ivory">
                SAR CAR
              </span>
            </div>
            <p className="font-serif italic text-xl sm:text-2xl text-amberGlow font-light">
              "More Than A Car. It's Your Next Chapter."
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => openModal('listCar')}
              className="bg-amberGlow hover:bg-amberGlow-hover text-charcoal font-semibold px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all duration-300 shadow-amber-glow flex items-center space-x-2"
            >
              <span>List Your Showroom Inventory</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Multi-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-12 border-b border-sage/20 text-sm">
          
          {/* Col 1: About SAR CAR */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg font-semibold text-ivory">About SAR CAR</h4>
            <p className="text-sage-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              SAR CAR is India’s foremost curated luxury automotive digital marketplace. Connecting high-discerning clientele directly to accredited premier dealerships, verified inventories, private showings, and bespoke acquisition experiences.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-forest-light border border-sage/30 flex items-center justify-center text-ivory hover:text-amberGlow hover:border-amberGlow transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-forest-light border border-sage/30 flex items-center justify-center text-ivory hover:text-amberGlow hover:border-amberGlow transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-forest-light border border-sage/30 flex items-center justify-center text-ivory hover:text-amberGlow hover:border-amberGlow transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-ivory">Explore Platform</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-sage-300">
              <li>
                <button onClick={() => setCurrentPage('explore')} className="hover:text-amberGlow transition-colors">
                  Explore All Cars
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('showrooms')} className="hover:text-amberGlow transition-colors">
                  Find Showrooms
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('compare')} className="hover:text-amberGlow transition-colors">
                  Vehicle Comparison
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('brands')} className="hover:text-amberGlow transition-colors">
                  Automotive Marque Directory
                </button>
              </li>
              <li>
                <button onClick={() => openModal('listCar')} className="hover:text-amberGlow transition-colors">
                  List Your Car
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Luxury Brands */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-ivory">Featured Brands</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-sage-300">
              {luxuryBrands.map(brand => (
                <li key={brand}>
                  <button 
                    onClick={() => navigateToBrand(brand)} 
                    className="hover:text-amberGlow transition-colors"
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Trust & Concierge */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-ivory">Private Concierge</h4>
            <div className="space-y-2 text-xs sm:text-sm text-sage-300">
              <div className="flex items-start space-x-2">
                <PhoneCall className="w-4 h-4 text-amberGlow shrink-0 mt-0.5" />
                <span>+91 1800 209 8899 (Toll Free)</span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-amberGlow shrink-0 mt-0.5" />
                <span>concierge@sarcar.luxury</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amberGlow shrink-0 mt-0.5" />
                <span>Level 14, Capital Towers, New Delhi & Mumbai</span>
              </div>
              <div className="pt-2 flex items-center space-x-1.5 text-amberGlow text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>150-Point Inspection Guaranteed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-sage-400 gap-4">
          <p>© {new Date().getFullYear()} SAR CAR Automotive Private Limited. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-ivory cursor-pointer">Privacy Policy</span>
            <span className="hover:text-ivory cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-ivory cursor-pointer">Showroom Code of Conduct</span>
            <span className="hover:text-ivory cursor-pointer">Security Safeguards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

