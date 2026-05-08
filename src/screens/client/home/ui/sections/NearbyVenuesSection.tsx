import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../../../entities/venue';
import { MapPlaceholder } from '../../../../../shared/ui/map-placeholder';
import { Loader } from '../../../../../shared/ui/loader';
import { useBreakpoint } from '../../../../../shared/lib/responsive';
import { EmptyState } from '../../../../../widgets/empty-state';
import { VenueListItem } from '../../../../../widgets/venue-list-item';
import { styles } from '../styles';

export interface NearbyVenuesSectionProps {
  venues: Venue[] | undefined;
  isLoading: boolean;
  onPressVenue: (venueId: number) => void;
}

export const NearbyVenuesSection = ({
  venues,
  isLoading,
  onPressVenue,
}: NearbyVenuesSectionProps) => {
  const { t } = useTranslation('catalog');
  const { isWeb, isAtLeast } = useBreakpoint();
  const twoCol = isWeb && isAtLeast('md');

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('sectionNearby')}</Text>
      <View style={styles.mapWrapper}>
        <MapPlaceholder />
      </View>
      {isLoading ? (
        <View style={styles.loaderRow}>
          <Loader size="small" />
        </View>
      ) : venues && venues.length > 0 ? (
        twoCol ? (
          <View style={styles.surpriseGrid}>
            {venues.slice(0, 6).map((venue) => (
              <View key={venue.id} style={styles.surpriseCell2}>
                <VenueListItem venue={venue} onPress={onPressVenue} />
              </View>
            ))}
          </View>
        ) : (
          venues.slice(0, 4).map((venue, idx) => (
            <View key={venue.id}>
              {idx > 0 ? <View style={styles.vSeparator} /> : null}
              <VenueListItem venue={venue} onPress={onPressVenue} />
            </View>
          ))
        )
      ) : (
        <EmptyState
          icon="map-pin"
          title={t('emptyVenues')}
          description={t('emptyVenuesDescription')}
        />
      )}
    </View>
  );
};
