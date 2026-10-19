import { useState, useEffect, FormEvent } from "react";
import { 
  X, 
  Search, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Gift,
  ArrowRight,
  ShieldCheck,
  MapPin as PinIcon,
  Loader2
} from "lucide-react";
import { Order } from "../types";
import { db } from "../config/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { safeStorage } from "../App";

interface OrderTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const maskCustomerEmail = (email?: string): string => {
  if (!email) return "—";
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
  return `${maskedName}@${domain}`;
};

export default function OrderTracker({ isOpen, onClose, orders }: OrderTrackerProps) {
  const [trackingCode, setTrackingCode] = useState("");
  const [searchResult, setSearchResult] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);

  // Synchronize active tracking result with real-time orders updates from Firestore
  useEffect(() => {
    if (searchResult) {
      const fresh = orders.find(
        (o) => o.id.trim().toUpperCase() === searchResult.id.trim().toUpperCase() ||
               o.trackingCode.trim().toUpperCase() === searchResult.trackingCode.trim().toUpperCase()
      );
      if (fresh && JSON.stringify(fresh) !== JSON.stringify(searchResult)) {
        setSearchResult(fresh);
      }
    }
  }, [orders, searchResult]);

  if (!isOpen) return null;

  const handleTrackSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const queryTerm = trackingCode.trim().toUpperCase();
    if (!queryTerm) return;

    // 1. Check in passed orders (admin or local placed orders)
    const localMatch = orders.find(
      (o) => o.trackingCode.trim().toUpperCase() === queryTerm || o.id.trim().toUpperCase() === queryTerm
    );
    if (localMatch) {
      setSearchResult(localMatch);
      return;
    }

    // 2. Check in user's placed orders stored locally on this device
    try {
      const placedRaw = safeStorage.getItem("ruh-user-placed-orders");
      if (placedRaw) {
        const list: Order[] = JSON.parse(placedRaw);
        const placedMatch = list.find(
          (o) => o.trackingCode.trim().toUpperCase() === queryTerm || o.id.trim().toUpperCase() === queryTerm
        );
        if (placedMatch) {
          setSearchResult(placedMatch);
          return;
        }
      }
    } catch (e) {}

    // 3. Directly query Firestore for this specific single order without listing all orders
    setIsQuerying(true);
    try {
      // First try direct document lookup by order ID
      const directDoc = await getDoc(doc(db, "orders", queryTerm));
      if (directDoc.exists()) {
        setSearchResult(directDoc.data() as Order);
        setIsQuerying(false);
        return;
      }

      // Second try querying by trackingCode
      const q = query(collection(db, "orders"), where("trackingCode", "==", queryTerm));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        setSearchResult(qSnap.docs[0].data() as Order);
        setIsQuerying(false);
        return;
      }

      setSearchResult(null);
    } catch (err) {
      console.warn("Tracking query error:", err);
      setSearchResult(null);
    } finally {
      setIsQuerying(false);
    }
  };

  const getStatusStep = (status: Order["status"]): number => {
    switch (status) {
      case "Processing": return 1;
      case "Dispatched": return 2;
      case "In Transit": return 3;
      case "Out for Delivery": return 4;
      case "Delivered": return 5;
      case "Cancelled": return -1;
      default: return 1;
    }
  };

  const statusStep = searchResult ? getStatusStep(searchResult.status) : 0;

  // Logistics descriptions
  const steps = [
    { title: "Scent Securing", desc: "Sugarcane alcohol blending and floral extraction verified.", icon: Clock },
    { title: "Sartorial Packaging", desc: "Extract bottled in French glass, nested in travel journal cases.", icon: Gift },
    { title: "Consignment Dispatched", desc: "Secured cargo boarded on India Post Air Speed Logistics.", icon: Truck },
    { title: "In Scent Transit", desc: "En route to nearest regional dispatch center.", icon: MapPin },
    { title: "Delivered", desc: "Hand-delivered by premium transport officer.", icon: CheckCircle2 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2926]/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-sand-50 rounded-2xl shadow-xl overflow-hidden border border-sand-200">
        
        {/* Title / Close Header */}
        <div className="bg-[#2D2926] text-[#FAFAFA] px-6 py-4.5 flex justify-between items-center border-b border-sand-300">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#D4BC96]" />
            <h3 className="text-sm font-sans tracking-widest uppercase font-semibold">
              Live Scent Delivery Tracker
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sand-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="text-center max-w-md mx-auto">
            <p className="text-xs text-sand-500 font-light leading-relaxed">
              Input the unique **Tracking Code** (e.g. `RP-XXXXX-IN` generated upon checkout) or **Order ID** to query the status of your artisanal extract shipment.
            </p>
          </div>

          <form onSubmit={handleTrackSubmit} className="flex gap-2 max-w-lg mx-auto">
            <input
              type="text"
              required
              placeholder="Enter Tracking Code (E.g. RP-38241-IN)"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              className="flex-1 bg-white border border-sand-300 rounded-lg px-4 py-3 text-xs font-mono font-bold uppercase select-all tracking-wider outline-none focus:ring-1 focus:ring-[#D4BC96]"
            />
            <button
              type="submit"
              disabled={isQuerying}
              className="px-6 py-3 bg-[#2D2926] hover:bg-[#D4BC96] text-[#FAFAFA] text-xs uppercase tracking-widest font-mono rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-75"
            >
              {isQuerying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#D4BC96]" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Query</span>
                </>
              )}
            </button>
          </form>

          {/* RESULTS DISPLAY PANEL */}
          {hasSearched && (
            <div className="space-y-6 border-t border-sand-200 pt-6">
              {!searchResult ? (
                /* NOT FOUND ERROR STATE */
                <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
                  <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto stroke-[1.5]" />
                  <h4 className="text-sm font-serif font-semibold text-sand-800">Consignment Not Discovered</h4>
                  <p className="text-xs text-sand-500 max-w-md mx-auto leading-relaxed">
                    No active record matches "<span className="font-mono text-sand-800 font-bold select-all bg-sand-200 px-1 rounded">{trackingCode.toUpperCase()}</span>". If you recently initialized checkout, please allow a few minutes for the hydro-distillation record to seed.
                  </p>
                </div>
              ) : (
                /* ORDER DISCOVERED SECURE WAYBILL CARD */
                <div className="space-y-6">
                  
                  {/* Waybill quick statistics details */}
                  <div className="bg-white rounded-xl border border-sand-200 p-4.5 shadow-xs grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-[#D4BC96] font-bold block">Consignment Recipient</span>
                      <p className="font-semibold text-sand-800 leading-none mt-1">{searchResult.fullName}</p>
                      <p className="text-sand-400 text-[10px] sm:inline block mt-0.5">{maskCustomerEmail(searchResult.email)}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[8px] uppercase tracking-widest text-[#D4BC96] font-bold block">Secure Consignment Status</span>
                      <p className={`font-mono font-bold uppercase tracking-wider text-[11px] px-2.5 py-1.5 rounded-lg border inline-block mt-1 ${
                        searchResult.status === "Delivered" ? "text-green-700 bg-green-50 border-green-200" :
                        searchResult.status === "Cancelled" ? "text-red-700 bg-red-50 border-red-200" :
                        "text-[#D4BC96] bg-sand-900 text-white border-sand-900"
                      }`}>
                        {searchResult.status}
                      </p>
                    </div>

                    <div className="border-t border-sand-100 pt-3">
                      <span className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block">Delivery Destination</span>
                      <p className="text-[10px] text-sand-600 font-light leading-snug mt-0.5">PIN {searchResult.pincode} (Secured Destination)</p>
                    </div>

                    <div className="text-right border-t border-sand-100 pt-3">
                      <span className="text-[8px] uppercase tracking-widest text-sand-400 font-mono block">Courier Service Desk</span>
                      <p className="text-[10.5px] text-sand-700 font-medium leading-none mt-1">India Post Speed Cargo (Air)</p>
                    </div>
                  </div>

                  {/* CANCELLED OVERRIDE BLOCK */}
                  {statusStep === -1 ? (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-5 rounded-2xl text-center space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wider font-mono">Consignment Cancelled</h4>
                      <p className="text-xs text-red-600 leading-relaxed max-w-md mx-auto">This batch has been marked as cancelled. Please coordinate directly with our support desk if this represents any transactional discrepancy.</p>
                    </div>
                  ) : (
                    /* HORIZONTAL/VERTICAL TIMELINE PROGRESS TRACKS */
                    <div className="bg-white rounded-xl border border-sand-200 p-5 shadow-xs">
                      <span className="text-[8.5px] uppercase tracking-[0.2em] text-[#D4BC96] font-semibold block mb-4">LOGISTICS TIMELINE LIFECYCLE</span>
                      
                      <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-sand-200">
                        {steps.map((st, index) => {
                          // Determine if this step is ticked based on statusStep
                          // Let's split steps:
                          // Process step 1 mapping: Processing (index 0, 1 active)
                          // Packaging step 2 mapping: Processing (index 1 active)
                          // Dispatched step 3 mapping: statusStep >= 2 (index 2 active)
                          // Transit step 4 mapping: statusStep >= 3 (index 3 active)
                          // Delivered step 5 mapping: statusStep >= 5 (index 4 active)
                          const isComplete = (index <= 1) || 
                                             (index === 2 && statusStep >= 2) || 
                                             (index === 3 && statusStep >= 3) || 
                                             (index === 4 && statusStep >= 5);
                                             
                          const isActive = (index === 0 && statusStep === 1) ||
                                           (index === 1 && statusStep === 1) ||
                                           (index === 2 && statusStep === 2) ||
                                           (index === 3 && (statusStep === 3 || statusStep === 4)) ||
                                           (index === 4 && statusStep === 5);

                          const StepIcon = st.icon;

                          return (
                            <div key={index} className="relative flex items-start gap-4 text-xs transition-opacity duration-300">
                              
                              {/* Indicator Icon badge */}
                              <div className={`absolute -left-[20px] w-5.5 h-5.5 rounded-full z-10 flex items-center justify-center border-2 transition-all duration-350 ${
                                isActive ? "bg-[#2D2926] text-white border-[#2D2926] scale-110" :
                                isComplete ? "bg-[#D4BC96] text-white border-[#D4BC96]" :
                                "bg-white text-sand-300 border-sand-200"
                              }`}>
                                <StepIcon className="w-3 h-3" />
                              </div>

                              <div className="pl-4">
                                <h5 className={`font-serif text-sm font-semibold leading-none ${
                                  isActive ? "text-[#D4BC96]" :
                                  isComplete ? "text-sand-800" : "text-sand-350"
                                }`}>
                                  {st.title} 
                                  {isActive && <span className="ml-2 font-mono text-[8px] bg-sand-900 text-white uppercase px-1.5 py-0.5 rounded leading-none">Live Transit</span>}
                                </h5>
                                <p className={`text-[11px] mt-1.5 font-light leading-relaxed ${
                                  isActive || isComplete ? "text-sand-500" : "text-sand-300"
                                }`}>
                                  {st.desc}
                                </p>
                              </div>

                            </div>
                          );
                        })}
                      </div>

                    </div>
                  )}

                  {/* Trust assurance footer block */}
                  <div className="flex bg-sand-100 p-3 rounded-lg items-center gap-2 text-[10px] text-sand-500 font-light">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Real-time logistics verified at the Kannauj hydro-distillation yards.</span>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
