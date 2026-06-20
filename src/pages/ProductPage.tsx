import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Star, ArrowLeft, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from '../types';

interface ProductPageProps {
  onAddToCart: (product: Product, size: string) => void;
  setIsCartOpen: (open: boolean) => void;
}

export default function ProductPage({ onAddToCart, setIsCartOpen }: ProductPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>('description');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    
    // Listen to real-time product updates
    const unsub = onSnapshot(doc(db, 'products', id), (docSnap) => {
      if (docSnap.exists()) {
        const p = docSnap.data() as Product;
        // Map variants if missing to prevent errors
        if (!p.variants || p.variants.length === 0) {
          let variants = [];
          if (p.size?.includes('12 ml')) {
            variants = [
              { size: '12ML Roll On', price: p.price, salePrice: p.salePrice },
              { size: '6ML Roll On', price: Math.round(p.price * 0.55), salePrice: Math.round(p.salePrice * 0.55) },
              { size: '3ML Roll On', price: Math.round(p.price * 0.3), salePrice: Math.round(p.salePrice * 0.3) },
            ];
          } else if (p.size?.includes('50 ml')) {
            variants = [
              { size: '50ML Spray', price: p.price, salePrice: p.salePrice },
              { size: '10ML Travel Spray', price: Math.round(p.price * 0.25), salePrice: Math.round(p.salePrice * 0.25) },
            ];
          } else {
            variants = [
              { size: p.size, price: p.price, salePrice: p.salePrice }
            ];
          }
          p.variants = variants;
        }
        setProduct(p);
        if (!selectedSize) setSelectedSize(p.variants?.[0]?.size || p.size);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [id, selectedSize]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF5F2]">
        <div className="w-12 h-12 border-2 border-sand-300 border-t-[#D4BC96] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF5F2] text-sand-900">
        <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/')} className="text-[#D4BC96] hover:underline">Return to Home</button>
      </div>
    );
  }

  const selectedVariant = product.variants?.find(v => v.size === selectedSize);
  const activePrice = selectedVariant ? selectedVariant.salePrice : product.salePrice;
  const originalPrice = selectedVariant ? selectedVariant.price : product.price;

  const handleAddToCartClick = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, selectedSize);
    }
    setIsCartOpen(true);
  };

  const handleBuyItNow = () => {
    handleAddToCartClick();
    // In a real app, this would route immediately to checkout.
    // For now, opening cart simulates the rapid checkout workflow.
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-[100vh] bg-white text-sand-900 pb-20 sm:pb-0 pt-20">
      
      {/* Breadcrumbs */}
      <div className="bg-[#FAF5F2] border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center text-[10px] sm:text-xs uppercase tracking-widest text-sand-500 font-mono">
          <button onClick={() => navigate('/')} className="hover:text-sand-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Home
          </button>
          <span className="mx-2">/</span>
          <span className="text-sand-900 truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-0 sm:gap-12 lg:gap-20">
          
          {/* Left: Sticky Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-24">
              {/* Swipeable Container */}
              <div className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:rounded-lg" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                
                {/* Main image */}
                <div className="flex-none w-full aspect-[4/5] snap-center relative bg-white">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Additional gallery images */}
                {product.galleryImages?.map((img, idx) => (
                  <div key={idx} className="flex-none w-full aspect-[4/5] snap-center relative bg-white">
                    <img 
                      src={img} 
                      alt={`${product.name} gallery view ${idx + 1}`} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              {/* Minimal dots indicator for mobile (shows if there are gallery images) */}
              {(product.galleryImages && product.galleryImages.length > 0) && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-1.5 lg:hidden z-10 bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D2926]"></div>
                  {product.galleryImages.map((_, idx) => (
                    <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 px-4 sm:px-0 pt-5 pb-8 lg:py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display text-sand-950 mb-1.5">
              {product.name}
            </h1>
            <p className="text-[11px] sm:text-sm text-[#D4BC96] uppercase tracking-widest font-semibold mb-5">
              {product.tagline}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#D4BC96]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.floor(product.rating) ? "fill-[#D4BC96]" : "text-sand-200"}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-sand-600 font-mono mt-0.5">
                {product.rating} ({product.reviewsCount} Reviews)
              </span>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-3xl font-serif text-sand-950 leading-none">₹{activePrice}</span>
              {originalPrice > activePrice && (
                <span className="text-lg text-sand-400 line-through mb-0.5 font-serif">₹{originalPrice}</span>
              )}
            </div>

            {/* Size Variants */}
            <div className="mb-8">
              <label className="text-[10px] uppercase tracking-[0.2em] text-sand-500 block mb-3 font-medium">Select Size</label>
              <div className="flex flex-wrap gap-3">
                {product.variants?.map((variant) => (
                  <button
                    key={variant.size}
                    onClick={() => setSelectedSize(variant.size)}
                    className={`py-3 px-6 text-xs sm:text-sm font-medium tracking-widest uppercase rounded-sm border cursor-pointer transition-all ${
                      selectedSize === variant.size 
                        ? "border-[#2D2926] bg-[#2D2926] text-white shadow-sm ring-1 ring-black ring-offset-1" 
                        : "border-sand-300 bg-white text-sand-700 hover:border-sand-900"
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex items-center border border-sand-300 rounded-sm h-[52px] sm:w-32 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-1/3 h-full flex items-center justify-center text-xl text-sand-500 hover:bg-sand-50 cursor-pointer focus:outline-none"
                >
                  -
                </button>
                <span className="w-1/3 text-center text-sm font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-1/3 h-full flex items-center justify-center text-xl text-sand-500 hover:bg-sand-50 cursor-pointer focus:outline-none"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCartClick}
                className="flex-1 h-[52px] bg-white border border-[#2D2926] text-[#2D2926] hover:bg-[#2D2926] hover:text-white font-semibold tracking-[0.2em] uppercase text-xs transition-colors cursor-pointer"
              >
                Add to Cart
              </button>
            </div>

            {/* Buy It Now */}
            <button 
              onClick={handleBuyItNow}
              className="w-full h-[52px] bg-[#2D2926] hover:bg-[#D4BC96] border border-transparent hover:border-[#D4BC96] text-white font-bold tracking-[0.2em] uppercase text-xs transition-colors mb-10 shadow-sm cursor-pointer"
            >
              Buy It Now
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-10 py-6 border-y border-sand-200">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#D4BC96]" />
                <span className="text-[10px] tracking-widest uppercase font-semibold text-sand-700">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#D4BC96]" />
                <span className="text-[10px] tracking-widest uppercase font-semibold text-sand-700">100% Authentic</span>
              </div>
              <div className="flex items-center gap-3">
                <HeartHandshake className="w-5 h-5 text-[#D4BC96]" />
                <span className="text-[10px] tracking-widest uppercase font-semibold text-sand-700">Cruelty Free</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-sand-200">
              {/* Description Accordion */}
              <div className="border-b border-sand-200">
                <button 
                  onClick={() => toggleSection('description')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-sm font-semibold tracking-widest uppercase text-sand-900">Description</span>
                  {expandedSection === 'description' ? <ChevronUp className="w-4 h-4 text-sand-400" /> : <ChevronDown className="w-4 h-4 text-sand-400" />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'description' ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                  <p className="text-sm text-sand-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Notes Accordion */}
              <div className="border-b border-sand-200">
                <button 
                  onClick={() => toggleSection('notes')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-sm font-semibold tracking-widest uppercase text-sand-900">Olfactory Notes</span>
                  {expandedSection === 'notes' ? <ChevronUp className="w-4 h-4 text-sand-400" /> : <ChevronDown className="w-4 h-4 text-sand-400" />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'notes' ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4BC96] font-bold mb-2">Top Notes</h4>
                      <ul className="text-sm text-sand-700 space-y-1">
                        {product.notes?.top?.map(n => <li key={n}>• {n}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4BC96] font-bold mb-2">Heart Notes</h4>
                      <ul className="text-sm text-sand-700 space-y-1">
                        {product.notes?.heart?.map(n => <li key={n}>• {n}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4BC96] font-bold mb-2">Base Notes</h4>
                      <ul className="text-sm text-sand-700 space-y-1">
                        {product.notes?.base?.map(n => <li key={n}>• {n}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients Accordion */}
              <div className="border-b border-sand-200">
                <button 
                  onClick={() => toggleSection('ingredients')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-sm font-semibold tracking-widest uppercase text-sand-900">Ingredients & Specs</span>
                  {expandedSection === 'ingredients' ? <ChevronUp className="w-4 h-4 text-sand-400" /> : <ChevronDown className="w-4 h-4 text-sand-400" />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'ingredients' ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                  <ul className="text-sm text-sand-600 leading-relaxed list-disc pl-4 space-y-2">
                    {product.ingredients?.map(i => <li key={i}>{i}</li>)}
                    {product.longevity && <li><strong>Longevity:</strong> {product.longevity}</li>}
                    {product.projection && <li><strong>Projection:</strong> {product.projection}</li>}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Sticky Mobile Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-sand-200 p-3 sm:hidden z-40 flex items-center gap-3 shadow-2xl">
        <button 
          onClick={handleBuyItNow}
          className="flex-1 py-3.5 bg-[#2D2926] text-white font-semibold tracking-widest uppercase text-[11px] rounded-sm cursor-pointer"
        >
          Buy {selectedSize}
        </button>
      </div>

    </div>
  );
}
