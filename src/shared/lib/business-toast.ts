import Toast from 'react-native-toast-message';

export type BusinessToastType = 'success' | 'error' | 'info';

export function showBusinessToast(text: string, type: BusinessToastType = 'success'): void {
  Toast.show({ type, text1: text, position: 'top', visibilityTime: 2400 });
}
