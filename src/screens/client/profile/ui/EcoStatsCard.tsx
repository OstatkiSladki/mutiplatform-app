import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import { styles } from './styles';

export const EcoStatsCard = ({ portions = 18, co2 = 7 }: { portions?: number; co2?: number }) => {
  const { t } = useTranslation('profile');
  return (
    <View style={styles.ecoCard}>
      <View style={styles.ecoIcon}>
        <Icon name="globe" size={24} color={theme.colors.secondary[100]} />
      </View>
      <View style={styles.ecoText}>
        <Text style={styles.ecoTitle}>{t('profile.eco.title')}</Text>
        <Text style={styles.ecoLine}>{t('profile.eco.portions', { count: portions })}</Text>
        <Text style={styles.ecoLine}>{t('profile.eco.co2', { count: co2 })}</Text>
      </View>
    </View>
  );
};
