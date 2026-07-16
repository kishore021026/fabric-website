import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBag } from '../context/BagContext'

export default function Navbar() {
  const { bagItems } = useBag()

  return (
    // Padding adjusted: px-6 (mobile) to px-24 (desktop)
    <nav className="flex justify-between items-center py-6 px-6 md:px-24">
      <Link to="/" className="text-lg md:text-xl font-serif">AMIRTHA KNETS</Link>
      
      {/* Container gap adjusted: gap-4 (mobile) to gap-8 (desktop) */}
      <div className="flex gap-4 md:gap-8 items-center">
        
        {/* Navigation Links: Hidden on extra-small screens if needed, otherwise smaller gap */}
        <div className="flex gap-4 md:gap-6 text-[9px] md:text-[10px] font-bold tracking-widest text-stone-500 uppercase">
          <Link to="/" className="hover:text-stone-900 transition-colors">Our Origin</Link>
          <Link to="/shop" className="hover:text-stone-900 transition-colors">The Shop</Link>
        </div>

        {/* Animated Bag Icon */}
        <motion.div 
          key={bagItems.length}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.15 }}
          whileHover={{ scale: 1.05 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 10
          }}
          className="font-bold text-[9px] md:text-[10px] uppercase tracking-widest bg-stone-900 text-white px-3 py-2 md:px-4 md:py-2 rounded-full cursor-pointer transition-colors"
        >
          BAG ({bagItems.length})
        </motion.div>
      </div>
    </nav>
  )
}