export type VehicleCondition = 'Brand New' | 'Certified Pre-Owned' | 'Used';
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
export type TransmissionType = 'Automatic' | 'Manual';
export type BodyType = 'SUV' | 'Sedan' | 'Hatchback' | 'Coupe' | 'Luxury' | 'MPV';
export type VehicleStatus = 'Available' | 'Reserved' | 'Sold';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number; // in INR
  formattedPrice: string;
  originalPrice?: number;
  kilometres: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  condition: VehicleCondition;
  state: string;
  city: string;
  district: string;
  area: string;
  showroomId: string;
  showroomName: string;
  showroomVerified: boolean;
  images: string[];
  thumbnail: string;
  engine: string;
  horsepower: string;
  torque?: string;
  mileage: string;
  seatingCapacity: number;
  exteriorColor: string;
  interiorColor: string;
  description: string;
  features: string[];
  safetyFeatures: string[];
  ownershipHistory: string;
  status: VehicleStatus;
  isFeatured?: boolean;
  createdAt: string;
}

export interface Showroom {
  id: string;
  name: string;
  brandPartners: string[];
  logo: string;
  coverImage: string;
  verified: boolean;
  state: string;
  city: string;
  district: string;
  area: string;
  address: string;
  phone: string;
  email: string;
  businessHours: string;
  rating: number;
  reviewCount: number;
  totalInventory: number;
  establishedYear: number;
  description: string;
  locationCoordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Inquiry {
  id: string;
  vehicleId: string;
  vehicleName: string;
  showroomId: string;
  showroomName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  message: string;
  type: 'Inquiry' | 'Callback' | 'Price Negotiation';
  status: 'New' | 'In Progress' | 'Contacted' | 'Closed';
  createdAt: string;
}

export interface TestDriveBooking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  showroomId: string;
  showroomName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  preferredDate: string;
  preferredTime: string;
  status: 'Requested' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Reservation {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehiclePrice: number;
  showroomId: string;
  showroomName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  depositAmount: number;
  status: 'Pending Review' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
}

export type UserRole = 'customer' | 'showroom' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  showroomId?: string;
  avatar?: string;
}

