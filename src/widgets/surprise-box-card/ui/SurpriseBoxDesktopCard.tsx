import React from 'react';
import { Image } from 'expo-image';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../entities/venue';
import { VenueListItem } from '../../../widgets/venue-list-item';
import { BookingCtaButton } from '../../../shared/ui/booking-cta-button';
import { SurpriseBoxBuilderDesktop } from '../../../features/surprise-box-builder/ui/SurpriseBoxBuilderDesktop';
import type { UseSurpriseBoxBuilderResult } from '../../../features/surprise-box-builder/model/use-surprise-box-builder';
import { SIZE_KEYS } from '../../../features/surprise-box-builder/model/constants';
import { clientAssets } from '../../../shared/assets/client';
import { theme } from '../../../shared/config/theme';
import {
  clientTextParagraphBase,
  clientTextF5Heavy,
  clientTextParagraphBaseHeavy,
  clientTextSurpriseDesktopHeroTitle,
} from '../../../shared/config/theme/client-text-styles';
import {
  SURPRISE_BOX_DESKTOP_IMAGE_ASPECT,
  SURPRISE_BOX_DESKTOP_IMAGE_MAX_HEIGHT,
  surpriseBoxDesktopBodyColumnStyle,
} from '../lib/surprise-box-desktop-layout';
import { useSurpriseDesktopPriceStyle } from '../lib/use-surprise-desktop-price-style';

export interface SurpriseBoxDesktopCardProps {
  venueName: string;
  venue: Venue | null | undefined;
  builder: UseSurpriseBoxBuilderResult;
  formattedPrice: string;
  onBook: () => void;
  onVenuePress?: (venueId: number) => void;
}

const hintFs = theme.typography.fontSizes[4];
const hintLh = Math.round(hintFs * (theme.typography.lineHeights.normal as number));

export const SurpriseBoxDesktopCard = ({
  venueName,
  venue,
  builder,
  formattedPrice,
  onBook,
  onVenuePress,
}: SurpriseBoxDesktopCardProps) => {
  const { t } = useTranslation('catalog');
  const { config, setSize } = builder;
  const priceStyle = useSurpriseDesktopPriceStyle();

  const handleVenuePress = (id: number) => {
    onVenuePress?.(id);
  };

  return (
    <Pressable
      accessibilityRole="none"
      style={(state) => {
        const hovered =
          Platform.OS === 'web' &&
          'hovered' in state &&
          Boolean((state as { hovered?: boolean }).hovered);
        return [styles.cardOuter, hovered ? styles.cardOuterHovered : null];
      }}
    >
      <View style={styles.cardInner}>
        <View style={styles.headerSlot}>
          {venue ? (
            <VenueListItem
              venue={venue}
              onPress={handleVenuePress}
              layout="embedded"
            />
          ) : (
            <View style={styles.headerFallback}>
              <Text style={styles.headerFallbackTitle} numberOfLines={1}>
                {venueName}
              </Text>
              <Text style={styles.headerFallbackSub} numberOfLines={1}>
                {t('surpriseBox.itemName')}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bodyRow}>
          <View style={styles.leftCol}>
            <View style={styles.mediaPanelShadow}>
            <View style={styles.mediaPanel}>
              <View style={styles.sizeRow}>
                <Text style={styles.sizeLabel}>{t('surpriseBox.sizeLabel')}</Text>
                <View style={styles.sizeLetters}>
                  {SIZE_KEYS.map((s) => (
                    <Pressable
                      key={s}
                      onPress={() => setSize(s)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: config.size === s }}
                      style={(st) => {
                        const hovered =
                          Platform.OS === 'web' &&
                          'hovered' in st &&
                          Boolean((st as { hovered?: boolean }).hovered);
                        return [
                          styles.sizeLetterHit,
                          hovered ? styles.sizeLetterHovered : null,
                        ];
                      }}
                    >
                      <Text
                        style={[
                          styles.sizeLetterText,
                          config.size === s ? styles.sizeLetterActive : styles.sizeLetterIdle,
                        ]}
                      >
                        {s}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <Text style={styles.sizeHint} numberOfLines={1}>
                  {t(`surpriseBox.sizeHint.${config.size}`)}
                </Text>
              </View>

              <View style={styles.imageShell}>
                <Image
                  source={clientAssets.surpriseBag}
                  style={styles.image}
                  contentFit="contain"
                  accessibilityIgnoresInvertColors
                />
              </View>
            </View>
            </View>
          </View>

          <View style={styles.rightCol}>
            <View style={styles.rightTop}>
              <Text style={styles.heroTitle}>
                {t('surpriseBox.heroTitle', { brand: venueName })}
              </Text>
              <SurpriseBoxBuilderDesktop builder={builder} />
            </View>

            <View style={styles.rightFooter}>
              <View style={styles.priceBlock}>
                <Text style={styles.priceLabel}>{t('surpriseBox.priceLabel')}</Text>
                <Text style={priceStyle}>{formattedPrice}</Text>
              </View>
              <BookingCtaButton
                title={t('surpriseBox.bookCta', { price: formattedPrice })}
                onPress={onBook}
                showTrailingArrow
                accessibilityLabel={t('surpriseBox.bookCta', {
                  price: formattedPrice,
                })}
                style={styles.cta}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardOuter: {
    width: '100%',
    borderRadius: theme.client.radius.surpriseBoxDesktopOuter,
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'default',
          transitionProperty: 'opacity, transform',
          transitionDuration: '0.22s',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        } as Record<string, unknown>)
      : {}),
  },
  cardOuterHovered: {
    opacity: 0.985,
  },
  cardInner: {
    borderRadius: theme.client.radius.surpriseBoxDesktopOuter,
    backgroundColor: theme.colors.neutral.white,
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    padding: theme.spacing[4],
    overflow: 'hidden',
    ...theme.client.shadows.surpriseBoxDesktopCard,
  },
  headerSlot: {
    width: '100%',
    alignSelf: 'stretch',
    marginBottom: theme.spacing[4],
  },
  headerFallback: {
    padding: theme.spacing[2],
    gap: theme.spacing[1],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.neutral.white,
  },
  headerFallbackTitle: {
    ...clientTextF5Heavy,
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
  },
  headerFallbackSub: {
    ...clientTextParagraphBase,
    fontSize: theme.typography.fontSizes[5],
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.spacing[4],
    flexWrap: 'nowrap',
  },
  leftCol: {
    ...surpriseBoxDesktopBodyColumnStyle,
  },
  mediaPanelShadow: {
    flex: 1,
    width: '100%',
    borderRadius: theme.radius.xl,
    ...theme.client.shadows.productCard,
  },
  mediaPanel: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.neutral.white,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    overflow: 'hidden',
    gap: theme.spacing[3],
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    padding: theme.spacing[3],
    flexWrap: 'nowrap',
  },
  sizeLabel: {
    ...clientTextParagraphBase,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: Math.round(
      theme.typography.fontSizes[5] * (theme.typography.lineHeights.normal as number),
    ),
    color: theme.colors.neutral[1],
  },
  sizeLetters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  sizeLetterHit: {
    paddingHorizontal: theme.spacing[1],
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'pointer',
          transitionProperty: 'opacity',
          transitionDuration: '0.18s',
        } as Record<string, unknown>)
      : {}),
  },
  sizeLetterHovered: {
    opacity: 0.85,
  },
  sizeLetterText: {
    ...clientTextParagraphBaseHeavy,
    fontSize: theme.typography.fontSizes[5],
  },
  sizeLetterActive: {
    color: theme.colors.primary[100],
  },
  sizeLetterIdle: {
    color: theme.colors.neutral[1],
  },
  sizeHint: {
    flex: 1,
    textAlign: 'right',
    minWidth: 0,
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontWeight: '400',
    fontSize: hintFs,
    lineHeight: hintLh,
    color: theme.colors.neutral[5],
  },
  imageShell: {
    width: '100%',
    aspectRatio: SURPRISE_BOX_DESKTOP_IMAGE_ASPECT,
    maxHeight: SURPRISE_BOX_DESKTOP_IMAGE_MAX_HEIGHT,
    borderRadius: theme.spacing[5],
    overflow: 'hidden',
    backgroundColor: theme.colors.neutral[9],
    marginHorizontal: theme.spacing[3],
    marginBottom: theme.spacing[3],
    alignSelf: 'stretch',
    flexGrow: 0,
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  rightCol: {
    ...surpriseBoxDesktopBodyColumnStyle,
    justifyContent: 'space-between',
    gap: theme.spacing[4],
    paddingTop: theme.spacing[1],
    overflow: 'hidden',
  },
  rightTop: {
    gap: theme.spacing[3],
    flexShrink: 1,
    minWidth: 0,
    overflow: 'hidden',
  },
  heroTitle: {
    ...clientTextSurpriseDesktopHeroTitle,
    marginBottom: theme.spacing[1],
  },
  rightFooter: {
    gap: theme.spacing[3],
    marginTop: 'auto',
    paddingTop: theme.spacing[4],
    flexShrink: 0,
  },
  priceBlock: {
    alignItems: 'flex-end',
    gap: theme.spacing[1],
  },
  priceLabel: {
    ...clientTextParagraphBase,
    fontSize: theme.typography.fontSizes[6],
    lineHeight: Math.round(
      theme.typography.fontSizes[6] * (theme.typography.lineHeights.normal as number),
    ),
    color: theme.colors.neutral[5],
  },
  cta: {
    alignSelf: 'stretch',
    width: '100%',
  },
});
