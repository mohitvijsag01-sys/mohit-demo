import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  Heart, 
  SlidersHorizontal, 
  MapPin, 
  User as UserIcon, 
  PlusCircle, 
  ChevronDown, 
  ShieldCheck, 
  Building2, 
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import { CITIES_AND_AREAS } from '../data/mockData';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    wishlist, 
    comparisonList, 
    selectedCity, 
    setSelectedCity, 
    selectedArea, 
    setSelectedArea,
    currentUser, 
    switchUserRole,
    openModal 
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cities = ['All Cities', ...Object.keys(CITIES_AND_AREAS)];

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore Cars' },
    { id: 'brands', label: 'Brands' },
    { id: 'compare', label: 'Compare', badge: comparisonList.length > 0 ? comparisonList.length : undefined },
    { id: 'showrooms', label: 'Showrooms' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-forest/95 backdrop-blur-md shadow-luxury py-3 border-b border-sage/20 text-ivory' 
            : currentPage === 'home'
              ? 'bg-gradient-to-b from-forest/90 via-forest/60 to-transparent py-5 text-ivory'
              : 'bg-forest py-4 border-b border-sage/20 text-ivory'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LEFT: SAR CAR Logo */}
            <div 
              onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full border border-amberGlow/60 flex items-center justify-center bg-forest-light group-hover:border-amberGlow transition-colors duration-300 shadow-sm">
                {/* Automotive Emblem SVG */}
                <svg className="w-6 h-6 text-amberGlow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l2-5h14l2 5M5 13v6a1 1 0 001 1h1m10-7v6a1 1 0 001 1h1M7 17h.01M17 17h.01M5 13h14" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v4m-3-2h6" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-2xl font-bold text-ivory group-hover:text-amberGlow transition-colors leading-none">
                  SAR CAR
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-sage-300 font-medium mt-1">
                  Automotive Marketplace
                </span>
              </div>
            </div>

            {/* CENTER: Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    currentPage === link.id 
                      ? 'text-amberGlow font-semibold' 
                      : 'text-ivory/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-amberGlow text-charcoal font-bold rounded-full">
                      {link.badge}
                    </span>
                  )}
                  {currentPage === link.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amberGlow rounded-full animate-fade-in" />
                  )}
                </button>
              ))}
            </div>

            {/* RIGHT: Location, Wishlist, Account Switcher, List Car CTA */}
            <div className="hidden md:flex items-center space-x-4">
              
              {/* Location Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setLocationDropdownOpen(!locationDropdownOpen); setUserDropdownOpen(false); }}
                  className="flex items-center space-x-1.5 text-xs text-ivory/80 hover:text-white bg-forest-light/60 hover:bg-forest-light px-3 py-1.5 rounded-full border border-sage/30 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-amberGlow" />
                  <span className="max-w-[120px] truncate">{selectedCity}</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {locationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-forest-dark border border-sage/30 rounded-xl shadow-luxury-lg py-3 px-3 z-50 text-ivory animate-fade-in">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-sage-300 mb-2 px-2">
                      Select Region
                    </p>
                    <div className="max-h-56 overflow-y-auto space-y-1">
                      {cities.map((city) => (
                        <div key={city}>
                          <button
                            onClick={() => {
                              setSelectedCity(city);
                              setSelectedArea('All Areas');
                              setLocationDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                              selectedCity === city 
                                ? 'bg-amberGlow text-charcoal font-semibold' 
                                : 'hover:bg-forest-light text-ivory/90'
                            }`}
                          >
                            <span>{city}</span>
                            {selectedCity === city && <ShieldCheck className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setCurrentPage('customer-dashboard')}
                title="Wishlist & Saved Vehicles"
                className="relative p-2 text-ivory/80 hover:text-white hover:bg-forest-light/60 rounded-full transition-colors"
              >
                <Heart className="w-5 h-5 text-amberGlow" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amberGlow text-charcoal font-bold text-[10px] flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* User Role Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setUserDropdownOpen(!userDropdownOpen); setLocationDropdownOpen(false); }}
                  className="flex items-center space-x-2 text-xs bg-forest-light/60 hover:bg-forest-light px-3 py-1.5 rounded-full border border-sage/30 text-ivory transition-colors"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-5 h-5 rounded-full object-cover border border-amberGlow"
                  />
                  <span className="font-medium hidden xl:inline max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sage/20 text-amberGlow uppercase font-semibold">
                    {currentUser.role}
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-forest-dark border border-sage/30 rounded-xl shadow-luxury-lg py-2 z-50 text-ivory animate-fade-in">
                    <div className="px-4 py-2 border-b border-sage/20">
                      <p className="text-xs font-semibold text-ivory">{currentUser.name}</p>
                      <p className="text-[11px] text-sage-300 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-2 px-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-sage-400 px-2 mb-1">
                        Switch View / Portals
                      </p>
                      <button
                        onClick={() => {
                          switchUserRole('customer');
                          setCurrentPage('customer-dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center space-x-2.5 ${
                          currentUser.role === 'customer' ? 'bg-amberGlow text-charcoal font-semibold' : 'hover:bg-forest-light text-ivory/90'
                        }`}
                      >
                        <UserIcon className="w-4 h-4" />
                        <div>
                          <p>Customer Dashboard</p>
                          <p className="text-[10px] opacity-75">Saved cars, bookings & history</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          switchUserRole('showroom');
                          setCurrentPage('dealer-dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center space-x-2.5 mt-1 ${
                          currentUser.role === 'showroom' ? 'bg-amberGlow text-charcoal font-semibold' : 'hover:bg-forest-light text-ivory/90'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        <div>
                          <p>Showroom Dealer Portal</p>
                          <p className="text-[10px] opacity-75">Manage inventory & inquiries</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          switchUserRole('admin');
                          setCurrentPage('admin-dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center space-x-2.5 mt-1 ${
                          currentUser.role === 'admin' ? 'bg-amberGlow text-charcoal font-semibold' : 'hover:bg-forest-light text-ivory/90'
                        }`}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <div>
                          <p>Admin Portal</p>
                          <p className="text-[10px] opacity-75">Marketplace analytics & verification</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Amber "List Your Car" CTA */}
              <button
                onClick={() => openModal('listCar')}
                className="bg-amberGlow hover:bg-amberGlow-hover text-charcoal font-semibold px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 shadow-amber-glow flex items-center space-x-1.5 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>List Your Car</span>
              </button>

            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={() => openModal('listCar')}
                className="bg-amberGlow text-charcoal font-semibold px-3 py-1.5 rounded-full text-xs"
              >
                List Car
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-ivory hover:text-amberGlow"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-forest-dark border-b border-sage/20 px-4 pt-3 pb-6 animate-fade-in">
            <div className="space-y-2 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
                    currentPage === link.id ? 'bg-amberGlow text-charcoal font-semibold' : 'text-ivory hover:bg-forest-light'
                  }`}
                >
                  {link.label} {link.badge && `(${link.badge})`}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-sage/20 space-y-2">
              <div className="flex justify-between items-center text-xs text-sage-300 px-2">
                <span>Select Dashboard View:</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => { switchUserRole('customer'); setCurrentPage('customer-dashboard'); setMobileMenuOpen(false); }}
                  className="px-2 py-1.5 text-[11px] bg-forest-light rounded text-center text-ivory hover:text-amberGlow"
                >
                  Customer
                </button>
                <button
                  onClick={() => { switchUserRole('showroom'); setCurrentPage('dealer-dashboard'); setMobileMenuOpen(false); }}
                  className="px-2 py-1.5 text-[11px] bg-forest-light rounded text-center text-ivory hover:text-amberGlow"
                >
                  Showroom
                </button>
                <button
                  onClick={() => { switchUserRole('admin'); setCurrentPage('admin-dashboard'); setMobileMenuOpen(false); }}
                  className="px-2 py-1.5 text-[11px] bg-forest-light rounded text-center text-ivory hover:text-amberGlow"
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

