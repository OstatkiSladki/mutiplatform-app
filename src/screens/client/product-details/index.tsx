import { Platform } from 'react-native';
import { ProductDetailsScreen as ProductDetailsScreenWeb } from './ui/ProductDetailsScreen';
import { ProductDetailsScreen as ProductDetailsScreenMobile } from './ui/ProductDetailsScreen.mobile';

export const ProductDetailsScreen =
  Platform.OS === 'web' ? ProductDetailsScreenWeb : ProductDetailsScreenMobile;
