import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

// Imports
import FabricCanvas from '../components/FabricCanvas'
import ParticleThreads from '../components/ParticleThreads'
import SilkOrb from '../components/SilkOrb'
import WovenKnot from '../components/WovenKnot'

export default function Home() {
  
  // 1. SET YOUR ACTIVE COMPONENT HERE
  const activeComponent = 'SilkOrb'; // Options: 'SilkOrb', 'WovenKnot', 'FabricCanvas', 'ParticleThreads'

  // 2. LOGIC: Side-by-side for Orb/Knot, Full-screen for others
  const isSideBySide = ['SilkOrb', 'WovenKnot'].includes(activeComponent);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  }

  return (
    // If isSideBySide, we use flex-row. If not, we use absolute/full-screen behavior
    <main className={`min-h-[calc(100vh-100px)] flex flex-col ${isSideBySide ? 'md:flex-row' : ''} items-center px-6 md:px-24 py-12 bg-[#F7F6F3] relative`}>
      
      {/* Container 1: Text Content */}
      <motion.div 
        className={`w-full ${isSideBySide ? 'md:w-1/2' : 'w-full'} z-10`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-8xl font-serif leading-[0.9] tracking-tight text-stone-950 mb-6"
        >
          Honest materials.<br />
          <span className="italic text-[#2E473B]">Impeccable weaves.</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-xl text-stone-600 font-light max-w-sm md:max-w-md mb-8 leading-relaxed"
        >
          We source raw, ethically harvested fibers globally for master tailors and architectural designers.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Link 
            to="/shop" 
            className="inline-block px-8 py-4 bg-stone-950 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#8B6E4E] transition-all"
          >
            Enter The Shop
          </Link>
        </motion.div>
      </motion.div>

      {/* Container 2: Visual Component */}
      <div className={`w-full ${isSideBySide ? 'md:w-1/2 h-[400px] md:h-[600px] mt-8 md:mt-0 flex items-center justify-center overflow-visible pr-6 md:pr-12' : 'absolute inset-0'}`}>
        
        {/* SWITCHING GUIDE: 
            Update the 'activeComponent' variable at the top of this file 
            and uncomment the corresponding component below.
        */}

        {activeComponent === 'FabricCanvas' && <FabricCanvas />}
        {activeComponent === 'ParticleThreads' && <ParticleThreads />}
        {activeComponent === 'SilkOrb' && <SilkOrb />}
        {activeComponent === 'WovenKnot' && <WovenKnot />}
        
      </div>
    </main>
  )
}