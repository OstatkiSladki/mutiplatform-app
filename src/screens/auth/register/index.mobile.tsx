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
  ControlledCheckbox,
  FormError,
  registerSchema,
  RegisterFormValues,
  mapAuthError,
} from '../../../features/auth';
import { useRegister } from '../../../entities/auth/model/hooks';
import type { AuthStackParamList } from '../../../navigation/types';
import { styles } from './styles';

type Navigation = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export const RegisterScreen = () => {
  const { t } = useTranslation('auth');
  const navigation = useNavigation<Navigation>();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      privacy_policy_accepted: false as unknown as true,
    },
    mode: 'onBlur',
  });
  const register = useRegister();
  const isPending = isSubmitting || register.isPending;

  const onSubmit = handleSubmit(async (values) => {
    try {
      clearErrors('root');
      await register.mutateAsync({
        first_name: values.first_name,
        last_name: values.last_name || undefined,
        email: values.email,
        phone: values.phone || undefined,
        password: values.password,
        privacy_policy_accepted: values.privacy_policy_accepted,
      });
      navigation.getParent()?.goBack();
    } catch (error) {
      const message = mapAuthError(error, 'register');
      setError('root', { type: 'server', message });
      Toast.show({ type: 'error', text1: message });
    }
  });

  return (
    <AuthLayout
      title={t('register.title')}
      subtitle={t('register.subtitle')}
      footer={{
        text: t('register.haveAccount'),
        linkLabel: t('register.loginLink'),
        onLinkPress: () => navigation.navigate('Login'),
      }}
    >
      <ControlledInput
        control={control}
        name="first_name"
        label={t('register.firstName')}
        autoCapitalize="words"
        textContentType="givenName"
      />
      <ControlledInput
        control={control}
        name="last_name"
        label={t('register.lastName')}
        autoCapitalize="words"
        textContentType="familyName"
      />
      <ControlledInput
        control={control}
        name="email"
        label={t('register.email')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />
      <ControlledInput
        control={control}
        name="phone"
        label={t('register.phone')}
        keyboardType="phone-pad"
        autoComplete="tel"
        textContentType="telephoneNumber"
      />
      <ControlledInput
        control={control}
        name="password"
        label={t('register.password')}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password-new"
        textContentType="newPassword"
      />
      <ControlledCheckbox
        control={control}
        name="privacy_policy_accepted"
        label={t('register.privacyPolicy')}
      />
      <FormError message={errors.root?.message} />
      <Button
        title={t('register.submit')}
        onPress={onSubmit}
        isLoading={isPending}
        disabled={isPending}
        style={styles.submit}
      />
    </AuthLayout>
  );
};
