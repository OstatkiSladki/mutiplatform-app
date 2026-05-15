import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';

export interface ProfileTopBarProps {
  title: string;
  onBack: () => void;
  backA11yLabel: string;
}

export const ProfileTopBar = ({ title, onBack, backA11yLabel }: ProfileTopBarProps) => (
  <View style={styles.row}>
    <TouchableOpacity
      style={styles.backBtn}
      onPress={onBack}
      accessibilityRole="button"
      accessibilityLabel={backA11yLabel}
      activeOpacity={0.75}
    >
      <Icon name="arrow-left" size={18} color={theme.colors.neutral[1]} />
    </TouchableOpacity>
    <View style={styles.titleWrap} pointerEvents="none">
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.backSpacer} />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  backBtn: {
    width: 30,
    height: 30,
    borderRadius: theme.spacing[2] + theme.spacing[1] / 2,
    backgroundColor: theme.colors.neutral[9],
    alignItems: 'center',
    justifyContent: 'center',
  },
  backSpacer: {
    width: 30,
    height: 30,
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    fontWeight: '400',
    color: theme.client.colors.foreground,
    textAlign: 'center',
  },
});
