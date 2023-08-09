import { useEffect, useMemo } from 'react';
import { TextGeometryParameters, TextGeometry as ThreeTextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { Font } from 'three/addons/loaders/FontLoader.js';
import fontJson from 'three/examples/fonts/gentilis_regular.typeface.json';

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
