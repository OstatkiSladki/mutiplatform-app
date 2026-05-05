import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/ui/button';
import { Loader } from '../../../shared/ui/loader';
import { Icon } from '../../../shared/ui/icon';
import { theme } from '../../../shared/config/theme';
import { formatPrice } from '../../../shared/lib/format';
import type { DraftVenueCart } from '../../../entities/order';
import type { PaymentMethod } from '../../../entities/payment';
import type { AppliedPromo, PickupSlot } from '../../checkout';
import { cardSchema, type CardFormValues } from '../model/card-schema';
import { usePaymentFlow } from '../model/use-payment-flow';
import { CardForm } from './CardForm';
import { MethodSelect } from './MethodSelect';

export interface PaymentFormProps {
  venueId: number;
  cart: DraftVenueCart;
  slot: PickupSlot;
  promo: AppliedPromo | null;
  amount: number;
  onSuccess: () => void;
  registerDismiss: (fn: () => void) => void;
}

export const PaymentForm = ({
  venueId,
  cart,
  slot,
  promo,
  amount,
  onSuccess,
  registerDismiss,
}: PaymentFormProps) => {
  const { t } = useTranslation('payment');
  const [method, setMethod] = useState<PaymentMethod>('bank_card');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    mode: 'onBlur',
    defaultValues: { pan: '', expiry: '', cvc: '', cardholder: '' },
  });

  const flow = usePaymentFlow({
    venueId,
    cart,
    slot,
    promo,
    amount,
    method,
    onSuccess: () => {
      reset();
      onSuccess();
    },
  });

  React.useEffect(() => {
    registerDismiss(() => {
      reset();
      void flow.reset();
    });
  }, [registerDismiss, reset, flow]);

  const onSubmit = handleSubmit(async (values) => {
    if (method === 'bank_card') {
      await flow.pay({
        pan: values.pan.replace(/\s/g, ''),
        expiry: values.expiry,
        cvc: values.cvc,
        cardholder: values.cardholder,
      });
    } else {
      await flow.pay(null);
    }
  });

  const onSbpPay = () => flow.pay(null);

  const busyLabel: Record<typeof flow.state.status, string> = {
    idle: '',
    tokenizing: t('processing'),
    preparing_cart: t('processing'),
    creating_order: t('processing'),
    creating_payment: t('processing'),
    success: t('success'),
    error: t('errorGeneric'),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('title')}</Text>
      <Text style={styles.method}>{t('method')}</Text>
      <MethodSelect value={method} onChange={setMethod} />

      {method === 'bank_card' ? (
        <CardForm control={control} errors={errors} disabled={flow.isBusy} />
      ) : (
        <View style={styles.sbpBlock}>
          <Icon name="smartphone" size={32} color={theme.colors.secondary[100]} />
          <Text style={styles.sbpText}>СБП — оплата через банк-приложение</Text>
        </View>
      )}

      {flow.state.status === 'error' ? (
        <Text style={styles.errorMessage}>{flow.state.message}</Text>
      ) : null}

      {flow.isBusy ? (
        <View style={styles.busyRow}>
          <Loader size="small" />
          <Text style={styles.busyLabel}>{busyLabel[flow.state.status]}</Text>
        </View>
      ) : null}

      <Button
        title={`${t('payCta')} ${formatPrice(amount)}`}
        onPress={method === 'bank_card' ? onSubmit : onSbpPay}
        disabled={method === 'bank_card' ? !isValid || flow.isBusy : flow.isBusy}
        isLoading={flow.isBusy}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing[3],
    paddingBottom: theme.spacing[5],
  },
  title: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[8],
    color: theme.colors.neutral[1],
  },
  method: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  sbpBlock: {
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingVertical: theme.spacing[5],
    backgroundColor: theme.colors.secondary[10],
    borderRadius: theme.radius.lg,
  },
  sbpText: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[1],
  },
  busyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  busyLabel: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
  errorMessage: {
    fontFamily: theme.typography.fontFamilies.inter,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.status.error,
  },
});
