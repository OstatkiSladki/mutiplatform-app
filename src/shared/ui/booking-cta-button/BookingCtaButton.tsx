import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';
import { theme } from '../../config/theme';

/** Shared primary booking CTA — flat orange pill (no elevation/shadow), 42px tall, 40 radius, 18px bold label. */
export const BOOKING_CTA_HEIGHT = 42;

export interface BookingCtaButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  isLoading?: boolean;
  style?: ViewStyle;
}

export const BookingCtaButton = ({
  title,
  disabled,
  isLoading = false,
  style,
  ...rest
}: BookingCtaButtonProps) => (
  <TouchableOpacity
    style={[
      styles.root,
      (disabled || isLoading) && styles.disabled,
      style,
    ]}
    disabled={disabled || isLoading}
    activeOpacity={0.88}
    accessibilityRole="button"
    {...rest}
  >
    {isLoading ? (
      <ActivityIndicator color={theme.colors.neutral.white} />
    ) : (
      <Text style={styles.label}>{title}</Text>
    )}
  </TouchableOpacity>
);

const ACTION_BTN_FS = theme.typography.fontSizes[6];

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
});
