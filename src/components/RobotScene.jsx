import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Html, ScrollControls, useGLTF, useScroll } from '@react-three/drei';
import * as THREE from 'three';

const SECTIONS = [
  { stop: 0, title: 'Artificial Intelligence', body: 'is no longer emerging.\nIt is evolving.' },
  { stop: 0.25, title: 'It learns from data.', body: 'It adapts in real time.' },
  { stop: 0.5, title: 'Intelligence distributed.', body: 'Across systems and industries.' },
  { stop: 0.75, title: 'The future is not artificial.', body: 'It is augmented.' },
  { stop: 0.9, title: 'Intelligence meets intention.', body: '' },
  { stop: 1, title: 'Explore what comes next', body: 'Choose a path below.' },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function ScrollDrivenEnvironment({ onProgress }) {
  const scroll = useScroll();
  const keyLight = useRef();
  const rimLight = useRef();
  const glowLight = useRef();
  const grid = useRef();
  const skyline = useRef();

  useFrame(() => {
    const progress = THREE.MathUtils.clamp(scroll.offset, 0, 1);
    onProgress(progress);

    if (keyLight.current) keyLight.current.intensity = lerp(2.8, 1.2, progress);
    if (rimLight.current) rimLight.current.intensity = lerp(3.2, 0.8, progress);
    if (glowLight.current) glowLight.current.intensity = lerp(0.4, 1.4, Math.min(progress * 2, 1));

    if (grid.current) grid.current.material.opacity = progress > 0.15 && progress < 0.8 ? 0.25 : 0;
    if (skyline.current) skyline.current.material.opacity = progress > 0.7 ? Math.min((progress - 0.7) * 2.5, 0.3) : 0;
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight ref={keyLight} position={[3, 5, 4]} color="#bbdbff" intensity={2.8} />
      <directionalLight ref={rimLight} position={[-4, 2, -2]} color="#4ca3ff" intensity={3.2} />
      <pointLight ref={glowLight} position={[0, 0.3, 1.5]} color="#ff8b3d" intensity={0.4} />

      <mesh ref={grid} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
        <planeGeometry args={[16, 16, 40, 40]} />
        <meshBasicMaterial color="#5ecbff" wireframe transparent opacity={0} />
      </mesh>

      <mesh ref={skyline} position={[0, -0.1, -4]}>
        <planeGeometry args={[8, 2.2]} />
        <meshBasicMaterial color="#8ea9cc" transparent opacity={0} />
      </mesh>

      <Environment preset="city" />
    </>
  );
}

function Robot() {
  const group = useRef();
  const { scene } = useGLTF('/robot.glb');

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color = new THREE.Color('#f6f6f6');
        child.material.roughness = 0.3;
        child.material.metalness = 0.7;

        if (/accent|orange|emissive/i.test(child.name)) {
          child.material.color = new THREE.Color('#ff9f56');
          child.material.emissive = new THREE.Color('#8d3c04');
          child.material.emissiveIntensity = 0.35;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={0.4} rotationIntensity={0} floatIntensity={0.08}>
      <group ref={group} position={[0, -1, 0]}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
}

function RobotScene({ onProgress }) {
  return (
    <Canvas camera={{ position: [0, 0.8, 5], fov: 42 }}>
      <color attach="background" args={['#050506']} />
      <ScrollControls pages={6} damping={0.15}>
        <Suspense
          fallback={
            <Html center>
              <div className="loader">Initializing scene...</div>
            </Html>
          }
        >
          <ScrollDrivenEnvironment onProgress={onProgress} />
          <Robot />
        </Suspense>
      </ScrollControls>
    </Canvas>
  );
}

useGLTF.preload('/robot.glb');

export { SECTIONS };
export default RobotScene;
