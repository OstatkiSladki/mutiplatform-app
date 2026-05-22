import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../../../entities/venue';
import { Icon } from '../../../../../shared/ui/icon';
import { IconStarAsset } from '../../../../../shared/ui/mobile/icon-star';
import { theme } from '../../../../../shared/config/theme';
import {
  pickVenueAvatarPalette,
  venueAvatarLabel,
} from '../../../../../shared/lib/venue-avatar';
import { formatVenueHoursLabel } from '../../../../../widgets/mobile-venue-summary';
import { venueInfoStyles as styles } from './styles';

export interface VenueInfoCardProps {
  venue: Venue;
}

const STAR_SIZE = 18;

const CATEGORY_TAGS = [
  { key: 'venueTagBakery', icon: 'coffee' as const },
  { key: 'venueTagSandwiches', icon: 'menu' as const },
];

export const VenueInfoCard = ({ venue }: VenueInfoCardProps) => {
  const { t } = useTranslation('catalog');
  const rating = parseFloat(venue.rating) || 0;
  const roundedRating = Math.round(rating || 5);
  const palette = pickVenueAvatarPalette(venue.id);
  const logoLabel = venueAvatarLabel(venue.name);

  const hoursLabel = useMemo(
    () =>
      formatVenueHoursLabel(
        venue.work_schedule as Record<string, unknown> | undefined,
        t('hoursDefault'),
      ),
    [t, venue.work_schedule],
  );

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.logo, { backgroundColor: palette.bg }]}>
          <Text style={[styles.logoText, { color: palette.fg }]} numberOfLines={2}>
            {logoLabel}
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.titleBlock}>
            <Text style={styles.name} numberOfLines={2}>
              {venue.name}
            </Text>
            <Text style={styles.address}>{venue.address}</Text>
          </View>
          <View style={styles.ratingRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStarAsset
                key={i}
                size={STAR_SIZE}
                color={i < roundedRating ? theme.colors.primary[100] : theme.colors.neutral[7]}
              />
            ))}
          </View>
          <View style={styles.metaRow}>
            {CATEGORY_TAGS.map(({ key, icon }) => (
              <View key={key} style={styles.categoryChip}>
                <Icon name={icon} size={14} color={theme.client.colors.accentForeground} />
                <Text style={styles.categoryChipText}>{t(key)}</Text>
              </View>
            ))}
            <View style={styles.hoursRow}>
              <Icon name="clock" size={14} color={theme.client.colors.mutedForeground} />
              <Text style={styles.hoursText}>{hoursLabel}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
