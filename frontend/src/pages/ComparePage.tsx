import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Plus, 
  Check, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  Award
} from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { 
    vehicles, 
    comparisonList, 
    removeFromComparison, 
    clearComparison, 
    navigateToVehicle, 
    openModal,
    setCurrentPage,
    addToComparison
  } = useApp();

  const comparedVehicles = vehicles.filter(v => comparisonList.includes(v.id));

  // Determine lowest price among compared vehicles for highlight
  const lowestPrice = comparedVehicles.length > 0 
    ? Math.min(...comparedVehicles.map(v => v.price))
    : 0;

  // Highest horsepower for highlight
  const highestHp = comparedVehicles.length > 0
    ? Math.max(...comparedVehicles.map(v => parseInt(v.horsepower) || 0))
    : 0;

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20">
      
      {/* Header */}
      <div className="bg-forest text-ivory py-12 px-4 sm:px-6 lg:px-8 border-b border-sage/20 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-amberGlow font-semibold">
              Side-by-Side Evaluation
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-1">
              Vehicle Comparison
            </h1>
            <p className="text-sm text-sage-200 mt-2">
              Compare up to 4 models across engineering specifications, luxury amenities, safety ratings, and verified pricing.
            </p>
          </div>

          {comparedVehicles.length > 0 && (
            <button
              onClick={clearComparison}
              className="px-4 py-2 rounded-full bg-forest-light text-xs text-sage-200 hover:text-white border border-sage/30 transition-colors"
            >
              Clear Comparison Matrix
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {comparedVehicles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-beige-dark/60 max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-ivory-dark text-charcoal-muted flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-amberGlow" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal">No Vehicles Selected for Comparison</h3>
            <p className="text-sm text-charcoal-soft leading-relaxed">
              Select up to 4 luxury vehicles from our showroom catalog to perform an in-depth side-by-side comparison of engineering specs, features, and dealer offers.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('explore')}
                className="bg-forest hover:bg-forest-light text-ivory px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Browse Vehicle Catalog
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto pb-8">
            <div className="min-w-[800px] bg-white rounded-3xl border border-beige-dark/60 shadow-sm overflow-hidden">
              
              {/* TOP ROW: VEHICLE HEADER CARDS */}
              <div className="grid grid-cols-5 border-b border-beige-dark/60">
                
                {/* Metric Label Column */}
                <div className="p-6 bg-ivory-dark border-r border-beige-dark/60 flex flex-col justify-end">
                  <span className="text-xs uppercase tracking-wider font-bold text-sage-800">
                    Vehicle Specifications
                  </span>
                  <p className="text-[11px] text-charcoal-muted mt-1">
                    Comparing {comparedVehicles.length} of 4 slots
                  </p>
                </div>

                {/* 4 Slots */}
                {[0, 1, 2, 3].map(slotIndex => {
                  const car = comparedVehicles[slotIndex];
                  if (!car) {
                    return (
                      <div 
                        key={slotIndex} 
                        className="p-6 border-r last:border-r-0 border-beige-dark/60 flex flex-col items-center justify-center text-center bg-ivory-soft/50 min-h-[260px]"
                      >
                        <div 
                          onClick={() => setCurrentPage('explore')}
                          className="w-12 h-12 rounded-full border-2 border-dashed border-beige-dark flex items-center justify-center text-charcoal-muted hover:border-amberGlow hover:text-amberGlow cursor-pointer transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-semibold text-charcoal-muted mt-2">Add Vehicle</p>
                        <button
                          onClick={() => setCurrentPage('explore')}
                          className="text-[11px] text-forest hover:underline mt-1"
                        >
                          Browse Catalog
                        </button>
                      </div>
                    );
                  }

                  const isBestPrice = car.price === lowestPrice;

                  return (
                    <div key={car.id} className="p-5 border-r last:border-r-0 border-beige-dark/60 relative flex flex-col justify-between">
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromComparison(car.id)}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-charcoal/10 hover:bg-charcoal/20 flex items-center justify-center text-charcoal transition-colors"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Best Price Ribbon if applicable */}
                      {isBestPrice && comparedVehicles.length > 1 && (
                        <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>Best Value</span>
                        </div>
                      )}

                      <div className="space-y-3 pt-4">
                        <div 
                          onClick={() => navigateToVehicle(car.id)}
                          className="aspect-[16/10] rounded-xl overflow-hidden bg-forest-light cursor-pointer group"
                        >
                          <img 
                            src={car.thumbnail} 
                            alt={car.model} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-sage-600 font-semibold">{car.brand} • {car.year}</p>
                          <h4 
                            onClick={() => navigateToVehicle(car.id)}
                            className="font-serif text-base font-bold text-charcoal hover:text-forest cursor-pointer truncate"
                          >
                            {car.model}
                          </h4>
                          <p className="font-serif text-lg font-bold text-forest mt-1">
                            {car.formattedPrice}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-beige-dark/40 space-y-1.5 mt-3">
                        <button
                          onClick={() => openModal('contact', car)}
                          className="w-full bg-forest hover:bg-forest-light text-ivory text-xs font-semibold py-2 rounded-xl transition-colors"
                        >
                          Contact Dealer
                        </button>
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* SPECIFICATION COMPARISON MATRIX ROWS */}
              {[
                { label: 'Condition', key: (c: any) => c.condition },
                { label: 'Year of Manufacture', key: (c: any) => c.year },
                { label: 'Kilometres Driven', key: (c: any) => `${c.kilometres.toLocaleString()} km` },
                { label: 'Engine Configuration', key: (c: any) => c.engine },
                { 
                  label: 'Horsepower', 
                  key: (c: any) => c.horsepower,
                  highlight: (c: any) => parseInt(c.horsepower) === highestHp && comparedVehicles.length > 1
                },
                { label: 'Torque', key: (c: any) => c.torque || '380 Nm' },
                { label: 'Fuel Type', key: (c: any) => c.fuelType },
                { label: 'Transmission', key: (c: any) => c.transmission },
                { label: 'Fuel Economy / Range', key: (c: any) => c.mileage },
                { label: 'Body Style', key: (c: any) => c.bodyType },
                { label: 'Seating Capacity', key: (c: any) => `${c.seatingCapacity} Seats` },
                { label: 'Exterior Color', key: (c: any) => c.exteriorColor },
                { label: 'Dealership', key: (c: any) => c.showroomName },
                { label: 'Showroom Location', key: (c: any) => `${c.city}, ${c.area}` },
                { label: 'Inventory Status', key: (c: any) => c.status },
              ].map((row, rowIndex) => (
                <div 
                  key={row.label}
                  className={`grid grid-cols-5 text-xs py-3 px-6 items-center ${
                    rowIndex % 2 === 0 ? 'bg-ivory/40' : 'bg-white'
                  } border-b border-beige-dark/40`}
                >
                  <div className="font-semibold text-charcoal-muted uppercase text-[11px] pr-4">
                    {row.label}
                  </div>
                  {[0, 1, 2, 3].map(slotIndex => {
                    const car = comparedVehicles[slotIndex];
                    if (!car) return <div key={slotIndex} className="text-charcoal-muted text-center">—</div>;
                    
                    const isHigh = row.highlight && row.highlight(car);

                    return (
                      <div 
                        key={car.id} 
                        className={`px-2 ${isHigh ? 'text-amberGlow-dark font-bold' : 'text-charcoal'}`}
                      >
                        {row.key(car)}
                        {isHigh && <span className="ml-1 text-[10px] uppercase text-amberGlow font-bold">(Top Output)</span>}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* BOTTOM ACTIONS ROW */}
              <div className="grid grid-cols-5 p-6 bg-ivory-dark">
                <div className="text-xs font-bold uppercase text-sage-800 flex items-center">
                  Direct Acquisition Actions
                </div>
                {[0, 1, 2, 3].map(slotIndex => {
                  const car = comparedVehicles[slotIndex];
                  if (!car) return <div key={slotIndex} />;
                  return (
                    <div key={car.id} className="px-2 space-y-1.5">
                      <button
                        onClick={() => openModal('reserve', car)}
                        className="w-full bg-amberGlow hover:bg-amberGlow-hover text-charcoal font-bold py-2 rounded-xl text-xs uppercase tracking-wider transition-colors"
                      >
                        Reserve
                      </button>
                      <button
                        onClick={() => openModal('testDrive', car)}
                        className="w-full bg-white hover:bg-beige text-charcoal border border-beige-dark font-semibold py-2 rounded-xl text-xs transition-colors"
                      >
                        Book Test Drive
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};

