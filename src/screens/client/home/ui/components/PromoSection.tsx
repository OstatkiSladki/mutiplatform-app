import React, { useId } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import type { ImageSource } from 'expo-image';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { theme } from '../../../../../shared/config/theme';

const promoAssets = {
  surprise: require('../../../../../../assets/surbricebox.png'),
  nearby: require('../../../../../../assets/near.png'),
  stock: require('../../../../../../assets/stock.png'),
} as const;

export interface PromoSectionProps {
  isTablet: boolean;
}

export const PromoSection = ({ isTablet }: PromoSectionProps) => (
  <View style={styles.grid}>
    <PromoCard
      title="Сюрприз бокс"
      image={promoAssets.surprise}
      size={isTablet ? 'largeTablet' : 'largePhone'}
    />
    <View style={[styles.column, isTablet ? styles.columnTablet : styles.columnPhone]}>
      <PromoCard title="Рядом" image={promoAssets.nearby} size="compact" />
      <PromoCard title="Акции" image={promoAssets.stock} size="compact" />
    </View>
  </View>
);

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
    flexWrap: 'wrap',
    gap: theme.spacing[2],
  },
  column: {
    flexGrow: 1,
    gap: theme.spacing[2],
    minWidth: 150,
  },
  columnPhone: {
    flexBasis: '48%',
  },
  columnTablet: {
    flexBasis: '31%',
  },
  card: {
    flexGrow: 1,
    minWidth: 150,
    borderRadius: theme.client.radius.card,
    overflow: 'hidden',
    ...theme.client.shadows.card,
  },
  cardLargePhone: {
    flexBasis: '48%',
    aspectRatio: 1,
  },
  cardLargeTablet: {
    flexBasis: '31%',
    aspectRatio: 1,
  },
  cardCompact: {
    aspectRatio: 2.2,
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
