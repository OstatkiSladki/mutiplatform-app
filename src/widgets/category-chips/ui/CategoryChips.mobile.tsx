import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../../../shared/config/theme';

/** Default labels — aligned with Home venue/category sections. */
export const DEFAULT_MOBILE_CATEGORY_LABELS = [
  'Готовая еда',
  'Выпечка',
  'Здоровая еда',
  'Круассаны',
  'Напитки',
] as const;

export interface CategoryChipsProps {
  categories?: readonly string[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  /** Tighter vertical rhythm when nested under venue headers */
  density?: 'default' | 'compact';
}

export const CategoryChips = ({
  categories,
  selectedCategory: selectedCategoryProp,
  onSelectCategory,
  density = 'default',
}: CategoryChipsProps) => {
  const list = useMemo(
    () =>
      categories?.length
        ? [...categories]
        : ([...DEFAULT_MOBILE_CATEGORY_LABELS] as string[]),
    [categories],
  );

  const controlled =
    selectedCategoryProp !== undefined && typeof onSelectCategory === 'function';

  const [internal, setInternal] = useState<string>(
    () => list[0] ?? DEFAULT_MOBILE_CATEGORY_LABELS[0],
  );

  const active = controlled ? selectedCategoryProp! : internal;

  const setActive = useCallback(
    (next: string) => {
      if (controlled) {
        onSelectCategory!(next);
      } else {
        setInternal(next);
      }
    },
    [controlled, onSelectCategory],
  );

  return (
    <FlatList
      horizontal
      data={list}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.list, density === 'compact' && styles.listCompact]}
      renderItem={({ item }) => {
        const isActive = item === active;

        return (
          <Pressable
            style={[styles.chip, isActive ? styles.chipActive : null]}
            onPress={() => setActive(item)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.label, isActive ? styles.labelActive : null]}>{item}</Text>
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
  listCompact: {
    paddingVertical: 0,
    paddingRight: theme.spacing[2],
  },
  chip: {
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    backgroundColor: theme.client.colors.card,
    paddingHorizontal: 10,
    paddingVertical: theme.spacing[1],
  },
  chipActive: {
    borderWidth: 1,
    borderColor: theme.client.colors.primary,
    backgroundColor: theme.client.colors.primary,
  },
  label: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[6],
    lineHeight: theme.typography.fontSizes[6] * theme.typography.lineHeights.normal,
    fontWeight: '400',
    color: theme.colors.neutral[8],
  },
  labelActive: {
    color: theme.client.colors.primaryForeground,
    fontWeight: '400',
  },
});
