import { useEffect, useMemo } from 'react';
import fontJson from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { TextGeometryParameters, TextGeometry as ThreeTextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';

export type TextGeometryProps = Omit<TextGeometryParameters, 'font'> & {
  children: string,
};

export function TextGeometry({ children, ...params }: TextGeometryProps) {
  const font = useMemo(() => new Font(fontJson), []);

  const textGeometry = useMemo(() => {
    return new ThreeTextGeometry(children, {
      ...params,
      font,
    });
  }, [children, font, ...Object.values(params)]);

  useEffect(() => () => {
    textGeometry.dispose();
  }, [textGeometry]);

  return (
    <primitive object={textGeometry} />
  );
}
