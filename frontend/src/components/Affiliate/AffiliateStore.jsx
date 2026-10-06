import React, { useState } from 'react';
import {
  ShoppingBag,
  Star,
  ExternalLink,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Filter,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

const AffiliateStore = () => {
  const { affiliateProducts } = useFitness();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Supplements', 'Gym Gear', 'Books'];

  const filteredProducts = affiliateProducts.filter((product) => {
    if (selectedCategory === 'All') return true;
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-bold mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Curated Wellness & Performance Gear</span>
            </div>
            <h2 className="text-2xl font-black text-slate-dark tracking-tight">Affiliate Fitness Marketplace</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xl">
              Lab-tested sports supplements, heavy-duty training equipment, and evidence-based nutrition literature verified by our coaching staff.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'bg-forest-50 text-gray-600 hover:bg-forest-100 hover:text-forest-900 border border-forest-100/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FTC Disclosure Notice */}
        <div className="mt-6 pt-6 border-t border-forest-50 flex items-start space-x-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs">
          <HeartHandshake className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            <strong>FTC Affiliate Transparency:</strong> When you purchase through our links, HealthPulse & Fit may earn an affiliate commission from verified partners like Amazon and authorized retailers at no extra cost to you. We only curate gear we independently test and endorse.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-3xl border border-forest-100 shadow-soft hover:shadow-soft-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Product Image */}
              <div className="relative h-52 w-full overflow-hidden bg-forest-900">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-forest-800/90 text-sage-200 backdrop-blur-md border border-forest-700">
                    {product.badge}
                  </span>
                  {product.discount && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-600 text-white shadow-sm">
                      {product.discount}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs font-bold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-[10px] text-gray-300">({product.reviewsCount.toLocaleString()})</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <h3 className="font-extrabold text-slate-dark text-sm sm:text-base leading-snug group-hover:text-forest-800 transition">
                  {product.title}
                </h3>

                {/* Price Row */}
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-forest-900">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-1.5 text-xs text-gray-600 border-t border-forest-50 pt-3">
                  {product.features?.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Row with Custom Affiliate Referral Link */}
            <div className="p-5 pt-0">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-extrabold shadow-md shadow-forest-900/10 transition flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
              >
                <span>View on Partner Store</span>
                <ExternalLink className="w-3.5 h-3.5 text-sage-300" />
              </a>
              <div className="text-[10px] text-gray-400 text-center mt-2 font-medium">
                Official Affiliate Tag: <code className="text-forest-800">{product.affiliateTag}</code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateStore;
