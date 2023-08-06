import { Board } from '@/game/board';
import { useState } from 'react';
import { Mesh, MeshBasicMaterial, PlaneGeometry, Scene } from 'three';

class Board3D {
  constructor(readonly board: Board) {
  }

  setupScene(scene: Scene) {
    const checkers = Array.from(this.board).flatMap((row, i) =>
      row.map((_piece, j) =>
        new Checker3D(i, j)
      )
    )
  }
}

class Checker3D {
  readonly geometry = new PlaneGeometry();
  readonly material = new MeshBasicMaterial();
  readonly mesh = new Mesh(this.geometry, this.material);

  constructor(
    readonly i: number,
    readonly j: number,
  ) {
    this.mesh.position.setX(i - 4);
    this.mesh.position.setY(j - 4);
  }

  setupScene(scene: Scene) {
    const plane = new PlaneGeometry(1, 1);
    const material = new MeshBasicMaterial( { color: 0xff0000 } );
    const mesh = new Mesh(plane, material);
    mesh.position.setX(this.i - 4);
    mesh.position.setY(this.j - 4);
    scene.add(mesh);
  }
}

function Checker3DComponent() {
  const checker3d = useState(() => new Checker3D());
}
