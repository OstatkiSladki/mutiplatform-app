import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../../../../../shared/config/theme';

const categories = [
  'Готовая еда',
  'Выпечка',
  'Здоровая еда',
  'Круассаны',
  'Напитки',
] as const;

export const CategoryChips = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const active = item === activeCategory;

        return (
          <Pressable
            style={[styles.chip, active ? styles.chipActive : null]}
            onPress={() => setActiveCategory(item)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.label, active ? styles.labelActive : null]}>
              {item}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    gap: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    paddingRight: theme.spacing[3],
  },
  chip: {
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    backgroundColor: theme.client.colors.card,
    paddingHorizontal: 10,
    paddingVertical: theme.spacing[1],
  },
  chipActive: {
    borderColor: theme.client.colors.primary,
    backgroundColor: theme.client.colors.primary,
  },
  label: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[6],
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    fontWeight: '400',
    color: theme.client.colors.mutedForeground,
  },
  labelActive: {
    color: theme.client.colors.primaryForeground,
    fontWeight: '400',
  },
});
