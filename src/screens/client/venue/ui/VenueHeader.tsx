import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../../entities/venue';
import { Stars } from '../../../../shared/ui/stars';
import { Badge } from '../../../../shared/ui/badge';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import { styles } from './styles';

export interface VenueHeaderProps {
  venue: Venue;
}

const initial = (name: string): string => name.trim().charAt(0).toUpperCase() || '?';

export const VenueHeader = ({ venue }: VenueHeaderProps) => {
  const { t } = useTranslation('common');
  const rating = parseFloat(venue.rating) || 0;

  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.logo}>
          <Text style={styles.logoLetter}>{initial(venue.name)}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {venue.name}
        </Text>
        <Badge
          label={venue.is_open ? t('open') : t('closed')}
          variant={venue.is_open ? 'success' : 'neutral'}
        />
      </View>
      <Text style={styles.address}>{venue.address}</Text>
      <View style={styles.metaRow}>
        <Stars rating={rating} size={14} />
        <Text style={styles.metaText}>{rating ? rating.toFixed(1) : '—'}</Text>
        <View style={{ flex: 1 }} />
        {venue.phone ? (
          <View style={styles.metaRow}>
            <Icon name="phone" size={14} color={theme.colors.neutral[3]} />
            <Text style={styles.metaText}>{venue.phone}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
