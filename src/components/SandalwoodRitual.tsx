import React, { useState, ChangeEvent } from "react";
import { ArrowRight, ShoppingBag, Check, ShieldCheck, Sparkles, Edit3, X, Upload, Image as ImageIcon, Info, HeartHandshake } from "lucide-react";
import { Product, SiteSettings } from "../types";

interface SandalwoodRitualProps {
  siteSettings?: SiteSettings;
  onAddToCart?: (product: Product, size: string) => void;
  onBuyNow?: (product: Product, size: string) => void;
  onExplore?: () => void;
  isAdminLoggedIn?: boolean;
  onUpdateSiteSettings?: (updater: (prev: SiteSettings) => SiteSettings) => Promise<void> | void;
}

export default function SandalwoodRitual({
  siteSettings,
  onAddToCart,
  onBuyNow,
  onExplore,
  isAdminLoggedIn,
  onUpdateSiteSettings
}: SandalwoodRitualProps) {
  const stickImage = siteSettings?.sandalwoodStickImage || "/images/sandalwood_stick_rubbing_stone.png";
  const stickTitle = siteSettings?.sandalwoodStickTitle || "Sandalwood Stick + Rubbing Stone";
  const stickSubtitle = siteSettings?.sandalwoodStickSubtitle || "Ayurveda’s Ancient Calm";
  const stickText = siteSettings?.sandalwoodStickText || "Ayurveda’s chill pill! It is a spa treatment from nature - calming your mind, cooling your skin, and centering your thoughts. Hand-crafted from original Mysore Sandalwood blocks.";
  const stickWeight = siteSettings?.sandalwoodStickWeight || "APPROX(50GM)";
  const stickPrice = Number(siteSettings?.sandalwoodStickPrice ?? 999);
  const stickOriginalPrice = Number(siteSettings?.sandalwoodStickOriginalPrice ?? 1499);
  const isInStock = siteSettings?.sandalwoodStickInStock !== false;

  const [quantity, setQuantity] = useState(1);
  const [isAddedToast, setIsAddedToast] = useState(false);
  const [showRitualModal, setShowRitualModal] = useState(false);
  const [showAdminEditModal, setShowAdminEditModal] = useState(false);

  // Admin edit form state
  const [editTitle, setEditTitle] = useState(stickTitle);
  const [editSubtitle, setEditSubtitle] = useState(stickSubtitle);
  const [editDesc, setEditDesc] = useState(stickText);
  const [editWeight, setEditWeight] = useState(stickWeight);
  const [editPrice, setEditPrice] = useState(stickPrice);
  const [editOriginalPrice, setEditOriginalPrice] = useState(stickOriginalPrice);
  const [editImage, setEditImage] = useState(stickImage);
  const [editInStock, setEditInStock] = useState(isInStock);
  const [isSaving, setIsSaving] = useState(false);

  // Open edit modal and populate current values
  const handleOpenAdminEdit = () => {
    setEditTitle(stickTitle);
    setEditSubtitle(stickSubtitle);
    setEditDesc(stickText);
    setEditWeight(stickWeight);
    setEditPrice(stickPrice);
    setEditOriginalPrice(stickOriginalPrice);
    setEditImage(stickImage);
    setEditInStock(isInStock);
    setShowAdminEditModal(true);
  };

  // Upload photo from device
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setEditImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save changes via updateSiteSettings
  const handleSaveAdminEdit = async () => {
    if (!onUpdateSiteSettings) return;
    setIsSaving(true);
    try {
      await onUpdateSiteSettings((prev) => ({
        ...prev,
        sandalwoodStickTitle: editTitle.trim() || "Sandalwood Stick + Rubbing Stone",
        sandalwoodStickSubtitle: editSubtitle.trim() || "Ayurveda’s Ancient Calm",
        sandalwoodStickText: editDesc.trim(),
        sandalwoodStickWeight: editWeight.trim() || "APPROX(50GM)",
        sandalwoodStickPrice: Number(editPrice) || 999,
        sandalwoodStickOriginalPrice: Number(editOriginalPrice) || 1499,
        sandalwoodStickImage: editImage || "/images/sandalwood_stick_rubbing_stone.png",
        sandalwoodStickInStock: editInStock
      }));
      setShowAdminEditModal(false);
    } catch (err) {
      console.error("Failed to save Sandalwood deal settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Construct official product representation
  const sandalwoodProduct: Product = {
    id: "sandalwood-stick-rubbing-stone",
    name: stickTitle,
    tagline: stickSubtitle,
    price: stickOriginalPrice,
    salePrice: stickPrice,
    description: stickText,
    story: "Hand-crafted from original Mysore Sandalwood blocks and paired with an authentic natural terracotta rubbing stone plate (Gandhakal). A revered Ayurvedic daily ritual for deep mental clarity, calming heat, and pure botanical aroma.",
    notes: {
      top: ["Mysore Sandalwood Heartwood"],
      heart: ["Creamy Santal Resin"],
      base: ["Earthy Terracotta Silt"]
    },
    destination: "Mysore",
    destinationState: "Karnataka",
    image: stickImage,
    rating: 4.9,
    reviewsCount: 38,
    size: stickWeight,
    ingredients: [
      "100% Pure Mysore Sandalwood (Santalum Album)",
      "Traditional Natural Terracotta Rubbing Stone (Gandhakal)",
      "Organic Muslin Cotton Storage Pouch"
    ],
    longevity: "Sacred Daily Ritual",
    projection: "Natural calming skin aura",
    category: "Authentic Indian Attars"
  };

  // Handle immediate purchase / checkout
  const handlePurchase = () => {
    if (onBuyNow) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart?.(sandalwoodProduct, stickWeight);
      }
      onBuyNow(sandalwoodProduct, stickWeight);
    } else if (onAddToCart) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(sandalwoodProduct, stickWeight);
      }
    } else if (onExplore) {
      onExplore();
    }
  };

  // Handle adding to cart with toast
  const handleAdd = () => {
    if (onAddToCart) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(sandalwoodProduct, stickWeight);
      }
      setIsAddedToast(true);
      setTimeout(() => setIsAddedToast(false), 2400);
    }
  };

  return (
    <section className="bg-white py-14 sm:py-20 border-b border-sand-200/70 overflow-hidden relative" id="sandalwood-ritual-section">
      {/* Admin on-page quick edit bar */}
      {isAdminLoggedIn && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-[#1f1d1b] border border-[#d4af37]/60 rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#d4af37] font-bold">
                Admin Control: Sandalwood Product Deal
              </span>
            </div>
            <button
              type="button"
              onClick={handleOpenAdminEdit}
              className="px-3.5 py-1.5 bg-[#d4af37] hover:bg-[#e5c358] text-stone-950 font-serif text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details &amp; Photo</span>
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Visual Canvas (Left Column - Matches Screenshot) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square max-w-[540px] mx-auto rounded-[2.2rem] overflow-hidden shadow-xl border border-stone-200/80 bg-[#f9f8f5] group">
              <img
                src={stickImage}
                alt={stickTitle}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                referrerPolicy="no-referrer"
              />
              {/* Authenticity Floating Pill */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/60 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#19a24b]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-800">
                  100% Pure Mysore Sandalwood
                </span>
              </div>

              {/* Specification Badge */}
              <div className="absolute bottom-4 left-4 bg-stone-900/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase font-semibold">
                {stickWeight}
              </div>

              {/* Ritual guide prompt */}
              <button
                type="button"
                onClick={() => setShowRitualModal(true)}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-stone-800 text-[10px] font-mono uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 transition-all cursor-pointer"
                title="View How to Use & Ritual Guide"
              >
                <Info className="w-3.5 h-3.5 text-stone-600" />
                <span>How to Use</span>
              </button>
            </div>
          </div>

          {/* Product Details & Actions (Right Column - Matches Screenshot) */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#19a24b] font-bold uppercase block mb-1.5">
                AYURVEDIC RITUAL ESSENTIAL
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-950 tracking-tight leading-[1.15] font-normal">
                {stickTitle}
              </h2>
            </div>

            <div className="space-y-3">
              <p className="text-base sm:text-lg font-medium text-stone-800">
                {stickSubtitle}
              </p>
              <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed whitespace-pre-line">
                {stickText}
              </p>
            </div>

            {/* Weight / Spec Badge */}
            <div className="flex items-center gap-2 pt-1">
              <span className="px-3 py-1 bg-stone-100 border border-stone-200 text-stone-800 font-mono text-xs uppercase tracking-wider rounded-md font-semibold">
                {stickWeight}
              </span>
              {isInStock ? (
                <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  In Stock • Hand-harvested Batch
                </span>
              ) : (
                <span className="text-[11px] font-mono text-rose-600 font-medium">
                  Temporarily Out of Stock
                </span>
              )}
            </div>

            {/* Price section */}
            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-stone-950">
                ₹{stickPrice.toLocaleString("en-IN")}
              </span>
              {stickOriginalPrice > stickPrice && (
                <>
                  <span className="text-base sm:text-lg font-serif text-stone-400 line-through">
                    ₹{stickOriginalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-100 text-emerald-800 font-bold">
                    Save ₹{(stickOriginalPrice - stickPrice).toLocaleString("en-IN")}
                  </span>
                </>
              )}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-3 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded-full bg-stone-50 px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-950 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-950 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Emerald Green SHOP NOW Button (Matches Screenshot Exactly) */}
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={!isInStock}
                  className="px-9 py-3.5 bg-[#19a24b] hover:bg-[#15883e] active:scale-[0.98] text-white text-xs uppercase font-mono tracking-widest font-bold rounded-full transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Secondary ADD TO CART Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!isInStock}
                  className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-white text-xs uppercase font-mono tracking-widest font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isAddedToast ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D4BC96]" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust markers */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] text-stone-500 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Free Express Delivery
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                  Original Mysore Certified
                </span>
                <span>•</span>
                <span>Includes Gandhakal Stone</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Ritual Guide / How to Use Modal */}
      {showRitualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 text-left">
            <button
              type="button"
              onClick={() => setShowRitualModal(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono tracking-widest uppercase text-[#19a24b] font-bold block mb-1">
              TRADITIONAL AYURVEDIC PROCEDURE
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-950 mb-3">
              How to Prepare Sandalwood Paste
            </h3>

            <div className="space-y-4 text-sm text-stone-600 leading-relaxed font-light">
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-150 text-stone-800 font-mono text-xs flex items-center justify-center shrink-0 font-bold">1</span>
                <p><strong className="text-stone-900 font-medium">Clean the Stone:</strong> Rinse the terracotta Gandhakal stone with fresh water and place it on a steady surface.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-150 text-stone-800 font-mono text-xs flex items-center justify-center shrink-0 font-bold">2</span>
                <p><strong className="text-stone-900 font-medium">Add Drops of Water:</strong> Sprinkle 4–5 drops of pure mineral water or Kannauj Gulab Jal (rose water) onto the center of the stone.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-150 text-stone-800 font-mono text-xs flex items-center justify-center shrink-0 font-bold">3</span>
                <p><strong className="text-stone-900 font-medium">Rub in Circular Motions:</strong> Gently rub the sandalwood stick against the wet stone in continuous circles for 60 seconds to yield a rich, creamy, cooling paste.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-150 text-stone-800 font-mono text-xs flex items-center justify-center shrink-0 font-bold">4</span>
                <p><strong className="text-stone-900 font-medium">Apply &amp; Calm:</strong> Apply the paste with your fingertips to your forehead, temples, or skin. Experience immediate calming of thoughts and natural cooling.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowRitualModal(false)}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-full cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Quick-Edit Modal */}
      {showAdminEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-[#1f1d1b] text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-[#d4af37]/40 text-left my-8">
            <button
              type="button"
              onClick={() => setShowAdminEditModal(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#d4af37] font-bold">
                ADMIN PANEL • SANDALWOOD PRODUCT CONFIG
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-white mb-5 font-bold">
              Edit Product Details &amp; Photo
            </h3>

            <div className="space-y-4 text-xs font-serif">
              {/* Product Photo Upload / Preview */}
              <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-3">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] block font-bold">
                  Product Image / Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-stone-700 bg-stone-950 shrink-0">
                    <img src={editImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      id="sandalwood-quick-photo-upload"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                    <label
                      htmlFor="sandalwood-quick-photo-upload"
                      className="px-4 py-2 bg-[#d4af37] hover:bg-[#e5c358] text-stone-950 font-mono text-[10px] uppercase tracking-wider font-bold rounded-lg inline-flex items-center gap-2 cursor-pointer transition-all shadow"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setEditImage("/images/sandalwood_stick_rubbing_stone.png")}
                      className="ml-2 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      Use Default Photo
                    </button>
                    <input
                      type="text"
                      placeholder="Or paste image URL"
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 p-2 text-[11px] rounded text-stone-200 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 p-2.5 text-xs rounded text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={editSubtitle}
                    onChange={(e) => setEditSubtitle(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 p-2.5 text-xs rounded text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 p-2.5 text-xs rounded text-white outline-none focus:border-[#d4af37] leading-relaxed"
                />
              </div>

              {/* Prices & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1">
                    Selling Offer Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 p-2.5 text-xs rounded text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1">
                    Original / MRP Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editOriginalPrice}
                    onChange={(e) => setEditOriginalPrice(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 p-2.5 text-xs rounded text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1">
                    Weight Spec (e.g. APPROX(50GM))
                  </label>
                  <input
                    type="text"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 p-2.5 text-xs rounded text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="sandalwood-instock-toggle"
                  checked={editInStock}
                  onChange={(e) => setEditInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-[#19a24b] cursor-pointer"
                />
                <label htmlFor="sandalwood-instock-toggle" className="text-xs text-stone-300 font-mono cursor-pointer">
                  Item is In Stock &amp; Buyable by Customers
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAdminEditModal(false)}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono uppercase tracking-wider rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAdminEdit}
                disabled={isSaving}
                className="px-7 py-2.5 bg-[#d4af37] hover:bg-[#e5c358] text-stone-950 text-xs font-mono uppercase tracking-widest font-bold rounded-xl shadow-lg cursor-pointer transition-all disabled:opacity-50"
              >
                {isSaving ? "Saving Changes..." : "Save & Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
