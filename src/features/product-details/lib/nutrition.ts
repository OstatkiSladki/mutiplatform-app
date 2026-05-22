import type { Product } from '../../../entities/product';

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

export const formatNutritionValue = (n?: number) =>
  n !== undefined ? String(Math.round(n)) : '—';
