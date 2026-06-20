import { useState, FormEvent, useEffect } from "react";
import { X, Trash2, ShoppingBag, Percent, ArrowLeft, ShieldCheck, Ticket, Landmark, CreditCard, ChevronRight, CheckCircle, Sparkles, Award, ScrollText, AlertTriangle } from "lucide-react";
import { CartItem, Product, Order, Coupon, SiteSettings } from "../types";
import emailjs from '@emailjs/browser';

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
    const selectedVariant = latestProduct.variants?.find(v => v.size === item.selectedSize);
    const activePrice = selectedVariant ? selectedVariant.salePrice : latestProduct.salePrice;
    return sums + (activePrice * item.quantity);
  }, 0);

  // Discount
  const discountAmount = activeDiscount 
    ? Math.round(cartSubtotal * (activeDiscount.percent / 100)) 
    : 0;

  const cartTotal = cartSubtotal - discountAmount;

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

  // EmailJS Notification Logic (Configured via Admin Panel)
  const sendAdminNotificationEmail = async (order: Order) => {
    try {
      const templateParams = {
        order_id: order.id,
        customer_name: order.fullName,
        customer_email: order.email,
        customer_phone: order.phone,
        order_total: `₹${order.total}`,
        order_items: order.items.map(item => `${item.quantity}x ${item.product.name} (${item.selectedSize})`).join(", "),
        shipping_address: `${order.address}, ${order.pincode}`,
        admin_email_1: "ruhimperiun9@gmail.com",
        admin_email_2: "saditya7990@gmail.com"
      };

      const { emailjsServiceId, emailjsTemplateId, emailjsPublicKey } = siteSettings;

      if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
        await emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams, emailjsPublicKey);
        console.log("Admin notification email sent successfully via EmailJS!");
      } else {
        console.warn("EmailJS keys are not configured in the Admin Panel yet! Emails will not be sent.");
      }
    } catch (error) {
      console.error("Failed to send admin notification email:", error);
    }
  };

  const executeOrderPlacement = async (newOrder: Order) => {
    setIsSubmitting(true);
    const isRazorpayActive = siteSettings?.razorpayEnabled && siteSettings?.razorpayKeyId && newOrder.paymentMode !== "COD";
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
          sendAdminNotificationEmail(successOrder); // Send email notification

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
        sendAdminNotificationEmail(newOrder); // Send email notification

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
      items: cart.map(item => ({ ...item, product: products.find(p => p.id === item.product.id) || item.product })),
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
      <div className="relative w-full max-w-[400px] bg-white h-full p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
        
        {/* Header section */}
        <div className="flex items-center justify-between pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[14px] uppercase tracking-[0.1em] font-medium text-[#2D2926] font-sans">
              {checkoutStep === "cart" && `YOUR CART (${cart.length})`}
              {checkoutStep === "form" && "SECURE CHECKOUT"}
              {checkoutStep === "success" && "ORDER CONFIRMED"}
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
                <p className="text-sm font-sans text-sand-500 mb-6">Your cart is currently empty.</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 bg-[#2D2926] hover:bg-black text-white text-[11px] tracking-[0.15em] uppercase font-bold transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-0 pr-1">
                {/* Free Shipping Progress Bar */}
                <div className="bg-[#F8F8F8] p-3 mb-4 text-center">
                  {cartSubtotal >= 1500 ? (
                    <p className="text-[11px] font-sans text-[#2D2926] font-semibold">
                      You are eligible for <span className="font-bold">Free Shipping!</span>
                    </p>
                  ) : (
                    <>
                      <p className="text-[11px] font-sans text-[#2D2926] mb-2">
                        You are <span className="font-bold">₹{1500 - cartSubtotal}</span> away from <span className="font-bold">Free Shipping!</span>
                      </p>
                      <div className="w-full bg-sand-200 h-1.5 overflow-hidden">
                        <div 
                          className="bg-[#2D2926] h-full transition-all duration-500" 
                          style={{ width: `${Math.min((cartSubtotal / 1500) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </>
                  )}
                </div>
                 {cart.map((item, idx) => {
                   const latestProduct = products.find(p => p.id === item.product.id) || item.product;
                   const selectedVariant = latestProduct.variants?.find(v => v.size === item.selectedSize);
                   const activePrice = selectedVariant ? selectedVariant.salePrice : latestProduct.salePrice;
                   
                   const isCustom = latestProduct.image === "custom_blend_flask";
 
                    return (
                      <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="bg-white border-b border-sand-100 py-4 flex gap-4">
                        
                        {/* Product Thumbnail */}
                        <div className="w-20 h-24 bg-[#F8F8F8] shrink-0 border border-sand-100">
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
                              className="w-full h-full object-contain p-2"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
 
                        {/* Info / Title */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-[13px] font-serif text-[#2D2926] tracking-wide leading-tight">
                                {latestProduct.name}
                              </h4>
                              <p className="text-[10px] text-sand-500 uppercase tracking-widest font-semibold mt-1">
                                {item.selectedSize}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                              className="text-sand-400 hover:text-[#2D2926] transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
  
                          {/* Quantity triggers and price */}
                          <div className="flex justify-between items-end mt-2">
                            <div className="flex items-center border border-sand-300 h-8">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                                className="w-8 h-full flex items-center justify-center text-sand-600 hover:bg-sand-50"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-[12px] text-sand-900 font-sans font-medium">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                                className="w-8 h-full flex items-center justify-center text-sand-600 hover:bg-sand-50"
                              >
                                +
                              </button>
                            </div>
                            
                            <span className="text-[14px] font-sans text-sand-900 font-medium">
                              ₹{activePrice * item.quantity}
                            </span>
                          </div>
                        </div>
                     </div>
                   );
                 })}
              </div>
            )}

            {/* Calculations & coupons footer block */}
            {cart.length > 0 && (
              <div className="border-t border-sand-100 pt-4 mt-4 bg-white">


                {activeDiscount && (
                  <div className="bg-gold-50 border border-gold-200 rounded p-2.5 mb-4 flex justify-between items-center text-[10.5px] text-gold-900">
                    <span className="font-semibold">Discount Code: '{activeDiscount.code}'</span>
                    <span>-{activeDiscount.percent}% Saved!</span>
                  </div>
                )}

                {/* Sub aggregates */}
                <div className="space-y-2 text-xs text-sand-500 font-light px-1">
                  <div className="flex justify-between text-[14px] text-[#2D2926] font-sans pt-1">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{cartTotal}</span>
                  </div>
                  <p className="text-[10px] text-sand-400 mt-1">Shipping, taxes, and discount codes calculated at checkout.</p>
                </div>

                {/* Checkout Trigger */}
                <button
                  type="button"
                  onClick={() => setCheckoutStep("form")}
                  className="w-full mt-4 py-4 bg-[#2D2926] hover:bg-black text-white text-[11px] uppercase tracking-[0.2em] font-bold flex flex-col items-center justify-center transition-colors cursor-pointer focus:outline-none"
                >
                  CHECKOUT
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
                    <span className="text-[10px] font-semibold tracking-wider">CASH ON DELIVERY (COD)</span>
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
