import chessPiecesObj from '@/assets/chess_pieces.obj?raw';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const obj = new OBJLoader().parse(chessPiecesObj);
postMessage(obj.toJSON());
