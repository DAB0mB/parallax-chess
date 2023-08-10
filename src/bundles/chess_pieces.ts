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

export const BB = createObjectURL(BBSvg);
export const BK = createObjectURL(BKSvg);
export const BN = createObjectURL(BNSvg);
export const BP = createObjectURL(BPSvg);
export const BQ = createObjectURL(BQSvg);
export const BR = createObjectURL(BRSvg);
export const WB = createObjectURL(WBSvg);
export const WK = createObjectURL(WKSvg);
export const WN = createObjectURL(WNSvg);
export const WP = createObjectURL(WPSvg);
export const WQ = createObjectURL(WQSvg);
export const WR = createObjectURL(WRSvg);

function createObjectURL(svg: string) {
  return URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
}
