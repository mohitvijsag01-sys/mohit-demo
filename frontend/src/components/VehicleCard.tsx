import React from 'react';
import { Vehicle } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Fuel, Gauge, Cog, MapPin, Building2, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { 
    navigateToVehicle, 
    toggleWishlist, 
    isInWishlist, 
    addToComparison, 
    removeFromComparison, 
    isInComparison, 
    openModal 
  } = useApp();

  const isFavorited = isInWishlist(vehicle.id);
  const isCompared = isInComparison(vehicle.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromComparison(vehicle.id);
    } else {
      addToComparison(vehicle.id);
    }
  };

  return (
    <div 
      onClick={() => navigateToVehicle(vehicle.id)}
      className="group bg-white rounded-2xl overflow-hidden border border-beige-dark/50 hover:border-amberGlow/60 transition-all duration-300 hover:shadow-luxury flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-forest-light">
        <img 
          src={vehicle.thumbnail} 
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Condition Badge (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className={`px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-full backdrop-blur-md shadow-sm ${
            vehicle.condition === 'Brand New' 
              ? 'bg-amberGlow text-charcoal font-bold'
              : vehicle.condition === 'Certified Pre-Owned'
                ? 'bg-forest/90 text-ivory border border-sage/40'
                : 'bg-charcoal/80 text-white'
          }`}>
            {vehicle.condition}
          </span>
          {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-600/90 text-white rounded-full">
              Price Reduced
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(vehicle.id);
          }}
          title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-charcoal/60 hover:bg-charcoal/90 backdrop-blur-md flex items-center justify-center text-white transition-all transform active:scale-90"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-amberGlow text-amberGlow' : 'text-white hover:text-amberGlow'
            }`} 
          />
        </button>

        {/* Compare Checkbox (Bottom Right over Image) */}
        <button
          onClick={handleCompareToggle}
          className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center space-x-1.5 transition-all backdrop-blur-md ${
            isCompared 
              ? 'bg-amberGlow text-charcoal font-bold shadow-md' 
              : 'bg-charcoal/70 hover:bg-charcoal/90 text-white border border-white/20'
          }`}
        >
          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
            isCompared ? 'bg-charcoal border-charcoal text-amberGlow' : 'border-white/60'
          }`}>
            {isCompared && <Check className="w-2.5 h-2.5 stroke-[3]" />}
          </span>
          <span>{isCompared ? 'Comparing' : 'Compare'}</span>
        </button>

        {/* Location Tag (Bottom Left over Image) */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-white text-[11px] font-medium bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
          <MapPin className="w-3 h-3 text-amberGlow" />
          <span>{vehicle.city}, {vehicle.area}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Brand & Year Header */}
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-xs uppercase tracking-widest text-sage-600 font-semibold">
              {vehicle.brand} • {vehicle.year}
            </span>
            <div className="flex items-center space-x-1 text-[11px] text-charcoal-muted">
              <Building2 className="w-3 h-3 text-sage-500" />
              <span className="truncate max-w-[120px]">{vehicle.showroomName}</span>
              {vehicle.showroomVerified && (
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" title="Verified Showroom" />
              )}
            </div>
          </div>

          {/* Model & Variant */}
          <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-forest transition-colors line-clamp-1">
            {vehicle.model} <span className="font-sans text-xs font-normal text-charcoal-muted">({vehicle.variant})</span>
          </h3>

          {/* Price */}
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-xl font-bold font-sans text-forest tracking-tight">
              {vehicle.formattedPrice}
            </span>
            {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
              <span className="text-xs line-through text-charcoal-muted font-normal">
                ₹{(vehicle.originalPrice / 100000).toFixed(2)} Lakh
              </span>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-beige-dark/40 text-charcoal-soft text-xs">
            <div className="flex items-center space-x-1.5 bg-ivory-soft px-2 py-1.5 rounded-lg border border-beige-dark/20">
              <Gauge className="w-3.5 h-3.5 text-sage-600" />
              <span className="truncate">{vehicle.kilometres.toLocaleString()} km</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-ivory-soft px-2 py-1.5 rounded-lg border border-beige-dark/20">
              <Fuel className="w-3.5 h-3.5 text-sage-600" />
              <span className="truncate">{vehicle.fuelType}</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-ivory-soft px-2 py-1.5 rounded-lg border border-beige-dark/20">
              <Cog className="w-3.5 h-3.5 text-sage-600" />
              <span className="truncate">{vehicle.transmission}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-beige-dark/30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToVehicle(vehicle.id);
            }}
            className="w-full text-center py-2 px-3 rounded-xl text-xs font-semibold bg-ivory hover:bg-beige text-charcoal border border-beige-dark transition-colors flex items-center justify-center space-x-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 text-sage-700" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal('contact', vehicle);
            }}
            className="w-full text-center py-2 px-3 rounded-xl text-xs font-semibold bg-forest hover:bg-forest-light text-ivory transition-colors shadow-sm"
          >
            Contact Showroom
          </button>
        </div>

      </div>
    </div>
  );
};

