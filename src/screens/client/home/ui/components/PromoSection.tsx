import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import type { ImageSource } from 'expo-image';
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
      tone="primary"
    />
    <View style={[styles.column, isTablet ? styles.columnTablet : styles.columnPhone]}>
      <PromoCard title="Рядом" image={promoAssets.nearby} size="compact" tone="soft" />
      <PromoCard title="Акции" image={promoAssets.stock} size="compact" tone="primary" />
    </View>
  </View>
);

type PromoCardSize = 'largePhone' | 'largeTablet' | 'compact';

interface PromoCardProps {
  title: string;
  image: ImageSource;
  size: PromoCardSize;
  tone: 'primary' | 'soft';
}

const PromoCard = ({ title, image, size, tone }: PromoCardProps) => {
  const compact = size === 'compact';

  return (
    <View
      style={[
        styles.card,
        tone === 'soft' ? styles.cardSoft : styles.cardPrimary,
        compact ? styles.cardCompact : null,
        size === 'largePhone' ? styles.cardLargePhone : null,
        size === 'largeTablet' ? styles.cardLargeTablet : null,
      ]}
    >
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Image
        source={image}
        style={compact ? styles.imageCompact : styles.image}
        contentFit="contain"
      />
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
    padding: theme.spacing[3],
    justifyContent: 'space-between',
    ...theme.client.shadows.card,
  },
  cardPrimary: {
    backgroundColor: theme.colors.primary[100],
  },
  cardSoft: {
    backgroundColor: theme.colors.primary[80],
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  copy: {
    flexShrink: 0,
    paddingRight: theme.spacing[2],
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    fontWeight: '700',
    color: theme.client.colors.primaryForeground,
  },
  image: {
    width: '100%',
    flex: 1,
    marginTop: theme.spacing[2],
  },
  imageCompact: {
    width: '56%',
    aspectRatio: 1.35,
  },
});
