import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Car, 
  Upload, 
  Info,
  DollarSign
} from 'lucide-react';
import { CITIES_AND_AREAS, POPULAR_BRANDS } from '../data/mockData';
import { VehicleCondition, FuelType, TransmissionType, BodyType } from '../types';

export const Modals: React.FC = () => {
  const { 
    modalState, 
    closeModal, 
    submitInquiry, 
    submitTestDrive, 
    submitReservation, 
    addVehicle, 
    showrooms,
    currentUser 
  } = useApp();

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Contact Form State
  const [contactName, setContactName] = useState(currentUser.name || '');
  const [contactPhone, setContactPhone] = useState(currentUser.phone || '');
  const [contactEmail, setContactEmail] = useState(currentUser.email || '');
  const [contactMessage, setContactMessage] = useState('');
  const [inquiryType, setInquiryType] = useState<'Inquiry' | 'Callback' | 'Price Negotiation'>('Inquiry');

  // Test Drive State
  const [tdDate, setTdDate] = useState('');
  const [tdTime, setTdTime] = useState('11:00 AM');
  const [tdLocationType, setTdLocationType] = useState<'showroom' | 'doorstep'>('showroom');
  const [tdLicenseConfirmed, setTdLicenseConfirmed] = useState(true);

  // Reservation State
  const [resDeposit, setResDeposit] = useState(100000);
  const [resTermsAgreed, setResTermsAgreed] = useState(false);

  // List Car State
  const [carBrand, setCarBrand] = useState('Mercedes-Benz');
  const [carModel, setCarModel] = useState('');
  const [carVariant, setCarVariant] = useState('');
  const [carYear, setCarYear] = useState(2024);
  const [carPrice, setCarPrice] = useState<number>(5000000);
  const [carKm, setCarKm] = useState<number>(10000);
  const [carFuel, setCarFuel] = useState<FuelType>('Petrol');
  const [carTransmission, setCarTransmission] = useState<TransmissionType>('Automatic');
  const [carBodyType, setCarBodyType] = useState<BodyType>('SUV');
  const [carCondition, setCarCondition] = useState<VehicleCondition>('Certified Pre-Owned');
  const [carCity, setCarCity] = useState('Mumbai');
  const [carArea, setCarArea] = useState('Bandra West');
  const [carShowroomId, setCarShowroomId] = useState(showrooms[0]?.id || 'sh-1');
  const [carImageUrl, setCarImageUrl] = useState('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80');
  const [carEngine, setCarEngine] = useState('2.0L Turbocharged');
  const [carHp, setCarHp] = useState('250 HP');
  const [carDescription, setCarDescription] = useState('Single owner vehicle in pristine showroom condition with full service history.');

  if (!modalState.isOpen) return null;

  const handleClose = () => {
    setSubmitted(false);
    setReferenceId('');
    closeModal();
  };

  const vehicle = modalState.targetVehicle;
  const showroom = modalState.targetShowroom || showrooms.find(s => s.id === vehicle?.showroomId) || showrooms[0];

  // SUBMIT HANDLERS
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactEmail) return;

    const ref = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    submitInquiry({
      vehicleId: vehicle?.id || 'general-inquiry',
      vehicleName: vehicle ? `${vehicle.brand} ${vehicle.model} (${vehicle.variant})` : 'General Showroom Inquiry',
      showroomId: showroom?.id || 'sh-1',
      showroomName: showroom?.name || 'SAR CAR Concierge',
      customerName: contactName,
      customerPhone: contactPhone,
      customerEmail: contactEmail,
      message: contactMessage || `I am interested in exploring ${vehicle?.brand} ${vehicle?.model}. Please contact me.`,
      type: inquiryType,
    });
    setReferenceId(ref);
    setSubmitted(true);
  };

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tdDate || !contactName || !contactPhone) return;

    const ref = `TD-${Math.floor(100000 + Math.random() * 900000)}`;
    submitTestDrive({
      vehicleId: vehicle?.id || 'car-1',
      vehicleName: vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Selected Vehicle',
      showroomId: showroom?.id || 'sh-1',
      showroomName: showroom?.name || 'Showroom Concierge',
      customerName: contactName,
      customerPhone: contactPhone,
      customerEmail: contactEmail,
      preferredDate: tdDate,
      preferredTime: tdTime,
    });
    setReferenceId(ref);
    setSubmitted(true);
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTermsAgreed || !contactName || !contactPhone) return;

    const ref = `RES-${Math.floor(100000 + Math.random() * 900000)}`;
    submitReservation({
      vehicleId: vehicle?.id || 'car-1',
      vehicleName: vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Selected Luxury Vehicle',
      vehiclePrice: vehicle?.price || 5000000,
      showroomId: showroom?.id || 'sh-1',
      showroomName: showroom?.name || 'Showroom Gallery',
      customerName: contactName,
      customerPhone: contactPhone,
      customerEmail: contactEmail,
      depositAmount: resDeposit,
      notes: 'Customer submitted formal reservation request via SAR CAR portal.',
    });
    setReferenceId(ref);
    setSubmitted(true);
  };

  const handleListCarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selShowroom = showrooms.find(s => s.id === carShowroomId) || showrooms[0];
    
    // Format price in Indian Lakh/Cr
    const formattedPrice = carPrice >= 10000000 
      ? `₹${(carPrice / 10000000).toFixed(2)} Cr`
      : `₹${(carPrice / 100000).toFixed(2)} Lakh`;

    addVehicle({
      brand: carBrand,
      model: carModel || 'Prestige Model',
      variant: carVariant || 'Luxury Edition',
      year: Number(carYear),
      price: Number(carPrice),
      formattedPrice,
      kilometres: Number(carKm),
      fuelType: carFuel,
      transmission: carTransmission,
      bodyType: carBodyType,
      condition: carCondition,
      state: selShowroom.state,
      city: carCity,
      district: selShowroom.district,
      area: carArea,
      showroomId: selShowroom.id,
      showroomName: selShowroom.name,
      showroomVerified: selShowroom.verified,
      thumbnail: carImageUrl,
      images: [carImageUrl],
      engine: carEngine,
      horsepower: carHp,
      mileage: '14.0 kmpl',
      seatingCapacity: 5,
      exteriorColor: 'Obsidian Black',
      interiorColor: 'Cream Nappa Leather',
      description: carDescription,
      features: ['Panoramic Glass Roof', 'Surround View Cameras', 'Premium High-Fidelity Audio', 'Multi-Zone Climate'],
      safetyFeatures: ['Electronic Stability Program', 'Comprehensive Airbags', 'Autonomous Emergency Braking'],
      ownershipHistory: 'Single Owner Verified, Showroom Inspected & Certified.',
      status: 'Available',
    });

    setReferenceId(`LST-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-ivory rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-beige-dark relative text-charcoal animate-fade-in my-8">
        
        {/* Header Bar */}
        <div className="bg-forest px-6 py-4 flex items-center justify-between text-ivory">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-lg font-semibold tracking-wide">
              {modalState.type === 'contact' && 'Contact Showroom & Negotiate'}
              {modalState.type === 'testDrive' && 'Schedule Private Test Drive'}
              {modalState.type === 'reserve' && 'Reserve Vehicle'}
              {modalState.type === 'listCar' && 'List Vehicle on SAR CAR'}
            </span>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-forest-light hover:bg-forest flex items-center justify-center text-ivory/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vehicle Preview Header if target vehicle is provided */}
        {vehicle && modalState.type !== 'listCar' && (
          <div className="bg-ivory-dark px-6 py-3 border-b border-beige-dark flex items-center space-x-4">
            <img 
              src={vehicle.thumbnail} 
              alt={vehicle.model} 
              className="w-16 h-12 rounded-lg object-cover border border-beige-dark"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wider text-sage-700 font-semibold">{vehicle.brand} • {vehicle.year}</p>
              <h4 className="font-serif text-sm font-bold text-charcoal truncate">{vehicle.model} ({vehicle.variant})</h4>
              <p className="text-xs font-bold text-forest">{vehicle.formattedPrice}</p>
            </div>
            <div className="text-right text-xs text-charcoal-muted hidden sm:block">
              <span className="flex items-center space-x-1 justify-end font-medium text-charcoal">
                <Building2 className="w-3.5 h-3.5 text-sage-600" />
                <span>{vehicle.showroomName}</span>
              </span>
              <span>{vehicle.city}, {vehicle.area}</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          
          {submitted ? (
            /* Confirmation Success Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest">
                {modalState.type === 'contact' && 'Inquiry Transmitted Successfully'}
                {modalState.type === 'testDrive' && 'Test Drive Booking Requested'}
                {modalState.type === 'reserve' && 'Reservation Request Submitted'}
                {modalState.type === 'listCar' && 'Vehicle Listing Published'}
              </h3>
              <p className="text-sm text-charcoal-soft max-w-md mx-auto leading-relaxed">
                {modalState.type === 'contact' && `Your inquiry has been directly dispatched to the showroom principal at ${showroom?.name}. A senior client executive will contact you shortly.`}
                {modalState.type === 'testDrive' && `Your preferred test drive slot has been reserved. The dealership will confirm schedule availability and driver credentials.`}
                {modalState.type === 'reserve' && `Your reservation request is under review. The showroom will inspect vehicle status and issue the official reservation paperwork.`}
                {modalState.type === 'listCar' && `Your luxury listing is now live on SAR CAR marketplace. Potential buyers can view your vehicle and contact your showroom.`}
              </p>
              <div className="bg-beige-light p-3 rounded-xl border border-beige-dark inline-block text-xs text-charcoal">
                <span className="text-charcoal-muted">Reference Number: </span>
                <span className="font-mono font-bold text-forest">{referenceId}</span>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="bg-forest hover:bg-forest-light text-ivory px-8 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Action Forms */
            <>
              {/* 1. CONTACT SHOWROOM FORM */}
              {modalState.type === 'contact' && (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Inquiry Purpose</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Inquiry', 'Callback', 'Price Negotiation'] as const).map(type => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setInquiryType(type)}
                          className={`py-2 px-2 text-xs rounded-xl font-medium border transition-colors ${
                            inquiryType === type 
                              ? 'bg-amberGlow text-charcoal border-amberGlow font-semibold shadow-sm' 
                              : 'bg-white border-beige-dark hover:bg-beige'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Your Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={contactName} 
                        onChange={e => setContactName(e.target.value)}
                        placeholder="e.g. Aditya Singhania"
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number (with WhatsApp) *</label>
                      <input 
                        type="tel" 
                        required 
                        value={contactPhone} 
                        onChange={e => setContactPhone(e.target.value)}
                        placeholder="+91 98201 55432"
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={contactEmail} 
                      onChange={e => setContactEmail(e.target.value)}
                      placeholder="aditya@example.com"
                      className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      {inquiryType === 'Price Negotiation' ? 'Your Proposed Offer or Inquiries' : 'Message to Showroom'}
                    </label>
                    <textarea 
                      rows={3} 
                      value={contactMessage}
                      onChange={e => setContactMessage(e.target.value)}
                      placeholder={
                        inquiryType === 'Price Negotiation'
                          ? 'I would like to discuss the final on-road price and possible showroom incentives...'
                          : 'Please share available financing rates, delivery timelines, and detailed service records.'
                      }
                      className="w-full text-xs bg-white border border-beige-dark rounded-xl p-3 focus:outline-none focus:border-amberGlow"
                    />
                  </div>

                  <div className="bg-sage/10 p-3 rounded-xl border border-sage/20 text-[11px] text-charcoal-soft flex items-start space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Your details are directly routed to {showroom?.name}. SAR CAR ensures zero spam and verified showroom confidentiality.</span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-forest hover:bg-forest-light text-ivory font-semibold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
                    >
                      Transmit Inquiry to Showroom
                    </button>
                  </div>
                </form>
              )}

              {/* 2. BOOK TEST DRIVE FORM */}
              {modalState.type === 'testDrive' && (
                <form onSubmit={handleTestDriveSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Preferred Date *</label>
                      <input 
                        type="date" 
                        required 
                        value={tdDate} 
                        onChange={e => setTdDate(e.target.value)}
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Preferred Time *</label>
                      <select 
                        value={tdTime} 
                        onChange={e => setTdTime(e.target.value)}
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
                      >
                        <option>10:00 AM - 11:30 AM</option>
                        <option>11:30 AM - 01:00 PM</option>
                        <option>02:00 PM - 03:30 PM</option>
                        <option>04:00 PM - 05:30 PM</option>
                        <option>06:00 PM - 07:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Test Drive Location</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTdLocationType('showroom')}
                        className={`py-2 px-3 text-xs rounded-xl font-medium border text-left flex items-center space-x-2 ${
                          tdLocationType === 'showroom' ? 'bg-amberGlow text-charcoal border-amberGlow font-semibold' : 'bg-white border-beige-dark'
                        }`}
                      >
                        <Building2 className="w-4 h-4 shrink-0" />
                        <div>
                          <p className="font-semibold">At Showroom</p>
                          <p className="text-[10px] opacity-80">{showroom?.area}</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTdLocationType('doorstep')}
                        className={`py-2 px-3 text-xs rounded-xl font-medium border text-left flex items-center space-x-2 ${
                          tdLocationType === 'doorstep' ? 'bg-amberGlow text-charcoal border-amberGlow font-semibold' : 'bg-white border-beige-dark'
                        }`}
                      >
                        <MapPin className="w-4 h-4 shrink-0" />
                        <div>
                          <p className="font-semibold">Doorstep Concierge</p>
                          <p className="text-[10px] opacity-80">Home / Office address</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Your Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={contactName} 
                        onChange={e => setContactName(e.target.value)}
                        placeholder="Aditya Singhania"
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Contact Phone *</label>
                      <input 
                        type="tel" 
                        required 
                        value={contactPhone} 
                        onChange={e => setContactPhone(e.target.value)}
                        placeholder="+91 98201 55432"
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="license" 
                      checked={tdLicenseConfirmed} 
                      onChange={e => setTdLicenseConfirmed(e.target.checked)}
                      className="rounded text-forest focus:ring-forest"
                    />
                    <label htmlFor="license" className="text-xs text-charcoal">
                      I hold a valid Indian driving licence and agree to showroom test drive guidelines.
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!tdLicenseConfirmed}
                      className="w-full bg-forest hover:bg-forest-light disabled:opacity-50 text-ivory font-semibold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
                    >
                      Confirm Test Drive Appointment
                    </button>
                  </div>
                </form>
              )}

              {/* 3. RESERVE CAR FORM */}
              {modalState.type === 'reserve' && (
                <form onSubmit={handleReservationSubmit} className="space-y-4">
                  <div className="bg-amberGlow/10 border border-amberGlow/30 p-4 rounded-2xl">
                    <div className="flex items-start space-x-3">
                      <DollarSign className="w-5 h-5 text-amberGlow shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">Refundable Reservation Token</h4>
                        <p className="text-xs text-charcoal-soft mt-1 leading-relaxed">
                          Reserving this vehicle places a 72-hour priority hold on inventory. This prevents other buyers from closing on the vehicle while your showroom inspection and loan approval are finalized.
                        </p>
                        <p className="text-xs font-semibold text-forest mt-2">
                          Standard Token Amount: ₹1,00,000 (100% Refundable if inspection fails)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Buyer Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={contactName} 
                        onChange={e => setContactName(e.target.value)}
                        placeholder="Aditya Singhania"
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        required 
                        value={contactPhone} 
                        onChange={e => setContactPhone(e.target.value)}
                        placeholder="+91 98201 55432"
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Email for Official Reservation Order *</label>
                    <input 
                      type="email" 
                      required 
                      value={contactEmail} 
                      onChange={e => setContactEmail(e.target.value)}
                      placeholder="aditya@example.com"
                      className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2.5 focus:outline-none focus:border-amberGlow"
                    />
                  </div>

                  <div className="p-3 bg-white border border-beige-dark rounded-xl text-xs space-y-2">
                    <p className="font-semibold text-charcoal">Reservation Notice & Terms:</p>
                    <ul className="list-disc pl-4 space-y-1 text-charcoal-muted text-[11px]">
                      <li>This submission registers an official intent to reserve with {showroom?.name}.</li>
                      <li>Final payment and vehicle registration take place directly at the authorized dealership.</li>
                      <li>No simulated bank deductions: payment link will be sent upon dealership confirmation.</li>
                    </ul>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      required 
                      checked={resTermsAgreed} 
                      onChange={e => setResTermsAgreed(e.target.checked)}
                      className="rounded text-forest focus:ring-forest mt-0.5"
                    />
                    <label htmlFor="terms" className="text-xs text-charcoal leading-snug">
                      I accept the reservation terms and request priority holding of this vehicle.
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!resTermsAgreed}
                      className="w-full bg-amberGlow hover:bg-amberGlow-hover disabled:opacity-50 text-charcoal font-semibold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
                    >
                      Submit Reservation Request
                    </button>
                  </div>
                </form>
              )}

              {/* 4. LIST CAR MODAL (FOR DEALERS & PRIVATE SELLERS) */}
              {modalState.type === 'listCar' && (
                <form onSubmit={handleListCarSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Brand *</label>
                      <select 
                        value={carBrand}
                        onChange={e => setCarBrand(e.target.value)}
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      >
                        {POPULAR_BRANDS.map(b => (
                          <option key={b.name} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Model Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={carModel}
                        onChange={e => setCarModel(e.target.value)}
                        placeholder="e.g. GLC 300 / X5 / Defender"
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Variant</label>
                      <input 
                        type="text" 
                        value={carVariant}
                        onChange={e => setCarVariant(e.target.value)}
                        placeholder="e.g. 4MATIC Progressive"
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Year *</label>
                      <select 
                        value={carYear}
                        onChange={e => setCarYear(Number(e.target.value))}
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      >
                        {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Condition *</label>
                      <select 
                        value={carCondition}
                        onChange={e => setCarCondition(e.target.value as VehicleCondition)}
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      >
                        <option value="Brand New">Brand New</option>
                        <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                        <option value="Used">Used</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Price in INR (₹) *</label>
                      <input 
                        type="number" 
                        required 
                        value={carPrice}
                        onChange={e => setCarPrice(Number(e.target.value))}
                        placeholder="7400000"
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Kilometres Driven *</label>
                      <input 
                        type="number" 
                        required 
                        value={carKm}
                        onChange={e => setCarKm(Number(e.target.value))}
                        placeholder="5000"
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Fuel Type</label>
                      <select 
                        value={carFuel}
                        onChange={e => setCarFuel(e.target.value as FuelType)}
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      >
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="CNG">CNG</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Transmission</label>
                      <select 
                        value={carTransmission}
                        onChange={e => setCarTransmission(e.target.value as TransmissionType)}
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      >
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Body Type</label>
                      <select 
                        value={carBodyType}
                        onChange={e => setCarBodyType(e.target.value as BodyType)}
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      >
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="MPV">MPV</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">City Location *</label>
                      <select 
                        value={carCity}
                        onChange={e => {
                          setCarCity(e.target.value);
                          const areas = CITIES_AND_AREAS[e.target.value] || ['Main City'];
                          setCarArea(areas[0]);
                        }}
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      >
                        {Object.keys(CITIES_AND_AREAS).map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Local Area *</label>
                      <select 
                        value={carArea}
                        onChange={e => setCarArea(e.target.value)}
                        className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                      >
                        {(CITIES_AND_AREAS[carCity] || ['Central Area']).map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Listing Showroom *</label>
                    <select 
                      value={carShowroomId}
                      onChange={e => setCarShowroomId(e.target.value)}
                      className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                    >
                      {showrooms.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.city})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Vehicle Image URL</label>
                    <input 
                      type="url" 
                      value={carImageUrl}
                      onChange={e => setCarImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full text-xs bg-white border border-beige-dark rounded-xl px-3 py-2 focus:outline-none focus:border-amberGlow"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Vehicle Description & History</label>
                    <textarea 
                      rows={2} 
                      value={carDescription}
                      onChange={e => setCarDescription(e.target.value)}
                      className="w-full text-xs bg-white border border-beige-dark rounded-xl p-2.5 focus:outline-none focus:border-amberGlow"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-forest hover:bg-forest-light text-ivory font-semibold py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
                    >
                      Publish Listing to Marketplace
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
};

