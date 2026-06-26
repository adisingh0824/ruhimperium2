import { useState, useEffect, FormEvent } from "react";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  Globe, 
  Send,
  Phone,
  Mail,
  Gift,
  Sparkles,
  CheckCircle,
  Truck,
  LockKeyhole
} from "lucide-react";
import { CartItem, SiteSettings } from "../types";
import Logo from "./Logo";

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
  onTrackOrderClick: () => void;
  onAdminClick: () => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
  // Optional search state synchronization
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  setSelectedCategory?: (category: string) => void;
  // USER LOUNGE INTERACTIVE ACTIONS
  onLoungeClick: () => void;
  currentUser: any;
  siteSettings?: SiteSettings;
}

export default function Header({ 
  cart, 
  onOpenCart, 
  onNavigate, 
  activeSection,
  onTrackOrderClick,
  onAdminClick,
  isAdminLoggedIn,
  onLogout,
  searchQuery = "",
  setSearchQuery,
  setSelectedCategory,
  onLoungeClick,
  currentUser,
  siteSettings
}: HeaderProps) {
  const announcements = siteSettings?.announcementText
    ? [siteSettings.announcementText]
    : [
        "EXPERIENCE THE ART OF LUXURY SLOW-PERFUMERY",
        "CO-FOUNDED BY MASTER PERFUMERS VIMAL & ADITYA IN MUMBAI",
        "COMPLIMENTARY SECURE PAN-INDIA DELIVERY ON ALL PRODUCTS",
        "USE EXCLUSIVITY CODE 'RUH20' AT CABINET TO UNLOCK 20% PRIVILEGE"
      ];
  const [currentAnnouncementIdx, setCurrentAnnouncementIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [giftingOpen, setGiftingOpen] = useState(false);
  const [bulkEnquiryOpen, setBulkEnquiryOpen] = useState(false);

  // Bulk Enquiry Form States
  const [bulkForm, setBulkForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "Wedding Celebration Favors",
    quantity: "50-100 units",
    message: ""
  });
  const [bulkSubmitted, setBulkSubmitted] = useState(false);

  const cartTotalItems = cart.reduce((sums, item) => sums + item.quantity, 0);

  const categories = [
    { id: "All", name: "All Scent Houses" },
    { id: "Eau De Parfum", name: "Imperial Eau De Parfums" },
    { id: "Attar Blend", name: "Bespoke Botanical Attars" },
    { id: "Discovery Set", name: "Curated Discovery Boxes" }
  ];

  const handleCategorySelect = (categoryId: string) => {
    if (setSelectedCategory) {
      setSelectedCategory(categoryId);
    }
    onNavigate("shop");
    setShopDropdownOpen(false);
  };

  const handleBulkSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBulkSubmitted(true);
    setTimeout(() => {
      setBulkSubmitted(false);
      setBulkEnquiryOpen(false);
      setBulkForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        type: "Wedding Celebration Favors",
        quantity: "50-100 units",
        message: ""
      });
    }, 3500);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] transition-all duration-300">

      {/* Luxury Minimalist Announcement Bar */}
      <div className="bg-black text-white py-2 px-4 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-widest text-white text-center">
            <span>{announcements[currentAnnouncementIdx]}</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* TOP ROW: Search | Logo | Profile & Bag */}
        <div className="grid grid-cols-3 h-24 items-center border-b border-stone-50">
          
          {/* TOP LEFT: Quick Scent Search */}
          <div className="flex items-center justify-start gap-4">
            {/* Mobile Menu Trigger */}
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-stone-600 hover:text-stone-900 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              id="mobile-menu-trigger"
            >
              <Menu className="w-6 h-6 stroke-[1.25]" />
            </button>

            {/* Elegant search magnifying glass */}
            <div className="hidden lg:flex items-center gap-2 relative">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-stone-600 hover:text-gold-600 transition-all duration-300 transform hover:scale-105"
                title="Search the olfactory logs"
              >
                <Search className="w-[18px] h-[18px] stroke-[1.5]" />
              </button>
              
              {/* Sliding Luxury Search Bar */}
              {searchOpen && (
                <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-white border border-stone-200 rounded-full px-4 py-1.5 flex items-center shadow-md w-72 z-40 animate-fade-in">
                  <input
                    type="text"
                    placeholder="Search notes, ingredients, attars..."
                    value={searchQuery}
                    onChange={(e) => {
                      if (setSearchQuery) setSearchQuery(e.target.value);
                      onNavigate("shop");
                    }}
                    className="bg-transparent text-xs text-stone-800 focus:outline-none w-full placeholder-stone-400 font-light"
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      if (setSearchQuery) setSearchQuery("");
                      setSearchOpen(false);
                    }}
                    className="text-stone-400 hover:text-stone-600 ml-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* TOP CENTER: Logo */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => onNavigate("hero")}
              className="cursor-pointer focus:outline-none py-1 group"
            >
              {siteSettings?.customLogoUrl ? (
                <img src={siteSettings.customLogoUrl} alt="Logo" className="h-8 md:h-12 object-contain" />
              ) : (
                <span className="text-2xl md:text-3xl font-serif font-bold tracking-widest uppercase">Raahi</span>
              )}
            </button>
          </div>

          {/* TOP RIGHT: Account & Bag */}
          <div className="flex items-center justify-end gap-4 sm:gap-6">
            <button
              type="button"
              onClick={onLoungeClick}
              className="text-black hover:text-gray-500 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onAdminClick}
              className="text-black hover:text-gray-500 transition-colors"
            >
              <LockKeyhole className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative text-black hover:text-gray-500 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </button>

            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={onLogout}
                className="text-[10px] uppercase tracking-widest text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* BOTTOM ROW: Minimalist Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center h-12 relative border-t border-stone-100">
          <ul className="flex items-center space-x-12 text-[12px] tracking-widest uppercase font-sans text-stone-800 font-medium">
            
            {/* 1. Shop All */}
            <li className="relative py-3">
              <button
                type="button"
                onClick={() => {
                  if (setSelectedCategory) setSelectedCategory("All");
                  onNavigate("shop");
                }}
                className={`hover:text-gray-500 transition-colors cursor-pointer relative group`}
              >
                Shop All
              </button>
            </li>

            {/* 2. Collections */}
            <li className="relative py-3">
              <button
                type="button"
                onClick={() => {
                  if (setSelectedCategory) setSelectedCategory("Discovery Set");
                  onNavigate("shop");
                }}
                className={`hover:text-gray-500 transition-colors cursor-pointer relative group`}
              >
                Collections
              </button>
            </li>

            {/* 3. Gifting */}
            <li className="relative py-3">
              <button
                type="button"
                onClick={() => setBulkEnquiryOpen(true)}
                className={`hover:text-gray-500 transition-colors cursor-pointer relative group`}
              >
                Gifting
              </button>
            </li>

            {/* 4. Our Story */}
            <li className="relative py-3">
              <button
                type="button"
                onClick={() => onNavigate("journal")}
                className={`hover:text-gray-500 transition-colors cursor-pointer relative group`}
              >
                Our Story
              </button>
            </li>

            {/* 5. Track Order */}
            <li className="relative py-3">
              <button
                type="button"
                onClick={onTrackOrderClick}
                className="hover:text-gray-500 transition-colors cursor-pointer relative group"
              >
                Track Order
              </button>
            </li>

          </ul>
        </nav>

      </div>

      {/* LUXURY INTERACTIVE BULK ENQUIRY FORM MODAL */}
      {bulkEnquiryOpen && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-md z-[99999] flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border border-stone-100 animate-scale-up relative">
            
            {/* Header segment with handdrawn feel */}
            <div className="bg-[#1C1917] p-6 text-[#FAFAFA] relative">
              <button
                type="button"
                onClick={() => setBulkEnquiryOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 stroke-[1.25]" />
              </button>
              <p className="text-[9px] uppercase tracking-[0.25em] text-gold-400 font-semibold mb-1">Catering & Corporate Bespoke Commissioning</p>
              <h3 className="text-2xl font-serif tracking-wide" style={{ fontFamily: "Cinzel, Georgia, serif" }}>Ruh Imperium Bulk Inquiry</h3>
              <p className="text-xs text-stone-300 font-light mt-1.5 leading-relaxed">
                Connect with our head nose to craft signature Wedding Favors, Corporate Monographed Chests, or Custom Compound Gifting Suites.
              </p>
            </div>

            {/* Inner Content */}
            {bulkSubmitted ? (
              <div className="p-8 text-center text-stone-800 flex flex-col items-center justify-center space-y-4">
                <CheckCircle className="w-14 h-14 text-emerald-500" />
                <h4 className="text-xl font-serif">Inquiry Lodged at Royal Registry</h4>
                <p className="text-xs text-stone-500 font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-stone-900 font-serif">{bulkForm.name}</strong>. A dedicated Imperial Concierge will coordinate your custom request for <strong className="text-stone-900">{bulkForm.quantity}</strong> of <strong className="text-stone-900">{bulkForm.type}</strong>. We will contact you at <span className="underline">{bulkForm.email}</span> within 4 business hours.
                </p>
                <div className="pt-4 text-[10px] tracking-widest text-[#D4BC96] uppercase animate-pulse">
                  Preparing Olfactory Proposal dossier...
                </div>
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bulkForm.name}
                      onChange={(e) => setBulkForm({...bulkForm, name: e.target.value})}
                      className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                      placeholder="e.g. Aditya Singh"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">E-mail Address *</label>
                    <input
                      type="email"
                      required
                      value={bulkForm.email}
                      onChange={(e) => setBulkForm({...bulkForm, email: e.target.value})}
                      className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                      placeholder="e.g. aditya@realm.in"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">Telephone Number *</label>
                    <input
                      type="tel"
                      required
                      value={bulkForm.phone}
                      onChange={(e) => setBulkForm({...bulkForm, phone: e.target.value})}
                      className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">Company / House Name</label>
                    <input
                      type="text"
                      value={bulkForm.company}
                      onChange={(e) => setBulkForm({...bulkForm, company: e.target.value})}
                      className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                      placeholder="e.g. Royal Jaipur Club"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">Inquiry Category</label>
                    <select
                      value={bulkForm.type}
                      onChange={(e) => setBulkForm({...bulkForm, type: e.target.value})}
                      className="w-full border border-stone-200 focus:border-[#D4BC96] bg-white rounded-lg px-3 py-2 text-xs focus:outline-none font-light"
                    >
                      <option>Wedding Celebration Favors</option>
                      <option>Corporate Landmark Gifting</option>
                      <option>Bespoke Event Ambient Scenting</option>
                      <option>Custom Bottle Batch Formulation</option>
                      <option>Premium Private Wholesale</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">Required Volume</label>
                    <select
                      value={bulkForm.quantity}
                      onChange={(e) => setBulkForm({...bulkForm, quantity: e.target.value})}
                      className="w-full border border-stone-200 focus:border-[#D4BC96] bg-white rounded-lg px-3 py-2 text-xs focus:outline-none font-light"
                    >
                      <option>25-50 items (Boutique Special)</option>
                      <option>50-100 units (Standard Gala)</option>
                      <option>100-500 units (Grand Ceremony)</option>
                      <option>500+ units (Corporate Imperial)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">Design Customizations Note / Event Details</label>
                  <textarea
                    rows={3}
                    value={bulkForm.message}
                    onChange={(e) => setBulkForm({...bulkForm, message: e.target.value})}
                    className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light resize-none"
                    placeholder="Describe specific motifs, bespoke text engraving labels or target olfactory families (Sandy Hills/Sidr Wood/Island Bloom...)"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-serif py-3 rounded-lg text-xs uppercase tracking-widest transition-all duration-300 shadow-md font-medium cursor-pointer"
                >
                   Lodge Custom Inquiry dossier →
                </button>
              </form>
            )}

            {/* Quick Contact options at bottom */}
            <div className="bg-stone-50 p-4 border-t border-stone-100 flex items-center justify-around text-[10.5px] text-stone-500 font-serif font-light">
              <span className="flex items-center gap-1.5 hover:text-stone-900 transition-colors">
                <Phone className="w-3.5 h-3.5 text-gold-500" />
                <span>+91 999 008 1111</span>
              </span>
              <span className="flex items-center gap-1.5 hover:text-stone-900 transition-colors">
                <Mail className="w-3.5 h-3.5 text-gold-500" />
                <span>ambassador@ruh-imperium.com</span>
              </span>
            </div>

          </div>
        </div>
      )}

      {/* MOBILE REACTION SIDEBAR */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] flex lg:hidden bg-stone-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-[85%] max-w-sm bg-stone-50 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-stone-200/50 pb-4">
                <Logo variant="header" showSubtitle={true} className="!items-start" customLogoUrl={siteSettings?.customLogoUrl} />
                <button
                  type="button"
                  className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-200/60"
                  onClick={() => setMobileMenuOpen(false)}
                  id="mobile-close-btn"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Mobile links exact same stack */}
              <div className="flex flex-col space-y-4">
                
                {/* 1. Home */}
                <button
                  type="button"
                  onClick={() => {
                    onNavigate("hero");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm uppercase tracking-widest border-b border-stone-200/50 pb-2.5 font-serif ${
                    activeSection === "hero" ? "text-gold-600 font-semibold" : "text-stone-600"
                  }`}
                >
                  Home
                </button>

                {/* 2. Shop Collections header / Categories */}
                <div className="py-1">
                  <p className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-semibold mb-2">Shop Categories</p>
                  <div className="pl-3 space-y-2.5 border-l border-stone-200">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          handleCategorySelect(cat.id);
                          setMobileMenuOpen(false);
                        }}
                        className="block text-left text-xs font-serif text-stone-500 hover:text-stone-900"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Discovery Set */}
                <button
                  type="button"
                  onClick={() => {
                    if (setSelectedCategory) setSelectedCategory("Discovery Set");
                    onNavigate("shop");
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm uppercase tracking-widest border-b border-stone-200/50 pb-2.5 font-serif text-stone-600 hover:text-stone-900"
                >
                  Discovery Set
                </button>

                {/* 5. For Bulk Enquiry */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBulkEnquiryOpen(true);
                  }}
                  className="text-left text-sm uppercase tracking-widest border-b border-stone-200/50 pb-2.5 font-serif text-[#D4BC96] font-medium"
                >
                  For Bulk Enquiry
                </button>

                {/* 6. Our Story */}
                <button
                  type="button"
                  onClick={() => {
                    onNavigate("journal");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm uppercase tracking-widest border-b border-stone-200/50 pb-2.5 font-serif ${
                    activeSection === "journal" ? "text-gold-600 font-semibold" : "text-stone-600"
                  }`}
                >
                  Our Story
                </button>

                {/* 7. Tracking */}
                <button
                  type="button"
                  onClick={() => {
                    onTrackOrderClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-sm uppercase tracking-widest border-b border-stone-200/50 pb-2.5 font-serif text-stone-600"
                >
                  Track your order
                </button>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="border-t border-stone-200 pt-6">
              <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-2">
                Ruh Imperium Sourcing
              </p>
              <p className="text-xs text-stone-500 font-light leading-relaxed font-serif">
                Olfactory masterpieces designed down the sacred spice roads, incense markets, and sacred woods that span our beautiful continent.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
