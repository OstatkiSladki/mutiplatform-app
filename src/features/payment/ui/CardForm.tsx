import React, { useEffect, useRef } from 'react';
import { StyleSheet, type TextInput, View } from 'react-native';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../shared/config/theme';
import type { CardFormValues } from '../model/card-schema';
import { CardField } from './CardField';

export interface CardFormProps {
  control: Control<CardFormValues>;
  errors: FieldErrors<CardFormValues>;
  disabled?: boolean;
}

const errorKey = (msg?: string) => (msg ? `errors.${msg}` : undefined);

export const CardForm = ({ control, errors, disabled }: CardFormProps) => {
  const { t } = useTranslation('payment');
  const expiryRef = useRef<TextInput>(null);
  const cvcRef = useRef<TextInput>(null);
  const cardholderRef = useRef<TextInput>(null);

  useEffect(() => () => undefined, []);

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="pan"
        render={({ field: { value, onChange } }) => (
          <CardField
            label={t('cardNumber')}
            mask="9999 9999 9999 9999"
            keyboardType="number-pad"
            placeholder="1234 5678 9012 3456"
            autoComplete="cc-number"
            autoCorrect={false}
            value={value ?? ''}
            onChangeText={(raw, masked) => {
              onChange(masked);
              if (raw.length === 16) expiryRef.current?.focus();
            }}
            editable={!disabled}
            error={t(errorKey(errors.pan?.message) ?? '', { defaultValue: '' }) || undefined}
          />
        )}
      />
      <View style={styles.row}>
        <View style={styles.col}>
          <Controller
            control={control}
            name="expiry"
            render={({ field: { value, onChange } }) => (
              <CardField
                ref={expiryRef}
                label={t('cardExpiry')}
                mask="99/99"
                keyboardType="number-pad"
                placeholder="MM/ГГ"
                autoComplete="cc-exp"
                autoCorrect={false}
                value={value ?? ''}
                onChangeText={(raw, masked) => {
                  onChange(masked);
                  if (raw.length === 4) cvcRef.current?.focus();
                }}
                editable={!disabled}
                error={t(errorKey(errors.expiry?.message) ?? '', { defaultValue: '' }) || undefined}
              />
            )}
          />
        </View>
        <View style={styles.col}>
          <Controller
            control={control}
            name="cvc"
            render={({ field: { value, onChange } }) => (
              <CardField
                ref={cvcRef}
                label={t('cardCvc')}
                keyboardType="number-pad"
                placeholder="•••"
                autoComplete="cc-csc"
                autoCorrect={false}
                secureTextEntry
                maxLength={4}
                value={value ?? ''}
                onChangeText={(raw) => {
                  onChange(raw);
                  if (raw.length >= 3) cardholderRef.current?.focus();
                }}
                editable={!disabled}
                error={t(errorKey(errors.cvc?.message) ?? '', { defaultValue: '' }) || undefined}
              />
            )}
          />
        </View>
      </View>
      <Controller
        control={control}
        name="cardholder"
        render={({ field: { value, onChange } }) => (
          <CardField
            ref={cardholderRef}
            label={t('cardHolder')}
            placeholder={t('cardHolderPlaceholder')}
            autoCapitalize="characters"
            autoCorrect={false}
            autoComplete="cc-name"
            value={value ?? ''}
            onChangeText={(raw) => onChange(raw.toUpperCase())}
            editable={!disabled}
            error={t(errorKey(errors.cardholder?.message) ?? '', { defaultValue: '' }) || undefined}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: theme.spacing[3],
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing[3],
  },
  col: {
    flex: 1,
  },
});
