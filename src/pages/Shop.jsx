import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PresentationControls } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useBag } from '../context/BagContext' // 1. Import the hook

// The 3D Fabric Component
function FabricRoll({ color, roughness, sheen }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 30 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="studio" />
      <PresentationControls global config={{ mass: 1, tension: 170, friction: 26 }}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 1.5, 64]} />
          <meshPhysicalMaterial 
            color={color} 
            roughness={roughness} 
            metalness={0} 
            clearcoat={sheen} 
          />
        </mesh>
      </PresentationControls>
    </Canvas>
  )
}

const allProducts = [
  { id: 1, name: "Belgian Heirloom Flax", category: "POLYESTER", badge: "BEST SELLER", gsm: "180 GSM", desc: "Raw, unbleached, and highly breathable.", price: "$34.00", color: "#E0D8C3", roughness: 0.9, sheen: 0 },
  { id: 2, name: "Washed European Wexford", category: "POLYESTER", badge: "ESSENTIAL", gsm: "150 GSM", desc: "Pre-laundered for lived-in feel.", price: "$38.50", color: "#D1C7BD", roughness: 0.9, sheen: 0 },
  { id: 3, name: "Heavyweight Rustic Canvas", category: "POLYESTER", badge: "ARCHITECTURAL", gsm: "340 GSM", desc: "Substantial structural weave.", price: "$45.00", color: "#C6B99F", roughness: 0.8, sheen: 0 },
  { id: 4, name: "Delicate Sheer Gauze", category: "POLYESTER", badge: "NEW ARRIVAL", gsm: "90 GSM", desc: "An ethereal, translucent weave.", price: "$29.00", color: "#F0F0E8", roughness: 0.6, sheen: 0.1 },
  { id: 5, name: "Coastal Stripe Weave", category: "POLYESTER", badge: "LIMITED", gsm: "210 GSM", desc: "Crisp texture for summer tailoring.", price: "$32.00", color: "#DCD0B0", roughness: 0.7, sheen: 0 },
  { id: 6, name: "Forest Silk Satin", category: "SILK", badge: "PREMIUM", gsm: "120 GSM", desc: "Lustrous mulberry silk.", price: "$65.00", color: "#2E473B", roughness: 0.3, sheen: 0.8 },
  { id: 7, name: "Midnight Crepe de Chine", category: "SILK", badge: "ELEGANT", gsm: "100 GSM", desc: "Soft matte finish.", price: "$58.00", color: "#1A2521", roughness: 0.4, sheen: 0.6 },
  { id: 8, name: "Golden Lotus Weave", category: "SILK", badge: "RARE FIND", gsm: "130 GSM", desc: "Intricate artisanal weave.", price: "$85.00", color: "#8B6E4E", roughness: 0.5, sheen: 0.4 },
  { id: 9, name: "Champagne Charmeuse", category: "SILK", badge: "CLASSIC", gsm: "110 GSM", desc: "High-gloss luxury drape.", price: "$72.00", color: "#F7E6C4", roughness: 0.2, sheen: 0.9 },
  { id: 10, name: "Raw Tussar Silk", category: "SILK", badge: "SUSTAINABLE", gsm: "160 GSM", desc: "Textured, golden fiber.", price: "$55.00", color: "#C4A484", roughness: 0.6, sheen: 0.3 },
  { id: 11, name: "Highland Alpaca", category: "WOOL", badge: "WARM", gsm: "400 GSM", desc: "Ethical soft-spun wool.", price: "$95.00", color: "#D1C7BD", roughness: 0.9, sheen: 0 },
  { id: 12, name: "Merino Fine Weave", category: "WOOL", badge: "SOFT", gsm: "250 GSM", desc: "Ultra-fine merino fibers.", price: "$88.00", color: "#7A7A7A", roughness: 0.8, sheen: 0 },
  { id: 13, name: "Charcoal Herringbone", category: "WOOL", badge: "TAILORED", gsm: "380 GSM", desc: "Classic suiting weight.", price: "$110.00", color: "#333333", roughness: 0.85, sheen: 0 },
  { id: 14, name: "Camel Hair Blend", category: "WOOL", badge: "LUXURY", gsm: "320 GSM", desc: "Exceptional heat retention.", price: "$120.00", color: "#A89F91", roughness: 0.7, sheen: 0 },
  { id: 15, name: "Boiled Wool Felt", category: "WOOL", badge: "STRUCTURE", gsm: "500 GSM", desc: "Dense, windproof fabric.", price: "$75.00", color: "#4A403A", roughness: 0.95, sheen: 0 },
  { id: 16, name: "Pima Cotton Poplin", category: "COTTON", badge: "CRISP", gsm: "100 GSM", desc: "Smooth, durable weave.", price: "$22.00", color: "#FFFFFF", roughness: 0.5, sheen: 0.2 },
  { id: 17, name: "Heritage Selvedge Denim", category: "COTTON", badge: "DURABLE", gsm: "450 GSM", desc: "Raw indigo heavy cotton.", price: "$40.00", color: "#2B3A67", roughness: 0.8, sheen: 0 },
  { id: 18, name: "Brushed Flannel", category: "COTTON", badge: "SOFT", gsm: "200 GSM", desc: "Cozy, double-brushed.", price: "$28.00", color: "#6B4226", roughness: 0.9, sheen: 0 },
  { id: 19, name: "Chino Twill", category: "COTTON", badge: "VERSATILE", gsm: "280 GSM", desc: "Tight, utilitarian weave.", price: "$25.00", color: "#A4957D", roughness: 0.7, sheen: 0 },
  { id: 20, name: "Waffle Knit", category: "COTTON", badge: "TEXTURE", gsm: "220 GSM", desc: "Deep, absorbent pattern.", price: "$30.00", color: "#DED6C8", roughness: 0.8, sheen: 0 },
]

export default function Shop() {
  const [selectedCat, setSelectedCat] = useState("ALL")
  const { addToBag } = useBag() // 2. Consume the context hook
  const categories = ["ALL", "POLYESTER", "COTTON", "WOOL", "SILK"]

  const filteredProducts = selectedCat === "ALL" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCat)

  return (
    <main className="min-h-screen bg-[#F7F6F3] px-8 md:px-24 py-16">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-serif text-stone-900 mb-2">The Raw Catalog</h1>
          <p className="text-xs text-stone-500 tracking-wide uppercase">Pricing reflects cost per metric meter ($/m)</p>
        </div>
        <div className="flex gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCat(cat)} className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${selectedCat === cat ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-600 hover:bg-stone-300"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map(product => (
            <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white p-5 border border-stone-200 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-bold tracking-widest text-stone-400">{product.category}</span>
                <span className="text-[9px] font-bold tracking-widest bg-stone-100 px-2 py-0.5 text-stone-500">{product.badge}</span>
              </div>
              <div className="h-44 bg-[#FBF9F2] mb-4 relative overflow-hidden bg-[radial-gradient(#C5C5C5_1px,transparent_1px)] [background-size:20px_20px]">
                <FabricRoll color={product.color} roughness={product.roughness} sheen={product.sheen} />
                <div className="absolute top-3 left-3 w-5 h-5 rounded-full border border-white/50 shadow-inner" style={{ backgroundColor: product.color }} />
              </div>
              <div className="mb-4 flex-grow">
                <h3 className="font-serif text-[16px] leading-tight mb-2 text-stone-900">{product.name}</h3>
                <span className="text-[9px] font-bold bg-stone-100 px-2 py-0.5 text-stone-500">{product.gsm}</span>
                <p className="text-[11px] text-stone-500 mt-3 leading-relaxed">{product.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-stone-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[9px] text-stone-400 font-bold tracking-widest">PER METER</div>
                  <div className="font-serif text-lg text-stone-900">{product.price}</div>
                </div>
                <button 
                  onClick={() => addToBag(product)} // 3. Click handler added
                  className="w-full py-2.5 bg-[#F0EEE5] text-stone-800 text-[10px] font-bold tracking-widest hover:bg-stone-300 transition-colors"
                >
                  ADD TO BOLT ORDER
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  )
}