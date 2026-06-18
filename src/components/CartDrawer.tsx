import { useState, FormEvent, useEffect } from "react";
import { X, Trash2, ShoppingBag, Percent, ArrowLeft, ShieldCheck, Ticket, Landmark, CreditCard, ChevronRight, CheckCircle, Sparkles, Award, ScrollText, AlertTriangle } from "lucide-react";
import { CartItem, Product, Order, Coupon, SiteSettings } from "../types";

// Helper script loader to connect dynamically with the official indian razorpay secure checkout system
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.hasOwnProperty("Razorpay")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, change: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onPlaceOrder?: (order: Order) => void;
  coupons?: Coupon[];
  currentUser?: any;
  siteSettings: SiteSettings;
  products?: Product[];
  onAddToCart?: (product: Product, size: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  coupons = [],
  currentUser,
  siteSettings,
  products = [],
  onAddToCart
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  const [couponCode, setCouponCode] = useState("");
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [currentTrackingCode, setCurrentTrackingCode] = useState("");
  
  // Checkout Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [pendingOrderPayload, setPendingOrderPayload] = useState<Order | null>(null);

  useEffect(() => {
    if (currentUser && checkoutStep === "form") {
      setFullName(currentUser.fullName || "");
      setEmail(currentUser.email || "");
      setPhone(currentUser.phone || "");
      setAddress(currentUser.address || "");
      setPincode(currentUser.pincode || "");
    }
  }, [currentUser, checkoutStep]);

  if (!isOpen) return null;

  // Cart math
  const cartSubtotal = cart.reduce((sums, item) => {
    const latestProduct = products.find(p => p.id === item.product.id) || item.product;
    const itemPrice = item.selectedSize === latestProduct.size 
      ? latestProduct.salePrice 
      : Math.round(latestProduct.salePrice * 0.2); // Travel vial price ratio
    return sums + (itemPrice * item.quantity);
  }, 0);

  // Discount
  const discountAmount = activeDiscount 
    ? Math.round(cartSubtotal * (activeDiscount.percent / 100)) 
    : 0;

  // Shipping flat rate: 100 INR, free if subtotal > 1500 or code is matched
  const shippingFee = (cartSubtotal > 1500 || (activeDiscount && activeDiscount.code === "FREESHIP")) 
    ? 0 
    : 100;

  // Scent Luxury GST
  const gstAmount = Math.round((cartSubtotal - discountAmount) * 0.12);

  const cartTotal = cartSubtotal - discountAmount + shippingFee + gstAmount;

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponCode.trim().toUpperCase();

    // Check dynamic coupons managed by admin first
    const matchedCoupon = coupons.find(c => c.code.toUpperCase() === code);

    if (matchedCoupon) {
      setActiveDiscount({ code: matchedCoupon.code, percent: matchedCoupon.discountPercent });
    } else if (code === "WAYFARER15") {
      setActiveDiscount({ code: "WAYFARER15", percent: 15 });
    } else if (code === "WAYFARER20") {
      setActiveDiscount({ code: "WAYFARER20", percent: 20 });
    } else if (code === "FREESHIP") {
      setActiveDiscount({ code: "FREESHIP", percent: 0 }); // handled separately for shipping
    } else {
      setCouponError("Invalid coupon token code.");
    }
  };

  const executeOrderPlacement = async (newOrder: Order) => {
    setIsSubmitting(true);
    const isRazorpayActive = siteSettings?.razorpayEnabled && siteSettings?.razorpayKeyId;
    const generatedTracking = newOrder.trackingCode;
    const orderId = newOrder.id;
    const calculatedTotal = newOrder.total;

    if (isRazorpayActive) {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setIsSubmitting(false);
        alert("Unable to reach Razorpay secure servers. Please check your internet connection or use a different payment option.");
        return;
      }

      // Initialize Razorpay Options
      const options = {
        key: siteSettings.razorpayKeyId,
        amount: calculatedTotal * 100, // Amount in paise (paise = INR * 100)
        currency: "INR",
        name: "Ruh Imperium",
        description: `Order ${orderId} - Luxurious Olfactory Accords`,
        image: siteSettings.customLogoUrl || "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=150",
        handler: function (response: any) {
          // Dynamic successful response handling
          setIsSubmitting(false);
          setCurrentTrackingCode(generatedTracking);
          
          const successOrder: Order = {
            ...newOrder,
            id: `RP-${response.razorpay_payment_id || orderId}`,
            status: "Processing"
          };
          
          if (onPlaceOrder) {
            onPlaceOrder(successOrder);
          }
          setCheckoutStep("success");
          setShowPolicyModal(false);
        },
        prefill: {
          name: fullName,
          email: email,
          contact: phone
        },
        notes: {
          address: `${address} - Pincode: ${pincode}`,
          order_id: orderId
        },
        theme: {
          color: "#2D2926" // Royal midnight luxury palette color to match the aesthetics
        },
        modal: {
          ondismiss: function() {
            setIsSubmitting(false);
          }
        }
      };

      try {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } catch (err) {
        setIsSubmitting(false);
        alert("Razorpay initialization error. Please verify your configured Key ID in settings.");
      }
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setCurrentTrackingCode(generatedTracking);
        if (onPlaceOrder) {
          onPlaceOrder(newOrder);
        }
        setCheckoutStep("success");
        setShowPolicyModal(false);
      }, 2800);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address || !pincode) return;

    // Check if Razorpay is enabled and key is supplied, or falls back to simulation
    const isRazorpayActive = siteSettings?.razorpayEnabled && siteSettings?.razorpayKeyId;
    
    // Generate actual Order payload for persistence
    const generatedTracking = `RP-${Math.floor(Math.random() * 89999 + 10000)}-IN`;
    const orderId = `ORD-${Date.now()}`;
    const calculatedTotal = cartTotal;

    const newOrder: Order = {
      id: orderId,
      fullName,
      email,
      phone,
      address,
      pincode,
      paymentMode: isRazorpayActive ? "Razorpay Gateway (Online)" : paymentMode,
      items: [...cart],
      total: calculatedTotal,
      date: new Date().toISOString().split("T")[0],
      status: "Processing",
      trackingCode: generatedTracking
    };

    if (siteSettings?.checkoutPolicyEnabled && !policyAccepted) {
      setPendingOrderPayload(newOrder);
      setShowPolicyModal(true);
      return;
    }

    await executeOrderPlacement(newOrder);
  };

  const handleCompleteSuccess = () => {
    onClearCart();
    setCheckoutStep("cart");
    setCouponCode("");
    setActiveDiscount(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPincode("");
    setPolicyAccepted(false);
    setShowPolicyModal(false);
    setPendingOrderPayload(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0D0B0A]/75 backdrop-blur-sm">
      {/* Click outside backdrop close toggle */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Cart Container Drawer */}
      <div className="relative w-full max-w-md bg-sand-50 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
        
        {/* Header section */}
        <div className="flex items-center justify-between border-b border-sand-200 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#D4BC96]" />
            <span className="text-sm uppercase tracking-[0.15em] font-medium text-sand-900 font-serif">
              {checkoutStep === "cart" && "Olfactory Cart Log"}
              {checkoutStep === "form" && "Secure Checkout Form"}
              {checkoutStep === "success" && "Wanderlust Receipt"}
            </span>
          </div>
          
          {checkoutStep !== "success" && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-sand-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-sand-500" />
            </button>
          )}
        </div>

        {/* STEP 1: CART LIST OVERVIEW */}
        {checkoutStep === "cart" && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <ShoppingBag className="w-12 h-12 text-sand-300 stroke-[1] mb-4" />
                <h4 className="text-base font-serif text-sand-800">Your suitcase is empty</h4>
                <p className="text-xs text-sand-400 font-light mt-1.5 max-w-xs">
                  Browse our travel-inspired collections and secure your first sensory destination bottle.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 px-5 py-2.5 bg-[#0D0B0A] hover:bg-gold-600 text-[#FAFAFA] text-[10px] tracking-widest uppercase rounded font-medium cursor-pointer"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                 {cart.map((item, idx) => {
                   const latestProduct = products.find(p => p.id === item.product.id) || item.product;
                   const itemPrice = item.selectedSize === latestProduct.size 
                     ? latestProduct.salePrice 
                     : Math.round(latestProduct.salePrice * 0.2);
                   
                   const isCustom = latestProduct.image === "custom_blend_flask";
 
                   return (
                     <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="bg-white border border-sand-200 rounded-xl p-3 flex gap-3 shadow-xs">
                       
                       {/* Product Thumbnail */}
                       <div className="w-16 h-20 bg-sand-100 rounded-lg overflow-hidden relative border border-sand-200 shrink-0">
                         {isCustom ? (
                           /* Render custom aesthetic flask graphic */
                           <div className="w-full h-full bg-gradient-to-t from-gold-500/20 to-lime-50/10 flex flex-col items-center justify-center p-1 font-sans text-center">
                             <span className="text-[5.5px] uppercase tracking-widest text-[#D4BC96] font-mono leading-none">BESPOKE</span>
                             <span className="text-[6.5px] font-serif font-semibold text-sand-800 truncate max-w-full leading-none mt-1">MIX</span>
                           </div>
                         ) : (
                           <img 
                             src={latestProduct.image} 
                             alt={latestProduct.name} 
                             className="w-full h-full object-cover"
                             referrerPolicy="no-referrer"
                           />
                         )}
                         <div className="absolute inset-0 bg-[#D4BC96]/10 mix-blend-color"></div>
                       </div>
 
                       {/* Info / Title */}
                       <div className="flex-1 flex flex-col justify-between">
                         <div className="flex justify-between items-start">
                           <div>
                             <h4 className="text-xs font-serif font-semibold text-sand-900 leading-tight">
                               {latestProduct.name}
                             </h4>
                             <p className="text-[9.5px] text-[#D4BC96] uppercase tracking-wider font-light mt-0.5">
                               {item.selectedSize} vial • {latestProduct.destinationState}
                             </p>
                           </div>
                           <button
                             type="button"
                             onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                             className="text-sand-300 hover:text-red-500 transition-colors p-0.5"
                           >
                             <Trash2 className="w-3.5 h-3.5" />
                           </button>
                         </div>
 
                         {/* Quantity triggers and price */}
                         <div className="flex justify-between items-center mt-2 pt-2 border-t border-sand-50">
                           <div className="flex items-center border border-sand-200 rounded bg-sand-50 h-6">
                             <button
                               type="button"
                               onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                               className="px-2 text-sand-500 hover:bg-sand-100 h-full flex items-center justify-center text-xs"
                             >
                               -
                             </button>
                             <span className="px-2 text-[10.5px] text-sand-800 font-mono font-medium">{item.quantity}</span>
                             <button
                               type="button"
                               onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                               className="px-2 text-sand-500 hover:bg-sand-100 h-full flex items-center justify-center text-xs"
                             >
                               +
                             </button>
                           </div>
                           
                           <span className="text-xs font-semibold text-sand-800 font-mono">
                             ₹{itemPrice * item.quantity}
                           </span>
                         </div>
                       </div>
 
                     </div>
                   );
                 })}

                {/* Personal Curated Recommendations */}
                {products && products.length > 0 && onAddToCart && (
                  <div className="mt-6 pt-5 border-t border-[#D4BC96]/20">
                    <p className="text-[9.5px] uppercase tracking-[0.2em] text-[#D4BC96] font-mono mb-3 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>Curated Scent Pairings</span>
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {products
                        .filter(p => !cart.some(item => item.product.id === p.id))
                        .slice(0, 2)
                        .map((recProd) => (
                          <div key={recProd.id} className="bg-white/80 rounded-xl border border-sand-200 p-3.5 flex gap-3.5 hover:shadow-xs transition-shadow duration-300">
                            <div className="w-12 h-15 bg-sand-100 rounded-lg overflow-hidden border border-sand-200 shrink-0">
                              <img src={recProd.image} alt={recProd.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h5 className="text-[11px] font-serif font-bold text-sand-905 leading-tight">{recProd.name}</h5>
                                <p className="text-[9px] text-sand-400 mt-1 line-clamp-1">{recProd.tagline}</p>
                              </div>
                              <div className="flex items-center justify-between mt-1.5">
                                <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">₹{recProd.salePrice}</span>
                                <button
                                  type="button"
                                  onClick={() => onAddToCart(recProd, recProd.size)}
                                  className="px-2.5 py-1 text-[8.5px] font-mono uppercase font-bold tracking-wider text-white bg-[#2D2926] hover:bg-[#D4BC96] rounded transition-all cursor-pointer flex items-center gap-1"
                                >
                                  <span>+ Add Scent</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Calculations & coupons footer block */}
            {cart.length > 0 && (
              <div className="border-t border-sand-200 pt-4 mt-4 bg-sand-50">
                {/* Apply coupon form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-3">
                  <div className="relative flex-1">
                    <Ticket className="w-4 h-4 text-sand-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="TRY WAYFARER15 OR FREESHIP"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-white border border-sand-200 rounded pl-9 pr-3 py-2 text-[10.5px] font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#D4BC96]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sand-900 text-white rounded text-[10px] uppercase font-medium tracking-wider hover:bg-gold-600 transition-colors"
                  >
                    APPLY
                  </button>
                </form>

                {/* Active Store Offers clickable chips */}
                {coupons && coupons.length > 0 && (
                  <div className="mb-4 px-1">
                    <p className="text-[8.5px] uppercase tracking-widest text-sand-400 font-mono mb-1.5 font-semibold">ACTIVE COUPE OFFERS (CLICK TO REDEEM)</p>
                    <div className="flex flex-wrap gap-1.5">
                      {coupons.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setCouponCode(c.code);
                            setActiveDiscount({ code: c.code, percent: c.discountPercent });
                            setCouponError("");
                          }}
                          className={`px-2 py-1 text-[9px] font-mono rounded tracking-wider flex items-center gap-1 cursor-pointer border transition-all duration-200 ${
                            activeDiscount?.code === c.code
                              ? "bg-[#2D2926] text-[#D4BC96] border-[#D4BC96] shadow-xs"
                              : "bg-white text-sand-700 border-sand-200 hover:border-[#D4BC96] hover:bg-sand-50"
                          }`}
                        >
                          <span className="text-[8px]">🎫</span>
                          <span className="font-bold">{c.code}</span>
                          <span className="text-[8px] opacity-75">({c.discountPercent}%)</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {couponError && (
                  <p className="text-[10px] text-red-500 mb-4 -mt-3 pl-1">{couponError}</p>
                )}

                {activeDiscount && (
                  <div className="bg-gold-50 border border-gold-200 rounded p-2.5 mb-4 flex justify-between items-center text-[10.5px] text-gold-900">
                    <span className="font-semibold">Discount Code: '{activeDiscount.code}'</span>
                    <span>-{activeDiscount.percent}% Saved!</span>
                  </div>
                )}

                {/* Sub aggregates */}
                <div className="space-y-2 text-xs text-sand-500 font-light px-1">
                  <div className="flex justify-between">
                    <span>Scent Subtotal</span>
                    <span className="font-mono text-sand-800">₹{cartSubtotal}</span>
                  </div>
                  
                  {activeDiscount && (
                    <div className="flex justify-between text-gold-600">
                      <span>Wayfarer Discount</span>
                      <span className="font-mono">-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>GST (12% Fragrance Surcharge)</span>
                    <span className="font-mono text-sand-800">₹{gstAmount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Premium Indian Delivery</span>
                    <span className="font-mono text-sand-800">
                      {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                    </span>
                  </div>

                  <div className="border-t border-sand-200 my-2" />

                  <div className="flex justify-between text-sm text-sand-900 font-semibold font-serif pt-1">
                    <span>Estimated Total</span>
                    <span className="font-mono">₹{cartTotal}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  type="button"
                  onClick={() => setCheckoutStep("form")}
                  className="w-full mt-6 py-4 bg-[#0D0B0A] hover:bg-[#D4BC96] text-white text-xs uppercase tracking-[0.2em] font-medium rounded shadow flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: SHIPPING FORM ENTRY */}
        {checkoutStep === "form" && (
          <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4 overflow-y-auto pr-1">
              {/* Back to cart link */}
              <button
                type="button"
                onClick={() => setCheckoutStep("cart")}
                className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-sand-400 hover:text-sand-700 mb-4 focus:outline-none"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Adjust Suitcase Items</span>
              </button>

              <div className="bg-white border rounded-xl p-4.5 mb-2 shadow-xs">
                <p className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-semibold mb-1">Total Due</p>
                <div className="text-xl font-serif text-sand-900">₹{cartTotal} <span className="text-xs text-sand-400 font-sans">Inclusive of GST</span></div>
              </div>

              <div>
                <label className="text-[9.5px] uppercase tracking-widest text-sand-400 block mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Siddharth Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-sand-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4BC96] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[9.5px] uppercase tracking-widest text-sand-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="E.g. sid@ruhimperium.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-sand-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4BC96] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[9.5px] uppercase tracking-widest text-sand-400 block mb-1">Contact Phone</label>
                <div className="flex gap-2">
                  <span className="bg-sand-100 border border-sand-200 font-mono text-xs px-2.5 py-2.5 rounded flex items-center justify-center select-none text-sand-600 font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-white border border-sand-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4BC96] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9.5px] uppercase tracking-widest text-sand-400 block mb-1">Delivery Address (India)</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Street details, apartment, landmarks"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-sand-200 rounded p-3 text-xs focus:ring-1 focus:ring-[#D4BC96] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[9.5px] uppercase tracking-widest text-sand-400 block mb-1">Indian PINCODE</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="560001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-white border border-sand-200 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#D4BC96] focus:outline-none"
                />
              </div>

              {/* Payment methods choices */}
              <div>
                <label className="text-[9.5px] uppercase tracking-widest text-sand-400 block mb-2 font-medium">Bespoke Payment Gateway</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMode("UPI")}
                    className={`p-3.5 border rounded-xl flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                      paymentMode === "UPI" 
                        ? "border-[#D4BC96] bg-gold-50/20 text-[#D4BC96]" 
                        : "border-sand-200 bg-white text-sand-500 hover:border-sand-400"
                    }`}
                  >
                    <Landmark className="w-4 h-4" />
                    <span className="text-[10px] font-semibold tracking-wider">UPI / QR SCAN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode("COD")}
                    className={`p-3.5 border rounded-xl flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                      paymentMode === "COD" 
                        ? "border-[#D4BC96] bg-gold-50/20 text-[#D4BC96]" 
                        : "border-sand-200 bg-white text-sand-500 hover:border-sand-400"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[10px] font-semibold tracking-wider">COD / PAY LATER</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Secure confirmation button */}
            <div className="border-t border-sand-200 pt-6 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#D4BC96] hover:bg-[#0D0B0A] hover:scale-101 text-white text-xs uppercase tracking-[0.2em] font-medium rounded shadow flex items-center justify-center gap-2 cursor-pointer focus:outline-none disabled:bg-sand-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>AUTHORIZING CRYPTOGRAPHIC LEDGER...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>CONFIRM WAYFARER ORDER</span>
                  </>
                )}
              </button>
              <p className="text-[8.5px] uppercase text-center text-sand-400 mt-2 tracking-widest">
                🛡️ SSL ENCRYPTED GATEWAY TO PREVENT DATA COMPROMISE
              </p>
            </div>
          </form>
        )}

        {/* STEP 3: ORDER SUCCESS CARD */}
        {checkoutStep === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-18 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 animate-scale-up" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-medium block mb-2">
              SOCIETE DE PARFUM ACCREDITED
            </span>
            <h3 className="text-2xl font-light font-display text-sand-900 tracking-wider mb-2">
              Order Logged Successfully!
            </h3>
            <p className="text-xs text-sand-500 font-light leading-relaxed max-w-xs mb-8">
              Congratulations <span className="font-semibold text-sand-800">{fullName}</span>, your purchase of Ruh Imperium is secured. Our artisans have initiated custom sugarcane hydro-distillation.
            </p>

            {/* Simulated Logistics Info */}
            <div className="w-full bg-white border border-sand-200 rounded-2xl p-4 mb-8 text-left space-y-3 shadow-xs">
              <div>
                <span className="text-[8px] uppercase tracking-widest text-sand-400 font-mono">Consignment Courier</span>
                <p className="text-xs text-sand-700 font-medium">India Post Speed Logistics (Air cargo)</p>
              </div>
              <div className="border-t border-sand-100" />
              <div>
                <span className="text-[8px] uppercase tracking-widest text-sand-400 font-mono">Your Tracking Code (Use to Track Scent Status)</span>
                <p className="text-sm text-sand-900 bg-sand-100 border border-sand-200 px-3 py-1.5 rounded text-center select-all font-semibold font-mono tracking-wider mt-1">{currentTrackingCode || "RP-78401-IN"}</p>
              </div>
              <div className="border-t border-sand-100" />
              <div>
                <span className="text-[8px] uppercase tracking-widest text-sand-400 font-mono">Active Destination Address</span>
                <p className="text-xs text-sand-600 leading-tight font-light">{address}, PIN {pincode}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCompleteSuccess}
              className="w-full py-4 bg-[#0D0B0A] hover:bg-[#D4BC96] text-[#FAFAFA] text-xs uppercase tracking-[0.2em] font-medium rounded shadow cursor-pointer focus:outline-none"
            >
              RETURN TO GALERIE
            </button>
          </div>
        )}

        {/* CHECKOUT POLICY AGREEMENT MODAL */}
        {showPolicyModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
            <div className="relative bg-white w-full max-w-sm rounded-3xl border border-[#D4BC96]/40 shadow-2xl p-6 flex flex-col justify-between max-h-[90%] overflow-hidden">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-sand-200 mb-4">
                  <div className="flex items-center gap-1.5 text-[#D4BC96]">
                    <ScrollText className="w-5 h-5" />
                    <h3 className="text-sm font-serif uppercase tracking-wider font-semibold">
                      {siteSettings.checkoutPolicyTitle || "Shipping & Return Policy"}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPolicyModal(false);
                      setPolicyAccepted(false);
                    }}
                    className="p-1 hover:bg-sand-100 rounded-full cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4 text-stone-400 hover:text-stone-600" />
                  </button>
                </div>

                <div className="text-stone-600 bg-stone-50 border border-sand-200/60 rounded-2xl p-4 overflow-y-auto max-h-[220px] mb-4 text-[11px] leading-relaxed whitespace-pre-line text-left custom-scrollbar">
                  {siteSettings.checkoutPolicyContent || "Our store policies..."}
                </div>

                {/* THE AGREE CHECKBOX */}
                <label className="flex items-start gap-3 cursor-pointer text-xs text-stone-700 bg-sand-50/70 p-3.5 rounded-xl border border-sand-200 select-none transition-colors hover:bg-sand-50 mb-5">
                  <input
                    type="checkbox"
                    id="policy-agree-checkbox"
                    checked={policyAccepted}
                    onChange={(e) => setPolicyAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-[#D4BC96] focus:ring-[#D4BC96] h-4 w-4 cursor-pointer"
                  />
                  <div className="space-y-0.5 text-left">
                    <span className="font-semibold text-stone-900 uppercase text-[9px] tracking-wider block">Signature Affirmation</span>
                    <p className="text-[10px] text-stone-500 font-light leading-snug">
                      I have read, understood, and unconditionally agree to the terms mentioned in the shipment & return policy page.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPolicyModal(false);
                    setPolicyAccepted(false);
                  }}
                  className="flex-1 py-3 border border-stone-200 text-stone-500 hover:bg-stone-50 text-[10.5px] uppercase tracking-[0.15em] font-medium rounded-xl transition-all cursor-pointer"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  disabled={!policyAccepted || isSubmitting}
                  onClick={() => {
                    if (pendingOrderPayload) {
                      executeOrderPlacement(pendingOrderPayload);
                    }
                  }}
                  className="flex-1 py-3 bg-[#D4BC96] hover:bg-[#2D2926] disabled:bg-stone-300 text-white text-[10.5px] uppercase tracking-[0.15em] font-medium rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Confirm & Place</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
