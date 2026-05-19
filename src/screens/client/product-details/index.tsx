import { withMobileLayout } from '../../../shared/lib/responsive';
import { ProductDetailsScreen as ProductDetailsScreenWeb } from './ui/ProductDetailsScreen';
import { ProductDetailsScreen as ProductDetailsScreenMobile } from './ui/ProductDetailsScreen.mobile';

export const ProductDetailsScreen = withMobileLayout(
  ProductDetailsScreenMobile,
  ProductDetailsScreenWeb,
);
