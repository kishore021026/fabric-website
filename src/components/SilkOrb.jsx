import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Environment, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// We separate the orb into its own function so we can animate it every single frame
function InteractiveOrb() {
  const materialRef = useRef()
  const sphereRef = useRef()
  const [hovered, setHover] = useState(false)

  // useFrame runs 60 times a second. We use it to smoothly animate properties.
  useFrame(() => {
    if (!materialRef.current || !sphereRef.current) return

    // Set our target values depending on whether the mouse is touching the orb
    const targetDistort = hovered ? 0.7 : 0.4  // Warps much more wildly when touched
    const targetSpeed = hovered ? 4.0 : 1.5    // Ripples much faster
    const targetScale = hovered ? 1.2 : 1.0    // Grows 20% larger

    // THREE.MathUtils.lerp creates that ultra-smooth, premium "easing" effect
    materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.05)
    materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.05)
    sphereRef.current.scale.setScalar(
      THREE.MathUtils.lerp(sphereRef.current.scale.x, targetScale, 0.1)
    )
  })

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <Sphere 
        ref={sphereRef}
        args={[1.4, 128, 128]} 
        position={[1.5, 0, -1]}
        // These events trigger exactly like standard HTML hover states!
        onPointerOver={() => {
          setHover(true)
          document.body.style.cursor = 'crosshair' // Changes cursor to look editorial
        }}
        onPointerOut={() => {
          setHover(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <MeshDistortMaterial
          ref={materialRef}
          color="#2E473B"
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

export default function SilkOrb() {
  return (
    // We removed 'pointer-events-none' so this canvas can actually feel your mouse
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#F7F6F3" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8B6E4E" />
        
        <Environment preset="studio" />

        {/* Render our new interactive object */}
        <InteractiveOrb />

        <ContactShadows 
          position={[1.5, -2, -1]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
        />
      </Canvas>
    </div>
  )
}