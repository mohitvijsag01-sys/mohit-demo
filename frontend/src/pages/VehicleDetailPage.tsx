import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { 
  Heart, 
  Share2, 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Calendar, 
  Gauge, 
  Fuel, 
  Cog, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  Calculator, 
  ArrowLeft, 
  Check, 
  Info,
  Car,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const VehicleDetailPage: React.FC = () => {
  const { 
    vehicles, 
    showrooms, 
    selectedVehicleId, 
    setCurrentPage, 
    toggleWishlist, 
    isInWishlist, 
    addToComparison, 
    removeFromComparison, 
    isInComparison,
    openModal,
    navigateToShowroom
  } = useApp();

  const vehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];
  const showroom = showrooms.find(s => s.id === vehicle.showroomId) || showrooms[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // EMI Calculator State
  const [loanTenureYears, setLoanTenureYears] = useState(5);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  const images = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.thumbnail];

  // EMI Calculation Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emiCalculation = useMemo(() => {
    const downPayment = (vehicle.price * downPaymentPercent) / 100;
    const principal = vehicle.price - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = loanTenureYears * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayable = emi * totalMonths;
    const totalInterest = totalPayable - principal;

    return {
      downPayment,
      principal,
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
    };
  }, [vehicle.price, downPaymentPercent, loanTenureYears, interestRate]);

  const isFavorited = isInWishlist(vehicle.id);
  const isCompared = isInComparison(vehicle.id);

  // Similar vehicles (same brand or same body type, excluding this vehicle)
  const similarVehicles = vehicles
    .filter(v => v.id !== vehicle.id && (v.brand === vehicle.brand || v.bodyType === vehicle.bodyType))
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.brand} ${vehicle.model} - SAR CAR`,
        text: `Explore this verified ${vehicle.brand} ${vehicle.model} on SAR CAR`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Vehicle link copied to clipboard!');
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${showroom.name}, I found your listing for the ${vehicle.brand} ${vehicle.model} (${vehicle.variant}) on SAR CAR and would like to receive further details and viewing availability.`
    );
    window.open(`https://wa.me/919820155432?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-24 text-charcoal">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-ivory-dark border-b border-beige-dark py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <button
            onClick={() => setCurrentPage('explore')}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-forest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Vehicle Catalog</span>
          </button>

          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => {
                if (isCompared) removeFromComparison(vehicle.id);
                else addToComparison(vehicle.id);
              }}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                isCompared 
                  ? 'bg-amberGlow text-charcoal border-amberGlow' 
                  : 'bg-white border-beige-dark hover:bg-beige text-charcoal'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isCompared ? 'Added to Compare' : 'Add to Compare'}</span>
            </button>

            <button
              onClick={() => toggleWishlist(vehicle.id)}
              className="p-2 rounded-full bg-white border border-beige-dark hover:bg-beige text-charcoal transition-colors"
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-amberGlow text-amberGlow' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white border border-beige-dark hover:bg-beige text-charcoal transition-colors"
              title="Share Vehicle"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Main Grid: Gallery & Details on Left, Sticky Purchase Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT 8 COLUMNS: GALLERY, SPECS, DESCRIPTION, HISTORY */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Large Luxury Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] bg-forest-light rounded-3xl overflow-hidden border border-beige-dark shadow-luxury">
                <img 
                  src={images[activeImageIndex] || vehicle.thumbnail} 
                  alt={`${vehicle.brand} ${vehicle.model}`} 
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {/* Condition Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-forest text-ivory border border-sage/40 backdrop-blur-md">
                    {vehicle.condition}
                  </span>
                </div>

                {/* Showroom Verified Badge */}
                {vehicle.showroomVerified && (
                  <div className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-md text-ivory text-xs px-3 py-1 rounded-full flex items-center space-x-1 border border-white/20">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Dealership Audit</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery Navigation */}
              {images.length > 1 && (
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx ? 'border-amberGlow scale-105 shadow-md' : 'border-beige-dark opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Vehicle Overview & Key Highlights */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige-dark/60 shadow-sm space-y-6">
              
              <div className="border-b border-beige-dark/50 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-sage-700 font-bold">
                    {vehicle.brand} • {vehicle.year} Model
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-charcoal-muted">
                    <MapPin className="w-3.5 h-3.5 text-amberGlow" />
                    <span>{vehicle.city}, {vehicle.area}</span>
                  </div>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
                  {vehicle.model} <span className="font-sans text-xl font-normal text-charcoal-muted">({vehicle.variant})</span>
                </h1>

                <div className="mt-4 flex flex-wrap items-baseline gap-4">
                  <span className="font-serif text-3xl font-bold text-forest">
                    {vehicle.formattedPrice}
                  </span>
                  {vehicle.originalPrice && vehicle.originalPrice > vehicle.price && (
                    <span className="text-base line-through text-charcoal-muted">
                      ₹{(vehicle.originalPrice / 100000).toFixed(2)} Lakh
                    </span>
                  )}
                  <span className="text-xs text-sage-700 bg-sage/10 px-2.5 py-1 rounded-full font-medium">
                    Ex-Showroom Certified Quote
                  </span>
                </div>
              </div>

              {/* 4 Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-ivory-soft p-4 rounded-2xl border border-beige-dark/40">
                  <Gauge className="w-5 h-5 text-sage-600 mb-1" />
                  <p className="text-[11px] text-charcoal-muted uppercase">Kilometres</p>
                  <p className="font-serif text-base font-bold text-charcoal">{vehicle.kilometres.toLocaleString()} km</p>
                </div>

                <div className="bg-ivory-soft p-4 rounded-2xl border border-beige-dark/40">
                  <Fuel className="w-5 h-5 text-sage-600 mb-1" />
                  <p className="text-[11px] text-charcoal-muted uppercase">Fuel Type</p>
                  <p className="font-serif text-base font-bold text-charcoal">{vehicle.fuelType}</p>
                </div>

                <div className="bg-ivory-soft p-4 rounded-2xl border border-beige-dark/40">
                  <Cog className="w-5 h-5 text-sage-600 mb-1" />
                  <p className="text-[11px] text-charcoal-muted uppercase">Transmission</p>
                  <p className="font-serif text-base font-bold text-charcoal">{vehicle.transmission}</p>
                </div>

                <div className="bg-ivory-soft p-4 rounded-2xl border border-beige-dark/40">
                  <Calendar className="w-5 h-5 text-sage-600 mb-1" />
                  <p className="text-[11px] text-charcoal-muted uppercase">Year</p>
                  <p className="font-serif text-base font-bold text-charcoal">{vehicle.year}</p>
                </div>
              </div>

              {/* Vehicle Description */}
              <div className="pt-4 border-t border-beige-dark/40">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2">Vehicle Overview</h3>
                <p className="text-sm text-charcoal-soft leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

            </div>

            {/* 3. Comprehensive Technical Specifications */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige-dark/60 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Technical Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="flex justify-between py-2.5 border-b border-beige-dark/40">
                  <span className="text-charcoal-muted">Engine Displacement / Type</span>
                  <span className="font-semibold text-charcoal">{vehicle.engine}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-beige-dark/40">
                  <span className="text-charcoal-muted">Max Power (Horsepower)</span>
                  <span className="font-semibold text-charcoal">{vehicle.horsepower}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-beige-dark/40">
                  <span className="text-charcoal-muted">Peak Torque</span>
                  <span className="font-semibold text-charcoal">{vehicle.torque || '380 Nm'}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-beige-dark/40">
                  <span className="text-charcoal-muted">Certified Fuel Economy</span>
                  <span className="font-semibold text-charcoal">{vehicle.mileage}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-beige-dark/40">
                  <span className="text-charcoal-muted">Seating Capacity</span>
                  <span className="font-semibold text-charcoal">{vehicle.seatingCapacity} Occupants</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-beige-dark/40">
                  <span className="text-charcoal-muted">Body Configuration</span>
                  <span className="font-semibold text-charcoal">{vehicle.bodyType}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-beige-dark/40">
                  <span className="text-charcoal-muted">Exterior Finish</span>
                  <span className="font-semibold text-charcoal">{vehicle.exteriorColor}</span>
                </div>

                <div className="flex justify-between py-2.5 border-b border-beige-dark/40">
                  <span className="text-charcoal-muted">Upholstery & Interior</span>
                  <span className="font-semibold text-charcoal">{vehicle.interiorColor}</span>
                </div>

              </div>
            </div>

            {/* 4. Features & Equipment */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige-dark/60 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-charcoal">
                Factory Equipment & Cabin Amenities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2.5 text-xs text-charcoal p-2 rounded-xl bg-ivory-soft border border-beige-dark/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-beige-dark/40">
                <h4 className="font-serif text-base font-bold text-charcoal mb-3">Safety & Driver Assistance</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.safetyFeatures.map((safety, i) => (
                    <div key={i} className="flex items-center space-x-2.5 text-xs text-charcoal p-2 rounded-xl bg-ivory-soft border border-beige-dark/30">
                      <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
                      <span>{safety}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ownership & Title History */}
              <div className="pt-4 border-t border-beige-dark/40 bg-sage/10 p-4 rounded-2xl border border-sage/20">
                <h4 className="font-serif text-sm font-bold text-forest mb-1">Ownership & Title Background</h4>
                <p className="text-xs text-charcoal-soft leading-relaxed">
                  {vehicle.ownershipHistory}
                </p>
              </div>

            </div>

            {/* 5. Estimated Financing Breakdown with EMI Calculator */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige-dark/60 shadow-sm space-y-6">
              
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-amberGlow" />
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  Estimated Financing & EMI Calculator
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Sliders */}
                <div className="md:col-span-2 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Down Payment ({downPaymentPercent}%)</span>
                      <span className="font-bold text-forest">₹{(emiCalculation.downPayment / 100000).toFixed(2)} Lakh</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="70"
                      step="5"
                      value={downPaymentPercent}
                      onChange={e => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-amberGlow cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Loan Tenure ({loanTenureYears} Years)</span>
                      <span className="font-bold text-forest">{loanTenureYears * 12} Months</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      step="1"
                      value={loanTenureYears}
                      onChange={e => setLoanTenureYears(Number(e.target.value))}
                      className="w-full accent-forest cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Interest Rate ({interestRate}%)</span>
                      <span className="font-bold text-forest">{interestRate}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min="7.0"
                      max="14.0"
                      step="0.25"
                      value={interestRate}
                      onChange={e => setInterestRate(Number(e.target.value))}
                      className="w-full accent-forest cursor-pointer"
                    />
                  </div>
                </div>

                {/* Result Card */}
                <div className="bg-forest text-ivory p-6 rounded-2xl flex flex-col justify-between border border-sage/30">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-sage-300 font-semibold">Estimated Monthly EMI</p>
                    <p className="font-serif text-3xl font-bold text-amberGlow mt-1">
                      ₹{emiCalculation.monthlyEmi.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-sage-300 mt-0.5">/ month for {loanTenureYears} years</p>
                  </div>

                  <div className="pt-4 border-t border-sage/20 text-xs space-y-1 text-sage-200">
                    <div className="flex justify-between">
                      <span>Loan Principal:</span>
                      <span className="font-semibold text-ivory">₹{(emiCalculation.principal / 100000).toFixed(2)} L</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span className="font-semibold text-ivory">₹{(emiCalculation.totalInterest / 100000).toFixed(2)} L</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* 6. Accredited Showroom Profile & Map Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-beige-dark/60 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-beige-dark/50">
                <div className="flex items-center space-x-4">
                  <img 
                    src={showroom.logo} 
                    alt={showroom.name} 
                    className="w-14 h-14 rounded-2xl object-cover border border-beige-dark shadow-sm"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h4 className="font-serif text-lg font-bold text-charcoal">{showroom.name}</h4>
                      {showroom.verified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-600" title="Accredited Partner" />
                      )}
                    </div>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      {showroom.address}
                    </p>
                    <p className="text-xs text-amberGlow font-semibold mt-1">
                      ★ {showroom.rating} ({showroom.reviewCount} luxury reviews) • {showroom.totalInventory} vehicles in stock
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigateToShowroom(showroom.id)}
                  className="px-4 py-2 rounded-xl bg-ivory hover:bg-beige text-charcoal border border-beige-dark text-xs font-semibold transition-colors flex items-center space-x-1 self-start sm:self-center"
                >
                  <span>View Showroom Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Showroom Interactive Info Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-charcoal-soft">
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-4 h-4 text-sage-600" />
                  <span>Direct Line: <strong className="text-charcoal">{showroom.phone}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-sage-600" />
                  <span>Hours: <strong className="text-charcoal">{showroom.businessHours}</strong></span>
                </div>
              </div>

              {/* Showroom Stylized Map Container */}
              <div className="aspect-[21/9] bg-forest-light rounded-2xl relative overflow-hidden flex items-center justify-center border border-beige-dark">
                <div className="text-center text-ivory p-4 relative z-10 space-y-1">
                  <MapPin className="w-8 h-8 text-amberGlow mx-auto animate-bounce" />
                  <p className="font-serif font-bold text-sm">{showroom.name}</p>
                  <p className="text-xs text-sage-200">{showroom.address}</p>
                </div>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#879B83_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>

            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT 4 COLUMNS: STICKY PURCHASE ACTION PANEL */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            
            <div className="bg-forest text-ivory p-6 sm:p-7 rounded-3xl border border-sage/30 shadow-luxury-lg space-y-6">
              
              <div>
                <span className="text-[11px] uppercase tracking-widest text-amberGlow font-bold">
                  Certified Showroom Listing
                </span>
                <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                  {vehicle.formattedPrice}
                </h3>
                <p className="text-xs text-sage-300 mt-0.5">
                  Available for immediate dispatch & registration
                </p>
              </div>

              {/* Direct Actions Buttons */}
              <div className="space-y-2.5">
                
                {/* 1. Buy Now / Direct Order */}
                <button
                  onClick={() => openModal('reserve', vehicle, showroom)}
                  className="w-full bg-amberGlow hover:bg-amberGlow-hover text-charcoal font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-amber-glow flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Buy Now / Priority Order</span>
                </button>

                {/* 2. Reserve This Car */}
                <button
                  onClick={() => openModal('reserve', vehicle, showroom)}
                  className="w-full bg-forest-light hover:bg-forest-light/80 text-ivory border border-sage/40 font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Reserve This Car (Refundable Token)</span>
                </button>

                {/* 3. Book Test Drive */}
                <button
                  onClick={() => openModal('testDrive', vehicle, showroom)}
                  className="w-full bg-transparent hover:bg-forest-light text-ivory border border-sage/30 font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-amberGlow" />
                  <span>Book Private Test Drive</span>
                </button>

                {/* 4. Contact Showroom */}
                <button
                  onClick={() => openModal('contact', vehicle, showroom)}
                  className="w-full bg-transparent hover:bg-forest-light text-sage-200 hover:text-white border border-sage/20 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Showroom / Negotiate</span>
                </button>

                {/* 5. WhatsApp Direct Enquiry */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-emerald-700/80 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>WhatsApp Direct Inquiry</span>
                </button>

              </div>

              {/* Trust Safeguards */}
              <div className="pt-4 border-t border-sage/20 space-y-2 text-[11px] text-sage-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amberGlow" />
                  <span>100% Refundable Booking Deposit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amberGlow" />
                  <span>Direct Dealership Invoicing & Registration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amberGlow" />
                  <span>Multi-Point Technical Verification Certified</span>
                </div>
              </div>

            </div>

            {/* Quick Contact Card */}
            <div className="bg-white p-5 rounded-2xl border border-beige-dark/60 text-xs text-charcoal space-y-2">
              <p className="font-semibold text-charcoal">Need Bespoke Assistance?</p>
              <p className="text-charcoal-muted text-[11px]">
                SAR CAR Private Client Advisors are available 7 days a week to arrange private salon viewing.
              </p>
              <div className="pt-1 flex items-center space-x-1.5 text-forest font-bold">
                <PhoneCall className="w-3.5 h-3.5 text-amberGlow" />
                <span>+91 1800 209 8899 (Complimentary)</span>
              </div>
            </div>

          </div>

        </div>

        {/* 7. Similar Luxury Vehicles Section */}
        {similarVehicles.length > 0 && (
          <div className="mt-20 pt-12 border-t border-beige-dark/60">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-sage-700 font-semibold">
                  Complementary Selection
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-1">
                  Similar Vehicles in Inventory
                </h3>
              </div>
              <button
                onClick={() => setCurrentPage('explore')}
                className="text-xs uppercase tracking-wider font-semibold text-forest hover:text-amberGlow transition-colors"
              >
                View Catalog
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarVehicles.map(v => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

