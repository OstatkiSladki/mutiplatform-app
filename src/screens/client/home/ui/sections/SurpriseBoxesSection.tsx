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

function resolveSurpriseColumns(isWeb: boolean, isAtLeast: (k: 'sm'|'md'|'lg'|'xl') => boolean): number {
  if (!isWeb) return 1;
  if (isAtLeast('lg')) return 3;
  if (isAtLeast('md')) return 2;
  return 1;
}

export const SurpriseBoxesSection = ({
  offers,
  isLoading,
  venueNameById,
  onAdded,
}: SurpriseBoxesSectionProps) => {
  const { t } = useTranslation('catalog');
  const { isWeb, isAtLeast } = useBreakpoint();
  const numColumns = resolveSurpriseColumns(isWeb, isAtLeast);
  const cellStyle =
    numColumns === 3
      ? styles.surpriseCell3
      : numColumns === 2
        ? styles.surpriseCell2
        : styles.surpriseCell1;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t('sectionSurpriseBoxes')}</Text>
      {isLoading ? (
        <View style={styles.loaderRow}>
          <Loader size="small" />
        </View>
      ) : offers && offers.length > 0 ? (
        <View style={styles.surpriseGrid}>
          {offers.map((offer) => (
            <View key={offer.id} style={cellStyle}>
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
