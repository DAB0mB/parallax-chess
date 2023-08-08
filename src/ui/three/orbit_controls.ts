import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import { OrbitControls as ThreeOrbitControls } from 'three/addons/controls/OrbitControls.js';

export function OrbitControls() {
  const three = useThree();
  const orbitControlsRef = useRef<ThreeOrbitControls | null>(null);

  useFrame(() => {
    const orbitControls = orbitControlsRef.current;

    if (orbitControls) {
      orbitControls.update();
    }
  });

  useLayoutEffect(() => {
    const orbitControls = new ThreeOrbitControls(three.camera, three.gl.domElement);
    orbitControls.minDistance = 7;
    orbitControls.maxDistance = 16;
    orbitControls.maxPolarAngle = Math.PI / 2;
    orbitControlsRef.current = orbitControls;

    return () => {
      orbitControls.dispose();
      orbitControlsRef.current = null;
    };
  }, [three.camera, three.gl.domElement]);

  return null;
}
