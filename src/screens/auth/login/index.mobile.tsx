import React, { useCallback } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import {
  AuthLayout,
  ControlledCheckbox,
  ControlledInput,
  FormError,
  loginSchema,
  LoginFormValues,
  authFormSheetStyles,
  mapAuthError,
} from '../../../features/auth';
import { useLogin } from '../../../entities/auth/model/hooks';
import type { AuthStackParamList } from '../../../navigation/types';
import { PrimaryButton } from '../../../shared/ui';
import { theme } from '../../../shared/config/theme';
import { styles } from './styles';

type Navigation = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

/** PNG из корня репозитория `/assets` — добавьте файлы при отсутствии в сборке. */
const SOCIAL_YANDEX = require('../../../../assets/yan.png');
const SOCIAL_VK = require('../../../../assets/vk.png');
const SOCIAL_GOOGLE = require('../../../../assets/google.png');

export const LoginScreen = () => {
  const { t } = useTranslation('auth');
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
    mode: 'onBlur',
  });
  const login = useLogin();
  const isPending = isSubmitting || login.isPending;

  const onSubmit = handleSubmit(async (values) => {
    try {
      clearErrors('root');
      await login.mutateAsync({ email: values.email, password: values.password });
      navigation.getParent()?.goBack();
    } catch (error) {
      const message = mapAuthError(error, 'login');
      setError('root', { type: 'server', message });
      Toast.show({ type: 'error', text1: message });
    }
  });

  const onForgot = useCallback(() => {
    Toast.show({ type: 'info', text1: t('login.forgotToast') });
  }, [t]);

  const onSocialStub = useCallback(
    (provider: string) => {
      Toast.show({ type: 'info', text1: `${provider}: ${t('login.socialSoon')}` });
    },
    [t],
  );

  return (
    <AuthLayout
      title={t('login.title')}
      subtitle={t('login.subtitle')}
      onBackPress={() => navigation.getParent()?.goBack()}
    >
      <View
        style={[
          authFormSheetStyles.sheet,
          { paddingBottom: theme.spacing[8] + insets.bottom },
        ]}
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
          containerStyle={styles.inputEmail}
        />
        <ControlledInput
          control={control}
          name="password"
          label={t('login.password')}
          placeholder={t('login.passwordPlaceholder')}
          secureTextEntry
          showPasswordToggle
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
          containerStyle={styles.inputPassword}
        />
        <View style={styles.rememberRow}>
          <ControlledCheckbox
            control={control}
            name="rememberMe"
            label={t('login.rememberMe')}
            labelMuted
            containerStyle={styles.checkboxField}
          />
          <TouchableOpacity onPress={onForgot} hitSlop={10} accessibilityRole="button">
            <Text style={styles.forgotLink}>{t('login.forgotPassword')}</Text>
          </TouchableOpacity>
        </View>
        <FormError message={errors.root?.message} />
        <PrimaryButton
          title={t('login.submit')}
          onPress={onSubmit}
          isLoading={isPending}
          disabled={isPending}
          size="comfortable"
          style={styles.submit}
        />

        <View style={styles.registerRow}>
          <Text style={styles.registerPrompt} numberOfLines={1}>
            {t('login.noAccount')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.75}>
            <Text style={styles.registerLink}>{t('login.registerLink')}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orSeparator}>{t('login.orSeparator')}</Text>

        <View style={styles.socialRow}>
          <Pressable
            style={({ pressed }) => [styles.socialHit, pressed && styles.socialHitPressed]}
            onPress={() => onSocialStub('Yandex')}
            accessibilityRole="button"
            accessibilityLabel="Войти через Яндекс"
          >
            <Image source={SOCIAL_YANDEX} style={styles.socialIcon} resizeMode="contain" />
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.socialHit, pressed && styles.socialHitPressed]}
            onPress={() => onSocialStub('VK')}
            accessibilityRole="button"
            accessibilityLabel="Войти через VK"
          >
            <Image source={SOCIAL_VK} style={styles.socialIcon} resizeMode="contain" />
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.socialHit, pressed && styles.socialHitPressed]}
            onPress={() => onSocialStub('Google')}
            accessibilityRole="button"
            accessibilityLabel="Войти через Google"
          >
            <Image source={SOCIAL_GOOGLE} style={styles.socialIcon} resizeMode="contain" />
          </Pressable>
        </View>
      </View>
    </AuthLayout>
  );
};
