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
  /** Use inside flex column so the map fills the pane (e.g. desktop nearby split). */
  fillParent?: boolean;
}

const PIN_COLOR = theme.colors.primary[100];

export const MapPlaceholder = ({
  label,
  style,
  fillParent = false,
}: MapPlaceholderProps) => {
  const { t } = useTranslation('common');
  return (
    <View style={[fillParent ? styles.containerFill : styles.container, style]}>
      <View style={styles.markersLayer}>
        <View style={[styles.pin, styles.pin1]}>
          <Icon name="map-pin" size={22} color={PIN_COLOR} />
        </View>
        <View style={[styles.pin, styles.pin2]}>
          <Icon name="map-pin" size={20} color={PIN_COLOR} />
        </View>
        <View style={[styles.pin, styles.pin3]}>
          <Icon name="map-pin" size={18} color={PIN_COLOR} />
        </View>
      </View>
      <View style={styles.centerBlock}>
        <Icon name="map" size={36} color={theme.colors.neutral[6]} />
        <Text style={styles.label}>{label ?? t('mapPlaceholder')}</Text>
      </View>
    </View>
  );
};
