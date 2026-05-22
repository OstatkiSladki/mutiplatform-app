import { Platform, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { UserAddress, WalkingRadiusMinutes } from '../../../../../entities/location';
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
  deliveryAddress?: UserAddress;
  walkingRadiusMinutes?: WalkingRadiusMinutes;
  onWalkingRadiusChange?: (minutes: WalkingRadiusMinutes) => void;
  walkingRadiusRing?: [number, number][];
  walkingFilterActive?: boolean;
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
  if (isLoading && items.length === 0) {
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
  deliveryAddress,
  walkingRadiusMinutes,
  onWalkingRadiusChange,
  walkingRadiusRing,
  walkingFilterActive = false,
}: NearbyVenuesSectionProps) => {
  const { t } = useTranslation('catalog');
  const { isWebDesktop } = useBreakpoint();
  const twoCol = isWebDesktop;
  const sectionTitleStyle = isWebDesktop ? styles.sectionTitleWeb : styles.sectionTitle;
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
      emptyTitle={walkingFilterActive ? t('emptyVenuesWalking') : t('emptyVenues')}
      emptyDescription={
        walkingFilterActive ? t('emptyVenuesWalkingDescription') : t('emptyVenuesDescription')
      }
      desktopScroll={twoCol}
    />
  );

  const mapWidget = (
    <MapWidget
      venues={mapVenues}
      onVenuePress={(v) => onPressVenue(v.id)}
      style={{ width: '100%', height: mapHeight }}
      initialCenter={
        deliveryAddress
          ? { lat: deliveryAddress.lat, lon: deliveryAddress.lon }
          : undefined
      }
      userLocation={
        deliveryAddress
          ? {
              lat: deliveryAddress.lat,
              lon: deliveryAddress.lon,
              address: deliveryAddress.address,
            }
          : undefined
      }
      walkingRadiusRing={walkingRadiusRing}
      walkingRadiusMinutes={walkingRadiusMinutes}
      onWalkingRadiusChange={onWalkingRadiusChange}
    />
  );

  return (
    <View style={styles.section}>
      <Text style={sectionTitleStyle}>{t('sectionNearby')}</Text>
      <View style={styles.nearbySectionSurface}>
        {twoCol ? (
          <View style={styles.nearbyGridDesktop}>
            <View style={styles.nearbyMapShell}>
              <View style={styles.nearbyMapDesktop}>{mapWidget}</View>
            </View>
            <View style={styles.nearbyListSurface}>{list}</View>
          </View>
        ) : (
          <>
            <View style={styles.nearbyMapMobile}>{mapWidget}</View>
            <View style={styles.nearbyListSurfaceMobile}>{list}</View>
          </>
        )}
      </View>
    </View>
  );
};