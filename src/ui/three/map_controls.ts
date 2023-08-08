import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import { MapControls as ThreeMapControls } from 'three/examples/jsm/controls/MapControls.js';

export function MapControls() {
  const three = useThree();
  const mapControlsRef = useRef<ThreeMapControls | null>(null);

  useFrame(() => {
    const mapControls = mapControlsRef.current;

    if (mapControls) {
      mapControls.update();
    }
  });

  useLayoutEffect(() => {
    const mapControls = new ThreeMapControls(three.camera, three.gl.domElement);
    mapControls.enablePan = false;
    mapControls.enableRotate = true;
    mapControls.enableZoom = true;
    mapControls.minDistance = 5;
    mapControls.maxDistance = 20;
    mapControls.maxPolarAngle = Math.PI / 2;
    mapControlsRef.current = mapControls;

    return () => {
      mapControls.dispose();
      mapControlsRef.current = null;
    };
  }, [three.camera, three.gl.domElement]);

  return null;
}
