import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../../../shared/config/theme';

export interface ProductInfoProps {
  title: string;
  weightLabel?: string | null;
  description: string;
}

export const ProductInfo = ({ title, weightLabel, description }: ProductInfoProps) => (
  <View style={styles.root}>
    <View style={styles.titleRow}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      {weightLabel ? (
        <Text style={styles.weight} numberOfLines={1}>
          {' '}
          {weightLabel}
        </Text>
      ) : null}
    </View>
    <Text style={styles.description} numberOfLines={6}>
      {description}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    gap: theme.spacing[3],
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  title: {
    flexShrink: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[8],
    lineHeight: theme.typography.fontSizes[8] * theme.typography.lineHeights.tight,
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  weight: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: theme.typography.fontSizes[4] * theme.typography.lineHeights.normal,
    fontWeight: '400',
    color: theme.client.colors.mutedForeground,
  },
  description: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: theme.typography.fontSizes[4] * theme.typography.lineHeights.loose,
    fontWeight: '400',
    color: theme.client.colors.mutedForeground,
  },
});
