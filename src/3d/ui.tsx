import { useLayoutEffect, useRef } from 'react';
import { ChessGameRenderer } from './game';

export function GameUI() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (container.children.length != 0) return

    const renderer = new ChessGameRenderer(container);
    renderer.startRenderLoop();
  }, []);

  return (
    <div style={{ flex: 1, width: '100%' }} ref={containerRef} />
  );
}
