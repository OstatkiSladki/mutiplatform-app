export type RiskLevel = 'Высокий' | 'Средний' | 'Низкий';
export type OfferStatus = 'Опубликовано' | 'Черновик';
export type OrderStatus = 'Ожидает' | 'Подтверждён' | 'Выполнен' | 'Отменён';

export interface ForecastItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  forecast: number;
  risk: RiskLevel;
}

export interface BusinessOffer {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  oldPrice: number;
  price: number;
  status: OfferStatus;
}

export interface BusinessOrder {
  id: string;
  client: string;
  items: string;
  amount: number;
  minutesAgo: number;
  status: OrderStatus;
}

export interface SurpriseBoxItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
}
