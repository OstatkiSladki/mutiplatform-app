import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../shared/ui/button';
import { Divider } from '../../../../shared/ui/divider';
import { theme } from '../../../../shared/config/theme';
import { formatPrice } from '../../../../shared/lib/format';

export type CheckoutSummaryMode = 'desktop' | 'mobile-bar';

export interface CheckoutSummaryProps {
  mode: CheckoutSummaryMode;
  subtotal: number;
  serviceFee: number;
  discount: number;
  total: number;
  onPay: () => void;
  disabled?: boolean;
}

export const CheckoutSummary = ({
  mode,
  subtotal,
  serviceFee,
  discount,
  total,
  onPay,
  disabled,
}: CheckoutSummaryProps) => {
  const { t } = useTranslation('checkout');
  const cta = (
    <Button
      title={t('payCtaWithAmount', { amount: formatPrice(total) })}
      onPress={onPay}
      disabled={disabled || total === 0}
      density="comfortable"
    />
  );

  if (mode === 'mobile-bar') {
    return (
      <View style={styles.bar}>
        <View style={styles.barInfo}>
          <Text style={styles.barLabel}>{t('total')}</Text>
          <Text style={styles.barTotal}>{formatPrice(total)}</Text>
        </View>
        <View style={styles.barCta}>{cta}</View>
      </View>
    );
  }

  return (
    <View style={styles.desktopCard}>
      <Text style={styles.desktopTitle}>{t('total')}</Text>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{t('goods')}</Text>
        <Text style={styles.rowValue}>{formatPrice(subtotal)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{t('serviceFee')}</Text>
        <Text style={styles.rowValue}>{formatPrice(serviceFee)}</Text>
      </View>
      {discount > 0 ? (
        <View style={styles.row}>
          <Text style={styles.rowLabel}>{t('discount')}</Text>
          <Text style={styles.rowValue}>−{formatPrice(discount)}</Text>
        </View>
      ) : null}
      <Divider />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>{t('total')}</Text>
        <Text style={styles.totalValue}>{formatPrice(total)}</Text>
      </View>
      {cta}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[4],
    backgroundColor: theme.colors.neutral.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[8],
    ...theme.shadows.fluffy[2],
  },
  barInfo: {
    flex: 1,
  },
  barLabel: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  barTotal: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[8],
    color: theme.colors.primary[100],
  },
  barCta: {
    flexShrink: 0,
    minWidth: 160,
  },
  desktopCard: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing[5],
    gap: theme.spacing[3],
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    ...(Platform.OS === 'web' ? ({ position: 'sticky', top: theme.spacing[3] } as object) : null),
  },
  desktopTitle: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.neutral[1],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[3],
  },
  rowValue: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
  },
  totalLabel: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[6],
    fontWeight: '600',
    color: theme.colors.neutral[1],
  },
  totalValue: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[10],
    color: theme.colors.primary[100],
  },
});
