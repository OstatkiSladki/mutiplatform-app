import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ClientStackParamList } from '../../../navigation/types';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

export const useSafeGoBack = (): (() => void) => {
  const navigation = useNavigation<Nav>();
  return useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('ClientTabs', { screen: 'Home' });
    }
  }, [navigation]);
};
