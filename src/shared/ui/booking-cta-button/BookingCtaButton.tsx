import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import { theme } from '../../config/theme';

/** Shared primary booking CTA — flat orange pill (no elevation/shadow), 42px tall, 40 radius, 18px bold label. */
export const BOOKING_CTA_HEIGHT = 42;
/** Larger primary CTA (onboarding, hero actions) — 56px, same typography token as compact. */
export const BOOKING_CTA_HEIGHT_COMFORTABLE = 56;
/** Action Button Medium — 32px tall, 16px semibold label (design system). */
export const BOOKING_CTA_HEIGHT_MEDIUM = 32;

export type BookingCtaButtonSize = 'compact' | 'comfortable' | 'medium';

export interface BookingCtaButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  title: string;
  isLoading?: boolean;
  /** Default `compact` (42px). `comfortable` = 56px. `medium` = 32px + 16px semibold. */
  size?: BookingCtaButtonSize;
  style?: ViewStyle;
}

export const BookingCtaButton = ({
  title,
  disabled,
  isLoading = false,
  size = 'compact',
  style,
  ...rest
}: BookingCtaButtonProps) => (
  <Pressable
    accessibilityRole="button"
    disabled={disabled || isLoading}
    style={({ pressed }) => [
      styles.root,
      size === 'comfortable' && styles.rootComfortable,
      size === 'medium' && styles.rootMedium,
      (disabled || isLoading) && styles.disabled,
      pressed && !(disabled || isLoading) && styles.pressed,
      style,
    ]}
    {...rest}
  >
    {isLoading ? (
      <ActivityIndicator color={theme.colors.neutral.white} size="small" />
    ) : (
      <Text style={[styles.label, size === 'medium' && styles.labelMedium]}>{title}</Text>
    )}
  </Pressable>
);

const ACTION_BTN_FS = theme.typography.fontSizes[6];
const ACTION_BTN_MEDIUM_FS = theme.typography.fontSizes[5];

const styles = StyleSheet.create({
  root: {
    height: BOOKING_CTA_HEIGHT,
    minWidth: BOOKING_CTA_HEIGHT,
    paddingHorizontal: theme.spacing[6],
    borderRadius: theme.client.radius.bookingCta,
    backgroundColor: theme.colors.actionPrimary.default,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
    shadowColor: '#00000000',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  rootComfortable: {
    height: BOOKING_CTA_HEIGHT_COMFORTABLE,
    minWidth: BOOKING_CTA_HEIGHT_COMFORTABLE,
  },
  rootMedium: {
    height: BOOKING_CTA_HEIGHT_MEDIUM,
    minWidth: BOOKING_CTA_HEIGHT_MEDIUM,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: ACTION_BTN_FS,
    lineHeight: ACTION_BTN_FS,
    fontWeight: '700',
    color: theme.colors.neutral.white,
    textAlign: 'center',
    includeFontPadding: false,
  },
  labelMedium: {
    fontSize: ACTION_BTN_MEDIUM_FS,
    lineHeight: ACTION_BTN_MEDIUM_FS,
    fontWeight: '600',
  },
});
