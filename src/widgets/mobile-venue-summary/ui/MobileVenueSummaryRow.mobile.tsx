import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Venue } from '../../../entities/venue';
import { theme } from '../../../shared/config/theme';
import {
  pickVenueAvatarPalette,
  venueAvatarLabel,
} from '../../../shared/lib/venue-avatar';
import { Icon } from '../../../shared/ui/icon';
import { IconStarAsset } from '../../../shared/ui/mobile/icon-star';

const LOGO_SIZE = 52;

export interface MobileVenueSummaryRowProps {
  venue: Venue;
  hoursLabel: string;
}

/** Single row: logo left, venue stack center, hours anchored bottom-right (no wrap). */
export const MobileVenueSummaryRow = ({ venue, hoursLabel }: MobileVenueSummaryRowProps) => {
  const palette = pickVenueAvatarPalette(venue.id);
  const rating = parseFloat(venue.rating);
  const ratingLabel = Number.isFinite(rating) ? rating.toFixed(1) : '—';

  return (
    <View style={styles.card}>
      <View style={[styles.logo, { backgroundColor: palette.bg }]}>
        <Text style={[styles.logoText, { color: palette.fg }]} numberOfLines={2}>
          {venueAvatarLabel(venue.name)}
        </Text>
      </View>

      <View style={styles.mid}>
        <Text style={styles.title} numberOfLines={2}>
          {venue.name}
        </Text>
        <Text style={styles.address} numberOfLines={2}>
          {venue.address}
        </Text>
        <View style={styles.ratingRow}>
          <IconStarAsset size={22} color={theme.colors.primary[100]} />
          <Text style={styles.ratingText}>{ratingLabel}</Text>
        </View>
      </View>

      <View style={styles.hoursRail}>
        <View style={styles.hours}>
          <Icon name="clock" size={theme.typography.fontSizes[5]} color={theme.colors.neutral[5]} />
          <Text style={styles.hoursText} numberOfLines={1} ellipsizeMode="tail">
            {hoursLabel}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    paddingHorizontal: 0,
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.card,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    alignSelf: 'center',
    borderRadius: theme.client.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[1],
  },
  logoText: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[2],
    textAlign: 'center',
  },
  mid: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing[1],
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[6],
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    color: theme.colors.neutral[1],
  },
  address: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[3],
    lineHeight: theme.typography.fontSizes[3] * theme.typography.lineHeights.normal,
    color: theme.client.colors.mutedForeground,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  ratingText: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[6],
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    color: theme.colors.neutral[1],
  },
  hoursRail: {
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    flexShrink: 0,
    maxWidth: '34%',
    minWidth: 0,
  },
  hours: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    justifyContent: 'flex-end',
  },
  hoursText: {
    flexShrink: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[6],
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    color: theme.colors.neutral[1],
    textAlign: 'right',
  },
});
