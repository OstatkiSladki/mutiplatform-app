import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';

const avatarFallback = require('../../../../../assets/tutor1.png');

export interface ProfileInfoCardProps {
  displayName: string;
  settingsLabel: string;
  onPressSettings: () => void;
}

export const ProfileInfoCard = ({
  displayName,
  settingsLabel,
  onPressSettings,
}: ProfileInfoCardProps) => (
  <View style={styles.row}>
    <View style={styles.avatar}>
      <Image source={avatarFallback} style={styles.avatarImg} contentFit="cover" />
    </View>
    <View style={styles.textCol}>
      <Text style={styles.name} numberOfLines={1}>
        {displayName}
      </Text>
      <TouchableOpacity
        style={styles.settingsRow}
        onPress={onPressSettings}
        accessibilityRole="button"
        accessibilityLabel={settingsLabel}
        activeOpacity={0.7}
      >
        <Text style={styles.settingsLabel}>{settingsLabel}</Text>
        <Icon name="chevron-right" size={18} color={theme.colors.neutral[5]} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.full,
    overflow: 'hidden',
    backgroundColor: theme.colors.primary[20],
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  textCol: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing[1],
  },
  name: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    fontWeight: '700',
    color: theme.colors.neutral[1],
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  settingsLabel: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: theme.typography.fontSizes[3] * theme.typography.lineHeights.normal,
    fontWeight: '400',
    color: theme.colors.neutral[5],
  },
});
