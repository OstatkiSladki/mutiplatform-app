import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../../../entities/offer';
import type { Product } from '../../../../../entities/product';
import { Loader } from '../../../../../shared/ui/loader';
import { EmptyState } from '../../../../../widgets/empty-state';
import { ProductCard } from './ProductCard';
import { productGridStyles as styles } from './styles';

export interface ProductGridProps {
  venueId: number;
  venueName: string;
  offers: Offer[];
  productsById: Record<number, Product>;
  isLoading: boolean;
  onPressDetails: (offer: Offer, product?: Product) => void;
}

export const ProductGrid = ({
  venueId,
  venueName,
  offers,
  productsById,
  isLoading,
  onPressDetails,
}: ProductGridProps) => {
  const { t } = useTranslation('catalog');

  if (isLoading) {
    return (
      <View style={styles.loaderWrapper}>
        <Loader size="large" />
      </View>
    );
  }

  if (offers.length === 0) {
    return (
      <View style={styles.emptyWrapper}>
        <EmptyState
          icon="package"
          title={t('emptyProducts')}
          description={t('emptyProductsDescription')}
        />
      </View>
    );
  }

  const productFor = (offer: Offer) => {
    const productId = offer.items?.[0]?.product_id;
    return productId != null ? productsById[productId] : undefined;
  };

  return (
    <View style={styles.grid}>
      {offers.map((offer) => {
        const product = productFor(offer);
        return (
          <View key={offer.id} style={styles.cell}>
            <ProductCard
              venueId={venueId}
              venueName={venueName}
              offer={offer}
              product={product}
              onPressDetails={onPressDetails}
            />
          </View>
        );
      })}
    </View>
  );
};
