import { useState, useEffect, useRef, FormEvent } from "react";
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
  LockKeyhole,
  LogOut
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
  bulkEnquiryOpen?: boolean;
  setBulkEnquiryOpen?: (open: boolean) => void;
  onOpenScentFinder?: () => void;
  onOpenLayeringSalon?: () => void;
  onOpenCustomBlendLab?: () => void;
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
  siteSettings,
  bulkEnquiryOpen: propBulkEnquiryOpen,
  setBulkEnquiryOpen: propSetBulkEnquiryOpen,
  onOpenScentFinder,
  onOpenLayeringSalon,
  onOpenCustomBlendLab
}: HeaderProps) {
  const announcements = siteSettings?.announcementText
    ? [siteSettings.announcementText]
    : [
        "BUY 2 PRODUCTS AND GET 20% DISCOUNT, USE CODE : BUY2 | FREE TESTER ON ALL PREPAID ORDERS",
        "THE ART OF INDIAN PERFUMERY, BOTTLED FOR EVERYDAY WEAR",
        "TRADITIONAL ATTARS FOR CONTEMPORARY LIFESTYLES • 100% BOTANICAL",
        "COMPLIMENTARY SECURE PAN-INDIA DELIVERY ON ALL ORDERS"
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
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [notesDropdownOpen, setNotesDropdownOpen] = useState(false);
  const [useDropdownOpen, setUseDropdownOpen] = useState(false);
  const [internalBulkEnquiryOpen, setInternalBulkEnquiryOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const headerVisibleRef = useRef(true);
  const scrollTickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTickingRef.current) return;
      scrollTickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const lastY = lastScrollYRef.current;

        let shouldBeVisible = true;
        if (currentScrollY < 90) {
          shouldBeVisible = true;
        } else if (currentScrollY > lastY && currentScrollY > 150) {
          // Scrolling down -> hide header if no modal/dropdown is open
          if (!mobileMenuOpen && !collectionsDropdownOpen && !notesDropdownOpen && !useDropdownOpen && !searchOpen) {
            shouldBeVisible = false;
          } else {
            shouldBeVisible = true;
          }
        } else if (currentScrollY < lastY) {
          // Scrolling up -> reveal header
          shouldBeVisible = true;
        }

        if (headerVisibleRef.current !== shouldBeVisible) {
          headerVisibleRef.current = shouldBeVisible;
          setHeaderVisible(shouldBeVisible);
        }

        lastScrollYRef.current = currentScrollY;
        scrollTickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen, collectionsDropdownOpen, notesDropdownOpen, useDropdownOpen, searchOpen]);
  const bulkEnquiryOpen = propBulkEnquiryOpen !== undefined ? propBulkEnquiryOpen : internalBulkEnquiryOpen;
  const setBulkEnquiryOpen = propSetBulkEnquiryOpen || setInternalBulkEnquiryOpen;

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

  const collectionsMenu = [
    { id: "Authentic Indian Attars", name: "Authentic Indian Attars" },
    { id: "Eau De Parfum", name: "Eau De Parfum" },
    { id: "Modern Attars", name: "Modern Attars" },
    { id: "Indian Artisanal fragrances", name: "Indian Artisanal Fragrances" },
    { id: "Discovery Set", name: "Discovery Sets" },
    { id: "Ruh / Absolute Oil", name: "Ruh / Absolute Oil" },
    { id: "All", name: "Shop All Products" }
  ];

  const notesMenu = [
    { id: "Floral", name: "Floral Notes" },
    { id: "Woody", name: "Woody Notes" },
    { id: "Fresh", name: "Fresh Notes" },
    { id: "Musky", name: "Musky Notes" },
    { id: "Gourmand", name: "Gourmand Notes" },
    { id: "Oriental", name: "Oriental Notes" }
  ];

  const useMenu = [
    { id: "Daily Wear", name: "Daily Wear" },
    { id: "Office Wear", name: "Office Wear" },
    { id: "Festival Season", name: "Festival Season" },
    { id: "Party Wear", name: "Party Wear" },
    { id: "Summer", name: "Summer" },
    { id: "Winter", name: "Winter" }
  ];

  const handleCategorySelect = (categoryId: string) => {
    if (setSelectedCategory) {
      setSelectedCategory(categoryId);
    }
    onNavigate("shop");
    setCollectionsDropdownOpen(false);
    setNotesDropdownOpen(false);
    setUseDropdownOpen(false);
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
    <header className={`sticky top-0 z-50 w-full bg-white border-b border-stone-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}>

      {/* Luxury Minimalist Announcement Ticker Bar */}
      <div className="bg-black text-white py-2.5 relative overflow-hidden select-none w-full border-b border-stone-900 flex items-center">
        <div className="flex whitespace-nowrap overflow-hidden w-full">
          <div className="animate-marquee inline-flex shrink-0 items-center gap-8 pr-8 text-xs font-sans font-semibold tracking-wider text-white">
            <span>{siteSettings?.announcementText || "Traditional Attars for Contemporary Lifestyles"}</span>
            <span aria-hidden="true">•</span>
            <span>{siteSettings?.announcementText || "Traditional Attars for Contemporary Lifestyles"}</span>
            <span aria-hidden="true">•</span>
            <span>{siteSettings?.announcementText || "Traditional Attars for Contemporary Lifestyles"}</span>
            <span aria-hidden="true">•</span>
          </div>
          <div className="animate-marquee inline-flex shrink-0 items-center gap-8 pr-8 text-xs font-sans font-semibold tracking-wider text-white" aria-hidden="true">
            <span>{siteSettings?.announcementText || "Traditional Attars for Contemporary Lifestyles"}</span>
            <span aria-hidden="true">•</span>
            <span>{siteSettings?.announcementText || "Traditional Attars for Contemporary Lifestyles"}</span>
            <span aria-hidden="true">•</span>
            <span>{siteSettings?.announcementText || "Traditional Attars for Contemporary Lifestyles"}</span>
            <span aria-hidden="true">•</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* TOP ROW: Search | Logo | Profile & Bag */}
        <div className="grid grid-cols-3 h-24 items-center border-b border-stone-50">
          
          {/* TOP LEFT: Mobile Trigger / Spacing */}
          <div className="flex items-center justify-start gap-4">
            {/* Mobile Menu Trigger */}
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-sand-900 hover:text-stone-300 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              id="mobile-menu-trigger"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 stroke-[1.25]" />
            </button>
          </div>

          {/* TOP CENTER: Logo */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => onNavigate("hero")}
              className="cursor-pointer focus:outline-none py-1 group"
            >
              <Logo variant="header" showSubtitle={false} customLogoUrl={siteSettings?.customLogoUrl} />
            </button>
          </div>

          {/* TOP RIGHT: Utilities (Search, Account, Admin, Bag, Logout) */}
          <div className="flex items-center justify-end gap-3 sm:gap-5">
            {/* Elegant search magnifying glass & sliding bar */}
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-sand-900 hover:text-[#D4BC96] transition-all duration-300 transform hover:scale-105"
                title="Search the olfactory logs"
                aria-label="Search fragrances"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>
              
              {/* Sliding Luxury Search Bar — full-width on mobile to prevent off-screen overflow */}
              {searchOpen && (
                <div className="absolute left-0 sm:left-auto sm:right-8 right-0 top-full sm:top-1/2 sm:-translate-y-1/2 bg-white border border-stone-200 rounded-none sm:rounded-full px-4 py-2.5 sm:py-1.5 flex items-center shadow-md sm:w-72 z-40 animate-fade-in">
                  <input
                    type="text"
                    placeholder="Search notes, ingredients, attars..."
                    value={searchQuery}
                    onChange={(e) => {
                      if (setSearchQuery) setSearchQuery(e.target.value);
                      onNavigate("shop");
                    }}
                    className="bg-transparent text-sm sm:text-xs text-stone-800 focus:outline-none w-full placeholder-stone-400 font-light"
                    style={{ fontSize: '16px' }}
                    autoFocus
                  />
                  <button 
                    onClick={() => {
                      if (setSearchQuery) setSearchQuery("");
                      setSearchOpen(false);
                    }}
                    className="text-stone-400 hover:text-stone-600 ml-1.5 cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onLoungeClick}
              className="text-sand-900 hover:text-stone-600 transition-colors p-1"
              aria-label="Account Lounge"
              title="Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Admin link only visible when already logged in (fix #20) */}
            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={onAdminClick}
                className="text-sand-900 hover:text-stone-600 transition-colors p-1"
                aria-label="Admin console"
                title="Admin"
              >
                <LockKeyhole className="w-4 h-4 stroke-[1.5]" />
              </button>
            )}

            <button
              type="button"
              onClick={onOpenCart}
              className="relative text-sand-900 hover:text-stone-600 transition-colors p-1"
              aria-label="Shopping bag"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </button>

            {isAdminLoggedIn && (
              <button
                type="button"
                onClick={onLogout}
                className="text-stone-700 hover:text-stone-950 transition-colors p-1"
                aria-label="Log out"
                title="Log out"
              >
                <LogOut className="w-4.5 h-4.5 stroke-[1.5]" />
              </button>
            )}
          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-between h-12 relative border-t border-sand-200">
          <ul className="flex items-center space-x-7 text-xs tracking-widest uppercase font-sans text-stone-900 font-semibold">
            
            {/* 0. Home Link */}
            <li className="relative py-3">
              <button
                type="button"
                onClick={() => {
                  if (setSelectedCategory) setSelectedCategory("All");
                  if (setSearchQuery) setSearchQuery("");
                  onNavigate("hero");
                }}
                className={`transition-colors cursor-pointer hover:text-[#19a24b] ${
                  activeSection === "hero" ? "text-[#19a24b] font-bold" : "text-stone-900"
                }`}
              >
                Home
              </button>
            </li>

            {/* 1. Collections Dropdown */}
            <li 
              className="relative py-3 group"
              onMouseEnter={() => setCollectionsDropdownOpen(true)}
              onMouseLeave={() => setCollectionsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => handleCategorySelect("All")}
                className="hover:text-[#19a24b] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Collections</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>

              {collectionsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white border border-stone-200 shadow-xl rounded-2xl py-2 z-50 animate-fade-in">
                  {collectionsMenu.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => handleCategorySelect(col.id)}
                      className="w-full text-left px-4 py-2.5 text-xs font-serif text-stone-700 hover:text-white hover:bg-stone-900 transition-colors flex items-center justify-between"
                    >
                      <span>{col.name}</span>
                      <span className="text-xs text-stone-400 font-mono tracking-normal">→</span>
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* 2. Shop by Notes Dropdown */}
            <li 
              className="relative py-3 group"
              onMouseEnter={() => setNotesDropdownOpen(true)}
              onMouseLeave={() => setNotesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("shop-by-notes-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-[#19a24b] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Shop by Notes</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>

              {notesDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-white border border-stone-200 shadow-xl rounded-2xl py-2 z-50 animate-fade-in">
                  {notesMenu.map((note) => (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => {
                        if (setSelectedCategory) setSelectedCategory(note.id);
                        onNavigate("shop");
                        setNotesDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-serif text-stone-700 hover:text-white hover:bg-stone-900 transition-colors flex items-center justify-between"
                    >
                      <span>{note.name}</span>
                      <span className="text-xs text-stone-400 font-mono tracking-normal">Explore</span>
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* 3. Shop by Occasion / Use Dropdown */}
            <li 
              className="relative py-3 group"
              onMouseEnter={() => setUseDropdownOpen(true)}
              onMouseLeave={() => setUseDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("shop-by-use-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-[#19a24b] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Shop By Use</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>

              {useDropdownOpen && (
                <div className="absolute top-full left-0 w-52 bg-white border border-stone-200 shadow-xl rounded-2xl py-2 z-50 animate-fade-in">
                  {useMenu.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (setSearchQuery) setSearchQuery(item.id.replace(" Wear", ""));
                        onNavigate("shop");
                        setUseDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-serif text-stone-700 hover:text-white hover:bg-stone-900 transition-colors flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                      <span className="text-xs text-stone-400 font-mono tracking-normal">Occasion</span>
                    </button>
                  ))}
                </div>
              )}
            </li>

            {/* 4. Discovery Set */}
            <li className="relative py-3">
              <button
                type="button"
                onClick={() => handleCategorySelect("Discovery Set")}
                className="hover:text-[#19a24b] transition-colors cursor-pointer"
              >
                Discovery Sets
              </button>
            </li>

            {/* 5. Our Story */}
            <li className="relative py-3">
              <button
                type="button"
                onClick={() => onNavigate("our-story")}
                className="hover:text-[#19a24b] transition-colors cursor-pointer"
              >
                Our Story
              </button>
            </li>
          </ul>

          {/* Utility links moved to secondary position (fix #21) */}
          {/* fix #1, #2 – text-stone-600 (#57534e on #fff = 7:1 contrast, passes 4.5:1) */}
          <div className="flex items-center gap-4 text-xs tracking-widest uppercase font-sans text-stone-600 font-semibold">
            <button
              type="button"
              onClick={() => setBulkEnquiryOpen(true)}
              className="hover:text-stone-700 transition-colors cursor-pointer"
            >
              Bulk Enquiry
            </button>
            <button
              type="button"
              onClick={onTrackOrderClick}
              className="hover:text-stone-700 transition-colors cursor-pointer"
            >
              Track Order
            </button>
          </div>
        </nav>

      </div>

      {/* LUXURY INTERACTIVE BULK ENQUIRY FORM MODAL */}
      {bulkEnquiryOpen && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-md z-[99999] flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border border-stone-100 animate-scale-up relative max-h-[92vh] flex flex-col my-auto">
            
            {/* Header segment with handdrawn feel */}
            <div className="bg-[#1C1917] p-5 sm:p-6 text-[#FAFAFA] relative shrink-0">
              <button
                type="button"
                onClick={() => setBulkEnquiryOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 stroke-[1.25]" />
              </button>
              <p className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-1">Catering & Corporate Bespoke Commissioning</p>
              <h3 className="text-xl sm:text-2xl font-serif tracking-wide" style={{ fontFamily: "Cinzel, Georgia, serif" }}>Ruh Imperium Bulk Inquiry</h3>
              <p className="text-xs text-stone-300 font-light mt-1.5 leading-relaxed">
                Connect with our head nose to craft signature Wedding Favors, Corporate Monographed Chests, or Custom Compound Gifting Suites.
              </p>
            </div>

            {/* Inner Content */}
            {bulkSubmitted ? (
              <div className="p-6 sm:p-8 text-center text-stone-800 flex flex-col items-center justify-center space-y-4 overflow-y-auto">
                <CheckCircle className="w-14 h-14 text-emerald-500" />
                <h4 className="text-xl font-serif">Inquiry Lodged at Royal Registry</h4>
                <p className="text-xs text-stone-500 font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-stone-900 font-serif">{bulkForm.name}</strong>. A dedicated Imperial Concierge will coordinate your custom request for <strong className="text-stone-900">{bulkForm.quantity}</strong> of <strong className="text-stone-900">{bulkForm.type}</strong>. We will contact you at <span className="underline">{bulkForm.email}</span> within 4 business hours.
                </p>
                <div className="pt-4 text-xs tracking-widest text-[#D4BC96] uppercase animate-pulse">
                  Preparing Olfactory Proposal dossier...
                </div>
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">Your Full Name *</label>
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
                    <label className="block text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">E-mail Address *</label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">Telephone Number *</label>
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
                    <label className="block text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">Company / House Name</label>
                    <input
                      type="text"
                      value={bulkForm.company}
                      onChange={(e) => setBulkForm({...bulkForm, company: e.target.value})}
                      className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                      placeholder="e.g. Royal Jaipur Club"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">Inquiry Category</label>
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
                    <label className="block text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">Required Volume</label>
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
                  <label className="block text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">Design Customizations Note / Event Details</label>
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
            <div className="bg-stone-50 p-4 border-t border-stone-100 flex items-center justify-around text-xs text-stone-600 font-serif font-light">
              <a 
                href="tel:+919116711413" 
                className="flex items-center gap-1.5 hover:text-stone-950 transition-colors"
                title="Call Imperial Concierge"
              >
                <Phone className="w-3.5 h-3.5 text-gold-500" />
                <span>+91 91167 11413</span>
              </a>
              <a 
                href="mailto:support@ruhimperium.com" 
                className="flex items-center gap-1.5 hover:text-stone-950 transition-colors"
                title="Email Imperial Concierge"
              >
                <Mail className="w-3.5 h-3.5 text-gold-500" />
                <span>support@ruhimperium.com</span>
              </a>
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
                <button
                  type="button"
                  onClick={() => {
                    onNavigate("hero");
                    setMobileMenuOpen(false);
                  }}
                  className="text-left focus:outline-none"
                  aria-label="Return to home"
                >
                  <Logo variant="header" showSubtitle={true} className="!items-start" customLogoUrl={siteSettings?.customLogoUrl} />
                </button>
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
                    if (setSelectedCategory) setSelectedCategory("All");
                    if (setSearchQuery) setSearchQuery("");
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
                  <p className="text-xs uppercase tracking-widest text-[#D4BC96] font-semibold mb-2">Collections</p>
                  <div className="pl-3 space-y-2.5 border-l border-stone-200">
                    {collectionsMenu.map((cat) => (
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
                    onNavigate("our-story");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm uppercase tracking-widest border-b border-stone-200/50 pb-2.5 font-serif ${
                    activeSection === "our-story" ? "text-gold-600 font-semibold" : "text-stone-600"
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
            <div className="border-t border-stone-200 pt-6 space-y-3">
              <p className="text-xs tracking-widest uppercase text-stone-400">
                Direct Imperial Concierge
              </p>
              <div className="flex flex-col space-y-2 text-xs font-serif text-stone-700">
                <a 
                  href="tel:+919116711413" 
                  className="flex items-center gap-2 hover:text-[#D4BC96] transition-colors py-1"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  <span>+91 91167 11413</span>
                </a>
                <a 
                  href="mailto:support@ruhimperium.com" 
                  className="flex items-center gap-2 hover:text-[#D4BC96] transition-colors py-1"
                >
                  <Mail className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                  <span>support@ruhimperium.com</span>
                </a>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed font-serif pt-1">
                Pure copper still botanical extractions straight from Kannauj, India to your door.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
