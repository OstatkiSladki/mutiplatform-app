import React, { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Button } from '../../shared/ui/button';
import { Icon } from '../../shared/ui/icon';
import { theme } from '../../shared/config/theme';
import type { RootStackParamList } from '../../navigation/types';
import { styles } from './styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export interface AuthRequiredScreenProps {
  title?: string;
  description?: string;
}

export const AuthRequiredScreen = ({
  title,
  description,
}: AuthRequiredScreenProps) => {
  const { t } = useTranslation('auth');
  const navigation = useNavigation<Nav>();

  const goLogin = useCallback(() => {
    navigation.navigate('Auth', { screen: 'Login' });
  }, [navigation]);

  const goRegister = useCallback(() => {
    navigation.navigate('Auth', { screen: 'Register' });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Icon name="user" size={40} color={theme.colors.primary[100]} />
          </View>
          <Text style={styles.title}>{title ?? t('gate.title')}</Text>
          <Text style={styles.description}>
            {description ?? t('gate.description')}
          </Text>
          <View style={styles.actions}>
            <Button
              title={t('gate.login')}
              onPress={goLogin}
              variant="primary"
              size="large"
            />
            <Button
              title={t('gate.register')}
              onPress={goRegister}
              variant="neutral"
              size="large"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
