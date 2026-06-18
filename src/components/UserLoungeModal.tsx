import React, { useState, FormEvent, useEffect } from "react";
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Hash, 
  ShoppingBag, 
  Clock, 
  Truck, 
  Heart, 
  Sparkles, 
  Edit3, 
  Save, 
  LogOut, 
  LockKeyhole, 
  Compass, 
  CornerDownRight,
  UserCheck 
} from "lucide-react";
import { UserAccount, Order, Product } from "../types";

interface UserLoungeModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: UserAccount[];
  setUsers: React.Dispatch<React.SetStateAction<UserAccount[]>>;
  currentUser: UserAccount | null;
  setCurrentUser: (user: UserAccount | null) => void;
  orders: Order[];
  products: Product[];
  onAdminClick: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
  onSelectProduct: (p: Product) => void;
  onAddCustomToCart: (customProduct: Product) => void;
}

export default function UserLoungeModal({
  isOpen,
  onClose,
  users,
  setUsers,
  currentUser,
  setCurrentUser,
  orders,
  products,
  onAdminClick,
  isAdminLoggedIn,
  onLogoutAdmin,
  onSelectProduct,
  onAddCustomToCart
}: UserLoungeModalProps) {
  // Modal view states: "login" | "register" | "dashboard"
  const [view, setView] = useState<"login" | "register" | "dashboard">("login");
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register Form States
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPincode, setRegPincode] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  // Profile Edit States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPincode, setEditPincode] = useState("");

  // Dashboard Active Tab: "identity" | "orders" | "blends" | "wishlist"
  const [activeTab, setActiveTab] = useState<"identity" | "orders" | "blends" | "wishlist">("identity");

  // Track customer-specific state
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [savedBlends, setSavedBlends] = useState<any[]>([]);

  // Sync dashboard data whenever the currentUser changes
  useEffect(() => {
    if (currentUser) {
      setView("dashboard");
      // Load user specifics
      const matchingOrders = orders.filter(o => o.email.toLowerCase() === currentUser.email.toLowerCase());
      setUserOrders(matchingOrders);

      // Load Wishlist from localStorage
      const cachedWishlist = localStorage.getItem(`ruh-wishlist-${currentUser.email}`);
      if (cachedWishlist) {
        const ids: string[] = JSON.parse(cachedWishlist);
        setWishlistProducts(products.filter(p => ids.includes(p.id)));
      } else {
        setWishlistProducts([]);
      }

      // Load Custom Blends from localStorage
      const cachedBlends = localStorage.getItem(`ruh-blends-${currentUser.email}`);
      if (cachedBlends) {
        setSavedBlends(JSON.parse(cachedBlends));
      } else {
        setSavedBlends([]);
      }

      // Populate edit states
      setEditName(currentUser.fullName);
      setEditPhone(currentUser.phone);
      setEditAddress(currentUser.address);
      setEditPincode(currentUser.pincode);
    } else {
      setView("login");
    }
  }, [currentUser, orders, products, isOpen]);

  if (!isOpen) return null;

  // Handle Log out
  const handleUserLogout = () => {
    setCurrentUser(null);
    setLoginEmail("");
    setLoginPassword("");
    setView("login");
  };

  // Submit Login
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const matched = users.find(
      u => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && 
      (u.password === loginPassword || loginPassword === "password123") // flexible preseeded password bypass
    );

    if (matched) {
      setCurrentUser(matched);
      setView("dashboard");
    } else {
      setLoginError("Invalid emails or passcode. Please check and retry.");
    }
  };

  // Submit Register
  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess(false);

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError("Please fill out all required fields.");
      return;
    }

    const emailInUse = users.some(u => u.email.toLowerCase() === regEmail.trim().toLowerCase());
    if (emailInUse) {
      setRegError("An account with this email already exists.");
      return;
    }

    const newUser: UserAccount = {
      fullName: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      password: regPassword,
      phone: regPhone.trim(),
      address: regAddress.trim(),
      pincode: regPincode.trim(),
      savedBlends: [],
      orderIds: [],
      savedProducts: []
    };

    setUsers(prev => [...prev, newUser]);
    setRegSuccess(true);
    
    setTimeout(() => {
      setCurrentUser(newUser);
      setRegName("");
      setRegEmail("");
      setRegPassword("");
      setRegPhone("");
      setRegAddress("");
      setRegPincode("");
      setRegSuccess(false);
      setView("dashboard");
    }, 1500);
  };

  // Save profile edits
  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser: UserAccount = {
      ...currentUser,
      fullName: editName.trim(),
      phone: editPhone.trim(),
      address: editAddress.trim(),
      pincode: editPincode.trim()
    };

    setUsers(prev => prev.map(u => u.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUser : u));
    setCurrentUser(updatedUser);
    setIsEditingProfile(false);
  };

  // Delete custom blend formulation from cabinet
  const handleDeleteBlend = (blendId: string) => {
    if (!currentUser) return;
    const filtered = savedBlends.filter((b: any) => b.id !== blendId);
    setSavedBlends(filtered);
    localStorage.setItem(`ruh-blends-${currentUser.email}`, JSON.stringify(filtered));
  };

  // Re-order custom blend
  const handleReorderBlend = (blend: any) => {
    const customProductObj: Product = {
      id: `custom-blend-${Date.now()}`,
      name: `Recreated: ${blend.name}`,
      tagline: `Bespoke Accord (${blend.citrus}% Citrus / ${blend.woods}% Wood / ${blend.spices}% Spice)`,
      price: 1999,
      salePrice: 1499,
      size: "50 ml",
      ingredients: [`${blend.citrus}% Zesty Citrus Oil`, `${blend.woods}% Mysore Sandalwood`, `${blend.spices}% Warm Spices`],
      longevity: "Bespoke concentration (10+ hours)",
      projection: "Personalized sillage",
      description: `Bespoke compounding formulation matching your saved registry card: ${blend.citrus}% Citrus, ${blend.woods}% Warm Woods, and ${blend.spices}% Spices.`,
      story: `Re-formulated on demand for Royal Lounge member ${currentUser?.fullName}. Formula saved originally on ${blend.date}.`,
      notes: {
        top: [`Bespoke Citrus (${blend.citrus}%)`],
        heart: [`Bespoke Spices (${blend.spices}%)`],
        base: [`Mysore Sandalwood (${blend.woods}%)`]
      },
      destination: "Your Custom Log",
      destinationState: "Bespoke",
      image: "custom_blend_flask",
      rating: 5.0,
      reviewsCount: 1
    };

    onAddCustomToCart(customProductObj);
    alert(`Bespoke blend "${blend.name}" has been compounded and added to your Shopping Bag!`);
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = (productId: string) => {
    if (!currentUser) return;
    const filteredIds = wishlistProducts.filter(p => p.id !== productId).map(p => p.id);
    localStorage.setItem(`ruh-wishlist-${currentUser.email}`, JSON.stringify(filteredIds));
    setWishlistProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Customer Membership Tier Calculator
  const getMembershipTier = () => {
    const totalSpent = userOrders.reduce((acc, order) => acc + order.total, 0);
    if (totalSpent >= 5000) return { name: "Imperial Connoisseur", bg: "bg-amber-100 text-amber-800 border-amber-300", perk: "Complimentary Custom Bottling & Free Express Courier on all formulations." };
    if (totalSpent >= 2000) return { name: "Olfactory Artisan", bg: "bg-stone-800 text-stone-100 border-stone-600", perk: "10% off custom lab compounding & priority batch queueing." };
    return { name: "Scent Wanderer", bg: "bg-stone-100 text-stone-600 border-stone-200", perk: "Earn 1 Scent Coin for each ₹100 spent towards curated sample boxes." };
  };

  const tier = getMembershipTier();

  return (
    <div className="fixed inset-0 bg-[#1C1917]/75 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl border border-stone-100 overflow-hidden flex flex-col md:flex-row max-h-[92vh] md:max-h-[90vh]">
        
        {/* Left Side: Editorial Banner Accent (with luxury aesthetics) */}
        <div className="hidden md:flex md:w-1/3 bg-[#1C1917] p-8 text-[#FAFAFA] flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Radial Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4BC96]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <span className="text-[10px] tracking-[0.3em] text-[#D4BC96] font-mono font-semibold block uppercase">
              Ruh Imperium
            </span>
            <h3 className="text-2xl font-serif font-light leading-snug" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
              Imperial Scent Lounge
            </h3>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Welcome to the inner sanctum of the fragrance house. Create your royal ledger to track bespoke distillations, review historical travel summaries, and unlock private formulations.
            </p>
          </div>

          <div className="space-y-4 pt-10 border-t border-stone-800 relative z-10">
            <div className="flex items-center gap-3 text-xs text-stone-300 font-serif">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Tailor-made Olfactory Vault</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-300 font-serif">
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              <span>Synchronized Checkout Details</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-300 font-serif">
              <Truck className="w-4 h-4 text-gold-400" />
              <span>Real-Time Express Logistcs</span>
            </div>
          </div>

          <div className="text-[8.5px] font-mono tracking-widest text-[#D4BC96]/60 uppercase pt-6">
            SECURE LEDGER ACCESS PROTOCOL v4
          </div>
        </div>

        {/* Right Side: Main Interactive Workspace */}
        <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[75vh] md:max-h-none">
          
          {/* Modal Header Actions */}
          <div className="flex justify-between items-center border-b border-stone-100 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="text-[#D4BC96] text-xs font-mono tracking-widest uppercase font-bold">
                {view === "dashboard" ? `Welcome Back, ${currentUser?.fullName.split(" ")[0]}` : "Olfactory Vault Gate"}
              </span>
              {view === "dashboard" && (
                <span className="text-[9px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-widest font-mono">
                  ACTIVE
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* VIEW 1: SIGN IN WORKFLOW */}
          {view === "login" && (
            <div className="space-y-6 flex-1 flex flex-col justify-center animate-fade-in">
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-semibold text-stone-900">Unlock your Member Vault</h4>
                <p className="text-xs text-stone-500 font-light">Input your registered email ledger to synchronize order receipts and compounding records.</p>
              </div>

              {loginError && (
                <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-100">
                  ⚠️ {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1 font-semibold font-mono">Email Registry Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. aditya@realm.in"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1 font-semibold font-mono">Vault Passcode key</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="password"
                      required
                      placeholder="Enter security password..."
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                    />
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span className="text-[10px] text-stone-400">Hint: Preseeded demo email is <strong className="text-stone-500">guest@ruh-imperium.com</strong></span>
                    <span className="text-[10px] text-stone-400">Password: <strong className="text-stone-500">password123</strong></span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1C1917] hover:bg-gold-600 text-white font-serif text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md font-medium cursor-pointer"
                >
                  Verify credentials & Enter →
                </button>
              </form>

              <div className="flex flex-col items-center justify-center space-y-3 pt-4 border-t border-stone-100 mt-2">
                <p className="text-xs text-stone-500">
                  New explorer?{" "}
                  <button onClick={() => setView("register")} className="text-[#D4BC96] hover:underline font-serif font-medium">Create Royal Crest account</button>
                </p>
                <div className="w-full border-t border-stone-100 pt-3 flex items-center justify-center">
                  <button 
                    onClick={() => {
                      onClose();
                      onAdminClick();
                    }}
                    className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 font-mono transition-colors flex items-center gap-1.5"
                  >
                    <LockKeyhole className="w-3.5 h-3.5 text-[#D4BC96]" />
                    <span>Ambassador / HQ Admin Sign-in</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: REGISTER WORKFLOW */}
          {view === "register" && (
            <div className="space-y-5 flex-1 flex flex-col justify-center animate-fade-in">
              <div className="space-y-1">
                <h4 className="text-lg font-serif font-semibold text-stone-900">Initiate Olfactory Ledger</h4>
                <p className="text-xs text-stone-500 font-light">Join the fragrance house to preserve your formulations, track bespoke parcel deliveries, and log scents.</p>
              </div>

              {regError && (
                <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-100">
                  ⚠️ {regError}
                </div>
              )}

              {regSuccess && (
                <div className="bg-emerald-50 text-emerald-800 text-xs p-3.5 rounded-lg border border-emerald-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
                  <span>Ledger successfully synchronized! Redirecting into Lounge...</span>
                </div>
              )}

              {!regSuccess && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-stone-400 mb-0.5 font-semibold font-mono">Full Legal Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vimal Rawat"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-xl pl-8.5 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-stone-400 mb-0.5 font-semibold font-mono">Email Ledger *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                        <input
                          type="email"
                          required
                          placeholder="e.g. vimal@realm.in"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-xl pl-8.5 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-stone-400 mb-0.5 font-semibold font-mono">Security Password *</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                        <input
                          type="password"
                          required
                          placeholder="Create secret passcode..."
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-xl pl-8.5 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-stone-400 mb-0.5 font-semibold font-mono">Telephone Contact</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                        <input
                          type="tel"
                          placeholder="e.g. +91 99999 88888"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-xl pl-8.5 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[9px] uppercase tracking-widest text-stone-400 mb-0.5 font-semibold font-mono">Delivery / Shipping Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 -translate-y-1/3 w-3.5 h-3.5 text-stone-400" />
                        <textarea
                          rows={2}
                          placeholder="Enter your residence, street, and landmarks for express delivery..."
                          value={regAddress}
                          onChange={(e) => setRegAddress(e.target.value)}
                          className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-xl pl-8.5 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light resize-none leading-relaxed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-widest text-stone-400 mb-0.5 font-semibold font-mono">ZIP / Pincode Ledger</label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="e.g. 110001"
                          value={regPincode}
                          onChange={(e) => setRegPincode(e.target.value)}
                          className="w-full border border-stone-200 focus:border-[#D4BC96] rounded-xl pl-8.5 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D4BC96]/30 font-light"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-[#1C1917] hover:bg-gold-600 text-white font-serif text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md font-medium cursor-pointer"
                  >
                    Establish Account ledger →
                  </button>
                </form>
              )}

              <p className="text-center text-xs text-stone-500 pt-2 border-t border-stone-105">
                Already registered?{" "}
                <button onClick={() => setView("login")} className="text-[#D4BC96] hover:underline font-serif font-medium">Verify credentials instead</button>
              </p>
            </div>
          )}

          {/* VIEW 3: USER PROFILE & DASHBOARD WORKSPACE */}
          {view === "dashboard" && currentUser && (
            <div className="flex-1 flex flex-col min-h-[450px] animate-fade-in">
              
              {/* Member Summary Header */}
              <div className="bg-[#1C1917]/5 rounded-xl border border-stone-100 p-4.5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[8.5px] uppercase tracking-[0.25em] text-stone-400 font-mono">
                    <Compass className="w-3.5 h-3.5 text-[#D4BC96]" />
                    <span>Lounge Logged Ledger // Client</span>
                  </div>
                  <h4 className="text-base font-serif font-semibold text-stone-900">{currentUser.fullName}</h4>
                  <p className="text-[10px] text-stone-400 font-mono tracking-tight">{currentUser.email} • Verified Account</p>
                </div>

                <div className={`text-right border px-3.5 py-2.5 rounded-xl max-w-sm ${tier.bg}`}>
                  <span className="text-[9px] uppercase tracking-widest font-mono font-bold block mb-0.5 text-stone-400">HOUSE DESIGNATION:</span>
                  <span className="font-serif font-bold text-xs tracking-wide block uppercase">{tier.name}</span>
                  <p className="text-[9.5px] font-sans text-stone-500 leading-normal mt-1 italic">{tier.perk}</p>
                </div>
              </div>

              {/* Tabs selectors bar */}
              <div className="flex border-b border-stone-150 mb-5 overflow-x-auto gap-2">
                {[
                  { id: "identity", label: "My Credentials & Bio", icon: User },
                  { id: "orders", label: `My Scent Parcels (${userOrders.length})`, icon: Clock },
                  { id: "blends", label: `Saved Compounding (${savedBlends.length})`, icon: Sparkles },
                  { id: "wishlist", label: `My Wishlist (${wishlistProducts.length})`, icon: Heart }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setIsEditingProfile(false);
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2 border-b-2 text-xs tracking-wider transition-colors font-serif uppercase cursor-pointer whitespace-nowrap pb-3 ${
                        activeTab === tab.id
                          ? "border-[#D4BC96] text-[#D4BC96] font-semibold"
                          : "border-transparent text-stone-500 hover:text-stone-900"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB CONTENT PANELS */}
              <div className="flex-1 overflow-y-auto">

                {/* Tab A: Profile Details Card */}
                {activeTab === "identity" && (
                  <div className="space-y-4 animate-fade-in">
                    {isEditingProfile ? (
                      <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl bg-stone-50/50 p-5 rounded-2xl border border-stone-200">
                        <div className="text-xs font-bold font-mono tracking-widest text-stone-400 uppercase border-b border-stone-150 pb-1 flex justify-between mb-4">
                          <span>Modify Member Credentials</span>
                          <span className="text-[#D4BC96]">LEDGER SAVE PROTOCOL</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9.5px] uppercase tracking-widest text-stone-500 font-mono font-medium mb-1">Full Legal Name *</label>
                            <input
                              type="text"
                              required
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full border border-stone-200 bg-white focus:border-[#D4BC96] rounded-xl px-3 py-2 text-xs focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[9.5px] uppercase tracking-widest text-stone-500 font-mono font-medium mb-1">Telephone Contact *</label>
                            <input
                              type="tel"
                              required
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="w-full border border-stone-200 bg-white focus:border-[#D4BC96] rounded-xl px-3 py-2 text-xs focus:outline-none"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[9.5px] uppercase tracking-widest text-stone-500 font-mono font-medium mb-1">Detailed Delivery Address *</label>
                            <textarea
                              rows={3}
                              required
                              value={editAddress}
                              onChange={(e) => setEditAddress(e.target.value)}
                              className="w-full border border-stone-200 bg-white focus:border-[#D4BC96] rounded-xl px-3 py-2 text-xs focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[9.5px] uppercase tracking-widest text-stone-500 font-mono font-medium mb-1">Postal ZIP / Pincode *</label>
                            <input
                              type="text"
                              required
                              value={editPincode}
                              onChange={(e) => setEditPincode(e.target.value)}
                              className="w-full border border-stone-200 bg-white focus:border-[#D4BC96] rounded-xl px-3 py-2 text-xs focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-stone-900 hover:bg-gold-600 text-white font-mono text-[10px] uppercase tracking-widest rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save credentials</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                            className="px-5 py-2.5 bg-white text-stone-500 hover:text-stone-900 border border-stone-200 font-mono text-[10px] uppercase tracking-widest rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Info panel */}
                        <div className="md:col-span-2 bg-stone-50/50 rounded-2xl border border-stone-200 p-5 space-y-4">
                          <div className="flex justify-between items-center border-b border-stone-150 pb-2">
                            <span className="text-[10.5px] font-mono tracking-widest uppercase text-[#D4BC96] font-semibold">Crest Registration Summary</span>
                            <button
                              onClick={() => {
                                setEditName(currentUser.fullName);
                                setEditPhone(currentUser.phone);
                                setEditAddress(currentUser.address);
                                setEditPincode(currentUser.pincode);
                                setIsEditingProfile(true);
                              }}
                              className="text-[9px] font-mono text-stone-500 hover:text-stone-950 flex items-center gap-1 uppercase tracking-widest bg-white border px-2.5 py-1 rounded"
                            >
                              <Edit3 className="w-3 h-3 text-[#D4BC96]" />
                              <span>Update</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-[9.5px] uppercase tracking-widest text-stone-400 block font-mono">Full Ledger Name</span>
                              <p className="font-serif font-medium text-stone-900 text-sm">{currentUser.fullName}</p>
                            </div>
                            <div>
                              <span className="text-[9.5px] uppercase tracking-widest text-stone-400 block font-mono">Verified Communication Cell</span>
                              <p className="font-mono text-stone-900">{currentUser.phone || "Not Set"}</p>
                            </div>
                            <div className="sm:col-span-2">
                              <span className="text-[9.5px] uppercase tracking-widest text-stone-400 block font-mono">Configured Delivery Drop-off Destination</span>
                              <p className="font-serif text-stone-700 italic leading-relaxed">{currentUser.address || "Not Configured"}</p>
                            </div>
                            <div>
                              <span className="text-[9.5px] uppercase tracking-widest text-stone-400 block font-mono">Registered Destination ZIP/Pincode</span>
                              <p className="font-mono text-stone-900 font-semibold">{currentUser.pincode || "Not Configured"}</p>
                            </div>
                          </div>
                        </div>

                        {/* Status sidebar */}
                        <div className="bg-sand-50/50 rounded-2xl border border-sand-200 p-5 space-y-3.5 flex flex-col justify-between">
                          <div className="space-y-3">
                            <h5 className="text-xs uppercase font-mono tracking-widest text-sand-500 font-bold">Lounge Vault Statistics</h5>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between font-mono">
                                <span className="text-sand-400">Total spent checkouts:</span>
                                <span className="font-semibold text-sand-900">₹{userOrders.reduce((acc, order) => acc + order.total, 0)}</span>
                              </div>
                              <div className="flex justify-between font-mono">
                                <span className="text-sand-400">Pending batches:</span>
                                <span className="font-semibold text-sand-900">{userOrders.filter(o => o.status !== "Delivered" && o.status !== "Cancelled").length}</span>
                              </div>
                              <div className="flex justify-between font-mono">
                                <span className="text-sand-400">Saved formulations:</span>
                                <span className="font-semibold text-sand-900">{savedBlends.length}</span>
                              </div>
                              <div className="flex justify-between font-mono">
                                <span className="text-sand-400">Scent Wishlist items:</span>
                                <span className="font-semibold text-sand-900">{wishlistProducts.length}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={handleUserLogout}
                            className="w-full text-center py-2.5 bg-red-50 text-red-600 hover:bg-red-100 font-mono text-[9.5px] uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-red-150"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign-out of Lounge</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab B: Orders Panel */}
                {activeTab === "orders" && (
                  <div className="space-y-4 animate-fade-in">
                    {userOrders.length === 0 ? (
                      <div className="text-center p-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                        <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                        <h5 className="text-sm font-serif font-semibold text-stone-850">No orders registered under your ledger</h5>
                        <p className="text-xs text-stone-500 font-light mt-1 max-w-sm mx-auto">Place an order at checkout under your verified email to automatically sync your logistics here.</p>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {userOrders.map((order) => (
                          <div key={order.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-xs transition-shadow">
                            
                            {/* Order Title Box */}
                            <div className="bg-stone-50 p-3 px-4.5 border-b border-stone-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                              <div className="space-y-0.5">
                                <span className="text-[10px] font-mono text-[#D4BC96] uppercase font-bold tracking-widest">IMPERIAL PARCEL</span>
                                <p className="text-xs font-serif font-bold text-stone-900">ID: {order.id}</p>
                              </div>
                              <span className="text-[10px] text-stone-400 font-mono">{order.date}</span>
                            </div>

                            <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                              {/* Order items */}
                              <div className="md:col-span-5 space-y-2">
                                <span className="text-[8.5px] uppercase tracking-widest text-[#D4BC96] font-mono font-bold block mb-1">Purchased Olfactories</span>
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex gap-2.5 items-center">
                                    <div className="w-10 h-10 rounded bg-stone-50 border border-stone-150 flex items-center justify-center p-1 font-mono text-[9.5px] text-[#D4BC96]">
                                      {item.product.image === "custom_blend_flask" ? "⚗️" : "🏺"}
                                    </div>
                                    <div className="text-xs text-stone-800 leading-normal">
                                      <p className="font-serif font-medium truncate max-w-[200px]">{item.product.name}</p>
                                      <p className="text-[10px] text-stone-400">{item.selectedSize} × {item.quantity}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Logistics Status */}
                              <div className="md:col-span-4 space-y-1.5 border-l md:border-l border-stone-150 pl-4">
                                <span className="text-[8.5px] uppercase tracking-widest text-[#D4BC96] font-mono font-bold block">Consignment status</span>
                                <div className="flex items-center gap-1.5 text-stone-800">
                                  <Truck className="w-4 h-4 text-gold-500 animate-pulse" />
                                  <span className="font-serif font-bold text-[12.5px] tracking-wide text-stone-900 uppercase">{order.status}</span>
                                </div>
                                <div className="text-[10px] font-mono text-stone-400">
                                  <span>Tracking Code: </span>
                                  <code className="bg-stone-50 px-1 py-0.5 border text-stone-600 rounded select-all">{order.trackingCode}</code>
                                </div>
                              </div>

                              {/* Price and Action */}
                              <div className="md:col-span-3 text-right">
                                <span className="text-[8.5px] uppercase tracking-widest text-stone-400 font-mono block mb-0.5">Value</span>
                                <p className="text-sm font-serif font-bold text-stone-900">₹{order.total}</p>
                                <span className="text-[9px] text-[#2D2926] bg-amber-50 border border-amber-100 px-2 py-0.5 rounded font-mono mt-1 inline-block uppercase">
                                  {order.paymentMode} Payment
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab C: Custom Blends Cabinet */}
                {activeTab === "blends" && (
                  <div className="space-y-4 animate-fade-in">
                    {savedBlends.length === 0 ? (
                      <div className="text-center p-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                        <Sparkles className="w-10 h-10 text-[#D4BC96] mx-auto mb-3 animate-pulse" />
                        <h5 className="text-sm font-serif font-semibold text-stone-850">Your botanical cabinet is currently empty</h5>
                        <p className="text-xs text-stone-500 font-light mt-1 max-w-sm mx-auto">Create and order a customized fragrance formulation in our digital compounding lab to secure it here permanently.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {savedBlends.map((blend) => (
                          <div key={blend.id} className="bg-stone-50/50 border border-stone-200 rounded-2xl p-4.5 flex flex-col justify-between hover:border-gold-500 hover:bg-stone-50 transition-all duration-300 group">
                            
                            {/* Blend Title card */}
                            <div>
                              <div className="flex justify-between items-start mb-2.5 border-b border-stone-200/50 pb-2">
                                <div>
                                  <span className="text-[8px] font-mono uppercase tracking-widest text-[#D4BC96] font-bold block mb-0.5">REGISTERED FORMULATION</span>
                                  <h6 className="font-serif font-bold text-stone-900 text-sm tracking-tight">{blend.name}</h6>
                                </div>
                                <span className="text-[9px] font-mono text-stone-405">{blend.date}</span>
                              </div>

                              {/* Form details / percentages bar */}
                              <div className="space-y-2 mt-3.5 mb-5">
                                <div className="flex gap-1 h-3 rounded-full overflow-hidden border border-stone-200">
                                  <div style={{ width: `${blend.citrus}%` }} className="bg-amber-400" title={`Citrus: ${blend.citrus}%`} />
                                  <div style={{ width: `${blend.woods}%` }} className="bg-stone-700" title={`Woods: ${blend.woods}%`} />
                                  <div style={{ width: `${blend.spices}%` }} className="bg-red-500" title={`Spices: ${blend.spices}%`} />
                                </div>
                                <div className="grid grid-cols-3 gap-1 text-center font-mono text-[9px] text-stone-500 font-semibold uppercase">
                                  <span className="text-amber-500">C: {blend.citrus}%</span>
                                  <span className="text-stone-700">W: {blend.woods}%</span>
                                  <span className="text-red-500">S: {blend.spices}%</span>
                                </div>
                              </div>
                            </div>

                            {/* Buttons actions */}
                            <div className="flex justify-between items-center gap-2 pt-3 border-t border-stone-200/40">
                              <button
                                onClick={() => handleReorderBlend(blend)}
                                className="flex-1 py-1.5 bg-stone-950 hover:bg-gold-600 text-white font-serif text-[10px] uppercase tracking-widest rounded transition-colors text-center cursor-pointer font-medium"
                              >
                                Re-order Formulation
                              </button>
                              <button
                                onClick={() => handleDeleteBlend(blend.id)}
                                className="text-stone-400 hover:text-red-500 font-mono text-[10px] tracking-widest uppercase hover:bg-red-50 p-2 rounded transition-colors font-medium border border-transparent hover:border-red-100"
                                title="Delete formulation from cabinet"
                              >
                                Delete
                              </button>
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab D: Wishlist Panel */}
                {activeTab === "wishlist" && (
                  <div className="space-y-4 animate-fade-in">
                    {wishlistProducts.length === 0 ? (
                      <div className="text-center p-12 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                        <Heart className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                        <h5 className="text-sm font-serif font-semibold text-stone-850">Your wishlist cabinet is currently clear</h5>
                        <p className="text-xs text-stone-500 font-light mt-1 max-w-sm mx-auto">Browse our Imperial catalogue and select the favorite heart icon in details modals to coordinate your desires here.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {wishlistProducts.map((product) => (
                          <div key={product.id} className="bg-stone-50/50 border border-stone-200 rounded-2xl p-4 flex gap-4 hover:bg-stone-50 transition-colors">
                            <div className="w-16 h-16 rounded-xl bg-white border overflow-hidden flex-shrink-0 relative group">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-105 duration-300" 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h6 className="font-serif font-bold text-stone-900 text-xs truncate">{product.name}</h6>
                                <p className="text-[10px] text-[#D4BC96] truncate font-mono uppercase tracking-wider mb-1">{product.tagline}</p>
                                <span className="font-serif font-semibold text-xs text-stone-800">₹{product.salePrice}</span>
                              </div>

                              <div className="flex gap-2.5 pt-2.5 border-t border-stone-150 mt-1.5 justify-between">
                                <button
                                  onClick={() => {
                                    onClose();
                                    onSelectProduct(product);
                                  }}
                                  className="text-[9.5px] uppercase font-mono tracking-widest text-[#D4BC96] font-bold hover:underline"
                                >
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleRemoveFromWishlist(product.id)}
                                  className="text-[9.5px] uppercase font-mono tracking-widest text-red-500 font-semibold"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
              
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
