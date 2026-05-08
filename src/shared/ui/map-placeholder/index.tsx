// TODO(maps): replace with react-native-maps after `expo prebuild` (см. client_plan.md §4.5).
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '../icon';
import { theme } from '../../config/theme';
import { styles } from './styles';

export interface MapPlaceholderProps {
  label?: string;
  style?: ViewStyle;
}

export const MapPlaceholder = ({ label, style }: MapPlaceholderProps) => {
  const { t } = useTranslation('common');
  return (
    <View style={[styles.container, style]}>
      <Icon name="map" size={36} color={theme.colors.secondary[100]} />
      <Text style={styles.label}>{label ?? t('mapPlaceholder')}</Text>
    </View>
  );
};
