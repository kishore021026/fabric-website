import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, ContactShadows, PresentationControls } from '@react-three/drei'
import * as THREE from 'three'

function InteractiveKnot() {
  const knotRef = useRef()
  const materialRef = useRef()
  const [hovered, setHover] = useState(false)

  // Creates the continuous, lazy ambient rotation
  useFrame(() => {
    if (!knotRef.current || !materialRef.current) return
    
    knotRef.current.rotation.x += 0.001
    knotRef.current.rotation.y += 0.002

    // When hovered, it grows slightly and the glass becomes polished/clearer
    const targetScale = hovered ? 1.15 : 1.0
    const targetRoughness = hovered ? 0.02 : 0.25 

    knotRef.current.scale.setScalar(THREE.MathUtils.lerp(knotRef.current.scale.x, targetScale, 0.1))
    materialRef.current.roughness = THREE.MathUtils.lerp(materialRef.current.roughness, targetRoughness, 0.1)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh 
        ref={knotRef} 
        position={[1.5, 0, -1]}
        onPointerOver={() => {
          setHover(true)
          document.body.style.cursor = 'grab'
        }}
        onPointerOut={() => {
          setHover(false)
          document.body.style.cursor = 'auto'
        }}
        onPointerDown={() => {
          document.body.style.cursor = 'grabbing'
        }}
        onPointerUp={() => {
          document.body.style.cursor = 'grab'
        }}
      >
        {/* TorusKnot is a complex, mathematically intertwined shape representing a weave */}
        <torusKnotGeometry args={[0.9, 0.28, 256, 64, 3, 4]} />
        
        {/* Advanced physical material simulating frosted emerald glass/resin */}
        <meshPhysicalMaterial 
          ref={materialRef}
          color="#2E473B"
          metalness={0.1}
          transmission={0.9}   // Makes it act like glass, letting light through
          thickness={0.5}      // How thick the glass feels
          ior={1.5}            // Index of Refraction (bends the light)
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

export default function WovenKnot() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#F7F6F3" />
        
        <Environment preset="city" />

        {/* PresentationControls allow the user to grab and spin the object */}
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <InteractiveKnot />
        </PresentationControls>

        <ContactShadows 
          position={[1.5, -2.5, -1]} 
          opacity={0.3} 
          scale={12} 
          blur={2.5} 
          far={4} 
        />
      </Canvas>
    </div>
  )
}