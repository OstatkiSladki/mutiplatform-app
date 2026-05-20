import React, { forwardRef, useCallback } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Clipboard from 'expo-clipboard';
import {
  AppBottomSheet,
  type AppBottomSheetRef,
} from '../../../../shared/ui/bottom-sheet';
import { usePickupCode } from '../../../../entities/order';
import { theme } from '../../../../shared/config/theme';
import { formatTime } from '../../../../shared/lib/format';
import { showBusinessToast } from '../../../../shared/lib/business-toast';
import { Icon } from '../../../../shared/ui/icon';
import { styles } from '../styles';

export interface PickupCodeModalProps {
  orderId: number | null;
  onDismiss: () => void;
}

export const PickupCodeModal = forwardRef<AppBottomSheetRef, PickupCodeModalProps>(
  ({ orderId, onDismiss }, ref) => {
    const { t } = useTranslation('catalog');
    const { data, isLoading, isError } = usePickupCode(orderId ?? 0);

    const onCopy = useCallback(async () => {
      if (!data?.code) return;
      await Clipboard.setStringAsync(data.code);
      showBusinessToast(t('orders.pickupCodeCopied'), 'success');
    }, [data?.code, t]);

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
              <Text style={styles.pickupCodeHint}>
                {t('orders.pickupCodeHint')}
              </Text>
              <Text style={styles.pickupCode} accessibilityRole="text">
                {data.code}
              </Text>
              <Text style={styles.modalMeta}>
                {t('orders.pickupCodeExpires', {
                  time: formatTime(data.expires_at),
                })}
              </Text>
              <TouchableOpacity
                style={styles.copyBtn}
                activeOpacity={0.85}
                onPress={onCopy}
                accessibilityRole="button"
                accessibilityLabel={t('orders.pickupCodeCopy')}
              >
                <Icon name="copy" size={16} color={theme.colors.neutral.white} />
                <Text style={styles.copyBtnText}>
                  {t('orders.pickupCodeCopy')}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </AppBottomSheet>
    );
  },
);

PickupCodeModal.displayName = 'PickupCodeModal';
