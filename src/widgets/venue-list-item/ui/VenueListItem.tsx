import React from 'react';
import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../entities/venue';
import { Stars } from '../../../shared/ui/stars';
import { Chip } from '../../../shared/ui/chip';
import { Icon } from '../../../shared/ui/icon';
import { IconStarAsset } from '../../../shared/ui/mobile/icon-star/IconStarAsset';
import { theme } from '../../../shared/config/theme';
import { pickVenueCover } from '../../../shared/assets/client';
import {
  pickVenueAvatarPalette,
  venueAvatarLabel,
} from '../../../shared/lib/venue-avatar';
import { styles } from './styles';

export interface VenueListItemProps {
  venue: Venue;
  onPress: (venueId: number) => void;
  /** `embedded` — рамка внутри карточки сюрприз-бокса; `panelRow` — строка в белой панели «Рядом». */
  layout?: 'card' | 'embedded' | 'panelRow';
}

const LH = (fs: number) =>
  Math.round(fs * (theme.typography.lineHeights.normal as number));

const WEB_NAME_FS = theme.typography.fontSizes[10];
const WEB_BODY_FS = theme.typography.fontSizes[6];
const WEB_STAR = 18;

export const VenueListItem = ({
  venue,
  onPress,
  layout = 'card',
}: VenueListItemProps) => {
  const { t } = useTranslation('catalog');
  const rating = parseFloat(venue.rating) || 0;
  const palette = pickVenueAvatarPalette(venue.id);
  const tags: string[] = [t('venueTagBakery'), t('venueTagSandwiches')];
  const roundedRating = Math.round(rating || 5);
  const embedded = layout === 'embedded';
  const panelRow = layout === 'panelRow';

  const rowLogo = theme.layout.nearbyWebVenueRowLogo;
  const rowH = theme.layout.nearbyWebVenueRowHeight;
  const rowMaxW = theme.layout.nearbyWebVenueRowMaxWidth;
  const nameFs =
    embedded || panelRow ? theme.typography.fontSizes[9] : WEB_NAME_FS;

  if (Platform.OS === 'web') {
    const cover = pickVenueCover(venue.id);
    return (
      <Pressable
        onPress={() => onPress(venue.id)}
        accessibilityRole="button"
        accessibilityLabel={venue.name}
        style={({ hovered, pressed }) => [
          panelRow
            ? webStyles.panelRowRoot
            : embedded
              ? webStyles.embeddedRoot
              : webStyles.card,
          !embedded && !panelRow && { maxWidth: rowMaxW, minHeight: rowH },
          embedded && webStyles.rowInnerEmbeddedMin,
          hovered && (panelRow ? webStyles.panelRowHovered : webStyles.cardHovered),
          pressed && webStyles.cardPressed,
        ]}
      >
        <View
          style={[
            webStyles.rowInner,
            (embedded || panelRow) && webStyles.rowInnerEmbedded,
          ]}
        >
          <View
            style={[
              webStyles.logoClip,
              (embedded || panelRow) && webStyles.logoClipEmbedded,
              {
                width: rowLogo,
                height: rowLogo,
                maxWidth: rowLogo,
                borderRadius: theme.spacing[3],
              },
            ]}
          >
            <Image
              source={cover}
              style={webStyles.logoImage}
              contentFit="cover"
              accessibilityIgnoresInvertColors
            />
          </View>

          <View style={webStyles.centerColumn}>
            <Text
              style={[webStyles.name, { fontSize: nameFs, lineHeight: LH(nameFs) }]}
              numberOfLines={2}
            >
              {venue.name}
            </Text>
            <Text style={webStyles.address} numberOfLines={2}>
              {venue.address || '—'}
            </Text>
            <View style={webStyles.starsRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStarAsset
                  key={i}
                  size={WEB_STAR}
                  color={
                    i < roundedRating ? theme.colors.primary[100] : theme.colors.neutral[7]
                  }
                />
              ))}
            </View>
          </View>

          <View style={webStyles.rightColumn}>
            <View style={webStyles.hoursRow}>
              <Icon name="clock" size={WEB_BODY_FS} color={theme.colors.neutral[5]} />
              <Text style={webStyles.hoursText} numberOfLines={1}>
                {t('hoursDefault')}
              </Text>
            </View>
            <View style={webStyles.chipsRow}>
              <Chip
                variant="accent"
                label={tags[0]}
                style={webStyles.chipWrap}
                labelStyle={webStyles.chipLabel}
              />
              <Chip
                variant="success"
                label={tags[1]}
                style={webStyles.chipWrap}
                labelStyle={webStyles.chipLabel}
              />
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({ hovered }) => [
        styles.row,
        hovered ? styles.rowHovered : null,
      ]}
      onPress={() => onPress(venue.id)}
      accessibilityRole="button"
      accessibilityLabel={venue.name}
    >
      <View
        style={[styles.logo, { backgroundColor: palette.bg, borderColor: theme.colors.neutral[8] }]}
      >
        <Text style={[styles.logoText, { color: palette.fg }]} numberOfLines={1}>
          {venueAvatarLabel(venue.name)}
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.name} numberOfLines={1}>
              {venue.name}
            </Text>
            <Text style={styles.address} numberOfLines={1}>
              {venue.address}
            </Text>
          </View>
          <View style={styles.hours}>
            <Icon name="clock" size={12} color={theme.colors.neutral[5]} />
            <Text style={styles.hoursText} numberOfLines={1}>
              {t('hoursDefault')}
            </Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Stars rating={rating || 5} size={12} color={theme.client.colors.star} />
          <View style={styles.tags}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const webStyles = StyleSheet.create({
  panelRowRoot: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'pointer',
          transitionProperty: 'background-color',
          transitionDuration: '0.2s',
        } as Record<string, unknown>)
      : {}),
  },
  panelRowHovered: {
    backgroundColor: theme.colors.neutral[9],
  },
  embeddedRoot: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: theme.colors.neutral.white,
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    borderRadius: theme.spacing[5],
    padding: theme.spacing[2],
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'pointer',
          transitionProperty: 'opacity',
          transitionDuration: '0.2s',
        } as Record<string, unknown>)
      : {}),
  },
  rowInnerEmbedded: {
    minHeight: 0,
    alignItems: 'flex-start',
  },
  rowInnerEmbeddedMin: {
    minHeight: theme.layout.nearbyWebVenueRowHeight - theme.spacing[2] * 2,
  },
  card: {
    width: '100%',
    alignSelf: 'stretch',
    borderRadius: theme.spacing[5],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    backgroundColor: theme.colors.neutral.white,
    padding: theme.spacing[2],
    shadowColor: theme.colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'pointer',
          transitionProperty: 'opacity',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        } as Record<string, unknown>)
      : {}),
  },
  cardHovered: {
    opacity: 0.96,
  },
  cardPressed: {
    opacity: 0.92,
  },
  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    flex: 1,
    minHeight: theme.layout.nearbyWebVenueRowHeight - theme.spacing[2] * 2,
  },
  logoClip: {
    overflow: 'hidden',
    backgroundColor: theme.colors.neutral[9],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoClipEmbedded: {
    width: theme.layout.nearbyWebVenueRowLogo,
    height: theme.layout.nearbyWebVenueRowLogo,
    maxWidth: '100%',
    aspectRatio: 1,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  centerColumn: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing[1],
    justifyContent: 'center',
  },
  name: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontWeight: '400',
    fontSize: WEB_NAME_FS,
    lineHeight: LH(WEB_NAME_FS),
    color: theme.colors.neutral[1],
  },
  address: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontWeight: '400',
    fontSize: WEB_BODY_FS,
    lineHeight: LH(WEB_BODY_FS),
    color: theme.colors.neutral[5],
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    marginTop: theme.spacing[1],
  },
  rightColumn: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minWidth: 132,
    gap: theme.spacing[2],
    paddingLeft: theme.spacing[2],
    flexShrink: 0,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  hoursText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontWeight: '400',
    fontSize: WEB_BODY_FS,
    lineHeight: LH(WEB_BODY_FS),
    color: theme.colors.neutral[5],
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chipWrap: {
    height: 32,
    paddingVertical: 0,
    paddingHorizontal: theme.spacing[3],
    justifyContent: 'center',
    borderRadius: theme.radius.full,
  },
  chipLabel: {
    fontSize: theme.typography.fontSizes[3],
    lineHeight: LH(theme.typography.fontSizes[3]),
  },
});
