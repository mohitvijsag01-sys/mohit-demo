import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { 
  User, 
  Heart, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Bell, 
  Car, 
  Compass, 
  ArrowRight,
  SlidersHorizontal,
  DollarSign,
  MessageSquare
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { 
    currentUser, 
    wishlist, 
    vehicles, 
    recentlyViewed, 
    testDriveBookings, 
    reservations, 
    inquiries, 
    setCurrentPage,
    navigateToVehicle 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'wishlist' | 'testDrives' | 'reservations' | 'inquiries' | 'recent'>('wishlist');

  const savedVehicles = vehicles.filter(v => wishlist.includes(v.id));
  const recentVehicles = vehicles.filter(v => recentlyViewed.includes(v.id));

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20 text-charcoal">
      
      {/* Header Profile Bar */}
      <div className="bg-forest text-ivory py-10 px-4 sm:px-6 lg:px-8 border-b border-sage/20 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center space-x-5">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-amberGlow shadow-lg"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold">{currentUser.name}</h1>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amberGlow text-charcoal font-bold uppercase tracking-wider">
                  Verified Client
                </span>
              </div>
              <p className="text-xs text-sage-300 mt-1">{currentUser.email} • {currentUser.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentPage('explore')}
              className="bg-amberGlow hover:bg-amberGlow-hover text-charcoal font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Explore Vehicles
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-beige-dark/60 pb-4 overflow-x-auto text-xs">
          {[
            { id: 'wishlist', label: 'Saved Vehicles', count: savedVehicles.length, icon: Heart },
            { id: 'testDrives', label: 'Test Drive Bookings', count: testDriveBookings.length, icon: Calendar },
            { id: 'reservations', label: 'Reservations', count: reservations.length, icon: DollarSign },
            { id: 'inquiries', label: 'Inquiries & Offers', count: inquiries.length, icon: MessageSquare },
            { id: 'recent', label: 'Recently Viewed', count: recentVehicles.length, icon: Clock },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 rounded-xl font-semibold flex items-center space-x-2 shrink-0 transition-all ${
                  active 
                    ? 'bg-forest text-ivory shadow-sm' 
                    : 'bg-white text-charcoal-muted hover:text-charcoal border border-beige-dark/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-amberGlow' : ''}`} />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  active ? 'bg-amberGlow text-charcoal font-bold' : 'bg-ivory text-charcoal-muted'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          
          {/* 1. WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {savedVehicles.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-beige-dark/60 space-y-3">
                  <Heart className="w-10 h-10 text-charcoal-muted mx-auto" />
                  <h3 className="font-serif text-xl font-bold">No saved vehicles yet</h3>
                  <p className="text-xs text-charcoal-soft">Tap the heart icon on any vehicle card to save it to your private portfolio.</p>
                  <button onClick={() => setCurrentPage('explore')} className="text-xs text-forest font-bold hover:underline">
                    Browse Marketplace
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {savedVehicles.map(v => (
                    <VehicleCard key={v.id} vehicle={v} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. TEST DRIVE BOOKINGS */}
          {activeTab === 'testDrives' && (
            <div className="space-y-4">
              {testDriveBookings.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-beige-dark/60">
                  <p className="font-serif text-lg font-bold">No scheduled test drives</p>
                </div>
              ) : (
                testDriveBookings.map(b => (
                  <div key={b.id} className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-serif text-base font-bold text-charcoal">{b.vehicleName}</h4>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-muted">Showroom: <strong>{b.showroomName}</strong></p>
                      <p className="text-xs text-forest font-semibold flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amberGlow" />
                        <span>Scheduled: {b.preferredDate} at {b.preferredTime}</span>
                      </p>
                    </div>

                    <div className="text-right text-xs">
                      <span className="text-charcoal-muted">Booking Reference: </span>
                      <span className="font-mono font-bold text-forest">{b.id}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 3. RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              {reservations.map(r => (
                <div key={r.id} className="bg-white p-6 rounded-2xl border border-beige-dark/60 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-sage-700">Official Hold Request</span>
                      <h4 className="font-serif text-xl font-bold text-charcoal mt-0.5">{r.vehicleName}</h4>
                      <p className="text-xs text-charcoal-muted">{r.showroomName}</p>
                    </div>
                    <span className="text-xs uppercase font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {r.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-beige-dark/40 text-xs">
                    <div>
                      <span className="text-charcoal-muted">Refundable Token Amount:</span>
                      <p className="font-bold text-forest">₹{r.depositAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-charcoal-muted">Vehicle Quoted Price:</span>
                      <p className="font-bold text-forest">₹{(r.vehiclePrice / 100000).toFixed(2)} Lakh</p>
                    </div>
                    <div>
                      <span className="text-charcoal-muted">Reservation Order ID:</span>
                      <p className="font-mono font-bold text-forest">{r.id}</p>
                    </div>
                  </div>

                  {r.notes && (
                    <div className="bg-ivory p-3 rounded-xl text-xs text-charcoal-soft border border-beige-dark/50">
                      <strong>Showroom Dispatch Note:</strong> {r.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 4. INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {inquiries.map(inq => (
                <div key={inq.id} className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-sage-600">{inq.type}</span>
                      <h4 className="font-serif text-base font-bold text-charcoal">{inq.vehicleName}</h4>
                      <p className="text-xs text-charcoal-muted">Recipient: {inq.showroomName}</p>
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      inq.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-soft bg-ivory p-3 rounded-xl border border-beige-dark/40">
                    "{inq.message}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 5. RECENTLY VIEWED */}
          {activeTab === 'recent' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentVehicles.map(v => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

