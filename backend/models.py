import json
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Showroom(Base):
    __tablename__ = "showrooms"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    brand_partners_json = Column(Text, default="[]")
    logo = Column(String, nullable=False)
    cover_image = Column(String, nullable=False)
    verified = Column(Boolean, default=True)
    state = Column(String, nullable=False)
    city = Column(String, index=True, nullable=False)
    district = Column(String, nullable=False)
    area = Column(String, index=True, nullable=False)
    address = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    business_hours = Column(String, default="Mon - Sun: 10:00 AM - 08:00 PM")
    rating = Column(Float, default=4.8)
    review_count = Column(Integer, default=50)
    total_inventory = Column(Integer, default=10)
    description = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    vehicles = relationship("Vehicle", back_populates="showroom")

    @property
    def brand_partners(self):
        try:
            return json.loads(self.brand_partners_json)
        except Exception:
            return []

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(String, primary_key=True, index=True)
    brand = Column(String, index=True, nullable=False)
    model = Column(String, index=True, nullable=False)
    variant = Column(String, nullable=False)
    year = Column(Integer, index=True, nullable=False)
    price = Column(Float, index=True, nullable=False) # INR
    formatted_price = Column(String, nullable=False)
    original_price = Column(Float, nullable=True)
    kilometres = Column(Integer, nullable=False)
    fuel_type = Column(String, index=True, nullable=False)
    transmission = Column(String, index=True, nullable=False)
    body_type = Column(String, index=True, nullable=False)
    condition = Column(String, index=True, nullable=False)
    state = Column(String, nullable=False)
    city = Column(String, index=True, nullable=False)
    district = Column(String, nullable=False)
    area = Column(String, index=True, nullable=False)
    
    showroom_id = Column(String, ForeignKey("showrooms.id"), nullable=False)
    showroom_name = Column(String, nullable=False)
    showroom_verified = Column(Boolean, default=True)
    
    thumbnail = Column(String, nullable=False)
    images_json = Column(Text, default="[]")
    
    engine = Column(String, default="")
    horsepower = Column(String, default="")
    torque = Column(String, default="")
    mileage = Column(String, default="")
    seating_capacity = Column(Integer, default=5)
    exterior_color = Column(String, default="")
    interior_color = Column(String, default="")
    description = Column(Text, default="")
    features_json = Column(Text, default="[]")
    safety_features_json = Column(Text, default="[]")
    ownership_history = Column(Text, default="")
    status = Column(String, default="Available")
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    showroom = relationship("Showroom", back_populates="vehicles")

    @property
    def images(self):
        try:
            return json.loads(self.images_json)
        except Exception:
            return []

    @property
    def features(self):
        try:
            return json.loads(self.features_json)
        except Exception:
            return []

    @property
    def safety_features(self):
        try:
            return json.loads(self.safety_features_json)
        except Exception:
            return []

class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(String, primary_key=True, index=True)
    vehicle_id = Column(String, nullable=False)
    vehicle_name = Column(String, nullable=False)
    showroom_id = Column(String, nullable=False)
    showroom_name = Column(String, nullable=False)
    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    message = Column(Text, default="")
    type = Column(String, default="Inquiry")
    status = Column(String, default="New")
    created_at = Column(DateTime, default=datetime.utcnow)

class TestDriveBooking(Base):
    __tablename__ = "test_drive_bookings"

    id = Column(String, primary_key=True, index=True)
    vehicle_id = Column(String, nullable=False)
    vehicle_name = Column(String, nullable=False)
    showroom_id = Column(String, nullable=False)
    showroom_name = Column(String, nullable=False)
    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    preferred_date = Column(String, nullable=False)
    preferred_time = Column(String, nullable=False)
    status = Column(String, default="Requested")
    created_at = Column(DateTime, default=datetime.utcnow)

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(String, primary_key=True, index=True)
    vehicle_id = Column(String, nullable=False)
    vehicle_name = Column(String, nullable=False)
    vehicle_price = Column(Float, nullable=False)
    showroom_id = Column(String, nullable=False)
    showroom_name = Column(String, nullable=False)
    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    deposit_amount = Column(Float, default=100000)
    status = Column(String, default="Pending Review")
    notes = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

