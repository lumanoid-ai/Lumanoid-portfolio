import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NetworkSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light-theme'));
    const handler = () => setIsLight(document.documentElement.classList.contains('light-theme'));
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      const targetX = (state.mouse.x * 0.5);
      const targetY = (state.mouse.y * 0.5);
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 12, 12]} />
      <meshBasicMaterial color={isLight ? "#FAFAFA" : "#0A0A0A"} transparent opacity={isLight ? 0.2 : 0.8} />
      <lineSegments>
        <wireframeGeometry args={[new THREE.SphereGeometry(2.5, 12, 12)]} />
        <lineBasicMaterial color="#FF6B2B" transparent opacity={isLight ? 0.7 : 0.3} />
      </lineSegments>
    </mesh>
  );
}
