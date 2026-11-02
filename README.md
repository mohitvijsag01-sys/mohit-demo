# mohit-demo

# SAR CAR — Premium Automotive Marketplace

> **"FIND YOUR DRIVE. DISCOVER YOUR DESTINATION."**  
> *"More Than A Car. It's Your Next Chapter."*

SAR CAR is a production-grade, bespoke luxury car marketplace connecting automotive buyers directly with accredited showrooms and dealerships across Indian metros (Mumbai, Delhi NCR, Gurugram, Bengaluru, Hyderabad, Chennai).

---

## 1. Brand Identity & Design System

### Color Palette
- **Primary Sage Green**: `#879B83`
- **Deep Forest Green**: `#263C32`
- **Dark Walnut Brown**: `#49352B`
- **Rich Walnut**: `#654A3A`
- **Warm Amber Glow**: `#D49A45`
- **Ivory Cream**: `#F5F1E8`
- **Soft Beige**: `#E8E0D2`
- **Pure White**: `#FFFFFF`
- **Charcoal**: `#20231F`

### Typography Hierarchy
- **Headings & Display**: *Playfair Display* & *Cormorant Garamond* (Editorial Serif)
- **Body & Navigation**: *Inter* & *Manrope* (Contemporary Sans)
- **Prices & Numeric Metrics**: Modern clean sans-serif with INR formatting (`₹ Lakh` / `₹ Cr`)

---

## 2. Platform Architecture & Features

### Frontend (`/frontend`)
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom editorial tokens, luxury shadows, and glassmorphic navigation
- **Icons**: Lucide React
- **Pages & Modules**:
  1. **Homepage (`HomePage.tsx`)**:
     - Cinematic Forest Green hero with warm amber lighting.
     - 6-Parameter Search Console (City, Area, Brand, Model, Budget, Search Cars).
     - Quick filter chips (New Cars, Used Cars, Luxury Cars, SUVs, Sedans).
     - Popular Brand Carousel & Marque Grid.
     - Editorial 4-column Featured Luxury Vehicles grid.
     - SAR CAR 150-Point Inspection & Dealership Trust standards.
  2. **Explore Cars (`ExplorePage.tsx`)**:
     - Multi-faceted Real-time Filter Sidebar:
       - Location (City & Neighborhoods: Bandra, Golf Course Rd, UB City, Jubilee Hills, etc.)
       - Multi-brand selection
       - Budget slider (₹10 Lakh to ₹2.0+ Cr)
       - Body Types (SUV, Sedan, Luxury, Coupe, Hatchback, MPV)
       - Fuel Types (Petrol, Diesel, Electric, Hybrid, CNG)
       - Transmission (Automatic, Manual)
       - Condition (Brand New, Certified Pre-Owned, Used)
       - Manufacturing Year & Maximum Kilometres slider
     - Sorting: Recommended, Price Low to High, Price High to Low, Newest First.
     - Grid & List layout switcher.
     - Active clickable filter removal chips.
  3. **Vehicle Details (`VehicleDetailPage.tsx`)**:
     - High-res image gallery with thumbnail navigation.
     - Comprehensive engineering specs (engine displacement, horsepower, torque, mileage, seating, colors).
     - Factory equipment, cabin amenities & safety features.
     - Interactive EMI & Financing Calculator with live monthly installment projection.
     - Showroom card with direct line, business hours, and location map.
     - Sticky purchase action panel: Buy Now / Priority Order, Reserve This Car (refundable deposit), Book Private Test Drive, Contact Showroom & WhatsApp Direct Chat.
     - Similar inventory recommendations.
  4. **Vehicle Comparison Matrix (`ComparePage.tsx`)**:
     - Side-by-side comparison of up to 4 vehicles simultaneously.
     - Highlights best price value and top power output.
  5. **Showroom Directory & Profiles (`ShowroomsPage.tsx`, `ShowroomDetailPage.tsx`)**:
     - Directory of accredited dealerships with verification badges, ratings, and active inventory count.
     - Dedicated showroom profile with that showroom's specific vehicle fleet.
  6. **Customer Account Portal (`CustomerDashboard.tsx`)**:
     - Saved Vehicles / Wishlist.
     - Scheduled Test Drive Bookings with status tracking.
     - Formal Reservation Holds and order IDs.
     - Buyer Inquiries and negotiation notes.
     - Recently viewed vehicles.
  7. **Showroom / Dealer Portal (`DealerDashboard.tsx`)**:
     - Inventory Management: Add new listings, change vehicle price, toggle status (Available / Reserved / Sold).
     - Inquiries Manager with response status update.
     - Test Drive scheduler with appointment confirmation.
  8. **Marketplace Administration (`AdminDashboard.tsx`)**:
     - National marketplace overview (GMV, active inventory, registered dealerships).
     - Verification Queue: Approve or decline pending dealership consignments.
     - Marque catalog management.

---

### Backend (`/backend`)
- **Framework**: Python 3.11 + FastAPI + Uvicorn
- **Database**: SQLite (SQLAlchemy ORM, PostgreSQL-ready)
- **API Endpoints**:
  - `GET /api/vehicles`: Multi-parameter filtering (city, area, brand, budget, fuel, condition, body type).
  - `GET /api/vehicles/{id}`: Detailed vehicle retrieval.
  - `POST /api/vehicles`: Dealer vehicle listing creation.
  - `PUT /api/vehicles/{id}/status`: Inventory status transition.
  - `GET /api/showrooms`: Dealership directory.
  - `GET /api/showrooms/{id}`: Showroom profile & inventory.
  - `GET/POST /api/inquiries`: Customer showroom inquiry pipeline.
  - `GET/POST /api/test-drives`: Private test drive bookings.
  - `GET/POST /api/reservations`: Priority vehicle reservation requests.
  - `GET /api/admin/metrics`: Platform audit and KPIs.

---

## 3. How to Run Locally

### One-Click Launch (Windows)
Double-click `run_sarcar.bat` in the project root folder.

### Manual Launch

#### 1. Start Python Backend:
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```
- API Docs: `http://localhost:8000/docs`

#### 2. Start React Frontend:
```bash
cd frontend
npm run dev
```
- Web Application: `http://localhost:3000`

---

## 4. Instant Role Switching for Demonstrations
In the web application, use the **User Menu** (top-right) or the **Floating Role Switcher Pill** (bottom-left) to instantly toggle between:
1. **Customer View** (Portfolio, Wishlist, Test Drive Bookings, Hold Orders)
2. **Showroom Dealer View** (Inventory Manager, Buyer Leads, Listing Performance)
3. **Platform Admin View** (Marketplace Analytics, Verification Queue, Compliance)

