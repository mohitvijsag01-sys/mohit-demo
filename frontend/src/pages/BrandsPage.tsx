import React from 'react';
import { useApp } from '../context/AppContext';
import { POPULAR_BRANDS } from '../data/mockData';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export const BrandsPage: React.FC = () => {
  const { navigateToBrand } = useApp();

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-20 text-charcoal">
      
      {/* Header */}
      <div className="bg-forest text-ivory py-12 px-4 sm:px-6 lg:px-8 border-b border-sage/20 mb-12">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-amberGlow font-semibold">
            Automotive Marque Directory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-1">
            Prestigious Manufacturers & Marques
          </h1>
          <p className="text-sm text-sage-200 mt-2 max-w-2xl">
            Select a marque to explore showroom inventories, certified pre-owned vehicles, and bespoke factory orders.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {POPULAR_BRANDS.map(brand => (
            <div
              key={brand.name}
              onClick={() => navigateToBrand(brand.name)}
              className="group bg-white hover:bg-beige-light p-8 rounded-3xl border border-beige-dark/60 hover:border-amberGlow transition-all duration-300 cursor-pointer shadow-sm hover:shadow-luxury flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-ivory-dark flex items-center justify-center text-forest group-hover:bg-amberGlow/20 transition-colors mb-4">
                  <Sparkles className="w-6 h-6 text-amberGlow" />
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-forest transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Accredited Dealership Inventory
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-beige-dark/40 flex items-center justify-between text-xs text-charcoal font-semibold">
                <span>{brand.count} Models Available</span>
                <ChevronRight className="w-4 h-4 text-amberGlow group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

