import { useState, FC } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Droplet, 
  ShoppingCart, 
  CheckCircle2, 
  CornerDownRight, 
  Compass, 
  Copy, 
  Info,
  Clock,
  Wind,
  Shuffle
} from "lucide-react";
import { Product } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface LayeringSalonProps {
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
  onOpenCart: () => void;
}

export const LayeringSalon: FC<LayeringSalonProps> = ({ products, onAddToCart, onOpenCart }) => {
  const [selectedP1Id, setSelectedP1Id] = useState<string>("sandy-hills");
  const [selectedP2Id, setSelectedP2Id] = useState<string>("mitti-attar");
  const [isBlending, setIsBlending] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [blendProgress, setBlendProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"pyramid" | "rituals">("pyramid");
  const [copiedCode, setCopiedCode] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filter out sets or duplicate same products for better blending choices
  const mixableProducts = products.filter(p => !p.id.includes("set") && !p.id.includes("custom"));

  const selectedP1 = products.find(p => p.id === selectedP1Id) || mixableProducts[0] || products[0];
  const selectedP2 = products.find(p => p.id === selectedP2Id) || mixableProducts[4] || mixableProducts[1] || products[1];

  const triggerBlend = () => {
    setIsBlending(true);
    setBlendProgress(0);
    setShowResult(false);
    
    const interval = setInterval(() => {
      setBlendProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsBlending(false);
            setShowResult(true);
          }, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 45);
  };

  const selectRandomPair = () => {
    const idx1 = Math.floor(Math.random() * mixableProducts.length);
    let idx2 = Math.floor(Math.random() * mixableProducts.length);
    while (idx1 === idx2 && mixableProducts.length > 1) {
      idx2 = Math.floor(Math.random() * mixableProducts.length);
    }
    setSelectedP1Id(mixableProducts[idx1].id);
    setSelectedP2Id(mixableProducts[idx2].id);
    setShowResult(false);
    triggerBlend();
  };

  // Deterministically compute matching details based on inputs
  const getCombinationAnalytics = (p1: Product, p2: Product) => {
    const nameHash = p1.name.length + p2.name.length;
    // Generate compatibility score between 84% and 99%
    const compatibilityScore = 84 + (nameHash % 16);
    
    // Custom names based on products
    let signatureName = "Imperial Alchemist Blend";
    let description = "";
    let senceVibe = "Exquisite Sillage Accent";
    let accentVaporColor = "from-amber-400 to-rose-400";
    let harmonyClass = "Perfect Harmony";

    const id1 = p1.id;
    const id2 = p2.id;

    if (id1 === id2) {
      return {
        score: 100,
        name: `Concentrated ${p1.name} Sillage`,
        vibe: "Single-Note Hyper-Projection",
        description: `By double-layering ${p1.name}, you exponentially compound its raw fragrance sillage and projection boundary. This technique forms an ultra-dense olfactory cloud of ${p1.notes.heart[0]} and base-tier oils that commands absolute authority in standard ambient rooms.`,
        tips: [
          "Apply the first spray 15 minutes before leaving your residence to allow the heavy base notes to cure on skin pores.",
          "Apply the second spray directly onto garments or hair fibers to preserve top-tier zesty accents for over 12 hours."
        ],
        harmonyClass: "Pure Essence Resonance",
        color: "from-stone-800 to-amber-600"
      };
    }

    // Pairings matrix
    if ((id1.includes("mitti") && id2.includes("mogra")) || (id2.includes("mitti") && id1.includes("mogra"))) {
      signatureName = "Monsoon Night-Jasmine Rain";
      description = "A magnificent rendering of petrichor-rain fusing with heavy nocturnal blooms. The dry baked terra-cotta clay absorb the wet nectar of Mogra lily, forming an earthy-sweet floral trail reminiscent of Kannauj courtyards at dusk.";
      senceVibe = "Dew-Kissed Floral Petrichor";
      accentVaporColor = "from-emerald-300 to-amber-500";
      harmonyClass = "Transcendent Coexistence";
    } else if ((id1.includes("sandy") && id2.includes("sidr")) || (id2.includes("sandy") && id1.includes("sidr"))) {
      signatureName = "Salted Caramel Saffron Gold";
      description = "The ocean mineral sea salt and crisp dry desert sand accord of Sandy Hills beautifully slice through the opulent, dense, medicinal sweetness of Kashmiri Saffron and Sidr forest honey. Creates an addictive sweet-saline amber halo.";
      senceVibe = "Gourmand Mineral Majesty";
      accentVaporColor = "from-amber-400 to-[#D4BC96]";
      harmonyClass = "Imperial Resonance (Rare)";
    } else if ((id1.includes("island") && id2.includes("sidr")) || (id2.includes("island") && id1.includes("sidr"))) {
      signatureName = "Royal Wilderness Flower Nectar";
      description = "An encounter between raw cedarwood-honeyed woodland forests and narcotic Lakshadweep beach flowers. Luminous plumeria and tiare florals are heavily weighted by gold resinous agarwood, leaving a dense, sweet-breezy trial.";
      senceVibe = "Opulent Tropical Woody";
      accentVaporColor = "from-amber-500 to-rose-500";
      harmonyClass = "Exquisite Contrast";
    } else if ((id1.includes("sandy") && id2.includes("mitti")) || (id2.includes("sandy") && id1.includes("mitti"))) {
      signatureName = "Earthy Coastal Dunes & Silt";
      description = "Blending two profound mineral masterpieces. The dry, salt-crusted sand and bergamot sparks of Sandy Hills perfectly wrap around the deeply ancient, wet baked terra-cotta silt of classical Mitti Attar, invoking raw elements of sand, wind, and fresh water.";
      senceVibe = "Ultra-Mineral Grounded Earth";
      accentVaporColor = "from-amber-500 to-stone-400";
      harmonyClass = "Synergistic Elements";
    } else if ((id1.includes("mogra") && id2.includes("sidr")) || (id2.includes("mogra") && id1.includes("sidr"))) {
      signatureName = "Spiced Saffron Garland";
      description = "Rich, medicinal Kashmiri Saffron Threads and fresh wild forest honey wrap around the creamy white petals of sweet Kannauj Mogra lily. The dry notes of cedarwood underlay the sweet jasmine, creating a royal medieval floral canopy.";
      senceVibe = "Royally Spiced Florals";
      accentVaporColor = "from-rose-400 to-[#D4BC96]";
      harmonyClass = "Master Class Blend";
    } else if ((id1.includes("island") && id2.includes("sandy")) || (id2.includes("island") && id1.includes("sandy"))) {
      signatureName = "Luminous Island Wind & dunes";
      description = "Fresh mountain saltwater and rich coconut nectar notes. Tiare blossom buds and wild orchid elements are uplifted by zesty Italian bergamot, generating an incredibly light, airy, and ultra-happy coastal sunshine presence.";
      senceVibe = "Breezy Aquatic Citrus Flower";
      accentVaporColor = "from-cyan-300 to-amber-300";
      harmonyClass = "Effortless Symphony";
    } else {
      // Dynamic fallback custom compound generator
      const name1 = p1.name.replace(" EDP", "").replace(" Attar", "");
      const name2 = p2.name.replace(" EDP", "").replace(" Attar", "");
      signatureName = `${name1} & ${name2} Imperium Fusion`;
      description = `The classical ${p1.notes.base[0]} and earthy accents of ${p1.name} act as an anchor, while the radiant headspace of ${p2.name} introduces high-octane notes of ${p2.notes.top[0]}. Together, they balance heavy physical projection with a lingering, modern olfactory wake of ${p1.notes.heart[0] || "resins"}.`;
      senceVibe = "Royal Bespoke Micro-Accord";
      accentVaporColor = "from-rose-400 to-amber-400";
      harmonyClass = "High Structural Symmetry";
    }

    // Merge notes lists
    const mergedTop = Array.from(new Set([...(p1.notes?.top || []), ...(p2.notes?.top || [])])).slice(0, 4);
    const mergedHeart = Array.from(new Set([...(p1.notes?.heart || []), ...(p2.notes?.heart || [])])).slice(0, 4);
    const mergedBase = Array.from(new Set([...(p1.notes?.base || []), ...(p2.notes?.base || [])])).slice(0, 4);

    return {
      score: compatibilityScore,
      name: signatureName,
      vibe: senceVibe,
      description: description,
      tips: [
        `Base Anchor Application: Apply 1-2 droplets of the denser scent — ${p1.price < p2.price ? p1.name : p2.name} — directly to pulse points (wrist, center of chest) first.`,
        `Complementary Overlay: Wait exactly 60 seconds to allow the bottom oils to bond, then mist the secondary scent — ${p1.price >= p2.price ? p1.name : p2.name} — from 6 inches away.`,
        "Garment Halo Tip: Gently mist the combination onto outer fabrics (scarves, collars) to allow the airy top notes to project cleanly as you move."
      ],
      color: accentVaporColor,
      harmonyClass: harmonyClass,
      mergedTop,
      mergedHeart,
      mergedBase
    };
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("ALCHEMY15");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleAddPairToCart = (p1: Product, p2: Product) => {
    // Add first product to cart
    onAddToCart(p1, p1.size || "50 ml");
    
    // Add second product to cart (if different)
    if (p1.id !== p2.id) {
      setTimeout(() => {
        onAddToCart(p2, p2.size || "50 ml");
        setNotification(`Added both ${p1.name} and ${p2.name} layering set to your shopping bag with ALCHEMY15 privilege!`);
        setTimeout(() => setNotification(null), 5000);
      }, 300);
    } else {
      setNotification(`Added two bottles of ${p1.name} (Hyper-Sillage layering set) to your shopping bag!`);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const currentAnalysis = getCombinationAnalytics(selectedP1, selectedP2);

  return (
    <section 
      className="bg-[#FAF9F5] py-20 sm:py-28 border-b border-sand-200 relative overflow-hidden" 
      id="layering-section"
    >
      {/* Background Watermark/Aesthetics */}
      <div className="absolute top-10 right-10 opacity-[0.03] select-none pointer-events-none hidden lg:block">
        <span className="text-[250px] font-serif leading-none">RUH</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#84663B] font-semibold block mb-2">
            IMPERIAL BLENDING WORKSHOP
          </span>
          <h2 className="text-3xl sm:text-5xl font-light font-display text-stone-900 tracking-wide mb-4">
            Olfactory Layering Salon
          </h2>
          <div className="h-[1px] w-12 bg-amber-600/40 mx-auto mt-4 mb-4"></div>
          <p className="text-sm text-stone-600 font-light leading-relaxed max-w-lg mx-auto">
            The grandest secret of ancient slow-perfumery is layering. Fuse any two pure botanical extractions into a personalized signature accord with computed harmonizations.
          </p>
        </div>

        {/* NOTIFICATION TOAST */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 bg-stone-900 text-stone-100 px-6 py-4 rounded-xl shadow-2xl z-[9999] border border-stone-800 text-xs flex items-center gap-3 max-w-md text-center"
              id="layering-notification-toast"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WORKSHOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SELECTION BOX (5 COLS) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between bg-white border border-stone-200/60 p-6 sm:p-8 rounded-3xl shadow-sm">
            <div>
              <h3 className="text-lg font-serif tracking-wide text-stone-900 mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#84663B]" />
                <span>Select Scent Chapters</span>
              </h3>

              {/* PRODUCT 1 SELECTOR */}
              <div className="mb-6">
                <label className="text-[9.5px] uppercase tracking-widest text-[#84663B] font-semibold block mb-2">
                  First Fragrance Layer (Base Anchor)
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <select
                    value={selectedP1Id}
                    onChange={(e) => {
                      setSelectedP1Id(e.target.value);
                      setShowResult(false);
                    }}
                    className="w-full text-xs bg-stone-50 border border-stone-200 hover:border-stone-400 focus:outline-none p-3.5 rounded-xl font-medium text-stone-800 transition-colors"
                    id="perfume-select-1"
                  >
                    {mixableProducts.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.category}) - ₹{p.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Micro Preview Product 1 */}
                <div className="mt-3 flex items-center gap-3.5 bg-stone-50/50 p-2.5 rounded-xl border border-stone-100">
                  <img 
                    src={selectedP1.image} 
                    alt={selectedP1.name} 
                    className="w-[48px] h-[48px] rounded-lg object-cover border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-stone-800">{selectedP1.name}</h4>
                    <p className="text-[10px] text-stone-500 font-light truncate max-w-[240px] italic">"{selectedP1.tagline}"</p>
                  </div>
                </div>
              </div>

              {/* INTERACTION LINKING ROW */}
              <div className="flex items-center justify-center py-1">
                <span className="w-8 h-[1px] bg-stone-200" />
                <span className="text-[10px] uppercase font-mono px-3 text-stone-400 font-semibold">with</span>
                <span className="w-8 h-[1px] bg-stone-200" />
              </div>

              {/* PRODUCT 2 SELECTOR */}
              <div className="mt-4 mb-6">
                <label className="text-[9.5px] uppercase tracking-widest text-[#84663B] font-semibold block mb-2">
                  Second Fragrance Layer (Olfactory Overlay)
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <select
                    value={selectedP2Id}
                    onChange={(e) => {
                      setSelectedP2Id(e.target.value);
                      setShowResult(false);
                    }}
                    className="w-full text-xs bg-stone-50 border border-stone-200 hover:border-stone-400 focus:outline-none p-3.5 rounded-xl font-medium text-stone-800 transition-colors"
                    id="perfume-select-2"
                  >
                    {mixableProducts.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.category}) - ₹{p.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Micro Preview Product 2 */}
                <div className="mt-3 flex items-center gap-3.5 bg-stone-50/50 p-2.5 rounded-xl border border-stone-100">
                  <img 
                    src={selectedP2.image} 
                    alt={selectedP2.name} 
                    className="w-[48px] h-[48px] rounded-lg object-cover border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-stone-800">{selectedP2.name}</h4>
                    <p className="text-[10px] text-stone-500 font-light truncate max-w-[240px] italic">"{selectedP2.tagline}"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION TRIGGERS */}
            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={triggerBlend}
                disabled={isBlending}
                className="w-full py-3.5 bg-[#84663B] hover:bg-stone-900 disabled:bg-stone-300 text-white font-medium text-xs uppercase tracking-[0.2em] rounded-xl shadow-md transition-all duration-300 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 font-display"
                id="btn-blend-trigger"
              >
                {isBlending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Blending Botanical Keys...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                    <span>Layer Scent Signatures</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={selectRandomPair}
                disabled={isBlending}
                className="w-full py-2.5 border border-stone-300 hover:border-stone-800 text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 font-medium text-[10.5px] uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                <Shuffle className="w-3.5 h-3.5 text-stone-500" />
                <span>Shuffle Masterpiece Combo</span>
              </button>
            </div>
          </div>

          {/* RIGHT SCREEN PORT (7 COLS - VISUALIZER / BLEND REPORT) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center bg-stone-950 rounded-3xl border border-stone-800 overflow-hidden relative shadow-2xl p-6 sm:p-10 text-[#FAFAFA] min-h-[500px]">
            
            {/* Dark Golden Ambient glow behind */}
            <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-[#84663B]/10 blur-[100px] pointer-events-none select-none z-0" />

            {/* STATE A: INTRO / STEADY STATE */}
            {!isBlending && !showResult && (
              <div className="relative z-10 text-center py-10 px-4 flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 rounded-full bg-stone-900 border border-[#D4BC96]/20 flex items-center justify-center mb-6 animate-pulse">
                  <Layers className="w-8 h-8 text-[#D4BC96]" />
                </div>
                <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#D4BC96] font-semibold mb-2">Awaiting Compound Fusion</p>
                <h4 className="text-xl font-serif text-stone-200 tracking-wide mb-3">Begin Olfactory Layering</h4>
                <p className="text-xs text-stone-400 font-light max-w-sm mx-auto leading-relaxed">
                  Select your base anchor fragrance and overlay accent from the left catalog, then initiate the alchemy cycle to extract the synergy mapping.
                </p>
                <button
                  type="button"
                  onClick={triggerBlend}
                  className="mt-6 px-5 py-2.5 border border-[#D4BC96]/30 text-[#D4BC96] hover:text-white hover:border-[#D4BC96] font-serif text-[11px] uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
                >
                  Fuse Scent Cards
                </button>
              </div>
            )}

            {/* STATE B: ACTIVE BLENDING CYCLE */}
            {isBlending && (
              <div className="relative z-10 text-center py-10 px-4 flex flex-col items-center justify-center h-full">
                {/* Simulated Glass Alchemy Flask container */}
                <div className="relative w-40 h-40 bg-stone-900 border-2 border-stone-800 rounded-full flex items-center justify-center overflow-hidden mb-8 shadow-inner shadow-black/80">
                  
                  {/* Internal fluid progress */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-[#84663B]/20 origin-bottom"
                    style={{ height: `${blendProgress}%` }}
                    transition={{ ease: "easeOut" }}
                  />

                  {/* Falling droplet A */}
                  <motion.div 
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: [0, 40], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeIn" }}
                    className="absolute top-4 left-1/3 z-20"
                  >
                    <Droplet className="w-5 h-5 text-[#D4BC96] fill-current" />
                  </motion.div>

                  {/* Falling droplet B */}
                  <motion.div 
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: [0, 35], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.0, delay: 0.5, ease: "easeIn" }}
                    className="absolute top-4 right-1/3 z-20"
                  >
                    <Droplet className="w-4 h-4 text-amber-500 fill-current" />
                  </motion.div>

                  {/* Rising steam vapor */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 items-end pointer-events-none select-none">
                    <span className="w-1 h-12 bg-white/5 rounded-full animate-pulse block" />
                    <span className="w-[1.5px] h-16 bg-white/10 rounded-full animate-bounce block" />
                    <span className="w-1 h-10 bg-white/5 rounded-full animate-pulse block" />
                  </div>

                  <Layers className="w-10 h-10 text-[#D4BC96]/30 z-10 relative" />
                </div>

                <p className="text-[9.5px] uppercase font-mono tracking-[0.25em] text-[#D4BC96]">Compounding Scent Profiles</p>
                <div className="w-48 h-1 bg-stone-900 mt-4 rounded-full overflow-hidden relative border border-stone-800">
                  <div className="h-full bg-amber-500" style={{ width: `${blendProgress}%` }} />
                </div>
                <span className="text-[10px] text-stone-500 font-mono mt-2">{blendProgress}% cured</span>
              </div>
            )}

            {/* STATE C: BLENDED OUTCOME RESULT CONTAINER */}
            {showResult && !isBlending && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col justify-between h-full"
                id="layering-success-card"
              >
                {/* Title & Harmony Badge row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-800 pb-5 mb-5">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#D4BC96] font-bold block mb-1">
                      {currentAnalysis.vibe}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif text-white tracking-wide">
                      {currentAnalysis.name}
                    </h3>
                  </div>

                  {/* Synergy Match percentage circle */}
                  <div className="flex items-center gap-3 bg-stone-900 p-2.5 px-4 rounded-2xl border border-[#D4BC96]/10">
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4BC96] font-semibold">{currentAnalysis.harmonyClass}</span>
                      <span className="text-[9px] text-stone-400 font-mono">Synergy Rating</span>
                    </div>
                    <div className="text-2xl font-bold font-mono text-amber-500">
                      {currentAnalysis.score}%
                    </div>
                  </div>
                </div>

                {/* Scent Descriptive paragraph */}
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-6 italic select-all">
                  "{currentAnalysis.description}"
                </p>

                {/* TAB SWITCHER */}
                <div className="flex border-b border-stone-900 mb-5 text-[11px] font-mono tracking-widest font-semibold uppercase">
                  <button
                    type="button"
                    onClick={() => setActiveTab("pyramid")}
                    className={`pb-2 px-1 border-b-2 mr-6 transition-all cursor-pointer ${activeTab === "pyramid" ? "border-[#D4BC96] text-white" : "border-transparent text-stone-500 hover:text-stone-300"}`}
                  >
                    Olfactory Pyramid
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("rituals")}
                    className={`pb-2 px-1 border-b-2 transition-all cursor-pointer ${activeTab === "rituals" ? "border-[#D4BC96] text-white" : "border-transparent text-stone-500 hover:text-stone-300"}`}
                  >
                    Usage Rituals
                  </button>
                </div>

                {/* TAB WINDOWS */}
                <div className="flex-1 min-h-[140px] mb-6">
                  {activeTab === "pyramid" ? (
                    <div className="space-y-4">
                      {/* Top Notes */}
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold block mb-1.5 flex items-center gap-1.5 font-mono">
                          <Wind className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Fused Top-Accents (Evaporates 0-1 hrs)</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentAnalysis.mergedTop?.map((note, i) => (
                            <span key={i} className="text-[10px] bg-stone-900 hover:bg-[#84663B]/25 transition-colors border border-stone-800 px-3 py-1 rounded-md text-stone-300 font-medium">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Heart Notes */}
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#D4BC96] font-bold block mb-1.5 flex items-center gap-1.5 font-mono">
                          <Droplet className="w-3.5 h-3.5 text-[#D4BC96]" />
                          <span>Core Accord Heart (Projects 1-4 hrs)</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentAnalysis.mergedHeart?.map((note, i) => (
                            <span key={i} className="text-[10px] bg-[#84663B]/10 hover:bg-[#84663B]/25 transition-colors border border-[#84663B]/20 px-3 py-1 rounded-md text-[#D4BC96] font-semibold">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Base Notes */}
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-rose-400 font-bold block mb-1.5 flex items-center gap-1.5 font-mono">
                          <Clock className="w-3.5 h-3.5 text-rose-400" />
                          <span>Persistent Bottom Base (Anchors 4-12 hrs)</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentAnalysis.mergedBase?.map((note, i) => (
                            <span key={i} className="text-[10px] bg-stone-900 hover:bg-[#84663B]/25 transition-colors border border-stone-800 px-3 py-1 rounded-md text-stone-300 font-medium">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {currentAnalysis.tips?.map((tip, i) => (
                        <div key={i} className="flex gap-2.5 text-xs text-stone-300 leading-normal font-light bg-stone-900/40 p-3 rounded-xl border border-stone-900">
                          <CornerDownRight className="w-4 h-4 text-[#D4BC96] flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* BOTTOM ROYAL DEAL CHECKOUT ROW */}
                <div className="border-t border-stone-800 pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  {/* Promotion Offer Code block */}
                  <div className="bg-[#84663B]/10 border border-[#84663B]/20 rounded-xl p-3 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[8.5px] uppercase font-mono tracking-widest block text-[#D4BC96] font-semibold">Exclusive Blenders Privilege</span>
                      <p className="text-[11px] text-stone-300 font-medium">Use code <b className="text-white">ALCHEMY15</b> for 15% off</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="p-2 bg-stone-900 border border-stone-800 text-stone-400 hover:text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      title="Copy promo code"
                    >
                      {copiedCode ? (
                        <span className="text-[9px] uppercase font-mono font-bold text-emerald-400">Copied</span>
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-stone-300" />
                      )}
                    </button>
                  </div>

                  {/* Add both to bag button */}
                  <button
                    type="button"
                    onClick={() => handleAddPairToCart(selectedP1, selectedP2)}
                    className="py-3 px-6 bg-[#D4BC96] hover:bg-white text-stone-950 font-semibold font-display text-xs uppercase tracking-widest rounded-xl shadow-lg hover:scale-101 cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-stone-950 stroke-[2]" />
                    <span>Purchase Blended Set</span>
                  </button>
                </div>

              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default LayeringSalon;
