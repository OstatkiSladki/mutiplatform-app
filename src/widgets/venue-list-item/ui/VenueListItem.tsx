import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../entities/venue';
import { Stars } from '../../../shared/ui/stars';
import { styles } from './styles';

export interface VenueListItemProps {
  venue: Venue;
  onPress: (venueId: number) => void;
}

const initial = (name: string): string => name.trim().charAt(0).toUpperCase() || '?';

export const VenueListItem = ({ venue, onPress }: VenueListItemProps) => {
  const { t } = useTranslation('common');
  const rating = parseFloat(venue.rating) || 0;

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress(venue.id)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={venue.name}
    >
      <View style={styles.logo}>
        <Text style={styles.logoLetter}>{initial(venue.name)}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {venue.name}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {venue.address}
        </Text>
      </View>
      <View style={styles.meta}>
        <Stars rating={rating} size={12} />
        <Text style={styles.metaText}>
          {venue.is_open ? t('open') : t('closed')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
