from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import json

from database import engine, get_db, Base
from models import Showroom, Vehicle, Inquiry, TestDriveBooking, Reservation
from schemas import (
    ShowroomOut, VehicleOut, VehicleCreate,
    InquiryCreate, TestDriveCreate, ReservationCreate
)
from seed import seed_database

# Initialize database schema
Base.metadata.create_all(bind=engine)
# Populate seed data if empty
seed_database()

app = FastAPI(
    title="SAR CAR API",
    description="Production REST API for SAR CAR Luxury Automotive Marketplace",
    version="1.0.0"
)

# CORS middleware for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "brand": "SAR CAR",
        "tagline": "More Than A Car. It's Your Next Chapter.",
        "status": "online",
        "endpoints": [
            "/api/vehicles",
            "/api/showrooms",
            "/api/inquiries",
            "/api/test-drives",
            "/api/reservations",
            "/api/admin/metrics"
        ]
    }

# 1. VEHICLES ENDPOINTS
@app.get("/api/vehicles")
def get_vehicles(
    city: Optional[str] = None,
    area: Optional[str] = None,
    brand: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    fuel_type: Optional[str] = None,
    transmission: Optional[str] = None,
    condition: Optional[str] = None,
    body_type: Optional[str] = None,
    year: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Vehicle)

    if city and city != "All Cities":
        query = query.filter(Vehicle.city == city)
    if area and area != "All Areas":
        query = query.filter(Vehicle.area == area)
    if brand and brand != "All Brands":
        query = query.filter(Vehicle.brand == brand)
    if min_price is not None:
        query = query.filter(Vehicle.price >= min_price)
    if max_price is not None:
        query = query.filter(Vehicle.price <= max_price)
    if fuel_type:
        query = query.filter(Vehicle.fuel_type == fuel_type)
    if transmission:
        query = query.filter(Vehicle.transmission == transmission)
    if condition:
        query = query.filter(Vehicle.condition == condition)
    if body_type:
        query = query.filter(Vehicle.body_type == body_type)
    if year:
        query = query.filter(Vehicle.year == year)

    vehicles = query.all()
    results = []
    for v in vehicles:
        results.append({
            "id": v.id,
            "brand": v.brand,
            "model": v.model,
            "variant": v.variant,
            "year": v.year,
            "price": v.price,
            "formattedPrice": v.formatted_price,
            "originalPrice": v.original_price,
            "kilometres": v.kilometres,
            "fuelType": v.fuel_type,
            "transmission": v.transmission,
            "bodyType": v.body_type,
            "condition": v.condition,
            "state": v.state,
            "city": v.city,
            "district": v.district,
            "area": v.area,
            "showroomId": v.showroom_id,
            "showroomName": v.showroom_name,
            "showroomVerified": v.showroom_verified,
            "thumbnail": v.thumbnail,
            "images": v.images,
            "engine": v.engine,
            "horsepower": v.horsepower,
            "torque": v.torque,
            "mileage": v.mileage,
            "seatingCapacity": v.seating_capacity,
            "exteriorColor": v.exterior_color,
            "interiorColor": v.interior_color,
            "description": v.description,
            "features": v.features,
            "safetyFeatures": v.safety_features,
            "ownershipHistory": v.ownership_history,
            "status": v.status,
            "isFeatured": v.is_featured,
        })
    return results

@app.get("/api/vehicles/{vehicle_id}")
def get_vehicle_by_id(vehicle_id: str, db: Session = Depends(get_db)):
    v = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not v:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return {
        "id": v.id,
        "brand": v.brand,
        "model": v.model,
        "variant": v.variant,
        "year": v.year,
        "price": v.price,
        "formattedPrice": v.formatted_price,
        "originalPrice": v.original_price,
        "kilometres": v.kilometres,
        "fuelType": v.fuel_type,
        "transmission": v.transmission,
        "bodyType": v.body_type,
        "condition": v.condition,
        "state": v.state,
        "city": v.city,
        "district": v.district,
        "area": v.area,
        "showroomId": v.showroom_id,
        "showroomName": v.showroom_name,
        "showroomVerified": v.showroom_verified,
        "thumbnail": v.thumbnail,
        "images": v.images,
        "engine": v.engine,
        "horsepower": v.horsepower,
        "torque": v.torque,
        "mileage": v.mileage,
        "seatingCapacity": v.seating_capacity,
        "exteriorColor": v.exterior_color,
        "interiorColor": v.interior_color,
        "description": v.description,
        "features": v.features,
        "safetyFeatures": v.safety_features,
        "ownershipHistory": v.ownership_history,
        "status": v.status,
        "isFeatured": v.is_featured,
    }

@app.post("/api/vehicles")
def create_vehicle(data: VehicleCreate, db: Session = Depends(get_db)):
    showroom = db.query(Showroom).filter(Showroom.id == data.showroomId).first()
    if not showroom:
        raise HTTPException(status_code=404, detail="Showroom not found")

    formatted_price = f"₹{(data.price / 10000000):.2f} Cr" if data.price >= 10000000 else f"₹{(data.price / 100000):.2f} Lakh"

    new_car = Vehicle(
        id=f"car-{int(datetime.utcnow().timestamp())}",
        brand=data.brand,
        model=data.model,
        variant=data.variant,
        year=data.year,
        price=data.price,
        formatted_price=formatted_price,
        kilometres=data.kilometres,
        fuel_type=data.fuelType,
        transmission=data.transmission,
        body_type=data.bodyType,
        condition=data.condition,
        state=showroom.state,
        city=data.city,
        district=showroom.district,
        area=data.area,
        showroom_id=showroom.id,
        showroom_name=showroom.name,
        showroom_verified=showroom.verified,
        thumbnail=data.thumbnail,
        images_json=json.dumps([data.thumbnail]),
        engine=data.engine or "",
        horsepower=data.horsepower or "",
        description=data.description or "",
        features_json=json.dumps(["Panoramic Roof", "Surround Cameras", "Heated Seats"]),
        safety_features_json=json.dumps(["ESP", "Multiple Airbags", "Autonomous Braking"]),
        status="Available",
        is_featured=False
    )
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return {"status": "success", "vehicle_id": new_car.id}

@app.put("/api/vehicles/{vehicle_id}/status")
def update_vehicle_status(vehicle_id: str, status: str, db: Session = Depends(get_db)):
    v = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not v:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    v.status = status
    db.commit()
    return {"status": "success", "new_status": status}

# 2. SHOWROOMS ENDPOINTS
@app.get("/api/showrooms")
def get_showrooms(city: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Showroom)
    if city and city != "All":
        query = query.filter(Showroom.city == city)
    showrooms = query.all()
    results = []
    for s in showrooms:
        results.append({
            "id": s.id,
            "name": s.name,
            "brandPartners": s.brand_partners,
            "logo": s.logo,
            "coverImage": s.cover_image,
            "verified": s.verified,
            "state": s.state,
            "city": s.city,
            "district": s.district,
            "area": s.area,
            "address": s.address,
            "phone": s.phone,
            "email": s.email,
            "businessHours": s.business_hours,
            "rating": s.rating,
            "reviewCount": s.review_count,
            "totalInventory": s.total_inventory,
            "description": s.description,
        })
    return results

@app.get("/api/showrooms/{showroom_id}")
def get_showroom_by_id(showroom_id: str, db: Session = Depends(get_db)):
    s = db.query(Showroom).filter(Showroom.id == showroom_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Showroom not found")
    return {
        "id": s.id,
        "name": s.name,
        "brandPartners": s.brand_partners,
        "logo": s.logo,
        "coverImage": s.cover_image,
        "verified": s.verified,
        "state": s.state,
        "city": s.city,
        "district": s.district,
        "area": s.area,
        "address": s.address,
        "phone": s.phone,
        "email": s.email,
        "businessHours": s.business_hours,
        "rating": s.rating,
        "reviewCount": s.review_count,
        "totalInventory": s.total_inventory,
        "description": s.description,
    }

# 3. INQUIRIES ENDPOINTS
@app.get("/api/inquiries")
def get_inquiries(showroom_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Inquiry)
    if showroom_id:
        query = query.filter(Inquiry.showroom_id == showroom_id)
    return query.order_by(Inquiry.created_at.desc()).all()

@app.post("/api/inquiries")
def create_inquiry(data: InquiryCreate, db: Session = Depends(get_db)):
    new_inq = Inquiry(
        id=f"inq-{int(datetime.utcnow().timestamp())}",
        vehicle_id=data.vehicleId,
        vehicle_name=data.vehicleName,
        showroom_id=data.showroomId,
        showroom_name=data.showroomName,
        customer_name=data.customerName,
        customer_phone=data.customerPhone,
        customer_email=data.customerEmail,
        message=data.message,
        type=data.type or "Inquiry",
        status="New"
    )
    db.add(new_inq)
    db.commit()
    db.refresh(new_inq)
    return {"status": "success", "inquiry_id": new_inq.id}

# 4. TEST DRIVES ENDPOINTS
@app.get("/api/test-drives")
def get_test_drives(showroom_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(TestDriveBooking)
    if showroom_id:
        query = query.filter(TestDriveBooking.showroom_id == showroom_id)
    return query.order_by(TestDriveBooking.created_at.desc()).all()

@app.post("/api/test-drives")
def create_test_drive(data: TestDriveCreate, db: Session = Depends(get_db)):
    new_td = TestDriveBooking(
        id=f"td-{int(datetime.utcnow().timestamp())}",
        vehicle_id=data.vehicleId,
        vehicle_name=data.vehicleName,
        showroom_id=data.showroomId,
        showroom_name=data.showroomName,
        customer_name=data.customerName,
        customer_phone=data.customerPhone,
        customer_email=data.customerEmail,
        preferred_date=data.preferredDate,
        preferred_time=data.preferredTime,
        status="Requested"
    )
    db.add(new_td)
    db.commit()
    db.refresh(new_td)
    return {"status": "success", "booking_id": new_td.id}

# 5. RESERVATIONS ENDPOINTS
@app.get("/api/reservations")
def get_reservations(showroom_id: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Reservation)
    if showroom_id:
        query = query.filter(Reservation.showroom_id == showroom_id)
    return query.order_by(Reservation.created_at.desc()).all()

@app.post("/api/reservations")
def create_reservation(data: ReservationCreate, db: Session = Depends(get_db)):
    new_res = Reservation(
        id=f"res-{int(datetime.utcnow().timestamp())}",
        vehicle_id=data.vehicleId,
        vehicle_name=data.vehicleName,
        vehicle_price=data.vehiclePrice,
        showroom_id=data.showroomId,
        showroom_name=data.showroomName,
        customer_name=data.customerName,
        customer_phone=data.customerPhone,
        customer_email=data.customerEmail,
        deposit_amount=data.depositAmount,
        status="Pending Review",
        notes=data.notes or ""
    )
    db.add(new_res)
    db.commit()
    db.refresh(new_res)
    return {"status": "success", "reservation_id": new_res.id}

# 6. ADMIN METRICS ENDPOINT
@app.get("/api/admin/metrics")
def get_admin_metrics(db: Session = Depends(get_db)):
    total_showrooms = db.query(Showroom).count()
    total_vehicles = db.query(Vehicle).count()
    total_inquiries = db.query(Inquiry).count()
    total_reservations = db.query(Reservation).count()
    return {
        "totalShowrooms": total_showrooms,
        "totalVehicles": total_vehicles,
        "totalInquiries": total_inquiries,
        "totalReservations": total_reservations,
        "platformStatus": "Healthy & Online"
    }

