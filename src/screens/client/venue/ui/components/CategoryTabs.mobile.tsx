import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../../../shared/config/theme';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export const CategoryTabs = ({
  categories,
  activeCategory,
  onChange,
}: CategoryTabsProps) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.content}
  >
    {categories.map((category) => {
      const active = category === activeCategory;
      return (
        <TouchableOpacity
          key={category}
          style={[styles.chip, active && styles.chipActive]}
          activeOpacity={0.8}
          onPress={() => onChange(category)}
        >
          <Text style={[styles.text, active && styles.textActive]}>{category}</Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[4],
  },
  chip: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.client.radius.pill,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
    backgroundColor: theme.client.colors.card,
  },
  chipActive: {
    borderColor: theme.client.colors.primary,
    backgroundColor: theme.client.colors.primary,
  },
  text: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.mutedForeground,
  },
  textActive: {
    color: theme.client.colors.primaryForeground,
  },
});
