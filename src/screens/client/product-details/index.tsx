import React, { useCallback } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ClientStackParamList } from '../../../navigation/types';
import { Icon } from '../../../shared/ui/icon';
import { Text } from '../../../shared/ui/text';
import { theme } from '../../../shared/config/theme';
import { ProductDetailsBody } from '../../../features/product-details';
import { styles } from './styles';

type R = RouteProp<ClientStackParamList, 'ProductDetails'>;
type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const ProductDetailsScreen = () => {
  const route = useRoute<R>();
  const navigation = useNavigation<Nav>();
  const { venueId, venueName, offer, product } = route.params;

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Назад"
          activeOpacity={0.7}
          style={styles.backBtn}
        >
          <Icon name="chevron-left" size={20} color={theme.colors.neutral[1]} />
        </TouchableOpacity>
        <Text variant="title" weight="bold" style={styles.headerTitle}>
          {venueName}
        </Text>
        <View style={styles.backBtn} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ProductDetailsBody
          venueId={venueId}
          venueName={venueName}
          offer={offer}
          product={product}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
