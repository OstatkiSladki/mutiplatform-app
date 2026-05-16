import { ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../../../entities/venue';
import { MapWidget } from '../../../../../widgets/map-widget';
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

interface VenueListProps {
  items: Venue[];
  isLoading: boolean;
  onPressVenue: (venueId: number) => void;
  emptyTitle: string;
  emptyDescription: string;
}

const VenueList = ({
  items,
  isLoading,
  onPressVenue,
  emptyTitle,
  emptyDescription,
}: VenueListProps) => {
  if (isLoading) {
    return (
      <View style={styles.loaderRow}>
        <Loader size="small" />
      </View>
    );
  }
  if (items.length === 0) {
    return (
      <EmptyState
        icon="map-pin"
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }
  return (
    <>
      {items.map((venue, idx) => (
        <View key={venue.id}>
          {idx > 0 ? <View style={styles.vSeparator} /> : null}
          <VenueListItem venue={venue} onPress={onPressVenue} />
        </View>
      ))}
    </>
  );
};

export const NearbyVenuesSection = ({
  venues,
  isLoading,
  onPressVenue,
}: NearbyVenuesSectionProps) => {
  const { t } = useTranslation('catalog');
  const { isWeb, isAtLeast } = useBreakpoint();
  const twoCol = isWeb && isAtLeast('lg');
  const items = (venues ?? []).slice(0, 4);

  const list = (
    <VenueList
      items={items}
      isLoading={isLoading}
      onPressVenue={onPressVenue}
      emptyTitle={t('emptyVenues')}
      emptyDescription={t('emptyVenuesDescription')}
    />
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('sectionNearby')}</Text>
      <View style={styles.nearbyCard}>
        {twoCol ? (
          <View style={styles.nearbyGridDesktop}>
            <View style={styles.nearbyMapDesktop}>
              <MapWidget
                venues={items}
                onVenuePress={(v) => onPressVenue(v.id)}
                style={{ flex: 1, minHeight: 350 }}
              />
            </View>
            <ScrollView style={styles.nearbyListDesktop} showsVerticalScrollIndicator={false}>
              {list}
            </ScrollView>
          </View>
        ) : (
          <>
            <View style={styles.nearbyMapMobile}>
              <MapWidget
                venues={items}
                onVenuePress={(v) => onPressVenue(v.id)}
                style={{ flex: 1, minHeight: 250 }}
              />
            </View>
            <ScrollView style={styles.nearbyListMobile} showsVerticalScrollIndicator={false} nestedScrollEnabled>
              {list}
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
};
