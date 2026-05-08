import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDateTime = (input: Date | string | number): string => {
  const date = input instanceof Date ? input : new Date(input);
  return format(date, "d MMMM, HH:mm", { locale: ru });
};

export const formatTime = (input: Date | string | number): string => {
  const date = input instanceof Date ? input : new Date(input);
  return format(date, 'HH:mm', { locale: ru });
};

export const formatDate = (input: Date | string | number): string => {
  const date = input instanceof Date ? input : new Date(input);
  return format(date, 'd MMMM yyyy', { locale: ru });
};
