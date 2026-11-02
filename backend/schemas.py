from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ShowroomOut(BaseModel):
    id: str
    name: str
    brandPartners: List[str]
    logo: str
    coverImage: str
    verified: bool
    state: str
    city: str
    district: str
    area: str
    address: str
    phone: str
    email: str
    businessHours: str
    rating: float
    reviewCount: int
    totalInventory: int
    description: str

    class Config:
        from_attributes = True

class VehicleOut(BaseModel):
    id: str
    brand: str
    model: str
    variant: str
    year: int
    price: float
    formattedPrice: str
    originalPrice: Optional[float] = None
    kilometres: int
    fuelType: str
    transmission: str
    bodyType: str
    condition: str
    state: str
    city: str
    district: str
    area: str
    showroomId: str
    showroomName: str
    showroomVerified: bool
    thumbnail: str
    images: List[str]
    engine: str
    horsepower: str
    torque: Optional[str] = None
    mileage: str
    seatingCapacity: int
    exteriorColor: str
    interiorColor: str
    description: str
    features: List[str]
    safetyFeatures: List[str]
    ownershipHistory: str
    status: str
    isFeatured: bool

    class Config:
        from_attributes = True

class VehicleCreate(BaseModel):
    brand: str
    model: str
    variant: str
    year: int
    price: float
    kilometres: int
    fuelType: str
    transmission: str
    bodyType: str
    condition: str
    city: str
    area: str
    showroomId: str
    thumbnail: str
    engine: Optional[str] = ""
    horsepower: Optional[str] = ""
    description: Optional[str] = ""

class InquiryCreate(BaseModel):
    vehicleId: str
    vehicleName: str
    showroomId: str
    showroomName: str
    customerName: str
    customerPhone: str
    customerEmail: str
    message: str
    type: Optional[str] = "Inquiry"

class TestDriveCreate(BaseModel):
    vehicleId: str
    vehicleName: str
    showroomId: str
    showroomName: str
    customerName: str
    customerPhone: str
    customerEmail: str
    preferredDate: str
    preferredTime: str

class ReservationCreate(BaseModel):
    vehicleId: str
    vehicleName: str
    vehiclePrice: float
    showroomId: str
    showroomName: str
    customerName: str
    customerPhone: str
    customerEmail: str
    depositAmount: float
    notes: Optional[str] = ""

