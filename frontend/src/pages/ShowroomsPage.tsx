import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  Clock, 
  ArrowRight, 
  Star, 
  Car, 
  Search,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { CITIES_AND_AREAS } from '../data/mockData';

export const ShowroomsPage: React.FC = () => {
  const { showrooms, vehicles, navigateToShowroom, openModal } = useApp();

  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShowrooms = showrooms.filter(s => {
    if (selectedCity !== 'All' && s.city !== selectedCity) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) || s.brandPartners.some(b => b.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20">
      
      {/* Header */}
      <div className="bg-forest text-ivory py-12 px-4 sm:px-6 lg:px-8 border-b border-sage/20 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amberGlow font-semibold">
              Accredited Dealership Network
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-1">
              Authorized Showroom Directory
            </h1>
            <p className="text-sm text-sage-200 mt-2">
              Discover accredited premier dealerships, browse live showroom inventory, and arrange private showroom viewings.
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="bg-forest-light text-xs text-ivory border border-sage/30 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
            >
              <option value="All">All Cities in India</option>
              {Object.keys(CITIES_AND_AREAS).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredShowrooms.map(showroom => {
            const showroomVehicles = vehicles.filter(v => v.showroomId === showroom.id);
            
            return (
              <div
                key={showroom.id}
                className="group bg-white rounded-3xl overflow-hidden border border-beige-dark/60 hover:border-amberGlow/60 hover:shadow-luxury-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Cover Image & Badges */}
                <div className="relative aspect-[16/9] overflow-hidden bg-forest-light">
                  <img 
                    src={showroom.coverImage} 
                    alt={showroom.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Logo Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                    <img 
                      src={showroom.logo} 
                      alt="Logo" 
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md bg-white"
                    />
                    <div className="text-white">
                      <div className="flex items-center space-x-1.5">
                        <h3 className="font-serif text-lg font-bold text-white drop-shadow-sm">{showroom.name}</h3>
                        {showroom.verified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" title="Verified Showroom" />
                        )}
                      </div>
                      <p className="text-xs text-sage-200 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-amberGlow" />
                        <span>{showroom.city}, {showroom.area}</span>
                      </p>
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-md text-ivory text-xs px-3 py-1 rounded-full font-semibold border border-white/20 flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-amberGlow fill-amberGlow" />
                    <span>{showroom.rating} ({showroom.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  
                  <div>
                    <p className="text-xs text-charcoal-soft leading-relaxed line-clamp-2">
                      {showroom.description}
                    </p>

                    {/* Brand Partners */}
                    <div className="mt-4 pt-3 border-t border-beige-dark/40 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] uppercase tracking-wider text-charcoal-muted font-bold mr-1">Marques:</span>
                      {showroom.brandPartners.map(b => (
                        <span key={b} className="text-[11px] px-2.5 py-0.5 rounded-full bg-ivory-dark text-charcoal font-medium border border-beige-dark/50">
                          {b}
                        </span>
                      ))}
                    </div>

                    {/* Showroom Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-beige-dark/40 text-xs text-charcoal-muted">
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-forest" />
                        <span className="text-charcoal font-semibold">{showroomVehicles.length} Listed Vehicles</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-forest" />
                        <span className="truncate">{showroom.businessHours.split(':')[0]}</span>
                      </div>
                      <div className="flex items-center space-x-2 col-span-2">
                        <PhoneCall className="w-4 h-4 text-forest" />
                        <span>{showroom.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-beige-dark/40">
                    <button
                      onClick={() => navigateToShowroom(showroom.id)}
                      className="w-full bg-ivory hover:bg-beige text-charcoal border border-beige-dark font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>Explore Inventory</span>
                      <ArrowRight className="w-3.5 h-3.5 text-sage-700" />
                    </button>

                    <button
                      onClick={() => openModal('contact', undefined, showroom)}
                      className="w-full bg-forest hover:bg-forest-light text-ivory font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors"
                    >
                      Contact Showroom
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

