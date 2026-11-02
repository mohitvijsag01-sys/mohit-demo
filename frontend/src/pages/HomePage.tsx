import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { POPULAR_BRANDS, CITIES_AND_AREAS } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  Car, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  Compass, 
  CheckCircle, 
  Award,
  CalendarCheck,
  Building2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    vehicles, 
    setCurrentPage, 
    navigateToBrand, 
    navigateToVehicle,
    selectedCity,
    setSelectedCity,
    selectedArea,
    setSelectedArea,
    openModal 
  } = useApp();

  // Search Panel State
  const [searchCity, setSearchCity] = useState(selectedCity === 'All Cities' ? 'Mumbai' : selectedCity);
  const [searchArea, setSearchArea] = useState('All Areas');
  const [searchBrand, setSearchBrand] = useState('All Brands');
  const [searchModel, setSearchModel] = useState('');
  const [searchBudget, setSearchBudget] = useState('Any Budget');

  const availableAreas = searchCity !== 'All Cities' && CITIES_AND_AREAS[searchCity] 
    ? ['All Areas', ...CITIES_AND_AREAS[searchCity]] 
    : ['All Areas'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCity(searchCity);
    setSelectedArea(searchArea);
    setCurrentPage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickFilter = (category: string) => {
    if (category === 'Luxury Cars') {
      setCurrentPage('explore');
    } else {
      setCurrentPage('explore');
    }
  };

  const featuredCars = vehicles.filter(v => v.isFeatured).slice(0, 8);

  return (
    <div className="min-h-screen bg-ivory">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] bg-forest flex flex-col justify-between pt-28 pb-16 overflow-hidden text-ivory">
        
        {/* Background Visual & Ambient Lighting */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85" 
            alt="Luxury Automobile Architectural Setting" 
            className="w-full h-full object-cover object-center opacity-35 mix-blend-luminosity scale-105"
          />
          {/* Deep Forest Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-forest/60" />
          {/* Warm Amber Glow Radial highlights */}
          <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-amberGlow/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-sage/15 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Hero Editorial Header Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10 sm:pt-16">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest-light/80 border border-sage/30 text-amberGlow text-xs tracking-widest uppercase font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Showroom Marketplace</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ivory leading-[1.08]">
              FIND YOUR DRIVE. <br />
              <span className="text-amberGlow font-normal italic font-serif">DISCOVER YOUR</span> DESTINATION.
            </h1>

            <p className="text-base sm:text-xl text-sage-200 font-light leading-relaxed max-w-2xl">
              Explore exceptional vehicles from trusted showrooms, all in one premium automotive marketplace.
            </p>

          </div>
        </div>

        {/* Sophisticated Vehicle Search Panel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
          
          <div className="bg-forest-dark/90 backdrop-blur-xl border border-sage/30 rounded-3xl p-4 sm:p-6 shadow-luxury-lg">
            
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
              
              {/* 1. Select City */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sage-300 font-semibold mb-1.5">
                  1. City
                </label>
                <div className="relative">
                  <select
                    value={searchCity}
                    onChange={(e) => {
                      setSearchCity(e.target.value);
                      setSearchArea('All Areas');
                    }}
                    className="w-full bg-forest-light border border-sage/40 rounded-xl px-3 py-2.5 text-xs text-ivory focus:outline-none focus:border-amberGlow"
                  >
                    <option value="All Cities">All Cities</option>
                    {Object.keys(CITIES_AND_AREAS).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 2. Select Area */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sage-300 font-semibold mb-1.5">
                  2. Area / Neighborhood
                </label>
                <select
                  value={searchArea}
                  onChange={(e) => setSearchArea(e.target.value)}
                  className="w-full bg-forest-light border border-sage/40 rounded-xl px-3 py-2.5 text-xs text-ivory focus:outline-none focus:border-amberGlow"
                >
                  {availableAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {/* 3. Select Brand */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sage-300 font-semibold mb-1.5">
                  3. Brand
                </label>
                <select
                  value={searchBrand}
                  onChange={(e) => setSearchBrand(e.target.value)}
                  className="w-full bg-forest-light border border-sage/40 rounded-xl px-3 py-2.5 text-xs text-ivory focus:outline-none focus:border-amberGlow"
                >
                  <option value="All Brands">All Brands</option>
                  {POPULAR_BRANDS.map(b => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* 4. Select Model */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sage-300 font-semibold mb-1.5">
                  4. Model / Variant
                </label>
                <input
                  type="text"
                  placeholder="e.g. GLC, X5, Harrier"
                  value={searchModel}
                  onChange={(e) => setSearchModel(e.target.value)}
                  className="w-full bg-forest-light border border-sage/40 rounded-xl px-3 py-2.5 text-xs text-ivory placeholder-sage-400 focus:outline-none focus:border-amberGlow"
                />
              </div>

              {/* 5. Select Budget */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sage-300 font-semibold mb-1.5">
                  5. Budget
                </label>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full bg-forest-light border border-sage/40 rounded-xl px-3 py-2.5 text-xs text-ivory focus:outline-none focus:border-amberGlow"
                >
                  <option value="Any Budget">Any Budget</option>
                  <option value="under-30">Under ₹30 Lakh</option>
                  <option value="30-70">₹30 Lakh - ₹70 Lakh</option>
                  <option value="70-120">₹70 Lakh - ₹1.2 Cr</option>
                  <option value="above-120">Above ₹1.2 Cr</option>
                </select>
              </div>

              {/* 6. Search Cars Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-amberGlow hover:bg-amberGlow-hover text-charcoal font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-amber-glow flex items-center justify-center space-x-2 h-[42px]"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Cars</span>
                </button>
              </div>

            </form>

            {/* Quick Filter Badges */}
            <div className="mt-4 pt-4 border-t border-sage/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sage-400 uppercase tracking-wider text-[10px] font-semibold">Quick Filters:</span>
                {['New Cars', 'Used Cars', 'Luxury Cars', 'SUVs', 'Sedans'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleQuickFilter(filter)}
                    className="px-3 py-1 rounded-full bg-forest-light/60 hover:bg-amberGlow hover:text-charcoal border border-sage/30 text-sage-200 text-xs font-medium transition-all"
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="text-sage-300 italic text-xs">
                "Your next car is closer than you think."
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 2. POPULAR BRANDS SECTION */}
      <section className="py-20 bg-ivory border-b border-beige-dark/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-sage-700 font-semibold">
                Accredited Marques
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-1">
                Explore by Prestigious Brands
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('brands')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-forest hover:text-amberGlow transition-colors"
            >
              <span>View All Brands</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Clean Cream-Colored Brand Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {POPULAR_BRANDS.map((b) => (
              <div
                key={b.name}
                onClick={() => navigateToBrand(b.name)}
                className="group bg-white hover:bg-beige-light p-5 rounded-2xl border border-beige-dark/60 hover:border-amberGlow transition-all duration-300 cursor-pointer shadow-sm hover:shadow-luxury text-center flex flex-col items-center justify-between"
              >
                <div className="h-14 flex items-center justify-center mb-3">
                  <span className="font-serif font-bold text-lg text-charcoal group-hover:text-forest transition-colors">
                    {b.name}
                  </span>
                </div>
                <div className="w-full pt-3 border-t border-beige-dark/40 flex items-center justify-between text-xs text-charcoal-muted">
                  <span className="text-[11px] font-medium">{b.count} Models</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amberGlow group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FEATURED VEHICLES SECTION */}
      <section className="py-24 bg-beige-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-sage-700 font-semibold">
                Curated Luxury Inventory
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-1">
                Featured Showroom Showcases
              </h2>
              <p className="text-sm text-charcoal-soft mt-2">
                Inspected, verified, and available for immediate viewing and delivery.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('explore')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-forest text-ivory hover:bg-forest-light text-xs uppercase tracking-wider font-semibold transition-colors shadow-sm"
            >
              <span>Explore Complete Catalog ({vehicles.length})</span>
              <ArrowRight className="w-3.5 h-3.5 text-amberGlow" />
            </button>
          </div>

          {/* 4 Columns Large, 2 Tablet, 1 Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. THE SAR CAR DISTINCTION (EDITORIAL VALUE PROPOSITION) */}
      <section className="py-24 bg-forest text-ivory relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-amberGlow/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-amberGlow font-semibold">
              The SAR CAR Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold mt-2 leading-tight">
              An Elevated Way to Acquire Exceptional Automobiles.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-forest-light/60 p-8 rounded-3xl border border-sage/20 relative">
              <div className="w-12 h-12 rounded-2xl bg-amberGlow/20 border border-amberGlow/50 flex items-center justify-center text-amberGlow mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">150-Point Dealership Audit</h3>
              <p className="text-sage-200 text-xs sm:text-sm leading-relaxed">
                Every vehicle listed by our showroom partners undergoes comprehensive structural, mechanical, electrical, and title background verification.
              </p>
            </div>

            <div className="bg-forest-light/60 p-8 rounded-3xl border border-sage/20 relative">
              <div className="w-12 h-12 rounded-2xl bg-amberGlow/20 border border-amberGlow/50 flex items-center justify-center text-amberGlow mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Direct Dealer Negotiation</h3>
              <p className="text-sage-200 text-xs sm:text-sm leading-relaxed">
                No middleman broker markup. Connect directly with licensed showroom principals, negotiate on-road terms, and explore factory lease options.
              </p>
            </div>

            <div className="bg-forest-light/60 p-8 rounded-3xl border border-sage/20 relative">
              <div className="w-12 h-12 rounded-2xl bg-amberGlow/20 border border-amberGlow/50 flex items-center justify-center text-amberGlow mb-6">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Private Doorstep Test Drives</h3>
              <p className="text-sage-200 text-xs sm:text-sm leading-relaxed">
                Experience your prospective vehicle in your everyday environment. Book customized viewing sessions at the dealership or at your residence.
              </p>
            </div>

          </div>

          {/* Testimonial Banner */}
          <div className="mt-16 bg-forest-dark p-8 sm:p-12 rounded-3xl border border-sage/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <p className="font-serif italic text-xl sm:text-2xl text-ivory">
                "SAR CAR transformed the acquisition of our Range Rover into an effortless, transparent salon experience."
              </p>
              <p className="text-xs text-amberGlow uppercase tracking-widest font-semibold">
                — Aditya Singhania, Managing Director, Apex Capital
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('explore')}
              className="bg-amberGlow hover:bg-amberGlow-hover text-charcoal font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-amber-glow shrink-0"
            >
              Discover All Vehicles
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

