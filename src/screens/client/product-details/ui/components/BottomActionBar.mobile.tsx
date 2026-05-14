import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../../../shared/ui/button';
import { theme } from '../../../../../shared/config/theme';

export interface BottomActionBarProps {
  priceLabel: string;
  buttonTitle: string;
  onAddPress: () => void;
  disabled?: boolean;
}

export const BottomActionBar = ({
  priceLabel,
  buttonTitle,
  onAddPress,
  disabled,
}: BottomActionBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, theme.spacing[2]) }]}>
      <View style={styles.row}>
        <Text style={styles.price} numberOfLines={1}>
          {priceLabel}
        </Text>
        <Button
          title={buttonTitle}
          variant="primary"
          size="large"
          disabled={disabled}
          onPress={onAddPress}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.client.colors.card,
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[3],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.neutral[8],
    ...theme.shadows.tight[4],
    shadowOpacity: 0.08,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  price: {
    flex: 1,
    minWidth: 0,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[14],
    lineHeight: theme.typography.fontSizes[14] * theme.typography.lineHeights.tight,
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  button: {
    flexShrink: 0,
    borderRadius: theme.client.radius.pill,
    paddingHorizontal: theme.spacing[6],
  },
});
