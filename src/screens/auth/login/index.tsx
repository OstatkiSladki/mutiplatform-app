import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../shared/ui/button';
import {
  AuthLayout,
  ControlledInput,
  loginSchema,
  LoginFormValues,
  mapAuthError,
} from '../../../features/auth';
import { useLogin } from '../../../entities/auth/model/hooks';
import type { AuthStackParamList } from '../../../navigation/types';
import { styles } from './styles';

type Navigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
  const { t } = useTranslation('auth');
  const navigation = useNavigation<Navigation>();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });
  const login = useLogin();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login.mutateAsync(values);
      navigation.getParent()?.goBack();
    } catch (error) {
      Toast.show({ type: 'error', text1: mapAuthError(error, 'login') });
    }
  });

  return (
    <AuthLayout
      title={t('login.title')}
      subtitle={t('login.subtitle')}
      footer={{
        text: t('login.noAccount'),
        linkLabel: t('login.registerLink'),
        onLinkPress: () => navigation.navigate('Register'),
      }}
    >
      <ControlledInput
        control={control}
        name="email"
        label={t('login.email')}
        placeholder={t('login.emailPlaceholder')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />
      <ControlledInput
        control={control}
        name="password"
        label={t('login.password')}
        placeholder={t('login.passwordPlaceholder')}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
        textContentType="password"
      />
      <Button
        title={t('login.submit')}
        onPress={onSubmit}
        isLoading={isSubmitting || login.isPending}
        style={styles.submit}
      />
    </AuthLayout>
  );
};
