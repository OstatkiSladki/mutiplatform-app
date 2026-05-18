import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../shared/ui/icon';
import { theme } from '../../../shared/config/theme';
import { clientTextF5Heavy, clientTextF6Regular } from '../../../shared/config/theme/client-text-styles';
import { pickVenueCover } from '../../../shared/assets/client';
import type { VenueCardProps } from './venue-card-props';
import { styles } from './styles';

export type { VenueCardProps } from './venue-card-props';

const ESTABLISHMENT_WEB_COVER_AR =
  theme.client.chrome.establishmentCoverWidthRef /
  theme.client.chrome.establishmentCoverHeightRef;

export const VenueCard = ({
  venue,
  onPress,
  webCardLayout = 'carousel',
  style,
}: VenueCardProps) => {
  const { t } = useTranslation('catalog');
  const rating = parseFloat(venue.rating) || 5;
  const cover = pickVenueCover(venue.id);

  const cardLayoutStyles =
    webCardLayout === 'carousel' ? styles.cardWebCarousel : styles.cardWebRowFluid;

  const coverBlock =
    Platform.OS === 'web' ? (
      <View style={establishmentWeb.coverInset}>
        <View style={establishmentWeb.coverAspect}>
          <Image source={cover} style={establishmentWeb.coverImage} contentFit="cover" />
        </View>
      </View>
    ) : (
      <View style={styles.coverWrapWeb}>
        <Image source={cover} style={styles.coverImageWeb} contentFit="cover" />
      </View>
    );

  return (
    <Pressable
      style={(state) => {
        const { pressed } = state;
        const hovered =
          Platform.OS === 'web' &&
          'hovered' in state &&
          Boolean((state as { hovered?: boolean }).hovered);
        return [
          styles.cardBase,
          cardLayoutStyles,
          style,
          hovered ? { opacity: 0.94 } : null,
          Platform.OS === 'web' && pressed ? { transform: [{ scale: 0.992 }] } : null,
        ];
      }}
      onPress={() => onPress(venue.id)}
      accessibilityRole="button"
      accessibilityLabel={venue.name}
    >
      {coverBlock}
      {Platform.OS === 'web' ? (
        <View style={[styles.body, establishmentWeb.bodyColumn]}>
          <View style={establishmentWeb.titleAddressWrap}>
            <Text style={[styles.name, webStyles.name]} numberOfLines={1}>
              {venue.name}
            </Text>
            <Text style={establishmentWeb.address} numberOfLines={2}>
              {venue.address?.trim() ? venue.address : '—'}
            </Text>
          </View>
          <Text style={[styles.tags, establishmentWeb.tagsBelowCategories]} numberOfLines={1}>
            {t('venueTagsDefault')}
          </Text>
          <View style={establishmentWeb.bodyTextSpacer} />
          <View style={[styles.metaRow, establishmentWeb.metaRowFooter]}>
            <View style={styles.metaItem}>
              <Icon name="star" size={12} color={theme.client.colors.star} />
              <Text style={styles.metaTextStrong}>{rating.toFixed(0)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="map-pin" size={12} color={theme.client.colors.mutedForeground} />
              <Text style={styles.metaText}>{t('distanceDefault')}</Text>
            </View>
            <View style={styles.metaSpacer} />
            <View style={styles.metaItem}>
              <Icon name="clock" size={12} color={theme.client.colors.mutedForeground} />
              <Text style={styles.metaText}>{t('hoursDefault')}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={1}>
            {venue.name}
          </Text>
          <Text style={styles.tags} numberOfLines={1}>
            {t('venueTagsDefault')}
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Icon name="star" size={12} color={theme.client.colors.star} />
              <Text style={styles.metaTextStrong}>{rating.toFixed(0)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="map-pin" size={12} color={theme.client.colors.mutedForeground} />
              <Text style={styles.metaText}>{t('distanceDefault')}</Text>
            </View>
            <View style={styles.metaSpacer} />
            <View style={styles.metaItem}>
              <Icon name="clock" size={12} color={theme.client.colors.mutedForeground} />
              <Text style={styles.metaText}>{t('hoursDefault')}</Text>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

/** Web — F5 Heavy 22px / lh 120%; native keeps shared `styles.name`. */
const webStyles = StyleSheet.create({
  name: {
    ...clientTextF5Heavy,
  },
});

/** Web: обложка с inset 8, референс фото 392×182 (aspect), скругление 12; адрес 18 (F6 regular). */
const establishmentWeb = StyleSheet.create({
  /** Внутренние отступы как в референсе (~12px), «воздух» между блоками ниже. */
  bodyColumn: {
    flexGrow: 1,
    minHeight: 0,
    gap: 0,
    padding: theme.spacing[2],
    flexShrink: 0,
  },
  /** Название + адрес — один блок, между строками 2px (половина spacing[1]). */
  titleAddressWrap: {
    gap: theme.spacing[1] / 2,
  },
  /** Категории — отступ 4px от блока название/адрес. */
  tagsBelowCategories: {
    marginTop: theme.spacing[1],
  },
  /**
   * Между категориями и нижним рядом: минимум ~16px «воздуха»; при равной высоте карточек
   * область растягивается (flexGrow), футер остаётся у низа.
   */
  bodyTextSpacer: {
    flexGrow: 1,
    minHeight: theme.spacing[4],
    minWidth: 0,
  },
  /** Без marginTop из общего metaRow — отступ задаёт bodyTextSpacer. */
  metaRowFooter: {
    marginTop: 0,
  },
  coverInset: {
    width: '100%',
    padding: theme.spacing[2],
    overflow: 'hidden',
    backgroundColor: theme.colors.neutral.white,
  },
  coverAspect: {
    width: '100%',
    aspectRatio: ESTABLISHMENT_WEB_COVER_AR,
    overflow: 'hidden',
    borderRadius: theme.spacing[3],
  },
  coverImage: {
    ...StyleSheet.absoluteFillObject,
  },
  address: {
    ...clientTextF6Regular,
    color: theme.client.colors.mutedForeground,
  },
});
