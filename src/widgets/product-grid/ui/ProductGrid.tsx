import { ReactNode } from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../entities/offer';
import type { Product } from '../../../entities/product';
import { Loader } from '../../../shared/ui/loader';
import { useBreakpoint } from '../../../shared/lib/responsive';
import { EmptyState } from '../../../widgets/empty-state';
import { OfferCard } from './OfferCard';
import { styles } from './styles';

export interface ProductGridProps {
  offers: Offer[];
  productsById: Record<number, Product>;
  isLoading: boolean;
  onPressDetails: (offer: Offer, product?: Product) => void;
  renderQuantitySlot: (offer: Offer, product?: Product) => ReactNode;
  ListHeaderComponent?: React.ReactElement | null;
}

function resolveColumns(isAtLeast: (k: 'sm'|'md'|'lg'|'xl') => boolean): number {
  if (isAtLeast('xl')) return 4;
  if (isAtLeast('lg')) return 3;
  if (isAtLeast('md')) return 2;
  return 1;
}

export const ProductGrid = ({
  offers,
  productsById,
  isLoading,
  onPressDetails,
  renderQuantitySlot,
  ListHeaderComponent,
}: ProductGridProps) => {
  const { t } = useTranslation('catalog');
  const { isAtLeast } = useBreakpoint();
  const numColumns = resolveColumns(isAtLeast);

  if (isLoading) {
    return (
      <View style={styles.loaderWrapper}>
        <Loader size="large" />
      </View>
    );
  }

  return (
    <FlatList
      key={numColumns}
      data={offers}
      keyExtractor={(o) => String(o.id)}
      numColumns={numColumns}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => {
        const productId = item.items?.[0]?.product_id;
        const product = productId != null ? productsById[productId] : undefined;
        return (
          <OfferCard
            offer={item}
            product={product}
            onPressDetails={onPressDetails}
            quantitySlot={renderQuantitySlot(item, product)}
          />
        );
      }}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.emptyWrapper}>
          <EmptyState
            icon="package"
            title={t('emptyProducts')}
            description={t('emptyProductsDescription')}
          />
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};
