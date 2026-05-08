import type { BusinessOffer } from '../model/types';

export const mockOffers: BusinessOffer[] = [
  { id: 'o1', name: 'Хлеб на закваске', sku: 'P-1042', category: 'Выпечка', stock: 48, oldPrice: 400, price: 240, status: 'Черновик' },
  { id: 'o2', name: 'Греческий йогурт 500 г', sku: 'P-1043', category: 'Молочное', stock: 36, oldPrice: 400, price: 280, status: 'Опубликовано' },
  { id: 'o3', name: 'Круассаны 6 шт.', sku: 'P-1044', category: 'Выпечка', stock: 30, oldPrice: 400, price: 260, status: 'Опубликовано' },
  { id: 'o4', name: 'Веган-ролл комбо', sku: 'P-1045', category: 'Готовая еда', stock: 22, oldPrice: 400, price: 240, status: 'Черновик' },
];
