import React from 'react';
import { StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { theme } from '@/shared/config/theme';
import { loginSchema, LoginFormValues } from '../model/login-schema';
import { useLogin } from '../model/use-login';
import { Input, Button, VStack } from '@/shared/ui';

interface LoginFormProps {
  /** Callback fired after successfully resolving the login action */
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { login, isLoading } = useLogin(onSuccess);

  return (
    <VStack style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Электронная почта"
            placeholder="Введите email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Пароль"
            placeholder="Введите пароль"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
          />
        )}
      />

      <Button
        title="Войти"
        onPress={handleSubmit(login)}
        isLoading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: theme.spacing[4],
  },
  submitButton: {
    marginTop: theme.spacing[2],
  },
});
