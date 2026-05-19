import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import type { Venue } from '../../../../../entities/venue';
import { theme } from '../../../../../shared/config/theme';
import { pickVenueCover } from '../../../../../shared/assets/client';
import { Icon } from '../../../../../shared/ui/icon';
import { IconStarAsset } from '../../../../../shared/ui/mobile/icon-star';
import { EmptyState } from '../../../../../widgets/empty-state';

export interface NearbySectionProps {
  venues: Venue[] | undefined;
  isLoading: boolean;
  emptyTitle: string;
  emptyDescription: string;
  tagText: string;
  distanceText: string;
  hoursText: string;
  onPressVenue: (venueId: number) => void;
}

export const NearbySection = ({
  venues,
  isLoading,
  emptyTitle,
  emptyDescription,
  tagText,
  distanceText,
  hoursText,
  onPressVenue,
}: NearbySectionProps) => {
  const items = venues ?? [];

  return (
    <View style={styles.section}>
      <Text style={[styles.title, styles.titleColor]}>Рядом с вами</Text>
      {isLoading ? (
        <ActivityIndicator color={theme.client.colors.primary} />
      ) : items.length > 0 ? (
        <View style={styles.list}>
          {items.map((venue) => (
            <NearbyVenueCard
              key={venue.id}
              venue={venue}
              tagText={tagText}
              distanceText={distanceText}
              hoursText={hoursText}
              onPress={() => onPressVenue(venue.id)}
            />
          ))}
        </View>
      ) : (
        <EmptyState
          icon="map-pin"
          title={emptyTitle}
          description={emptyDescription}
        />
      )}
    </View>
  );
};

interface NearbyVenueCardProps {
  venue: Venue;
  tagText: string;
  distanceText: string;
  hoursText: string;
  onPress: () => void;
}

const NearbyVenueCard = ({
  venue,
  tagText,
  distanceText,
  hoursText,
  onPress,
}: NearbyVenueCardProps) => {
  const rating = parseFloat(venue.rating);
  const ratingLabel = Number.isFinite(rating) ? rating.toFixed(1) : '—';

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={venue.name}
    >
      <Image
        source={pickVenueCover(venue.id)}
        style={styles.cover}
        contentFit="cover"
      />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {venue.name}
        </Text>
        <Text style={styles.tags} numberOfLines={1}>
          {tagText}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <IconStarAsset size={22} color={theme.colors.primary[100]} />
            <Text style={styles.metaRating}>{ratingLabel}</Text>
          </View>
          <View style={styles.metaItem}>
            <Icon
              name="map-pin"
              size={theme.typography.fontSizes[6]}
              color={theme.client.colors.mutedForeground}
            />
            <Text style={styles.metaMeta}>{distanceText}</Text>
          </View>
          <View style={styles.metaSpacer} />
          <View style={styles.metaItem}>
            <Icon
              name="clock"
              size={theme.typography.fontSizes[6]}
              color={theme.client.colors.mutedForeground}
            />
            <Text style={styles.metaMeta}>{hoursText}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing[3],
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[9],
    fontWeight: '700',
    lineHeight: theme.typography.fontSizes[9] * theme.typography.lineHeights.normal,
  },
  titleColor: {
    color: theme.colors.neutral[1],
  },
  list: {
    gap: theme.spacing[3],
  },
  card: {
    borderRadius: theme.client.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.neutral[7],
    backgroundColor: theme.client.colors.card,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? ({ cursor: 'pointer' } as Record<string, unknown>)
      : {}),
  },
  cover: {
    width: '100%',
    aspectRatio: 2.55,
  },
  body: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[3],
    gap: theme.spacing[1],
  },
  name: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[6],
    fontWeight: '700',
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    color: theme.colors.neutral[1],
  },
  tags: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing[3],
    marginTop: theme.spacing[1],
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  metaRating: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[6],
    fontWeight: '400',
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    color: theme.colors.neutral[1],
  },
  metaMeta: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[6],
    fontWeight: '400',
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    color: theme.colors.neutral[1],
  },
  metaSpacer: {
    flexGrow: 1,
  },
});
