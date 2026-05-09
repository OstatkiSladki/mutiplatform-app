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

export type ProductGridLayout = 'list' | 'flex';

export interface ProductGridProps {
  offers: Offer[];
  productsById: Record<number, Product>;
  isLoading: boolean;
  onPressDetails: (offer: Offer, product?: Product) => void;
  renderQuantitySlot: (offer: Offer, product?: Product) => ReactNode;
  ListHeaderComponent?: React.ReactElement | null;
  layout?: ProductGridLayout;
}

function resolveColumns(isAtLeast: (k: 'sm' | 'md' | 'lg' | 'xl') => boolean): number {
  if (isAtLeast('xl')) return 4;
  if (isAtLeast('md')) return 3;
  return 2;
}

export const ProductGrid = ({
  offers,
  productsById,
  isLoading,
  onPressDetails,
  renderQuantitySlot,
  ListHeaderComponent,
  layout = 'list',
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

  if (layout === 'flex') {
    const colWidth = `${100 / numColumns}%` as const;
    return (
      <View style={styles.flexWrap}>
        {offers.map((offer) => {
          const product = productFor(offer);
          return (
            <View key={offer.id} style={[styles.flexCell, { width: colWidth }]}>
              <OfferCard
                offer={offer}
                product={product}
                onPressDetails={onPressDetails}
                quantitySlot={renderQuantitySlot(offer, product)}
              />
            </View>
          );
        })}
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
        const product = productFor(item);
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
      showsVerticalScrollIndicator={false}
    />
  );
};
