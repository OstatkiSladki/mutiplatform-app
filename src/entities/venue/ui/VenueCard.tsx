import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/shared/config/theme';
import { CardImage } from '@/shared/ui/card-image';

interface VenueCardProps {
  name: string;
  distance: string;
  imageUrl: string;
}

export const VenueCard: React.FC<VenueCardProps> = ({ name, distance, imageUrl }) => {
  return (
    <View style={styles.card}>
      <CardImage source={{ uri: imageUrl }} aspectRatio={1.5} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.distance}>{distance}</Text>
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
  name: {
    fontSize: theme.typography.fontSizes[5],
    fontWeight: theme.typography.fontWeights.interBold as any,
    color: theme.colors.neutral.black,
    marginBottom: theme.spacing[1],
  },
  distance: {
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[5],
  },
});