import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useValidatePromo } from '../../../entities/payment';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { getApiErrorMessage } from '../../../shared/api';
import { theme } from '../../../shared/config/theme';
import type { AppliedPromo } from '../model/checkout-schema';

export interface PromoInputProps {
  amount: number;
  applied: AppliedPromo | null;
  onApply: (promo: AppliedPromo | null) => void;
}

export const PromoInput = ({ amount, applied, onApply }: PromoInputProps) => {
  const { t } = useTranslation('checkout');
  const validate = useValidatePromo();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    setError(null);
    if (!code.trim()) return;
    try {
      const result = await validate.mutateAsync({ code: code.trim(), order_amount: amount });
      if (!result.is_valid) {
        setError(t('promoInvalid'));
        onApply(null);
        return;
      }
      onApply({
        code: code.trim(),
        discountAmount: parseFloat(result.discount_amount) || 0,
        finalAmount: parseFloat(result.final_amount) || amount,
      });
    } catch (e) {
      setError(getApiErrorMessage(e));
      onApply(null);
    }
  };

  const handleClear = () => {
    setCode('');
    setError(null);
    onApply(null);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{t('promoLabel')}</Text>
      <View style={styles.row}>
        <View style={styles.inputCol}>
          <Input
            value={code}
            onChangeText={setCode}
            placeholder={t('promoPlaceholder')}
            autoCapitalize="characters"
            autoCorrect={false}
            editable={!applied}
            containerStyle={styles.inputContainer}
          />
        </View>
        <View style={styles.btnCol}>
          {applied ? (
            <Button
              title={t('cancel', { ns: 'common' })}
              variant="neutral"
              onPress={handleClear}
              density="comfortable"
              style={styles.btn}
            />
          ) : (
            <Button
              title={t('promoApply')}
              onPress={handleApply}
              isLoading={validate.isPending}
              disabled={!code.trim()}
              density="comfortable"
              style={styles.btn}
            />
          )}
        </View>
      </View>
      {applied ? <Text style={styles.success}>{t('promoApplied')}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing[2],
  },
  label: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  inputCol: {
    flex: 1,
    minWidth: 0,
  },
  inputContainer: {
    marginBottom: 0,
  },
  btnCol: {
    flexShrink: 0,
  },
  btn: {
    minWidth: 140,
    paddingVertical: theme.spacing[3],
  },
  success: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.status.success,
  },
  error: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.status.error,
  },
});
