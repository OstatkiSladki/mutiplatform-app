import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Venue } from '../../../entities/venue';
import { theme } from '../../../shared/config/theme';
import { MobileVenueSummaryRow } from './MobileVenueSummaryRow.mobile';

export const formatVenueHoursLabel = (
  workSchedule: Record<string, unknown> | undefined,
  fallback: string,
): string => {
  if (!workSchedule) return fallback;
  const daily = workSchedule.daily;
  if (typeof daily === 'string') return daily.replace(/-/g, '–');
  const mf = workSchedule.mon_fri;
  if (typeof mf === 'string') return mf.replace(/-/g, '–');
  const first = Object.values(workSchedule).find((v) => typeof v === 'string');
  return typeof first === 'string' ? first.replace(/-/g, '–') : fallback;
};

export interface ClientVenueSummaryCardProps {
  venue?: Venue;
  /** When set, overrides formatted hours from `venue.work_schedule`. */
  hoursLabel?: string;
  isLoading?: boolean;
  horizontalInset?: 'flush' | 'page';
  /** Light container used on Cart standalone venue strip */
  elevatedSurface?: boolean;
}

/**
 * Single venue summary for Venue / Cart / SurpriseBox — always delegates layout to `MobileVenueSummaryRow`.
 */
export const ClientVenueSummaryCard = ({
  venue,
  hoursLabel: hoursLabelProp,
  isLoading,
  horizontalInset = 'flush',
  elevatedSurface = false,
}: ClientVenueSummaryCardProps) => {
  const { t } = useTranslation('catalog');

  const resolvedHours = useMemo(() => {
    if (hoursLabelProp != null && hoursLabelProp !== '') return hoursLabelProp;
    if (!venue) return t('hoursDefault');
    return formatVenueHoursLabel(venue.work_schedule as Record<string, unknown> | undefined, t('hoursDefault'));
  }, [hoursLabelProp, t, venue]);

  const insetStyle = horizontalInset === 'page' ? styles.insetPage : styles.insetFlush;

  if (isLoading || !venue) {
    return (
      <View style={[insetStyle, elevatedSurface && styles.elevated]}>
        <View style={[styles.skeletonCard, elevatedSurface && styles.elevatedSkeletonPad]}>
          <View style={[styles.skLogo, styles.shimmer]} />
          <View style={styles.skMid}>
            <View style={[styles.skLine, styles.shimmer]} />
            <View style={[styles.skLineShort, styles.shimmer]} />
            <View style={[styles.skLineTiny, styles.shimmer]} />
          </View>
        </View>
      </View>
    );
  }

  const inner = <MobileVenueSummaryRow venue={venue} hoursLabel={resolvedHours} />;

  if (elevatedSurface) {
    return (
      <View style={[insetStyle, styles.elevated]}>
        {inner}
      </View>
    );
  }

  return <View style={insetStyle}>{inner}</View>;
};

const styles = StyleSheet.create({
  insetFlush: {
    paddingHorizontal: 0,
  },
  insetPage: {
    paddingHorizontal: theme.spacing[4],
  },
  elevated: {
    borderRadius: theme.client.radius.md,
    backgroundColor: theme.client.colors.card,
    paddingVertical: theme.spacing[1],
  },
  elevatedSkeletonPad: {
    paddingVertical: theme.spacing[1],
  },
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
  shimmer: {
    backgroundColor: theme.colors.neutral[8],
  },
  skLogo: {
    width: 52,
    height: 52,
    borderRadius: theme.client.radius.sm,
  },
  skMid: {
    flex: 1,
    gap: theme.spacing[1],
    minWidth: 0,
  },
  skLine: {
    height: theme.spacing[4],
    borderRadius: theme.radius.sm,
    width: '80%',
  },
  skLineShort: {
    height: theme.spacing[3],
    borderRadius: theme.radius.sm,
    width: '50%',
  },
  skLineTiny: {
    height: theme.spacing[3],
    borderRadius: theme.radius.sm,
    width: '35%',
  },
});
