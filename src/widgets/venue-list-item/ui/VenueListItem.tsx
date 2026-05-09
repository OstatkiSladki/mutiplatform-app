import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../entities/venue';
import { Stars } from '../../../shared/ui/stars';
import { Chip } from '../../../shared/ui/chip';
import { Icon } from '../../../shared/ui/icon';
import { theme } from '../../../shared/config/theme';
import {
  pickVenueAvatarPalette,
  venueAvatarLabel,
} from '../../../shared/lib/venue-avatar';
import { styles } from './styles';

export interface VenueListItemProps {
  venue: Venue;
  onPress: (venueId: number) => void;
}

export const VenueListItem = ({ venue, onPress }: VenueListItemProps) => {
  const { t } = useTranslation('catalog');
  const rating = parseFloat(venue.rating) || 0;
  const palette = pickVenueAvatarPalette(venue.id);
  const tags: string[] = [t('venueTagBakery'), t('venueTagSandwiches')];

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress(venue.id)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={venue.name}
    >
      <View
        style={[styles.logo, { backgroundColor: palette.bg, borderColor: theme.client.colors.border }]}
      >
        <Text style={[styles.logoText, { color: palette.fg }]} numberOfLines={1}>
          {venueAvatarLabel(venue.name)}
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.name} numberOfLines={1}>
              {venue.name}
            </Text>
            <Text style={styles.address} numberOfLines={1}>
              {venue.address}
            </Text>
          </View>
          <View style={styles.hours}>
            <Icon
              name="clock"
              size={12}
              color={theme.client.colors.mutedForeground}
            />
            <Text style={styles.hoursText} numberOfLines={1}>
              {t('hoursDefault')}
            </Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Stars rating={rating || 5} size={12} color={theme.client.colors.star} />
          <View style={styles.tags}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} variant="accent" />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
