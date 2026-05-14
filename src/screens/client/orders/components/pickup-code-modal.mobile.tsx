import React, { forwardRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  AppBottomSheet,
  type AppBottomSheetRef,
} from '../../../../shared/ui/bottom-sheet';
import { usePickupCode } from '../../../../entities/order';
import { theme } from '../../../../shared/config/theme';
import { formatTime } from '../../../../shared/lib/format';
import { styles } from '../styles';

export interface PickupCodeModalProps {
  orderId: number | null;
  onDismiss: () => void;
}

export const PickupCodeModal = forwardRef<AppBottomSheetRef, PickupCodeModalProps>(
  ({ orderId, onDismiss }, ref) => {
    const { t } = useTranslation('catalog');
    const { data, isLoading, isError } = usePickupCode(orderId ?? 0);

    return (
      <AppBottomSheet ref={ref} onDismiss={onDismiss}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('orders.pickupCodeTitle')}</Text>

          {isLoading || !orderId ? (
            <View style={styles.modalLoading}>
              <ActivityIndicator color={theme.colors.primary[100]} />
            </View>
          ) : isError || !data ? (
            <Text style={styles.modalMeta}>{t('loadError')}</Text>
          ) : (
            <>
              <Text style={styles.pickupCode}>{data.code}</Text>
              <Text style={styles.modalMeta}>
                {t('orders.pickupCodeExpires', {
                  time: formatTime(data.expires_at),
                })}
              </Text>
            </>
          )}
        </View>
      </AppBottomSheet>
    );
  },
);

PickupCodeModal.displayName = 'PickupCodeModal';
