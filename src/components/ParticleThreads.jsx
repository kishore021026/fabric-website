import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleCloud() {
  const pointsRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const count = 3000 // Total floating thread particles

  // Track cursor position to create a smooth camera tilt effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate initial particle positions in space
  const [positions, initialMathValues] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const mathVals = new Float32Array(count * 2) // Stores individual speeds & offsets
    
    for (let i = 0; i < count; i++) {
      // Scatter particles across a wide rectangular volume behind the text
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2

      mathVals[i * 2] = Math.random() * Math.PI * 2 // Unique phase offset
      mathVals[i * 2 + 1] = 0.2 + Math.random() * 0.5 // Random flow speed multiplier
    }
    return [pos, mathVals]
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (!pointsRef.current) return

    const geo = pointsRef.current.geometry
    const posAttr = geo.attributes.position

    // Animate individual particle vectors to simulate a wind-blown silk flow field
    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i)
      const phase = initialMathValues[i * 2]
      const speed = initialMathValues[i * 2 + 1]

      // Complex sine/cosine overlapping equations to generate smooth fluid motion ripples
      const newY = posAttr.getY(i) + Math.sin(time * speed + phase + x * 0.3) * 0.006
      const newZ = posAttr.getZ(i) + Math.cos(time * speed + phase) * 0.004

      posAttr.setY(i, newY)
      posAttr.setZ(i, newZ)

      // Reset particles if they float off screen vertically to maintain continuous loops
      if (Math.abs(newY) > 6) {
        posAttr.setY(i, (Math.random() - 0.5) * 10)
      }
    }
    posAttr.needsUpdate = true

    // Interactive inertia easing: gradually drag camera position toward normalized mouse position
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

    // Apply gentle perspective shifting rotations based on cursor coordinate deltas
    pointsRef.current.rotation.y = mouseRef.current.x * 0.25
    pointsRef.current.rotation.x = -mouseRef.current.y * 0.15
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      {/* Renders each particle point as an exquisite organic textile green dot */}
      <pointsMaterial
        color="#2E473B"
        size={0.05}
        sizeAttenuation={true}
        transparent
        opacity={0.35}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

export default function ParticleThreads() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-[#F4F3EE]">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
        <ambientLight intensity={1.5} />
        <ParticleCloud />
      </Canvas>
    </div>
  )
}