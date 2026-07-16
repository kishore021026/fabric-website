import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

// Imports for your concepts
import FabricCanvas from '../components/FabricCanvas'
import ParticleThreads from '../components/ParticleThreads'
import SilkOrb from '../components/SilkOrb'
import WovenKnot from '../components/WovenKnot'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.4, delayChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    // Responsive padding: px-6 for mobile, px-24 for large screens
    <main className="relative flex flex-col justify-center min-h-[calc(100vh-89px)] px-6 md:px-12 lg:px-24 py-12 overflow-hidden bg-[#F7F6F3]">
      
      {/* 
        CONCEPT ACTIVE: SilkOrb
      */}
      <SilkOrb />

      <motion.div 
        className="max-w-4xl z-10 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          // Responsive font sizes: Starts at 5xl, scales up to 8xl
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-[0.9] tracking-tight text-stone-950 mb-6 md:mb-8"
        >
          Honest materials.<br />
          <span className="italic text-[#2E473B]">Impeccable weaves.</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          // Responsive text size and max-width for better readability on phones
          className="text-base sm:text-lg md:text-xl text-stone-600 font-light max-w-sm md:max-w-md mb-8 md:mb-10 leading-relaxed"
        >
          We source raw, ethically harvested fibers globally for master tailors and architectural designers.
        </motion.p>
        
        <motion.div variants={itemVariants} className="pointer-events-auto">
          <Link 
            to="/shop" 
            // Responsive padding and text size
            className="inline-block px-8 py-4 md:px-10 md:py-5 bg-stone-950 text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[#8B6E4E] transition-all hover:scale-105 shadow-md"
          >
            Enter The Shop
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}