import React, { useState, useEffect, FormEvent } from "react";
import { X, Star, Check, Award, Shovel, ShieldCheck, ShoppingCart, HelpCircle, HeartHandshake, Eye, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, Review } from "../types";

interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "date" | "verified">) => void;
  currentUser?: any;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  reviews,
  onAddReview,
  currentUser,
  onToggleWishlist,
  isWishlisted = false
}: ProductDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState(product.variants?.[0]?.size || product.size);
  const [quantity, setQuantity] = useState(1);
  const [successMsg, setSuccessMsg] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    setSelectedSize(product.variants?.[0]?.size || product.size);
    setQuantity(1);
    setRatingInput(5);
  }, [product]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Touch gesture state for swiping product photos
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Reset active state when product changes
  useEffect(() => {
    setCurrentSlide(0);
    setSelectedSize(product.size);
    setQuantity(1);
  }, [product.id, product.size]);
  
  // Review form states
  const [reviewerName, setReviewerName] = useState("");
  const [ratingInput, setRatingInput] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  if (!isOpen) return null;

  // Filter reviews specifically for this product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewText.trim()) return;

    onAddReview({
      productId: product.id,
      productName: product.name,
      author: reviewerName,
      rating: ratingInput,
      text: reviewText
    });

    setReviewerName("");
    setRatingInput(5);
    setReviewText("");
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 4000);
  };

  const selectedVariant = product.variants?.find(v => v.size === selectedSize);
  const activePrice = selectedVariant ? selectedVariant.salePrice : product.salePrice;
  const originalPrice = selectedVariant ? selectedVariant.price : product.price;

  const handleAddToCartClick = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, selectedSize);
    }
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0B0A]/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-sand-50 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden my-8 max-h-[90vh] md:max-h-none overflow-y-auto"
        id={`product-modal-${product.id}`}
      >
        {/* Close Button top-right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full border border-sand-200 text-sand-700 hover:text-sand-900 transition-colors shadow-sm focus:outline-none cursor-pointer"
          id="modal-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Dynamic Fragrance Visuals (LHS - 5 cols equivalent on desktop) */}
        <div className="md:w-5/12 bg-sand-100 p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-sand-200">
          <div>
            <div className="flex items-center space-x-1.5 text-[9.5px] uppercase tracking-widest text-[#D4BC96] font-semibold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>OLFACTORY ORIGINS REGISTRY</span>
            </div>
            
            <h3 className="text-3xl font-light font-display text-sand-900 tracking-wider mb-1">
              {product.name}
            </h3>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4BC96] font-medium mb-6">
              {product.tagline}
            </p>

            {(() => {
              const sliderImages = [product.image, ...(product.productImages || [])].filter(Boolean);

              const handlePrevSlide = (e: React.MouseEvent) => {
                e.stopPropagation();
                setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
              };

              const handleNextSlide = (e: React.MouseEvent) => {
                e.stopPropagation();
                setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
              };

              const handleTouchStart = (e: React.TouchEvent) => {
                setTouchEnd(null);
                setTouchStart(e.targetTouches[0].clientX);
              };

              const handleTouchMove = (e: React.TouchEvent) => {
                setTouchEnd(e.targetTouches[0].clientX);
              };

              const handleTouchEnd = () => {
                if (touchStart === null || touchEnd === null) return;
                const distance = touchStart - touchEnd;
                const minSwipeDistance = 40;
                if (distance > minSwipeDistance) {
                  setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
                } else if (distance < -minSwipeDistance) {
                  setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
                }
              };

              return (
                <div 
                  className="h-72 w-full rounded-2xl overflow-hidden shadow-md my-4 relative group bg-sand-110 select-none touch-pan-y"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img 
                    src={sliderImages[currentSlide] || product.image} 
                    alt={`${product.name} - Slide ${currentSlide + 1}`} 
                    className="w-full h-full object-cover transition-all duration-500"
                    referrerPolicy="no-referrer"
                    key={currentSlide}
                  />
                  <div className="absolute inset-0 bg-[#D4BC96]/15 mix-blend-color font-sans"></div>
                  
                  {/* Sourced badge */}
                  <div className="absolute bottom-4 left-4 bg-[#0D0B0A]/85 backdrop-blur-sm text-[#FAFAFA] text-[9px] uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-md border border-sand-900/40 z-10">
                    Sourced: {product.destination}
                  </div>

                  {/* Slider Controls (only active if sliderImages.length > 1) */}
                  {sliderImages.length > 1 && (
                    <>
                      {/* Left arrow button */}
                      <button
                        type="button"
                        onClick={handlePrevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full text-sand-850 hover:text-sand-900 border border-sand-200 transition-colors cursor-pointer shadow-sm focus:outline-none z-10 hover:scale-105"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Right arrow button */}
                      <button
                        type="button"
                        onClick={handleNextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full text-sand-850 hover:text-sand-900 border border-sand-200 transition-colors cursor-pointer shadow-sm focus:outline-none z-10 hover:scale-105"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Slide numbering indicator */}
                      <div className="absolute top-4 left-4 bg-black/60 text-white text-[8.5px] font-mono px-2 py-0.5 rounded tracking-widest z-10">
                        {currentSlide + 1} / {sliderImages.length}
                      </div>

                      {/* Dot navigators */}
                      <div className="absolute bottom-4 right-4 flex space-x-1.5 z-10 bg-[#0D0B0A]/50 px-2 py-1.5 rounded-md backdrop-blur-xs">
                        {sliderImages.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentSlide(idx);
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              currentSlide === idx ? "bg-[#D4BC96] w-3" : "bg-white/60 hover:bg-white"
                            }`}
                            title={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Sourcing Short Story Card */}
          <div className="bg-white border border-sand-200 p-4.5 rounded-xl mt-6">
            <span className="text-[9px] font-mono tracking-widest text-sand-400 uppercase block mb-1">
              Wanderlust Memoirs
            </span>
            <p className="text-sand-500 text-xs font-light leading-relaxed italic">
              "{product.story}"
            </p>
          </div>
        </div>

        {/* Right Side: Detailed specs, Pyramid & Custom Reviews (RHS - 7 cols equivalence) */}
        <div className="md:w-7/12 p-6 sm:p-10 overflow-y-auto max-h-[85vh] md:max-h-[90vh]">
          
          {/* Notes Pyramid visual design block */}
          <div className="mb-10">
            <h4 className="text-[10px] font-mono tracking-widest text-sand-400 uppercase mb-4">
              OLFACTORY NOTES ACCORD PYRAMID
            </h4>

            <div className="bg-white rounded-xl border border-sand-200 p-5 divide-y divide-sand-100 shadow-sm">
              <div className="pb-3.5">
                <span className="text-[10.5px] uppercase tracking-widest text-[#D4BC96] font-semibold block mb-1">
                  Top Notes (Initial Burst)
                </span>
                <p className="text-xs text-sand-600 font-light">
                  {product.notes.top.join(", ")}
                </p>
              </div>

              <div className="py-3.5">
                <span className="text-[10.5px] uppercase tracking-widest text-sand-900 font-semibold block mb-1">
                  Heart Notes (The Soul Profile)
                </span>
                <p className="text-xs text-sand-600 font-light">
                  {product.notes.heart.join(", ")}
                </p>
              </div>

              <div className="pt-3.5">
                <span className="text-[10.5px] uppercase tracking-widest text-sand-400 font-semibold block mb-1">
                  Base Notes (The Anchor Trail)
                </span>
                <p className="text-xs text-sand-600 font-light">
                  {product.notes.base.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Core ingredients map */}
          <div className="mb-10">
            <h4 className="text-[10px] font-mono tracking-widest text-sand-400 uppercase mb-3">
              PRIMARY BIOLOGICAL INGREDIENTS
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.ingredients.map((ing, idx) => (
                <span key={idx} className="bg-sand-100 text-sand-700 text-[10.5px] px-3 py-1 rounded-full border border-sand-200/50">
                  🍃 {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Performance benchmarks deck */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-sand-200 p-4 shadow-sm text-center">
              <span className="text-[8.5px] uppercase tracking-widest text-sand-400 block mb-0.5">ESTIMATED LONGEVITY</span>
              <span className="text-xs font-medium text-sand-800">{product.longevity}</span>
            </div>
            <div className="bg-white rounded-xl border border-sand-200 p-4 shadow-sm text-center">
              <span className="text-[8.5px] uppercase tracking-widest text-sand-400 block mb-0.5">SILLAGE / PROJECTION</span>
              <span className="text-xs font-medium text-sand-800">{product.projection}</span>
            </div>
          </div>

          {/* New 5 Aesthetics Moodboard Cards */}
          <div className="mb-10">
            <h4 className="text-[10px] font-mono tracking-widest text-sand-400 uppercase mb-4">
              OLFACTORY SENSORY CARDS (5 AESTHETICS)
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              {[
                {
                  title: "I. Extraction",
                  desc: "Alembic distillation",
                  defaultImg: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=300"
                },
                {
                  title: "II. Terroir",
                  desc: "Kannauj baked clay",
                  defaultImg: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=300"
                },
                {
                  title: "III. Botanical",
                  desc: "Dewy harvested petals",
                  defaultImg: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=300"
                },
                {
                  title: "IV. Sandalwood",
                  desc: "Premium aged core",
                  defaultImg: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=300"
                },
                {
                  title: "V. Aura",
                  desc: "Mystic lingering sillage",
                  defaultImg: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=300"
                }
              ].map((card, idx) => {
                const imageSrc = product.galleryImages?.[idx] || card.defaultImg;
                const isCustom = !!product.galleryImages?.[idx];
                const cardTitle = product.galleryTexts?.[idx]?.title || card.title;
                const cardDesc = product.galleryTexts?.[idx]?.desc || card.desc;
                return (
                  <div key={idx} className="bg-white border border-sand-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between h-44 group hover:shadow-md transition-all duration-300">
                    <div className="relative h-24 overflow-hidden bg-sand-100">
                      <img 
                        src={imageSrc} 
                        alt={cardTitle} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {isCustom && (
                        <span className="absolute top-1.5 right-1.5 bg-[#D4BC96] text-[#2D2926] text-[7.5px] font-mono px-1 py-0.2 rounded font-semibold tracking-wider">
                          EXCLUSIVE
                        </span>
                      )}
                    </div>
                    <div className="p-2 flex-1 flex flex-col justify-between">
                      <div className="leading-tight">
                        <span className="text-[10px] font-serif font-semibold text-sand-800 block">
                          {cardTitle}
                        </span>
                        <span className="text-[8.5px] text-sand-400 block font-light mt-0.5 line-clamp-2">
                          {cardDesc}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Size, Quantity & Checkout Controls block */}
          <div className="bg-white border border-sand-200 p-6 rounded-2xl mb-10 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[9.5px] uppercase tracking-widest text-sand-400 font-mono">STANDALONE PRICE</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-2xl font-serif text-sand-900">₹{activePrice}</span>
                  <span className="text-xs text-sand-400 line-through">₹{originalPrice}</span>
                </div>
              </div>

              {/* Verified badges */}
              <div className="hidden sm:flex flex-col items-end gap-1 text-[9px] uppercase tracking-widest text-sand-400">
                <div className="flex items-center gap-1.5 bg-sand-100 text-sand-600 px-2 py-0.5 rounded border border-sand-200">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#D4BC96]" />
                  <span>CRUELTY FREE BASE</span>
                </div>
              </div>
            </div>

            {/* Sizing dropdown selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-[9.5px] uppercase tracking-[0.15em] text-sand-500 block mb-1.5 font-medium">Select Size</label>
                <div className="flex gap-2 flex-wrap">
                  {(product.variants || [{size: product.size, price: product.price, salePrice: product.salePrice}]).map((variant) => (
                    <button
                      key={variant.size}
                      type="button"
                      onClick={() => setSelectedSize(variant.size)}
                      className={`flex-1 py-2 px-2 text-[11px] font-medium tracking-widest uppercase rounded-sm border cursor-pointer transition-colors ${
                        selectedSize === variant.size 
                          ? "border-[#2D2926] bg-[#2D2926] text-white shadow-sm" 
                          : "border-sand-300 bg-white text-sand-700 hover:border-sand-900 hover:text-sand-900"
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[9.5px] uppercase tracking-[0.15em] text-sand-500 block mb-1.5 font-medium">Select Quantity</label>
                <div className="flex items-center border border-sand-200 rounded overflow-hidden h-[38px] w-full">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-1/3 text-center text-lg text-sand-500 hover:bg-sand-100 h-full flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-1/3 text-center text-xs font-medium text-sand-800">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-1/3 text-center text-lg text-sand-500 hover:bg-sand-100 h-full flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Buy trigger & Royal Wishlist Toggle */}
            <div className="flex gap-2 w-full">
              <button
                type="button"
                onClick={handleAddToCartClick}
                className="flex-1 py-4 bg-[#D4BC96] hover:bg-[#0D0B0A] hover:scale-101 text-white text-xs uppercase tracking-[0.2em] font-medium rounded shadow transition-all duration-300 font-display flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                {successMsg ? (
                  <>
                    <Check className="w-4 h-4 animate-scale-up" />
                    <span>ADDED TO YOUR TRAVEL LOG</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>SECURE BOTTLE (₹{activePrice * quantity})</span>
                  </>
                )}
              </button>

              {onToggleWishlist && (
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`px-4.5 border rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isWishlisted 
                      ? "bg-red-50 text-red-600 border-red-200" 
                      : "bg-white text-sand-400 hover:text-red-500 hover:bg-neutral-50 border-sand-200"
                  }`}
                  title={isWishlisted ? "Remove from Royal Wishlist" : "Save to Royal Wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              )}
            </div>
          </div>

          {/* ACTIVE REVIEWS MODULE */}
          <div className="border-t border-sand-200 pt-8" id="modal-reviews-section">
            <h4 className="text-xl font-light font-display text-sand-900 tracking-wide mb-6">
              Client Scent Reviews ({productReviews.length})
            </h4>

            {/* List Reviews */}
            <div className="space-y-6 mb-10">
              {productReviews.length === 0 ? (
                <p className="text-xs text-sand-400 font-light italic">
                  Be the first traveler to document an olfactory response for {product.name}.
                </p>
              ) : (
                productReviews.map((rev) => (
                  <div key={rev.id} className="bg-white border border-sand-200/60 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-serif text-sand-900 font-medium">{rev.author}</span>
                        <div className="flex items-center space-x-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${
                                i < rev.rating ? "fill-[#D4BC96] text-[#D4BC96]" : "text-sand-200"
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-[9px] text-sand-400 font-mono">
                        <span>{rev.date}</span>
                        {rev.verified && (
                          <span className="text-green-600 font-semibold tracking-wider flex items-center gap-0.5 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-500 fill-current text-white" />
                            <span>VERIFIED</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-sand-600 font-light leading-relaxed">
                      {rev.text}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Submit a review Form */}
            <form onSubmit={handleFormSubmit} className="bg-white border border-sand-200 p-6 rounded-2xl">
              <h5 className="text-[10px] tracking-widest text-[#D4BC96] uppercase font-semibold mb-1">
                OLFACTORY LOGBOOK ENTRY
              </h5>
              <h6 className="text-base font-serif text-sand-800 tracking-wide mb-4">
                Leave a Verified Scent review
              </h6>

              {formSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-3 rounded-lg mb-4 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Thank you! Your olfactory feedback has been pre-logged and indexed under the brand database.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[9.5px] uppercase tracking-widest text-sand-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Dr. Sid Vimal"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full bg-sand-50 border border-sand-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4BC96] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9.5px] uppercase tracking-widest text-sand-400 block mb-1">Star Assessment</label>
                  <div className="flex items-center space-x-1.5 h-[34px]">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const num = idx + 1;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRatingInput(num)}
                          className="p-1 focus:outline-none cursor-pointer"
                        >
                          <Star 
                            className={`w-5 h-5 transition-transform duration-100 hover:scale-110 ${
                              num <= ratingInput ? "fill-[#D4BC96] text-[#D4BC96]" : "text-sand-200"
                            }`} 
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-[9.5px] uppercase tracking-widest text-sand-400 block mb-1">Detailed Olfactory Scent Response</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your assessment of the longevity, top notes, and the general wanderlust vibe..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-sand-50 border border-sand-200 rounded p-3 text-xs focus:ring-1 focus:ring-[#D4BC96] focus:outline-none"
                />
              </div>

              <button
                type="button"
                className="px-6 py-2.5 bg-[#0D0B0A] hover:bg-gold-600 text-white text-[10px] uppercase tracking-widest font-medium rounded transition-all cursor-pointer"
              >
                SUBMIT LOG ENTRY
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
