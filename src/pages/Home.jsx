import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

// Imports for all your concepts
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
    <main className="relative flex flex-col justify-center min-h-[calc(100vh-89px)] px-8 md:px-24 py-12 overflow-hidden bg-[#F7F6F3]">
      
      {/* 
        SWITCHING GUIDE:
        Uncomment the component you want to show. 
        Only have ONE active at a time to avoid visual overlap.
      */}

      {/* CONCEPT 1: Interactive Fabric Mesh */}
       <FabricCanvas />

      {/* CONCEPT 3: Generative Particle Threads (ACTIVE) */}
     {/* <ParticleThreads /> */}

      {/* CONCEPT 5: Liquid Silk Orb */}
      {/* <SilkOrb /> */}

      {/* CONCEPT 6: Glass Woven Knot */}
      {/* <WovenKnot /> */}

      <motion.div 
        className="max-w-4xl z-10 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tight text-stone-950 mb-8"
        >
          Honest materials.<br />
          <span className="italic text-[#2E473B]">Impeccable weaves.</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-stone-600 font-light max-w-md mb-10 leading-relaxed"
        >
          We source raw, ethically harvested fibers globally for master tailors and architectural designers.
        </motion.p>
        
        <motion.div variants={itemVariants} className="pointer-events-auto">
          <Link 
            to="/shop" 
            className="inline-block px-10 py-5 bg-stone-950 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#8B6E4E] transition-all hover:scale-105 shadow-md"
          >
            Enter The Shop
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}