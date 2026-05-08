import type { ForecastItem } from '../model/types';

export const mockForecast: ForecastItem[] = [
  { id: 'f1', name: 'Хлеб на закваске', sku: 'P-1042', category: 'Выпечка', stock: 48, forecast: 12, risk: 'Высокий' },
  { id: 'f2', name: 'Греческий йогурт 500 г', sku: 'P-1043', category: 'Молочное', stock: 36, forecast: 18, risk: 'Высокий' },
  { id: 'f3', name: 'Круассаны 6 шт.', sku: 'P-1044', category: 'Выпечка', stock: 30, forecast: 18, risk: 'Средний' },
  { id: 'f4', name: 'Веган-ролл комбо', sku: 'P-1045', category: 'Готовая еда', stock: 22, forecast: 8, risk: 'Высокий' },
  { id: 'f5', name: 'Сет холодных супов', sku: 'P-1046', category: 'Готовая еда', stock: 14, forecast: 12, risk: 'Средний' },
  { id: 'f6', name: 'Пакет фруктового салата', sku: 'P-1047', category: 'Готовая еда', stock: 26, forecast: 40, risk: 'Низкий' },
  { id: 'f7', name: 'Пекарский сюрприз-пакет', sku: 'P-1048', category: 'Выпечка', stock: 18, forecast: 14, risk: 'Средний' },
];
