import React from 'react';
import { FlatList, Platform, Pressable, Text, View } from 'react-native';
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

export const EstablishmentsSection = ({
  venues,
  isLoading,
  onPressVenue,
}: EstablishmentsSectionProps) => {
  const { t } = useTranslation('catalog');
  const { isWebDesktop } = useBreakpoint();
  const desktop = isWebDesktop;
  const sectionTitleStyle = isWebDesktop ? styles.sectionTitleWeb : styles.sectionTitle;
  const list = venues ?? [];
  const count = list.length;
  const useFluidRow = desktop && count >= 1 && count <= 4;
  const showNextButton = desktop && count > 3;

  return (
    <View style={styles.section}>
      <Text style={sectionTitleStyle}>{t('sectionEstablishments')}</Text>
      {isLoading && list.length === 0 ? (
        <View style={styles.loaderRow}>
          <Loader size="small" />
        </View>
      ) : list.length > 0 ? (
        useFluidRow ? (
          <View style={styles.establishmentsRow}>
            {list.map((item) => (
              <VenueCard
                key={item.id}
                venue={item}
                onPress={onPressVenue}
                webCardLayout="rowFluid"
                style={styles.establishmentsRowCell}
              />
            ))}
          </View>
        ) : (
          <View style={styles.carouselWrap}>
            <FlatList
              data={list}
              horizontal
              keyExtractor={(v) => String(v.id)}
              renderItem={({ item }) => (
                <VenueCard
                  venue={item}
                  onPress={onPressVenue}
                  webCardLayout="carousel"
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
            {showNextButton ? (
              <Pressable
                style={({ hovered }) => [
                  styles.carouselNext,
                  Platform.OS === 'web' && hovered ? { opacity: 0.92 } : null,
                ]}
                accessibilityRole="button"
                accessibilityLabel={t('carouselNextA11y')}
              >
                <Icon
                  name="chevron-right"
                  size={18}
                  color={theme.colors.neutral[1]}
                />
              </Pressable>
            ) : null}
          </View>
        )
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
