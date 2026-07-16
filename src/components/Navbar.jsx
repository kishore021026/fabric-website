import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBag } from '../context/BagContext'

export default function Navbar() {
  const { bagItems } = useBag()

  return (
    <nav className="flex justify-between items-center py-6 px-8 md:px-24">
      <Link to="/" className="text-xl font-serif">AMIRTHA KNETS</Link>
      
      <div className="flex gap-8 items-center">
        <div className="flex gap-6 text-[10px] font-bold tracking-widest text-stone-500 uppercase">
          <Link to="/" className="hover:text-stone-900 transition-colors">Our Origin</Link>
          <Link to="/shop" className="hover:text-stone-900 transition-colors">The Shop</Link>
        </div>

       {/* Animated Bag Icon - More Visible Spring */}
<motion.div 
  key={bagItems.length}
  initial={{ scale: 0.8 }}       // Start smaller
  animate={{ scale: 1.15 }}      // Pop larger
  whileHover={{ scale: 1.05 }}   // Add a hover state for extra interaction
  transition={{ 
    type: "spring", 
    stiffness: 400, 
    damping: 10                  // Lower damping makes it "overshoot" and bounce back
  }}
  className="font-bold text-[10px] uppercase tracking-widest bg-stone-900 text-white px-4 py-2 rounded-full cursor-pointer transition-colors"
>
  BAG ({bagItems.length})
</motion.div>
      </div>
    </nav>
  )
}