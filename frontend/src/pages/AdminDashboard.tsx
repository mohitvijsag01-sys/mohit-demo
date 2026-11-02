import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Car, 
  ShieldCheck, 
  DollarSign, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  FileText, 
  TrendingUp,
  Award,
  Search
} from 'lucide-react';
import { POPULAR_BRANDS } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { vehicles, showrooms, reservations, inquiries, updateVehicleStatus } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'dealers' | 'brands'>('overview');

  // Calculate high-level marketplace metrics
  const totalListingsValue = vehicles.reduce((sum, v) => sum + v.price, 0);
  const totalReservationsValue = reservations.reduce((sum, r) => sum + r.depositAmount, 0);

  // Verification queue (simulated pending listings)
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 'ver-1',
      type: 'Listing Verification',
      title: 'Mercedes-Benz Maybach S 680 (2024)',
      showroom: 'Apex Prestige Motoren',
      city: 'Mumbai',
      submittedAt: 'Today, 10:15 AM',
      price: '₹3.40 Cr',
      status: 'Pending Review'
    },
    {
      id: 'ver-2',
      type: 'Showroom Accreditation',
      title: 'Zenith Bespoke Automobili',
      showroom: 'Zenith Auto Group',
      city: 'Delhi NCR',
      submittedAt: 'Yesterday, 04:30 PM',
      price: '8 Multi-Brand Slots',
      status: 'Pending Review'
    }
  ]);

  const handleApprove = (id: string) => {
    setPendingVerifications(prev => prev.filter(item => item.id !== id));
    alert('Verification approved! The entity is now live with Verified accreditation.');
  };

  const handleReject = (id: string) => {
    setPendingVerifications(prev => prev.filter(item => item.id !== id));
    alert('Listing verification declined and returned to dealer with audit remarks.');
  };

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20 text-charcoal">
      
      {/* Admin Bar */}
      <div className="bg-forest-deep text-ivory py-10 px-4 sm:px-6 lg:px-8 border-b border-sage/20 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-amberGlow font-bold">
                SAR CAR National Marketplace Administration
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold mt-1">Platform Operations Center</h1>
            <p className="text-xs text-sage-300 mt-1">
              Multi-dealership compliance, accreditation audit, and transactional performance console.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs px-3 py-1.5 rounded-full bg-forest-light text-sage-200 border border-sage/30">
              System Health: 100% Operational
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-charcoal-muted uppercase">Total Showrooms</span>
              <Building2 className="w-4 h-4 text-forest" />
            </div>
            <p className="font-serif text-3xl font-bold text-forest mt-2">{showrooms.length}</p>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">100% Verified Partners</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-charcoal-muted uppercase">Active Inventory</span>
              <Car className="w-4 h-4 text-amberGlow" />
            </div>
            <p className="font-serif text-3xl font-bold text-charcoal mt-2">{vehicles.length}</p>
            <p className="text-[10px] text-sage-600 mt-1">Across 6 Metro Areas</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-charcoal-muted uppercase">Marketplace GMV</span>
              <TrendingUp className="w-4 h-4 text-forest" />
            </div>
            <p className="font-serif text-3xl font-bold text-forest mt-2">
              ₹{(totalListingsValue / 10000000).toFixed(1)} Cr
            </p>
            <p className="text-[10px] text-charcoal-muted mt-1">Verified Listing Valuation</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-charcoal-muted uppercase">Buyer Inquiries</span>
              <Users className="w-4 h-4 text-amberGlow" />
            </div>
            <p className="font-serif text-3xl font-bold text-amberGlow mt-2">{inquiries.length}</p>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">Direct inquiries</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold text-charcoal-muted uppercase">Security Holds</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-3xl font-bold text-emerald-700 mt-2">
              ₹{(totalReservationsValue / 100000).toFixed(1)} L
            </p>
            <p className="text-[10px] text-charcoal-muted mt-1">Refundable Deposits</p>
          </div>

        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 border-b border-beige-dark/60 pb-4 overflow-x-auto text-xs">
          {[
            { id: 'overview', label: 'Marketplace Inventory', icon: LayoutDashboard },
            { id: 'verifications', label: 'Verification Queue', count: pendingVerifications.length, icon: ShieldCheck },
            { id: 'dealers', label: 'Accredited Showrooms', count: showrooms.length, icon: Building2 },
            { id: 'brands', label: 'Marque Directory', count: POPULAR_BRANDS.length, icon: Award },
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
                {t.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    active ? 'bg-amberGlow text-charcoal font-bold' : 'bg-ivory text-charcoal-muted'
                  }`}>
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          
          {/* 1. OVERVIEW / ALL INVENTORY */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-3xl border border-beige-dark/60 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-beige-dark/50 flex justify-between items-center">
                <h3 className="font-serif text-lg font-bold text-charcoal">All Live Vehicles Across Showrooms</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-ivory-dark text-sage-800 uppercase font-bold text-[10px] tracking-wider border-b border-beige-dark/60">
                    <tr>
                      <th className="p-4">Car Model</th>
                      <th className="p-4">Showroom Partner</th>
                      <th className="p-4">City / Area</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Condition</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-beige-dark/40">
                    {vehicles.map(car => (
                      <tr key={car.id} className="hover:bg-ivory/50">
                        <td className="p-4">
                          <p className="font-bold text-charcoal">{car.brand} {car.model}</p>
                          <p className="text-[11px] text-charcoal-muted">{car.variant}</p>
                        </td>
                        <td className="p-4 font-medium text-charcoal">{car.showroomName}</td>
                        <td className="p-4 text-charcoal-muted">{car.city}, {car.area}</td>
                        <td className="p-4 font-bold text-forest">{car.formattedPrice}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-ivory border border-beige-dark">
                            {car.condition}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            car.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {car.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. VERIFICATION QUEUE */}
          {activeTab === 'verifications' && (
            <div className="space-y-4">
              {pendingVerifications.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-beige-dark/60">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <p className="font-serif text-lg font-bold">Verification queue cleared</p>
                  <p className="text-xs text-charcoal-muted">All incoming listings and showroom audits have been evaluated.</p>
                </div>
              ) : (
                pendingVerifications.map(item => (
                  <div key={item.id} className="bg-white p-5 rounded-2xl border border-beige-dark/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {item.type}
                        </span>
                        <h4 className="font-serif text-base font-bold text-charcoal">{item.title}</h4>
                      </div>
                      <p className="text-xs text-charcoal-muted">
                        Submitted by: <strong>{item.showroom}</strong> ({item.city}) • Value: {item.price}
                      </p>
                      <p className="text-[11px] text-sage-600">Timestamp: {item.submittedAt}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approve & Verify</span>
                      </button>

                      <button
                        onClick={() => handleReject(item.id)}
                        className="bg-white hover:bg-red-50 text-red-600 border border-red-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 3. SHOWROOMS MANAGEMENT */}
          {activeTab === 'dealers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {showrooms.map(s => (
                <div key={s.id} className="bg-white p-6 rounded-3xl border border-beige-dark/60 shadow-sm flex items-center space-x-4">
                  <img src={s.logo} alt={s.name} className="w-16 h-16 rounded-2xl object-cover border border-beige-dark" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <h4 className="font-serif text-base font-bold text-charcoal truncate">{s.name}</h4>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-xs text-charcoal-muted">{s.city}, {s.area}</p>
                    <p className="text-xs text-forest font-semibold mt-1">★ {s.rating} • {s.totalInventory} vehicles</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. BRANDS DIRECTORY */}
          {activeTab === 'brands' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {POPULAR_BRANDS.map(b => (
                <div key={b.name} className="bg-white p-4 rounded-2xl border border-beige-dark/60 text-center shadow-sm">
                  <h4 className="font-serif font-bold text-charcoal text-base">{b.name}</h4>
                  <p className="text-xs text-charcoal-muted mt-1">{b.count} Approved Listings</p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

