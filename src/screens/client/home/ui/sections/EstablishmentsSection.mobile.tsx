import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../../../entities/venue';
import { Loader } from '../../../../../shared/ui/loader';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';
import { useBreakpoint } from '../../../../../shared/lib/responsive';
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
  const { isAtLeast } = useBreakpoint();
  const showNextButton = isAtLeast('md') && (venues?.length ?? 0) > 3;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('sectionEstablishments')}</Text>
      {isLoading ? (
        <View style={styles.loaderRow}>
          <Loader size="small" />
        </View>
      ) : venues && venues.length > 0 ? (
        <View style={styles.carouselWrap}>
          <FlatList
            data={venues}
            horizontal
            keyExtractor={(v) => String(v.id)}
            renderItem={({ item }) => (
              <VenueCard venue={item} onPress={onPressVenue} />
            )}
            ItemSeparatorComponent={Separator}
            showsHorizontalScrollIndicator={true}
            indicatorStyle="black"
            nestedScrollEnabled={true}
            contentContainerStyle={styles.horizontalList}
          />
          {showNextButton ? (
            <Pressable
              style={styles.carouselNext}
              accessibilityRole="button"
              accessibilityLabel={t('carouselNextA11y')}
            >
              <Icon
                name="chevron-right"
                size={18}
                color={theme.client.colors.foreground}
              />
            </Pressable>
          ) : null}
        </View>
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
