import { Platform, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../../../entities/venue';
import { theme } from '../../../../../shared/config/theme';
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
  desktopScroll?: boolean;
}

const VenueList = ({
  items,
  isLoading,
  onPressVenue,
  emptyTitle,
  emptyDescription,
  desktopScroll,
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

  const rows = (
    <>
      {items.map((venue, idx) => (
        <View key={venue.id}>
          {idx > 0 && Platform.OS !== 'web' ? (
            <View style={styles.listHairline} />
          ) : null}
          <VenueListItem
            venue={venue}
            onPress={onPressVenue}
            layout={Platform.OS === 'web' ? 'embedded' : 'card'}
          />
        </View>
      ))}
    </>
  );

  if (desktopScroll) {
    return (
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={styles.nearbyListDesktop}
        contentContainerStyle={styles.nearbyListDesktopContent}
        keyboardShouldPersistTaps="handled"
      >
        {rows}
      </ScrollView>
    );
  }

  return <View style={styles.nearbyListMobile}>{rows}</View>;
};

export const NearbyVenuesSection = ({
  venues,
  isLoading,
  onPressVenue,
}: NearbyVenuesSectionProps) => {
  const { t } = useTranslation('catalog');
  const { isWeb, isAtLeast } = useBreakpoint();
  const twoCol = isWeb && isAtLeast('md');
  const sectionTitleStyle =
    isWeb && isAtLeast('md') ? styles.sectionTitleWeb : styles.sectionTitle;
  const items = (venues ?? []).slice(0, 4);
  const mapVenues = venues ?? [];
  const mapHeight = twoCol
    ? theme.layout.nearbyDesktopPanelHeight
    : styles.nearbyMapMobile.height;

  const list = (
    <VenueList
      items={items}
      isLoading={isLoading}
      onPressVenue={onPressVenue}
      emptyTitle={t('emptyVenues')}
      emptyDescription={t('emptyVenuesDescription')}
      desktopScroll={twoCol}
    />
  );

  return (
    <View style={styles.section}>
      <Text style={sectionTitleStyle}>{t('sectionNearby')}</Text>
      <View style={styles.nearbySectionSurface}>
        {twoCol ? (
          <View style={styles.nearbyGridDesktop}>
            <View style={styles.nearbyMapShell}>
              <View style={styles.nearbyMapDesktop}>
                <MapWidget
                  venues={mapVenues}
                  onVenuePress={(v) => onPressVenue(v.id)}
                  style={{ width: '100%', height: mapHeight }}
                />
              </View>
            </View>
            <View style={styles.nearbyListSurface}>{list}</View>
          </View>
        ) : (
          <>
            <View style={styles.nearbyMapMobile}>
              <MapWidget
                venues={mapVenues}
                onVenuePress={(v) => onPressVenue(v.id)}
                style={{ width: '100%', height: mapHeight }}
              />
            </View>
            <View style={styles.nearbyListSurfaceMobile}>{list}</View>
          </>
        )}
      </View>
    </View>
  );
};
