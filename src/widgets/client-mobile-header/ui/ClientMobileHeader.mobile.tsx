import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../../../shared/ui/avatar';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { theme } from '../../../shared/config/theme';
import { clientAssets } from '../../../shared/assets/client';
import { useCartStore, selectTotalItemCount } from '../../../entities/order';
import { useAuthStore } from '../../../entities/auth';
import type {
  ClientStackParamList,
  ClientTabsParamList,
} from '../../../navigation/types';
import { styles } from './styles';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export interface ClientMobileHeaderProps {
  searchValue: string;
  onSearchChange: (next: string) => void;
}

export const ClientMobileHeader = ({
  searchValue,
  onSearchChange,
}: ClientMobileHeaderProps) => {
  const { t } = useTranslation('common');
  const navigation = useNavigation<Nav>();
  const cartCount = useCartStore(selectTotalItemCount);
  const user = useAuthStore((s) => s.user);

  const goToTab = (tab: keyof ClientTabsParamList) =>
    navigation.navigate('ClientTabs', { screen: tab });

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable
          style={styles.brand}
          onPress={() => goToTab('Home')}
          accessibilityRole="button"
          accessibilityLabel={t('brand')}
        >
          <Image
            source={clientAssets.logoHands}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.brandText} numberOfLines={1}>
            {t('brand')}
          </Text>
        </Pressable>

        <View style={styles.actions}>
          <View>
            <Button
              variant="iconCircle"
              icon="shopping-bag"
              accessibilityLabel={t('cartA11y')}
              onPress={() => goToTab('Cart')}
            />
            {cartCount > 0 ? (
              <View style={styles.cartBadge} pointerEvents="none">
                <Text style={styles.cartBadgeText}>
                  {cartCount > 99 ? '99+' : cartCount}
                </Text>
              </View>
            ) : null}
          </View>

          <Pressable
            onPress={() => navigation.navigate('Profile')}
            accessibilityRole="button"
            accessibilityLabel={t('header.profileA11y')}
            hitSlop={4}
          >
            <Avatar name={user?.email ?? undefined} size="sm" />
          </Pressable>
        </View>
      </View>

      <View style={styles.searchRow}>
        <Input
          variant="pill"
          leadingIcon="search"
          value={searchValue}
          onChangeText={onSearchChange}
          onClear={() => onSearchChange('')}
          placeholder={t('header.searchPlaceholder')}
          containerStyle={styles.searchContainer}
        />
        <Button
          variant="pill"
          icon="map-pin"
          iconColor={theme.client.colors.primary}
          title={t('header.locationDefault')}
          accessibilityLabel={t('header.locationA11y')}
          style={styles.locationPill}
        />
      </View>
    </View>
  );
};
