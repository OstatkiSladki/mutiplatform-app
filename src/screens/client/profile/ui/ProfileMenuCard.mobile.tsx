import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../../../shared/config/theme';
import { ProfileScreenMenuRow } from './ProfileScreenMenuRow.mobile';

const MENU_ITEMS_VERTICAL_GAP =
  theme.spacing[6] + theme.spacing[1] + theme.spacing[1] / 2;

export interface ProfileMenuCardProps {
  items: React.ComponentProps<typeof ProfileScreenMenuRow>[];
}

export const ProfileMenuCard = ({ items }: ProfileMenuCardProps) => (
  <View style={styles.card}>
    {items.map((item) => (
      <ProfileScreenMenuRow key={item.label} {...item} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.client.colors.card,
    borderRadius: theme.client.radius.md,
    padding: theme.spacing[4],
    gap: MENU_ITEMS_VERTICAL_GAP,
    ...theme.shadows.tight[3],
  },
});
