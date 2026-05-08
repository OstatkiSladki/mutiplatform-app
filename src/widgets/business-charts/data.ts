import type { OverviewPeriod } from '../../screens/business/overview/data';

export interface RevenuePoint {
  d: string;
  v: number;
}

export interface HourlyPoint {
  h: string;
  a: number;
  b: number;
}

export const revenueByPeriod: Record<OverviewPeriod, RevenuePoint[]> = {
  '7d': [
    { d: 'Пн', v: 152 },
    { d: 'Вт', v: 160 },
    { d: 'Ср', v: 175 },
    { d: 'Чт', v: 150 },
    { d: 'Пт', v: 130 },
    { d: 'Сб', v: 190 },
    { d: 'Вс', v: 230 },
  ],
  '30d': [
    { d: '1', v: 120 },
    { d: '5', v: 145 },
    { d: '10', v: 180 },
    { d: '15', v: 160 },
    { d: '20', v: 200 },
    { d: '25', v: 220 },
    { d: '30', v: 250 },
  ],
  '90d': [
    { d: 'Янв', v: 380 },
    { d: 'Фев', v: 420 },
    { d: 'Мар', v: 510 },
    { d: 'Апр', v: 470 },
    { d: 'Май', v: 560 },
    { d: 'Июн', v: 640 },
  ],
};

export const hoursData: HourlyPoint[] = [
  { h: '08', a: 200, b: 280 },
  { h: '10', a: 230, b: 310 },
  { h: '12', a: 180, b: 240 },
  { h: '14', a: 290, b: 360 },
  { h: '16', a: 440, b: 510 },
  { h: '18', a: 360, b: 430 },
  { h: '20', a: 300, b: 360 },
  { h: '22', a: 220, b: 280 },
];
