import React from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  Star, 
  ArrowLeft, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export const ShowroomDetailPage: React.FC = () => {
  const { showrooms, selectedShowroomId, vehicles, setCurrentPage, openModal } = useApp();

  const showroom = showrooms.find(s => s.id === selectedShowroomId) || showrooms[0];
  const showroomVehicles = vehicles.filter(v => v.showroomId === showroom.id);

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20">
      
      {/* Showroom Cover Hero */}
      <div className="relative h-72 sm:h-96 bg-forest overflow-hidden">
        <img 
          src={showroom.coverImage} 
          alt={showroom.name} 
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-between py-6">
          <button
            onClick={() => setCurrentPage('showrooms')}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-sage-200 hover:text-white transition-colors self-start bg-forest-dark/80 px-3.5 py-1.5 rounded-full backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Showroom Directory</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-ivory">
            <div className="flex items-center space-x-4">
              <img 
                src={showroom.logo} 
                alt="Logo" 
                className="w-20 h-20 rounded-3xl object-cover border-2 border-white shadow-xl bg-white"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-serif text-2xl sm:text-4xl font-bold">{showroom.name}</h1>
                  {showroom.verified && (
                    <ShieldCheck className="w-5 h-5 text-emerald-400" title="Verified Showroom" />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-sage-200 flex items-center space-x-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-amberGlow" />
                  <span>{showroom.address}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => openModal('contact', undefined, showroom)}
                className="bg-amberGlow hover:bg-amberGlow-hover text-charcoal font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-amber-glow"
              >
                Inquire / Callback
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Showroom Details Strip */}
      <div className="bg-white border-b border-beige-dark/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-charcoal">
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5">
              <Star className="w-4 h-4 text-amberGlow fill-amberGlow" />
              <span className="font-bold text-sm">{showroom.rating}</span>
              <span className="text-charcoal-muted">({showroom.reviewCount} verified ratings)</span>
            </div>
            <div className="flex items-center space-x-1.5 text-charcoal-muted">
              <Clock className="w-4 h-4 text-sage-600" />
              <span>{showroom.businessHours}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-charcoal-muted hidden md:flex">
              <PhoneCall className="w-4 h-4 text-sage-600" />
              <span>{showroom.phone}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-charcoal-muted">Accredited Marque Specialist:</span>
            {showroom.brandPartners.map(b => (
              <span key={b} className="font-semibold bg-ivory px-2 py-0.5 rounded border border-beige-dark">
                {b}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Showroom Inventory Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-sage-700 font-semibold">
              Available Dealership Units
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal mt-1">
              Current Showroom Inventory ({showroomVehicles.length})
            </h2>
            <p className="text-xs text-charcoal-soft mt-1">
              All vehicles on premises and available for private inspection at {showroom.area}.
            </p>
          </div>
        </div>

        {showroomVehicles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-beige-dark/60">
            <p className="font-serif text-xl font-bold text-charcoal">All inventory currently reserved</p>
            <p className="text-xs text-charcoal-muted mt-1">Please contact the showroom concierge to inquire about upcoming incoming consignments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showroomVehicles.map(v => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

