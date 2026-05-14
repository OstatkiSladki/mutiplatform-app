import React from 'react';
import { Image, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { clientAssets } from '../../../shared/assets/client';
import { styles } from './styles';

export const EmptyCart = () => {
  const { t } = useTranslation('catalog');
  return (
    <View style={styles.emptyWrap}>
      <Image
        source={clientAssets.emptyCart}
        style={styles.emptyImage}
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel={t('cart.emptyTitle')}
      />
      <Text style={styles.emptyText}>{t('cart.emptyTitle')}</Text>
    </View>
  );
};
