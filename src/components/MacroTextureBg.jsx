import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function MacroTextureBg() {
  // Motion values to track coordinates without triggering constant React re-renders
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Advanced spring physics setup to give that heavy, luxury "fluid drift" deceleration
  const springConfig = { damping: 50, stiffness: 60, mass: 1.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      // Maps mouse coordinates to a subtle 35px maximum shift radius
      const targetX = (e.clientX / innerWidth - 0.5) * 35
      const targetY = (e.clientY / innerHeight - 0.5) * 35
      
      mouseX.set(targetX)
      mouseY.set(targetY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#EFECE6]">
      {/* High-res premium woven fabric canvas layer */}
      <motion.div 
        className="w-[108%] h-[108%] absolute -left-[4%] -top-[4%] bg-cover bg-center mix-blend-multiply opacity-[0.18]"
        style={{
          x,
          y,
          scale: 1.06,
          backgroundImage: `url('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=2000')`
        }}
      />
      
      {/* Editorial shadow vignette layer to blend the edges seamlessly into your background color */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F7F6F3] via-transparent to-[#F7F6F3]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#F7F6F3_90%)] pointer-events-none" />
    </div>
  )
}