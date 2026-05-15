import { Platform } from 'react-native';
import { CartScreen as CartScreenWeb } from './CartScreen.web';
import { BasketScreen } from '../basket/ui/BasketScreen.mobile';

export const CartScreen = Platform.OS === 'web' ? CartScreenWeb : BasketScreen;
