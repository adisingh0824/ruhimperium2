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
}

export interface Coupon {
  code: string;
  discountPercent: number;
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
  sandalwoodStickText?: string;
  sandalwoodStickPrice?: number;
  sandalwoodStickImage?: string;
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
 * Normalizes regular YouTube/Vimeo URLs to secure, embedded format.
 * Includes optional optimized ambient autoplay parameters for background loops.
 */
export function getEmbedVideoUrl(url: string, isAmbient: boolean = false): string {
  if (!url) return "";
  
  // Check if it's already a base64 / blob / direct file path
  if (url.startsWith("data:") || url.startsWith("blob:") || url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg") || url.endsWith(".mov")) {
    return url;
  }

  // YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    const videoId = match[2];
    if (isAmbient) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Vimeo URLs
  const vimeoReg = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
  const vimeoMatch = url.match(vimeoReg);
  if (vimeoMatch && vimeoMatch[3]) {
    const videoId = vimeoMatch[3];
    if (isAmbient) {
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1&controls=0`;
    }
    return `https://player.vimeo.com/video/${videoId}`;
  }

  return url;
}





