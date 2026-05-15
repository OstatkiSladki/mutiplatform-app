import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Venue } from '../../../../../entities/venue';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';
import {
  pickVenueAvatarPalette,
  venueAvatarLabel,
} from '../../../../../shared/lib/venue-avatar';
import { VenueStarsAsset } from './VenueStarsAsset.mobile';

const LOGO = theme.spacing[9] + theme.spacing[1];

export interface SurpriseBoxVenueRowProps {
  venue: Venue;
  hoursLabel: string;
}

export const SurpriseBoxVenueRow = ({ venue, hoursLabel }: SurpriseBoxVenueRowProps) => {
  const palette = pickVenueAvatarPalette(venue.id);

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.logo,
          { backgroundColor: palette.bg, borderColor: theme.colors.neutral[7] },
        ]}
      >
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
        <VenueStarsAsset />
      </View>

      <View style={styles.hours}>
        <Icon name="clock" size={theme.typography.fontSizes[5]} color={theme.client.colors.mutedForeground} />
        <Text style={styles.hoursText} numberOfLines={2}>
          {hoursLabel}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: theme.spacing[3],
    borderRadius: theme.client.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.neutral[7],
    backgroundColor: theme.client.colors.card,
  },
  logo: {
    width: LOGO,
    height: LOGO,
    borderRadius: theme.client.radius.sm,
    borderWidth: 1,
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
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
  },
  address: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[3],
    lineHeight: theme.typography.fontSizes[3] * theme.typography.lineHeights.normal,
    color: theme.client.colors.mutedForeground,
  },
  hours: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    maxWidth: theme.spacing[9] + theme.spacing[7],
  },
  hoursText: {
    flexShrink: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[6],
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
  },
});
