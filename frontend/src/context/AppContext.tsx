import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, Showroom, Inquiry, TestDriveBooking, Reservation, User, UserRole } from '../types';
import { VEHICLES_DATA, SHOWROOMS_DATA } from '../data/mockData';

interface AppContextType {
  vehicles: Vehicle[];
  showrooms: Showroom[];
  wishlist: string[];
  comparisonList: string[];
  recentlyViewed: string[];
  inquiries: Inquiry[];
  testDriveBookings: TestDriveBooking[];
  reservations: Reservation[];
  currentUser: User;
  selectedCity: string;
  selectedArea: string;
  
  // Navigation
  currentPage: string;
  selectedVehicleId: string | null;
  selectedShowroomId: string | null;
  brandFilter: string | null;
  
  // Actions
  setCurrentPage: (page: string) => void;
  navigateToVehicle: (id: string) => void;
  navigateToShowroom: (id: string) => void;
  navigateToBrand: (brand: string) => void;
  setSelectedCity: (city: string) => void;
  setSelectedArea: (area: string) => void;
  
  toggleWishlist: (vehicleId: string) => void;
  isInWishlist: (vehicleId: string) => boolean;
  
  addToComparison: (vehicleId: string) => boolean;
  removeFromComparison: (vehicleId: string) => void;
  isInComparison: (vehicleId: string) => boolean;
  clearComparison: () => void;
  
  addRecentlyViewed: (vehicleId: string) => void;
  
  switchUserRole: (role: UserRole) => void;
  
  // Modals
  modalState: {
    isOpen: boolean;
    type: 'contact' | 'testDrive' | 'reserve' | 'auth' | 'listCar' | null;
    targetVehicle?: Vehicle;
    targetShowroom?: Showroom;
  };
  openModal: (type: 'contact' | 'testDrive' | 'reserve' | 'auth' | 'listCar', vehicle?: Vehicle, showroom?: Showroom) => void;
  closeModal: () => void;
  
  // Data submission
  submitInquiry: (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  submitTestDrive: (bookingData: Omit<TestDriveBooking, 'id' | 'createdAt' | 'status'>) => void;
  submitReservation: (reservationData: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => void;
  addVehicle: (newVehicle: Omit<Vehicle, 'id' | 'createdAt'>) => void;
  updateVehicleStatus: (vehicleId: string, status: Vehicle['status']) => void;
  updateInquiryStatus: (inquiryId: string, status: Inquiry['status']) => void;
  updateBookingStatus: (bookingId: string, status: TestDriveBooking['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('sarcar_vehicles');
    return saved ? JSON.parse(saved) : VEHICLES_DATA;
  });

  const [showrooms] = useState<Showroom[]>(SHOWROOMS_DATA);
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('sarcar_wishlist');
    return saved ? JSON.parse(saved) : ['car-1', 'car-6'];
  });

  const [comparisonList, setComparisonList] = useState<string[]>(() => {
    const saved = localStorage.getItem('sarcar_comparison');
    return saved ? JSON.parse(saved) : ['car-1', 'car-4'];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(['car-1', 'car-2', 'car-5']);

  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: 'inq-101',
      vehicleId: 'car-1',
      vehicleName: 'Mercedes-Benz GLC 300 4MATIC',
      showroomId: 'sh-1',
      showroomName: 'Apex Prestige Motoren',
      customerName: 'Aditya Singhania',
      customerPhone: '+91 98201 55432',
      customerEmail: 'aditya.singhania@apexcorp.com',
      message: 'Looking to schedule a viewing this Friday afternoon. Please share on-road documentation details.',
      type: 'Price Negotiation',
      status: 'In Progress',
      createdAt: '2026-11-01T14:20:00Z'
    },
    {
      id: 'inq-102',
      vehicleId: 'car-2',
      vehicleName: 'BMW X5 xDrive40i M Sport Pro',
      showroomId: 'sh-2',
      showroomName: 'Silver Star Capital Motoring',
      customerName: 'Vikramaditya Roy',
      customerPhone: '+91 98110 88776',
      customerEmail: 'v.roy@capitalgroup.in',
      message: 'Is corporate lease transfer or GST invoice assistance available on this vehicle?',
      type: 'Inquiry',
      status: 'New',
      createdAt: '2026-11-02T09:10:00Z'
    }
  ]);

  const [testDriveBookings, setTestDriveBookings] = useState<TestDriveBooking[]>([
    {
      id: 'td-501',
      vehicleId: 'car-6',
      vehicleName: 'Porsche Macan GTS V6 Bi-Turbo',
      showroomId: 'sh-1',
      showroomName: 'Apex Prestige Motoren',
      customerName: 'Aditya Singhania',
      customerPhone: '+91 98201 55432',
      customerEmail: 'aditya.singhania@apexcorp.com',
      preferredDate: '2026-11-04',
      preferredTime: '11:00 AM',
      status: 'Confirmed',
      createdAt: '2026-11-01T16:00:00Z'
    }
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'res-901',
      vehicleId: 'car-5',
      vehicleName: 'Range Rover Velar Dynamic SE',
      vehiclePrice: 9430000,
      showroomId: 'sh-1',
      showroomName: 'Apex Prestige Motoren',
      customerName: 'Karan Mehra',
      customerPhone: '+91 99887 66554',
      customerEmail: 'karan.mehra@mehraholdings.com',
      depositAmount: 100000,
      status: 'Confirmed',
      notes: 'Customer requesting delivery before Diwali. Showroom PDI inspection completed.',
      createdAt: '2026-10-30T11:45:00Z'
    }
  ]);

  const [currentUser, setCurrentUser] = useState<User>({
    id: 'usr-customer-1',
    name: 'Aditya Singhania',
    email: 'aditya.singhania@apexcorp.com',
    phone: '+91 98201 55432',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedArea, setSelectedArea] = useState<string>('All Areas');
  
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [selectedShowroomId, setSelectedShowroomId] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string | null>(null);

  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'contact' | 'testDrive' | 'reserve' | 'auth' | 'listCar' | null;
    targetVehicle?: Vehicle;
    targetShowroom?: Showroom;
  }>({
    isOpen: false,
    type: null,
  });

  useEffect(() => {
    localStorage.setItem('sarcar_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('sarcar_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('sarcar_comparison', JSON.stringify(comparisonList));
  }, [comparisonList]);

  const toggleWishlist = (vehicleId: string) => {
    setWishlist(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const isInWishlist = (vehicleId: string) => wishlist.includes(vehicleId);

  const addToComparison = (vehicleId: string): boolean => {
    if (comparisonList.includes(vehicleId)) return true;
    if (comparisonList.length >= 4) {
      alert('You can compare a maximum of 4 vehicles at a time.');
      return false;
    }
    setComparisonList(prev => [...prev, vehicleId]);
    return true;
  };

  const removeFromComparison = (vehicleId: string) => {
    setComparisonList(prev => prev.filter(id => id !== vehicleId));
  };

  const isInComparison = (vehicleId: string) => comparisonList.includes(vehicleId);

  const clearComparison = () => setComparisonList([]);

  const addRecentlyViewed = (vehicleId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== vehicleId);
      return [vehicleId, ...filtered].slice(0, 8);
    });
  };

  const navigateToVehicle = (id: string) => {
    setSelectedVehicleId(id);
    addRecentlyViewed(id);
    setCurrentPage('vehicle-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShowroom = (id: string) => {
    setSelectedShowroomId(id);
    setCurrentPage('showroom-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBrand = (brand: string) => {
    setBrandFilter(brand);
    setCurrentPage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchUserRole = (role: UserRole) => {
    if (role === 'customer') {
      setCurrentUser({
        id: 'usr-customer-1',
        name: 'Aditya Singhania',
        email: 'aditya.singhania@apexcorp.com',
        phone: '+91 98201 55432',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      });
    } else if (role === 'showroom') {
      setCurrentUser({
        id: 'usr-dealer-1',
        name: 'Rajesh Varma (Dealer Principal)',
        email: 'rajesh@apexprestige.in',
        phone: '+91 98200 11223',
        role: 'showroom',
        showroomId: 'sh-1',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      });
    } else {
      setCurrentUser({
        id: 'usr-admin-1',
        name: 'Victoria Hastings (SAR CAR Admin)',
        email: 'admin@sarcar.luxury',
        phone: '+91 11 4455 6677',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
      });
    }
  };

  const openModal = (type: 'contact' | 'testDrive' | 'reserve' | 'auth' | 'listCar', vehicle?: Vehicle, showroom?: Showroom) => {
    setModalState({
      isOpen: true,
      type,
      targetVehicle: vehicle,
      targetShowroom: showroom,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      targetVehicle: undefined,
      targetShowroom: undefined,
    });
  };

  const submitInquiry = (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    setInquiries(prev => [newInq, ...prev]);
  };

  const submitTestDrive = (bookingData: Omit<TestDriveBooking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: TestDriveBooking = {
      ...bookingData,
      id: `td-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'Requested',
    };
    setTestDriveBookings(prev => [newBooking, ...prev]);
  };

  const submitReservation = (reservationData: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => {
    const newRes: Reservation = {
      ...reservationData,
      id: `res-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending Review',
    };
    setReservations(prev => [newRes, ...prev]);
  };

  const addVehicle = (newVehicleData: Omit<Vehicle, 'id' | 'createdAt'>) => {
    const newCar: Vehicle = {
      ...newVehicleData,
      id: `car-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setVehicles(prev => [newCar, ...prev]);
  };

  const updateVehicleStatus = (vehicleId: string, status: Vehicle['status']) => {
    setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, status } : v));
  };

  const updateInquiryStatus = (inquiryId: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(i => i.id === inquiryId ? { ...i, status } : i));
  };

  const updateBookingStatus = (bookingId: string, status: TestDriveBooking['status']) => {
    setTestDriveBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  return (
    <AppContext.Provider
      value={{
        vehicles,
        showrooms,
        wishlist,
        comparisonList,
        recentlyViewed,
        inquiries,
        testDriveBookings,
        reservations,
        currentUser,
        selectedCity,
        selectedArea,
        currentPage,
        selectedVehicleId,
        selectedShowroomId,
        brandFilter,
        setCurrentPage,
        navigateToVehicle,
        navigateToShowroom,
        navigateToBrand,
        setSelectedCity,
        setSelectedArea,
        toggleWishlist,
        isInWishlist,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
        addRecentlyViewed,
        switchUserRole,
        modalState,
        openModal,
        closeModal,
        submitInquiry,
        submitTestDrive,
        submitReservation,
        addVehicle,
        updateVehicleStatus,
        updateInquiryStatus,
        updateBookingStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

