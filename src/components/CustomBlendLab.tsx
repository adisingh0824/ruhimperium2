import { useState, useEffect } from "react";
import { Sliders, FlaskConical, HelpCircle, Sparkles, Plus, Check, ShoppingBag, Wind } from "lucide-react";
import { Product } from "../types";

interface CustomBlendLabProps {
  onAddCustomToCart: (customProduct: Product) => void;
}

export default function CustomBlendLab({ onAddCustomToCart }: CustomBlendLabProps) {
  const [citrus, setCitrus] = useState(40);
  const [woods, setWoods] = useState(30);
  const [spices, setSpices] = useState(30);
  const [ordered, setOrdered] = useState(false);

  // Normalize percentages so they always match 100 on slider adjustments!
  const handleSlider = (type: "citrus" | "woods" | "spices", value: number) => {
    if (type === "citrus") {
      const remainder = 100 - value;
      const totalRemainder = (woods + spices) || 1;
      setCitrus(value);
      setWoods(Math.round((woods / totalRemainder) * remainder));
      setSpices(Math.round((spices / totalRemainder) * remainder));
    } else if (type === "woods") {
      const remainder = 100 - value;
      const totalRemainder = (citrus + spices) || 1;
      setWoods(value);
      setCitrus(Math.round((citrus / totalRemainder) * remainder));
      setSpices(Math.round((spices / totalRemainder) * remainder));
    } else {
      const remainder = 100 - value;
      const totalRemainder = (citrus + woods) || 1;
      setSpices(value);
      setCitrus(Math.round((citrus / totalRemainder) * remainder));
      setWoods(Math.round((woods / totalRemainder) * remainder));
    }
  };

  // Ensure strict sum to 100 on mount or small rounding fluctuations
  useEffect(() => {
    const total = citrus + woods + spices;
    if (total !== 100) {
      const diff = 100 - total;
      setCitrus((prev) => Math.max(0, prev + diff));
    }
  }, [citrus, woods, spices]);

  // Generate dynamic, bespoke fragrance titles based on primary notes percentages
  const getDynamicName = () => {
    if (citrus >= 50 && woods >= spices) return "Sunkissed Sandalwood Ridge";
    if (citrus >= 50 && spices > woods) return "Zesty Caravan Winds";
    if (woods >= 50 && citrus >= spices) return "Sacred Mysore Canopy";
    if (woods >= 50 && spices > citrus) return "Oud Royal Sandstone";
    if (spices >= 50 && woods >= citrus) return "Spice Caravan Oasis";
    if (spices >= 50 && citrus > woods) return "Tangerine Clove Breeze";
    
    // Triple balance
    return "The Wayfarer's Trilogy Accord";
  };

  const getDynamicDescription = () => {
    return `A custom-formulated bespoke travel fragrance containing ${citrus}% sparkling Calabrian Citrus, ${woods}% ultra-dense Mysore Sandalwood woods, and ${spices}% warm spice/Madagascar vanilla extract.`;
  };

  // Dynamic perfume color overlay based on ratios!
  const getLiquidColor = () => {
    const r = Math.round((spices / 100) * 120 + 150); // warm copper-red bias
    const g = Math.round((citrus / 100) * 110 + 130); // yellow bias
    const b = Math.round((woods / 100) * 70 + 80);    // dark wood base
    return `rgba(${r}, ${g}, ${b}, 0.75)`;
  };

  const handleOrderCustomBlend = () => {
    const customProductObj: Product = {
      id: `custom-blend-${Date.now()}`,
      name: `Custom: ${getDynamicName()}`,
      tagline: `Bespoke Wayfarer Blend (${citrus}% Citrus / ${woods}% Wood / ${spices}% Spice)`,
      price: 1999, // Custom formulas attract a premium!
      salePrice: 1499,
      size: "50 ml",
      ingredients: [`${citrus}% Zesty Citrus Oil`, `${woods}% Sacred Mysore Sandalwood`, `${spices}% Warm Spices & Clove`],
      longevity: "Bespoke concentration (10+ hours)",
      projection: "Room-filling customized sillage",
      description: getDynamicDescription(),
      story: `Hand-mixed in our digital cooperage laboratory. This exact composition maximizes olfactory balance based on your preferred notes ratios: ${citrus}% fresh sunrise, ${woods}% sacred soil, and ${spices}% mountain campfire fires.`,
      notes: {
        top: [`Bespoke Citrus Tops (${citrus}%)`],
        heart: [`Bespoke Spices & Woods (${spices}%)`],
        base: [`Sacred Sandalwood Resonance (${woods}%)`]
      },
      destination: "Your Custom Log",
      destinationState: "Bespoke",
      image: "custom_blend_flask", // Special flag in Cart drawer to show customized thumbnail color!
      rating: 5.0,
      reviewsCount: 1
    };

    onAddCustomToCart(customProductObj);
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3000);
  };

  return (
    <section className="bg-sand-50 py-16 sm:py-24 border-b border-sand-200" id="scent-lab-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-medium block mb-2">
            The Digital Cooperage
          </span>
          <h2 className="text-3xl sm:text-5xl font-light font-display text-sand-900 tracking-wide mb-6">
            Bespoke Scent Blend Lab
          </h2>
          <div className="h-[1px] w-12 bg-[#D4BC96] mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-sand-500 font-light leading-relaxed">
            Unleash your inner alchemist. Drag the sliders to formulate a bespoke scent ratio. Our compounding simulator will generate a custom title, sensory color gradient, and structural olfactory log.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slider controls left (7 cols) */}
          <div className="lg:col-span-6 bg-white border border-sand-200 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="flex items-center space-x-2 text-[10px] tracking-widest text-[#D4BC96] uppercase font-mono mb-8">
              <Sliders className="w-3.5 h-3.5" />
              <span>ALCHEMICAL RATIOCINATION VALUES</span>
            </div>

            <div className="space-y-8">
              
              {/* Citrus Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm tracking-wide text-sand-900 font-serif">Aura Citrus Balance</span>
                    <span className="text-[10px] text-sand-400 block font-light">Mandarin, California Bergamot, Neroli</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-sand-700 bg-sand-100 px-2.5 py-1 rounded">
                    {citrus}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={citrus}
                  onChange={(e) => handleSlider("citrus", parseInt(e.target.value))}
                  className="w-full h-1 bg-sand-100 rounded-lg appearance-none cursor-pointer accent-[#D4BC96]"
                />
              </div>

              {/* Woods Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm tracking-wide text-sand-900 font-serif">Sacred Sandalwood & Amber Wood</span>
                    <span className="text-[10px] text-sand-400 block font-light">Mysore Heartwood, Warm Benzoin, Cedar</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-sand-700 bg-sand-100 px-2.5 py-1 rounded">
                    {woods}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={woods}
                  onChange={(e) => handleSlider("woods", parseInt(e.target.value))}
                  className="w-full h-1 bg-sand-100 rounded-lg appearance-none cursor-pointer accent-[#D4BC96]"
                />
              </div>

              {/* Spices Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm tracking-wide text-sand-900 font-serif">Malabar Spice & Gourmet Vanilla</span>
                    <span className="text-[10px] text-sand-400 block font-light">Green Cardamom Seeds, Clove, Madagascar Pods</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-sand-700 bg-sand-100 px-2.5 py-1 rounded">
                    {spices}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={spices}
                  onChange={(e) => handleSlider("spices", parseInt(e.target.value))}
                  className="w-full h-1 bg-sand-100 rounded-lg appearance-none cursor-pointer accent-[#D4BC96]"
                />
              </div>

            </div>

            {/* Note properties summary */}
            <div className="border-t border-sand-200 mt-10 pt-6 space-y-3.5">
              <div className="flex items-center gap-2 text-xs text-sand-500 font-light">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4BC96]" />
                <span>Base fluid carrier: <span className="font-medium text-sand-800">Organic Sugarcane Alcohol Perfume</span></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-sand-500 font-light">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4BC96]" />
                <span>Concentration factor: <span className="font-medium text-sand-800">22% Elite Extrait de Parfum</span></span>
              </div>
            </div>

          </div>

          {/* Visual flask generator right (5 cols) */}
          <div className="lg:col-span-6 bg-[#2D2926] hover:scale-101 transition-all rounded-3xl p-8 sm:p-12 text-white relative shadow-xl overflow-hidden flex flex-col justify-between items-center text-center group min-h-[480px]">
            {/* Ambient smoky ring background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,188,150,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute top-4 left-4 text-[7px] text-sand-400 uppercase tracking-widest font-mono flex items-center gap-1">
              <Wind className="w-3 h-3 text-[#D4BC96] animate-pulse" />
              <span>LIVE OLFACTORY METRIC OUTLINES</span>
            </div>

            {/* Title display */}
            <div className="z-10 mt-6 max-w-sm">
              <span className="text-[10px] text-[#D4BC96] uppercase tracking-[0.25em] font-medium block mb-2">
                Compound Formulated
              </span>
              <h3 className="text-2xl sm:text-3xl font-light font-display text-[#FAFAFA] tracking-widest group-hover:text-[#D4BC96] transition-colors duration-300 font-display">
                {getDynamicName()}
              </h3>
              <p className="text-[11px] text-sand-400 font-light mt-2 max-w-xs mx-auto">
                {getDynamicDescription()}
              </p>
            </div>

            {/* Flacon Visualizer */}
            <div className="relative my-8 w-32 h-44 flex items-end justify-center">
              {/* Bottle silhouette */}
              <div className="absolute inset-0 border-2 border-sand-400 rounded-2xl p-2.5 flex flex-col justify-between items-center shadow-lg bg-black/40">
                {/* Spray nozzle */}
                <div className="w-6 h-5 bg-[#D4BC96] -mt-7 rounded-sm border border-sand-600 flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full" />
                </div>
                {/* Brand stamp */}
                <div className="text-center z-10 select-none pt-4">
                  <p className="text-[10px] font-display uppercase tracking-[0.15em] text-white">RUH IMPERIUM</p>
                  <p className="text-[5.5px] uppercase tracking-widest text-[#D4BC96] -mt-0.5 font-light">BESPOKE</p>
                </div>
                {/* Fluid percentage text label */}
                <div className="text-[9.5px] font-mono tracking-widest text-white/50 pb-2 z-10">
                  50 ML
                </div>
              </div>

              {/* Dynamic chemical liquid rendering inside */}
              <div 
                className="w-[118px] rounded-b-xl transition-all duration-1000 ease-out flex items-center justify-center text-[10px] font-mono font-bold text-white/60 mb-1"
                style={{ 
                  height: "105px", 
                  backgroundColor: getLiquidColor(),
                  boxShadow: "inset 0 0 15px rgba(255,255,255,0.15)"
                }}
              >
                <div className="flex flex-col items-center gap-1 select-none font-sans font-normal text-[8.5px] tracking-widest text-black/80">
                  <FlaskConical className="w-5 h-5 opacity-60 text-black/80" />
                  <span>22% VOL</span>
                </div>
              </div>
            </div>

            {/* Purchase action */}
            <div className="w-full z-10 mb-2">
              <button
                type="button"
                onClick={handleOrderCustomBlend}
                className="w-full md:max-w-xs mx-auto py-3.5 bg-[#D4BC96] hover:bg-white hover:text-black transition-all font-display text-[11px] uppercase tracking-[0.2em] font-medium rounded shadow flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                {ordered ? (
                  <>
                    <Check className="w-4 h-4 animate-scale-up" />
                    <span>MUTATED ACCORD IMPORTED</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD CUSTOM BLEND (1,499)</span>
                  </>
                )}
              </button>
              <p className="text-[9px] text-sand-500 font-light mt-2.5 uppercase tracking-wider">
                Compounded with supreme Extrait-level ingredients. Custom orders are final sale.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
