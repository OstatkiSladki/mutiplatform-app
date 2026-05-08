import type { ForecastItem } from '../../../entities/business-app/model/types';

export type BoxSize = 'S' | 'M' | 'L';

export interface ForecastModalState {
  mode: 'idle' | 'box' | 'single';
  boxItems: ForecastItem[];
  boxName: string;
  boxSize: BoxSize;
  single: ForecastItem | null;
  singleQty: number;
}
