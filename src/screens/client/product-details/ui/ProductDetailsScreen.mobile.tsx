import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Offer } from '../../../../entities/offer';
import { useOfferList } from '../../../../entities/offer';
import type { Product } from '../../../../entities/product';
import { useProductList } from '../../../../entities/product';
import type { ClientStackParamList } from '../../../../navigation/types';
import { theme } from '../../../../shared/config/theme';
import { MobileScreenChrome } from '../../../../shared/ui/mobile';
import { formatPrice } from '../../../../shared/lib/format';
import { useAddToCart } from '../../../../features/add-to-cart';
import {
  BottomActionBar,
  NutritionInfo,
  ProductHero,
  ProductInfo,
  RelatedProductsSection,
  nutritionFromProduct,
} from './components';

type R = RouteProp<ClientStackParamList, 'ProductDetails'>;
type Nav = NativeStackNavigationProp<ClientStackParamList>;

const resolveWeight = (product?: Product): string | null => {
  if (!product) return null;
  const c = product.characteristics_json as Record<string, unknown> | undefined;
  const weight = c?.weight ?? c?.['вес'];
  return typeof weight === 'string' ? weight : null;
};

const resolveProduct = (
  offer: Offer,
  explicit: Product | undefined,
  productsById: Record<number, Product>,
): Product | undefined => {
  if (explicit) return explicit;
  const pid = offer.items[0]?.product_id;
  return pid !== undefined ? productsById[pid] : undefined;
};

export const ProductDetailsScreen = () => {
  const { t } = useTranslation('catalog');
  const route = useRoute<R>();
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const pagePadding = width >= theme.breakpoints.md ? theme.spacing[6] : theme.spacing[3];
  const [searchQuery, setSearchQuery] = useState('');
  const { venueId, venueName, offer, product: routeProduct } = route.params;

  const offersQuery = useOfferList({ venue_id: venueId, status: 'active', limit: 50 });
  const productsQuery = useProductList({ limit: 100 });

  const productsById = useMemo(() => {
    const map: Record<number, Product> = {};
    productsQuery.data?.items.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, [productsQuery.data]);

  const product = useMemo(
    () => resolveProduct(offer, routeProduct, productsById),
    [offer, routeProduct, productsById],
  );

  const displayName = product?.name ?? t('productDetails.fallbackName', { id: offer.id });
  const imageUrl = product?.image_urls?.[0];
  const weightLabel = resolveWeight(product);
  const description =
    product?.description?.trim() ||
    t('productDetails.ingredientsFallback');

  const price = parseFloat(offer.current_price) || 0;
  const nutritionValues = useMemo(() => nutritionFromProduct(product), [product]);

  const { quantity, max, setQuantity } = useAddToCart({
    venueId,
    venueName,
    offer,
    displayName,
    imageUrl,
  });

  const relatedOffers = useMemo(() => {
    const items = offersQuery.data?.items ?? [];
    return items.filter((o) => o.id !== offer.id).slice(0, 16);
  }, [offersQuery.data?.items, offer.id]);

  const goBack = useCallback(() => {
    navigation.navigate('Venue', { venueId });
  }, [navigation, venueId]);

  const goProfile = useCallback(() => navigation.navigate('Profile'), [navigation]);

  const openRelated = useCallback(
    (nextOffer: Offer, nextProduct?: Product) => {
      navigation.navigate('ProductDetails', {
        venueId,
        venueName,
        offer: nextOffer,
        product: nextProduct,
      });
    },
    [navigation, venueId, venueName],
  );

  const addLabel =
    quantity > 0 ? t('productDetails.inCart', { count: quantity }) : t('productDetails.addShort');

  const handleAdd = useCallback(() => {
    setQuantity(Math.max(1, quantity));
  }, [quantity, setQuantity]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <MobileScreenChrome
        variant="stack"
        omitSafeArea
        horizontalInset={pagePadding}
        searchValue={searchQuery}
        searchPlaceholder={t('searchPlaceholder')}
        onSearchChange={setSearchQuery}
        onBack={goBack}
        onPressProfile={goProfile}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: pagePadding }]}
        showsVerticalScrollIndicator={false}
      >
        <ProductHero imageUri={imageUrl} />
        <ProductInfo title={displayName} weightLabel={weightLabel} description={description} />
        <NutritionInfo values={nutritionValues} />
        <RelatedProductsSection
          offers={relatedOffers}
          productsById={productsById}
          onSelectOffer={openRelated}
        />
      </ScrollView>
      <BottomActionBar
        priceLabel={formatPrice(price)}
        buttonTitle={addLabel}
        onAddPress={handleAdd}
        disabled={max === 0}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing[5],
    gap: theme.spacing[5],
    maxWidth: theme.layout.containerMaxWidth,
    width: '100%',
    alignSelf: 'center',
  },
});
