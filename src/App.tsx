import { useState, useEffect, FormEvent, useRef } from 'react';
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
  Trees
} from 'lucide-react';
import { PRODUCTS, BLOG_ARTICLES, PRE_SEEDED_REVIEWS } from './data';
import { Product, CartItem, Review, BlogArticle, Order, Coupon, SiteSettings, UserAccount, Collection, Founder, getEmbedVideoUrl } from './types';
import Header from "./components/Header";
import ProductDetailsModal from "./components/ProductDetailsModal";
import CartDrawer from "./components/CartDrawer";
import AdminHub from "./components/AdminHub";
import OrderTracker from "./components/OrderTracker";
import UserLoungeModal from "./components/UserLoungeModal";
import Logo from "./components/Logo";
import { motion, AnimatePresence } from "motion/react";
import { db, withTimeout } from './firebase';
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

  // Navigation active section
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
    const cached = localStorage.getItem("ruh-admin-logged-in") || localStorage.getItem("raahi-admin-logged-in");
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
    const cached = localStorage.getItem("ruh-cart") || localStorage.getItem("raahi-cart");
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);

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
            foundersText: "Ruh Imperium was sparked by a shared vision to traverse India’s historic trade routes, distilling pristine biological extracts and crafting honest, high-concentration luxury fragrances.",
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
    });

    // 2. PRODUCTS LIVE SYNC
    const unsubscribeProducts = onSnapshot(collection(db, "products"), async (snap) => {
      if (!snap.empty) {
        if (writeLockRef.current["products"]) return;
        const list: Product[] = [];
        snap.forEach((d) => {
          list.push(d.data() as Product);
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
    });

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
    });

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
    });

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
    });

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
    });

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
    });

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
    });

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
    });

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
    });

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
      const currentIds = new Set(resolved.map(p => p.id));
      const deletedIds = previousProducts.filter(p => !currentIds.has(p.id)).map(p => p.id);
      for (const id of deletedIds) {
        await withTimeout(deleteDoc(doc(db, "products", id)));
      }
      for (const p of resolved) {
        await withTimeout(setDoc(doc(db, "products", p.id), p));
      }
    } catch (e) {
      console.error("Firestore products sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["products"] = false; }, 1500);
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
      const currentIds = new Set(resolved.map(b => b.id));
      const deletedIds = previousBlogs.filter(b => !currentIds.has(b.id)).map(b => b.id);
      for (const id of deletedIds) {
        await deleteDoc(doc(db, "blogArticles", id));
      }
      for (const b of resolved) {
        await setDoc(doc(db, "blogArticles", b.id), b);
      }
    } catch (e) {
      console.error("Firestore blog sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["blogs"] = false; }, 1500);
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
      const currentCodes = new Set(resolved.map(c => c.code));
      const deletedCodes = previousCoupons.filter(c => !currentCodes.has(c.code)).map(c => c.code);
      for (const code of deletedCodes) {
        await deleteDoc(doc(db, "coupons", code));
      }
      for (const c of resolved) {
        await setDoc(doc(db, "coupons", c.code), c);
      }
    } catch (e) {
      console.error("Firestore coupon sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["coupons"] = false; }, 1500);
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
      const currentIds = new Set(resolved.map(r => r.id));
      const deletedIds = previousReviews.filter(r => !currentIds.has(r.id)).map(r => r.id);
      for (const id of deletedIds) {
        await deleteDoc(doc(db, "reviews", id));
      }
      for (const r of resolved) {
        await setDoc(doc(db, "reviews", r.id), r);
      }
    } catch (e) {
      console.error("Firestore reviews sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["reviews"] = false; }, 1500);
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
      const currentIds = new Set(resolved.map(o => o.id));
      const deletedIds = previousOrders.filter(o => !currentIds.has(o.id)).map(o => o.id);
      for (const id of deletedIds) {
        await deleteDoc(doc(db, "orders", id));
      }
      for (const o of resolved) {
        await setDoc(doc(db, "orders", o.id), o);
      }
    } catch (e) {
      console.error("Firestore orders sync error: ", e);
    } finally {
      setTimeout(() => { writeLockRef.current["orders"] = false; }, 1500);
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
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const matchingElement = document.getElementById(`${sectionId}-section`);
    if (matchingElement) {
      matchingElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

  return (
    <div className="min-h-screen overflow-x-hidden bg-sand-50/70 text-sand-900 font-sans antialiased text-sm flex flex-col justify-between">
      
      {/* Editorial Luxury Splash Screen */}
      <AnimatePresence mode="wait">
        {isSplashLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#F9F7F2] flex flex-col items-center justify-center pointer-events-auto select-none"
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
        setSelectedCategory={setSelectedCategory}
        onLoungeClick={() => setIsLoungeOpen(true)}
        currentUser={currentUser}
        siteSettings={siteSettings}
      />

      {/* Main Content Body */}
      <main className="flex-1">

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
                  className="absolute inset-0 w-full h-[150%] top-[-25%] border-0 opacity-35 scale-110 pointer-events-none select-none"
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
                  className="w-full h-full object-cover opacity-35 scale-105 transition-opacity duration-1000 select-none pointer-events-none"
                  poster={coverPhoto}
                />
              )
            ) : (
              <img 
                src={coverPhoto} 
                alt="Luxury Sand Scent Banner background"
                className="w-full h-full object-cover opacity-60 scale-100 transition-all duration-300 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-transparent to-[#0D0B0A]/80"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center flex flex-col items-center">
            

            <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#D4BC96] font-semibold mb-4 animate-fade-in">
              {siteSettings.heroTagline}
            </span>
            
            <h1 className="text-4xl sm:text-7xl font-light font-display text-white tracking-[0.08em] leading-tight mb-6 max-w-4xl">
              {siteSettings.heroHeadline}
            </h1>
            
            <p className="text-sm sm:text-lg text-sand-300 font-light tracking-wide max-w-2xl mb-10 leading-relaxed">
              {siteSettings.heroDescription}
            </p>

            <div className="flex justify-center w-full">
              <button
                type="button"
                onClick={() => handleSectionNavigate("shop")}
                className="px-8 py-4 bg-[#D4BC96] hover:bg-white hover:text-black hover:scale-101 outline-none text-white text-xs uppercase tracking-[0.22em] font-medium rounded shadow-lg transition-all duration-300 font-display cursor-pointer"
              >
                DISCOVER THE COLLECTION
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
        <section className="bg-[#FAF5F2] py-10 border-b border-sand-200/60 select-none" id="press-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4BC96] font-semibold text-center mb-6">
              AS FEATURED IN PRINCIPAL EDITORIALS
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:justify-between text-[#8C8279] font-display text-sm tracking-[0.25em] font-light opacity-75">
              <span className="hover:text-sand-900 transition-colors cursor-default">VOGUE</span>
              <span className="hover:text-sand-900 transition-colors cursor-default font-serif italic">GQ INDIA</span>
              <span className="hover:text-sand-900 transition-colors cursor-default">ELLE</span>
              <span className="hover:text-sand-900 transition-colors cursor-default font-serif">AD DIGEST</span>
              <span className="hover:text-[#D4BC96] transition-colors cursor-default">L'OFFICIEL</span>
              <span className="hover:text-sand-900 transition-colors cursor-default font-sans font-bold">BAZAAR</span>
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
        <section className="bg-[#FAF5F2] py-16 sm:py-24 border-b border-sand-200" id="shop-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
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
                          setSelectedCategory(col.id);
                          // Smooth scroll active category title to top viewport
                          setTimeout(() => {
                            const el = document.getElementById(`collection-grid-header-${col.id}`);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        }}
                        className="group bg-white rounded-[2rem] hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-500 relative aspect-4/3 sm:aspect-[4/3] w-[270px] sm:w-[330px] flex-shrink-0 cursor-pointer overflow-hidden snap-start border border-sand-200/50 shadow-md"
                      >
                        {/* Image element */}
                        <img 
                          src={cardImg} 
                          alt={cardTitle} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                          referrerPolicy="no-referrer"
                        />
                        {/* Elegant dark fade overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                        
                        {/* Collection Category Title (Bottom Left) */}
                        <div className="absolute bottom-6 left-6 right-16 z-10 text-left">
                          <h3 className="font-sans font-bold text-lg sm:text-2xl text-white tracking-tight leading-tight uppercase drop-shadow-xs">
                            {cardTitle}
                          </h3>
                        </div>

                        {/* Translucent premium arrow container */}
                        <div className="absolute bottom-6 right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 group-hover:scale-115 group-hover:border-white/95 z-10">
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
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
                const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
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

                return (
                  <div 
                    key={prod.id} 
                    className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col"
                    id={`product-card-${prod.id}`}
                  >
                    
                    {/* Discount or Category pill top-left */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                      <span className="bg-white/90 backdrop-blur-sm text-sand-900 text-[10px] uppercase tracking-widest font-mono font-bold px-3 py-1.5 rounded-full shadow-sm leading-none">
                        {prod.size}
                      </span>
                      {prod.price > prod.salePrice && (
                        <span className="bg-amber-700/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-sans font-bold px-3 py-1.5 rounded-full shadow-sm leading-none mt-1">
                          SALE {Math.round(((prod.price - prod.salePrice) / prod.price) * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Image visual wrapper with zoom on hover */}
                    <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-sand-100">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                      
                      {/* Quick look overlay block */}
                      <button
                        type="button"
                        onClick={() => handleOpenPDP(prod)}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-sand-900 text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full shadow-lg hover:bg-sand-900 hover:text-white transition-all translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 focus:outline-none cursor-pointer"
                      >
                        Quick Look
                      </button>
                    </div>

                    {/* Card Content Data block */}
                    <div className="p-5 sm:p-7 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <button 
                          onClick={() => handleOpenPDP(prod)}
                          className="text-left block text-xl sm:text-2xl font-light font-display text-sand-900 tracking-wide mb-2 group-hover:text-amber-800 transition-colors focus:outline-none w-full"
                        >
                          {prod.name} | {prod.tagline}
                        </button>
                        
                        {/* Rating block */}
                        <div className="flex items-center space-x-1 mb-4">
                          <div className="flex text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < Math.floor(overallRating) ? "fill-amber-500" : "text-sand-200"
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-[12px] font-semibold text-sand-700 font-mono ml-2">
                            ({totalItemReviews.length || 146})
                          </span>
                        </div>
                      </div>

                      {/* Pricing and cart addition */}
                      <div className="pt-2 flex flex-col gap-4 mt-auto">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm text-sand-600">From</span>
                          <span className="text-xl font-serif text-sand-950 font-medium leading-none">₹{prod.salePrice}</span>
                          {prod.price > prod.salePrice && (
                            <span className="text-sm text-sand-400 line-through">₹{prod.price}</span>
                          )}
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => {
                            handleAddToCart(prod, prod.size);
                            setIsCartOpen(true);
                          }}
                          className="w-full py-4 bg-[#D16972] hover:bg-[#B55A62] rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md focus:outline-none"
                          id={`add-cart-btn-${prod.id}`}
                        >
                          Choose Option
                        </button>
                      </div>
                    </div>

                  </div>
                );
              };

              // If filtering by specific search or category, show raw layout query
              if (selectedCategory !== "All" || searchQuery !== "") {
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredList.map((prod) => renderProductCard(prod))}
                  </div>
                );
              }

              // Otherwise, group neatly by categories as requested
              const groups = collections;

              return (
                <div className="space-y-16">
                  {groups.map((grp) => {
                    const groupProds = products.filter((p) => p.category === grp.id);
                    if (groupProds.length === 0) return null;
                    return (
                      <div key={grp.id} id={`collection-grid-header-${grp.id}`} className="space-y-6 scroll-mt-24">
                        {/* Group Title Box */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-sand-200 pb-4 gap-2">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-light font-display text-sand-900 tracking-wide uppercase">
                              {grp.name}
                            </h3>
                            <p className="text-xs text-sand-500 font-light mt-0.5">{grp.tag}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedCategory(grp.id)}
                            className="text-[10px] uppercase font-semibold tracking-widest text-sand-900 border-b border-black pb-0.5 hover:text-[#D4BC96] hover:border-[#D4BC96] transition-colors focus:outline-none"
                          >
                            View All Items →
                          </button>
                        </div>

                        {/* Shelf Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                          {groupProds.map((prod) => renderProductCard(prod))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

          </div>
        </section>


        {/* BUILT THROUGH GENERATIONS, TOLD THROUGH NUMBERS BENTO SECTION */}
        <section className="bg-stone-950 py-20 text-white border-t border-b border-stone-800" id="stats-numbers-section">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-light font-display tracking-wide text-white leading-tight">
                Built Through Generations, Told Through Numbers
              </h2>
              <div className="h-[1px] w-12 bg-[#D4BC96] mx-auto mt-6"></div>
            </div>

            {/* Bento Grid layout with exact matching slots */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              
              {/* Card 1 (Col 1, Row 1): 200k+ Tag */}
              <div className="bg-[#0D0B0A] border border-stone-805/40 rounded-3xl p-8 flex flex-col justify-between h-56 hover:border-[#D4BC96]/30 transition-all duration-300">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1">
                    {siteSettings.statsCard1Badge || "GLOBAL REACH"}
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-mono font-medium tracking-tight text-white mb-2">
                    {siteSettings.statsCard1Value || "200k+"}
                  </h3>
                </div>
                <div>
                  <h4 className="text-[#D4BC96] font-serif text-sm font-semibold mb-1">
                    {siteSettings.statsCard1Title || "Fragrances Delivered"}
                  </h4>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {siteSettings.statsCard1Desc || "Making India's native perfumery accessible to the entire world."}
                  </p>
                </div>
              </div>

              {/* Card 2 (Col 2, Row 1): 72% Card */}
              <div className="bg-[#0D0B0A] border border-stone-805/40 rounded-3xl p-8 flex flex-col justify-between h-56 hover:border-[#D4BC96]/30 transition-all duration-300">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1">
                    {siteSettings.statsCard2Badge || "LOYALTY INDEX"}
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-mono font-medium tracking-tight text-white mb-2">
                    {siteSettings.statsCard2Value || "72%"}
                  </h3>
                </div>
                <div>
                  <h4 className="text-[#D4BC96] font-serif text-sm font-semibold mb-1">
                    {siteSettings.statsCard2Title || "Customer Satisfaction"}
                  </h4>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {siteSettings.statsCard2Desc || "Loved for natural aroma and authentic craftsmanship."}
                  </p>
                </div>
              </div>

              {/* Card 3 (Col 3, Row 1): Picture of woman applying perfume */}
              <div className="bg-[#0D0B0A] border border-stone-805/40 rounded-3xl overflow-hidden h-56 relative group hover:border-[#D4BC96]/30 transition-all duration-300">
                <img 
                  src={siteSettings.statsCard3Image || "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600"} 
                  alt="Customer Applying Fragrance" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1">
                    {siteSettings.statsCard3Badge || "SCENT SUITE"}
                  </span>
                  <h4 className="text-white text-sm font-serif">
                    {siteSettings.statsCard3Title || "True Botanical Heritage"}
                  </h4>
                </div>
              </div>

              {/* Card 4 (Col 4, Row 1): 24h Dispatch */}
              <div className="bg-[#0D0B0A] border border-stone-805/40 rounded-3xl p-8 flex flex-col justify-between h-56 hover:border-[#D4BC96]/30 transition-all duration-300">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1">
                    {siteSettings.statsCard4Badge || "LOGISTICS LOGS"}
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-mono font-medium tracking-tight text-white mb-2">
                    {siteSettings.statsCard4Value || "24h"}
                  </h3>
                </div>
                <div>
                  <h4 className="text-[#D4BC96] font-serif text-sm font-semibold mb-1">
                    {siteSettings.statsCard4Title || "Fast Dispatch"}
                  </h4>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {siteSettings.statsCard4Desc || "Quick shipping so your signature scent reaches you sooner."}
                  </p>
                </div>
              </div>

              {/* Card 5 (Col 1-2, Row 2): Traditional stills image (spans 2 columns on desktop) */}
              <div className="lg:col-span-2 bg-[#0D0B0A] border border-stone-805/40 rounded-3xl overflow-hidden flex flex-col md:flex-row hover:border-[#D4BC96]/30 transition-all duration-300 h-auto sm:h-56">
                <div className="w-full md:w-1/2 overflow-hidden h-44 sm:h-full relative">
                  <img 
                    src={siteSettings.statsCard5Image || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600"} 
                    alt="Traditional hydrodistillation vessels in Kannauj" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1">
                      {siteSettings.statsCard5Badge || "ORIGIN CHRONICLES"}
                    </span>
                    <h4 className="text-white text-lg font-serif mb-2">
                      {siteSettings.statsCard5Title || "Heritage Distillation Stoves"}
                    </h4>
                  </div>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {siteSettings.statsCard5Desc || "Preserving a 204-year-old water-based clay hydrodistillation method in copper Degs and Bhapkas without industrial steam generators or chemical solvents."}
                  </p>
                </div>
              </div>

              {/* Card 6 (Col 3, Row 2): 75+ Blends */}
              <div className="bg-[#0D0B0A] border border-stone-805/40 rounded-3xl p-8 flex flex-col justify-between h-56 hover:border-[#D4BC96]/30 transition-all duration-300">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1">
                    {siteSettings.statsCard6Badge || "PORTFOLIO ACCORDS"}
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-mono font-medium tracking-tight text-white mb-2">
                    {siteSettings.statsCard6Value || "75+"}
                  </h3>
                </div>
                <div>
                  <h4 className="text-[#D4BC96] font-serif text-sm font-semibold mb-1">
                    {siteSettings.statsCard6Title || "Signature Blends"}
                  </h4>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {siteSettings.statsCard6Desc || "A diverse collection of attars crafted for every mood and moment."}
                  </p>
                </div>
              </div>

              {/* Card 7 (Col 4, Row 2): 200+ Years */}
              <div className="bg-[#0D0B0A] border border-stone-805/40 rounded-3xl p-8 flex flex-col justify-between h-56 hover:border-[#D4BC96]/30 transition-all duration-300">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1">
                    {siteSettings.statsCard7Badge || "LEGACY COEFFICIENT"}
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-mono font-medium tracking-tight text-white mb-2">
                    {siteSettings.statsCard7Value || "200+"}
                  </h3>
                </div>
                <div>
                  <h4 className="text-[#D4BC96] font-serif text-sm font-semibold mb-1">
                    {siteSettings.statsCard7Title || "Years of Expertise"}
                  </h4>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {siteSettings.statsCard7Desc || "Blending tradition and innovation in every single bottle."}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* STORY CARDS GRID SECTION (THREE ROWS EXACTLY LIKE MOBILE/DESKTOP RAHI PARFUMS DESIGN) */}
        <section className="bg-[#FAF5F2] py-16 sm:py-24 border-b border-sand-200" id="story-cards-section">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
            
            {/* Row Header */}
            <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-light font-display text-sand-900 tracking-wide leading-tight">
                Handcrafted Fragrances made with functioning plant-based ingredients, straight from India's perfume capital Kannauj
              </h2>
              <div className="h-[1px] w-12 bg-[#D4BC96] mx-auto mt-6"></div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14 items-center">
              <div className="order-2 md:order-1 space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-sand-950">
                  {siteSettings.story01Title || "01 The Art Of Perfume Making"}
                </h3>
                <p className="text-xs sm:text-sm text-sand-500 font-light leading-relaxed">
                  {siteSettings.story01Text || "A legacy of over 200 years in the Indian perfume industry and a eureka moment is what led to the creation of Ruh Imperium. We honor ancient traditions."}
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-sand-200">
                  <img
                    src={siteSettings.story01Image || "https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=600"}
                    alt="The Art Of Perfume Making"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14 items-center">
              <div>
                <div className="aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-sand-200">
                  <img
                    src={siteSettings.story02Image || "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600"}
                    alt="Experience True Botanical Luxury"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-sand-950">
                  {siteSettings.story02Title || "02 Experience True Botanical Luxury and Alcohol-Free Perfume Oils"}
                </h3>
                <p className="text-xs sm:text-sm text-sand-500 font-light leading-relaxed">
                  {siteSettings.story02Text || "Rooted in tradition, Ruh Imperium transforms heritage into experience. We bring you precious alcohol-free pure oils hydro-distilled in Kannauj copper stills."}
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14 items-center">
              <div className="order-2 md:order-1 space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-sand-950">
                  {siteSettings.story03Title || "03 Our Story"}
                </h3>
                <p className="text-xs sm:text-sm text-sand-500 font-light leading-relaxed">
                  {siteSettings.story03Text || "At Ruh Imperium, we don't just create scents; we preserve a multi-generational legacy. We work block-by-block with farmers in the flower belts to ensure pristine purity."}
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-sand-200">
                  <img
                    src={siteSettings.story03Image || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600"}
                    alt="Our Story"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* DISTILLERY VIDEO SECTION */}
        <section className="bg-[#FAF5F2] py-16 sm:py-24 border-b border-sand-200" id="distillery-video-section">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            
            <h2 className="text-2xl sm:text-4xl font-light font-display text-sand-900 tracking-wide mb-4">
              {siteSettings.distilleryVideoHeading || "Where are your fragrances manufactured ?"}
            </h2>
            <p className="text-xs sm:text-sm text-sand-500 font-light max-w-2xl mb-8 leading-relaxed">
              {siteSettings.distilleryVideoText || "100% of our products are manufactured and packaged at our distillery. Watch the video of our 204 years old distillery in Kannauj, India."}
            </p>
            
            <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-sand-200 max-w-4xl bg-black relative">
              <iframe
                src={getEmbedVideoUrl(siteSettings.distilleryVideoUrl || "https://www.youtube.com/embed/Tscv0R6q13Y", false)}
                title="Ruh Imperium Distillery Video"
                className="absolute inset-0 w-full h-full border-0 select-none animate-fade-in"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

          </div>
        </section>


        {/* THE BRAND STORY & USP GRID (BENTO CARD OVERVIEW) */}
        <section className="bg-[#FAF5F2] py-16 sm:py-24 border-b border-sand-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-semibold block mb-2">
                Crafted for Wayfarers
              </span>
              <h2 className="text-3xl font-light font-display text-sand-900 tracking-wide">
                {siteSettings.whyChooseHeading}
              </h2>
              <div className="h-[1px] w-10 bg-[#D4BC96] mx-auto mt-4 mb-4"></div>
              <p className="text-xs text-sand-500 font-light leading-relaxed">
                {siteSettings.whyChooseSub}
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* USP 1 */}
              <div className="bg-white rounded-2xl border border-sand-200 p-8 shadow-sm flex flex-col justify-between items-start hover:scale-101 border-b-2 hover:border-b-[#D4BC96] transition-all duration-300">
                <div className="w-12 h-12 bg-[#2D2926] rounded-xl flex items-center justify-center text-white mb-6">
                  <Compass className="w-5 h-5 text-[#D4BC96]" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-sand-900 tracking-wide mb-2.5">
                    1. Travel-Inspired Postcards
                  </h3>
                  <p className="text-xs text-sand-500 font-light leading-relaxed">
                    Each fragrance captures the raw material and sensory aesthetic of a physical geographical journey coordinates. No abstract concepts, just real travels.
                  </p>
                </div>
              </div>

              {/* USP 2 */}
              <div className="bg-white rounded-2xl border border-sand-200 p-8 shadow-sm flex flex-col justify-between items-start hover:scale-101 border-b-2 hover:border-b-[#D4BC96] transition-all duration-300">
                <div className="w-12 h-12 bg-[#2D2926] rounded-xl flex items-center justify-center text-white mb-6">
                  <Droplet className="w-5 h-5 text-[#D4BC96]" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-sand-900 tracking-wide mb-2.5">
                    2. 22% Extrait Concentration
                  </h3>
                  <p className="text-xs text-sand-500 font-light leading-relaxed">
                    Most traditional brands market 8-12% Eau de Toilette. We formulate at a heavy Extrait-level concentration, guaranteeing 8 to 12 hours of projection sillage on skin.
                  </p>
                </div>
              </div>

              {/* USP 3 */}
              <div className="bg-white rounded-2xl border border-sand-200 p-8 shadow-sm flex flex-col justify-between items-start hover:scale-101 border-b-2 hover:border-b-[#D4BC96] transition-all duration-300">
                <div className="w-12 h-12 bg-[#2D2926] rounded-xl flex items-center justify-center text-white mb-6">
                  <ShieldCheck className="w-5 h-5 text-[#D4BC96]" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-sand-900 tracking-wide mb-2.5">
                    3. Sustainable Hydro-distillation
                  </h3>
                  <p className="text-xs text-sand-500 font-light leading-relaxed">
                    From Mysore Sandalwood to Kannauj Rose water petals, we collaborate with family cooperatives practice traditional water still extraction.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* FEATURING SANDALWOOD STICK & RUBBING STONE */}
        <section className="bg-[#FAF5F2] py-16 sm:py-24 border-b border-sand-200" id="sandalwood-stick-section">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border border-sand-200 group bg-sand-50">
                  <img
                    src={siteSettings.sandalwoodStickImage || "https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=600"}
                    alt="Sandalwood Stick + Rubbing Stone"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Gold badge */}
                <span className="absolute top-4 left-4 bg-amber-800 text-amber-100 text-[10px] tracking-widest font-mono uppercase px-3 py-1.5 rounded-full font-bold shadow-md">
                  AYURVEDA CHILL PILL
                </span>
              </div>

              {/* Descriptions & Instant Purchase */}
              <div className="space-y-6 text-center md:text-left">
                <div className="space-y-2">
                  <span className="text-[10px] tracking-[0.3em] font-mono text-[#D4BC96] uppercase block">PRESTIGE WELLNESS OFFER</span>
                  <h2 className="text-3xl sm:text-4xl font-light font-display text-sand-900 tracking-wide">
                    {siteSettings.sandalwoodStickTitle || "Sandalwood Stick + Rubbing Stone"}
                  </h2>
                  <div className="h-[1px] w-12 bg-gold-400 mx-auto md:mx-0 mt-3"></div>
                </div>

                <p className="text-xs sm:text-sm text-sand-500 leading-relaxed font-light">
                  {siteSettings.sandalwoodStickText || "Ayurveda's chill pill! It is a spa treatment from nature - calming your mind, cooling your skin, and centering your thoughts. Hand-crafted from original Mysore Sandalwood blocks."}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <div className="text-2xl font-serif text-amber-950 font-bold">
                    ₹ {siteSettings.sandalwoodStickPrice || 1250}.00
                  </div>
                  <div className="text-xs text-stone-400 line-through">
                    ₹ 1850.00
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const sandStickProduct: Product = {
                        id: "sandalwood-stick-bundle",
                        name: siteSettings.sandalwoodStickTitle || "Sandalwood Stick + Rubbing Stone",
                        tagline: "Ayurveda's organic chill pill package",
                        price: 1850,
                        salePrice: siteSettings.sandalwoodStickPrice || 1250,
                        size: "1 Bundle",
                        ingredients: ["Mysores Sandalwood Stick", "Organic Rubbing Slabs"],
                        notes: { top: ["Pure Sandalwood"], heart: ["Sacred Woodiness"], base: ["Creamy Earth"] },
                        longevity: "Eternal therapeutic cooling",
                        projection: "Intimate and soul-centering",
                        description: siteSettings.sandalwoodStickText || "Ayurveda's chill pill bundle with rubbing stone.",
                        story: "Sacred wellness",
                        destination: "Mysore, India",
                        destinationState: "Karnataka",
                        image: siteSettings.sandalwoodStickImage || "https://images.unsplash.com/photo-1615655496458-62137024e6ab?auto=format&fit=crop&q=80&w=600",
                        rating: 5.0,
                        reviewsCount: 147,
                        category: "BEST SELLING"
                      };
                      handleAddToCart(sandStickProduct, "1 Bundle");
                    }}
                    className="px-8 py-3.5 bg-amber-950 hover:bg-gold-500 hover:scale-101 text-white text-xs font-mono uppercase tracking-widest rounded transition-all cursor-pointer shadow-lg w-full sm:w-auto"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* SHOP BY NOTES SECTION (METICULOUSLY MATCHING REF DESIGN) */}
        <section className="bg-white py-20 sm:py-24 border-b border-sand-200" id="shop-by-notes-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-light font-display text-sand-900 tracking-[0.1em] uppercase mb-4">
              Shop by Notes
            </h2>
            <p className="text-xs sm:text-sm text-sand-500 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Discover your signature scent through a premium card layout designed to feel elegant, modern, and luxurious. Explore each fragrance family and find the mood that defines you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              
              {/* Card 1: Floral */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("Floral");
                  const el = document.getElementById("shop-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  showToast("Filtered catalog by Floral accords.");
                }}
                className="bg-white border border-[#EBE5DE] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center hover:-translate-y-1 block focus:outline-none w-full shadow-xs"
              >
                <div className="w-14 h-14 bg-[#F7F3EE] group-hover:bg-[#EBE5DE]/40 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                  <Flower2 className="w-6 h-6 text-[#C49B74] stroke-[1.25]" />
                </div>
                <h3 className="text-[17px] font-serif text-sand-905 font-semibold tracking-tight mb-3">Floral</h3>
                <p className="text-[12px] text-sand-500 font-light leading-relaxed max-w-[240px] mx-auto">
                  Soft, romantic, and graceful. Floral notes capture the beauty of blooming petals and create a timeless scent profile full of elegance and charm.
                </p>
              </button>

              {/* Card 2: Woody */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("Wood");
                  const el = document.getElementById("shop-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  showToast("Filtered catalog by Woody accords.");
                }}
                className="bg-white border border-[#EBE5DE] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center hover:-translate-y-1 block focus:outline-none w-full shadow-xs"
              >
                <div className="w-14 h-14 bg-[#F7F3EE] group-hover:bg-[#EBE5DE]/40 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                  <Trees className="w-6 h-6 text-[#C49B74] stroke-[1.25]" />
                </div>
                <h3 className="text-[17px] font-serif text-sand-905 font-semibold tracking-tight mb-3">Woody</h3>
                <p className="text-[12px] text-sand-500 font-light leading-relaxed max-w-[240px] mx-auto">
                  Deep, warm, and grounded. Woody compositions bring rich forest-inspired notes that feel confident, refined, and beautifully long-lasting.
                </p>
              </button>

              {/* Card 3: Fresh */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("Fresh");
                  const el = document.getElementById("shop-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  showToast("Filtered catalog by Fresh accords.");
                }}
                className="bg-white border border-[#EBE5DE] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center hover:-translate-y-1 block focus:outline-none w-full shadow-xs"
              >
                <div className="w-14 h-14 bg-[#F7F3EE] group-hover:bg-[#EBE5DE]/40 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                  <Droplet className="w-6 h-6 text-[#C49B74] stroke-[1.25]" />
                </div>
                <h3 className="text-[17px] font-serif text-sand-905 font-semibold tracking-tight mb-3">Fresh</h3>
                <p className="text-[12px] text-sand-500 font-light leading-relaxed max-w-[240px] mx-auto">
                  Crisp, clean, and uplifting. Fresh fragrances energize the senses with airy brightness, making them perfect for everyday sophistication.
                </p>
              </button>

              {/* Card 4: Musky */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("Musk");
                  const el = document.getElementById("shop-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  showToast("Filtered catalog by Musky accords.");
                }}
                className="bg-white border border-[#EBE5DE] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center hover:-translate-y-1 block focus:outline-none w-full shadow-xs"
              >
                <div className="w-14 h-14 bg-[#F7F3EE] group-hover:bg-[#EBE5DE]/40 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                  <Sparkles className="w-6 h-6 text-[#C49B74] stroke-[1.25]" />
                </div>
                <h3 className="text-[17px] font-serif text-sand-905 font-semibold tracking-tight mb-3">Musky</h3>
                <p className="text-[12px] text-sand-500 font-light leading-relaxed max-w-[240px] mx-auto">
                  Smooth, sensual, and unforgettable. Musky notes add depth and mystery, leaving behind a powerful trail that feels bold yet polished.
                </p>
              </button>

              {/* Card 5: Gourmand */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("Honey");
                  const el = document.getElementById("shop-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  showToast("Filtered catalog by Gourmand accords.");
                }}
                className="bg-white border border-[#EBE5DE] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center hover:-translate-y-1 block focus:outline-none w-full shadow-xs"
              >
                <div className="w-14 h-14 bg-[#F7F3EE] group-hover:bg-[#EBE5DE]/40 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                  <Atom className="w-6 h-6 text-[#C49B74] stroke-[1.25]" />
                </div>
                <h3 className="text-[17px] font-serif text-sand-905 font-semibold tracking-tight mb-3">Gourmand</h3>
                <p className="text-[12px] text-sand-500 font-light leading-relaxed max-w-[240px] mx-auto">
                  Delicious, creamy, and addictive. Gourmand scents blend sweet edible-inspired notes with a luxurious warmth that feels irresistible.
                </p>
              </button>

              {/* Card 6: Oriental */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("Saffron");
                  const el = document.getElementById("shop-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  showToast("Filtered catalog by Oriental accords.");
                }}
                className="bg-white border border-[#EBE5DE] rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer text-center hover:-translate-y-1 block focus:outline-none w-full shadow-xs"
              >
                <div className="w-14 h-14 bg-[#F7F3EE] group-hover:bg-[#EBE5DE]/40 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                  <Compass className="w-6 h-6 text-[#C49B74] stroke-[1.25]" />
                </div>
                <h3 className="text-[17px] font-serif text-sand-905 font-semibold tracking-tight mb-3">Oriental</h3>
                <p className="text-[12px] text-sand-500 font-light leading-relaxed max-w-[240px] mx-auto">
                  Rich, opulent, and magnetic. Oriental blends unite spices, resins, and exotic warmth for a statement-making scent experience.
                </p>
              </button>

            </div>
          </div>
        </section>


        {/* TRAVEL JOURNAL / DIARY ARTICLES */}
        <section className="bg-[#FAF5F2] py-16 sm:py-24 border-b border-sand-200" id="journal-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-semibold block mb-2">
                Travel Journals
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-display text-sand-900 tracking-wide mb-3">
                Wanderlust Diary
              </h2>
              <div className="h-[1px] w-12 bg-[#D4BC96] mx-auto mt-4 mb-4"></div>
              <p className="text-sm text-sand-500 font-light">
                Insights and field narratives written by our sourcing experts trekking down the historical scent routes of South Asia.
              </p>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogArticles.map((article) => (
                <article 
                   key={article.id} 
                  className="bg-white rounded-2xl border border-sand-200 overflow-hidden flex flex-col justify-between shadow-xs hover:scale-101 transition-all duration-300"
                  id={`diary-article-${article.id}`}
                >
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#2D2926]/90 text-white text-[9px] uppercase tracking-widest px-2.5 py-1.5 rounded flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4BC96]" />
                      <span>{article.location}</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-[10px] uppercase text-sand-400 font-mono mb-3">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-light font-serif text-sand-900 tracking-wide mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-sand-500 font-light leading-relaxed line-clamp-3 mb-6">
                        {article.excerpt}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedArticle(article)}
                      className="text-[10px] tracking-[0.2em] uppercase font-bold text-sand-800 hover:text-[#D4BC96] text-left border-b border-[#D4BC96]/40 w-fit pb-1 transition-all duration-350 focus:outline-none cursor-pointer"
                      id={`read-article-btn-${article.id}`}
                    >
                      READ CONTEXTLOG →
                    </button>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>


        {/* OUR FOUNDERS SECTION */}
        <section className="bg-[#FAF5F2] py-16 sm:py-24 border-b border-sand-200" id="founders-section">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-semibold block mb-2">
                THE ARCHITECTS OF SCENT
              </span>
              <h2 className="text-3xl sm:text-5xl font-light font-display text-sand-900 tracking-wide mb-3 animate-fade-in">
                {siteSettings.foundersHeading}
              </h2>
              <div className="h-[1px] w-12 bg-[#D4BC96] mx-auto mt-4 mb-4"></div>
              <p className="text-sm text-sand-500 font-light leading-relaxed">
                {siteSettings.foundersText}
              </p>
            </div>

            {/* Founders Grid */}
            <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
              
              {founders.map((fnd, idx) => (
                <div 
                  key={fnd.id} 
                  className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-10 hover:shadow-lg hover:scale-[1.005] transition-all duration-500 min-w-0 overflow-hidden"
                  id={`founder-deck-${fnd.id}`}
                >
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full min-w-0">
                    
                    {/* Big Image box */}
                    <div className={`w-full lg:w-5/12 min-w-0 overflow-hidden shrink-0 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4BC96]/20 bg-sand-100">
                        <img
                          src={fnd.image}
                          alt={fnd.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-104 animate-fade-in"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    
                    {/* Bio Text */}
                    <div className={`w-full lg:w-7/12 flex flex-col justify-between min-w-0 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="min-w-0 break-words whitespace-normal">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4BC96] font-bold block mb-2">
                          {fnd.role}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-light font-serif text-sand-900 tracking-wide mt-1 mb-4">
                          {fnd.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-sand-600 font-light leading-relaxed mb-6">
                          {fnd.bio}
                        </p>
                      </div>

                      {/* Founders Social Profiles Options */}
                      {(fnd.linkedin || fnd.instagram || fnd.twitter) && (
                        <div className="flex gap-3 justify-center sm:justify-start mt-4 pt-4 border-t border-sand-100 flex-wrap">
                          {fnd.linkedin && (
                            <a
                              href={fnd.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-lg bg-sand-50 border border-sand-200 text-xs text-sand-600 hover:text-black hover:border-black hover:bg-sand-100 transition-all duration-200 flex items-center gap-1.5 focus:outline-none"
                              title="LinkedIn Profile"
                            >
                              <Linkedin className="w-3.5 h-3.5 text-[#D4BC96]" />
                              <span className="font-mono text-[9px] uppercase tracking-widest font-semibold">LinkedIn</span>
                            </a>
                          )}
                          {fnd.instagram && (
                            <a
                              href={fnd.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-lg bg-sand-50 border border-sand-200 text-xs text-sand-600 hover:text-black hover:border-black hover:bg-sand-100 transition-all duration-200 flex items-center gap-1.5 focus:outline-none"
                              title="Instagram Profile"
                            >
                              <Instagram className="w-3.5 h-3.5 text-[#D4BC96]" />
                              <span className="font-mono text-[9px] uppercase tracking-widest font-semibold">Instagram</span>
                            </a>
                          )}
                          {fnd.twitter && (
                            <a
                              href={fnd.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-lg bg-sand-50 border border-sand-200 text-xs text-sand-600 hover:text-black hover:border-black hover:bg-sand-100 transition-all duration-200 flex items-center gap-1.5 focus:outline-none"
                              title="Twitter Profile"
                            >
                              <Twitter className="w-3.5 h-3.5 text-[#D4BC96]" />
                              <span className="font-mono text-[9px] uppercase tracking-widest font-semibold">Twitter</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
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

      </main>

      {/* LUXURY BRANDS FOOTER */}
      <footer className="bg-[#0D0B0A] text-[#FAFAFA] py-16 sm:py-20 border-t border-sand-900/45">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Info and Address (LHS - 4 cols) */}
            <div className="md:col-span-4 space-y-4">
              <Logo variant="footer" className="!items-start" customLogoUrl={siteSettings.customLogoUrl} />
              <p className="text-xs text-sand-400 font-light leading-relaxed">
                {siteSettings.footerAbout}
              </p>

              <div className="space-y-1.5 pt-4 text-xs font-light text-sand-400">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4BC96]" />
                  <span>{siteSettings.contactAddress}</span>
                </p>
                <p className="flex items-center gap-2 font-mono">
                  <Mail className="w-4 h-4 text-[#D4BC96]" />
                  <span>{siteSettings.contactEmail}</span>
                </p>
                {siteSettings.contactPhone && (
                  <p className="flex items-center gap-2 font-mono">
                    <span className="text-[#D4BC96] font-bold">P:</span>
                    <span>{siteSettings.contactPhone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Quick sections links (Medium - 4 cols split) */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs font-light text-sand-400">
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-semibold">THE COLLECTIONS</h4>
                <ul className="space-y-2">
                  <li><button type="button" onClick={() => handleSectionNavigate("shop")} className="hover:text-white cursor-pointer transition-colors text-left block">Next Gen Fragrances</button></li>
                  <li><button type="button" onClick={() => handleSectionNavigate("shop")} className="hover:text-white cursor-pointer transition-colors text-left block">Authentic Indian Attars</button></li>
                  <li><button type="button" onClick={() => handleSectionNavigate("shop")} className="hover:text-white cursor-pointer transition-colors text-left block">Best Selling Attars</button></li>
                  <li><button type="button" onClick={() => handleSectionNavigate("shop")} className="hover:text-white cursor-pointer transition-colors text-left block">Eau De Parfums</button></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-semibold">EXPLORER LOGS</h4>
                <ul className="space-y-2">
                  <li><button type="button" onClick={() => {
                    const el = document.getElementById("distillery-video-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }} className="hover:text-white cursor-pointer transition-colors text-left block">Our Distillery</button></li>
                  <li><button type="button" onClick={() => handleSectionNavigate("journal")} className="hover:text-white cursor-pointer transition-colors text-left block">Travel Journal</button></li>
                  <li><button type="button" onClick={() => {
                    const el = document.getElementById("story-cards-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }} className="hover:text-white cursor-pointer transition-colors text-left block">Handcrafted Sourcing</button></li>
                </ul>
              </div>
            </div>

            {/* Newsletter capture (RHS - 4 cols) */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-semibold">
                JOIN THE WAYFARER CLUB
              </h4>
              <p className="text-xs text-sand-400 font-light leading-relaxed">
                Subscribe to coordinate alerts. Get early access to new seasonal scent logs and private pre-launch reservations.
              </p>

              {newsSuccess && (
                <div className="bg-gold-50/10 border border-[#D4BC96]/30 text-[#D4BC96] text-xs p-3 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4BC96]" />
                  <span>Welcome to the registry log! 10% exclusive coupon code dispatched.</span>
                </div>
              )}

              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="bg-transparent border border-sand-800 rounded px-3 py-2 text-xs text-white w-full focus:ring-1 focus:ring-[#D4BC96] outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#D4BC96] hover:bg-white hover:text-black rounded text-[10px] uppercase tracking-widest font-medium transition-all cursor-pointer shadow-md"
                >
                  JOIN
                </button>
              </form>

              <div className="flex space-x-4 pt-3 text-sand-400">
                <button type="button" className="hover:text-[#D4BC96] cursor-pointer" aria-label="Instagram"><Instagram className="w-4 h-4" /></button>
                <div className="text-[11px] font-mono text-sand-500 flex items-center gap-1 leading-none uppercase tracking-widest select-none">
                  <Atom className="w-3.5 h-3.5 animate-spin-slow text-[#D4BC96]" />
                  <span>COORDINATES-SECURE</span>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-sand-900/40 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-[10.5px] text-sand-500 font-light">
            <p>© 2026 Ruh Imperium Private Limited. Inspired in India, crafted for the globetrotter.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0 font-mono text-[9px] uppercase tracking-widest">
              <button type="button" onClick={() => setIsPrivacyOpen(true)} className="hover:text-white cursor-pointer transition-colors bg-transparent border-0 outline-none p-0">Privacy Charter</button>
              <button type="button" onClick={() => setIsSafetyOpen(true)} className="hover:text-white cursor-pointer transition-colors bg-transparent border-0 outline-none p-0">Formulations safety checklist</button>
              <button type="button" onClick={() => setIsShippingOpen(true)} className="hover:text-white cursor-pointer transition-colors bg-transparent border-0 outline-none p-0">Shipping rules</button>
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
                    In the extremely rare event of transport leakages or breakages, we issue a brand-new replacement within 24 hours of coordinate landing. Simply supply a brief unboxing video within 48 hours of transit touchdown to support@ruhimperium.com or thevimalbyte@gmail.com and we will immediately take action.
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
