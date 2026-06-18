import { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, ShoppingCart, Award, Navigation, MapPin } from "lucide-react";
import { Product } from "../types";

interface ScentFinderQuizProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

interface Question {
  id: number;
  text: string;
  sub: string;
  options: {
    text: string;
    description: string;
    points: Record<string, number>;
    image: string;
  }[];
}

export default function ScentFinderQuiz({ products, onSelectProduct, onAddToCart }: ScentFinderQuizProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1-3: questions, 4: result
  const [points, setPoints] = useState<Record<string, number>>({
    "sandy-hills": 0,
    "island-bloom": 0,
    "sidr-wood": 0
  });
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
 
  const questions: Question[] = [
    {
      id: 1,
      text: "Select your dream travel atmosphere:",
      sub: "Where does your mind escape when you seek inspiration?",
      options: [
        {
          text: "Royal Desert Dune Coastline",
          description: "Mornings crisp with fresh ocean mountain air, golden sunlit sand warm under a cosmic sky.",
          points: { "sandy-hills": 3, "island-bloom": 1 },
          image: "https://images.unsplash.com/photo-1540206276907-fbd77eeaa0a8?auto=format&fit=crop&q=80&w=300"
        },
        {
          text: "An Open Sea Island Orchard",
          description: "Dreamy white sand beaches surrounded by blooming exotic tiare, coconut palms, and gardenias.",
          points: { "island-bloom": 3, "sandy-hills": 1 },
          image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=300"
        },
        {
          text: "Sacred Forest Honey Camp",
          description: "Deep ancient woodland moss, gold honey-dripped cedar barks, and lingering smoky saffron spices.",
          points: { "sidr-wood": 3, "island-bloom": 1 },
          image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=300"
        }
      ]
    },
    {
      id: 2,
      text: "Which olfactory sensory element attracts you most?",
      sub: "Choose the physical aroma that triggers immediate euphoria.",
      options: [
        {
          text: "Coastal Salt, Caramel, and Bergamot",
          description: "Breathtakingly warm, mineral, sweet-saline, blending fresh citrus into warm cozy vanilla dunes.",
          points: { "sandy-hills": 3 },
          image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=crop&fit=crop&q=80&w=300"
        },
        {
          text: "Tiare Flower Buds & Coconut Nectar",
          description: "Exotic, narcotic, sunny-sweet floral, with standard beachy muskiness and clean ocean breezes.",
          points: { "island-bloom": 3 },
          image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=300"
        },
        {
          text: "Gold-Spiced Sidr Honey & Cedar barks",
          description: "Opulent, dense, sweet-woody, merging luxurious raw honey, royal roses, and deep forest smoke.",
          points: { "sidr-wood": 3 },
          image: "https://images.unsplash.com/photo-1595151830531-2974eb3a13d7?auto=format&fit=crop&q=80&w=300"
        }
      ]
    },
    {
      id: 3,
      text: "Choose your preferred projection vibe:",
      sub: "How do you want your traveling presence to register?",
      options: [
        {
          text: "Radiant Golden Whisper",
          description: "An elegant warm halo that stays crisp and saline, evoking effortless style and deep coastal memories.",
          points: { "sandy-hills": 3, "island-bloom": 1 },
          image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=300"
        },
        {
          text: "Sunny & Flowing Beachside Sillage",
          description: "Narcotic white florals that sway with warm breezes, capturing instant happy attention.",
          points: { "island-bloom": 3, "sandy-hills": 1, "sidr-wood": 1 },
          image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=300"
        },
        {
          text: "Rich Honey-Wood Statement Projection",
          description: "Intense, smoky, and absolutely regal. Heavy wood resins and gold honey trailing into the midnight.",
          points: { "sidr-wood": 3 },
          image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=300"
        }
      ]
    }
  ];
 
  const handleStart = () => {
    setCurrentStep(1);
    setPoints({ "sandy-hills": 0, "island-bloom": 0, "sidr-wood": 0 });
    setSelectedAnswers([]);
  };
 
  const handleAnswer = (optionPoints: Record<string, number>, optionIdx: number) => {
    const updatedPoints = { ...points };
    Object.keys(optionPoints).forEach((key) => {
      updatedPoints[key] = (updatedPoints[key] || 0) + optionPoints[key];
    });
    setPoints(updatedPoints);
 
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentStep - 1] = optionIdx;
    setSelectedAnswers(updatedAnswers);
 
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length + 1); // final result
    }
  };
 
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
 
  const handleReset = () => {
    setCurrentStep(0);
    setPoints({ "sandy-hills": 0, "island-bloom": 0, "sidr-wood": 0 });
    setSelectedAnswers([]);
    setCopiedCode(false);
  };
 
  // Compute recommended product
  const getRefProduct = (): Product => {
    let bestId = "sandy-hills";
    let maxVal = -1;
    Object.keys(points).forEach((id) => {
      if (points[id] > maxVal) {
        maxVal = points[id];
        bestId = id;
      }
    });
    return products.find((p) => p.id === bestId) || products[0];
  };

  const recommendedProduct = getRefProduct();

  const handleCopyCode = () => {
    navigator.clipboard.writeText("WAYFARER15");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <section className="bg-sand-50 py-16 sm:py-24 border-b border-sand-200" id="scent-finder-section">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4BC96] font-medium block mb-2">
            The Personal Travel Match
          </span>
          <h2 className="text-2xl sm:text-4xl font-light font-display text-sand-900 tracking-wide mb-3">
            Scent Finder Quiz
          </h2>
          <p className="text-xs text-sand-500 font-light">
            Answer three quick lifestyle prompts to discover which of our signature Eau de Parfums matches your wanderlust soul type.
          </p>
        </div>

        {/* Outer card shell */}
        <div className="bg-white border border-sand-200 rounded-2xl shadow-sm min-h-[460px] flex flex-col justify-between overflow-hidden">
          
          {/* STEP 0: Intro */}
          {currentStep === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center">
              <div className="w-16 h-18 rounded-full bg-gold-50 flex items-center justify-center mb-6 border border-gold-200">
                <Navigation className="w-6 h-6 text-[#D4BC96] animate-pulse" />
              </div>
              <h3 className="text-2xl font-light font-display text-sand-900 tracking-wide mb-4">
                Find Your Signature Travel Log
              </h3>
              <p className="text-sm text-sand-500 font-light leading-relaxed max-w-md mb-8">
                Fragrance acts as a memory card of our physical journeys. We will map your subconscious preferences to one of our three premium, local-ingredient scents.
              </p>
              <button
                type="button"
                onClick={handleStart}
                className="group px-8 py-3.5 bg-[#2D2926] hover:bg-gold-600 text-white text-xs uppercase tracking-[0.2em] font-medium rounded-md shadow transition-all duration-300 font-display flex items-center gap-2 cursor-pointer"
              >
                <span>BEGIN EXPLORATION</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 duration-300 transition-transform" />
              </button>
            </div>
          )}

          {/* STEPS 1-3: QUESTIONS */}
          {currentStep > 0 && currentStep <= questions.length && (
            <div className="flex-1 flex flex-col justify-between p-6 sm:p-10">
              
              {/* Question header / progress */}
              <div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#D4BC96] font-medium mb-4">
                  <span>OLFACTORY ALIGNMENT</span>
                  <span>Step {currentStep} of {questions.length}</span>
                </div>
                {/* Micro Progress Bar */}
                <div className="w-full h-1 bg-sand-100 rounded-full mb-8">
                  <div 
                    className="h-full bg-[#D4BC96] rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / questions.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-sand-900 tracking-wide mb-1 font-light">
                  {questions[currentStep - 1].text}
                </h3>
                <p className="text-xs text-sand-400 font-light mb-8">
                  {questions[currentStep - 1].sub}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {questions[currentStep - 1].options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentStep - 1] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAnswer(option.points, idx)}
                      className={`group text-left border rounded-xl overflow-hidden transition-all duration-300 shadow-sm flex flex-col justify-between hover:scale-101 cursor-pointer ${
                        isSelected 
                          ? "border-[#D4BC96] ring-1 ring-[#D4BC96]/15 bg-gold-50/50" 
                          : "border-sand-200 hover:border-sand-400 bg-white"
                      }`}
                    >
                      <div className="h-28 overflow-hidden relative">
                        <img 
                          src={option.image} 
                          alt={option.text} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <h4 className="font-serif font-light text-base text-sand-900 mb-1.5 group-hover:text-[#D4BC96] transition-colors">
                          {option.text}
                        </h4>
                        <p className="text-[11.5px] text-sand-500 font-light leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation row */}
              <div className="flex justify-between items-center border-t border-sand-100 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-4 py-2 border border-sand-200 text-sand-500 disabled:opacity-40 text-[10px] uppercase tracking-widest font-medium rounded hover:bg-sand-50 transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>BACK</span>
                </button>
                <div className="text-[10px] tracking-widest text-sand-400 uppercase font-mono">
                  RUH IMPERIUM LOGS
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: FINAL RESULT */}
          {currentStep > questions.length && (
            <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-sand-200">
              
              {/* Product visuals container left */}
              <div className="md:w-1/2 p-6 sm:p-10 bg-sand-100 flex flex-col justify-between items-center text-center">
                <div className="w-full flex items-center justify-between text-[9px] uppercase tracking-widest text-[#D4BC96] font-semibold mb-4">
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#D4BC96]" />
                    <span>YOUR SCENT SOUL MATCH</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sand-400" />
                    <span>{recommendedProduct.destination}</span>
                  </div>
                </div>

                <div className="my-6 group pointer-events-none">
                  <div className="h-48 w-48 rounded-full overflow-hidden border-2 border-white shadow-md mx-auto mb-4 relative">
                    <img 
                      src={recommendedProduct.image} 
                      alt={recommendedProduct.name} 
                      className="w-full h-full object-cover transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#D4BC96]/10 mix-blend-color"></div>
                  </div>
                  <h4 className="text-2xl font-light font-display text-sand-900 tracking-widest">
                    {recommendedProduct.name}
                  </h4>
                  <p className="text-[10.5px] uppercase tracking-widest text-[#D4BC96] font-medium mt-1">
                    {recommendedProduct.tagline}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProduct(recommendedProduct)}
                  className="text-[10.5px] hover:scale-101 border-b border-[#D4BC96] text-sand-700 hover:text-[#D4BC96] font-medium tracking-[0.2em] uppercase transition-all pb-1 focus:outline-none cursor-pointer"
                >
                  VEW FULL OLFACTORY PROFILE →
                </button>
              </div>

              {/* Match details & promo right */}
              <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-light font-display text-sand-900 tracking-wider mb-2">
                    Olfactory Alignment Details
                  </h3>
                  <p className="text-xs text-sand-500 font-light leading-relaxed mb-6">
                    Based on your travel log preferences, your spirit seeks the solace of the <span className="font-semibold text-sand-900">{recommendedProduct.destinationState}</span> climate. {recommendedProduct.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-sand-100 p-3 rounded-xl">
                      <p className="text-[9px] uppercase tracking-widest text-sand-400 font-mono mb-1">
                        Symphony Top notes
                      </p>
                      <p className="text-xs font-serif text-sand-800 tracking-wide">
                        {recommendedProduct.notes.top.join(" • ")}
                      </p>
                    </div>
                    <div className="bg-sand-100 p-3 rounded-xl">
                      <p className="text-[9px] uppercase tracking-widest text-sand-400 font-mono mb-1">
                        Symphony base anchor
                      </p>
                      <p className="text-xs font-serif text-sand-800 tracking-wide">
                        {recommendedProduct.notes.base.join(" • ")}
                      </p>
                    </div>
                  </div>

                  {/* Promo reward box */}
                  <div className="border border-dashed border-[#D4BC96] p-4.5 rounded-xl bg-gold-50/15 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-sand-400 font-semibold mb-0.5">
                        Wayfarer Reward Code unlocked
                      </p>
                      <p className="text-xs text-sand-500 font-light">
                        Use to unlock 15% off Sandalwood Voyage, Zaffran Caravan, or Midnight Oud.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-3.5 py-2 bg-[#2D2926] hover:bg-[#D4BC96] hover:scale-101 border border-sand-900 transition-all font-mono text-[11px] font-medium tracking-widest text-white rounded cursor-pointer"
                    >
                      {copiedCode ? "COPIED" : "WAYFARER15"}
                    </button>
                  </div>
                </div>

                {/* Lower control deck */}
                <div className="flex gap-4 border-t border-sand-100 pt-6 mt-6">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 py-3.5 border border-sand-200 text-sand-500 text-[10px] uppercase tracking-widest font-medium rounded hover:bg-sand-50 transition-colors flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>RETAKE QUIZ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddToCart(recommendedProduct, "50 ml")}
                    className="flex-1 py-3.5 bg-[#D4BC96] hover:bg-[#2D2926] hover:scale-101 transition-all text-white text-[10px] uppercase tracking-[0.2em] font-medium rounded shadow flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>ADD MATCH TO CART</span>
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
