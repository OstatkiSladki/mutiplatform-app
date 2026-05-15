import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../../shared/config/theme';

const ecoIllustration = require('../../../../../assets/saved_icon.png');

export interface EcoStatsCardMobileProps {
  portions?: number;
  co2?: number;
}

export const EcoStatsCardMobile = ({ portions = 18, co2 = 7 }: EcoStatsCardMobileProps) => {
  const { t } = useTranslation('profile');

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Image source={ecoIllustration} style={styles.icon} contentFit="contain" />
      </View>
      <View style={styles.textStack}>
        <Text style={styles.title}>{t('profile.eco.title')}</Text>
        <Text style={styles.line}>{t('profile.eco.portions', { count: portions })}</Text>
        <Text style={styles.line}>{t('profile.eco.co2', { count: co2 })}</Text>
      </View>
    </View>
  );
};

const ECO_ICON_SIZE = theme.spacing[9] + theme.spacing[2];

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: theme.spacing[2],
    borderRadius: theme.client.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.status.success,
    backgroundColor: theme.client.colors.card,
  },
  iconWrap: {
    width: ECO_ICON_SIZE,
    height: ECO_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: ECO_ICON_SIZE,
    height: ECO_ICON_SIZE,
  },
  textStack: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing[1],
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[6],
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    fontWeight: '700',
    color: theme.client.colors.foreground,
  },
  line: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    fontWeight: '400',
    color: theme.client.colors.foreground,
  },
});
