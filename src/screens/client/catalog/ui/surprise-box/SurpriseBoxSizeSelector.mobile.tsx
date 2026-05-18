import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { SizeKey } from '../../../../../features/surprise-box-builder';
import { SIZE_KEYS } from '../../../../../features/surprise-box-builder/model/constants';
import { theme } from '../../../../../shared/config/theme';

export interface SurpriseBoxSizeSelectorProps {
  selected: SizeKey;
  onSelect: (size: SizeKey) => void;
}

export const SurpriseBoxSizeSelector = ({ selected, onSelect }: SurpriseBoxSizeSelectorProps) => {
  const { t } = useTranslation('catalog');

  const hintKey = `surpriseBox.sizeHint.${selected}` as const;

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.sizeWord}>{t('surpriseBox.sizeLabel')}</Text>
        <View style={styles.sizes}>
          {SIZE_KEYS.map((key) => {
            const active = selected === key;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => onSelect(key)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                accessibilityLabel={key}
                hitSlop={6}
              >
                <Text style={[styles.sizeLetter, active && styles.sizeLetterActive]}>{key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <Text style={styles.hint}>{t(hintKey)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[3],
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    flexShrink: 1,
  },
  sizeWord: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
  },
  sizes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
  },
  sizeLetter: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    color: theme.client.colors.foreground,
  },
  sizeLetterActive: {
    color: theme.client.colors.primary,
  },
  hint: {
    flexShrink: 0,
    maxWidth: '46%',
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '400',
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * theme.typography.lineHeights.normal,
    color: theme.client.colors.mutedForeground,
    textAlign: 'right',
  },
});
