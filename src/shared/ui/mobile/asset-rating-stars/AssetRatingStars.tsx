import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../../config/theme';

export interface AssetRatingStarsProps {
  rating: number;
  max?: number;
  size?: number;
}

const PATHS = [
  'M10.2596 3.47287L11.1996 5.35287C11.3263 5.61287 11.6663 5.85953 11.953 5.91287L13.653 6.19287C14.7396 6.37287 14.993 7.15953 14.213 7.9462L12.8863 9.27287C12.6663 9.49287 12.5396 9.9262 12.613 10.2395L12.993 11.8795C13.293 13.1729 12.5996 13.6795 11.4596 12.9995L9.8663 12.0529C9.57964 11.8795 9.09964 11.8795 8.81297 12.0529L7.21964 12.9995C6.07964 13.6729 5.3863 13.1729 5.6863 11.8795L6.0663 10.2395C6.1263 9.91953 5.99964 9.4862 5.77964 9.2662L4.45297 7.93953C3.67297 7.15953 3.9263 6.37287 5.01297 6.1862L6.71297 5.9062C6.99964 5.85953 7.33964 5.6062 7.4663 5.3462L8.4063 3.4662C8.91964 2.45287 9.7463 2.45287 10.2596 3.47287Z',
  'M5.33398 3.83398H1.33398C1.06065 3.83398 0.833984 3.60732 0.833984 3.33398C0.833984 3.06065 1.06065 2.83398 1.33398 2.83398H5.33398C5.60732 2.83398 5.83398 3.06065 5.83398 3.33398C5.83398 3.60732 5.60732 3.83398 5.33398 3.83398Z',
  'M3.33398 13.166H1.33398C1.06065 13.166 0.833984 12.9393 0.833984 12.666C0.833984 12.3927 1.06065 12.166 1.33398 12.166H3.33398C3.60732 12.166 3.83398 12.3927 3.83398 12.666C3.83398 12.9393 3.60732 13.166 3.33398 13.166Z',
  'M2.00065 8.5H1.33398C1.06065 8.5 0.833984 8.27333 0.833984 8C0.833984 7.72667 1.06065 7.5 1.33398 7.5H2.00065C2.27398 7.5 2.50065 7.72667 2.50065 8C2.50065 8.27333 2.27398 8.5 2.00065 8.5Z',
];

export const AssetRatingStars = ({ rating, max = 5, size = 14 }: AssetRatingStarsProps) => {
  const filled = Math.min(max, Math.max(0, Math.round(rating)));
  const fillActive = theme.client.colors.star;
  const fillMuted = theme.colors.neutral[8];

  return (
    <View style={styles.row}>
      {Array.from({ length: max }).map((_, index) => (
        <View key={index} style={index < max - 1 ? styles.starWrap : undefined}>
          <Svg width={size} height={size} viewBox="0 0 16 16">
            {PATHS.map((d, i) => (
              <Path key={i} d={d} fill={index < filled ? fillActive : fillMuted} />
            ))}
          </Svg>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starWrap: {
    marginRight: theme.spacing[1],
  },
});
