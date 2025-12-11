// 'use client'

// import '@google/model-viewer'
// import { Suspense, useRef, useState } from 'react'
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { OrbitControls, useGLTF } from '@react-three/drei'
// import gsap from 'gsap'

// type Car = {
//     name: string
//     glbUrl: string
//     usdzUrl: string
// }

// const cars: Car[] = [
//     { name: 'Lamborghini Aventador', glbUrl: '/models/aventador.glb', usdzUrl: '/models/aventador.usdz' },
//     { name: 'Ferrari F8', glbUrl: '/models/f8.glb', usdzUrl: '/models/f8.usdz' },
//     { name: 'McLaren 720S', glbUrl: '/models/720s.glb', usdzUrl: '/models/720s.usdz' },
// ]

// function CarThumbnail({ url, index, radius, onClick, selectedIndex }: { url: string, index: number, radius: number, onClick: () => void, selectedIndex: number }) {
//     const ref = useRef<any>(null)

//     // Animate rotation of ring
//     useFrame(() => {
//         if (selectedIndex !== index) {
//             const angle = ((index / cars.length) * Math.PI * 2) + performance.now() / 3000
//             if (ref.current) {
//                 ref.current.position.x = Math.sin(angle) * radius
//                 ref.current.position.z = Math.cos(angle) * radius
//                 ref.current.position.y = 0
//             }
//         }
//     })

//     // Animate to center when clicked
//     const handleClick = () => {
//         onClick()
//         if (ref.current) {
//             gsap.to(ref.current.position, { x: 0, y: 0, z: 0, duration: 1.2 })
//         }
//     }

//     const gltf = useGLTF(url) as any
//     return <primitive ref={ref} object={gltf.scene} scale={0.5} onClick={handleClick} />
// }

// export default function MotorsPage() {
//     const [selectedCar, setSelectedCar] = useState(0)
//     const radius = 3

//     const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

//     return (
//         <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
//             <div style={{ flex: 1 }}>
//                 {isIOS ? (
//                     <model-viewer
//                         src={cars[selectedCar].usdzUrl}
//                         alt={cars[selectedCar].name}
//                         ar
//                         camera-controls
//                         auto-rotate
//                         style={{ width: '100%', height: '100%' }}
//                     />
//                 ) : (
//                     <Canvas camera={{ position: [0, 2, 6] }}>
//                         <ambientLight intensity={0.5} />
//                         <directionalLight position={[5, 5, 5]} intensity={1} />
//                         <Suspense fallback={null}>
//                             {cars.map((car, i) => (
//                                 <CarThumbnail
//                                     key={i}
//                                     url={car.glbUrl}
//                                     index={i}
//                                     radius={radius}
//                                     onClick={() => setSelectedCar(i)}
//                                     selectedIndex={selectedCar}
//                                 />
//                             ))}
//                         </Suspense>
//                         <OrbitControls enablePan={false} />
//                     </Canvas>
//                 )}
//             </div>

//             <div style={{ padding: 16, textAlign: 'center' }}>
//                 <h2>{cars[selectedCar].name}</h2>
//                 <p>Click a car on the ring to bring it to the center</p>
//             </div>
//         </div>
//     )
// }
