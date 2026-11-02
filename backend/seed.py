import json
from database import engine, SessionLocal, Base
from models import Showroom, Vehicle, Inquiry, TestDriveBooking, Reservation

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    if db.query(Showroom).count() > 0:
        print("Database already seeded.")
        db.close()
        return

    print("Seeding SAR CAR database...")

    # 1. Seed Showrooms
    showrooms_data = [
        Showroom(
            id="sh-1",
            name="Apex Prestige Motoren",
            brand_partners_json=json.dumps(["Mercedes-Benz", "Porsche", "BMW", "Audi"]),
            logo="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=200&q=80",
            cover_image="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
            verified=True,
            state="Maharashtra",
            city="Mumbai",
            district="Mumbai Suburban",
            area="Bandra West",
            address="Plot 42, Linking Road, Bandra West, Mumbai 400050",
            phone="+91 22 8490 2200",
            email="concierge@apexprestige.in",
            business_hours="Mon - Sun: 09:30 AM - 08:30 PM",
            rating=4.9,
            review_count=142,
            total_inventory=24,
            description="Western India’s premier certified luxury and performance vehicle sanctuary."
        ),
        Showroom(
            id="sh-2",
            name="Silver Star Capital Motoring",
            brand_partners_json=json.dumps(["Mercedes-Benz", "Land Rover", "BMW"]),
            logo="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=200&q=80",
            cover_image="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
            verified=True,
            state="Haryana",
            city="Gurugram",
            district="Gurugram",
            area="Golf Course Road",
            address="Tower B, One Horizon Center, Golf Course Road, Gurugram 122002",
            phone="+91 124 492 8800",
            email="sales@silverstardelhi.in",
            business_hours="Mon - Sun: 10:00 AM - 08:00 PM",
            rating=4.8,
            review_count=98,
            total_inventory=18,
            description="NCR’s leading executive automotive gallery featuring curated pre-owned and pristine collector editions."
        ),
        Showroom(
            id="sh-3",
            name="Kavya Heritage Autohaus",
            brand_partners_json=json.dumps(["Toyota", "Tata", "Mahindra", "Volkswagen"]),
            logo="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=200&q=80",
            cover_image="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
            verified=True,
            state="Karnataka",
            city="Bengaluru",
            district="Bengaluru Urban",
            area="Lavelle Road / UB City",
            address="Level 2, The Collection, UB City, Vittal Mallya Road, Bengaluru 560001",
            phone="+91 80 4112 9000",
            email="experience@kavyaluxury.com",
            business_hours="Mon - Sat: 10:00 AM - 09:00 PM",
            rating=4.9,
            review_count=184,
            total_inventory=32,
            description="Flagship South Indian destination for flagship premium SUVs and executive limousines."
        ),
        Showroom(
            id="sh-4",
            name="Regal Monarch Showroom",
            brand_partners_json=json.dumps(["Land Rover", "Audi", "Kia", "Hyundai"]),
            logo="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=200&q=80",
            cover_image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
            verified=True,
            state="Telangana",
            city="Hyderabad",
            district="Hyderabad",
            area="Jubilee Hills",
            address="Road No. 36, Jubilee Hills, Hyderabad 500033",
            phone="+91 40 6820 4400",
            email="info@regalmonarch.in",
            business_hours="Mon - Sun: 10:00 AM - 08:30 PM",
            rating=4.7,
            review_count=76,
            total_inventory=15,
            description="Celebrated high-end luxury dealership offering transparent multi-brand inventory."
        )
    ]

    for s in showrooms_data:
        db.add(s)
    db.commit()

    # 2. Seed Vehicles
    vehicles_data = [
        Vehicle(
            id="car-1",
            brand="Mercedes-Benz",
            model="GLC",
            variant="300 4MATIC Progressive Line",
            year=2024,
            price=7420000,
            formatted_price="₹74.20 Lakh",
            original_price=7650000,
            kilometres=4800,
            fuel_type="Petrol",
            transmission="Automatic",
            body_type="SUV",
            condition="Certified Pre-Owned",
            state="Maharashtra",
            city="Mumbai",
            district="Mumbai Suburban",
            area="Bandra West",
            showroom_id="sh-1",
            showroom_name="Apex Prestige Motoren",
            showroom_verified=True,
            thumbnail="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80",
            images_json=json.dumps([
                "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80",
                "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80"
            ]),
            engine="2.0L Turbocharged Inline-4 Mild Hybrid",
            horsepower="258 HP @ 5800 RPM",
            torque="400 Nm @ 2000-3200 RPM",
            mileage="14.7 kmpl",
            seating_capacity=5,
            exterior_color="Emerald Green Metallic",
            interior_color="Sienna Brown / Black Artico Leather",
            description="Immaculately maintained Mercedes-Benz GLC 300 4MATIC with 48V integrated starter generator, 11.9-inch portrait central display, and Burmester 3D Surround Sound.",
            features_json=json.dumps([
                "Burmester 3D Surround Sound System (710W)",
                "Panoramic Sliding Sunroof",
                "MBUX Augmented Reality Navigation",
                "360-Degree Camera with Transparent Bonnet View"
            ]),
            safety_features_json=json.dumps([
                "Active Brake Assist with Cross-Traffic Function",
                "Blind Spot Assist",
                "7 Supplemental Restraint Airbags"
            ]),
            ownership_history="1 Single Corporate Owner, Complete Authorised Dealer Service History.",
            status="Available",
            is_featured=True
        ),
        Vehicle(
            id="car-2",
            brand="BMW",
            model="X5",
            variant="xDrive40i M Sport Pro",
            year=2023,
            price=10850000,
            formatted_price="₹1.08 Cr",
            original_price=11200000,
            kilometres=11200,
            fuel_type="Petrol",
            transmission="Automatic",
            body_type="SUV",
            condition="Certified Pre-Owned",
            state="Haryana",
            city="Gurugram",
            district="Gurugram",
            area="Golf Course Road",
            showroom_id="sh-2",
            showroom_name="Silver Star Capital Motoring",
            showroom_verified=True,
            thumbnail="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
            images_json=json.dumps([
                "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80"
            ]),
            engine="3.0L BMW TwinPower Turbo Inline 6-Cylinder",
            horsepower="381 HP @ 5200 RPM",
            torque="520 Nm @ 1850-5000 RPM",
            mileage="12.0 kmpl",
            seating_capacity=5,
            exterior_color="Carbon Black Metallic",
            interior_color="Cognac Vernasca Perforated Leather",
            description="The definitive sports activity vehicle in immaculate M Sport trim with adaptive air suspension.",
            features_json=json.dumps(["Adaptive 2-Axle Air Suspension", "BMW Curved Display iDrive 8.5"]),
            safety_features_json=json.dumps(["Driving Assistant Professional", "Dynamic Stability Control"]),
            ownership_history="1 Diplomat Owner, Under BMW Secure Warranty.",
            status="Available",
            is_featured=True
        )
    ]

    for v in vehicles_data:
        db.add(v)
    db.commit()

    print("Seed completed successfully!")
    db.close()

if __name__ == "__main__":
    seed_database()

