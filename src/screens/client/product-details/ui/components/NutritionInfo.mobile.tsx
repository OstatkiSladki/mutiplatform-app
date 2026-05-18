import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { Product } from '../../../../../entities/product';
import { theme } from '../../../../../shared/config/theme';

export interface NutritionValues {
  kcal?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
}

const parseNum = (v: unknown): number | undefined => {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') {
    const n = parseFloat(v.replace(',', '.'));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
};

export const nutritionFromProduct = (product?: Product): NutritionValues => {
  const c = product?.characteristics_json as Record<string, unknown> | undefined;
  if (!c) return {};
  const pick = (...keys: string[]) => {
    for (const k of keys) {
      const n = parseNum(c[k]);
      if (n !== undefined) return n;
    }
    return undefined;
  };
  return {
    kcal: pick('calories', 'ккал', 'kcal', 'energy_kcal'),
    protein: pick('protein', 'белки', 'proteins', 'proteins_g'),
    fat: pick('fat', 'жиры', 'fats', 'fats_g'),
    carbs: pick('carbs', 'carbohydrates', 'углеводы', 'carbs_g'),
  };
};

const formatNutrition = (n?: number) => (n !== undefined ? String(Math.round(n)) : '—');

export interface NutritionInfoProps {
  values: NutritionValues;
}

export const NutritionInfo = ({ values }: NutritionInfoProps) => {
  const { t } = useTranslation('catalog');
  const items = useMemo(
    () => [
      { label: t('productDetails.nutrition.kcal'), value: formatNutrition(values.kcal) },
      { label: t('productDetails.nutrition.protein'), value: formatNutrition(values.protein) },
      { label: t('productDetails.nutrition.fat'), value: formatNutrition(values.fat) },
      { label: t('productDetails.nutrition.carbs'), value: formatNutrition(values.carbs) },
    ],
    [t, values.kcal, values.protein, values.fat, values.carbs],
  );

  const hasAny =
    values.kcal !== undefined ||
    values.protein !== undefined ||
    values.fat !== undefined ||
    values.carbs !== undefined;

  if (!hasAny) return null;

  return (
    <View style={styles.card}>
      {items.map((item) => (
        <View key={item.label} style={styles.cell}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: theme.client.radius.lg,
    backgroundColor: theme.client.colors.secondary,
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[2],
    gap: theme.spacing[1],
  },
  cell: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  label: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[2],
    lineHeight: theme.typography.fontSizes[2] * theme.typography.lineHeights.normal,
    color: theme.client.colors.mutedForeground,
    textAlign: 'center',
  },
  value: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.tight,
    fontWeight: '700',
    color: theme.client.colors.foreground,
    textAlign: 'center',
  },
});
