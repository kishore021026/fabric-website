import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import SilkOrb from '../components/SilkOrb'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  }

  return (
    <main className="relative flex flex-col justify-center min-h-[calc(100vh-100px)] px-6 md:px-24 py-12 overflow-hidden bg-[#F7F6F3]">
      
      <SilkOrb />

      <motion.div 
        className="max-w-4xl z-10 pointer-events-none pr-4 md:pr-0" // Added pr-4 to push text away from edge
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          // Changed text-5xl to text-4xl on mobile
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
        
        <motion.div variants={itemVariants} className="pointer-events-auto">
          <Link 
            to="/shop" 
            className="inline-block px-8 py-4 bg-stone-950 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#8B6E4E] transition-all"
          >
            Enter The Shop
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}