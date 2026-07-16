import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WaveMesh() {
  const meshRef = useRef()
  // We now track the target mouse AND the current animated mouse for heavy momentum
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (!meshRef.current) return

    // THREE.MathUtils.lerp adds that buttery-smooth, heavy deceleration to the mouse movement
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.03)
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.03)

    const geometry = meshRef.current.geometry
    const positionAttribute = geometry.attributes.position

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i)
      const y = positionAttribute.getY(i)

      // Layered fluid math for highly organic, complex cloth ripples
      const wave1 = Math.sin(x * 0.3 + time * 0.4) * 0.5
      const wave2 = Math.cos(y * 0.3 + time * 0.5) * 0.5
      const microDetail = Math.sin((x * 0.8) + (y * 0.8) + time * 0.8) * 0.1

      // Cursor interaction radius
      const distanceToMouse = Math.sqrt(
        Math.pow(x - mouse.current.x * 15, 2) +
        Math.pow(y - mouse.current.y * 10, 2)
      )
      
      // Pulls the fabric towards the user gracefully based on proximity
      const mousePull = Math.exp(-distanceToMouse * 0.25) * 1.5

      positionAttribute.setZ(i, wave1 + wave2 + microDetail + mousePull)
    }

    positionAttribute.needsUpdate = true
    
    // The entire mesh slightly tilts and pans as you move your mouse across the screen
    meshRef.current.rotation.x = -Math.PI / 2.8 + mouse.current.y * 0.08
    meshRef.current.rotation.y = mouse.current.x * 0.08
  })

  return (
    <mesh ref={meshRef} position={[0, -1, -3]}>
      {/* We tripled the density of the grid [90x90] for incredibly smooth curves */}
      <planeGeometry args={[30, 20, 90, 90]} />
      {/* Upgraded to a Standard Material to react to our studio lights */}
      <meshStandardMaterial 
        color="#2E473B" 
        wireframe 
        transparent 
        opacity={0.3} 
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  )
}

export default function FabricCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Adds a background color and 3D fog to seamlessly blend the edges into nothingness */}
        <color attach="background" args={['#F7F6F3']} />
        <fog attach="fog" args={['#F7F6F3', 3, 10]} />
        
        {/* Studio Lighting to illuminate the wireframe */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8B6E4E" />
        
        <WaveMesh />
      </Canvas>
    </div>
  )
}