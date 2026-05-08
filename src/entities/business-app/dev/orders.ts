import type { BusinessOrder } from '../model/types';

export const mockOrders: BusinessOrder[] = [
  { id: '10284', client: 'Анна Смирнова', items: 'Средиземноморский боул ×2', amount: 1480, minutesAgo: 2, status: 'Ожидает' },
  { id: '10283', client: 'Иван Петров', items: 'Суши-сет «Закат»', amount: 1500, minutesAgo: 8, status: 'Подтверждён' },
  { id: '10282', client: 'Мария Соколова', items: 'Пекарский сюрприз-пакет ×3', amount: 1800, minutesAgo: 14, status: 'Выполнен' },
  { id: '10281', client: 'Тимур Богданов', items: 'Паста от шефа, микс', amount: 1450, minutesAgo: 22, status: 'Выполнен' },
  { id: '10280', client: 'Сара Хан', items: 'Веган-ролл комбо', amount: 1200, minutesAgo: 31, status: 'Отменён' },
  { id: '10279', client: 'Лука Вебер', items: 'Средиземноморский боул', amount: 1240, minutesAgo: 44, status: 'Выполнен' },
  { id: '10278', client: 'Елена Романова', items: 'Греческий йогурт ×4', amount: 1120, minutesAgo: 60, status: 'Подтверждён' },
];
