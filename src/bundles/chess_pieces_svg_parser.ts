import BBSvg from '@/assets/black_bishop.svg';
import BKSvg from '@/assets/black_king.svg';
import BNSvg from '@/assets/black_knight.svg';
import BPSvg from '@/assets/black_pawn.svg';
import BQSvg from '@/assets/black_queen.svg';
import BRSvg from '@/assets/black_rook.svg';
import WBSvg from '@/assets/white_bishop.svg';
import WKSvg from '@/assets/white_king.svg';
import WNSvg from '@/assets/white_knight.svg';
import WPSvg from '@/assets/white_pawn.svg';
import WQSvg from '@/assets/white_queen.svg';
import WRSvg from '@/assets/white_rook.svg';

export type ChessPiecesSvgData =typeof data;

export const data = {
  BB: createObjectURL(BBSvg),
  BK: createObjectURL(BKSvg),
  BN: createObjectURL(BNSvg),
  BP: createObjectURL(BPSvg),
  BQ: createObjectURL(BQSvg),
  BR: createObjectURL(BRSvg),
  WB: createObjectURL(WBSvg),
  WK: createObjectURL(WKSvg),
  WN: createObjectURL(WNSvg),
  WP: createObjectURL(WPSvg),
  WQ: createObjectURL(WQSvg),
  WR: createObjectURL(WRSvg),
} as const;

function createObjectURL(svg: string) {
  return URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
}
