import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon, IconName } from '../../shared/ui/icon';
import { theme } from '../../shared/config/theme';
import { styles } from './styles';

export interface HeaderAction {
  icon: IconName;
  onPress: () => void;
  badgeCount?: number;
  accessibilityLabel?: string;
}

export interface AppHeaderProps {
  title?: string;
  left?: HeaderAction;
  right?: HeaderAction[];
}

const ActionButton = ({ action }: { action: HeaderAction }) => (
  <TouchableOpacity
    style={styles.iconButton}
    onPress={action.onPress}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityLabel={action.accessibilityLabel}
  >
    <Icon name={action.icon} size={20} color={theme.colors.neutral[1]} />
    {action.badgeCount && action.badgeCount > 0 ? (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {action.badgeCount > 99 ? '99+' : action.badgeCount}
        </Text>
      </View>
    ) : null}
  </TouchableOpacity>
);

export const AppHeader = ({ title, left, right }: AppHeaderProps) => (
  <View style={styles.container}>
    {left && <ActionButton action={left} />}
    {title ? <Text style={styles.title} numberOfLines={1}>{title}</Text> : <View style={{ flex: 1 }} />}
    {right?.map((action, index) => (
      <ActionButton key={`${action.icon}-${index}`} action={action} />
    ))}
  </View>
);
