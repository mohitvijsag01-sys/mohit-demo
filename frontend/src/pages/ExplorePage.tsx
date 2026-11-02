import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { POPULAR_BRANDS, CITIES_AND_AREAS } from '../data/mockData';
import { 
  Filter, 
  X, 
  RotateCcw, 
  Grid, 
  List, 
  SlidersHorizontal, 
  ChevronDown, 
  Search, 
  MapPin, 
  Tag, 
  Car, 
  Check,
  Building2,
  Gauge,
  Fuel,
  Cog,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Vehicle, BodyType, FuelType, TransmissionType, VehicleCondition } from '../types';

export const ExplorePage: React.FC = () => {
  const { 
    vehicles, 
    brandFilter, 
    navigateToBrand,
    selectedCity,
    setSelectedCity,
    selectedArea,
    setSelectedArea,
    navigateToVehicle,
    openModal
  } = useApp();

  // Search keyword
  const [searchTerm, setSearchTerm] = useState('');

  // Location filters
  const [filterCity, setFilterCity] = useState(selectedCity === 'All Cities' ? 'All' : selectedCity);
  const [filterArea, setFilterArea] = useState(selectedArea === 'All Areas' ? 'All' : selectedArea);

  // Brands (multi-select)
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    return brandFilter ? [brandFilter] : [];
  });

  // Price range (in INR Lakhs)
  const [maxPriceLakh, setMaxPriceLakh] = useState<number>(200); // Up to 200 Lakh (2 Cr)
  const [minPriceLakh, setMinPriceLakh] = useState<number>(10);

  // Body Type
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<BodyType[]>([]);

  // Fuel Type
  const [selectedFuels, setSelectedFuels] = useState<FuelType[]>([]);

  // Transmission
  const [selectedTransmissions, setSelectedTransmissions] = useState<TransmissionType[]>([]);

  // Condition
  const [selectedConditions, setSelectedConditions] = useState<VehicleCondition[]>([]);

  // Year filter
  const [selectedYear, setSelectedYear] = useState<string>('All');

  // Max KM filter
  const [maxKm, setMaxKm] = useState<number>(50000);

  // Sort
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'newest'>('recommended');

  // Layout view
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mobile filter drawer toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterCity('All');
    setFilterArea('All');
    setSelectedBrands([]);
    setMinPriceLakh(10);
    setMaxPriceLakh(200);
    setSelectedBodyTypes([]);
    setSelectedFuels([]);
    setSelectedTransmissions([]);
    setSelectedConditions([]);
    setSelectedYear('All');
    setMaxKm(50000);
    setSortBy('recommended');
  };

  // Toggle multi-select helpers
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleBodyType = (type: BodyType) => {
    setSelectedBodyTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleFuel = (fuel: FuelType) => {
    setSelectedFuels(prev =>
      prev.includes(fuel) ? prev.filter(f => f !== fuel) : [...prev, fuel]
    );
  };

  const toggleTransmission = (t: TransmissionType) => {
    setSelectedTransmissions(prev =>
      prev.includes(t) ? prev.filter(item => item !== t) : [...prev, t]
    );
  };

  const toggleCondition = (c: VehicleCondition) => {
    setSelectedConditions(prev =>
      prev.includes(c) ? prev.filter(item => item !== c) : [...prev, c]
    );
  };

  // Filter & Sort calculation
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const match = 
          v.brand.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query) ||
          v.variant.toLowerCase().includes(query) ||
          v.city.toLowerCase().includes(query) ||
          v.area.toLowerCase().includes(query);
        if (!match) return false;
      }

      // City & Area
      if (filterCity !== 'All' && v.city !== filterCity) return false;
      if (filterArea !== 'All' && v.area !== filterArea) return false;

      // Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(v.brand)) return false;

      // Price (convert INR to Lakh)
      const priceLakh = v.price / 100000;
      if (priceLakh < minPriceLakh || priceLakh > maxPriceLakh) return false;

      // Body Type
      if (selectedBodyTypes.length > 0 && !selectedBodyTypes.includes(v.bodyType)) return false;

      // Fuel
      if (selectedFuels.length > 0 && !selectedFuels.includes(v.fuelType)) return false;

      // Transmission
      if (selectedTransmissions.length > 0 && !selectedTransmissions.includes(v.transmission)) return false;

      // Condition
      if (selectedConditions.length > 0 && !selectedConditions.includes(v.condition)) return false;

      // Year
      if (selectedYear !== 'All' && v.year.toString() !== selectedYear) return false;

      // Kilometres
      if (v.kilometres > maxKm) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.year - a.year;
      return 0; // recommended
    });
  }, [
    vehicles, 
    searchTerm, 
    filterCity, 
    filterArea, 
    selectedBrands, 
    minPriceLakh, 
    maxPriceLakh, 
    selectedBodyTypes, 
    selectedFuels, 
    selectedTransmissions, 
    selectedConditions, 
    selectedYear, 
    maxKm, 
    sortBy
  ]);

  // Active filter count
  const activeFilterCount = 
    (filterCity !== 'All' ? 1 : 0) +
    (filterArea !== 'All' ? 1 : 0) +
    selectedBrands.length +
    (minPriceLakh > 10 || maxPriceLakh < 200 ? 1 : 0) +
    selectedBodyTypes.length +
    selectedFuels.length +
    selectedTransmissions.length +
    selectedConditions.length +
    (selectedYear !== 'All' ? 1 : 0) +
    (maxKm < 50000 ? 1 : 0);

  // Available areas for selected city
  const cityAreas = filterCity !== 'All' && CITIES_AND_AREAS[filterCity] 
    ? ['All', ...CITIES_AND_AREAS[filterCity]] 
    : ['All'];

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20">
      
      {/* Page Header */}
      <div className="bg-forest text-ivory py-12 px-4 sm:px-6 lg:px-8 border-b border-sage/20 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amberGlow font-semibold">
              Curated Automotive Exchange
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-1">
              Explore Available Vehicles
            </h1>
            <p className="text-sm text-sage-200 mt-2">
              Browse {vehicles.length} verified luxury and executive automobiles across India’s leading showrooms.
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <input
                type="text"
                placeholder="Search by brand, model, city..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-forest-light text-xs text-ivory placeholder-sage-400 pl-9 pr-4 py-2.5 rounded-full border border-sage/30 focus:outline-none focus:border-amberGlow"
              />
              <Search className="w-4 h-4 text-amberGlow absolute left-3 top-3" />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3 text-sage-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden bg-amberGlow text-charcoal px-4 py-2.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shrink-0"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters ({activeFilterCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ======================================================== */}
          {/* LEFT SIDEBAR FILTERS (Desktop) */}
          {/* ======================================================== */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-6 rounded-3xl border border-beige-dark/60 shadow-sm h-fit sticky top-28">
            
            <div className="flex items-center justify-between pb-4 border-b border-beige-dark/50">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-forest" />
                <h3 className="font-serif text-base font-bold text-charcoal">Filter Criteria</h3>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-amberGlow hover:text-amberGlow-dark font-medium flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFilterCount})</span>
                </button>
              )}
            </div>

            {/* 1. LOCATION FILTER */}
            <div className="space-y-3 pb-5 border-b border-beige-dark/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-800">
                Location & Area
              </label>
              
              <div>
                <span className="text-[11px] text-charcoal-muted">Select City</span>
                <select
                  value={filterCity}
                  onChange={e => {
                    setFilterCity(e.target.value);
                    setFilterArea('All');
                  }}
                  className="w-full mt-1 bg-ivory text-xs border border-beige-dark rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-amberGlow"
                >
                  <option value="All">All Cities in India</option>
                  {Object.keys(CITIES_AND_AREAS).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {filterCity !== 'All' && (
                <div>
                  <span className="text-[11px] text-charcoal-muted">Local Area / District</span>
                  <select
                    value={filterArea}
                    onChange={e => setFilterArea(e.target.value)}
                    className="w-full mt-1 bg-ivory text-xs border border-beige-dark rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-amberGlow"
                  >
                    {cityAreas.map(a => (
                      <option key={a} value={a}>{a === 'All' ? 'All Areas in ' + filterCity : a}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* 2. BRANDS MULTI-SELECT */}
            <div className="space-y-3 pb-5 border-b border-beige-dark/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-800">
                Brand / Manufacturer
              </label>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {POPULAR_BRANDS.map(b => {
                  const checked = selectedBrands.includes(b.name);
                  return (
                    <label 
                      key={b.name}
                      className="flex items-center justify-between text-xs text-charcoal hover:bg-ivory p-1.5 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleBrand(b.name)}
                          className="rounded text-forest focus:ring-forest"
                        />
                        <span className={checked ? 'font-semibold text-forest' : ''}>{b.name}</span>
                      </div>
                      <span className="text-[10px] text-charcoal-muted">{b.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. BUDGET RANGE SLIDER */}
            <div className="space-y-3 pb-5 border-b border-beige-dark/50">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold uppercase tracking-wider text-sage-800">
                  Budget (INR)
                </label>
                <span className="text-xs font-bold text-forest">
                  ₹{minPriceLakh}L – ₹{maxPriceLakh >= 200 ? '2.0+ Cr' : `${maxPriceLakh}L`}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={maxPriceLakh}
                onChange={e => setMaxPriceLakh(Number(e.target.value))}
                className="w-full accent-amberGlow cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-muted">
                <span>₹10 Lakh</span>
                <span>₹1.0 Cr</span>
                <span>₹2.0+ Cr</span>
              </div>
            </div>

            {/* 4. VEHICLE BODY TYPE */}
            <div className="space-y-3 pb-5 border-b border-beige-dark/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-800">
                Body Type
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['SUV', 'Sedan', 'Luxury', 'Coupe', 'Hatchback', 'MPV'] as BodyType[]).map(type => {
                  const active = selectedBodyTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleBodyType(type)}
                      className={`text-xs py-1.5 px-2 rounded-lg border text-left flex items-center justify-between transition-colors ${
                        active 
                          ? 'bg-forest text-ivory border-forest font-semibold' 
                          : 'bg-ivory hover:bg-beige text-charcoal border-beige-dark'
                      }`}
                    >
                      <span>{type}</span>
                      {active && <Check className="w-3 h-3 text-amberGlow" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. FUEL TYPE */}
            <div className="space-y-3 pb-5 border-b border-beige-dark/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-800">
                Fuel Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'] as FuelType[]).map(fuel => {
                  const active = selectedFuels.includes(fuel);
                  return (
                    <button
                      key={fuel}
                      type="button"
                      onClick={() => toggleFuel(fuel)}
                      className={`text-xs py-1 px-2.5 rounded-full border transition-colors ${
                        active 
                          ? 'bg-amberGlow text-charcoal border-amberGlow font-bold shadow-sm' 
                          : 'bg-ivory hover:bg-beige text-charcoal border-beige-dark'
                      }`}
                    >
                      {fuel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. TRANSMISSION */}
            <div className="space-y-3 pb-5 border-b border-beige-dark/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-800">
                Transmission
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Automatic', 'Manual'] as TransmissionType[]).map(t => {
                  const active = selectedTransmissions.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTransmission(t)}
                      className={`text-xs py-1.5 px-2 rounded-lg border text-center transition-colors ${
                        active 
                          ? 'bg-forest text-ivory border-forest font-semibold' 
                          : 'bg-ivory hover:bg-beige text-charcoal border-beige-dark'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. CONDITION */}
            <div className="space-y-3 pb-5 border-b border-beige-dark/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-800">
                Condition
              </label>
              <div className="space-y-1.5">
                {(['Brand New', 'Certified Pre-Owned', 'Used'] as VehicleCondition[]).map(c => {
                  const active = selectedConditions.includes(c);
                  return (
                    <label 
                      key={c}
                      className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer p-1 rounded hover:bg-ivory"
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleCondition(c)}
                        className="rounded text-forest focus:ring-forest"
                      />
                      <span className={active ? 'font-semibold text-forest' : ''}>{c}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 8. YEAR */}
            <div className="space-y-2 pb-5 border-b border-beige-dark/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-sage-800">
                Manufacturing Year
              </label>
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="w-full bg-ivory text-xs border border-beige-dark rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-amberGlow"
              >
                <option value="All">All Model Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>

            {/* 9. DISTANCE DRIVEN (KM) */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold uppercase tracking-wider text-sage-800">
                  Max Kilometres
                </label>
                <span className="text-xs font-bold text-forest">
                  {maxKm.toLocaleString()} km
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="50000"
                step="2000"
                value={maxKm}
                onChange={e => setMaxKm(Number(e.target.value))}
                className="w-full accent-forest cursor-pointer"
              />
            </div>

          </aside>

          {/* ======================================================== */}
          {/* RIGHT: RESULTS & TOOLBAR */}
          {/* ======================================================== */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar: Active Chips, Counter, Sort & View Switcher */}
            <div className="bg-white p-4 rounded-2xl border border-beige-dark/60 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-charcoal">
                  {filteredVehicles.length}
                </span>
                <span className="text-xs text-charcoal-muted">
                  luxury vehicle{filteredVehicles.length === 1 ? '' : 's'} matching criteria
                </span>
              </div>

              <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
                
                {/* Sort dropdown */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-charcoal-muted hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="bg-ivory text-xs font-medium border border-beige-dark rounded-xl px-3 py-2 text-charcoal focus:outline-none focus:border-amberGlow"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                {/* Grid / List View Toggle */}
                <div className="flex items-center border border-beige-dark rounded-xl p-1 bg-ivory">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-forest text-ivory' : 'text-charcoal-muted hover:text-charcoal'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-forest text-ivory' : 'text-charcoal-muted hover:text-charcoal'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-charcoal-muted uppercase">Active:</span>
                
                {filterCity !== 'All' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-forest text-ivory text-xs">
                    <span>City: {filterCity}</span>
                    <button onClick={() => setFilterCity('All')}><X className="w-3 h-3 hover:text-amberGlow" /></button>
                  </span>
                )}

                {filterArea !== 'All' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-forest text-ivory text-xs">
                    <span>Area: {filterArea}</span>
                    <button onClick={() => setFilterArea('All')}><X className="w-3 h-3 hover:text-amberGlow" /></button>
                  </span>
                )}

                {selectedBrands.map(b => (
                  <span key={b} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amberGlow text-charcoal font-semibold text-xs">
                    <span>{b}</span>
                    <button onClick={() => toggleBrand(b)}><X className="w-3 h-3" /></button>
                  </span>
                ))}

                {selectedBodyTypes.map(t => (
                  <span key={t} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-ivory-dark border border-beige-dark text-charcoal text-xs">
                    <span>{t}</span>
                    <button onClick={() => toggleBodyType(t)}><X className="w-3 h-3" /></button>
                  </span>
                ))}

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-red-600 hover:underline font-medium ml-2"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Vehicle Results Grid or List */}
            {filteredVehicles.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-beige-dark/60 space-y-4">
                <div className="w-16 h-16 rounded-full bg-ivory-dark text-charcoal-muted flex items-center justify-center mx-auto">
                  <Car className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-charcoal">No Vehicles Found</h3>
                <p className="text-sm text-charcoal-soft max-w-md mx-auto">
                  We could not find any automobiles matching your specific filter criteria. Try expanding your budget range or clearing select filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-forest hover:bg-forest-light text-ivory px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map(vehicle => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              /* LIST VIEW MODE */
              <div className="space-y-4">
                {filteredVehicles.map(vehicle => (
                  <div
                    key={vehicle.id}
                    onClick={() => navigateToVehicle(vehicle.id)}
                    className="group bg-white rounded-2xl overflow-hidden border border-beige-dark/60 hover:border-amberGlow/60 hover:shadow-luxury transition-all duration-300 p-4 sm:p-5 flex flex-col md:flex-row gap-6 cursor-pointer"
                  >
                    <div className="w-full md:w-64 aspect-[16/10] overflow-hidden rounded-xl bg-forest-light shrink-0 relative">
                      <img 
                        src={vehicle.thumbnail} 
                        alt={vehicle.model} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] uppercase font-bold rounded-full bg-forest text-ivory">
                        {vehicle.condition}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs uppercase tracking-wider text-sage-600 font-semibold">
                              {vehicle.brand} • {vehicle.year}
                            </span>
                            <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-forest transition-colors">
                              {vehicle.model} <span className="text-xs font-normal font-sans text-charcoal-muted">({vehicle.variant})</span>
                            </h3>
                          </div>
                          <span className="font-serif text-xl font-bold text-forest">
                            {vehicle.formattedPrice}
                          </span>
                        </div>

                        <p className="text-xs text-charcoal-soft line-clamp-2 mt-2 leading-relaxed">
                          {vehicle.description}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-beige-dark/40 text-xs text-charcoal-muted">
                          <div className="flex items-center space-x-1.5">
                            <Gauge className="w-3.5 h-3.5 text-sage-600" />
                            <span>{vehicle.kilometres.toLocaleString()} km</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <Fuel className="w-3.5 h-3.5 text-sage-600" />
                            <span>{vehicle.fuelType}</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <Cog className="w-3.5 h-3.5 text-sage-600" />
                            <span>{vehicle.transmission}</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <MapPin className="w-3.5 h-3.5 text-sage-600" />
                            <span className="truncate">{vehicle.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 flex items-center justify-between border-t border-beige-dark/30">
                        <div className="flex items-center space-x-1.5 text-xs text-charcoal font-medium">
                          <Building2 className="w-3.5 h-3.5 text-sage-600" />
                          <span>{vehicle.showroomName}</span>
                          {vehicle.showroomVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal('contact', vehicle);
                            }}
                            className="bg-forest text-ivory hover:bg-forest-light px-4 py-1.5 rounded-xl text-xs font-semibold"
                          >
                            Contact Showroom
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

          </main>

        </div>

      </div>

    </div>
  );
};

