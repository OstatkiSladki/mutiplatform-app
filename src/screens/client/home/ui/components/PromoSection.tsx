import React, { useId } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import type { ImageSource } from 'expo-image';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { theme } from '../../../../../shared/config/theme';
import { useBreakpoint } from '../../../../../shared/lib/responsive/use-breakpoint';

const promoAssets = {
  surprise: require('../../../../../../assets/surbricebox.png'),
  nearby: require('../../../../../../assets/near.png'),
  stock: require('../../../../../../assets/stock.png'),
} as const;

export const PromoSection = () => {
  const { isMobile } = useBreakpoint();
  return (
    <View style={styles.grid}>
      <PromoCard
        title="Сюрприз бокс"
        image={promoAssets.surprise}
        size={isMobile ? 'largePhone' : 'largeTablet'}
      />
      <View style={[styles.column, !isMobile && styles.columnTablet]}>
        <PromoCard title="Рядом" image={promoAssets.nearby} size="compact" />
        <PromoCard title="Акции" image={promoAssets.stock} size="compact" />
      </View>
    </View>
  );
};

type PromoCardSize = 'largePhone' | 'largeTablet' | 'compact';

interface PromoCardProps {
  title: string;
  image: ImageSource;
  size: PromoCardSize;
}

/** Lets radial gradient read through — same treatment for every promo tile. */
const PROMO_IMAGE_OVERLAY_OPACITY = 0.88;

const PromoRadialBg = ({ gradientId }: { gradientId: string }) => (
  <Svg style={StyleSheet.absoluteFillObject} pointerEvents="none">
    <Defs>
      <RadialGradient id={gradientId} cx="50%" cy="50%" r="55%" gradientUnits="objectBoundingBox">
        <Stop offset="0" stopColor="#FFB066" />
        <Stop offset="0.5" stopColor="#FA7201" />
        <Stop offset="1" stopColor="#FA7201" />
      </RadialGradient>
    </Defs>
    <Rect width="100%" height="100%" fill={`url(#${gradientId})`} />
  </Svg>
);

const PromoCard = ({ title, image, size }: PromoCardProps) => {
  const compact = size === 'compact';
  const reactId = useId().replace(/:/g, '');
  const gradientId = `promo-radial-${reactId}`;

  return (
    <View
      style={[
        styles.card,
        compact ? styles.cardCompact : null,
        size === 'largePhone' ? styles.cardLargePhone : null,
        size === 'largeTablet' ? styles.cardLargeTablet : null,
      ]}
    >
      <PromoRadialBg gradientId={gradientId} />
      <Image source={image} style={styles.imageFill} contentFit="cover" />
      <View style={styles.titleOverlay} pointerEvents="none">
        <Text style={[styles.title, styles.titleOnPromo]}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: theme.spacing[2],
  },
  column: {
    flex: 1,
    gap: theme.spacing[2],
  },
  /** Tablet/desktop: column is narrower than the large card (ratio ~5:8). */
  columnTablet: {
    flex: 5,
  },
  card: {
    borderRadius: theme.client.radius.card,
    overflow: 'hidden',
    ...theme.client.shadows.card,
  },
  cardLargePhone: {
    flex: 1,
    aspectRatio: 1,
  },
  cardLargeTablet: {
    flex: 8,
    aspectRatio: 1,
  },
  /**
   * Compact cards expand equally to fill the column height, which equals
   * the large card height (both sides of the row are flex siblings with a
   * shared height set by the tallest child — the aspect-ratio large card).
   */
  cardCompact: {
    flex: 1,
  },
  imageFill: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: PROMO_IMAGE_OVERLAY_OPACITY,
  },
  titleOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    padding: theme.spacing[3],
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    fontWeight: '700',
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
  },
  /** Promo overlays images / gradients — always light text (never inherited dark body color). */
  titleOnPromo: {
    color: theme.colors.neutral.white,
  },
});
