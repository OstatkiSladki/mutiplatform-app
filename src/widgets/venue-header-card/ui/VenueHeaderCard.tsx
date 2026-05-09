import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../entities/venue';
import { Stars } from '../../../shared/ui/stars';
import { Chip } from '../../../shared/ui/chip';
import { Icon } from '../../../shared/ui/icon';
import { theme } from '../../../shared/config/theme';
import { styles } from './styles';

export interface VenueHeaderCardProps {
  venue: Venue;
}

const initial = (name: string): string => name.trim().charAt(0).toUpperCase() || '?';

export const VenueHeaderCard = ({ venue }: VenueHeaderCardProps) => {
  const { t } = useTranslation('catalog');
  const rating = parseFloat(venue.rating) || 0;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.logo}>
          <Text style={styles.logoLetter}>{initial(venue.name)}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={2}>
            {venue.name}
          </Text>
          <Text style={styles.address}>{venue.address}</Text>
          <View style={styles.ratingRow}>
            <Stars rating={rating} size={16} color={theme.client.colors.star} />
            {rating > 0 ? <Text style={styles.ratingValue}>{rating.toFixed(1)}</Text> : null}
          </View>
          <View style={styles.chipsRow}>
            <Chip label={t('venueTagBakery')} variant="accent" />
            <Chip label={t('venueTagSandwiches')} variant="success" />
            <View style={styles.hoursRow}>
              <Icon name="clock" size={14} color={theme.client.colors.mutedForeground} />
              <Text style={styles.hoursText}>{t('hoursDefault')}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
