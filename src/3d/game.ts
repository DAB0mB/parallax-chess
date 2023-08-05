import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

export class ChessGameRenderer {
  private animationFrame = 0;
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(75, undefined, .1, 1000);
  private readonly renderer = new WebGLRenderer();
  private readonly resizeObserver = new ResizeObserver((...args) => this.onContainerResize(...args));

  get canvas() {
    return this.renderer.domElement;
  }

  constructor(readonly containerEl: HTMLElement) {
    containerEl.append(this.renderer.domElement);
    this.resizeCanvas(containerEl.clientWidth, containerEl.clientHeight);
    this.resizeObserver.observe(containerEl);

    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new Mesh( geometry, material );
    this.scene.add( cube );
    this.camera.position.set(0, 0, 5);

    const controls = new MapControls(this.camera, this.renderer.domElement);
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.minDistance = 5;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2;
  }

  startRenderLoop() {
    this.queueFrame();
  }

  private queueFrame() {
    this.animationFrame = requestAnimationFrame(() => {
      this.renderFrame();
      this.queueFrame();
    });
  }

  private renderFrame() {
    this.renderer.render(this.scene, this.camera);
  }

  stopRenderLoop() {
    cancelAnimationFrame(this.animationFrame);
  }

  dispose() {
    this.stopRenderLoop();
    this.resizeObserver.unobserve(this.containerEl);
  }

  private resizeCanvas(width: number, height: number) {
    this.camera.aspect = width / height;
    this.renderer.setSize(width, height);
  }

  private readonly onContainerResize: ResizeObserverCallback = ([entry]) => {
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;
    this.resizeCanvas(width, height);
  };
}
