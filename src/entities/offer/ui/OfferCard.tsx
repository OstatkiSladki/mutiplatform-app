import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/shared/config/theme';
import { CardImage } from '@/shared/ui/card-image';

interface OfferCardProps {
  title: string;
  price: string;
  imageUrl: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({ title, price, imageUrl }) => {
  return (
    <View style={styles.card}>
      <CardImage source={{ uri: imageUrl }} aspectRatio={1} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    ...theme.shadows.tight[2] as any,
  },
  content: {
    padding: theme.spacing[3],
  },
  title: {
    fontSize: theme.typography.fontSizes[4],
    fontWeight: theme.typography.fontWeights.interBold as any,
    color: theme.colors.neutral.black,
    marginBottom: theme.spacing[1],
  },
  price: {
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.primary[100],
    fontWeight: theme.typography.fontWeights.interBold as any,
  },
});