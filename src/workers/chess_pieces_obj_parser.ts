import chessPiecesObj from '@/assets/chess_pieces.obj?raw';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export type ChessPiecesObjData = {
  [key: string]: string | number | boolean | null | ChessPiecesObjData | Array<string | number | boolean | null | ChessPiecesObjData>,
};

const data = new OBJLoader().parse(chessPiecesObj).toJSON() as ChessPiecesObjData;

postMessage(data);
