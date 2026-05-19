import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../../../entities/offer';
import { Loader } from '../../../../../shared/ui/loader';
import { useBreakpoint } from '../../../../../shared/lib/responsive';
import { EmptyState } from '../../../../../widgets/empty-state';
import { SurpriseBoxCard } from '../../../../../widgets/surprise-box-card';
import { styles } from '../styles';

export interface SurpriseBoxesSectionProps {
  offers: Offer[] | undefined;
  isLoading: boolean;
  venueNameById: Record<number, string>;
  onAdded?: (venueId: number) => void;
}

export const SurpriseBoxesSection = ({
  offers,
  isLoading,
  venueNameById,
  onAdded,
}: SurpriseBoxesSectionProps) => {
  const { t } = useTranslation('catalog');
  const { isWeb, isAtLeast } = useBreakpoint();
  const twoCol = isAtLeast('lg');
  const sectionTitleStyle =
    isWeb && isAtLeast('wide') ? styles.sectionTitleWebWide : styles.sectionTitle;

  return (
    <View style={styles.section}>
      <Text style={sectionTitleStyle}>{t('sectionSurpriseBoxes')}</Text>
      {isLoading ? (
        <View style={styles.loaderRow}>
          <Loader size="small" />
        </View>
      ) : offers && offers.length > 0 ? (
        <View style={styles.surpriseGrid}>
          {offers.map((offer) => (
            <View
              key={offer.id}
              style={twoCol ? styles.surpriseCell2 : styles.surpriseCell1}
            >
              <SurpriseBoxCard
                offer={offer}
                venueName={
                  venueNameById[offer.venue_id] ??
                  t('orders.venueLabel', { id: offer.venue_id })
                }
                onAdded={onAdded}
              />
            </View>
          ))}
        </View>
      ) : (
        <EmptyState
          icon="gift"
          title={t('emptyOffers')}
          description={t('emptyOffersDescription')}
        />
      )}
    </View>
  );
};
