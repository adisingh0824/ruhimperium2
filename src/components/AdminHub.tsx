import React, { useState, useRef, FormEvent, useEffect } from "react";
import { 
  X, 
  Check,
  Lock, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Package, 
  Upload, 
  UserCheck, 
  Image as ImageIcon, 
  RefreshCw, 
  TrendingUp, 
  CheckCircle,
  Truck,
  Layers,
  FileText,
  Ticket,
  MessageSquare,
  Star
} from "lucide-react";
import { Product, Order, Coupon, SiteSettings, BlogArticle, Collection, Founder, Review } from "../types";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface AdminHubProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  founders: Founder[];
  setFounders: React.Dispatch<React.SetStateAction<Founder[]>>;
  coverPhoto: string;
  setCoverPhoto: (url: string) => void;
  heroVideoUrl: string;
  setHeroVideoUrl: (url: string) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  blogArticles: BlogArticle[];
  setBlogArticles: React.Dispatch<React.SetStateAction<BlogArticle[]>>;
  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
  reviews: Review[];
  setReviews: (newVal: Review[] | ((prev: Review[]) => Review[])) => void;
}

export default function AdminHub({
  isOpen,
  onClose,
  products,
  setProducts,
  orders,
  setOrders,
  founders: parentFounders,
  setFounders: parentSetFounders,
  coverPhoto,
  setCoverPhoto,
  heroVideoUrl,
  setHeroVideoUrl,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  siteSettings: parentSiteSettings,
  setSiteSettings: parentSetSiteSettings,
  coupons,
  setCoupons,
  blogArticles,
  setBlogArticles,
  collections,
  setCollections,
  reviews,
  setReviews
}: AdminHubProps) {
  // Login form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "brand" | "coupons" | "content" | "collections" | "reviews" | "admin-credentials">("products");

  // Redefine internal state to manage draft settings and founders
  const [localSiteSettings, setLocalSiteSettings] = useState<SiteSettings>(parentSiteSettings);
  const [localFounders, setLocalFounders] = useState<Founder[]>(parentFounders);
  const [isSiteDirty, setIsSiteDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [reviewSearchQuery, setReviewSearchQuery] = useState("");
  const [selectedProductFilter, setSelectedProductFilter] = useState("all");

  // Sync back if parent changes from outside and we don't have unsaved draft
  useEffect(() => {
    if (!isSiteDirty && isOpen) {
      setLocalSiteSettings(parentSiteSettings);
    }
  }, [parentSiteSettings, isSiteDirty, isOpen]);

  useEffect(() => {
    if (!isSiteDirty && isOpen) {
      setLocalFounders(parentFounders);
    }
  }, [parentFounders, isSiteDirty, isOpen]);

  // Shadow variables for rendering
  const siteSettings = localSiteSettings;
  const founders = localFounders;

  // Shadow setters to hook updates
  const setSiteSettings = (val: React.SetStateAction<SiteSettings>) => {
    setLocalSiteSettings(val);
    setIsSiteDirty(true);
  };

  const setFounders = (val: React.SetStateAction<Founder[]>) => {
    setLocalFounders(val);
    setIsSiteDirty(true);
  };

  const handleSaveAllSiteChanges = async () => {
    setIsSaving(true);
    try {
      await parentSetSiteSettings(localSiteSettings);
      await parentSetFounders(localFounders);
      setIsSiteDirty(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      console.error("Save site and founders error:", err);
      alert("Failed to publish: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    setLocalSiteSettings(parentSiteSettings);
    setLocalFounders(parentFounders);
    setIsSiteDirty(false);
    setSaveSuccess(false);
  };

  // Admin users state (with persistent fallback)
  const [adminUsers, setAdminUsers] = useState<{username: string; password: string}[]>(() => {
    const cached = localStorage.getItem("ruh-admin-users");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
    return [{ username: "saditya7990@gmail.com", password: "Adi19983@" }];
  });

  useEffect(() => {
    localStorage.setItem("ruh-admin-users", JSON.stringify(adminUsers));
  }, [adminUsers]);

  // Product deletion state
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Coupon form inputs
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponPercent, setNewCouponPercent] = useState(15);
  const [couponErrorMsg, setCouponErrorMsg] = useState("");

  // Product management state
  const [isEditingProduct, setIsEditingProduct] = useState<string | null>(null); // "new" for adding, product id for editing
  
  // Product Form states
  const [prodName, setProdName] = useState("");
  const [prodTagline, setProdTagline] = useState("");
  const [prodPrice, setProdPrice] = useState(999);
  const [prodSalePrice, setProdSalePrice] = useState(599);
  const [prodSize, setProdSize] = useState("50 ml");
  const [prodLongevity, setProdLongevity] = useState("Long lasting (8-10 hours)");
  const [prodProjection, setProdProjection] = useState("Polite but noticeable");
  const [prodDescription, setProdDescription] = useState("");
  const [prodStory, setProdStory] = useState("");
  const [prodIngredients, setProdIngredients] = useState("");
  const [prodDestination, setProdDestination] = useState("Kannauj, Uttar Pradesh");
  const [prodDestinationState, setProdDestinationState] = useState("Uttar Pradesh");
  const [prodImage, setProdImage] = useState("");
  const [prodRating, setProdRating] = useState(5.0);
  const [prodCategory, setProdCategory] = useState("Next Gen fragrances");
  const [prodGalleryImages, setProdGalleryImages] = useState<string[]>(["", "", "", "", ""]);
  const [prodGalleryTexts, setProdGalleryTexts] = useState<{ title: string; desc: string }[]>(
    Array.from({ length: 5 }, () => ({ title: "", desc: "" }))
  );
  const [prodProductImages, setProdProductImages] = useState<string[]>(["", "", "", ""]);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingNewColImg, setIsUploadingNewColImg] = useState(false);
  const [newColImageUrl, setNewColImageUrl] = useState("");
  const [uploadingColId, setUploadingColId] = useState<string | null>(null);

  // Hidden file input references
  const mainCoverInputRef = useRef<HTMLInputElement>(null);
  const founderVimalInputRef = useRef<HTMLInputElement>(null);
  const founderAdityaInputRef = useRef<HTMLInputElement>(null);
  const prodImgInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handles standard secure credentials matching from dynamic registered admins
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const matchFound = adminUsers.some(
      (user) =>
        user.username.trim().toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (matchFound) {
      setIsAdminLoggedIn(true);
      localStorage.setItem("ruh-admin-logged-in", "true");
    } else {
      setLoginError("Invalid Executive Credentials. Access Denied.");
    }
  };

  // Compress image before Base64 encoding to bypass Firebase Storage completely and stay well under Firestore 1MB limits
  const compressAndEncodeBase64 = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL("image/jpeg", 0.6)); // High compression, very small string
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndEncodeBase64(file, callback);
    }
  };

  // Load product form values for editing or reset for adding new
  const openProductForm = (prod: Product | "new") => {
    if (prod === "new") {
      setIsEditingProduct("new");
      setProdName("");
      setProdTagline("");
      setProdPrice(1499);
      setProdSalePrice(999);
      setProdSize("50 ml");
      setProdLongevity("Long lasting (8-10 hours)");
      setProdProjection("Polite but noticeable");
      setProdDescription("");
      setProdStory("");
      setProdIngredients("Sandalwood, Bergamot, Amber");
      setProdDestination("Kannauj, Uttar Pradesh");
      setProdDestinationState("Uttar Pradesh");
      setProdImage("https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600");
      setProdRating(5.0);
      setProdCategory(collections[0]?.id || "Next Gen fragrances");
      setProdGalleryImages(["", "", "", "", ""]);
      setProdGalleryTexts(Array.from({ length: 5 }, () => ({ title: "", desc: "" })));
      setProdProductImages(["", "", "", ""]);
    } else {
      setIsEditingProduct(prod.id);
      setProdName(prod.name);
      setProdTagline(prod.tagline);
      setProdPrice(prod.price);
      setProdSalePrice(prod.salePrice);
      setProdSize(prod.size);
      setProdLongevity(prod.longevity || "Long lasting (8-10 hours)");
      setProdProjection(prod.projection || "Moderate");
      setProdDescription(prod.description);
      setProdStory(prod.story || "");
      setProdIngredients(prod.ingredients?.join(", ") || "");
      setProdDestination(prod.destination || "");
      setProdDestinationState(prod.destinationState || "");
      setProdImage(prod.image);
      setProdRating(prod.rating || 5.0);
      setProdCategory(prod.category || collections[0]?.id || "Next Gen fragrances");
      
      let imgs = prod.galleryImages || [];
      const tempImgs = [...imgs];
      while (tempImgs.length < 5) {
        tempImgs.push("");
      }
      setProdGalleryImages(tempImgs.slice(0, 5));

      let txts = prod.galleryTexts || [];
      const tempTxts = [...txts];
      while (tempTxts.length < 5) {
        tempTxts.push({ title: "", desc: "" });
      }
      setProdGalleryTexts(tempTxts.slice(0, 5));

      let pImgs = prod.productImages || [];
      const tempPImgs = [...pImgs];
      while (tempPImgs.length < 4) {
        tempPImgs.push("");
      }
      setProdProductImages(tempPImgs.slice(0, 4));
    }
  };

  // Submit and save product changes
  const handleProductSaveSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodTagline.trim()) return;

    const formattedIngredients = prodIngredients.split(",").map(i => i.trim()).filter(Boolean);

    if (isEditingProduct === "new") {
      // Add Brand New Product
      const newId = `prod-custom-${Date.now()}`;
      const newProduct: Product = {
        id: newId,
        name: prodName,
        tagline: prodTagline,
        price: Number(prodPrice),
        salePrice: Number(prodSalePrice),
        size: prodSize,
        longevity: prodLongevity,
        projection: prodProjection,
        description: prodDescription,
        story: prodStory || `A beautifully discovered fragrance tracing pure oils from ${prodDestination}.`,
        ingredients: formattedIngredients,
        destination: prodDestination,
        destinationState: prodDestinationState,
        image: prodImage,
        rating: Number(prodRating) || 5.0,
        reviewsCount: 0,
        notes: {
          top: formattedIngredients.slice(0, 3),
          heart: formattedIngredients.slice(2, 5),
          base: formattedIngredients.slice(4, 7)
        },
        category: prodCategory,
        galleryImages: prodGalleryImages,
        galleryTexts: prodGalleryTexts,
        productImages: prodProductImages
      };

      setProducts(prev => [newProduct, ...prev]);
    } else {
      // Edit Existing Product details
      setProducts(prev => prev.map(p => {
        if (p.id === isEditingProduct) {
          
          let updatedVariants = [];
          if (prodSize.includes('12 ml')) {
            updatedVariants = [
              { size: '12ML Roll On', price: Number(prodPrice), salePrice: Number(prodSalePrice) },
              { size: '6ML Roll On', price: Math.round(Number(prodPrice) * 0.55), salePrice: Math.round(Number(prodSalePrice) * 0.55) },
              { size: '3ML Roll On', price: Math.round(Number(prodPrice) * 0.3), salePrice: Math.round(Number(prodSalePrice) * 0.3) },
            ];
          } else if (prodSize.includes('50 ml')) {
            updatedVariants = [
              { size: '50ML Spray', price: Number(prodPrice), salePrice: Number(prodSalePrice) },
              { size: '10ML Travel Spray', price: Math.round(Number(prodPrice) * 0.25), salePrice: Math.round(Number(prodSalePrice) * 0.25) },
            ];
          } else {
            updatedVariants = [
              { size: prodSize, price: Number(prodPrice), salePrice: Number(prodSalePrice) }
            ];
          }

          return {
            ...p,
            name: prodName,
            tagline: prodTagline,
            price: Number(prodPrice),
            salePrice: Number(prodSalePrice),
            size: prodSize,
            longevity: prodLongevity,
            projection: prodProjection,
            description: prodDescription,
            story: prodStory,
            ingredients: formattedIngredients,
            destination: prodDestination,
            destinationState: prodDestinationState,
            image: prodImage,
            rating: Number(prodRating),
            category: prodCategory,
            galleryImages: prodGalleryImages,
            galleryTexts: prodGalleryTexts,
            productImages: prodProductImages,
            variants: updatedVariants.length > 0 ? updatedVariants : p.variants
          };
        }
        return p;
      }));
    }

    setIsEditingProduct(null);
  };

  // Delete product record securely from registry
  const handleProductDelete = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    if (productToDelete === productId) {
      setProductToDelete(null);
    }
  };

  // Update specific order's delivery status
  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status };
      }
      return o;
    }));
  };

  // Update specific order's consignment tracking code
  const handleUpdateOrderTracking = (orderId: string, code: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, trackingCode: code };
      }
      return o;
    }));
  };

  // Modify Founder's profile attributes
  const handleUpdateFounderDetails = (id: "vimal" | "aditya", fields: Partial<Founder>) => {
    setFounderDetails(prev => prev.map(f => {
      if (f.id === id) {
        return { ...f, ...fields };
      }
      return f;
    }));
  };

  const setFounderDetails = (setterFn: (prev: Founder[]) => Founder[]) => {
    setFounders(setterFn);
  };

  // Helper to update individual general site text fields
  const handleUpdateSiteSetting = (key: keyof SiteSettings, value: string) => {
    setSiteSettings(prev => ({ ...prev, [key]: value }));
  };

  // Helper to add discount coupon to the catalog
  const handleAddCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponErrorMsg("");
    const cleanedCode = newCouponCode.trim().toUpperCase();
    if (!cleanedCode) return;

    if (coupons.some(c => c.code === cleanedCode) || ["WAYFARER15", "WAYFARER20", "FREESHIP"].includes(cleanedCode)) {
      setCouponErrorMsg("This coupon code already exists (either as dynamic or standard fallbacks).");
      return;
    }

    const newCp: Coupon = {
      code: cleanedCode,
      discountPercent: Number(newCouponPercent)
    };

    setCoupons(prev => [newCp, ...prev]);
    setNewCouponCode("");
  };

  // Helper to remove discount coupon
  const handleDeleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2926]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-sand-50 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-sand-300">
        
        {/* Title bar / Header */}
        <div className="bg-[#2D2926] text-white px-6 py-5 flex items-center justify-between border-b border-sand-900">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-[#D4BC96]" />
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4BC96] font-mono block">
                ORGANIZATIONAL PORTAL SECURITIES
              </span>
              <h2 className="text-lg font-light font-display tracking-widest text-[#FAFAFA]">
                RUH IMPERIUM HQ CONTROL PANEL
              </h2>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-sand-300 hover:text-white focus:outline-none"
            id="hq-close-btn"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* NOT LOGGED IN TRIGGER - LOGIN ENTRY FORM */}
        {!isAdminLoggedIn ? (
          <div className="flex-1 flex flex-col justify-center items-center py-16 px-6 bg-white">
            <div className="max-w-md w-full bg-sand-50 rounded-2xl border border-sand-200 p-8 shadow-md">
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-[#2D2926] text-[#D4BC96] rounded-xl flex items-center justify-center mx-auto mb-4 border border-sand-900">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-light font-serif text-sand-900 tracking-wide">
                  Executive Headquarters
                </h3>
                <p className="text-xs text-sand-400 mt-1.5 leading-relaxed font-light">
                  Please authenticate with legal administrative credentials to authorize full database read and write actions.
                </p>
              </div>

              {loginError && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-lg font-medium text-center">
                  ⚠️ {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Administrative Email</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. administrator@ruhimperium.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-sand-200 rounded px-3 py-2.5 text-xs focus:ring-1 focus:ring-[#D4BC96] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Cipher Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter security digits"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-sand-200 rounded px-3 py-2.5 text-xs focus:ring-1 focus:ring-[#D4BC96] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3.5 bg-[#2D2926] hover:bg-[#D4BC96] text-[#FAFAFA] font-medium text-xs uppercase tracking-widest rounded transition-all cursor-pointer shadow-md"
                >
                  DE-ENCRYPT AND UNLOCK HQ
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* AUTHORIZED EXECUTIVE CONSOLE MODULES */
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row h-full">
            
            {/* Sidebar Tab Triggers */}
            <div className="w-full md:w-56 bg-sand-100 border-b md:border-b-0 md:border-r border-sand-200 p-4.5 space-y-2 flex flex-row md:flex-col shrink-0 flex-wrap justify-center sm:justify-start">
              
              <button
                type="button"
                onClick={() => { setActiveTab("products"); setIsEditingProduct(null); }}
                className={`w-full text-left flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all cursor-pointer ${
                  activeTab === "products"
                    ? "bg-[#2D2926] text-white border-sand-900 shadow-xs"
                    : "bg-transparent text-sand-600 hover:bg-sand-200/65 border-transparent"
                }`}
              >
                <Layers className="w-4 h-4 text-[#D4BC96]" />
                <span>Product Deck</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("collections"); setIsEditingProduct(null); }}
                className={`w-full text-left flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all cursor-pointer ${
                  activeTab === "collections"
                    ? "bg-[#2D2926] text-white border-sand-900 shadow-xs"
                    : "bg-transparent text-sand-600 hover:bg-sand-200/65 border-transparent"
                }`}
              >
                <Package className="w-4 h-4 text-[#D4BC96]" />
                <span>Collections Deck</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("orders"); setIsEditingProduct(null); }}
                className={`w-full text-left flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-[#2D2926] text-white border-sand-900 shadow-xs"
                    : "bg-transparent text-sand-600 hover:bg-sand-200/65 border-transparent"
                }`}
              >
                <Truck className="w-4 h-4 text-[#D4BC96]" />
                <span>Fulfillments ({orders.length})</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("brand"); setIsEditingProduct(null); }}
                className={`w-full text-left flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all cursor-pointer ${
                  activeTab === "brand"
                    ? "bg-[#2D2926] text-white border-sand-900 shadow-xs"
                    : "bg-transparent text-sand-600 hover:bg-sand-200/65 border-transparent"
                }`}
              >
                <ImageIcon className="w-4 h-4 text-[#D4BC96]" />
                <span>Brand Identity</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("content"); setIsEditingProduct(null); }}
                className={`w-full text-left flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all cursor-pointer ${
                  activeTab === "content"
                    ? "bg-[#2D2926] text-white border-sand-900 shadow-xs"
                    : "bg-transparent text-sand-600 hover:bg-sand-200/65 border-transparent"
                }`}
              >
                <FileText className="w-4 h-4 text-[#D4BC96]" />
                <span>Edit Site Content</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("coupons"); setIsEditingProduct(null); }}
                className={`w-full text-left flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all cursor-pointer ${
                  activeTab === "coupons"
                    ? "bg-[#2D2926] text-white border-sand-900 shadow-xs"
                    : "bg-transparent text-sand-600 hover:bg-sand-200/65 border-transparent"
                }`}
              >
                <Ticket className="w-4 h-4 text-[#D4BC96]" />
                <span>Active Coupons</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("reviews"); setIsEditingProduct(null); }}
                className={`w-full text-left flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all cursor-pointer ${
                  activeTab === "reviews"
                    ? "bg-[#2D2926] text-white border-sand-900 shadow-xs"
                    : "bg-transparent text-sand-600 hover:bg-sand-200/65 border-transparent"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-[#D4BC96]" />
                <span>Product Reviews ({reviews?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("admin-credentials"); setIsEditingProduct(null); }}
                className={`w-full text-left flex items-center space-x-2.5 px-3.5 py-3 rounded-xl text-xs uppercase tracking-widest font-mono border transition-all cursor-pointer ${
                  activeTab === "admin-credentials"
                    ? "bg-[#2D2926] text-white border-sand-900 shadow-xs"
                    : "bg-transparent text-sand-600 hover:bg-sand-200/65 border-transparent"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#D4BC96]" />
                <span>Admin Accounts</span>
              </button>

              <div className="hidden md:block pt-8 border-t border-sand-200 text-[10px] text-sand-400 leading-relaxed font-light font-mono">
                <p className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure Ledger Active</span>
                </p>
                <p className="mt-1 text-[8.5px] font-mono text-sand-500">Live persistence loaded from sandbox localStorage.</p>
              </div>

            </div>

            {/* Core Tab Screen View */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white flex flex-col justify-between">
              
              {/* TAB 1: PRODUCT CATALOG MANAGEMENT */}
              {activeTab === "products" && (
                <div className="space-y-6">
                  
                  {isEditingProduct === null ? (
                    <div>
                      {/* Products overview & launcher */}
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-xl font-light font-serif tracking-wide text-sand-900">
                            Bespoke Fragrance Database
                          </h3>
                          <p className="text-xs text-sand-400 font-light">
                            Add, refine, or sunset luxury biological scent catalog assets active in the webstore.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => openProductForm("new")}
                          className="px-4 py-2 bg-[#D4BC96] hover:bg-[#2D2926] text-white text-[10px] uppercase font-mono tracking-widest rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Perfume</span>
                        </button>
                      </div>

                      {/* Products Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {products.map(p => (
                          <div key={p.id} className="bg-sand-50 rounded-2xl border border-sand-200 p-4.5 flex gap-4 hover:shadow-xs transition-shadow">
                            <div className="w-18 h-22 rounded-xl overflow-hidden bg-sand-100 border border-sand-200 shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start">
                                  <h4 className="font-serif font-semibold text-sand-900 text-sm leading-none">{p.name}</h4>
                                  <div className="text-[10px] text-emerald-800 font-mono font-bold leading-none bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
                                    ₹{p.salePrice}
                                  </div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{p.tagline}</p>
                                <p className="text-[9px] uppercase tracking-widest text-[#D4BC96] font-mono mt-1">{p.size} Bottle • {p.destination}</p>
                              </div>

                              <div className="flex justify-end gap-2 border-t border-sand-200/50 pt-2.5 mt-2">
                                {productToDelete === p.id ? (
                                  <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg text-stone-800 animate-fadeIn">
                                    <span className="text-[10px] text-red-700 font-sans font-medium">Delete product?</span>
                                    <button
                                      type="button"
                                      onClick={() => handleProductDelete(p.id)}
                                      className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded text-[9px] uppercase tracking-wider cursor-pointer font-mono"
                                    >
                                      Yes
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setProductToDelete(null)}
                                      className="px-2 py-0.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold rounded text-[9px] uppercase tracking-wider cursor-pointer font-mono"
                                    >
                                      No
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => openProductForm(p)}
                                      className="p-1 px-2 hover:bg-[#D4BC96]/15 hover:text-[#D4BC96] text-sand-500 rounded flex items-center gap-1 text-[10.5px] font-mono uppercase cursor-pointer"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                      <span>Edit</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setProductToDelete(p.id)}
                                      className="p-1 px-2 hover:bg-red-50 hover:text-red-600 text-sand-400 rounded flex items-center gap-1 text-[10.5px] font-mono uppercase cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Delete</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* PRODUCT ADDING/EDITING SUB-FORM MODULE */
                    <form onSubmit={handleProductSaveSubmit} className="space-y-6 md:space-y-8">
                      <div className="flex justify-between items-center border-b border-sand-200 pb-3">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4BC96] font-semibold">
                          {isEditingProduct === "new" ? "DRAFT MODULATOR: NEW SCENT" : `RE-ARCHITECTING PROFILE: ${prodName}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsEditingProduct(null)}
                          className="text-xs uppercase tracking-widest font-mono text-sand-400 hover:text-sand-800"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
                        
                        {/* Title and tagline */}
                        <div className="md:col-span-6">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Fragrance Name</label>
                          <input
                            type="text"
                            required
                            placeholder="E.g. Saffron Whispers"
                            value={prodName}
                            onChange={(e) => setProdName(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        <div className="md:col-span-6">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Olfactory Tagline</label>
                          <input
                            type="text"
                            required
                            placeholder="E.g. Crimson Saffron & Smoked Oud"
                            value={prodTagline}
                            onChange={(e) => setProdTagline(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        {/* Pricing details */}
                        <div className="md:col-span-3">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Normal Rate (INR)</label>
                          <input
                            type="number"
                            required
                            value={prodPrice}
                            onChange={(e) => setProdPrice(Number(e.target.value))}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded font-mono focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Sale Offer Rate (INR)</label>
                          <input
                            type="number"
                            required
                            value={prodSalePrice}
                            onChange={(e) => setProdSalePrice(Number(e.target.value))}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded font-mono focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        {/* Size configuration */}
                        <div className="md:col-span-3">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Core Size Volume</label>
                          <input
                            type="text"
                            required
                            placeholder="E.g. 50 ml"
                            value={prodSize}
                            onChange={(e) => setProdSize(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Mock Rating</label>
                          <input
                            type="number"
                            step="0.1"
                            min="1.0"
                            max="5.0"
                            value={prodRating}
                            onChange={(e) => setProdRating(Number(e.target.value))}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded font-mono focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        {/* Scent parameters (Longevity & Projection) */}
                        <div className="md:col-span-6">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Sillage Longevity</label>
                          <input
                            type="text"
                            placeholder="E.g. Beast Mode (12-14 hours)"
                            value={prodLongevity}
                            onChange={(e) => setProdLongevity(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        <div className="md:col-span-6">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Olfactory Projection</label>
                          <input
                            type="text"
                            placeholder="E.g. Strong room-filling trail"
                            value={prodProjection}
                            onChange={(e) => setProdProjection(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        {/* Sourcing Territories */}
                        <div className="md:col-span-6">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Sourcing Destination</label>
                          <input
                            type="text"
                            placeholder="E.g. Srinagar, Kashmir"
                            value={prodDestination}
                            onChange={(e) => setProdDestination(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        <div className="md:col-span-6">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Sourcing State Code Name</label>
                          <input
                            type="text"
                            placeholder="E.g. Jammu & Kashmir"
                            value={prodDestinationState}
                            onChange={(e) => setProdDestinationState(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        {/* Associated Olfactory Collection */}
                        <div className="md:col-span-12">
                          <label className="text-[9.5px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1 font-semibold">Associated Olfactory Collection (Group)</label>
                          <select
                            value={prodCategory}
                            onChange={(e) => setProdCategory(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none font-medium text-stone-800"
                          >
                            {collections.map(col => (
                              <option key={col.id} value={col.id}>
                                {col.name} ({col.id})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Ingredients */}
                        <div className="md:col-span-12">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Active Botanicals list (comma-separated)</label>
                          <input
                            type="text"
                            placeholder="Kashmiri Saffron, Dark Vanilla Pods, Mysore Sandalwood Oil"
                            value={prodIngredients}
                            onChange={(e) => setProdIngredients(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-12">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Excursion Description</label>
                          <textarea
                            rows={2}
                            placeholder="A brief editorial review on sensory experience notes..."
                            value={prodDescription}
                            onChange={(e) => setProdDescription(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-3 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        <div className="md:col-span-12">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1">Artisan Scent Sourcing Travel Diary Story</label>
                          <textarea
                            rows={3}
                            placeholder="The deep travel exploration narrative of how our team treks down local rivers/hills to procure biological yields..."
                            value={prodStory}
                            onChange={(e) => setProdStory(e.target.value)}
                            className="w-full bg-sand-50 border border-sand-200 p-3 text-xs rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>

                        {/* File Upload Device Photo input */}
                        <div className="md:col-span-12">
                          <label className="text-[9.5px] uppercase tracking-widest text-sand-500 font-mono block mb-1.5">Upload Perfume Glass Photo</label>
                          <div className="flex flex-col sm:flex-row gap-4 items-center bg-sand-100/50 p-4 rounded-xl border border-dashed border-sand-300">
                            <div className="w-20 h-24 rounded-lg bg-white overflow-hidden border border-sand-200 flex items-center justify-center relative shrink-0">
                              {prodImage ? (
                                <img src={prodImage} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-6 h-6 text-sand-300" />
                              )}
                            </div>
                            
                            <div className="flex-1 text-center sm:text-left">
                              <p className="text-xs font-medium text-sand-700">Select bottle image directly from device file system</p>
                              <p className="text-[10px] text-sand-400 mt-1 font-light">Supports JPEG, JPG, and PNG files. Instant compression is applied.</p>
                              
                              <input
                                type="file"
                                accept="image/*"
                                ref={prodImgInputRef}
                                onChange={(e) => handleFileChange(e, setProdImage)}
                                className="hidden"
                              />

                              <button
                                type="button"
                                onClick={() => prodImgInputRef.current?.click()}
                                className="mt-2.5 px-3.5 py-2 bg-white hover:bg-sand-100 text-sand-700 text-[10px] uppercase font-mono tracking-wider border border-sand-300 rounded flex items-center gap-1.5 mx-auto sm:mx-0 cursor-pointer"
                              >
                                <Upload className="w-3.5 h-3.5 text-[#D4BC96]" />
                                <span>Choose Device File</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Additional 4 Product Photos for Swipeable Carousel */}
                        <div className="md:col-span-12 mt-4 bg-sand-50 border border-sand-200 rounded-xl p-4">
                          <label className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1 font-semibold">
                            ADDITIONAL PRODUCT PHOTOS (FOR SWIPEABLE COVER CAROUSEL - UP TO 4 SLOTS)
                          </label>
                          <p className="text-[10.5px] text-sand-500 mb-3 font-light leading-relaxed">
                            Upload up to 4 additional product photos. When customers click/view this scent, they can swipe through your primary glass photo and these additional images in an elegant swipeable photo carousel!
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {Array.from({ length: 4 }).map((_, idx) => {
                              const pImgVal = prodProductImages?.[idx] || "";
                              return (
                                <div key={idx} className="bg-white border border-sand-200 rounded-lg p-2.5 flex flex-col items-center justify-between shadow-xs">
                                  <span className="text-[8.5px] font-mono text-sand-400 block mb-1">
                                    Slide Photo #{idx + 1}
                                  </span>

                                  <div className="w-full h-20 bg-sand-50 rounded-md overflow-hidden border border-sand-200/60 flex items-center justify-center relative">
                                    {pImgVal ? (
                                      <>
                                        <img src={pImgVal} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setProdProductImages(prev => {
                                              const updated = [...prev];
                                              updated[idx] = "";
                                              return updated;
                                            });
                                          }}
                                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 hover:scale-105 shadow cursor-pointer"
                                          title="Remove photo"
                                        >
                                          <X className="w-2 h-2" />
                                        </button>
                                      </>
                                    ) : (
                                      <ImageIcon className="w-4 h-4 text-sand-300" />
                                    )}
                                  </div>

                                  <div className="w-full mt-2">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id={`prod-image-file-${idx}`}
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          compressAndEncodeBase64(file, (compressedBase64) => {
                                            setProdProductImages(prev => {
                                              const updated = [...prev];
                                              updated[idx] = compressedBase64;
                                              return updated;
                                            });
                                          });
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => document.getElementById(`prod-image-file-${idx}`)?.click()}
                                      className="w-full py-1 bg-white hover:bg-sand-100 text-sand-700 text-[8px] uppercase font-mono tracking-wider rounded border border-sand-200 flex items-center justify-center gap-1 cursor-pointer transition-all shadow-2xs"
                                    >
                                      <Upload className="w-2 h-2 text-[#D4BC96]" />
                                      <span>{pImgVal ? "Replace" : "Upload"}</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* 5 Product Visual cards (Gallery) */}
                        <div className="md:col-span-12 mt-5">
                          <label className="text-[10px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1.5 font-semibold">
                            PERMANENT HIGH-AESTHETICS MOODBOARD CARDS (5 PHOTO SLOTS WITH CUSTOM TEXT)
                          </label>
                          <p className="text-[10.5px] text-sand-500 mb-4 font-light leading-relaxed">
                            Upload up to 5 perspective or layout photos for this SKU. For each card slot, you can edit the custom Title and Description directly. If left blank, they will automatically default to our signature brand texts (e.g. "I. Extraction", "Alembic distillation") in the customer product modal.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {Array.from({ length: 5 }).map((_, idx) => {
                              const imgVal = prodGalleryImages[idx] || "";
                              return (
                                <div key={idx} className="bg-sand-50/50 border border-sand-200 rounded-xl p-3 flex flex-col justify-between shadow-xs relative space-y-3.5">
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-[8.5px] font-mono text-sand-400 font-bold bg-white/80 px-1.5 py-0.5 rounded border border-sand-100/55">
                                        Card #{idx + 1}
                                      </span>
                                    </div>
                                    
                                    <div className="w-full h-24 bg-white rounded-lg overflow-hidden border border-sand-200/60 flex items-center justify-center relative">
                                      {imgVal ? (
                                        <>
                                          <img src={imgVal} alt={`Card ${idx + 1}`} className="w-full h-full object-cover" />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setProdGalleryImages(prev => {
                                                const updated = [...prev];
                                                updated[idx] = "";
                                                return updated;
                                              });
                                            }}
                                            className="absolute top-1 right-1 bg-red-600/95 text-white rounded-full p-1 hover:bg-red-700 hover:scale-110 shadow transition cursor-pointer"
                                            title="Remove photo"
                                          >
                                            <X className="w-2.5 h-2.5" />
                                          </button>
                                        </>
                                      ) : (
                                        <ImageIcon className="w-5 h-5 text-sand-300" />
                                      )}
                                    </div>

                                    <div className="w-full mt-2">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        id={`gallery-file-${idx}`}
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            compressAndEncodeBase64(file, (compressedBase64) => {
                                              setProdGalleryImages(prev => {
                                                const updated = [...prev];
                                                updated[idx] = compressedBase64;
                                                return updated;
                                              });
                                            });
                                          }
                                        }}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => document.getElementById(`gallery-file-${idx}`)?.click()}
                                        className="w-full py-1.5 bg-white hover:bg-sand-100 text-sand-700 text-[9px] uppercase font-mono tracking-wider rounded border border-sand-200 flex items-center justify-center gap-1 cursor-pointer transition-all shadow-2xs"
                                      >
                                        <Upload className="w-2.5 h-2.5 text-[#D4BC96]" />
                                        <span>{imgVal ? "Replace" : "Upload Photo"}</span>
                                      </button>
                                    </div>
                                  </div>

                                  {/* Title & Description Edit fields */}
                                  <div className="space-y-1.5 pt-2 border-t border-sand-110">
                                    <div>
                                      <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-0.5">Card Title</label>
                                      <input
                                        type="text"
                                        placeholder="E.g., I. Extraction"
                                        value={prodGalleryTexts[idx]?.title || ""}
                                        onChange={(e) => {
                                          setProdGalleryTexts(prev => {
                                            const updated = [...prev];
                                            updated[idx] = { ...updated[idx], title: e.target.value };
                                            return updated;
                                          });
                                        }}
                                        className="w-full bg-white border border-sand-200 p-1.5 text-[10px] rounded outline-none focus:border-sand-400 font-medium"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-0.5">Card Caption</label>
                                      <textarea
                                        rows={2}
                                        placeholder="E.g., Alembic distillation"
                                        value={prodGalleryTexts[idx]?.desc || ""}
                                        onChange={(e) => {
                                          setProdGalleryTexts(prev => {
                                            const updated = [...prev];
                                            updated[idx] = { ...updated[idx], desc: e.target.value };
                                            return updated;
                                          });
                                        }}
                                        className="w-full bg-white border border-sand-200 p-1.5 text-[9.5px] rounded outline-none focus:border-sand-400 leading-normal"
                                      />
                                    </div>
                                  </div>

                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>

                      <div className="pt-4 border-t border-sand-200 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsEditingProduct(null)}
                          className="px-5 py-2.5 border border-sand-300 text-sand-600 rounded text-xs font-mono tracking-widest uppercase hover:bg-sand-100 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#2D2926] hover:bg-[#D4BC96] text-white rounded text-xs font-mono tracking-widest uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Scent Profile</span>
                        </button>
                      </div>

                    </form>
                  )}

                </div>
              )}

              {/* TAB 2: ORDER OPERATIONS & DELIVERIES STATUS UPDATES */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="text-xl font-light font-serif tracking-wide text-sand-900">
                      Consignment Operations Office
                    </h3>
                    <p className="text-xs text-sand-400 font-light">
                      Check user purchases logged via secure checkout forms, update delivery status progress lines, and inject speed courier tracking codes.
                    </p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-sand-50 rounded-2xl border border-dashed border-sand-300 p-12 text-center">
                      <Package className="w-10 h-10 text-sand-300 stroke-[1.25] mx-auto mb-3" />
                      <h4 className="text-sm font-serif font-semibold text-sand-700">No Orders in Suite Yet</h4>
                      <p className="text-xs text-sand-400 font-light mt-1 max-w-xs mx-auto">
                        Once consumers purchase scents from the Olfactory Cart, their cryptographic orders logs automatically seed right here!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {orders.map((o) => (
                        <div key={o.id} className="bg-sand-50/50 rounded-2xl border border-sand-200 p-5 shadow-xs">
                          
                          {/* Header of order */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-sand-200/50 pb-3 mb-3.5">
                            
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold font-mono tracking-wider text-sand-900 bg-sand-200 px-2 py-0.5 rounded">{o.id}</span>
                                <span className="text-[10px] text-sand-400 font-mono">{o.date}</span>
                              </div>
                              <p className="text-xs font-semibold text-sand-700 mt-1 flex items-center gap-1">
                                <span>Wayfarer: {o.fullName}</span>
                                <span className="font-light text-[10.5px] text-sand-500">({o.phone} • {o.email})</span>
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                              {/* Active status dropdown */}
                              <div>
                                <label className="text-[7.5px] uppercase tracking-widest text-sand-400 font-mono block mb-0.5">Delivery status code</label>
                                <select
                                  value={o.status || "Processing"}
                                  onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                                  className={`text-[10.5px] font-mono uppercase bg-white border border-sand-300 px-2.5 py-1.5 rounded-lg font-bold outline-none cursor-pointer focus:ring-1 focus:ring-[#D4BC96] ${
                                    o.status === "Delivered" ? "text-green-700 border-green-200 bg-green-50/40" :
                                    o.status === "Dispatched" ? "text-indigo-700 border-indigo-200 bg-indigo-50/40" :
                                    o.status === "In Transit" ? "text-amber-700 border-amber-200 bg-amber-50/40" :
                                    o.status === "Out for Delivery" ? "text-purple-700 border-purple-200 bg-purple-50/40" :
                                    o.status === "Cancelled" ? "text-red-700 border-red-200 bg-red-50/40" :
                                    "text-sand-850 border-sand-300"
                                  }`}
                                >
                                  <option value="Processing">Processing</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="In Transit">In Transit</option>
                                  <option value="Out for Delivery">Out for Delivery</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </div>

                              {/* Amount */}
                              <div className="text-right">
                                <span className="text-[7.5px] uppercase tracking-widest text-sand-400 block">Total Due</span>
                                <span className="text-xs font-mono font-bold text-sand-900">₹{o.total}</span>
                              </div>

                            </div>
                          </div>

                          {/* Order items details */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-8 bg-white/70 rounded-xl p-3 border border-sand-150 text-[11px] space-y-1">
                              <span className="text-[8px] uppercase tracking-widest text-[#D4BC96] font-semibold block mb-1">COMPILATION ITEMS LOG</span>
                              {o.items.map((item, id) => {
                                const selectedVariant = item.product.variants?.find(v => 
                                  v.size === item.selectedSize ||
                                  v.size.toLowerCase().replace(/\s+/g, '') === item.selectedSize.toLowerCase().replace(/\s+/g, '') ||
                                  (item.selectedSize === "50 ml" && v.size === "50ML Spray") ||
                                  (item.selectedSize === "12 ml" && v.size === "12ML Roll On")
                                );
                                const activePrice = selectedVariant ? selectedVariant.salePrice : item.product.salePrice;
                                return (
                                  <div key={id} className="flex justify-between font-mono text-sand-700">
                                    <span>{item.product.name} ({item.selectedSize}) x {item.quantity}</span>
                                    <span className="text-sand-600 font-sans">₹{activePrice} each</span>
                                  </div>
                                );
                              })}
                              
                              <div className="border-t border-sand-100 pt-2.5 mt-2.5">
                                <span className="text-[8px] uppercase tracking-widest text-sand-400 block">DELIVERY DROPOFF COÖRDINATES</span>
                                <p className="text-xs font-light text-sand-600 font-sans leading-tight mt-0.5">{o.address}, PIN {o.pincode} • Pay Mode: <span className="font-mono bg-sand-200 px-1 py-0.2 ml-1 text-[10px] rounded">{o.paymentMode}</span></p>
                              </div>
                            </div>

                            {/* Consignment tracking details */}
                            <div className="md:col-span-4 bg-[#D4BC96]/5 rounded-xl p-3 border border-[#D4BC96]/20 flex flex-col justify-between">
                              <div>
                                <span className="text-[8px] uppercase tracking-widest text-[#D4BC96] font-bold block mb-1">AIR COURIER WAYBILL CODE</span>
                                <p className="text-[9.5px] text-sand-400 font-light leading-tight">Edit and share tracking code below so the buyer can trace live dispatch transit vectors in real-time.</p>
                              </div>

                              <div className="mt-2.5">
                                <input
                                  type="text"
                                  placeholder="RP-XXXXX-IN"
                                  value={o.trackingCode || ""}
                                  onChange={(e) => handleUpdateOrderTracking(o.id, e.target.value.toUpperCase())}
                                  className="w-full bg-white border border-[#D4BC96]/30 rounded px-2 py-1.5 text-xs text-center font-mono font-bold uppercase select-all tracking-wider focus:outline-none focus:ring-1 focus:ring-[#D4BC96]"
                                />
                              </div>
                            </div>

                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* TAB 3: BRAND PROFILE, FOUNDERS BIO & COVER PORTRAITS */}
              {activeTab === "brand" && (
                <div className="space-y-8">
                  
                  <div>
                    <h3 className="text-xl font-light font-serif tracking-wide text-sand-900">
                      Editorial Brand Assets Manager
                    </h3>
                    <p className="text-xs text-sand-400 font-light">
                      Modulate corporate assets directly. Customize the primary Home Slider Cover photo, rewrite Founder biographies, and upload leadership portraits.
                    </p>
                  </div>

                  {/* BRAND SIGNATURE LOGO UPLOAD & EDITOR */}
                  <div className="bg-sand-50 rounded-2xl border border-sand-200 p-5 space-y-4">
                    <div className="flex items-center gap-2 text-[#D4BC96]">
                      <span className="text-sm">✨</span>
                      <span className="text-xs font-bold font-mono uppercase tracking-widest">Primary Signature Brand Logo</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 items-center bg-white p-4 rounded-xl border border-sand-200">
                      <div className="w-32 h-20 rounded-lg overflow-hidden bg-stone-900 flex items-center justify-center p-2 relative shrink-0 border border-sand-300">
                        {siteSettings.customLogoUrl ? (
                          <img src={siteSettings.customLogoUrl} alt="Custom Logo Preview" className="max-h-full max-w-full object-contain" />
                        ) : (
                          <span className="text-[10px] text-stone-400 font-mono text-center px-1">Classical Royal SVG Logo (Default)</span>
                        )}
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-xs font-semibold text-sand-800">Upload custom logo directly from your device</p>
                        <p className="text-[10px] text-sand-400 font-light mt-0.5 leading-snug">This overrides the Royal "RUH" vapor flame SVG monogram with your own premium image branding across header, footer, and loading screen.</p>
                        
                        <input
                          type="file"
                          accept="image/*"
                          ref={logoInputRef}
                          onChange={(e) => {
                            handleFileChange(e, (base64) => {
                              setSiteSettings(prev => ({
                                ...prev,
                                customLogoUrl: base64
                              }));
                            });
                          }}
                          className="hidden"
                        />

                        <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                          <button
                            type="button"
                            onClick={() => logoInputRef.current?.click()}
                            className="px-3.5 py-2 bg-[#2D2926] hover:bg-[#D4BC96] text-white text-[10px] uppercase font-mono tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Custom Logo</span>
                          </button>

                          {siteSettings.customLogoUrl && (
                            <button
                              type="button"
                              onClick={() => {
                                setSiteSettings(prev => {
                                  const updated = { ...prev };
                                  delete updated.customLogoUrl;
                                  return updated;
                                });
                              }}
                              className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] uppercase font-mono tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5 animate-pulse" />
                              <span>Reset to Default</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* COVER PHOTO EDITING */}
                  <div className="bg-sand-50 rounded-2xl border border-sand-200 p-5 space-y-4">
                    <div className="flex items-center gap-2 text-[#D4BC96]">
                      <ImageIcon className="w-5 h-5" />
                      <span className="text-xs font-bold font-mono uppercase tracking-widest">Main Landing Cover Banner</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 items-center bg-white p-4 rounded-xl border border-sand-200">
                      <div className="w-32 h-20 rounded-lg overflow-hidden bg-sand-100 border relative shrink-0">
                        <img src={coverPhoto} alt="Current Cover Preview" className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-xs font-semibold text-sand-800">Select Banner background directly from device</p>
                        <p className="text-[10px] text-sand-400 font-light mt-0.5 leading-snug">This overrides the premium hero graphic on the top of our homepage, with full atmospheric gradients maintained.</p>
                        
                        <input
                          type="file"
                          accept="image/*"
                          ref={mainCoverInputRef}
                          onChange={(e) => handleFileChange(e, setCoverPhoto)}
                          className="hidden"
                        />

                        <button
                          type="button"
                          onClick={() => mainCoverInputRef.current?.click()}
                          className="mt-3 px-4 py-2 bg-[#2D2926] hover:bg-[#D4BC96] text-white text-[10px] uppercase font-mono tracking-wider rounded-lg flex items-center gap-1.5 mx-auto sm:mx-0 cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Swap Cover Photo</span>
                        </button>
                      </div>
                    </div>
                  </div>

                   {/* HERO VIDEO EDITING */}
                   <div className="bg-sand-50 rounded-2xl border border-sand-200 p-5 space-y-4">
                     <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-100 pb-2">
                       <div className="flex items-center gap-2 text-[#D4BC96]">
                         <span className="text-sm">🎬</span>
                         <span className="text-xs font-bold font-mono uppercase tracking-widest">Main Landing Ambient Background Video</span>
                       </div>
                       <div className="flex items-center gap-1 bg-emerald-50 text-emerald-750 text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-200">
                         <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                         <span>Real-Time Live Auto-Fetch Active</span>
                       </div>
                     </div>

                    <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3">
                      <div>
                        <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Direct Video URL (`.mp4` / `.webm` etc.)</label>
                        <input
                          type="url"
                          placeholder="Enter direct MP4 URL..."
                          value={heroVideoUrl}
                          onChange={(e) => setHeroVideoUrl(e.target.value)}
                          className="w-full bg-sand-50 border border-sand-200 rounded-lg px-4 py-2.5 text-xs text-sand-800 outline-none focus:border-[#D4BC96] transition-all"
                        />
                      </div>

                      {/* Direct File Upload Option */}
                      <div className="pt-1.5 pb-1 border-t border-dashed border-sand-200">
                        <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1.5">Or Direct Video File Upload</label>
                        <div className="flex flex-wrap items-center gap-3">
                          <input
                            type="file"
                            accept="video/*"
                            id="hero-video-upload-direct"
                            className="hidden"
                            disabled={isUploadingVideo}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setIsUploadingVideo(true);
                                try {
                                  const storageRef = ref(storage, `videos/hero-video-${Date.now()}-${file.name}`);
                                  await uploadBytes(storageRef, file);
                                  const downloadUrl = await getDownloadURL(storageRef);
                                  setHeroVideoUrl(downloadUrl);
                                  alert(`Scent film file "${file.name}" uploaded to server and broadcasting successfully! All customers will now see this video live in the ambient background.`);
                                } catch (err: any) {
                                  console.error("Upload error:", err);
                                  if (err.message.includes("permission") || err.message.includes("does not exist")) {
                                    alert(`Failed to upload: You must enable "Storage" in your Firebase Console first! Click "Storage" on the left menu in Firebase, then click "Get Started" and choose "Start in test mode".`);
                                  } else {
                                    alert(`Failed to upload scent film: ${err.message}`);
                                  }
                                } finally {
                                  setIsUploadingVideo(false);
                                }
                              }
                            }}
                          />
                        <label
                          htmlFor={isUploadingVideo ? undefined : "hero-video-upload-direct"}
                          className={`px-4 py-2.5 rounded-lg cursor-pointer transition-all inline-flex items-center gap-2 border shadow-xs text-white font-mono text-[9.5px] uppercase tracking-wider ${
                            isUploadingVideo
                              ? "bg-stone-400 border-stone-400 cursor-not-allowed opacity-70 animate-pulse"
                              : "bg-[#2D2926] hover:bg-gold-600 border-black"
                          }`}
                        >
                          {isUploadingVideo ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>Uploading Scent Film...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-4.5 h-4.5 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                              <span>Choose Scent Film File</span>
                            </>
                          )}
                        </label>
                        {heroVideoUrl.startsWith("/uploads/") && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-[9.5px] text-emerald-700 font-mono font-medium uppercase tracking-wider">
                              Server Uploaded Scent Film Active
                            </span>
                          </div>
                        )}
                        {heroVideoUrl.startsWith("data:") && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-[9.5px] text-emerald-700 font-mono font-medium uppercase tracking-wider">
                              Synchronized Inline base64 Video Active
                            </span>
                          </div>
                        )}
                        {heroVideoUrl.startsWith("blob:") && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                            <span className="text-[9.5px] text-amber-700 font-mono font-medium uppercase tracking-wider">
                              Unsaved Blob (Local Only)
                            </span>
                          </div>
                        )}
                        </div>
                      </div>

                      <p className="text-[10px] text-[#2D2926] font-medium leading-snug">
                        The video plays in an elegant loop behind the hero heading to capture the luxury, tactile warm vibe (e.g. traditional rose/sandalwood distillation, vapor steam rise, flowing rivers). Falls back gracefully to the Selected Cover Photo if cleared or offline.
                      </p>
                      
                      {/* Presets and quick selects */}
                      <div className="pt-2.5 border-t border-sand-100">
                        <span className="text-[9px] uppercase tracking-widest font-mono text-sand-400 block mb-2">Luxury Brand Video Presets:</span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { name: "Scent Rose & Flacon", url: "https://assets.mixkit.co/videos/preview/mixkit-perfume-bottle-with-a-rose-on-a-surface-41584-large.mp4" },
                            { name: "Mystic Steaming Vapor", url: "https://assets.mixkit.co/videos/preview/mixkit-vapor-from-a-hot-beverage-42289-large.mp4" },
                            { name: "Western Ghats Misty River", url: "https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf186213cefada19cfcaf004602f37c37fa9b2&profile_id=165&oauth2_token_id=57447761" },
                            { name: "Misty Mountain Peaks", url: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27d349eeaf0ac6aa0cb7034cf3fe6ab36402422&profile_id=165&oauth2_token_id=57447761" }
                          ].map((preset) => (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() => setHeroVideoUrl(preset.url)}
                              className={`px-3 py-1.5 rounded text-[9px] border font-mono transition-all uppercase tracking-wider cursor-pointer ${
                                heroVideoUrl === preset.url
                                  ? "bg-[#2D2926] text-white border-black"
                                  : "bg-sand-50/50 text-sand-600 border-sand-200 hover:border-sand-450"
                              }`}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FOUNDERS MANAGEMENT */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-[#D4BC96] border-b border-sand-200 pb-2">
                      <UserCheck className="w-5 h-5" />
                      <span className="text-xs font-bold font-mono uppercase tracking-widest">Leadership Profile Registrations</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {founders.map((fnd) => {
                        const fileInputRef = fnd.id === "vimal" ? founderVimalInputRef : founderAdityaInputRef;

                        return (
                          <div key={fnd.id} className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4">
                            <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#D4BC96] bg-gold-50 border border-gold-200/50 px-2.5 py-1 rounded">
                              {fnd.id === "vimal" ? "FOUNDER DATA BLOCK" : "CO-FOUNDER DATA BLOCK"}
                            </span>

                            <div className="space-y-3">
                              <div>
                                <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Executive Name</label>
                                <input
                                  type="text"
                                  value={fnd.name}
                                  onChange={(e) => handleUpdateFounderDetails(fnd.id, { name: e.target.value })}
                                  className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                                />
                              </div>

                              <div>
                                <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Corporate Role Title</label>
                                <input
                                  type="text"
                                  value={fnd.role}
                                  onChange={(e) => handleUpdateFounderDetails(fnd.id, { role: e.target.value.toUpperCase() })}
                                  className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 font-mono uppercase focus:ring-1 focus:ring-[#D4BC96] outline-none"
                                />
                              </div>

                              <div>
                                <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Biological Story / Bio Text</label>
                                <textarea
                                  rows={3}
                                  value={fnd.bio}
                                  onChange={(e) => handleUpdateFounderDetails(fnd.id, { bio: e.target.value })}
                                  className="w-full bg-white border border-sand-200 p-3 text-xs rounded text-sand-600 leading-relaxed focus:ring-1 focus:ring-[#D4BC96] outline-none"
                                />
                              </div>

                              {/* Founders socials inputs */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                  <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">LinkedIn Profile</label>
                                  <input
                                    type="text"
                                    placeholder="https://linkedin.com/in/username"
                                    value={fnd.linkedin || ""}
                                    onChange={(e) => handleUpdateFounderDetails(fnd.id, { linkedin: e.target.value })}
                                    className="w-full bg-white border border-sand-200 p-2 text-[10px] rounded text-sand-700 outline-none focus:ring-1 focus:ring-[#D4BC96]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Instagram Profile</label>
                                  <input
                                    type="text"
                                    placeholder="https://instagram.com/username"
                                    value={fnd.instagram || ""}
                                    onChange={(e) => handleUpdateFounderDetails(fnd.id, { instagram: e.target.value })}
                                    className="w-full bg-white border border-sand-200 p-2 text-[10px] rounded text-sand-700 outline-none focus:ring-1 focus:ring-[#D4BC96]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Twitter Profile</label>
                                  <input
                                    type="text"
                                    placeholder="https://twitter.com/username"
                                    value={fnd.twitter || ""}
                                    onChange={(e) => handleUpdateFounderDetails(fnd.id, { twitter: e.target.value })}
                                    className="w-full bg-white border border-sand-200 p-2 text-[10px] rounded text-sand-700 outline-none focus:ring-1 focus:ring-[#D4BC96]"
                                  />
                                </div>
                              </div>

                              {/* Leader Photo device selector */}
                              <div className="space-y-3">
                                <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Leadership Portrait Photo (Direct Upload/URL)</label>
                                <div className="flex gap-4 items-center bg-white p-3 rounded-lg border border-sand-200">
                                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-sand-100 border relative shrink-0">
                                    <img src={fnd.image} alt={fnd.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-[10px] text-sand-400 font-light font-sans">Swap image uploaded directly from device storage.</p>
                                    
                                    <input
                                      type="file"
                                      accept="image/*"
                                      ref={fileInputRef}
                                      onChange={(e) => handleFileChange(e, (base64) => handleUpdateFounderDetails(fnd.id, { image: base64 }))}
                                      className="hidden"
                                    />

                                    <button
                                      type="button"
                                      onClick={() => fileInputRef.current?.click()}
                                      className="mt-1.5 px-3 py-1.5 bg-sand-50 hover:bg-sand-150 border border-sand-300 text-[9px] uppercase font-mono tracking-wider rounded cursor-pointer text-sand-700 flex items-center gap-1"
                                    >
                                      <Upload className="w-3 h-3 text-[#D4BC96]" />
                                      <span>Swap portrait</span>
                                    </button>
                                  </div>
                                </div>
                                <div className="space-y-1 mt-2">
                                  <label className="text-[7.5px] uppercase tracking-widest text-sand-400 font-mono block">Or paste Portrait Image URL directly</label>
                                  <input
                                    type="text"
                                    placeholder="https://images.unsplash.com/photo-..."
                                    value={fnd.image.startsWith("data:") ? "" : fnd.image}
                                    onChange={(e) => {
                                      if (e.target.value.trim()) {
                                        handleUpdateFounderDetails(fnd.id, { image: e.target.value.trim() });
                                      }
                                    }}
                                    className="w-full bg-white border border-sand-200 p-2 text-[10px] rounded text-sand-700 outline-none focus:ring-1 focus:ring-[#D4BC96]"
                                  />
                                </div>
                              </div>

                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: GENERAL WEB TEXT & CONTACT CONTENT */}
              {activeTab === "content" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-light font-serif tracking-wide text-sand-900">
                      General Web Text & Coordinates Editor
                    </h3>
                    <p className="text-xs text-sand-400 font-light">
                      Modify all the written content across the homepage, contact parameters, and footer details dynamically.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Contact Settings */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">1. Store Coordinates</div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Assistance Contact Telephone Number</label>
                          <input
                            type="text"
                            value={siteSettings.contactPhone}
                            onChange={(e) => handleUpdateSiteSetting("contactPhone", e.target.value)}
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Assistance Scent Email Address</label>
                          <input
                            type="email"
                            value={siteSettings.contactEmail}
                            onChange={(e) => handleUpdateSiteSetting("contactEmail", e.target.value)}
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Company Headquarters / Store Address</label>
                          <textarea
                            rows={2}
                            value={siteSettings.contactAddress}
                            onChange={(e) => handleUpdateSiteSetting("contactAddress", e.target.value)}
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* About details */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">2. Footer Branding Description</div>
                      <div>
                        <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Footer About Text</label>
                        <textarea
                          rows={6}
                          value={siteSettings.footerAbout}
                          onChange={(e) => handleUpdateSiteSetting("footerAbout", e.target.value)}
                          className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Hero Landing Text */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4 md:col-span-2">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">3. Home Hero Landing Block</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Hero Subtitle Tagline</label>
                          <input
                            type="text"
                            value={siteSettings.heroTagline}
                            onChange={(e) => handleUpdateSiteSetting("heroTagline", e.target.value)}
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Hero Main Large Headline</label>
                          <input
                            type="text"
                            value={siteSettings.heroHeadline}
                            onChange={(e) => handleUpdateSiteSetting("heroHeadline", e.target.value)}
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Hero Description Paragraph Text</label>
                          <textarea
                            rows={3}
                            value={siteSettings.heroDescription}
                            onChange={(e) => handleUpdateSiteSetting("heroDescription", e.target.value)}
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-600 focus:ring-1 focus:ring-[#D4BC96] outline-none leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* USP and Founders text headings */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4 md:col-span-2">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">4. Brand Section Narrative Overrides</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">"Why Choose" Section Title</label>
                          <input
                            type="text"
                            value={siteSettings.whyChooseHeading}
                            onChange={(e) => handleUpdateSiteSetting("whyChooseHeading", e.target.value)}
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">"Why Choose" Subtext Statement</label>
                          <input
                            type="text"
                            value={siteSettings.whyChooseSub}
                            onChange={(e) => handleUpdateSiteSetting("whyChooseSub", e.target.value)}
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Founders Section Heading</label>
                          <input
                            type="text"
                            value={siteSettings.foundersHeading}
                            onChange={(e) => handleUpdateSiteSetting("foundersHeading", e.target.value)}
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Founders Sourcing Story Text</label>
                          <textarea
                            rows={3}
                            value={siteSettings.foundersText}
                            onChange={(e) => handleUpdateSiteSetting("foundersText", e.target.value)}
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-[#2D2926] focus:ring-1 focus:ring-[#D4BC96] outline-none leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ====== NEW CMS EDITORS ====== */}
                    {/* ====== 1. UPPER PROMO ANNOUNCEMENT BAR ====== */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4 md:col-span-2">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">1-B. Top Promo Announcement Bar</div>
                      <div>
                        <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Announcement Text (Cycles in header)</label>
                        <input
                          type="text"
                          placeholder="🎉 SPECIAL PRIVILEGE OFFER: USE PRIVILEGE CODE 'RUH20' AT CABINET..."
                          value={siteSettings.announcementText || ""}
                          onChange={(e) => handleUpdateSiteSetting("announcementText", e.target.value)}
                          className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                        />
                      </div>
                    </div>

                    {/* ====== 2. DIRECT AD BANNER UPLODE DIRECT OPTION ====== */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4 md:col-span-2">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">1-C. Promo Ad Banner Banner (Direct Upload)</div>
                      <div className="space-y-4 bg-white p-4 rounded-xl border border-sand-200">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={siteSettings.activeAdBannerEnabled || false}
                              onChange={(e) => setSiteSettings(prev => ({ ...prev, activeAdBannerEnabled: e.target.checked }))}
                              className="rounded text-[#D4BC96] focus:ring-[#D4BC96] w-4 h-4"
                            />
                            <span className="text-xs font-semibold text-sand-800 uppercase tracking-wider">Enable Active Ad Banner</span>
                          </label>
                          <span className="text-[9px] text-sand-400 font-mono">Upload promotional posters directly</span>
                        </div>

                        {siteSettings.activeAdBannerImg && (
                          <div className="aspect-[21/9] rounded-lg overflow-hidden border bg-sand-50 max-h-40">
                            <img src={siteSettings.activeAdBannerImg} alt="Promo Banner Preview" className="w-full h-full object-contain" />
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Destination Redirection Link</label>
                            <input
                              type="text"
                              value={siteSettings.activeAdBannerLink || ""}
                              placeholder="#shop-section"
                              onChange={(e) => setSiteSettings(prev => ({ ...prev, activeAdBannerLink: e.target.value }))}
                              className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded text-sand-900 outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Direct Upload Ad Graphic</label>
                            <input
                              type="file"
                              accept="image/*"
                              id="ad-banner-upload-file"
                              className="hidden"
                              onChange={(e) => {
                                handleFileChange(e, (base64) => {
                                  setSiteSettings(prev => ({ ...prev, activeAdBannerImg: base64 }));
                                });
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById("ad-banner-upload-file")?.click()}
                              className="w-full py-2 bg-[#2D2926] hover:bg-[#D4BC96] text-white text-[10px] font-mono uppercase tracking-widest rounded transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Ad Layout</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ====== 3. MANUFACTURING VIDEO SECTION ====== */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4 md:col-span-2">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">1-D. Distillery Manufacturing Video Section</div>
                      <div className="space-y-4 bg-white p-4 rounded-xl border border-sand-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Video Heading / Title</label>
                            <input
                              type="text"
                              value={siteSettings.distilleryVideoHeading || ""}
                              onChange={(e) => handleUpdateSiteSetting("distilleryVideoHeading", e.target.value)}
                              className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">YouTube Embed / Video Link Address</label>
                            <input
                              type="text"
                              value={siteSettings.distilleryVideoUrl || ""}
                              onChange={(e) => handleUpdateSiteSetting("distilleryVideoUrl", e.target.value)}
                              placeholder="https://www.youtube.com/embed/..."
                              className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded outline-none"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Video Description Subtext</label>
                            <textarea
                              rows={2}
                              value={siteSettings.distilleryVideoText || ""}
                              onChange={(e) => handleUpdateSiteSetting("distilleryVideoText", e.target.value)}
                              className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded outline-none leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ====== 4. FEATURING SANDALWOOD STICK DEAL ====== */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4 md:col-span-2">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">1-E. Sandalwood Stick & Rubbing Stone Deal Block</div>
                      <div className="space-y-4 bg-white p-4 rounded-xl border border-sand-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Product Deal Name / Title</label>
                            <input
                              type="text"
                              value={siteSettings.sandalwoodStickTitle || ""}
                              onChange={(e) => handleUpdateSiteSetting("sandalwoodStickTitle", e.target.value)}
                              className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Exclusive Offer Price (INR ₹)</label>
                            <input
                              type="number"
                              value={siteSettings.sandalwoodStickPrice || ""}
                              onChange={(e) => setSiteSettings(prev => ({ ...prev, sandalwoodStickPrice: Number(e.target.value) }))}
                              className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded outline-none"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Short Description</label>
                            <textarea
                              rows={2}
                              value={siteSettings.sandalwoodStickText || ""}
                              onChange={(e) => handleUpdateSiteSetting("sandalwoodStickText", e.target.value)}
                              className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded outline-none leading-relaxed"
                            />
                          </div>
                          <div className="sm:col-span-2 bg-sand-50 p-3 rounded-lg border flex items-center justify-between gap-4">
                            <div className="w-16 h-16 bg-white rounded border overflow-hidden shrink-0">
                              {siteSettings.sandalwoodStickImage ? (
                                <img src={siteSettings.sandalwoodStickImage} alt="Sandalwood Stick" className="w-full h-full object-cover" />
                              ) : (
                                <div className="text-[8px] text-center text-sand-400 font-mono">No Photo</div>
                              )}
                            </div>
                            <div className="flex-1">
                              <input
                                type="file"
                                accept="image/*"
                                id="sandalwood-stick-deal-photo-upload"
                                className="hidden"
                                onChange={(e) => {
                                  handleFileChange(e, (base64) => {
                                    setSiteSettings(prev => ({ ...prev, sandalwoodStickImage: base64 }));
                                  });
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => document.getElementById("sandalwood-stick-deal-photo-upload")?.click()}
                                className="px-3.5 py-1.5 bg-[#2D2926] hover:bg-[#D4BC96] text-white font-mono text-[9px] uppercase tracking-widest rounded cursor-pointer"
                              >
                                Swap Deal Photo
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ====== 5. THREE RAHIPARFUMS BENTO ROW STORIES ====== */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4 md:col-span-2">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">1-F. Brand Landmark Row Stories (Ruh Imperium Concept)</div>
                      
                      {/* Story Row #1 */}
                      <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3">
                        <span className="text-[8px] font-mono font-bold uppercase text-sand-400">Section Row 01 / Landmarking</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Story 01 Title</label>
                            <input
                              type="text"
                              value={siteSettings.story01Title || ""}
                              onChange={(e) => handleUpdateSiteSetting("story01Title", e.target.value)}
                              className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Image Sourcing</label>
                            <input
                              type="file"
                              accept="image/*"
                              id="row-story-01-file-u"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, (base64) => setSiteSettings(prev => ({ ...prev, story01Image: base64 })))}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById("row-story-01-file-u")?.click()}
                              className="w-full py-2 bg-sand-100 hover:bg-sand-200 border text-sand-700 text-[10px] font-mono uppercase tracking-widest rounded"
                            >
                              Upload Row 1 Photo
                            </button>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Story 01 Content Text</label>
                            <textarea
                              rows={2}
                              value={siteSettings.story01Text || ""}
                              onChange={(e) => handleUpdateSiteSetting("story01Text", e.target.value)}
                              className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Story Row #2 */}
                      <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3 mt-4">
                        <span className="text-[8px] font-mono font-bold uppercase text-sand-400">Section Row 02 / Landmarking</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Story 02 Title</label>
                            <input
                              type="text"
                              value={siteSettings.story02Title || ""}
                              onChange={(e) => handleUpdateSiteSetting("story02Title", e.target.value)}
                              className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Image Sourcing</label>
                            <input
                              type="file"
                              accept="image/*"
                              id="row-story-02-file-u"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, (base64) => setSiteSettings(prev => ({ ...prev, story02Image: base64 })))}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById("row-story-02-file-u")?.click()}
                              className="w-full py-2 bg-sand-100 hover:bg-sand-200 border text-sand-700 text-[10px] font-mono uppercase tracking-widest rounded"
                            >
                              Upload Row 2 Photo
                            </button>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Story 02 Content Text</label>
                            <textarea
                              rows={2}
                              value={siteSettings.story02Text || ""}
                              onChange={(e) => handleUpdateSiteSetting("story02Text", e.target.value)}
                              className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Story Row #3 */}
                      <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3 mt-4">
                        <span className="text-[8px] font-mono font-bold uppercase text-sand-400">Section Row 03 / Landmarking</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Story 03 Title</label>
                            <input
                              type="text"
                              value={siteSettings.story03Title || ""}
                              onChange={(e) => handleUpdateSiteSetting("story03Title", e.target.value)}
                              className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Image Sourcing</label>
                            <input
                              type="file"
                              accept="image/*"
                              id="row-story-03-file-u"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, (base64) => setSiteSettings(prev => ({ ...prev, story03Image: base64 })))}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById("row-story-03-file-u")?.click()}
                              className="w-full py-2 bg-sand-100 hover:bg-sand-200 border text-sand-700 text-[10px] font-mono uppercase tracking-widest rounded"
                            >
                              Upload Row 3 Photo
                            </button>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Story 03 Content Text</label>
                            <textarea
                              rows={2}
                              value={siteSettings.story03Text || ""}
                              onChange={(e) => handleUpdateSiteSetting("story03Text", e.target.value)}
                              className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* ====== 1-G. CUSTOMER CHECKOUT POLICY CONFIGURATION ====== */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4 md:col-span-2">
                      <div className="flex justify-between items-center border-b border-sand-110 pb-2">
                        <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">1-G. Customer Order Checkout Policy Configuration</div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={siteSettings.checkoutPolicyEnabled || false}
                            onChange={(e) => setSiteSettings(prev => ({ ...prev, checkoutPolicyEnabled: e.target.checked }))}
                            className="rounded text-[#D4BC96] focus:ring-[#D4BC96] w-4 h-4"
                          />
                          <span className="text-xs font-semibold text-sand-800 uppercase tracking-wider">Enable Checkout Policy</span>
                        </label>
                      </div>
                      
                      <div className="space-y-4 bg-white p-4 rounded-xl border border-sand-200">
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1 font-semibold">Policy Title</label>
                          <input
                            type="text"
                            value={siteSettings.checkoutPolicyTitle || ""}
                            placeholder="Shipping & Return Policy"
                            onChange={(e) => setSiteSettings(prev => ({ ...prev, checkoutPolicyTitle: e.target.value }))}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1 font-semibold">Policy Page Details & Content</label>
                          <textarea
                            rows={10}
                            value={siteSettings.checkoutPolicyContent || ""}
                            placeholder="Type policy clauses here..."
                            onChange={(e) => setSiteSettings(prev => ({ ...prev, checkoutPolicyContent: e.target.value }))}
                            className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded outline-none leading-relaxed font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ====== 1-H. BENTO NUMBERS CARDS (BUILT THROUGH GENERATIONS, TOLD THROUGH NUMBERS) ====== */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4 md:col-span-2">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96] border-b border-sand-110 pb-2">
                        1-H. Bento Stats & Generations Cards Configuration (Reflected live to all users)
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3">
                          <span className="text-[10px] uppercase tracking-wider text-sand-500 font-mono font-bold">Card 1 (GLOBAL REACH)</span>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Badge</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard1Badge || ""}
                                placeholder="GLOBAL REACH"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard1Badge: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Value Metric</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard1Value || ""}
                                placeholder="200k+"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard1Value: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Headline</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard1Title || ""}
                                placeholder="Fragrances Delivered"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard1Title: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Description</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard1Desc || ""}
                                placeholder="Making India's native perfumery accessible to the entire world."
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard1Desc: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3">
                          <span className="text-[10px] uppercase tracking-wider text-sand-500 font-mono font-bold">Card 2 (LOYALTY INDEX)</span>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Badge</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard2Badge || ""}
                                placeholder="LOYALTY INDEX"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard2Badge: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Value Metric</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard2Value || ""}
                                placeholder="72%"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard2Value: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Headline</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard2Title || ""}
                                placeholder="Customer Satisfaction"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard2Title: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Description</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard2Desc || ""}
                                placeholder="Loved for natural aroma and authentic craftsmanship."
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard2Desc: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3">
                          <span className="text-[10px] uppercase tracking-wider text-sand-500 font-mono font-bold">Card 3 (SCENT SUITE - IMAGE/HEADER)</span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Badge</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard3Badge || ""}
                                placeholder="SCENT SUITE"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard3Badge: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Title Headline</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard3Title || ""}
                                placeholder="True Botanical Heritage"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard3Title: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Card Photo</label>
                              <input
                                type="file"
                                accept="image/*"
                                id="bento-card-3-image-file"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, (base64) => setSiteSettings(prev => ({ ...prev, statsCard3Image: base64 })))}
                              />
                              <button
                                type="button"
                                onClick={() => document.getElementById("bento-card-3-image-file")?.click()}
                                className="w-full py-2 bg-sand-100 hover:bg-sand-200 border text-sand-700 text-[10px] font-mono uppercase tracking-widest rounded"
                              >
                                Upload Card 3 Photo
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3">
                          <span className="text-[10px] uppercase tracking-wider text-sand-500 font-mono font-bold">Card 4 (LOGISTICS LOGS)</span>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Badge</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard4Badge || ""}
                                placeholder="LOGISTICS LOGS"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard4Badge: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Value Metric</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard4Value || ""}
                                placeholder="24h"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard4Value: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Headline</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard4Title || ""}
                                placeholder="Fast Dispatch"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard4Title: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Description</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard4Desc || ""}
                                placeholder="Quick shipping so your signature scent reaches you sooner."
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard4Desc: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3">
                          <span className="text-[10px] uppercase tracking-wider text-sand-500 font-mono font-bold">Card 5 (ORIGIN CHRONICLES - LARGE CARD)</span>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Badge</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard5Badge || ""}
                                placeholder="ORIGIN CHRONICLES"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard5Badge: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Headline</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard5Title || ""}
                                placeholder="Heritage Distillation Stoves"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard5Title: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1 font-semibold">Description</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard5Desc || ""}
                                placeholder="Preserving a 204-year-old water-based clay hydrodistillation method..."
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard5Desc: e.target.value }))}
                                className="w-full bg-[#FCFBF9] border border-sand-200 p-2 text-xs rounded"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Card Photo</label>
                              <input
                                type="file"
                                accept="image/*"
                                id="bento-card-5-image-file"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, (base64) => setSiteSettings(prev => ({ ...prev, statsCard5Image: base64 })))}
                              />
                              <button
                                type="button"
                                onClick={() => document.getElementById("bento-card-5-image-file")?.click()}
                                className="w-full py-2 bg-sand-100 hover:bg-sand-200 border text-sand-700 text-[10px] font-mono uppercase tracking-widest rounded"
                              >
                                Upload Card 5 Photo
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3">
                          <span className="text-[10px] uppercase tracking-wider text-sand-500 font-mono font-bold">Card 6 (PORTFOLIO ACCORDS)</span>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Badge</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard6Badge || ""}
                                placeholder="PORTFOLIO ACCORDS"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard6Badge: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Value Metric</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard6Value || ""}
                                placeholder="75+"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard6Value: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Headline</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard6Title || ""}
                                placeholder="Signature Blends"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard6Title: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Description</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard6Desc || ""}
                                placeholder="A diverse collection of attars crafted for every mood and moment."
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard6Desc: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-sand-200 space-y-3">
                          <span className="text-[10px] uppercase tracking-wider text-sand-500 font-mono font-bold">Card 7 (LEGACY COEFFICIENT)</span>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1 font-semibold">Badge</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard7Badge || ""}
                                placeholder="LEGACY COEFFICIENT"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard7Badge: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1 font-semibold">Value Metric</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard7Value || ""}
                                placeholder="200+"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard7Value: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none font-mono"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1 font-semibold">Headline</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard7Title || ""}
                                placeholder="Years of Expertise"
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard7Title: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1 font-semibold">Description</label>
                              <input
                                type="text"
                                value={siteSettings.statsCard7Desc || ""}
                                placeholder="Blending tradition and innovation in every single bottle."
                                onChange={(e) => setSiteSettings(prev => ({ ...prev, statsCard7Desc: e.target.value }))}
                                className="w-full bg-sand-50 border border-sand-200 p-2 text-xs rounded outline-none"
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Wanderlust Diary Stories Management */}
                    <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-5 space-y-4 md:col-span-2">
                      <div className="flex justify-between items-center border-b border-sand-100 pb-2">
                        <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">5. Wanderlust Diary / Travel Stories</div>
                        <span className="text-[10px] text-sand-400 font-mono">Real-time Sourcing Journal Editor</span>
                      </div>
                      
                      <div className="space-y-6">
                        {blogArticles.map((article) => (
                          <div key={article.id} className="bg-white border border-sand-200 rounded-xl p-4.5 space-y-4 hover:shadow-xs transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-sand-100/70 pb-2">
                              <span className="font-serif font-semibold text-sand-950 text-sm">
                                {article.title || "Untitled Story"}
                              </span>
                              <span className="text-[10px] font-mono text-sand-500 bg-sand-100 px-2 py-0.5 rounded">
                                {article.location} • {article.readTime}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                              {/* Left Columns: Photo upload / image address */}
                              <div className="lg:col-span-4 space-y-3">
                                <label className="text-[9.5px] uppercase tracking-widest text-[#D4BC96] font-mono block font-semibold">Story Photo</label>
                                <div className="h-36 rounded-lg bg-sand-100 border border-sand-200 overflow-hidden relative group">
                                  {article.image ? (
                                    <img 
                                      src={article.image} 
                                      alt={article.title} 
                                      className="w-full h-full object-cover" 
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-sand-100 text-sand-400 text-xs">
                                      No Image Set
                                    </div>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-0.5">Image Web Link / Address</label>
                                    <input 
                                      type="text"
                                      value={article.image}
                                      onChange={(e) => {
                                        const updated = blogArticles.map(b => b.id === article.id ? { ...b, image: e.target.value } : b);
                                        setBlogArticles(updated);
                                      }}
                                      placeholder="Or paste direct image URL link"
                                      className="w-full bg-sand-50 border border-sand-200 p-2 text-[10px] rounded focus:ring-1 focus:ring-[#D4BC96] outline-none"
                                    />
                                  </div>
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const fileInput = document.getElementById(`file-upload-blog-${article.id}`);
                                        if (fileInput) { fileInput.click(); }
                                      }}
                                      className="w-full py-2 bg-sand-100 hover:bg-sand-200 text-sand-700 text-[10px] font-mono uppercase tracking-widest rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-sand-200"
                                    >
                                      <Upload className="w-3.5 h-3.5" />
                                      Upload Direct Photo
                                    </button>
                                    <input 
                                      type="file"
                                      id={`file-upload-blog-${article.id}`}
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        handleFileChange(e, (base64) => {
                                          const updated = blogArticles.map(b => b.id === article.id ? { ...b, image: base64 } : b);
                                          setBlogArticles(updated);
                                        });
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              {/* Right Columns: Title, Location, Excerpt, Content parameters */}
                              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="sm:col-span-2">
                                  <label className="text-[9.5px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1 font-semibold">Travel Story Title</label>
                                  <input 
                                    type="text"
                                    value={article.title}
                                    onChange={(e) => {
                                      const updated = blogArticles.map(b => b.id === article.id ? { ...b, title: e.target.value } : b);
                                      setBlogArticles(updated);
                                    }}
                                    className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9.5px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1 font-semibold">Location / Origin Tag</label>
                                  <input 
                                    type="text"
                                    value={article.location}
                                    onChange={(e) => {
                                      const updated = blogArticles.map(b => b.id === article.id ? { ...b, location: e.target.value } : b);
                                      setBlogArticles(updated);
                                    }}
                                    className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9.5px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1 font-semibold">Estimated Reading Period</label>
                                  <input 
                                    type="text"
                                    value={article.readTime}
                                    onChange={(e) => {
                                      const updated = blogArticles.map(b => b.id === article.id ? { ...b, readTime: e.target.value } : b);
                                      setBlogArticles(updated);
                                    }}
                                    className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:ring-1 focus:ring-[#D4BC96] outline-none"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[9.5px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1 font-semibold">Excerpt / Botanical Abstract</label>
                                  <textarea 
                                    rows={2}
                                    value={article.excerpt}
                                    onChange={(e) => {
                                      const updated = blogArticles.map(b => b.id === article.id ? { ...b, excerpt: e.target.value } : b);
                                      setBlogArticles(updated);
                                    }}
                                    className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded text-sand-700 focus:ring-1 focus:ring-[#D4BC96] outline-none leading-relaxed"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <label className="text-[9.5px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1 font-semibold">Full Adventure Scent Story narrative</label>
                                  <textarea 
                                    rows={4}
                                    value={article.content}
                                    onChange={(e) => {
                                      const updated = blogArticles.map(b => b.id === article.id ? { ...b, content: e.target.value } : b);
                                      setBlogArticles(updated);
                                    }}
                                    className="w-full bg-sand-50 border border-sand-200 p-2.5 text-xs rounded text-sand-700 focus:ring-1 focus:ring-[#D4BC96] outline-none leading-relaxed"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 5: ACTIVE DISCOUNT COUPONS MANAGER */}
              {activeTab === "coupons" && (
                <div className="space-y-8 font-sans">
                  <div>
                    <h3 className="text-xl font-light font-serif tracking-wide text-sand-900">
                      Cart Discount Coupons Ledger
                    </h3>
                    <p className="text-xs text-sand-400 font-light font-sans">
                      Register and configure valid dynamic discount promo tokens. Standard fallback vouchers like WAYFARER15 (15%) and WAYFARER20 (20%) remain persistently active.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* Add new coupon */}
                    <div className="md:col-span-5 bg-sand-50/70 border border-sand-200 p-5 rounded-2xl h-fit space-y-4">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">Create New Coupon Promo</div>
                      
                      {couponErrorMsg && (
                        <div className="bg-red-50 text-red-600 text-[10px] p-2 rounded font-light border border-red-100 font-sans">
                          {couponErrorMsg}
                        </div>
                      )}

                      <form onSubmit={handleAddCoupon} className="space-y-4">
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Coupon Token Code</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. FESTIVE25"
                            value={newCouponCode}
                            onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                            className="w-full bg-white border border-sand-200 p-2 text-xs rounded text-sand-900 font-bold uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#D4BC96]"
                          />
                        </div>

                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Discount percentage (%)</label>
                          <input
                            type="number"
                            required
                            min={1}
                            max={100}
                            value={newCouponPercent}
                            onChange={(e) => setNewCouponPercent(parseInt(e.target.value) || 0)}
                            className="w-full bg-white border border-sand-200 p-2 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-[#2D2926] hover:bg-[#D4BC96] text-[#FAFAFA] font-medium text-xs uppercase tracking-widest rounded transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>MINT PROMO CODE</span>
                        </button>
                      </form>
                    </div>

                    {/* Coupons inventory list */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">Current Active Promotional Tokens</div>
                      
                      {coupons.length === 0 ? (
                        <div className="p-8 text-center text-xs text-sand-400 font-light bg-sand-50/40 rounded-xl border border-dashed border-sand-200 flex flex-col items-center justify-center">
                          No custom active tokens registered yet. Create one to validate custom checkout discounts!
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {coupons.map((cp) => (
                            <div key={cp.code} className="bg-white border border-sand-200 p-4 rounded-xl shadow-xs flex justify-between items-center relative group">
                              <div>
                                <span className="font-mono font-bold tracking-wider text-sm text-sand-900 uppercase">
                                  {cp.code}
                                </span>
                                <span className="text-[10px] font-medium text-emerald-600 block bg-emerald-50 w-fit px-2 py-0.5 rounded-full mt-1.5 font-mono">
                                  {cp.discountPercent}% OFF Cart
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteCoupon(cp.code)}
                                className="p-2 text-sand-300 hover:text-red-500 rounded bg-sand-50 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Burn coupon code"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 6: COLLECTIONS DECK MANAGER */}
              {activeTab === "collections" && (
                <div className="space-y-8 font-sans">
                  <div>
                    <h3 className="text-xl font-light font-serif tracking-wide text-sand-900">
                      Olfactory Collections Registry
                    </h3>
                    <p className="text-xs text-sand-400 font-light font-sans">
                      Administer, rename, and establish distinct product lines. Products pointing to respective collection IDs grouping automatically on your storefront shop layout.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Add New Collection Form */}
                    <div className="md:col-span-4 bg-sand-50/70 border border-sand-200 p-5 rounded-2xl h-fit space-y-4">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96]">Create Dynamic Collection</div>
                      
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          const form = e.currentTarget;
                          const nameInput = form.elements.namedItem("colName") as HTMLInputElement;
                          const tagInput = form.elements.namedItem("colTag") as HTMLInputElement;
                          const iconInput = form.elements.namedItem("colIcon") as HTMLInputElement;
                          
                          if (!nameInput.value.trim()) return;
                          
                          // Safe ID based on name lowercased with - instead of spaces
                          const generatedId = nameInput.value.trim().toLowerCase().replace(/\s+/g, '-');
                          
                          // Check for duplicate ID
                          if (collections.some(c => c.id === generatedId)) {
                            alert("A collection with a similar name already exists!");
                            return;
                          }

                          const newCol: Collection = {
                            id: generatedId,
                            name: nameInput.value.trim(),
                            tag: tagInput.value.trim() || undefined,
                            icon: iconInput.value.trim() || undefined,
                            image: newColImageUrl.trim() || undefined,
                            isBold: false
                          };

                          setCollections(prev => [...prev, newCol]);
                          setNewColImageUrl("");
                          form.reset();
                        }} 
                        className="space-y-4"
                      >
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Collection Name</label>
                          <input
                            name="colName"
                            type="text"
                            required
                            placeholder="e.g. Amber & Gold"
                            className="w-full bg-white border border-sand-200 p-2 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96]"
                          />
                        </div>

                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Scent Tagline / Description</label>
                          <input
                            name="colTag"
                            type="text"
                            placeholder="e.g. Precious resin formulations aged in sandalwood."
                            className="w-full bg-white border border-sand-200 p-2 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96]"
                          />
                        </div>

                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Visual Emoji / Icon Accent</label>
                          <input
                            name="colIcon"
                            type="text"
                            placeholder="e.g., 🧪, 🏺, 🌸"
                            className="w-full bg-white border border-sand-200 p-2 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96]"
                          />
                        </div>

                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Collection Cover Image (Photo)</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newColImageUrl}
                              onChange={(e) => setNewColImageUrl(e.target.value)}
                              placeholder="Direct URL or click Upload"
                              className="flex-1 bg-white border border-sand-200 p-2 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96]"
                            />
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                id="new-col-img-upload-field"
                                className="hidden"
                                disabled={isUploadingNewColImg}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setIsUploadingNewColImg(true);
                                    compressAndEncodeBase64(file, (compressedBase64) => {
                                      setNewColImageUrl(compressedBase64);
                                      setIsUploadingNewColImg(false);
                                    });
                                  }
                                }}
                              />
                              <label
                                htmlFor="new-col-img-upload-field"
                                className="px-3 py-2 bg-sand-100 hover:bg-sand-200 text-sand-800 text-xs rounded border border-sand-300 block cursor-pointer transition-colors"
                              >
                                {isUploadingNewColImg ? "..." : "Upload"}
                              </label>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-[#2D2926] hover:bg-[#D4BC96] text-[#FAFAFA] font-medium text-xs uppercase tracking-widest rounded transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>STAMP COLLECTION</span>
                        </button>
                      </form>
                    </div>

                    {/* Collections Ledger */}
                    <div className="md:col-span-8 space-y-4 shadow-sm">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96] flex justify-between">
                        <span>Active Collections Registry</span>
                        <span className="text-[10px] text-sand-400 lowercase font-light">({collections.length} groups)</span>
                      </div>

                      <div className="space-y-3">
                        {collections.map((col) => (
                          <div 
                            key={col.id} 
                            className="bg-white border border-sand-200 p-4 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative"
                          >
                            <div className="flex-1 space-y-2.5">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{col.icon || "🏺"}</span>
                                <span className="text-[9.5px] font-bold font-mono uppercase text-sand-400 bg-sand-100 px-2 py-0.5 rounded leading-relaxed">
                                  ID: {col.id}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                  <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-0.5">Edit Name</label>
                                  <input
                                    type="text"
                                    value={col.name}
                                    onChange={(e) => {
                                      const updatedName = e.target.value;
                                      setCollections(prev => prev.map(c => c.id === col.id ? { ...c, name: updatedName } : c));
                                    }}
                                    className="w-full bg-sand-50/60 border border-sand-200 px-2.5 py-1.5 text-xs rounded text-sand-800 outline-none focus:bg-white focus:ring-1 focus:ring-[#D4BC96]"
                                  />
                                </div>
                                
                                <div>
                                  <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-0.5">Edit Emoji Label</label>
                                  <input
                                    type="text"
                                    value={col.icon || ""}
                                    onChange={(e) => {
                                      const updatedIcon = e.target.value;
                                      setCollections(prev => prev.map(c => c.id === col.id ? { ...c, icon: updatedIcon } : c));
                                    }}
                                    className="w-16 bg-sand-50/60 border border-sand-200 px-2.5 py-1.5 text-xs rounded text-center text-sand-800 outline-none focus:bg-white focus:ring-1 focus:ring-[#D4BC96]"
                                  />
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-0.5">Edit Description / Tagline</label>
                                  <input
                                    type="text"
                                    value={col.tag || ""}
                                    onChange={(e) => {
                                      const updatedTag = e.target.value;
                                      setCollections(prev => prev.map(c => c.id === col.id ? { ...c, tag: updatedTag } : c));
                                    }}
                                    className="w-full bg-sand-50/60 border border-sand-200 px-2.5 py-1.5 text-xs rounded text-sand-700 outline-none focus:bg-white focus:ring-1 focus:ring-[#D4BC96] mb-3"
                                  />
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-0.5">Edit Scent Photo Cover (Direct URL or upload file)</label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={col.image || ""}
                                      onChange={(e) => {
                                        const updatedImage = e.target.value;
                                        setCollections(prev => prev.map(c => c.id === col.id ? { ...c, image: updatedImage } : c));
                                      }}
                                      placeholder="Direct image URL or click Upload"
                                      className="flex-1 bg-sand-50/60 border border-sand-200 px-2.5 py-1.5 text-xs rounded text-sand-700 outline-none focus:bg-white focus:ring-1 focus:ring-[#D4BC96]"
                                    />
                                    <div className="relative">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        id={`col-img-upload-${col.id}`}
                                        className="hidden"
                                        disabled={uploadingColId === col.id}
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            setUploadingColId(col.id);
                                            compressAndEncodeBase64(file, (compressedBase64) => {
                                              setCollections(prev => prev.map(c => c.id === col.id ? { ...c, image: compressedBase64 } : c));
                                              setUploadingColId(null);
                                            });
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor={`col-img-upload-${col.id}`}
                                        className="px-2.5 py-1.5 bg-sand-100 hover:bg-sand-200 text-sand-800 text-xs rounded border border-sand-300 block cursor-pointer transition-colors"
                                      >
                                        {uploadingColId === col.id ? "..." : "Upload"}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 border-sand-100 pt-2 sm:pt-0 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  if (collections.length <= 1) {
                                    alert("At least one collection is required to structure your shop catalog!");
                                    return;
                                  }
                                  if (confirm(`Remove collection "${col.name}"? Products under this collection will need to be re-associated.`)) {
                                    setCollections(prev => prev.filter(c => c.id !== col.id));
                                  }
                                }}
                                className="p-2 text-sand-300 hover:text-red-500 rounded bg-sand-50 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete collection"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 6: PRODUCT REVIEWS MODERATION */}
              {activeTab === "reviews" && (
                <div className="space-y-8 font-sans">
                  <div>
                    <h3 className="text-xl font-light font-serif tracking-wide text-sand-900">
                      Product Scent Reviews Moderation
                    </h3>
                    <p className="text-xs text-sand-400 font-light font-sans">
                      Moderate, view, and delete user-submitted reviews across all active products. Deletions are immediately synchronized live to all customers in real-time.
                    </p>
                  </div>

                  {/* Reviews statistics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-sand-50/70 border border-sand-200 p-4 rounded-2xl flex flex-col justify-between">
                      <span className="text-[9px] uppercase tracking-widest text-sand-400 font-mono font-bold">Total Reviews Count</span>
                      <span className="text-2xl font-serif text-sand-900 mt-2">{reviews?.length || 0}</span>
                    </div>
                    <div className="bg-sand-50/70 border border-sand-200 p-4 rounded-2xl flex flex-col justify-between">
                      <span className="text-[9px] uppercase tracking-widest text-sand-400 font-mono font-bold">Average Scent Rating</span>
                      <span className="text-2xl font-serif text-sand-900 mt-2">
                        {reviews && reviews.length > 0 
                          ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                          : "0.0"
                        } / 5.0
                      </span>
                    </div>
                    <div className="bg-sand-50/70 border border-sand-200 p-4 rounded-2xl flex flex-col justify-between">
                      <span className="text-[9px] uppercase tracking-widest text-sand-400 font-mono font-bold">Verified Buyer Ratio</span>
                      <span className="text-2xl font-serif text-[#D4BC96] mt-2">
                        {reviews && reviews.length > 0 
                          ? ((reviews.filter(r => r.verified).length / reviews.length) * 100).toFixed(0)
                          : "0"
                        }%
                      </span>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="bg-sand-50/70 border border-sand-200 p-4 rounded-2xl flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Search review or author</label>
                      <input
                        type="text"
                        placeholder="Search text or reviewer name..."
                        id="reviews-search-input"
                        className="w-full bg-white border border-sand-200 p-2 text-xs rounded outline-none"
                        onChange={(e) => setReviewSearchQuery(e.target.value)}
                        value={reviewSearchQuery}
                      />
                    </div>
                    <div>
                      <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1 font-semibold">Filter by Product</label>
                      <select
                        value={selectedProductFilter}
                        onChange={(e) => setSelectedProductFilter(e.target.value)}
                        className="bg-white border border-sand-200 p-2 text-xs rounded outline-none w-full sm:w-64 font-mono text-[11px]"
                      >
                        <option value="all">All Fragrance Items ({products.length})</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {(() => {
                      const filtered = (reviews || []).filter(rev => {
                        const matchesProduct = selectedProductFilter === "all" || rev.productId === selectedProductFilter;
                        const matchesSearch = !reviewSearchQuery || 
                          rev.author.toLowerCase().includes(reviewSearchQuery.toLowerCase()) || 
                          rev.text.toLowerCase().includes(reviewSearchQuery.toLowerCase());
                        return matchesProduct && matchesSearch;
                      });

                      if (filtered.length === 0) {
                        return (
                          <div className="text-center py-12 bg-white rounded-2xl border border-sand-200">
                            <MessageSquare className="w-8 h-8 text-sand-300 mx-auto mb-2" />
                            <p className="text-xs text-sand-400 font-mono">No matching product reviews found in database.</p>
                          </div>
                        );
                      }

                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filtered.map((rev) => {
                            const matchedProd = products.find(p => p.id === rev.productId);
                            return (
                              <div key={rev.id} className="bg-white border border-sand-200 p-4 rounded-2xl space-y-3.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
                                <div className="space-y-2">
                                  {/* Product info banner */}
                                  <div className="flex items-center gap-2 border-b border-sand-100 pb-2">
                                    {matchedProd?.image ? (
                                      <img src={matchedProd.image} alt={matchedProd.name} className="w-8 h-8 object-cover rounded border border-sand-250 bg-sand-50" />
                                    ) : (
                                      <div className="w-8 h-8 rounded border border-sand-250 bg-sand-100 flex items-center justify-center text-xs font-serif italic text-sand-500">P</div>
                                    )}
                                    <div className="min-w-0">
                                      <div className="text-[10px] font-mono text-sand-400 uppercase tracking-wider">Product Link</div>
                                      <p className="text-[11px] font-medium text-sand-800 truncate">{matchedProd?.name || "Premium Custom Blends (Attar)"}</p>
                                    </div>
                                  </div>

                                  {/* Author / Rating / Date */}
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <div className="flex items-center gap-1.5">
                                        <p className="text-xs font-semibold text-sand-800">{rev.author}</p>
                                        {rev.verified && (
                                          <span className="text-[8px] uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-1 py-0.2 rounded font-mono">Verified Buyer</span>
                                        )}
                                      </div>
                                      <span className="text-[9px] text-sand-400 font-mono mt-0.5 block">{rev.date}</span>
                                    </div>

                                    {/* Star Rating display */}
                                    <div className="flex items-center gap-0.5">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i}>
                                          <Star className={`w-3 h-3 ${i < rev.rating ? "text-amber-550 fill-amber-400" : "text-sand-250"}`} />
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Review Paragraph */}
                                  <p className="text-xs text-sand-600 leading-relaxed italic">"{rev.text}"</p>
                                </div>

                                {/* Danger delete button */}
                                <div className="pt-2 border-t border-sand-100 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm(`Are you sure you want to permanently delete this review by "${rev.author}"?`)) {
                                        setReviews(prev => prev.filter(r => r.id !== rev.id));
                                      }
                                    }}
                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-mono uppercase tracking-widest rounded border border-red-200 cursor-pointer transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>

                </div>
              )}

              {/* TAB 7: ADMIN CREDENTIALS CONFIGURATION */}
              {activeTab === "admin-credentials" && (
                <div className="space-y-8 font-sans">
                  <div>
                    <h3 className="text-xl font-light font-serif tracking-wide text-sand-900">
                      Administrative Accounts & Keys
                    </h3>
                    <p className="text-xs text-sand-400 font-light font-sans">
                      Add, update, or revoke secure access keys. Multiple administrators can be assigned authentic cryptographic logins to perform legal changes on the core database ledger.
                    </p>
                  </div>

                  {/* RAZORPAY INTEGRATION CONFIGURATOR */}
                  <div className="bg-sand-50/70 border border-sand-200 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-sand-200 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">💳</span>
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-sand-900 font-mono">Razorpay Gateway Integration</h4>
                          <p className="text-[10px] text-sand-400 font-light font-sans">Configure high-security banking parameters & checkout tunnels seamlessly.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={siteSettings.razorpayEnabled || false} 
                            onChange={(e) => {
                              const val = e.target.checked;
                              setSiteSettings(prev => ({
                                ...prev,
                                razorpayEnabled: val
                              }));
                            }}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-sand-250 opacity-80 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-650"></div>
                        </label>
                        <span className={`text-[10px] uppercase font-bold font-mono tracking-widest ${siteSettings.razorpayEnabled ? "text-emerald-700 font-semibold" : "text-sand-400"}`}>
                          {siteSettings.razorpayEnabled ? "LIVE GATEWAY ACTIVE" : "SIMULATION SANDBOX"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Razorpay API Key ID</label>
                        <input
                          type="text"
                          value={siteSettings.razorpayKeyId || ""}
                          placeholder="e.g. rzp_test_X2Y3Z4A5B6C7D8"
                          onChange={(e) => {
                            const val = e.target.value;
                            setSiteSettings(prev => ({
                              ...prev,
                              razorpayKeyId: val
                            }));
                          }}
                          className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96] font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[8px] uppercase tracking-widest text-[#D4BC96] font-mono block mb-1">Razorpay Key Secret</label>
                        <input
                          type="password"
                          value={siteSettings.razorpayKeySecret || ""}
                          placeholder="••••••••••••••••••••••••"
                          onChange={(e) => {
                            const val = e.target.value;
                            setSiteSettings(prev => ({
                              ...prev,
                              razorpayKeySecret: val
                            }));
                          }}
                          className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96] font-mono"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] leading-relaxed text-sand-500 bg-white/70 border border-sand-200/50 p-3 rounded-lg flex items-start gap-2">
                      <span className="text-stone-500">💡</span>
                      <span>
                        <strong>Automated Indian Payment Standard:</strong> When "Live Gateway Active" is selected, the application dynamically mounts the verified Razorpay secure script (<code className="font-mono text-[9px] bg-sand-100 px-1 rounded">checkout.js</code>) during the checkout process, opening a sleek, authentic transactional overlay accepting UPI (GPay, PhonePe), net banking, EMI, cards, and mobile wallets. If no key is specified, it runs on our highly polished futuristic digital token simulation with zero transaction limits.
                      </span>
                    </p>
                  </div>

                  {/* EMAILJS INTEGRATION CONFIGURATOR */}
                  <div className="bg-sand-50/70 border border-sand-200 p-6 rounded-2xl space-y-4 mt-6">
                    <div className="flex items-center justify-between border-b border-sand-200 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📧</span>
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-sand-900 font-mono">EmailJS Automated Notifications</h4>
                          <p className="text-[10px] text-sand-400 font-light font-sans">Configure your EmailJS keys to instantly receive new order alerts in your inbox.</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Service ID</label>
                        <input
                          type="text"
                          value={siteSettings.emailjsServiceId || ""}
                          placeholder="e.g. service_xyz123"
                          onChange={(e) => {
                            const val = e.target.value;
                            setSiteSettings(prev => ({
                              ...prev,
                              emailjsServiceId: val
                            }));
                          }}
                          className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96] font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Template ID</label>
                        <input
                          type="text"
                          value={siteSettings.emailjsTemplateId || ""}
                          placeholder="e.g. template_abc456"
                          onChange={(e) => {
                            const val = e.target.value;
                            setSiteSettings(prev => ({
                              ...prev,
                              emailjsTemplateId: val
                            }));
                          }}
                          className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96] font-mono"
                        />
                      </div>
                      
                      <div>
                        <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Public Key</label>
                        <input
                          type="text"
                          value={siteSettings.emailjsPublicKey || ""}
                          placeholder="e.g. xyzABC123key"
                          onChange={(e) => {
                            const val = e.target.value;
                            setSiteSettings(prev => ({
                              ...prev,
                              emailjsPublicKey: val
                            }));
                          }}
                          className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96] font-mono"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] leading-relaxed text-sand-500 bg-white/70 border border-sand-200/50 p-3 rounded-lg flex items-start gap-2">
                      <span className="text-stone-500">💡</span>
                      <span>
                        <strong>Free Email Dispatch:</strong> To activate, create a free account at <strong>emailjs.com</strong>. Add a Gmail service, create a template with your two emails in the "To" field, and paste the 3 keys above. Once saved, you will get instant receipts on every purchase!
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Add New Admin Account */}
                    <div className="md:col-span-5 bg-sand-50/70 border border-sand-200 p-5 rounded-2xl h-fit space-y-4">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96] flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#D4BC96]" />
                        <span>Provision Admin Account</span>
                      </div>
                      
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          const form = e.currentTarget;
                          const usernameInput = form.elements.namedItem("adminEmail") as HTMLInputElement;
                          const passwordInput = form.elements.namedItem("adminPass") as HTMLInputElement;
                          
                          const username = usernameInput.value.trim();
                          const password = passwordInput.value;

                          if (!username || !password) return;

                          if (password.length < 4) {
                            alert("For safety, the administrative password must be at least 4 characters long.");
                            return;
                          }

                          // Check duplicates
                          if (adminUsers.some(u => u.username.toLowerCase() === username.toLowerCase())) {
                            alert("An administrator account with this username/email already exists.");
                            return;
                          }

                          const newAdmin = { username, password };
                          setAdminUsers(prev => [...prev, newAdmin]);
                          form.reset();
                        }} 
                        className="space-y-4 border-none"
                      >
                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Admin Username / Email</label>
                          <input
                            name="adminEmail"
                            type="text"
                            required
                            placeholder="e.g. aditya@ruhimperium.com"
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96]"
                          />
                        </div>

                        <div>
                          <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-1">Access Control Password</label>
                          <input
                            name="adminPass"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-white border border-sand-200 p-2.5 text-xs rounded text-sand-900 focus:outline-none focus:ring-1 focus:ring-[#D4BC96]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-[#2D2926] hover:bg-[#D4BC96] text-[#FAFAFA] font-medium text-xs uppercase tracking-widest rounded transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-4 h-4" />
                          <span>STAMP ACTIVE KEY</span>
                        </button>
                      </form>
                    </div>

                    {/* Active Admins Ledger */}
                    <div className="md:col-span-12 lg:col-span-7 space-y-4">
                      <div className="text-xs font-bold font-mono uppercase tracking-widest text-[#D4BC96] flex justify-between">
                        <span>Active Keys List</span>
                        <span className="text-[10px] text-sand-400 lowercase font-light">({adminUsers.length} administrators)</span>
                      </div>

                      <div className="space-y-3">
                        {adminUsers.map((user, idx) => (
                          <div 
                            key={idx} 
                            className="bg-white border border-sand-200 p-4 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative animate-fadeIn"
                          >
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="text-base text-[#D4BC96]">🛡️</span>
                                <span className="text-[9.5px] font-bold font-mono uppercase text-sand-400 bg-sand-100 px-2 py-0.5 rounded leading-relaxed">
                                  Operator #{idx + 1}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-0.5 font-medium">Username / Email</label>
                                  <input
                                    type="text"
                                    value={user.username}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setAdminUsers(prev => prev.map((u, i) => i === idx ? { ...u, username: val } : u));
                                    }}
                                    className="w-full bg-sand-50/60 border border-sand-200 px-2.5 py-1.5 text-xs rounded text-sand-800 outline-none focus:bg-white focus:ring-1 focus:ring-[#D4BC96] font-medium"
                                  />
                                </div>
                                
                                <div>
                                  <label className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block mb-0.5 font-semibold font-sans">Change Password</label>
                                  <input
                                    type="text"
                                    value={user.password}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setAdminUsers(prev => prev.map((u, i) => i === idx ? { ...u, password: val } : u));
                                    }}
                                    className="w-full bg-sand-50/60 border border-sand-200 px-2.5 py-1.5 text-xs rounded text-stone-800 outline-none focus:bg-white focus:ring-1 focus:ring-[#D4BC96] font-mono"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 border-sand-100 pt-2 sm:pt-0 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  if (adminUsers.length <= 1) {
                                    alert("At least one admin key is required to remain signed in!");
                                    return;
                                  }
                                  if (confirm(`Revoke credentials for ${user.username}? They will no longer have executive access.`)) {
                                    setAdminUsers(prev => prev.filter((_, i) => i !== idx));
                                  }
                                }}
                                className="p-2 text-sand-300 hover:text-red-500 rounded bg-sand-50 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Revoke administrative access key"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Sticky Save Action Bar for Site & Founder settings */}
              {isSiteDirty && (
                <div className="sticky bottom-0 left-0 right-0 z-40 bg-[#2D2926] text-white p-4 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 mt-8 border-t border-[#D4BC96]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_-8px_24px_rgba(45,41,38,0.15)] animate-slideUp">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                    <div className="text-left">
                      <h4 className="text-[11px] font-mono tracking-wider text-[#D4BC96] uppercase font-bold">UNSAVED BRAND OR GENERAL CONTENT CHANGES</h4>
                      <p className="text-[10px] text-sand-300 font-light mt-0.5">You have modified text blocks or portraits. Publish these to make them visible across the live site.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleDiscardChanges}
                      className="flex-1 sm:flex-none px-4 py-2 bg-[#4A4540] hover:bg-[#5C5651] text-sand-200 text-[10px] uppercase tracking-widest font-mono rounded transition-all cursor-pointer border border-sand-700"
                    >
                      Discard
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveAllSiteChanges}
                      disabled={isSaving}
                      className="flex-1 sm:flex-none px-6 py-2 bg-[#D4BC96] hover:bg-[#C4AC86] disabled:bg-sand-300 disabled:text-sand-500 text-stone-900 text-[10px] uppercase tracking-widest font-mono font-bold rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-stone-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Publish Live</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {saveSuccess && (
                <div className="sticky bottom-0 left-0 right-0 z-40 bg-[#0F3521]/95 text-white p-4 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 mt-8 border-t border-emerald-500/30 flex items-center gap-3 shadow-[0_-8px_24px_rgba(16,185,129,0.15)] animate-slideUp">
                  <div className="w-7 h-7 rounded-full bg-emerald-800/80 border border-emerald-500 flex items-center justify-center text-emerald-300 shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[11px] font-mono tracking-wider text-emerald-300 uppercase font-bold">CHANGES DEPLOYED & SAVED SUCCESSFULLY</h4>
                    <p className="text-[10px] text-emerald-100 font-light mt-0.5 font-mono">The cloud database is fully synchronized. All visitors will see the updated translations and media.</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
