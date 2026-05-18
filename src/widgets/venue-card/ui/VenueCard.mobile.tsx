import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../entities/venue';
import { Icon } from '../../../shared/ui/icon';
import { theme } from '../../../shared/config/theme';
import { pickVenueCover } from '../../../shared/assets/client';
import { styles } from './styles';

export interface VenueCardProps {
  venue: Venue;
  onPress: (venueId: number) => void;
}

export const VenueCard = ({ venue, onPress }: VenueCardProps) => {
  const { t } = useTranslation('catalog');
  const rating = parseFloat(venue.rating) || 5;
  const cover = pickVenueCover(venue.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(venue.id)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={venue.name}
    >
      <Image source={cover} style={styles.cover} contentFit="cover" />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {venue.name}
        </Text>
        <Text style={styles.tags} numberOfLines={1}>
          {t('venueTagsDefault')}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Icon name="star" size={12} color={theme.client.colors.star} />
            <Text style={styles.metaTextStrong}>{rating.toFixed(0)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon
              name="map-pin"
              size={12}
              color={theme.client.colors.mutedForeground}
            />
            <Text style={styles.metaText}>{t('distanceDefault')}</Text>
          </View>
          <View style={styles.metaSpacer} />
          <View style={styles.metaItem}>
            <Icon
              name="clock"
              size={12}
              color={theme.client.colors.mutedForeground}
            />
            <Text style={styles.metaText}>{t('hoursDefault')}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
