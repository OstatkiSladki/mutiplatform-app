import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../shared/ui/button';
import { Icon, IconName } from '../../shared/ui/icon';
import { theme } from '../../shared/config/theme';
import { styles } from './styles';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon = 'inbox',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => (
  <View style={styles.container}>
    <View style={styles.iconCircle}>
      <Icon name={icon} size={32} color={theme.colors.primary[100]} />
    </View>
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
    {actionLabel && onAction ? (
      <View style={styles.actionWrapper}>
        <Button title={actionLabel} onPress={onAction} />
      </View>
    ) : null}
  </View>
);
