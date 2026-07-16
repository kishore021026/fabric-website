import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBag } from '../context/BagContext'

export default function Navbar() {
  const { bagItems } = useBag()

  return (
    // Increased vertical padding (py-8) for better breathing room
    <nav className="flex justify-between items-center py-8 px-6 md:px-24">
      <Link to="/" className="text-xl md:text-2xl font-serif tracking-tight">AMIRTHA KNETS</Link>
      
      <div className="flex gap-4 md:gap-8 items-center">
        
        {/* Bumped to text-[11px] mobile, text-sm desktop */}
        <div className="flex gap-5 md:gap-6 text-[11px] md:text-sm font-bold tracking-widest text-stone-600 uppercase">
          <Link to="/" className="hover:text-stone-900 transition-colors">Our Origin</Link>
          <Link to="/shop" className="hover:text-stone-900 transition-colors">The Shop</Link>
        </div>

        <motion.div 
          key={bagItems.length}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="font-bold text-[11px] md:text-sm uppercase tracking-widest bg-stone-900 text-white px-4 py-2.5 rounded-full cursor-pointer"
        >
          BAG ({bagItems.length})
        </motion.div>
      </div>
    </nav>
  )
}