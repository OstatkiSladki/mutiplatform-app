import { Platform, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Offer } from '../../../../../entities/offer';
import type { Venue } from '../../../../../entities/venue';
import { Loader } from '../../../../../shared/ui/loader';
import { useBreakpoint } from '../../../../../shared/lib/responsive';
import { theme } from '../../../../../shared/config/theme';
import { EmptyState } from '../../../../../widgets/empty-state';
import { SurpriseBoxCard } from '../../../../../widgets/surprise-box-card';
import { styles } from '../styles';

/** Веб-сетка сюрприз-боксов: ровно 16px между карточками. */
const SURPRISE_GRID_GAP = theme.spacing[4];

const webSurpriseGridStyle = (twoCol: boolean) =>
  Platform.OS === 'web'
    ? ({
        display: 'grid',
        gridTemplateColumns: twoCol ? 'repeat(2, minmax(0, 1fr))' : '1fr',
        gap: SURPRISE_GRID_GAP,
        width: '100%',
      } as const)
    : null;

export interface SurpriseBoxesSectionProps {
  offers: Offer[] | undefined;
  isLoading: boolean;
  venueNameById: Record<number, string>;
  venueById?: Record<number, Venue>;
  onVenuePress?: (venueId: number) => void;
  onAdded?: (venueId: number) => void;
}

export const SurpriseBoxesSection = ({
  offers,
  isLoading,
  venueNameById,
  venueById,
  onVenuePress,
  onAdded,
}: SurpriseBoxesSectionProps) => {
  const { t } = useTranslation('catalog');
  const { isWeb, isAtLeast } = useBreakpoint();
  const desktopWeb = isWeb && isAtLeast('md');
  const twoCol = desktopWeb || isAtLeast('lg');
  const sectionTitleStyle =
    isWeb && isAtLeast('md') ? styles.sectionTitleWeb : styles.sectionTitle;

  return (
    <View style={styles.section}>
      <Text style={sectionTitleStyle}>{t('sectionSurpriseBoxes')}</Text>
      {isLoading ? (
        <View style={styles.loaderRow}>
          <Loader size="small" />
        </View>
      ) : offers && offers.length > 0 ? (
        <View
          style={[
            styles.surpriseGrid,
            webSurpriseGridStyle(twoCol),
            Platform.OS !== 'web' && styles.surpriseGridNativeGap,
          ]}
        >
          {offers.map((offer) => (
            <View
              key={offer.id}
              style={
                Platform.OS === 'web'
                  ? styles.surpriseCellWeb
                  : twoCol
                    ? styles.surpriseCell2
                    : styles.surpriseCell1
              }
            >
              <SurpriseBoxCard
                offer={offer}
                venueName={
                  venueNameById[offer.venue_id] ??
                  t('orders.venueLabel', { id: offer.venue_id })
                }
                venue={venueById?.[offer.venue_id]}
                onVenuePress={onVenuePress}
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
