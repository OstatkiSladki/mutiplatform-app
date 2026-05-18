import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EmptyState } from '../../../../../widgets/empty-state';
import { theme } from '../../../../../shared/config/theme';

export interface EmptyBasketProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export const EmptyBasket = ({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyBasketProps) => (
  <View style={styles.wrap}>
    <EmptyState
      icon="shopping-bag"
      title={title}
      description={description}
      actionLabel={actionLabel}
      onAction={onAction}
    />
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: theme.spacing[10],
  },
});
