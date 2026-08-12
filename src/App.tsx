import { useState, useEffect, FormEvent, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  ArrowRight, 
  Star, 
  Sliders, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  Instagram, 
  Mail, 
  CheckCircle2, 
  Eye, 
  Sparkles, 
  ChevronRight, 
  Atom, 
  User, 
  Droplet,
  X,
  Linkedin,
  Twitter,
  Flower2,
  Trees,
  Play,
  Truck
} from 'lucide-react';
import { PRODUCTS, BLOG_ARTICLES, PRE_SEEDED_REVIEWS } from './data/mockData';
import { Product, CartItem, Review, BlogArticle, Order, Coupon, SiteSettings, UserAccount, Collection, Founder, getEmbedVideoUrl } from './types';
import Header from "./components/Header";
import ProductDetailsModal from "./components/ProductDetailsModal";
import ProductPage from "./pages/ProductPage";
import OurStoryPage from "./pages/OurStoryPage";
import CartDrawer from "./components/CartDrawer";
import AdminHub from "./components/AdminHub";
import OrderTracker from "./components/OrderTracker";
import UserLoungeModal from "./components/UserLoungeModal";
import Logo from "./components/Logo";
import { motion, AnimatePresence } from "motion/react";
import { db, withTimeout } from './config/firebase';
import { doc, setDoc, onSnapshot, collection, deleteDoc, writeBatch } from 'firebase/firestore';

const isEmbedIframe = (url: string): boolean => {
  if (!url) return false;
  const lower = url.toLowerCase();
  
  // If it's a direct mp4, webm, ogg, quicktime or custom uploaded file, it is NOT an iframe embed
  if (
    lower.includes(".mp4") || 
    lower.includes(".webm") || 
    lower.includes(".ogg") || 
    lower.startsWith("data:") || 
    lower.startsWith("blob:") || 
    lower.includes("/uploads/") ||
    lower.includes("/external/") // Vimeo direct external streams
  ) {
    return false;
  }
  
  // If it is a standard youtube or regular vimeo watch/share URL, it is an iframe embed
  return (
    lower.includes("youtube.com") || 
    lower.includes("youtu.be") || 
    (lower.includes("vimeo.com") && !lower.includes("/external/")) ||
    lower.includes("player.vimeo.com/video")
  );
};

export default function App() {
  // Initialization guards for Firestore setup
  const initPendingRef = useRef<Record<string, boolean>>({});

  // Write lock to prevent onSnapshot from overwriting state during active admin writes
  const writeLockRef = useRef<Record<string, boolean>>({});

  // Refs that always hold the latest state values (for stale closure avoidance)
  const productsRef = useRef<Product[]>([]);
  const blogArticlesRef = useRef<BlogArticle[]>([]);
  const couponsRef = useRef<Coupon[]>([]);
  const reviewsRef = useRef<Review[]>([]);
  const ordersRef = useRef<Order[]>([]);
  const usersRef = useRef<UserAccount[]>([]);
  
  // NEW REFS for settings to prevent stale closures
  const siteSettingsRef = useRef<SiteSettings>({} as SiteSettings);
  const foundersRef = useRef<Founder[]>([]);
  const collectionsRef = useRef<Collection[]>([]);
  const coverPhotoRef = useRef<string>("");
  const heroVideoUrlRef = useRef<string>("");
  // Full-screen editorial brand splash loader
  const [isSplashLoading, setIsSplashLoading] = useState(true);

  // Floating Rich Notification Toasts
  const [toasts, setToasts] = useState<{ id: string; message: string; type: string }[]>([]);
  const showToast = (message: string, type = "success") => {
    const id = Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Core State
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hero");

  // Dynamic Products collection
  const [products, setProducts] = useState<Product[]>(() => {
    const cached = localStorage.getItem("ruh-products");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // Fall through to defaults
      }
    }
    return PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem("ruh-products", JSON.stringify(products));
  }, [products]);

  // Automatically sync cart item details when products database is changed or customized
  useEffect(() => {
    setCart((prevCart) => {
      let isChanged = false;
      const updated = prevCart.map((item) => {
        const latestProduct = products.find((p) => p.id === item.product.id);
        if (latestProduct) {
          if (JSON.stringify(item.product) !== JSON.stringify(latestProduct)) {
            isChanged = true;
            return { ...item, product: latestProduct };
          }
        }
        return item;
      }).filter((item) => {
        const isCustom = item.product.image === "custom_blend_flask";
        const exists = isCustom || products.some((p) => p.id === item.product.id);
        if (!exists) {
          isChanged = true;
        }
        return exists;
      });
      return isChanged ? updated : prevCart;
    });

    setSelectedProduct((prevSelected) => {
      if (!prevSelected) return null;
      const latestSelected = products.find((p) => p.id === prevSelected.id);
      return latestSelected || null;
    });
  }, [products]);

  // Dynamic Collections/Categories
  const [collections, setCollections] = useState<Collection[]>(() => {
    const cached = localStorage.getItem("ruh-collections");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback default
      }
    }
    return [
      { id: "Next Gen fragrances", name: "Next Gen Fragrances", tag: "Modern formulations styled for the youthful free spirit.", icon: "🌸", isBold: true },
      { id: "BEST SELLING", name: "Best Sellers", tag: "Our highest rated, globally acclaimed classic distillations.", icon: "🏆", isBold: true },
      { id: "Authentic Indian Attars", name: "Authentic Indian Attars", tag: "Kannauj copper-still handiwork distilled onto organic sandalwood.", icon: "🏺", isBold: false },
      { id: "Eau De Parfum", name: "Eau De Parfums", tag: "Perfect fine spray bottles styled on exquisite biological extracts.", icon: "🧪", isBold: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem("ruh-collections", JSON.stringify(collections));
  }, [collections]);

  // Dynamic Cover Hero Graphic
  const [coverPhoto, setCoverPhoto] = useState<string>(() => {
    const cached = localStorage.getItem("ruh-cover-photo");
    return cached || "/src/assets/images/traditional_degh_distillation_pots_1781437229236.jpg";
  });

  useEffect(() => {
    localStorage.setItem("ruh-cover-photo", coverPhoto);
  }, [coverPhoto]);

  // Dynamic Hero Video URL
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>(() => {
    const cached = localStorage.getItem("ruh-hero-video-url");
    return cached || "https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf186213cefada19cfcaf004602f37c37fa9b2&profile_id=165&oauth2_token_id=57447761";
  });

  useEffect(() => {
    localStorage.setItem("ruh-hero-video-url", heroVideoUrl);
  }, [heroVideoUrl]);

  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Guarantee that whenever the heroVideoUrl updates, the video element is unmuted, playsInline and played successfully
  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.defaultMuted = true;
      heroVideoRef.current.muted = true;
      heroVideoRef.current.playsInline = true;
      try {
        heroVideoRef.current.load();
        const playPromise = heroVideoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Autoplay prevention caught:", err);
          });
        }
      } catch (e) {
        console.warn("Error playing video:", e);
      }
    }
  }, [heroVideoUrl]);

  // Dynamic leadership profiles with default social handles
  const [founders, setFounders] = useState<Founder[]>(() => {
    const cached = localStorage.getItem("ruh-founders");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // Fall through
      }
    }
    return [
      {
        id: "vimal",
        name: "Vimal Singh",
        role: "FOUNDER & HEAD PERFUMER",
        bio: "Deeply passionate about reviving traditional Indian hydro-distillation methods (Degh-Bhapka). Vimal spends months in the Kannauj flower belts ensuring our extracts remain uncompromised.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
        linkedin: "https://linkedin.com/in/vimalsingh-ruh",
        instagram: "https://instagram.com/vimalsingh.ruh",
        twitter: "https://twitter.com/vimalsingh_ruh"
      },
      {
        id: "aditya",
        name: "Aditya Singh",
        role: "CO-FOUNDER & CHIEF EXPLORER",
        bio: "Aditya spearheads our wilderness sourcing expeditions. From trekking into Assam's agarwood jungles to securing sustainable cardamom contracts with local co-operatives in Wayanad.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
        linkedin: "https://linkedin.com/in/adityasingh-ruh",
        instagram: "https://instagram.com/adityasingh.ruh",
        twitter: "https://twitter.com/adityasingh_ruh"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("ruh-founders", JSON.stringify(founders));
  }, [founders]);

  // Dynamic site textual configuration settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const cached = localStorage.getItem("ruh-site-settings");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.heroHeadline) {
          return parsed;
        }
      } catch (e) {
        // Fall through
      }
    }
    return {
      contactPhone: "+91 91167 11413",
      contactEmail: "support@ruhimperium.com",
      contactAddress: "Ruh Imperium Luxury Ateliers, Kannauj, Uttar Pradesh, India",
      footerAbout: "Handcrafted slow-perfumery masterpieces straight from India's perfume capital Kannauj. Pure alcohol-free perfume oils and luxury Eau De Parfums.",
      heroTagline: "TRADITIONAL COPPER DISTILLED FRAGRANCES",
      heroHeadline: "Where Fragrance Meets Tradition",
      heroDescription: "Explore fine alcohol-free pure oils and elegant luxury Eau De Parfums hydro-distilled in 204-year-old copper stills of Kannauj.",
      whyChooseHeading: "Why Choose Ruh Imperium?",
      whyChooseSub: "By bypassing traditional middleman distribution, we hand-purchase pure botanical extracts and compound them at premium olfactory concentrations.",
      foundersHeading: "Our Story & Legacy",
      foundersText: "Ruh Imperium was sparked by a shared vision to traverse India’s historic trade routes, distilling pristine biological extracts and crafting honest, high-concentration luxury fragrances.",
      checkoutPolicyTitle: "Shipping & Return Policy",
      checkoutPolicyContent: `At Ruh Imperium, we formulate 100% pure alcohol-free oil-based perfumes and fine Eau De Parfums with immense precision inside of Kannauj, Uttar Pradesh. Please read and agree to our customer shipment policies before submitting your request:

1. FRESH DISTILLATION TIMES
Every single formulation goes through rigorous quality assessment checks. Because botanical oils require settling periods, your batch may experience a 24-to-48-hour curation cue before final parcel boxing. 

2. TRANSIT INTEGRITY GUARANTEE
In the very rare event of transport leakages or glass breakages, we issue a brand-new replacement within 24 hours of coordinate landing. Simply supply a brief unboxing video within 48 hours of transit touchdown to support@ruhimperium.com and we will immediately take action.

3. ALCOHOL-FREE INHERENT TRAITS
Pure oils (Attars) contain zero synthetic carrier alcohols. They behave differently from commercial generic aerosols, sitting closer to the skin and working in harmony with your body heat. Since these are customized and sanitary cosmetic batches, all custom sales are final and non-refundable.

4. LOGISTICS & TRACKING
We dispatch all premium monogrammed chests through tier-1 cargo partners (Bluedart, Delhivery). Delivery spans 3-5 business days depending on location. A secure tracking link is auto-transmitted via email/SMS immediately after transit handover.`,
      checkoutPolicyEnabled: true
    };
  });

  useEffect(() => {
    localStorage.setItem("ruh-site-settings", JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Purge any legacy cached keys or old logo URLs from browser localStorage
  useEffect(() => {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.toLowerCase().includes("raahi")) {
          localStorage.removeItem(key);
        }
      });
      const cached = localStorage.getItem("ruh-site-settings");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.customLogoUrl && parsed.customLogoUrl.toLowerCase().includes("raahi")) {
          delete parsed.customLogoUrl;
          localStorage.setItem("ruh-site-settings", JSON.stringify(parsed));
          setSiteSettings(parsed);
        }
      }
    } catch (e) {}
  }, []);

  // Handle splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashLoading(false);
    }, 2800); // 2.8 seconds white splash background reveal
    return () => clearTimeout(timer);
  }, []);

  // Dynamic system coupon tokens register
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const cached = localStorage.getItem("ruh-coupons");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* Fall through */ }
    }
    return [
      { code: "RUH20", discountPercent: 20 },
      { code: "WELCOME10", discountPercent: 10 }
    ];
  });

  useEffect(() => {
    localStorage.setItem("ruh-coupons", JSON.stringify(coupons));
  }, [coupons]);

  // Dynamic orders ledger
  const [orders, setOrders] = useState<Order[]>(() => {
    const cached = localStorage.getItem("ruh-orders");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* Fall through */ }
    }
    const generatedTracking = `RUH-38410-IN`;
    const seedProduct = PRODUCTS[0];
    const sampleOrder: Order = {
      id: "ORD-1781324500123",
      fullName: "Aditya Singh",
      email: "saditya7990@gmail.com",
      phone: "+91 99999 55555",
      address: "M.G. Road, Sector 5, HQ Heights Residence",
      pincode: "110001",
      paymentMode: "UPI",
      items: [
        {
          product: seedProduct,
          quantity: 1,
          selectedSize: "50 ml"
        }
      ],
      total: seedProduct.salePrice,
      date: new Date().toISOString().split("T")[0],
      status: "In Transit",
      trackingCode: generatedTracking
    };
    return [sampleOrder];
  });

  useEffect(() => {
    localStorage.setItem("ruh-orders", JSON.stringify(orders));
  }, [orders]);

  // Security and overlay states
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    const cached = localStorage.getItem("ruh-admin-logged-in");
    return cached === "true";
  });

  const [isAdminHubOpen, setIsAdminHubOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  // General Customer Accounts Registry & Lounge Trigger
  const [users, setUsers] = useState<UserAccount[]>(() => {
    const cached = localStorage.getItem("ruh-users");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* Fall through */ }
    }
    return [
      {
        email: "guest@ruh-imperium.com",
        fullName: "Imperial Guest Explorer",
        phone: "+91 98765 43210",
        address: "7 Royal Palace Crescent, Jaipur",
        pincode: "302001",
        password: "password123",
        savedBlends: [],
        orderIds: ["ORD-1781324500123"]
      }
    ];
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const cached = localStorage.getItem("ruh-current-user");
    return cached ? JSON.parse(cached) : null;
  });

  const [isLoungeOpen, setIsLoungeOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("ruh-users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("ruh-current-user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Sync active session user details when live database is changed
  useEffect(() => {
    if (currentUser) {
      const latest = users.find((u) => u.email.toLowerCase() === currentUser.email.toLowerCase());
      if (latest && JSON.stringify(latest) !== JSON.stringify(currentUser)) {
        setCurrentUser(latest);
      }
    }
  }, [users, currentUser]);

  // Cart state loaded from localStorage for persistent travel logs!
  const [cart, setCart] = useState<CartItem[]>(() => {
    const cached = localStorage.getItem("ruh-cart");
    return cached ? JSON.parse(cached) : [];
  });

  // Custom reviews list state allowing real-time submissions
  const [reviews, setReviews] = useState<Review[]>(() => {
    const cached = localStorage.getItem("ruh-reviews");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { /* Fall through */ }
    }
    return PRE_SEEDED_REVIEWS;
  });

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isDistilleryVideoOpen, setIsDistilleryVideoOpen] = useState(false);

  // Expanded Blog Article state
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  // Custom blog articles state allowing real-time admin updates & picture uploads
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>(() => {
    const cached = localStorage.getItem("ruh-blog-articles");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) { /* Fall through */ }
    }
    return BLOG_ARTICLES;
  });

  // Newsletter email state
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSuccess, setNewsSuccess] = useState(false);

  // Luxury frontend filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Browser back button support for collection filtering
  // When a collection is selected, push a history entry so phone's back button
  // resets the filter instead of leaving the website
  const handleSelectCategory = (category: string) => {
    if (category !== "All" && selectedCategory === "All") {
      // Entering a collection view — push history entry
      window.history.pushState({ collection: category }, "", window.location.href);
    }
    setSelectedCategory(category);
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // Phone back button pressed — if we're in a filtered collection, reset to All
      if (selectedCategory !== "All") {
        e.preventDefault?.();
        setSelectedCategory("All");
        setSearchQuery("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedCategory]);

  // Sync state helpers to localStorage
  useEffect(() => {
    localStorage.setItem("ruh-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("ruh-reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("ruh-blog-articles", JSON.stringify(blogArticles));
  }, [blogArticles]);

  // Keep refs in sync with latest state values (avoids stale closures in update functions)
  useEffect(() => { productsRef.current = products; }, [products]);
  useEffect(() => { blogArticlesRef.current = blogArticles; }, [blogArticles]);
  useEffect(() => { couponsRef.current = coupons; }, [coupons]);
  useEffect(() => { reviewsRef.current = reviews; }, [reviews]);
  useEffect(() => { ordersRef.current = orders; }, [orders]);
  useEffect(() => { usersRef.current = users; }, [users]);
  useEffect(() => { siteSettingsRef.current = siteSettings; }, [siteSettings]);
  useEffect(() => { foundersRef.current = founders; }, [founders]);
  useEffect(() => { collectionsRef.current = collections; }, [collections]);
  useEffect(() => { coverPhotoRef.current = coverPhoto; }, [coverPhoto]);
  useEffect(() => { heroVideoUrlRef.current = heroVideoUrl; }, [heroVideoUrl]);

  // -------------------------------------------------------------
  // FIRESTORE ENHANCED PERMANENT SYNCHRONIZATION ENGINE
  // -------------------------------------------------------------
  useEffect(() => {
    // 1. SITE SETTINGS LIVE SYNC
    const unsubscribeSite = onSnapshot(doc(db, "settings", "site"), async (snap) => {
      if (snap.exists()) {
        if (writeLockRef.current["site"]) return;
        const data = snap.data() as SiteSettings;
        if (data.customLogoUrl) {
          delete data.customLogoUrl;
          try {
            await setDoc(doc(db, "settings", "site"), data);
          } catch (e) {}
        }
        setSiteSettings(data);
      } else {
        if (initPendingRef.current["site"]) return;
        initPendingRef.current["site"] = true;
        try {
          const initialSettings = {
            contactPhone: "+91 91167 11413",
            contactEmail: "support@ruhimperium.com",
            contactAddress: "Ruh Imperium Luxury Ateliers, Kannauj, Uttar Pradesh, India",
            footerAbout: "Handcrafted slow-perfumery masterpieces straight from India's perfume capital Kannauj. Pure alcohol-free perfume oils and luxury Eau De Parfums.",
            whyChooseHeading: "Why Choose Ruh Imperium?",
            whyChooseSub: "By bypassing traditional middleman distribution, we hand-purchase pure botanical extracts and compound them at premium olfactory concentrations.",
            foundersHeading: "Our Story & Legacy",
            foundersText: "Ruh Imperium was sparked by a shared vision to traverse India's historic trade routes, distilling pristine biological extracts and crafting honest, high-concentration luxury fragrances.",
            heroTagline: "TRADITIONAL COPPER DISTILLED FRAGRANCES",
            heroHeadline: "Where Fragrance Meets Tradition",
            heroDescription: "Explore fine alcohol-free pure oils and elegant luxury Eau De Parfums hydro-distilled in 204-year-old copper stills of Kannauj.",
            checkoutPolicyTitle: "Shipping & Return Policy",
            checkoutPolicyContent: `At Ruh Imperium, we formulate 100% pure alcohol-free oil-based perfumes and fine Eau De Parfums with immense precision inside of Kannauj, Uttar Pradesh. Please read and agree to our customer shipment policies before submitting your request:

1. FRESH DISTILLATION TIMES
Every single formulation goes through rigorous quality assessment checks. Because botanical oils require settling periods, your batch may experience a 24-to-48-hour curation cue before final parcel boxing. 

2. TRANSIT INTEGRITY GUARANTEE
In the very rare event of transport leakages or glass breakages, we issue a brand-new replacement within 24 hours of coordinate landing. Simply supply a brief unboxing video within 48 hours of transit touchdown to support@ruhimperium.com and we will immediately take action.

3. ALCOHOL-FREE INHERENT TRAITS
Pure oils (Attars) contain zero synthetic carrier alcohols. They behave differently from commercial generic aerosols, sitting closer to the skin and working in harmony with your body heat. Since these are customized and sanitary cosmetic batches, all custom sales are final and non-refundable.

4. LOGISTICS & TRACKING
We dispatch all premium monogrammed chests through tier-1 cargo partners (Bluedart, Delhivery). Delivery spans 3-5 business days depending on location. A secure tracking link is auto-transmitted via email/SMS immediately after transit handover.`,
            checkoutPolicyEnabled: true
          };
          await setDoc(doc(db, "settings", "site"), initialSettings);
        } catch (err) {
          console.error("Error setting initial site settings:", err);
          initPendingRef.current["site"] = false;
        }
      }
    }, (err) => console.warn("[Firestore] site settings error (non-fatal):", err));

    // 2. PRODUCTS LIVE SYNC
    const unsubscribeProducts = onSnapshot(collection(db, "products"), async (snap) => {
      if (!snap.empty) {
        if (writeLockRef.current["products"]) return;
        const list: Product[] = [];
        snap.forEach((d) => {
          const p = d.data() as Product;
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
          list.push(p);
        });
        setProducts(list);
      } else {
        if (initPendingRef.current["products"]) return;
        initPendingRef.current["products"] = true;
        try {
          const batch = writeBatch(db);
          for (const p of PRODUCTS) {
            batch.set(doc(db, "products", p.id), p);
          }
          await batch.commit();
        } catch (err) {
          console.error("Error batch-writing products:", err);
          initPendingRef.current["products"] = false;
        }
      }
    }, (err) => console.warn("[Firestore] products error (non-fatal):", err));

    // 3. BLOG ARTICLES LIVE SYNC
    const unsubscribeBlogs = onSnapshot(collection(db, "blogArticles"), async (snap) => {
      if (!snap.empty) {
        if (writeLockRef.current["blogs"]) return;
        const list: BlogArticle[] = [];
        snap.forEach((d) => {
          list.push(d.data() as BlogArticle);
        });
        setBlogArticles(list);
      } else {
        if (initPendingRef.current["blogs"]) return;
        initPendingRef.current["blogs"] = true;
        try {
          const batch = writeBatch(db);
          for (const b of BLOG_ARTICLES) {
            batch.set(doc(db, "blogArticles", b.id), b);
          }
          await batch.commit();
        } catch (err) {
          console.error("Error batch-writing blogs:", err);
          initPendingRef.current["blogs"] = false;
        }
      }
    }, (err) => console.warn("[Firestore] blogs error (non-fatal):", err));

    // 4. COUPONS LIVE SYNC
    const unsubscribeCoupons = onSnapshot(collection(db, "coupons"), async (snap) => {
      if (!snap.empty) {
        if (writeLockRef.current["coupons"]) return;
        const list: Coupon[] = [];
        snap.forEach((d) => {
          list.push(d.data() as Coupon);
        });
        setCoupons(list);
      } else {
        if (initPendingRef.current["coupons"]) return;
        initPendingRef.current["coupons"] = true;
        try {
          const initialCoupons = [
            { code: "RUH20", discountPercent: 20 },
            { code: "WELCOME10", discountPercent: 10 }
          ];
          const batch = writeBatch(db);
          for (const c of initialCoupons) {
            batch.set(doc(db, "coupons", c.code), c);
          }
          await batch.commit();
        } catch (err) {
          console.error("Error batch-writing coupons:", err);
          initPendingRef.current["coupons"] = false;
        }
      }
    }, (err) => console.warn("[Firestore] coupons error (non-fatal):", err));

    // 5. REVIEWS LIVE SYNC
    const unsubscribeReviews = onSnapshot(collection(db, "reviews"), async (snap) => {
      if (!snap.empty) {
        if (writeLockRef.current["reviews"]) return;
        const list: Review[] = [];
        snap.forEach((d) => {
          list.push(d.data() as Review);
        });
        setReviews(list);
      } else {
        if (initPendingRef.current["reviews"]) return;
        initPendingRef.current["reviews"] = true;
        try {
          const batch = writeBatch(db);
          for (const r of PRE_SEEDED_REVIEWS) {
            batch.set(doc(db, "reviews", r.id), r);
          }
          await batch.commit();
        } catch (err) {
          console.error("Error batch-writing reviews:", err);
          initPendingRef.current["reviews"] = false;
        }
      }
    }, (err) => console.warn("[Firestore] reviews error (non-fatal):", err));

    // 6. ORDERS LIVE SYNC
    const unsubscribeOrders = onSnapshot(collection(db, "orders"), async (snap) => {
      if (!snap.empty) {
        if (writeLockRef.current["orders"]) return;
        const list: Order[] = [];
        snap.forEach((d) => {
          list.push(d.data() as Order);
        });
        setOrders(list);
      }
    }, (err) => console.warn("[Firestore] orders error (non-fatal):", err));

    // 7. FOUNDERS LIVE SYNC
    const unsubscribeFounders = onSnapshot(doc(db, "settings", "founders"), async (snap) => {
      if (snap.exists()) {
        if (writeLockRef.current["founders"]) return;
        const data = snap.data().list as Founder[];
        setFounders(data);
      } else {
        if (initPendingRef.current["founders"]) return;
        initPendingRef.current["founders"] = true;
        try {
          const initialFounders = [
            {
              id: "vimal",
              name: "Vimal Singh",
              role: "FOUNDER & HEAD PERFUMER",
              bio: "Deeply passionate about reviving traditional Indian hydro-distillation methods (Degh-Bhapka). Vimal spends months in the Kannauj flower belts ensuring our extracts remain uncompromised.",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
              linkedin: "https://linkedin.com/in/vimalsingh-ruh",
              instagram: "https://instagram.com/vimalsingh.ruh",
              twitter: "https://twitter.com/vimalsingh_ruh"
            },
            {
              id: "aditya",
              name: "Aditya Singh",
              role: "CO-FOUNDER & CHIEF EXPLORER",
              bio: "Aditya spearheads our wilderness sourcing expeditions. From trekking into Assam's agarwood jungles to securing sustainable cardamom contracts with local co-operatives in Wayanad.",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
              linkedin: "https://linkedin.com/in/adityasingh-ruh",
              instagram: "https://instagram.com/adityasingh.ruh",
              twitter: "https://twitter.com/adityasingh_ruh"
            }
          ];
          const cached = localStorage.getItem("ruh-founders");
          const startingFounders = cached ? JSON.parse(cached) : initialFounders;
          await setDoc(doc(db, "settings", "founders"), { list: startingFounders });
        } catch (err) {
          console.error("Error setting founders:", err);
          initPendingRef.current["founders"] = false;
        }
      }
    }, (err) => console.warn("[Firestore] founders error (non-fatal):", err));

    // 8. COLLECTIONS LIVE SYNC
    const unsubscribeCollections = onSnapshot(doc(db, "settings", "collections"), async (snap) => {
      if (snap.exists()) {
        if (writeLockRef.current["collections"]) return;
        const data = snap.data().list as Collection[];
        setCollections(data);
      } else {
        if (initPendingRef.current["collections"]) return;
        initPendingRef.current["collections"] = true;
        try {
          const initialCollections = [
            { id: "extraction", name: "Therapeutic Extractions", tag: "100% Active Botanicals", icon: "🏺" },
            { id: "signature-perfumes", name: "Signature Extraits de Parfum", tag: "High-concentration artisanal blends", icon: "⚜️" },
            { id: "attar", name: "Traditional Attars", tag: "Kannauj copper-aged distillations", icon: "🪔" }
          ];
          const cached = localStorage.getItem("ruh-collections");
          const startingCollections = cached ? JSON.parse(cached) : initialCollections;
          await withTimeout(setDoc(doc(db, "settings", "collections"), { list: startingCollections }));
        } catch (err) {
          console.error("Error setting collections:", err);
          initPendingRef.current["collections"] = false;
        }
      }
    }, (err) => console.warn("[Firestore] collections error (non-fatal):", err));

    // 9. COVER & HERO VIDEO LIVE SYNC
    const unsubscribeCoverAndHero = onSnapshot(doc(db, "settings", "assets"), async (snap) => {
      if (snap.exists()) {
        if (writeLockRef.current["assets"]) return;
        const data = snap.data();
        if (data.coverPhoto) setCoverPhoto(data.coverPhoto);
        if (data.heroVideoUrl) setHeroVideoUrl(data.heroVideoUrl);
      } else {
        if (initPendingRef.current["assets"]) return;
        initPendingRef.current["assets"] = true;
        try {
          const cachedCover = localStorage.getItem("ruh-cover-photo") || "/src/assets/images/traditional_degh_distillation_pots_1781437229236.jpg";
          const cachedVideo = localStorage.getItem("ruh-hero-video-url") || "https://assets.mixkit.co/videos/preview/mixkit-perfume-bottle-with-a-rose-on-a-surface-41584-large.mp4";
          await withTimeout(setDoc(doc(db, "settings", "assets"), { coverPhoto: cachedCover, heroVideoUrl: cachedVideo }));
        } catch (err) {
          console.error("Error setting assets:", err);
          initPendingRef.current["assets"] = false;
        }
      }
    }, (err) => console.warn("[Firestore] assets error (non-fatal):", err));

    // 10. USERS REGISTER LIVE SYNC
    const unsubscribeUsers = onSnapshot(collection(db, "users"), async (snap) => {
      if (!snap.empty) {
        if (writeLockRef.current["users"]) return;
        const list: UserAccount[] = [];
        snap.forEach((d) => {
          list.push(d.data() as UserAccount);
        });
        setUsers(list);
      } else {
        if (initPendingRef.current["users"]) return;
        initPendingRef.current["users"] = true;
        try {
          const defaultUsers = [
            {
              email: "guest@ruh-imperium.com",
              fullName: "Imperial Guest Explorer",
              phone: "+91 98765 43210",
              address: "7 Royal Palace Crescent, Jaipur",
              pincode: "302001",
              password: "password123",
              savedBlends: [],
              orderIds: ["ORD-1781324500123"]
            }
          ];
          const batch = writeBatch(db);
          for (const u of defaultUsers) {
            batch.set(doc(db, "users", u.email.toLowerCase()), u);
          }
          await batch.commit();
        } catch (err) {
          console.error("Error setting initial users:", err);
          initPendingRef.current["users"] = false;
        }
      }
    }, (err) => console.warn("[Firestore] users error (non-fatal):", err));

    return () => {
      unsubscribeSite();
      unsubscribeProducts();
      unsubscribeBlogs();
      unsubscribeCoupons();
      unsubscribeReviews();
      unsubscribeOrders();
      unsubscribeFounders();
      unsubscribeCollections();
      unsubscribeCoverAndHero();
      unsubscribeUsers();
    };
  }, []);

  // Write wrappers to push updates incrementally to Firestore
  const updateSiteSettings = async (newVal: SiteSettings | ((prev: SiteSettings) => SiteSettings)) => {
    writeLockRef.current["site"] = true;
    let resolved: SiteSettings;
    if (typeof newVal === "function") {
      resolved = newVal(siteSettingsRef.current);
    } else {
      resolved = newVal;
    }
    setSiteSettings(resolved);
    try {
      await withTimeout(setDoc(doc(db, "settings", "site"), resolved));
    } catch (e) {
      console.error("Firestore settings sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["site"] = false; }, 1000);
    }
  };

  const updateFounders = async (newVal: Founder[] | ((prev: Founder[]) => Founder[])) => {
    writeLockRef.current["founders"] = true;
    let resolved: Founder[];
    if (typeof newVal === "function") {
      resolved = newVal(foundersRef.current);
    } else {
      resolved = newVal;
    }
    setFounders(resolved);
    try {
      await withTimeout(setDoc(doc(db, "settings", "founders"), { list: resolved }));
    } catch (e) {
      console.error("Firestore founders sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["founders"] = false; }, 1000);
    }
  };

  const updateCollections = async (newVal: Collection[] | ((prev: Collection[]) => Collection[])) => {
    writeLockRef.current["collections"] = true;
    let resolved: Collection[];
    if (typeof newVal === "function") {
      resolved = newVal(collectionsRef.current);
    } else {
      resolved = newVal;
    }
    setCollections(resolved);
    collectionsRef.current = resolved;
    try {
      await withTimeout(setDoc(doc(db, "settings", "collections"), { list: resolved }));
    } catch (e) {
      console.error("Firestore collections sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["collections"] = false; }, 1000);
    }
  };

  const updateCoverPhoto = async (newVal: string) => {
    writeLockRef.current["assets"] = true;
    setCoverPhoto(newVal);
    coverPhotoRef.current = newVal;
    try {
      await withTimeout(setDoc(doc(db, "settings", "assets"), { coverPhoto: newVal, heroVideoUrl: heroVideoUrlRef.current }, { merge: true }));
    } catch (e) {
      console.error("Firestore cover photo sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["assets"] = false; }, 1000);
    }
  };

  const updateHeroVideoUrl = async (newVal: string) => {
    writeLockRef.current["assets"] = true;
    setHeroVideoUrl(newVal);
    heroVideoUrlRef.current = newVal;
    try {
      await withTimeout(setDoc(doc(db, "settings", "assets"), { coverPhoto: coverPhotoRef.current, heroVideoUrl: newVal }, { merge: true }));
    } catch (e) {
      console.error("Firestore hero video sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["assets"] = false; }, 1000);
    }
  };
  const updateProducts = async (newVal: Product[] | ((prev: Product[]) => Product[])) => {
    writeLockRef.current["products"] = true;
    const previousProducts = productsRef.current;
    let resolved: Product[];
    if (typeof newVal === "function") {
      resolved = newVal(previousProducts);
    } else {
      resolved = newVal;
    }
    setProducts(resolved);
    productsRef.current = resolved;
    try {
      const batch = writeBatch(db);
      const currentIds = new Set(resolved.map(p => p.id));
      const deletedIds = previousProducts.filter(p => !currentIds.has(p.id)).map(p => p.id);
      for (const id of deletedIds) {
        batch.delete(doc(db, "products", id));
      }
      for (const p of resolved) {
        batch.set(doc(db, "products", p.id), p);
      }
      await withTimeout(batch.commit());
    } catch (e) {
      console.error("Firestore products sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["products"] = false; }, 1000);
    }
  };

  const updateBlogArticles = async (newVal: BlogArticle[] | ((prev: BlogArticle[]) => BlogArticle[])) => {
    writeLockRef.current["blogs"] = true;
    const previousBlogs = blogArticlesRef.current;
    let resolved: BlogArticle[];
    if (typeof newVal === "function") {
      resolved = newVal(previousBlogs);
    } else {
      resolved = newVal;
    }
    setBlogArticles(resolved);
    blogArticlesRef.current = resolved;
    try {
      const batch = writeBatch(db);
      const currentIds = new Set(resolved.map(b => b.id));
      const deletedIds = previousBlogs.filter(b => !currentIds.has(b.id)).map(b => b.id);
      for (const id of deletedIds) {
        batch.delete(doc(db, "blogArticles", id));
      }
      for (const b of resolved) {
        batch.set(doc(db, "blogArticles", b.id), b);
      }
      await withTimeout(batch.commit());
    } catch (e) {
      console.error("Firestore blog sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["blogs"] = false; }, 1000);
    }
  };

  const updateCoupons = async (newVal: Coupon[] | ((prev: Coupon[]) => Coupon[])) => {
    writeLockRef.current["coupons"] = true;
    const previousCoupons = couponsRef.current;
    let resolved: Coupon[];
    if (typeof newVal === "function") {
      resolved = newVal(previousCoupons);
    } else {
      resolved = newVal;
    }
    setCoupons(resolved);
    couponsRef.current = resolved;
    try {
      const batch = writeBatch(db);
      const currentCodes = new Set(resolved.map(c => c.code));
      const deletedCodes = previousCoupons.filter(c => !currentCodes.has(c.code)).map(c => c.code);
      for (const code of deletedCodes) {
        batch.delete(doc(db, "coupons", code));
      }
      for (const c of resolved) {
        batch.set(doc(db, "coupons", c.code), c);
      }
      await withTimeout(batch.commit());
    } catch (e) {
      console.error("Firestore coupon sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["coupons"] = false; }, 1000);
    }
  };

  const updateReviews = async (newVal: Review[] | ((prev: Review[]) => Review[])) => {
    writeLockRef.current["reviews"] = true;
    const previousReviews = reviewsRef.current;
    let resolved: Review[];
    if (typeof newVal === "function") {
      resolved = newVal(previousReviews);
    } else {
      resolved = newVal;
    }
    setReviews(resolved);
    reviewsRef.current = resolved;
    try {
      const batch = writeBatch(db);
      const currentIds = new Set(resolved.map(r => r.id));
      const deletedIds = previousReviews.filter(r => !currentIds.has(r.id)).map(r => r.id);
      for (const id of deletedIds) {
        batch.delete(doc(db, "reviews", id));
      }
      for (const r of resolved) {
        batch.set(doc(db, "reviews", r.id), r);
      }
      await withTimeout(batch.commit());
    } catch (e) {
      console.error("Firestore reviews sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["reviews"] = false; }, 1000);
    }
  };

  const updateOrders = async (newVal: Order[] | ((prev: Order[]) => Order[])) => {
    writeLockRef.current["orders"] = true;
    const previousOrders = ordersRef.current;
    let resolved: Order[];
    if (typeof newVal === "function") {
      resolved = newVal(previousOrders);
    } else {
      resolved = newVal;
    }
    setOrders(resolved);
    ordersRef.current = resolved;
    try {
      const batch = writeBatch(db);
      const currentIds = new Set(resolved.map(o => o.id));
      const deletedIds = previousOrders.filter(o => !currentIds.has(o.id)).map(o => o.id);
      for (const id of deletedIds) {
        batch.delete(doc(db, "orders", id));
      }
      for (const o of resolved) {
        batch.set(doc(db, "orders", o.id), o);
      }
      await withTimeout(batch.commit());
    } catch (e) {
      console.error("Firestore orders sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["orders"] = false; }, 1000);
    }
  };

  const updateUsers = async (newVal: UserAccount[] | ((prev: UserAccount[]) => UserAccount[])) => {
    writeLockRef.current["users"] = true;
    const previousUsers = usersRef.current;
    let resolved: UserAccount[];
    if (typeof newVal === "function") {
      resolved = newVal(previousUsers);
    } else {
      resolved = newVal;
    }
    setUsers(resolved);
    usersRef.current = resolved;
    try {
      const currentEmails = new Set(resolved.map(u => u.email.toLowerCase()));
      const deletedEmails = previousUsers.filter(u => !currentEmails.has(u.email.toLowerCase())).map(u => u.email);
      for (const email of deletedEmails) {
        await deleteDoc(doc(db, "users", email.toLowerCase()));
      }
      for (const u of resolved) {
        await setDoc(doc(db, "users", u.email.toLowerCase()), u);
      }
    } catch (e) {
      console.error("Firestore users sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["users"] = false; }, 1500);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (idx > -1) {
        const updated = [...prevCart];
        updated[idx].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { product, quantity: 1, selectedSize: size }];
      }
    });
    showToast(`Added 1x ${product.name} (${size}) to your premium olfactory case.`);
  };

  const handleAddCustomToCart = (customProduct: Product) => {
    // Automatically archive in user's bespoke cabinet if logged in
    if (currentUser) {
      const cachedBlends = localStorage.getItem(`ruh-blends-${currentUser.email}`);
      const list = cachedBlends ? JSON.parse(cachedBlends) : [];
      
      const parseNumber = (text: string) => {
        const match = text ? text.match(/\d+/) : null;
        return match ? parseInt(match[0]) : 33;
      };
      
      const citrusVal = parseNumber(customProduct.ingredients[0] || "40%");
      const woodsVal = parseNumber(customProduct.ingredients[1] || "30%");
      const spicesVal = parseNumber(customProduct.ingredients[2] || "30%");
      
      const newBlend = {
        id: customProduct.id,
        name: customProduct.name.replace("Custom: ", ""),
        citrus: citrusVal,
        woods: woodsVal,
        spices: spicesVal,
        date: new Date().toISOString().split("T")[0]
      };
      
      list.unshift(newBlend);
      localStorage.setItem(`ruh-blends-${currentUser.email}`, JSON.stringify(list));
    }

    setCart((prevCart) => {
      // Custom blends are unique by timestamp inside id, always insert fresh
      return [...prevCart, { product: customProduct, quantity: 1, selectedSize: "50 ml" }];
    });
    setIsCartOpen(true); // Auto reveal cart on custom compounding!
  };

  const handleUpdateQuantity = (productId: string, size: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const nextQty = item.quantity + change;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prevCart) => prevCart.filter(
      (item) => !(item.product.id === productId && item.selectedSize === size)
    ));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (productId: string) => {
    if (!currentUser) {
      setIsLoungeOpen(true);
      showToast("To bookmark luxury formulas, please access your Royal Lounge account first.", "warning");
      return;
    }

    const key = `ruh-wishlist-${currentUser.email}`;
    const cached = localStorage.getItem(key);
    let ids: string[] = cached ? JSON.parse(cached) : [];

    let msg = "";
    if (ids.includes(productId)) {
      ids = ids.filter(id => id !== productId);
      msg = "Formulation removed from your private wishlist cabinet.";
    } else {
      ids.push(productId);
      msg = "Formulation catalogued in your private wishlist cabinet!";
    }

    localStorage.setItem(key, JSON.stringify(ids));
    // Trigger state sync or simple shallow copy re-evaluate
    setCurrentUser({ ...currentUser });
    showToast(msg);
  };

  const isProductWishlisted = (productId: string) => {
    if (!currentUser) return false;
    const cached = localStorage.getItem(`ruh-wishlist-${currentUser.email}`);
    if (!cached) return false;
    const ids: string[] = JSON.parse(cached);
    return ids.includes(productId);
  };

  const handleAddReview = (newRev: Omit<Review, "id" | "date" | "verified">) => {
    const formatted: Review = {
      ...newRev,
      id: `rev-live-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      verified: true // Always treat user-submitted ones inside app sandbox as verified buyers
    };
    updateReviews((prev) => [formatted, ...prev]);
  };

  // Safe navigation scroll-into-view helper
  const handleSectionNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (sectionId === "our-story") {
      navigate('/our-story');
      return;
    }

    // If not on homepage, navigate to homepage and pass state
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const matchingElement = document.getElementById(`${sectionId}-section`);
    if (matchingElement) {
      matchingElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Listen for scrollTo requests from other pages (e.g., coming back from ProductPage)
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      // Slight delay to ensure DOM is rendered after route change
      setTimeout(() => {
        if (sectionId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const matchingElement = document.getElementById(`${sectionId}-section`);
          if (matchingElement) {
            matchingElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        // Clear state so it doesn't re-scroll on refresh
        navigate('/', { replace: true, state: {} });
      }, 100);
    }
  }, [location.pathname, location.state, navigate]);

  // Open review modal for standalone PDP experience
  const handleOpenPDP = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Newsletter subscribe form trigger
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setNewsSuccess(true);
    setNewsEmail("");
    setTimeout(() => setNewsSuccess(false), 5000);
  };

  // Card renderer helper for catalogue & best sellers
  const renderProductCard = (prod: Product) => {
    const totalItemReviews = reviews.filter((r) => r.productId === prod.id);
    const overallRating = totalItemReviews.length > 0 
      ? parseFloat((totalItemReviews.reduce((s, r) => s + r.rating, 0) / totalItemReviews.length).toFixed(1))
      : prod.rating;

    const hoverImage = prod.galleryImages?.find(img => img && img.trim() !== "");

    return (
      <div 
        key={prod.id} 
        className="group flex flex-col justify-between transition-all duration-300 relative bg-transparent border-0 p-0 text-left"
        id={`product-card-${prod.id}`}
      >
        {/* Image visual wrapper */}
        <div 
          className="relative w-full aspect-[4/5] bg-stone-50 rounded-[1.5rem] overflow-hidden mb-3.5 cursor-pointer border border-sand-200/40 shadow-xs"
          onClick={() => navigate(`/product/${prod.id}`)}
        >
          <img 
            src={prod.image} 
            alt={prod.name} 
            className={`w-full h-full object-cover transition-all duration-700 ${hoverImage ? 'group-hover:opacity-0 group-hover:scale-102' : 'group-hover:scale-103'}`}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600";
            }}
          />
          {hoverImage && (
            <img 
              src={hoverImage} 
              alt={`${prod.name} alternate view`} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-102"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600";
              }}
            />
          )}
          {/* Sale Badge */}
          {prod.price > prod.salePrice && (
            <div className="absolute top-3 left-3 bg-white text-stone-900 text-[8px] uppercase tracking-widest font-sans font-extrabold px-2.5 py-1 rounded-md shadow-xs border border-stone-150 leading-none">
              Sale
            </div>
          )}
        </div>

        {/* Card Content Data block */}
        <div className="flex flex-col items-start px-0.5 flex-grow text-left">
          
          <button 
            type="button"
            onClick={() => navigate(`/product/${prod.id}`)}
            className="text-[12px] font-serif font-bold text-stone-950 mb-1 hover:text-stone-600 transition-colors focus:outline-none text-left leading-tight line-clamp-2"
          >
            {prod.name}
          </button>
          
          {/* Rating block */}
          <div className="flex items-center space-x-1.5 mb-1.5 justify-start text-left w-full">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className="w-3 h-3 fill-current text-amber-400" 
                />
              ))}
            </div>
            <span className="text-[9.5px] text-stone-400 font-mono">
              ({totalItemReviews.length > 0 ? totalItemReviews.length : Math.floor((prod.id.charCodeAt(0) % 60) + 40)})
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4 justify-start text-left w-full">
            <span className="text-xs font-mono text-stone-900 font-semibold">
              {prod.variants && prod.variants.length > 1 ? "From " : ""}₹{prod.salePrice}
            </span>
            {prod.price > prod.salePrice && (
              <span className="text-xs font-mono text-stone-400 line-through">₹{prod.price}</span>
            )}
          </div>
        </div>

        {/* Full-width Rose-Gold Add to Cart / Choose Option Button */}
        <button
          type="button"
          onClick={() => {
            if (prod.variants && prod.variants.length > 1) {
              navigate(`/product/${prod.id}`);
            } else {
              const defaultVariant = prod.variants && prod.variants.length > 0 
                ? prod.variants[0].size 
                : prod.size;
              handleAddToCart(prod, defaultVariant);
              setIsCartOpen(true);
            }
          }}
          className="w-full py-2.5 bg-[#C47265] hover:bg-[#B36256] text-white transition-all text-[9.5px] uppercase tracking-widest font-semibold focus:outline-none rounded-xl shadow-xs hover:shadow-md cursor-pointer"
        >
          {prod.variants && prod.variants.length > 1 ? "Choose Option" : "Add to cart"}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#111111] font-sans antialiased text-sm flex flex-col justify-between">
      
      {/* Editorial Luxury Splash Screen */}
      <AnimatePresence mode="wait">
        {isSplashLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center pointer-events-auto select-none"
            id="ruh-splash-loader"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Giant high-fidelity vector replica of the user's provided logo */}
              <Logo variant="splash" customLogoUrl={siteSettings.customLogoUrl} />

              {/* Minimalist golden liquid progress trace bar */}
              <div className="w-56 h-[1.5px] bg-sand-100 mt-8 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "0%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                  className="absolute inset-x-0 top-0 bottom-0 bg-gold-500"
                />
              </div>

              {/* Delicate olfactory subheading */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8, duration: 1.0 }}
                className="text-[8px] sm:text-[9px] uppercase tracking-[0.45em] text-sand-500 font-sans mt-4"
              >
                Distilling Biological Memories
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Top Navigation */}
      <Header 
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleSectionNavigate}
        activeSection={activeSection}
        onTrackOrderClick={() => setIsOrderTrackerOpen(true)}
        onAdminClick={() => setIsAdminHubOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={() => {
          setIsAdminLoggedIn(false);
          localStorage.removeItem("ruh-admin-logged-in");
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={handleSelectCategory}
        onLoungeClick={() => setIsLoungeOpen(true)}
        currentUser={currentUser}
        siteSettings={siteSettings}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {siteSettings.marqueeEnabled && siteSettings.marqueeText && (
          <div className="bg-[#111111] text-[#D4BC96] py-1.5 overflow-hidden w-full flex border-b border-[#D4BC96]/20">
            <div className="animate-marquee whitespace-nowrap text-[9px] font-mono tracking-[0.2em] uppercase flex space-x-12 px-4">
              <span>{siteSettings.marqueeText}</span>
              <span>{siteSettings.marqueeText}</span>
              <span>{siteSettings.marqueeText}</span>
              <span>{siteSettings.marqueeText}</span>
              <span>{siteSettings.marqueeText}</span>
              <span>{siteSettings.marqueeText}</span>
            </div>
          </div>
        )}
        <Routes>
          <Route path="/" element={
            <>

        {/* HERO BANNER SECTION */}
        <section 
          className="relative h-[85vh] sm:h-[90vh] bg-[#0D0B0A] flex items-center justify-center overflow-hidden" 
          id="hero-section"
        >
          {/* Ambient Video background */}
          <div className="absolute inset-0 z-0">
            {heroVideoUrl ? (
              isEmbedIframe(heroVideoUrl) ? (
                <iframe
                  key={heroVideoUrl}
                  src={getEmbedVideoUrl(heroVideoUrl, true)}
                  title="Hero Ambient Video"
                  className="absolute inset-0 w-full h-[150%] top-[-25%] border-0 opacity-80 scale-110 pointer-events-none select-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  ref={heroVideoRef}
                  key={heroVideoUrl}
                  src={heroVideoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80 scale-105 transition-opacity duration-1000 select-none pointer-events-none"
                  poster={coverPhoto}
                />
              )
            ) : (
              <img 
                src={coverPhoto} 
                alt="Luxury Sand Scent Banner background"
                className="w-full h-full object-cover opacity-85 scale-100 transition-all duration-300 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-transparent to-[#0D0B0A]/85"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center flex flex-col items-center animate-float">
            
            <h1 
              className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-widest leading-tight mb-8 max-w-4xl uppercase select-none"
              style={{ textShadow: "0 4px 24px rgba(0, 0, 0, 0.75)" }}
            >
              {siteSettings.heroHeadline || "FRAGRANCE"}
            </h1>
            
            <div className="flex justify-center w-full">
              <button
                type="button"
                onClick={() => handleSectionNavigate("shop")}
                className="px-12 py-3.5 bg-white hover:bg-stone-200 text-black text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:scale-103"
              >
                SHOP NOW
              </button>
            </div>

          </div>

          {/* Ambient Video Control Toggle Badge */}
          <div className="absolute bottom-16 right-6 z-20 hidden lg:flex items-center gap-3 bg-black/65 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 text-[9px] text-[#FAFAFA] font-mono tracking-widest shadow-lg">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold-500"></span>
              </span>
              <span className="text-stone-300">VIDEO MOOD:</span>
            </span>
            <div className="h-3 w-[1px] bg-white/25"></div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setHeroVideoUrl("https://assets.mixkit.co/videos/preview/mixkit-perfume-bottle-with-a-rose-on-a-surface-41584-large.mp4")}
                className={`hover:text-[#D4BC96] transition-colors cursor-pointer uppercase ${heroVideoUrl && heroVideoUrl.includes("mixkit-perfume") ? "text-gold-400 font-semibold" : "text-white/60"}`}
              >
                Rose Oil
              </button>
              <button
                type="button"
                onClick={() => setHeroVideoUrl("https://assets.mixkit.co/videos/preview/mixkit-vapor-from-a-hot-beverage-42289-large.mp4")}
                className={`hover:text-[#D4BC96] transition-colors cursor-pointer uppercase ${heroVideoUrl && heroVideoUrl.includes("42289") ? "text-gold-400 font-semibold" : "text-white/60"}`}
              >
                Vapor
              </button>
              <button
                type="button"
                onClick={() => setHeroVideoUrl("https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf186213cefada19cfcaf004602f37c37fa9b2&profile_id=165&oauth2_token_id=57447761")}
                className={`hover:text-[#D4BC96] transition-colors cursor-pointer uppercase ${heroVideoUrl && heroVideoUrl.includes("435674703") ? "text-gold-400 font-semibold" : "text-white/60"}`}
              >
                River Ghats
              </button>
              <div className="h-3.5 w-[1px] bg-white/25"></div>
              <button
                type="button"
                className={`hover:text-red-400 transition-colors cursor-pointer font-bold ${!heroVideoUrl ? "text-red-400" : "text-white/40"}`}
                onClick={() => setHeroVideoUrl("")}
              >
                OFF ✕
              </button>
            </div>
          </div>

          {/* Scent note scrolling bottom marquee */}
          <div className="absolute bottom-0 left-0 right-0 py-4 bg-black/45 border-t border-sand-900/40 hidden sm:block">
            <div className="mx-auto max-w-7xl px-4 flex justify-between items-center text-[10px] uppercase tracking-[0.25em] text-sand-400 font-mono">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4BC96]"></span>
                <span>PURE MYSORE SANDALWOOD</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4BC96]"></span>
                <span>WAYANAD ORGANIC CARDAMOM</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4BC96]"></span>
                <span>COPPPER-DISTILLED KANNAUJ ROSE</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4BC96]"></span>
                <span>ASSAM DARK AGARWOOD OIL</span>
              </div>
            </div>
          </div>
        </section>

        {/* PRESTIGE EDITORIAL PRESS COVERAGE */}
        <section className="bg-sand-100 py-10 border-b border-sand-200/60 select-none" id="press-section">
          <div className="mx-auto max-w-7xl px-2">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4BC96] font-semibold text-center mb-6">
              AS FEATURED IN PRINCIPAL EDITORIALS
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:justify-between text-[#8C8279] font-display text-sm tracking-[0.25em] font-light opacity-75">
              {siteSettings.pressLogosUrls && siteSettings.pressLogosUrls.trim() !== "" ? (
                siteSettings.pressLogosUrls.split(",").map((url, i) => (
                  <img key={i} src={url.trim()} alt="Press" className="h-6 sm:h-8 object-contain cursor-pointer grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" referrerPolicy="no-referrer" />
                ))
              ) : (
                <>
                  <span className="hover:text-sand-900 transition-colors cursor-default">VOGUE</span>
                  <span className="hover:text-sand-900 transition-colors cursor-default font-serif italic">GQ INDIA</span>
                  <span className="hover:text-sand-900 transition-colors cursor-default">ELLE</span>
                  <span className="hover:text-sand-900 transition-colors cursor-default font-serif">AD DIGEST</span>
                  <span className="hover:text-[#D4BC96] transition-colors cursor-default">L'OFFICIEL</span>
                  <span className="hover:text-sand-900 transition-colors cursor-default font-sans font-bold">BAZAAR</span>
                </>
              )}
            </div>
          </div>
        </section>






        {/* DIRECT UPLOADED AD BANNER (IF ENABLED BY ADMIN) */}
        {siteSettings.activeAdBannerEnabled && siteSettings.activeAdBannerImg && (
          <section className="bg-sand-900 border-t border-b border-gold-400/20 py-4 select-none animate-fade-in" id="ad-banner-section">
            <div className="mx-auto max-w-7xl px-4 flex justify-center">
              <a 
                href={siteSettings.activeAdBannerLink || "#shop-section"} 
                className="block hover:opacity-90 transition-opacity rounded-xl overflow-hidden border border-gold-400/30 max-w-4xl w-full"
              >
                <img 
                  src={siteSettings.activeAdBannerImg} 
                  alt="Dynamic Promotional Ad" 
                  className="w-full h-auto object-contain" 
                />
              </a>
            </div>
          </section>
        )}


        {/* SHOP / COLLECTION DIVISION */}
        <section className="bg-sand-100 py-16 sm:py-24 border-b border-sand-200" id="shop-section">
          <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-semibold block mb-2">
                Discover Art of Indian Perfumery with our fragrance collections.
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-display text-sand-900 tracking-wide mb-3">
                The Ruh Imperium Collections
              </h2>
              <div className="h-[1px] w-12 bg-[#D4BC96] mx-auto mt-4 mb-4"></div>
              <p className="text-xs sm:text-sm text-sand-500 font-light leading-relaxed">
                Experience high-concentration luxury formulations handcrafted in India. Hand-purchased biological extracts, hydro-distilled in traditional copper Degs & Bhapkas.
              </p>
            </div>

            {/* Premium Category Search Interface */}
            <div className="max-w-4xl mx-auto mb-12">
              {/* Minimalist Search box */}
              <div className="relative max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="Search our fragrant catalog (e.g. Jasmines, Mittis, Ouds)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-sand-200 focus:border-[#D4BC96] rounded-xl px-5 py-3 text-xs text-sand-800 outline-none transition-all pr-12 shadow-xs"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sand-400 hover:text-black cursor-pointer text-xs"
                  >
                    Clear
                  </button>
                ) : (
                  <Sliders className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-300" />
                )}
              </div>
            </div>

            {/* Horizontal Collections Cards Slider Carousel (Screenshot 2) */}
            {selectedCategory === "All" && searchQuery === "" && (
              <div className="max-w-6xl mx-auto mb-14 relative px-2 animate-fade-in">
                <div 
                  id="collections-cards-scroller"
                  onScroll={(e) => {
                    const target = e.currentTarget;
                    const scrollLeft = target.scrollLeft;
                    const cardTotalWidth = 270 + 24; // approximate column snap step width
                    const index = Math.round(scrollLeft / cardTotalWidth);
                    if (index >= 0 && index < collections.length) {
                      setActiveSlideIndex(index);
                    }
                  }}
                  className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
                >
                  {collections.map((col, idx) => {
                    let cardImg = col.image || "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800";
                    let cardTitle = col.name;

                    if (!col.image) {
                      const nameLower = col.name.toLowerCase();
                      if (nameLower.includes("authentic") || nameLower.includes("traditional") || nameLower.includes("attar")) {
                        cardTitle = "Authentic Indian Attars";
                        cardImg = "https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=800";
                      } else if (nameLower.includes("next gen") || nameLower.includes("modern")) {
                        cardTitle = "Modern Attars";
                        cardImg = "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800";
                      } else if (nameLower.includes("best") || nameLower.includes("artisanal") || nameLower.includes("signature")) {
                        cardTitle = "Indian Artisanal fragrances";
                        cardImg = "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800";
                      } else if (nameLower.includes("parfum") || nameLower.includes("edp")) {
                        cardTitle = "Eau De Parfum";
                        cardImg = "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800";
                      }
                    }

                    return (
                      <div 
                        key={col.id}
                        onClick={() => {
                          handleSelectCategory(col.id);
                          setTimeout(() => {
                            const el = document.getElementById(`collection-grid-header-${col.id}`);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        }}
                        className="group flex flex-col items-center w-[220px] sm:w-[260px] flex-shrink-0 cursor-pointer snap-start"
                      >
                        {/* Image element container */}
                        <div className="w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-sand-100 border border-sand-200/50 shadow-sm relative transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-1">
                          <img 
                            src={cardImg} 
                            alt={cardTitle} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const nameLower = col.name.toLowerCase();
                              let fallback = "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800";
                              if (nameLower.includes("authentic") || nameLower.includes("traditional") || nameLower.includes("attar")) {
                                fallback = "https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=800";
                              } else if (nameLower.includes("next gen") || nameLower.includes("modern")) {
                                fallback = "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800";
                              } else if (nameLower.includes("best") || nameLower.includes("artisanal") || nameLower.includes("signature")) {
                                fallback = "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800";
                              } else if (nameLower.includes("parfum") || nameLower.includes("edp")) {
                                fallback = "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800";
                              }
                              e.currentTarget.src = fallback;
                            }}
                          />
                        </div>
                        
                        {/* Collection Category Title & Description Below Image */}
                        <div className="flex flex-col items-center text-center mt-4">
                          <h4 className="text-[12px] sm:text-[13px] font-mono font-bold text-sand-900 tracking-[0.2em] uppercase transition-colors group-hover:text-[#D4BC96]">
                            {cardTitle}
                          </h4>
                          <span className="text-[10px] text-sand-400 font-light mt-1 max-w-[90%] leading-relaxed">
                            {col.tag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Elegant Slider Pagination Dots (Screenshot 2) */}
                <div className="flex justify-center items-center gap-2.5 mt-3">
                  {collections.map((col, idx) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => {
                        const scroller = document.getElementById("collections-cards-scroller");
                        if (scroller) {
                          const cardTotalWidth = 270 + 24;
                          scroller.scrollTo({
                            left: idx * cardTotalWidth,
                            behavior: "smooth"
                          });
                        }
                        setActiveSlideIndex(idx);
                      }}
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        activeSlideIndex === idx 
                          ? "bg-[#C47265] scale-110" // beautiful terracotta pink active rose-gold dot
                          : "bg-[#E5D7CE]" // muted soft sand gold color
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Products Layout Engine */}
            {(() => {
              // Internal logic to filter products
              const filteredList = products.filter((p) => {
                const matchesCategory = selectedCategory === "All" || 
                  p.category === selectedCategory ||
                  (selectedCategory === "Gourmand" && (
                    p.description.toLowerCase().includes("vanilla") || 
                    p.description.toLowerCase().includes("chocolate") || 
                    p.description.toLowerCase().includes("spic") || 
                    p.description.toLowerCase().includes("sweet") || 
                    p.ingredients.some(i => i.toLowerCase().includes("spice") || i.toLowerCase().includes("vanilla"))
                  )) ||
                  (selectedCategory === "Oriental" && (
                    p.description.toLowerCase().includes("oud") || 
                    p.description.toLowerCase().includes("sandalwood") || 
                    p.description.toLowerCase().includes("amber") || 
                    p.description.toLowerCase().includes("woody") ||
                    p.ingredients.some(i => i.toLowerCase().includes("oud") || i.toLowerCase().includes("sandalwood") || i.toLowerCase().includes("amber"))
                  )) ||
                  (selectedCategory === "Wellness" && (
                    p.category.toLowerCase().includes("attar") || 
                    p.description.toLowerCase().includes("botanical") || 
                    p.description.toLowerCase().includes("sooth") || 
                    p.description.toLowerCase().includes("relax") ||
                    p.ingredients.some(i => i.toLowerCase().includes("rose") || i.toLowerCase().includes("sandalwood") || i.toLowerCase().includes("mitti"))
                  ));
                const matchesKeyword = searchQuery === "" || 
                  p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
                return matchesCategory && matchesKeyword;
              });

              if (filteredList.length === 0) {
                return (
                  <div className="text-center py-16 bg-white rounded-3xl border border-sand-200 max-w-xl mx-auto">
                    <Sliders className="w-10 h-10 text-[#D4BC96] mx-auto mb-4 stroke-[1.2]" />
                    <h3 className="text-lg font-serif text-sand-900 tracking-wide mb-1">No Fragrances Found</h3>
                    <p className="text-xs text-sand-500 font-light mb-4">We couldn't locate any logs matching "{searchQuery}"</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                      }}
                      className="px-5 py-2 bg-[#2D2926] text-white text-[10px] uppercase tracking-widest rounded"
                    >
                      Reset All Filters
                    </button>
                  </div>
                );
              }

              // Card renderer helper
              const renderProductCard = (prod: Product) => {
                const totalItemReviews = reviews.filter((r) => r.productId === prod.id);
                const overallRating = totalItemReviews.length > 0 
                  ? parseFloat((totalItemReviews.reduce((s, r) => s + r.rating, 0) / totalItemReviews.length).toFixed(1))
                  : prod.rating;

                const hoverImage = prod.galleryImages?.find(img => img && img.trim() !== "");

                return (
                  <div 
                    key={prod.id} 
                    className="group flex flex-col justify-between transition-all duration-300 relative bg-white p-4 rounded-2xl border border-stone-100 hover:shadow-[0_12px_40px_rgba(0,0,0,0.035)]"
                    id={`product-card-${prod.id}`}
                  >
                    {/* Image visual wrapper */}
                    <div 
                      className="relative w-full aspect-[4/5] bg-stone-50 overflow-hidden mb-4 rounded-xl cursor-pointer"
                      onClick={() => navigate(`/product/${prod.id}`)}
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className={`w-full h-full object-contain p-4 transition-all duration-700 ${hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                        referrerPolicy="no-referrer"
                      />
                      {hoverImage && (
                        <img 
                          src={hoverImage} 
                          alt={`${prod.name} alternate view`} 
                          className="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      {/* Sale Badge */}
                      {prod.price > prod.salePrice && (
                        <div className="absolute top-3 left-3 bg-[#D4BC96] text-white text-[10px] uppercase tracking-widest font-sans font-bold px-2.5 py-1 leading-none shadow-sm rounded">
                           SALE
                        </div>
                      )}
                    </div>

                    {/* Card Content Data block */}
                    <div className="flex flex-col items-center text-center px-2 flex-grow">
                      
                      {/* Rating block */}
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex text-[#D4BC96]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(overallRating) ? "fill-[#D4BC96]" : "text-sand-200"
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-sand-500 font-mono mt-0.5">
                          ({totalItemReviews.length})
                        </span>
                      </div>

                      <button 
                        onClick={() => navigate(`/product/${prod.id}`)}
                        className="text-[18px] sm:text-[20px] font-serif text-[#2D2926] tracking-wide mb-1 hover:text-[#D4BC96] transition-colors focus:outline-none"
                      >
                        {prod.name}
                      </button>
                      
                      <p className="text-[10px] text-sand-400 uppercase tracking-widest font-semibold mb-3">
                        {prod.size}
                      </p>

                      <div className="flex items-center justify-center gap-2 mb-5">
                        <span className="text-sm font-sans text-sand-950 font-medium">₹{prod.salePrice}</span>
                        {prod.price > prod.salePrice && (
                          <span className="text-sm text-sand-400 line-through">₹{prod.price}</span>
                        )}
                      </div>
                    </div>

                    {/* Full-width Add to Cart Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const defaultVariant = prod.variants && prod.variants.length > 0 
                          ? prod.variants[0].size 
                          : prod.size;
                        handleAddToCart(prod, defaultVariant);
                        setIsCartOpen(true);
                      }}
                      className="w-full py-3.5 bg-stone-900 hover:bg-[#D4BC96] text-white transition-colors text-[10px] uppercase tracking-widest font-semibold focus:outline-none rounded-xl mt-2 cursor-pointer"
                    >
                      ADD TO CART
                    </button>
                  </div>
                );
              };

              // If filtering by specific search or category, show raw layout query
              if (selectedCategory !== "All" || searchQuery !== "") {
                const collectionName = selectedCategory !== "All" 
                  ? (collections.find(c => c.id === selectedCategory)?.name || selectedCategory)
                  : null;
                return (
                  <div>
                    {/* Collection Header — Back nav + title */}
                    <div
                      id={`collection-grid-header-${selectedCategory}`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sand-200 pb-4 mb-8 scroll-mt-24"
                    >
                      <div className="flex items-center gap-3">
                        {/* Back button */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory("All");
                            setSearchQuery("");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-sand-500 hover:text-[#2D2926] font-semibold border border-sand-200 hover:border-[#2D2926] px-3 py-2 rounded-full transition-all cursor-pointer shrink-0"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          All Collections
                        </button>
                        <span className="text-sand-300 hidden sm:block">|</span>
                        {/* Collection title */}
                        {collectionName && (
                          <div>
                            <h3 className="text-xl sm:text-2xl font-light font-display text-sand-900 tracking-wide uppercase leading-tight">
                              {collectionName}
                            </h3>
                            <p className="text-[10px] text-sand-400 font-mono mt-0.5">{filteredList.length} fragrance{filteredList.length !== 1 ? "s" : ""}</p>
                          </div>
                        )}
                        {searchQuery && (
                          <div>
                            <h3 className="text-xl sm:text-2xl font-light font-display text-sand-900 tracking-wide">
                              Results for "{searchQuery}"
                            </h3>
                            <p className="text-[10px] text-sand-400 font-mono mt-0.5">{filteredList.length} found</p>
                          </div>
                        )}
                      </div>
                      {/* Clear filter chip */}
                      <button
                        type="button"
                        onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                        className="self-start sm:self-auto text-[9px] uppercase tracking-widest text-sand-400 hover:text-red-500 transition-colors cursor-pointer font-mono"
                      >
                        ✕ Clear Filter
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
                      {filteredList.map((prod) => renderProductCard(prod))}
                    </div>
                  </div>
                );
              }

              // Otherwise, display Best Sellers / Selected Products
              let bestSellers = [];
              if (siteSettings.bestsellerProductIds && siteSettings.bestsellerProductIds.trim() !== "") {
                const ids = siteSettings.bestsellerProductIds.split(",").map(id => id.trim());
                bestSellers = products.filter(p => ids.includes(p.id));
              }
              if (bestSellers.length === 0) {
                // fallback to top 4 highest rated products
                bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
              }

              return (
                <div className="space-y-16">
                  <div className="space-y-6 scroll-mt-24">
                    {/* Group Title Box */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-sand-200 pb-4 gap-2">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-light font-display text-sand-900 tracking-wide uppercase">
                          {siteSettings.bestsellerHeading || "Selected Products"}
                        </h3>
                        <p className="text-xs text-sand-500 font-light mt-0.5">Curated selections just for you.</p>
                      </div>
                    </div>

                    {/* Shelf Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
                      {bestSellers.map((prod) => renderProductCard(prod))}
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </section>




        {/* STORY CARDS GRID SECTION (STICKY SPLIT TIMELINE RAHI PARFUMS STYLE) */}
        <section className="bg-sand-50 py-16 sm:py-24 border-b border-sand-200" id="story-cards-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Split layout wrapper */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start relative">
              
              {/* Left Column: Sticky Story Tag */}
              <div className="lg:col-span-3 lg:sticky lg:top-28 z-10 py-2 space-y-5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C47265] font-bold block font-mono">
                  OUR STORY
                </span>
                <h2 className="text-3xl font-serif text-sand-900 leading-tight">
                  From Kannauj, With Love
                </h2>
                <p className="text-xs text-sand-500 font-light leading-relaxed">
                  A legacy of over 200 years in the Indian perfume capital of Kannauj. We honor ancient traditions while crafting fragrances suitable for modern lifestyles.
                </p>
                <button
                  type="button"
                  onClick={() => handleSectionNavigate("our-story")}
                  className="px-5 py-2.5 rounded-full border border-[#C47265] text-[#C47265] bg-transparent hover:bg-[#C47265] hover:text-white transition-all duration-300 text-[10px] uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Right Column: Scrolling Cards Timeline */}
              <div className="lg:col-span-9 space-y-10 sm:space-y-14">
                
                {/* Step 01 */}
                <div className="grid grid-cols-1 md:grid-cols-2 rounded-[2rem] overflow-hidden border border-sand-200/60 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-8 sm:p-12 flex flex-col justify-center space-y-4">
                    <span className="text-3xl sm:text-4xl font-sans font-extrabold text-[#D4BC96] tracking-tight font-mono">01</span>
                    <h3 className="text-lg sm:text-2xl font-serif font-bold text-sand-900 leading-snug">
                      {siteSettings.aboutUsHeading || siteSettings.story01Title || "The Art Of Perfume Making"}
                    </h3>
                    <p className="text-xs sm:text-sm text-sand-500 font-light leading-relaxed whitespace-pre-wrap">
                      {siteSettings.aboutUsText || siteSettings.story01Text || "A legacy of over 200 years in the Indian perfume industry and a eureka moment is what led to the creation of Ruh Imperium. We honor ancient traditions."}
                    </p>
                  </div>
                  <div className="h-full min-h-[280px] md:min-h-full aspect-[4/3] md:aspect-auto overflow-hidden relative">
                    <img 
                      src={siteSettings.aboutUsImage || siteSettings.story01Image || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"} 
                      alt="The Art Of Perfume Making" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Step 02 */}
                <div className="grid grid-cols-1 md:grid-cols-2 rounded-[2rem] overflow-hidden border border-sand-200/60 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-8 sm:p-12 flex flex-col justify-center space-y-4">
                    <span className="text-3xl sm:text-4xl font-sans font-extrabold text-[#D4BC96] tracking-tight font-mono">02</span>
                    <h3 className="text-lg sm:text-2xl font-serif font-bold text-sand-900 leading-snug">
                      {siteSettings.story02Title || "Experience True Botanical Luxury and Alcohol-Free Perfume Oils"}
                    </h3>
                    <p className="text-xs sm:text-sm text-sand-500 font-light leading-relaxed whitespace-pre-wrap">
                      {siteSettings.story02Text || "Rooted in tradition, Ruh Imperium transforms heritage into experience. We bring you precious alcohol-free pure oils hydro-distilled in Kannauj copper stills."}
                    </p>
                  </div>
                  <div className="h-full min-h-[280px] md:min-h-full aspect-[4/3] md:aspect-auto overflow-hidden relative">
                    <img 
                      src={siteSettings.story02Image || "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=800"} 
                      alt="Experience True Botanical Luxury" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Step 03 */}
                <div className="grid grid-cols-1 md:grid-cols-2 rounded-[2rem] overflow-hidden border border-sand-200/60 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-8 sm:p-12 flex flex-col justify-center space-y-4">
                    <span className="text-3xl sm:text-4xl font-sans font-extrabold text-[#D4BC96] tracking-tight font-mono">03</span>
                    <h3 className="text-lg sm:text-2xl font-serif font-bold text-sand-900 leading-snug">
                      {siteSettings.story03Title || "Our Sourcing Heritage"}
                    </h3>
                    <p className="text-xs sm:text-sm text-sand-500 font-light leading-relaxed whitespace-pre-wrap">
                      {siteSettings.story03Text || "At Ruh Imperium, we don't just create scents; we preserve a multi-generational legacy. We work block-by-block with farmers in the flower belts to ensure pristine purity."}
                    </p>
                  </div>
                  <div className="h-full min-h-[280px] md:min-h-full aspect-[4/3] md:aspect-auto overflow-hidden relative">
                    <img 
                      src={siteSettings.story03Image || "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800"} 
                      alt="Our Sourcing Heritage" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* DISTILLERY VIDEO SECTION */}
        <section className="bg-sand-100 py-16 sm:py-24 border-b border-sand-200" id="distillery-video-section">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            
            <h2 className="text-2xl sm:text-4xl font-light font-display text-sand-900 tracking-wide mb-4">
              {siteSettings.distilleryVideoHeading || "Where are your fragrances manufactured ?"}
            </h2>
            <p className="text-xs sm:text-sm text-sand-500 font-light max-w-2xl mb-8 leading-relaxed">
              {siteSettings.distilleryVideoText || "100% of our products are manufactured and packaged at our distillery. Watch the video of our 204 years old distillery in Kannauj, India."}
            </p>
            
            <div 
              onClick={() => setIsDistilleryVideoOpen(true)}
              className="group relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-sand-200 max-w-4xl bg-stone-900 cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=1200" 
                alt="Ruh Imperium Distillery" 
                className="w-full h-full object-cover opacity-75 group-hover:scale-103 transition-transform duration-700 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#D4BC96] group-hover:text-black transition-all duration-500 shadow-xl relative">
                  <span className="absolute inset-0 rounded-full border border-[#D4BC96] animate-ping opacity-75 pointer-events-none group-hover:animate-none"></span>
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* THE BRAND STORY & USP LIST (RAAHI STYLE) */}
        <section className="bg-white py-20 sm:py-28 border-b border-sand-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Header with double underline under Kannauj */}
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-serif text-sand-900 tracking-wide leading-tight font-light">
                Handcrafted Fragrances made with functioning plant-based ingredients, straight from India’s perfume capital <span className="relative inline-block font-semibold">Kannauj<span className="absolute bottom-1 left-0 w-full h-[3px] border-b-2 border-double border-emerald-700"></span></span>
              </h2>
            </div>

            {/* 3 Columns USP List with flask/beaker icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-6">
              
              {/* USP 1 */}
              <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-850">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-sand-900 tracking-wide">
                  Effortless Elegance
                </h3>
                <p className="text-xs text-sand-500 font-light leading-relaxed max-w-xs">
                  Apply in seconds and carry your signature scent wherever you go — no complexity, just pure indulgence.
                </p>
              </div>

              {/* USP 2 */}
              <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-850">
                  <Droplet className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-sand-900 tracking-wide">
                  Long-Lasting Impression
                </h3>
                <p className="text-xs text-sand-500 font-light leading-relaxed max-w-xs">
                  Crafted with rich, natural oils that stay with you all day, evolving beautifully on your skin.
                </p>
              </div>

              {/* USP 3 */}
              <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-850">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-serif font-bold text-sand-900 tracking-wide">
                  Pure & Skin-Friendly
                </h3>
                <p className="text-xs text-sand-500 font-light leading-relaxed max-w-xs">
                  Alcohol-free formulations made with traditional methods — gentle, authentic, and timeless.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* DARK STATS SECTION & BADGES ROW (RAAHI STYLE) */}
        <section className="bg-[#0A0A0A] text-white py-20 sm:py-28 border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Stat 1: Image Card */}
              <div className="aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden relative border border-white/10 group shadow-lg min-h-[260px]">
                <img 
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800" 
                  alt="Traditional distillation stills" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Stat 2: 75+ Signature Blends */}
              <div className="bg-[#121212] border border-white/5 p-10 rounded-3xl flex flex-col justify-center space-y-4 hover:border-white/10 transition-colors duration-300">
                <div className="text-5xl sm:text-6xl font-sans font-extrabold tracking-tight text-white">75+</div>
                <h4 className="text-xs uppercase tracking-widest text-[#C47265] font-bold font-mono">Signature Blends</h4>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  A diverse collection of attars crafted for every mood and moment.
                </p>
              </div>

              {/* Stat 3: 200+ Years of Expertise */}
              <div className="bg-[#121212] border border-white/5 p-10 rounded-3xl flex flex-col justify-center space-y-4 hover:border-white/10 transition-colors duration-300">
                <div className="text-5xl sm:text-6xl font-sans font-extrabold tracking-tight text-white">200+</div>
                <h4 className="text-xs uppercase tracking-widest text-[#C47265] font-bold font-mono">Years of Expertise</h4>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Blending tradition and innovation in every bottle.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* 4 CERTIFICATION BADGES ROW */}
        <section className="bg-white py-14 border-b border-sand-200/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center justify-items-center">
              
              {/* Badge 1 */}
              <div className="flex flex-col items-center space-y-2.5">
                <div className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center text-stone-750 p-3 bg-stone-50/50">
                  <span className="text-[7px] font-sans font-extrabold tracking-tighter uppercase text-center leading-none text-stone-600">MADE IN<br/><span className="text-[10px] text-stone-850">INDIA</span></span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-stone-550 font-bold font-mono">Made In India</span>
              </div>

              {/* Badge 2 */}
              <div className="flex flex-col items-center space-y-2.5">
                <div className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center text-stone-750 bg-stone-50/50">
                  <svg className="w-6 h-6 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm-3 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm6.5-6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-stone-550 font-bold font-mono">Cruelty Free</span>
              </div>

              {/* Badge 3 */}
              <div className="flex flex-col items-center space-y-2.5">
                <div className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center text-stone-750 bg-stone-50/50">
                  <svg className="w-6 h-6 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v18M3 12h18M12 3a9 9 0 0 1 9 9M12 21a9 9 0 0 1-9-9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-stone-550 font-bold font-mono">Plant Based</span>
              </div>

              {/* Badge 4 */}
              <div className="flex flex-col items-center space-y-2.5">
                <div className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center text-stone-750 bg-stone-50/50">
                  <Truck className="w-6 h-6 text-stone-600" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-stone-550 font-bold font-mono">Free Shipping</span>
              </div>

            </div>
          </div>
        </section>

        {/* SHOP BY USE SECTION (OCCASIONS GRID) */}
        <section className="bg-sand-50 py-20 sm:py-28 border-b border-sand-200/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-3xl font-serif text-sand-900 tracking-wide">Shop By Use</h2>
              <div className="h-[1px] w-12 bg-[#C47265] mx-auto"></div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
              
              {/* 1. Party Wear (Large Left Card) */}
              <div className="md:col-span-6 aspect-[4/3] md:aspect-auto md:min-h-[460px] rounded-3xl overflow-hidden relative group border border-sand-200/60 shadow-sm cursor-pointer" onClick={() => handleSectionNavigate("shop")}>
                <img 
                  src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800" 
                  alt="Party Wear Fragrances" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <span className="absolute top-6 left-6 px-3.5 py-1.5 bg-white text-stone-900 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">Party Wear</span>
              </div>

              {/* Middle Column (Daily Wear & Office Wear) */}
              <div className="md:col-span-3 grid grid-rows-2 gap-6">
                
                {/* 2. Office Wear */}
                <div className="rounded-3xl overflow-hidden relative group border border-sand-200/60 shadow-sm cursor-pointer aspect-[4/3] md:aspect-auto" onClick={() => handleSectionNavigate("shop")}>
                  <img 
                    src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800" 
                    alt="Office Wear Fragrances" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <span className="absolute top-6 left-6 px-3.5 py-1.5 bg-white text-stone-900 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">Office Wear</span>
                </div>

                {/* 3. Daily Wear */}
                <div className="rounded-3xl overflow-hidden relative group border border-sand-200/60 shadow-sm cursor-pointer aspect-[4/3] md:aspect-auto" onClick={() => handleSectionNavigate("shop")}>
                  <img 
                    src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800" 
                    alt="Daily Wear Fragrances" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <span className="absolute top-6 left-6 px-3.5 py-1.5 bg-white text-stone-900 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">Daily Wear</span>
                </div>

              </div>

              {/* Right Column (Summer & Winter) */}
              <div className="md:col-span-3 grid grid-rows-2 gap-6">
                
                {/* 4. Summer */}
                <div className="rounded-3xl overflow-hidden relative group border border-sand-200/60 shadow-sm cursor-pointer aspect-[4/3] md:aspect-auto" onClick={() => handleSectionNavigate("shop")}>
                  <img 
                    src="https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=800" 
                    alt="Summer Fragrances" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <span className="absolute top-6 left-6 px-3.5 py-1.5 bg-white text-stone-900 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">Summer</span>
                </div>

                {/* 5. Winter */}
                <div className="rounded-3xl overflow-hidden relative group border border-sand-200/60 shadow-sm cursor-pointer aspect-[4/3] md:aspect-auto" onClick={() => handleSectionNavigate("shop")}>
                  <img 
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800" 
                    alt="Winter Fragrances" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-750 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <span className="absolute top-6 left-6 px-3.5 py-1.5 bg-white text-stone-900 text-[10px] font-mono uppercase tracking-widest rounded-md font-bold shadow-xs">Winter</span>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* TIMELESS SCENT TAG CLOUD SECTION */}
        <section className="bg-white py-20 sm:py-28 border-b border-sand-200/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Bold text with green arrow */}
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-4xl sm:text-5xl font-serif font-light text-sand-900 leading-tight tracking-wide relative">
                  A single drop that <span className="text-emerald-800 font-semibold relative">reveals<span className="absolute -top-6 -right-6 hidden sm:block">
                    <svg className="w-12 h-12 text-emerald-600 rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </span></span> a world of timeless fragrances.
                </h2>
              </div>

              {/* Right Column: Scent Tag Grid */}
              <div className="lg:col-span-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                {["ROSE", "SAFFRON", "FLORAL", "MUSK", "SANDALWOOD", "WOODY", "MOGRA", "OUD", "AMBER", "FRESH", "VETIVER (KHUS)", "SPICY"].map((tag, idx) => (
                  <button 
                    key={`${tag}-${idx}`}
                    onClick={() => handleSectionNavigate("shop")}
                    className="px-6 py-2.5 rounded-full border border-stone-250 text-stone-750 text-xs font-mono uppercase tracking-wider hover:bg-[#C47265] hover:text-white hover:border-[#C47265] transition-all duration-300 cursor-pointer shadow-xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </section>




        {/* TRAVEL JOURNAL / DIARY ARTICLES (INSIGHTS RAAHI STYLE) */}
        <section className="bg-white py-16 sm:py-24 border-b border-sand-200" id="journal-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-left mb-12 sm:mb-16">
              <h2 className="text-4xl font-serif text-stone-900 tracking-tight mb-2 select-none" style={{ fontFamily: "Georgia, serif" }}>
                Insights
              </h2>
              <span className="text-emerald-700 text-sm font-sans tracking-wide font-medium block">
                Handcrafted Indian Attar
              </span>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {blogArticles.slice(0, 3).map((article) => (
                <article 
                  key={article.id} 
                  onClick={() => setSelectedArticle(article)}
                  className="flex flex-col cursor-pointer group space-y-4"
                  id={`diary-article-${article.id}`}
                >
                  {/* Image container */}
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] bg-stone-100 border border-stone-100 shadow-sm relative transition-all duration-500 group-hover:shadow-md">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103 select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Text meta */}
                  <div className="flex flex-col space-y-2 text-left">
                    <h3 className="text-lg font-serif font-semibold text-stone-900 leading-snug group-hover:text-[#D4BC96] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <span className="text-[10px] tracking-widest text-stone-400 font-bold uppercase block mt-1">
                      {article.date}
                    </span>
                    <p className="text-xs sm:text-[13px] text-stone-500 font-light leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>



        {/* BLOG POPUP DIALOG FOR ARTICLE READS */}
        {(() => {
          if (!selectedArticle) return null;
          const article = blogArticles.find(b => b.id === selectedArticle.id) || selectedArticle;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2926]/70 backdrop-blur-sm overflow-y-auto">
              <div 
                className="relative w-full max-w-3xl bg-sand-50 rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
                id={`article-overlay-${article.id}`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full border text-sand-500 hover:text-sand-900 cursor-pointer focus:outline-none shadow-sm"
                  id="article-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4BC96] mb-2 font-mono flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#D4BC96]" />
                    <span>JOURNAL LOG ENTRY: {article.location} // {article.date}</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-light font-serif tracking-wide text-sand-900 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-xs text-sand-400 font-light mt-2 italic">
                    Authored by: {article.author} ({article.readTime})
                  </p>
                </div>

                <div className="h-60 w-full rounded-xl overflow-hidden my-6">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <p className="text-sand-600 text-sm whitespace-pre-wrap font-light leading-relaxed">
                  {article.content}
                </p>

                <div className="border-t border-sand-200 mt-10 pt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2.5 bg-[#0D0B0A] hover:bg-gold-500 text-white text-[10px] uppercase tracking-widest font-medium rounded transition-colors cursor-pointer"
                  >
                    CLOSE JOURNAL
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* LEADERSHIP & FOUNDERS LEGACY SECTION */}
        <section className="bg-sand-100 py-20 sm:py-28 border-b border-sand-200" id="founders-section">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-bold block mb-2.5">
                HEIRS & ARCHITECTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light font-display text-sand-900 tracking-wide">
                {siteSettings.foundersHeading || "Our Story & Legacy"}
              </h2>
              <div className="h-[1px] w-12 bg-[#D4BC96] mx-auto mt-5 mb-5"></div>
              <p className="text-xs sm:text-sm text-sand-500 font-light leading-relaxed">
                {siteSettings.foundersText || "Ruh Imperium was sparked by a shared vision to traverse India's historic trade routes, distilling pristine biological extracts and crafting honest, high-concentration luxury fragrances."}
              </p>
            </div>

            {/* Founders Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {founders.map((fnd) => (
                <div key={fnd.id} className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-md flex flex-col group hover:shadow-xl transition-all duration-500">
                  {/* Photo container */}
                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-stone-100">
                    <img 
                      src={fnd.image} 
                      alt={fnd.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103 select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {fnd.linkedin && (
                        <a 
                          href={fnd.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#D4BC96] hover:text-black transition-colors"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {fnd.instagram && (
                        <a 
                          href={fnd.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#D4BC96] hover:text-black transition-colors"
                          title="Instagram Profile"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bio container */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest text-[#D4BC96] font-semibold font-mono block">
                        {fnd.role}
                      </span>
                      <h4 className="text-xl font-serif font-bold text-sand-900">
                        {fnd.name}
                      </h4>
                      <p className="text-xs text-sand-500 font-light leading-relaxed">
                        {fnd.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

            </>
          } />
          <Route path="/product/:id" element={
            <ProductPage 
              onAddToCart={handleAddToCart}
              setIsCartOpen={setIsCartOpen}
              reviews={reviews}
            />
          } />
          <Route path="/our-story" element={<OurStoryPage />} />
        </Routes>
      </main>

      {/* LUXURY BRANDS FOOTER (RAAHI STYLE) */}
      <footer className="bg-[#0A0A0A] text-[#FAFAFA] pt-20 pb-12 rounded-t-[3.5rem] sm:rounded-t-[4.5rem] mt-16 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            
            {/* Left Column: Khus Attar Image Card */}
            <div className="lg:col-span-3 h-[360px] rounded-3xl overflow-hidden relative border border-white/10 group shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=600" 
                alt="Khus Botanical Attar Sourcing" 
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-colors duration-500" />
            </div>

            {/* Middle Column: Menu & Connect Lists */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-8 lg:pl-8">
              {/* Menu List */}
              <div className="space-y-5">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C47265] font-bold">Menu</h4>
                <ul className="space-y-3.5 text-xs text-stone-400 font-light font-sans">
                  <li><button type="button" onClick={() => handleSectionNavigate("hero")} className="hover:text-white cursor-pointer transition-colors block">Home</button></li>
                  <li><button type="button" onClick={() => handleSectionNavigate("shop")} className="hover:text-white cursor-pointer transition-colors block">Shop</button></li>
                  <li><button type="button" onClick={() => handleSectionNavigate("shop")} className="hover:text-white cursor-pointer transition-colors block">Shop All</button></li>
                  <li><button type="button" onClick={() => handleSectionNavigate("shop")} className="hover:text-white cursor-pointer transition-colors block">Wellness</button></li>
                  <li><button type="button" onClick={() => setBulkEnquiryOpen(true)} className="hover:text-white cursor-pointer transition-colors block">Gifting</button></li>
                  <li><button type="button" onClick={() => setBulkEnquiryOpen(true)} className="hover:text-white cursor-pointer transition-colors block">For Bulk Enquiry</button></li>
                  <li><button type="button" onClick={() => handleSectionNavigate("our-story")} className="hover:text-white cursor-pointer transition-colors block">Our Story</button></li>
                  <li><button type="button" onClick={() => setBulkEnquiryOpen(true)} className="hover:text-white cursor-pointer transition-colors block">Contact Us</button></li>
                  <li><button type="button" onClick={() => setIsOrderTrackerOpen(true)} className="hover:text-white cursor-pointer transition-colors block">Track your order</button></li>
                </ul>
              </div>

              {/* Connect List */}
              <div className="space-y-5">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C47265] font-bold">Connect</h4>
                <ul className="space-y-3.5 text-xs text-stone-400 font-light font-sans">
                  <li><button type="button" onClick={() => setBulkEnquiryOpen(true)} className="hover:text-white cursor-pointer transition-colors block">Contact</button></li>
                  <li><button type="button" onClick={() => setIsPrivacyOpen(true)} className="hover:text-white cursor-pointer transition-colors block">Terms of Service</button></li>
                  <li><button type="button" onClick={() => setIsShippingOpen(true)} className="hover:text-white cursor-pointer transition-colors block">Refund policy</button></li>
                  <li><button type="button" onClick={() => setIsPrivacyOpen(true)} className="hover:text-white cursor-pointer transition-colors block">Privacy Policy</button></li>
                  <li><button type="button" onClick={() => setIsShippingOpen(true)} className="hover:text-white cursor-pointer transition-colors block">Shipping Policy</button></li>
                </ul>
              </div>
            </div>

            {/* Right Column: Large Brand Header */}
            <div className="lg:col-span-3 flex justify-start lg:justify-end items-center">
              <div className="text-left lg:text-right space-y-1">
                <h3 className="text-xl sm:text-2xl font-serif text-white tracking-[0.25em] uppercase font-bold" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
                  RUH IMPERIUM
                </h3>
                <span className="text-[8.5px] text-stone-500 font-mono tracking-[0.45em] uppercase block">
                  BOTANICAL PERFUMERY
                </span>
              </div>
            </div>

          </div>

          {/* Horizontal Newsletter Card Wrapper */}
          <div className="bg-stone-900/40 rounded-[1.5rem] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/5 mb-10">
            <div className="space-y-1.5 text-left">
              <h4 className="text-sm font-serif font-semibold tracking-wider text-white uppercase">Journey with us.</h4>
              <p className="text-[11px] text-stone-400 font-light max-w-md">
                Be the first to know about new launches, stories from Kannauj, and exclusive offers.
              </p>
            </div>
            <div className="w-full md:max-w-md flex flex-col items-stretch">
              <form onSubmit={handleSubscribe} className="relative w-full">
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email" 
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="w-full bg-white border border-white/10 rounded-full px-5 py-3 text-xs text-stone-900 focus:outline-none pr-14"
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#C47265] text-white flex items-center justify-center hover:bg-gold-600 transition-colors cursor-pointer"
                  title="Subscribe to updates"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {newsSuccess && (
                <span className="text-emerald-400 text-[10px] mt-2 block text-left">
                  ✓ Welcome to the registry log! 10% code dispatched.
                </span>
              )}
            </div>
          </div>

          {/* Bottom Brand Narrative */}
          <p className="text-[11px] text-stone-500 font-light leading-relaxed text-left border-t border-white/5 pt-8 mb-8">
            Making India's native perfumery accessible to the entire world, through an honest and ethical route. A new era of intense perfumery with 200 years of industry experience. No unnecessary middlemen, straight from India's perfume capital 'Kannauj' to your skin.
          </p>

          {/* Footer Copyright & Social Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-600 font-light gap-4">
            <p>© 2026 Ruh Imperium. All rights reserved.</p>
            <div className="flex space-x-6 text-stone-500">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram"><Instagram className="w-4.5 h-4.5" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Facebook"><Linkedin className="w-4.5 h-4.5" /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="YouTube"><Twitter className="w-4.5 h-4.5" /></a>
            </div>
          </div>

        </div>
      </footer>


      {/* DETAILS MODAL OVERLAYS */}
      {selectedProduct && (() => {
        const activeProduct = products.find(p => p.id === selectedProduct.id) || selectedProduct;
        return (
          <ProductDetailsModal
            product={activeProduct}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddToCart={handleAddToCart}
            reviews={reviews}
            onAddReview={handleAddReview}
            currentUser={currentUser}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isProductWishlisted(activeProduct.id)}
          />
        );
      })()}


      {/* SHOPPING CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onPlaceOrder={(newOrder) => updateOrders((prev) => [newOrder, ...prev])}
        coupons={coupons}
        currentUser={currentUser}
        siteSettings={siteSettings}
        products={products}
        onAddToCart={handleAddToCart}
      />


      {/* EXECUTIVE SECURE HQ PORTAL */}
      <AdminHub
        isOpen={isAdminHubOpen}
        onClose={() => setIsAdminHubOpen(false)}
        products={products}
        setProducts={updateProducts}
        orders={orders}
        setOrders={updateOrders}
        founders={founders}
        setFounders={updateFounders}
        coverPhoto={coverPhoto}
        setCoverPhoto={updateCoverPhoto}
        heroVideoUrl={heroVideoUrl}
        setHeroVideoUrl={updateHeroVideoUrl}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
        siteSettings={siteSettings}
        setSiteSettings={updateSiteSettings}
        coupons={coupons}
        setCoupons={updateCoupons}
        blogArticles={blogArticles}
        setBlogArticles={updateBlogArticles}
        collections={collections}
        setCollections={updateCollections}
        reviews={reviews}
        setReviews={updateReviews}
      />


      {/* SCENT DELIVERY TRACKING OVERLAY */}
      <OrderTracker
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        orders={orders}
      />


      {/* CUSTOMER ROYAL SCENT LOUNGE MODAL OVERLAY */}
      <UserLoungeModal
        isOpen={isLoungeOpen}
        onClose={() => setIsLoungeOpen(false)}
        users={users}
        setUsers={updateUsers}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        orders={orders}
        products={products}
        onAdminClick={() => {
          setIsLoungeOpen(false);
          setIsAdminHubOpen(true);
        }}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={() => {
          setIsAdminLoggedIn(false);
          localStorage.removeItem("ruh-admin-logged-in");
        }}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsModalOpen(true);
        }}
        onAddCustomToCart={handleAddCustomToCart}
      />


      {/* PRIVACY CHARTER MODAL OVERLAY */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 bg-[#1C1917]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#F9F7F2] border border-stone-200 rounded-3xl p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto animate-fade-in shadow-2xl">
            <button 
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute top-5 right-5 p-2 text-stone-500 hover:text-stone-900 duration-350 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-6">
              <div className="border-b border-stone-200/60 pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4BC96] font-semibold block mb-1">SECURE COORDINATES</span>
                <h3 className="text-xl sm:text-2xl font-serif text-stone-950 font-bold">Privacy Charter & Checkout Security</h3>
              </div>
              
              <div className="space-y-5 text-stone-700 text-xs sm:text-sm font-light leading-relaxed">
                <div>
                  <h4 className="font-semibold text-stone-950 mb-1.5 uppercase text-[10.5px] tracking-wide text-[#D4BC96]">1. End-To-End Security Sandbox</h4>
                  <p>
                    All payment processing runs in state-of-the-art PCI-DSS compliance zones. Absolute cryptographic safety keeps your banking credentials invisible to both us and unauthorized channels.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-950 mb-1.5 uppercase text-[10.5px] tracking-wide text-[#D4BC96]">2. Cookie & Preferences Caching</h4>
                  <p>
                    LocalStorage and state indices are restricted to catalog item logs, custom compounding formulas, and Member Lounge login details. 
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-950 mb-1.5 uppercase text-[10.5px] tracking-wide text-[#D4BC96]">3. Zero Shared Directories</h4>
                  <p>
                    We never rent, lease, or share your contact directories. Your customized perfumes, delivery coordinates, and purchase histories are locked inside your personal user profile securely.
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-200/60 pt-5 flex justify-end">
                <button 
                  onClick={() => setIsPrivacyOpen(false)}
                  className="px-6 py-2.5 bg-[#2D2926] hover:bg-[#D4BC96] text-white hover:text-stone-950 text-[10px] uppercase font-mono tracking-widest rounded-lg transition-all duration-300 cursor-pointer"
                >
                  DISMISS LOGS ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* FORMULATIONS SAFETY CHECKLIST MODAL OVERLAY */}
      {isSafetyOpen && (
        <div className="fixed inset-0 bg-[#1C1917]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#F9F7F2] border border-stone-200 rounded-3xl p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto animate-fade-in shadow-2xl">
            <button 
              onClick={() => setIsSafetyOpen(false)}
              className="absolute top-5 right-5 p-2 text-stone-500 hover:text-stone-900 duration-350 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-6">
              <div className="border-b border-stone-200/60 pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4BC96] font-semibold block mb-1">KANNANJ INTEGRITY STANDARDS</span>
                <h3 className="text-xl sm:text-2xl font-serif text-stone-950 font-bold">Formulations Safety Checklist</h3>
              </div>
              
              <div className="space-y-5 text-stone-700 text-xs sm:text-sm font-light leading-relaxed font-sans">
                <div>
                  <h4 className="font-semibold text-stone-950 mb-1.5 uppercase text-[10.5px] tracking-wide text-[#D4BC96]">1. 100% Pure Alcohol-Free Perfume Oils</h4>
                  <p>
                    We utilize heritage hydro-distilled botanical extracts infused directly onto aged Mysore Sandalwood bases. This preserves the skin's moisture lipids without the harsh irritation associated with industrial SD-alcohol solvents.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-950 mb-1.5 uppercase text-[10.5px] tracking-wide text-[#D4BC96]">2. Hypoallergenic Sourcing</h4>
                  <p>
                    We guarantee zero synthetic parabens, zero phthalates, zero kerosene-byproducts, and zero artificial coloring agents. Safe for dermal application across all skin profiles.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-950 mb-1.5 uppercase text-[10.5px] tracking-wide text-[#D4BC96]">3. Eco-Responsible Copper Cooperage</h4>
                  <p>
                    Sourcing exclusively from family distilleries practicing water-based (Deg-Bhapka) clay hydro-distillation. Cruelty-free and never tested on animals.
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-200/60 pt-5 flex justify-end">
                <button 
                  onClick={() => setIsSafetyOpen(false)}
                  className="px-6 py-2.5 bg-[#2D2926] hover:bg-[#D4BC96] text-white hover:text-stone-950 text-[10px] uppercase font-mono tracking-widest rounded-lg transition-all duration-300 cursor-pointer"
                >
                  DISMISS LOGS ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* SHIPPING RULES & REPLACEMENTS MODAL OVERLAY */}
      {isShippingOpen && (
        <div className="fixed inset-0 bg-[#1C1917]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#F9F7F2] border border-stone-200 rounded-3xl p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto animate-fade-in shadow-2xl">
            <button 
              onClick={() => setIsShippingOpen(false)}
              className="absolute top-5 right-5 p-2 text-stone-500 hover:text-stone-900 duration-350 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-6">
              <div className="border-b border-stone-200/60 pb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4BC96] font-semibold block mb-1">EXPRESS FREIGHT INTEGRITY</span>
                <h3 className="text-xl sm:text-2xl font-serif text-stone-950 font-bold">Shipping Rules & Replacement Charter</h3>
              </div>
              
              <div className="space-y-5 text-stone-700 text-xs sm:text-sm font-light leading-relaxed">
                <div>
                  <h4 className="font-semibold text-stone-950 mb-1.5 uppercase text-[10.5px] tracking-wide text-[#D4BC96]">1. Pan-India Free Shipping</h4>
                  <p>
                    All items ship completely free of freight surcharges across India. Products are handpicked, secured in shock-insulated canisters and dispatched within 24-48 business hours with live tracing SMS/email logs.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-950 mb-1.5 uppercase text-[10.5px] tracking-wide text-[#D4BC96]">2. High-Care Hygiene Returns</h4>
                  <p>
                    Because of the premium, unadulterated nature of slow-perfumery oils, we cannot accept standard returns or exchanges on opened flagons/canisters. We highly recommend starting with "The Odyssey Discovery Set" to find your favorite coordinates first.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-950 mb-1.5 uppercase text-[10.5px] tracking-wide text-[#D4BC96]">3. Transit Damage Security</h4>
                  <p>
                    In the extremely rare event of transport leakages or breakages, we issue a brand-new replacement within 24 hours of coordinate landing. Simply supply a brief unboxing video within 48 hours of transit touchdown to support@ruhimperium.com and we will immediately take action.
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-200/60 pt-5 flex justify-end">
                <button 
                  onClick={() => setIsShippingOpen(false)}
                  className="px-6 py-2.5 bg-[#2D2926] hover:bg-[#D4BC96] text-white hover:text-stone-950 text-[10px] uppercase font-mono tracking-widest rounded-lg transition-all duration-300 cursor-pointer"
                >
                  DISMISS LOGS ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* DISTILLERY VIDEO POPUP LIGHTBOX MODAL */}
      {isDistilleryVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
          <button 
            onClick={() => setIsDistilleryVideoOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors cursor-pointer"
            title="Close video player"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black relative">
            <iframe
              src={getEmbedVideoUrl(siteSettings.distilleryVideoUrl || "https://www.youtube.com/embed/Tscv0R6q13Y", true)}
              title="Ruh Imperium Distillery Video"
              className="absolute inset-0 w-full h-full border-0 select-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* FLOATING RICH NOTIFICATION TOASTERS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="bg-[#2D2926] border border-[#D4BC96]/40 text-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 animate-slideUp pointer-events-auto">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
              t.type === "warning"
                ? "bg-red-500/10 border border-red-500/30 text-rose-400"
                : "bg-amber-500/15 border border-amber-500/40 text-[#D4BC96]"
            }`}>
              <span>✨</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[9.5px] font-mono tracking-wider text-[#D4BC96] uppercase font-bold leading-none">Royal Court</p>
              <p className="text-[11px] text-sand-200 font-light mt-1.5 leading-snug">{t.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
