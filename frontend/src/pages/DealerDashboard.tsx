import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Car, 
  Plus, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Edit3, 
  Trash2,
  Eye,
  Check
} from 'lucide-react';
import { Vehicle } from '../types';

export const DealerDashboard: React.FC = () => {
  const { 
    currentUser, 
    showrooms, 
    vehicles, 
    inquiries, 
    testDriveBookings, 
    reservations, 
    updateVehicleStatus, 
    updateInquiryStatus, 
    updateBookingStatus, 
    openModal,
    navigateToVehicle 
  } = useApp();

  const showroom = showrooms.find(s => s.id === (currentUser.showroomId || 'sh-1')) || showrooms[0];
  const dealerVehicles = vehicles.filter(v => v.showroomId === showroom.id);
  const dealerInquiries = inquiries.filter(i => i.showroomId === showroom.id);
  const dealerBookings = testDriveBookings.filter(b => b.showroomId === showroom.id);
  const dealerReservations = reservations.filter(r => r.showroomId === showroom.id);

  const [activeTab, setActiveTab] = useState<'inventory' | 'inquiries' | 'bookings' | 'reservations'>('inventory');

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20 text-charcoal">
      
      {/* Dealer Portal Header */}
      <div className="bg-forest text-ivory py-10 px-4 sm:px-6 lg:px-8 border-b border-sage/20 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div className="flex items-center space-x-4">
            <img 
              src={showroom.logo} 
              alt={showroom.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amberGlow bg-white"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold">{showroom.name}</h1>
                {showroom.verified && (
                  <ShieldCheck className="w-5 h-5 text-emerald-400" title="Accredited Partner" />
                )}
              </div>
              <p className="text-xs text-sage-300 mt-1">
                Portal Principal: <strong>{currentUser.name}</strong> • {showroom.city}, {showroom.area}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => openModal('listCar')}
              className="bg-amberGlow hover:bg-amberGlow-hover text-charcoal font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-amber-glow flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle Listing</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dealership Analytics Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-charcoal-muted uppercase">Active Inventory</span>
              <Car className="w-4 h-4 text-forest" />
            </div>
            <p className="font-serif text-3xl font-bold text-forest mt-2">{dealerVehicles.length}</p>
            <p className="text-[11px] text-sage-600 mt-0.5">Vehicles currently live</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-charcoal-muted uppercase">Customer Inquiries</span>
              <MessageSquare className="w-4 h-4 text-amberGlow" />
            </div>
            <p className="font-serif text-3xl font-bold text-amberGlow mt-2">{dealerInquiries.length}</p>
            <p className="text-[11px] text-charcoal-muted mt-0.5">Direct buyer leads</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-charcoal-muted uppercase">Test Drive Requests</span>
              <Calendar className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-3xl font-bold text-emerald-700 mt-2">{dealerBookings.length}</p>
            <p className="text-[11px] text-charcoal-muted mt-0.5">Scheduled appointments</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-charcoal-muted uppercase">Priority Holds</span>
              <DollarSign className="w-4 h-4 text-amberGlow" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal mt-2">{dealerReservations.length}</p>
            <p className="text-[11px] text-charcoal-muted mt-0.5">Active reservations</p>
          </div>

        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 border-b border-beige-dark/60 pb-4 overflow-x-auto text-xs">
          {[
            { id: 'inventory', label: 'Vehicle Inventory', count: dealerVehicles.length, icon: Car },
            { id: 'inquiries', label: 'Buyer Inquiries', count: dealerInquiries.length, icon: MessageSquare },
            { id: 'bookings', label: 'Test Drives', count: dealerBookings.length, icon: Calendar },
            { id: 'reservations', label: 'Reservations', count: dealerReservations.length, icon: DollarSign },
          ].map(t => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`py-2 px-4 rounded-xl font-semibold flex items-center space-x-2 shrink-0 transition-all ${
                  active 
                    ? 'bg-forest text-ivory shadow-sm' 
                    : 'bg-white text-charcoal-muted hover:text-charcoal border border-beige-dark/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-amberGlow' : ''}`} />
                <span>{t.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  active ? 'bg-amberGlow text-charcoal font-bold' : 'bg-ivory text-charcoal-muted'
                }`}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          
          {/* 1. VEHICLE INVENTORY TABLE */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-3xl border border-beige-dark/60 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-beige-dark/50 flex justify-between items-center">
                <h3 className="font-serif text-lg font-bold text-charcoal">Showroom Inventory Management</h3>
                <button
                  onClick={() => openModal('listCar')}
                  className="bg-forest hover:bg-forest-light text-ivory px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5 text-amberGlow" />
                  <span>New Listing</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-ivory-dark text-sage-800 uppercase font-bold text-[10px] tracking-wider border-b border-beige-dark/60">
                    <tr>
                      <th className="p-4">Vehicle Details</th>
                      <th className="p-4">Condition</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Kilometres</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-beige-dark/40">
                    {dealerVehicles.map(car => (
                      <tr key={car.id} className="hover:bg-ivory/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img src={car.thumbnail} alt={car.model} className="w-12 h-9 rounded-lg object-cover" />
                            <div>
                              <p className="font-bold text-charcoal">{car.brand} {car.model}</p>
                              <p className="text-[11px] text-charcoal-muted">{car.variant} • {car.year}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-ivory border border-beige-dark">
                            {car.condition}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-forest">
                          {car.formattedPrice}
                        </td>
                        <td className="p-4 text-charcoal-muted">
                          {car.kilometres.toLocaleString()} km
                        </td>
                        <td className="p-4">
                          <select
                            value={car.status}
                            onChange={(e) => updateVehicleStatus(car.id, e.target.value as any)}
                            className="bg-ivory border border-beige-dark rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none"
                          >
                            <option value="Available">Available</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Sold">Sold</option>
                          </select>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => navigateToVehicle(car.id)}
                            className="p-1.5 rounded-lg bg-ivory hover:bg-beige text-charcoal"
                            title="View Public Listing"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. INQUIRIES MANAGEMENT */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {dealerInquiries.map(inq => (
                <div key={inq.id} className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-serif text-base font-bold text-charcoal">{inq.customerName}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-ivory font-bold uppercase border border-beige-dark">
                          {inq.type}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-muted mt-0.5">
                        Vehicle: <strong>{inq.vehicleName}</strong>
                      </p>
                      <p className="text-xs text-forest mt-0.5">
                        Phone: <a href={`tel:${inq.customerPhone}`} className="underline">{inq.customerPhone}</a> • Email: {inq.customerEmail}
                      </p>
                    </div>

                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                      className="bg-ivory border border-beige-dark rounded-lg px-2.5 py-1 text-xs font-semibold"
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <p className="text-xs text-charcoal bg-ivory p-3 rounded-xl border border-beige-dark/40">
                    "{inq.message}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 3. TEST DRIVE APPOINTMENTS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {dealerBookings.map(b => (
                <div key={b.id} className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="font-serif text-base font-bold text-charcoal">{b.customerName}</h4>
                    <p className="text-xs text-charcoal-muted">Vehicle: <strong>{b.vehicleName}</strong></p>
                    <p className="text-xs text-forest font-semibold">
                      Preferred Slot: {b.preferredDate} at {b.preferredTime}
                    </p>
                    <p className="text-xs text-charcoal-muted">Contact: {b.customerPhone}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                      className="bg-ivory border border-beige-dark rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                    >
                      <option value="Requested">Requested</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              {dealerReservations.map(r => (
                <div key={r.id} className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-base font-bold text-charcoal">{r.customerName}</h4>
                      <p className="text-xs text-charcoal-muted">Vehicle: {r.vehicleName}</p>
                      <p className="text-xs text-forest font-bold">Deposit Token: ₹{r.depositAmount.toLocaleString()}</p>
                    </div>
                    <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {r.status}
                    </span>
                  </div>
                  {r.notes && (
                    <p className="text-xs text-charcoal-soft bg-ivory p-2.5 rounded-xl border border-beige-dark/30">
                      Note: {r.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

