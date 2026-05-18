import { withMobileLayout } from '../../../shared/lib/responsive';
import { CartScreen as CartScreenWeb } from './CartScreen.web';
import { BasketScreen } from '../basket/ui/BasketScreen.mobile';

export const CartScreen = withMobileLayout(BasketScreen, CartScreenWeb);
