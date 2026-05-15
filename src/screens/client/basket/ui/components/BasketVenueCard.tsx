import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { Venue } from '../../../../../entities/venue';
import { theme } from '../../../../../shared/config/theme';
import { VenueInfo } from '../../../venue/ui/components/VenueInfo.mobile';

export interface BasketVenueCardProps {
  venue?: Venue;
  isLoading?: boolean;
  variant?: 'standalone' | 'embedded';
}

export const BasketVenueCard = ({
  venue,
  isLoading,
  variant = 'standalone',
}: BasketVenueCardProps) => {
  if (variant === 'embedded') {
    if (!venue) return null;
    return <VenueInfo venue={venue} contentInset="flush" />;
  }

  if (isLoading || !venue) {
    return (
      <View style={[styles.card, styles.skeleton]}>
        <View style={[styles.logo, styles.shimmer]} />
        <View style={styles.skeletonCenter}>
          <View style={[styles.line, styles.shimmer]} />
          <View style={[styles.lineShort, styles.shimmer]} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <VenueInfo venue={venue} contentInset="flush" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.client.radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.neutral[7],
    backgroundColor: theme.client.colors.card,
    padding: theme.spacing[2],
  },
  skeleton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[2],
  },
  shimmer: {
    backgroundColor: theme.colors.neutral[8],
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: theme.client.radius.sm,
  },
  skeletonCenter: {
    flex: 1,
    gap: theme.spacing[1],
    minWidth: 0,
  },
  line: {
    height: theme.spacing[4],
    borderRadius: theme.radius.sm,
    width: '80%',
  },
  lineShort: {
    height: theme.spacing[3],
    borderRadius: theme.radius.sm,
    width: '50%',
  },
});
