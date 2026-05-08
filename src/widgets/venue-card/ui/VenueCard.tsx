import { Text, TouchableOpacity, View } from 'react-native';
import type { Venue } from '../../../entities/venue';
import { Badge } from '../../../shared/ui/badge';
import { Icon } from '../../../shared/ui/icon';
import { Stars } from '../../../shared/ui/stars';
import { theme } from '../../../shared/config/theme';
import { useBreakpoint } from '../../../shared/lib/responsive';
import { styles } from './styles';

export interface VenueCardProps {
  venue: Venue;
  onPress: (venueId: number) => void;
}

const initial = (name: string): string => name.trim().charAt(0).toUpperCase() || '?';

export const VenueCard = ({ venue, onPress }: VenueCardProps) => {
  const rating = parseFloat(venue.rating) || 0;
  const { isWeb, isAtLeast } = useBreakpoint();
  const wide = isWeb && isAtLeast('lg');

  return (
    <TouchableOpacity
      style={[styles.card, wide && styles.cardWide]}
      onPress={() => onPress(venue.id)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={venue.name}
    >
      <View style={styles.cover}>
        <Text style={styles.coverLetter}>{initial(venue.name)}</Text>
        {!venue.is_open ? (
          <View style={styles.closedBadge}>
            <Badge label="Закрыто" variant="neutral" />
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {venue.name}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {venue.address}
        </Text>
        <View style={styles.meta}>
          <Stars rating={rating} size={12} />
          <Text style={styles.metaText}>{rating ? rating.toFixed(1) : '—'}</Text>
          <View style={{ flex: 1 }} />
          <Icon name="map-pin" size={12} color={theme.colors.neutral[3]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
