import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../../../entities/venue';
import { Loader } from '../../../../../shared/ui/loader';
import { EmptyState } from '../../../../../widgets/empty-state';
import { VenueCard } from '../../../../../widgets/venue-card';
import { styles } from '../styles';

export interface EstablishmentsSectionProps {
  venues: Venue[] | undefined;
  isLoading: boolean;
  onPressVenue: (venueId: number) => void;
}

const Separator = () => <View style={styles.separator} />;

export const EstablishmentsSection = ({
  venues,
  isLoading,
  onPressVenue,
}: EstablishmentsSectionProps) => {
  const { t } = useTranslation('catalog');

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('sectionEstablishments')}</Text>
      {isLoading ? (
        <View style={styles.loaderRow}>
          <Loader size="small" />
        </View>
      ) : venues && venues.length > 0 ? (
        <FlatList
          data={venues}
          horizontal
          keyExtractor={(v) => String(v.id)}
          renderItem={({ item }) => <VenueCard venue={item} onPress={onPressVenue} />}
          ItemSeparatorComponent={Separator}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      ) : (
        <EmptyState
          icon="coffee"
          title={t('emptyVenues')}
          description={t('emptyVenuesDescription')}
        />
      )}
    </View>
  );
};
