export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  salePrice: number;
  description: string;
  story: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  destination: string;
  destinationState: string;
  image: string;
  rating: number;
  reviewsCount: number;
  size: string;
  ingredients: string[];
  longevity: string; // e.g. "Long lasting (8-10 hours)"
  projection: string; // e.g. "Moderate to strong"
  category?: string; // e.g. "Next Gen fragrances", "BEST SELLING", "Authentic Indian Attars", "Eau De Parfum"
  galleryImages?: string[];
  galleryTexts?: { title: string; desc: string }[];
  productImages?: string[];
  variants?: { size: string; price: number; salePrice: number; }[];
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  date: string;
  image: string;
  location: string;
}

export interface MapSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  mainIngredient: string;
  description: string;
  story: string;
  x: number; // percentage from left on Map container (0 - 100)
  y: number; // percentage from top on Map container (0 - 100)
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Order {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  paymentMode: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "Processing" | "Dispatched" | "In Transit" | "Out for Delivery" | "Delivered" | "Cancelled";
  trackingCode: string;
  courierService?: string;
  subtotal?: number;
  shippingFee?: number;
  discountAmount?: number;
  couponCode?: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  upiOnly?: boolean; // If true, COD is not allowed when this coupon is applied
  scope?: "all" | "category";
  categoryScope?: string;
}

export interface SiteSettings {
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  footerAbout: string;
  heroTagline: string;
  heroHeadline: string;
  heroDescription: string;
  whyChooseHeading: string;
  whyChooseSub: string;
  foundersHeading: string;
  foundersText: string;
  customLogoUrl?: string;
  heroMediaType?: '3d' | 'video' | 'photo';
  distilleryMediaType?: 'lab' | 'video' | 'photo';
  distilleryPhotoUrl?: string;
  razorpayKeyId?: string;
  razorpayKeySecret?: string;
  razorpayEnabled?: boolean;
  announcementText?: string;
  announcementLink?: string;
  activeAdBannerImg?: string;
  activeAdBannerLink?: string;
  activeAdBannerEnabled?: boolean;
  distilleryVideoHeading?: string;
  distilleryVideoText?: string;
  distilleryVideoUrl?: string;
  distilleryVideoPoster?: string;
  story01Title?: string;
  story01Text?: string;
  story01Image?: string;
  story02Title?: string;
  story02Text?: string;
  story02Image?: string;
  story03Title?: string;
  story03Text?: string;
  story03Image?: string;
  sandalwoodStickTitle?: string;
  sandalwoodStickSubtitle?: string;
  sandalwoodStickText?: string;
  sandalwoodStickWeight?: string;
  sandalwoodStickPrice?: number;
  sandalwoodStickOriginalPrice?: number;
  sandalwoodStickImage?: string;
  sandalwoodStickInStock?: boolean;
  checkoutPolicyTitle?: string;
  checkoutPolicyContent?: string;
  checkoutPolicyEnabled?: boolean;
  
  // Bento Section (Built Through Generations, Told Through Numbers)
  statsCard1Badge?: string;
  statsCard1Value?: string;
  statsCard1Title?: string;
  statsCard1Desc?: string;
  
  statsCard2Badge?: string;
  statsCard2Value?: string;
  statsCard2Title?: string;
  statsCard2Desc?: string;
  
  statsCard3Badge?: string;
  statsCard3Title?: string;
  statsCard3Image?: string;
  
  statsCard4Badge?: string;
  statsCard4Value?: string;
  statsCard4Title?: string;
  statsCard4Desc?: string;
  
  statsCard5Badge?: string;
  statsCard5Title?: string;
  statsCard5Desc?: string;
  statsCard5Image?: string;
  
  statsCard6Badge?: string;
  statsCard6Value?: string;
  statsCard6Title?: string;
  statsCard6Desc?: string;
  
  statsCard7Badge?: string;
  statsCard7Value?: string;
  statsCard7Title?: string;
  statsCard7Desc?: string;
  
  // Ruh Imperium / Modern Storefront Extras
  marqueeText?: string;
  marqueeEnabled?: boolean;
  bestsellerHeading?: string;
  bestsellerProductIds?: string; // Comma-separated IDs
  aboutUsImage?: string;
  aboutUsHeading?: string;
  aboutUsText?: string;
  pressLogosUrls?: string; // Comma-separated URLs
  
  // EmailJS integration
  emailjsServiceId?: string;
  emailjsTemplateId?: string;
  emailjsPublicKey?: string;

  // Shipping Configuration
  freeShippingThreshold?: number;
  flatShippingRate?: number;

  // Footer customization fields
  footerImage?: string;
  footerBrandName?: string;
  footerSubLabel?: string;
  footerNewsletterTitle?: string;
  footerNewsletterText?: string;
  footerBottomNarrative?: string;
  footerInstagramUrl?: string;
  footerLinkedinUrl?: string;
  footerTwitterUrl?: string;
}

export interface UserAccount {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  pincode: string;
  password?: string;
  savedBlends?: string[]; // stored custom blend custom IDs
  orderIds?: string[];
  savedProducts?: string[]; // wishlist product IDs
}

export interface Collection {
  id: string;
  name: string;
  tag?: string;
  icon?: string;
  isBold?: boolean;
  image?: string; // custom cover photo URL or uploaded path
  count?: string; // e.g. "Sacred Absolutes", "7 Blends"
}

export interface Founder {
  id: "vimal" | "aditya";
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
}

/**
 * Checks whether a video URL should be embedded using an iframe (YouTube / Vimeo)
 * or rendered directly using HTML5 <video> (MP4, WebM, base64 data, etc.).
 */
export function isEmbedIframe(url: string): boolean {
  if (!url) return false;
  const lower = url.trim().toLowerCase();
  
  // If it's a direct mp4, webm, ogg, quicktime or custom uploaded file, it is NOT an iframe embed
  if (
    lower.includes(".mp4") || 
    lower.includes(".webm") || 
    lower.includes(".ogg") || 
    lower.includes(".mov") || 
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
}

/**
 * Robustly extracts the 11-character YouTube video ID from any YouTube URL
 * (watch, youtu.be, embed, shorts, live, etc.).
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const cleaned = url.trim();
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = cleaned.match(regExp);
  if (match && match[1] && match[1].length === 11) {
    return match[1];
  }
  const regExpOld = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
  const matchOld = cleaned.match(regExpOld);
  return matchOld && matchOld[2] ? matchOld[2] : null;
}

/**
 * Normalizes regular YouTube/Vimeo URLs to secure, embedded format.
 * Includes optional optimized ambient autoplay parameters for background loops.
 */
export function getEmbedVideoUrl(url: string, isAmbient: boolean = false): string {
  if (!url) return "";
  const trimmed = url.trim();
  
  // Check if it's already a base64 / blob / direct file path
  if (
    trimmed.startsWith("data:") || 
    trimmed.startsWith("blob:") || 
    trimmed.endsWith(".mp4") || 
    trimmed.endsWith(".webm") || 
    trimmed.endsWith(".ogg") || 
    trimmed.endsWith(".mov")
  ) {
    return trimmed;
  }

  // YouTube URLs
  const ytId = extractYouTubeId(trimmed);
  if (ytId) {
    if (isAmbient) {
      return `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0`;
    }
    return `https://www.youtube.com/embed/${ytId}`;
  }

  // Vimeo URLs
  const vimeoReg = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
  const vimeoMatch = trimmed.match(vimeoReg);
  if (vimeoMatch && vimeoMatch[3]) {
    const videoId = vimeoMatch[3];
    if (isAmbient) {
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1&controls=0&playsinline=1`;
    }
    return `https://player.vimeo.com/video/${videoId}`;
  }

  return trimmed;
}






