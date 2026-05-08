import type { IconName } from '../../../shared/ui/icon';

export type OverviewPeriod = '7d' | '30d' | '90d';

export interface KpiStat {
  labelKey: string;
  value: string;
  delta: string;
  up: boolean;
  icon: IconName;
  color: string;
}

export interface TopSaleRow {
  rank: string;
  name: string;
  sold: number;
  revenue: string;
  pct: string;
  pillBg: string;
  pillFg: string;
}

export interface OutsiderRow {
  rank: string;
  name: string;
  sold: number;
}

export const PERIOD_KEYS: OverviewPeriod[] = ['7d', '30d', '90d'];

export const statsByPeriod: Record<OverviewPeriod, KpiStat[]> = {
  '7d': [
    { labelKey: 'overview.kpi.sold', value: '320', delta: '+5%', up: true, icon: 'box', color: '#d946ef' },
    { labelKey: 'overview.kpi.revenue', value: '38 тыс. ₽', delta: '-3%', up: false, icon: 'dollar-sign', color: '#f97316' },
    { labelKey: 'overview.kpi.aov', value: '620 ₽', delta: '+4%', up: true, icon: 'file-text', color: '#3b82f6' },
    { labelKey: 'overview.kpi.saved', value: '85 кг', delta: '+1%', up: true, icon: 'feather', color: '#10b981' },
  ],
  '30d': [
    { labelKey: 'overview.kpi.sold', value: '1280', delta: '+12%', up: true, icon: 'box', color: '#d946ef' },
    { labelKey: 'overview.kpi.revenue', value: '150 тыс. ₽', delta: '-10%', up: false, icon: 'dollar-sign', color: '#f97316' },
    { labelKey: 'overview.kpi.aov', value: '650 ₽', delta: '+8%', up: true, icon: 'file-text', color: '#3b82f6' },
    { labelKey: 'overview.kpi.saved', value: '342 кг', delta: '+2%', up: true, icon: 'feather', color: '#10b981' },
  ],
  '90d': [
    { labelKey: 'overview.kpi.sold', value: '3850', delta: '+18%', up: true, icon: 'box', color: '#d946ef' },
    { labelKey: 'overview.kpi.revenue', value: '470 тыс. ₽', delta: '+6%', up: true, icon: 'dollar-sign', color: '#f97316' },
    { labelKey: 'overview.kpi.aov', value: '680 ₽', delta: '+11%', up: true, icon: 'file-text', color: '#3b82f6' },
    { labelKey: 'overview.kpi.saved', value: '1024 кг', delta: '+9%', up: true, icon: 'feather', color: '#10b981' },
  ],
};

export const topSales: TopSaleRow[] = [
  { rank: '01', name: 'Средиземноморский боул', sold: 342, revenue: '410 400₽', pct: '46%', pillBg: '#d1fae5', pillFg: '#047857' },
  { rank: '02', name: 'Суши-сет «Закат»', sold: 286, revenue: '321 750₽', pct: '36%', pillBg: '#cffafe', pillFg: '#0e7490' },
  { rank: '03', name: 'Пекарский сюрприз-пакет', sold: 218, revenue: '163 500₽', pct: '26%', pillBg: '#fef3c7', pillFg: '#b45309' },
  { rank: '04', name: 'Паста от шефа, микс', sold: 174, revenue: '195 750₽', pct: '16%', pillBg: '#fce7f3', pillFg: '#be185d' },
  { rank: '05', name: 'Боул с курицей терияки', sold: 152, revenue: '152 000₽', pct: '14%', pillBg: '#ede9fe', pillFg: '#6d28d9' },
  { rank: '06', name: 'Пицца-ассорти', sold: 140, revenue: '168 000₽', pct: '13%', pillBg: '#ffe4e6', pillFg: '#be123c' },
  { rank: '07', name: 'Завтрак «Энерджи»', sold: 128, revenue: '89 600₽', pct: '11%', pillBg: '#e0f2fe', pillFg: '#0369a1' },
  { rank: '08', name: 'Десерт-сет «Сладкий час»', sold: 110, revenue: '77 000₽', pct: '9%', pillBg: '#fce7f3', pillFg: '#be185d' },
  { rank: '09', name: 'Греческий салат гранд', sold: 98, revenue: '68 600₽', pct: '8%', pillBg: '#d1fae5', pillFg: '#047857' },
  { rank: '10', name: 'Бургер-комбо XL', sold: 84, revenue: '92 400₽', pct: '7%', pillBg: '#fef3c7', pillFg: '#b45309' },
];

export const outsiders: OutsiderRow[] = [
  { rank: '01', name: 'Веган-ролл комбо', sold: 12 },
  { rank: '02', name: 'Сет холодных супов', sold: 8 },
  { rank: '03', name: 'Пакет фруктового салата', sold: 0 },
  { rank: '04', name: 'Тарт с тунцом', sold: 5 },
  { rank: '05', name: 'Смузи-набор «Детокс»', sold: 4 },
  { rank: '06', name: 'Хумус-плато', sold: 3 },
  { rank: '07', name: 'Сэндвич с индейкой', sold: 2 },
  { rank: '08', name: 'Овощной киш', sold: 1 },
];
