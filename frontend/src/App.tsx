import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { BrandsPage } from './pages/BrandsPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { ComparePage } from './pages/ComparePage';
import { ShowroomsPage } from './pages/ShowroomsPage';
import { ShowroomDetailPage } from './pages/ShowroomDetailPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { DealerDashboard } from './pages/DealerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserCheck, Shield, Building2 } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { currentPage, currentUser, switchUserRole, setCurrentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'explore':
        return <ExplorePage />;
      case 'brands':
        return <BrandsPage />;
      case 'vehicle-detail':
        return <VehicleDetailPage />;
      case 'compare':
        return <ComparePage />;
      case 'showrooms':
        return <ShowroomsPage />;
      case 'showroom-detail':
        return <ShowroomDetailPage />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'dealer-dashboard':
        return <DealerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal font-sans">
      <Navbar />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />
      <Modals />

      {/* Floating Quick Role Switcher Pill (Bottom Left) for seamless testing */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center space-x-1 bg-charcoal/90 text-ivory backdrop-blur-md px-3 py-2 rounded-full border border-sage/30 shadow-luxury text-xs">
        <span className="text-[10px] text-sage-300 uppercase tracking-wider mr-1">Demo Role:</span>
        <button
          onClick={() => { switchUserRole('customer'); setCurrentPage('customer-dashboard'); }}
          className={`px-2 py-1 rounded-full text-[11px] font-medium transition-colors ${
            currentUser.role === 'customer' ? 'bg-amberGlow text-charcoal font-bold' : 'hover:text-white'
          }`}
        >
          Customer
        </button>
        <button
          onClick={() => { switchUserRole('showroom'); setCurrentPage('dealer-dashboard'); }}
          className={`px-2 py-1 rounded-full text-[11px] font-medium transition-colors ${
            currentUser.role === 'showroom' ? 'bg-amberGlow text-charcoal font-bold' : 'hover:text-white'
          }`}
        >
          Showroom Dealer
        </button>
        <button
          onClick={() => { switchUserRole('admin'); setCurrentPage('admin-dashboard'); }}
          className={`px-2 py-1 rounded-full text-[11px] font-medium transition-colors ${
            currentUser.role === 'admin' ? 'bg-amberGlow text-charcoal font-bold' : 'hover:text-white'
          }`}
        >
          Admin
        </button>
      </div>

    </div>
  );
};

export default function App() {
  return <AppContent />;
}

