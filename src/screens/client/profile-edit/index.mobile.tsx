import React, { useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Icon } from '../../../shared/ui/icon';
import { ControlledInput } from '../../../features/auth/ui/controlled-input';
import { useAuthStore } from '../../../entities/auth/model/store';
import { theme } from '../../../shared/config/theme';
import { styles } from './styles';

interface FormValues {
  first_name: string;
  birth_date: string;
  gender: 'male' | 'female';
  email: string;
  phone: string;
}

export interface ProfileEditProps {
  embedded?: boolean;
}

export const ProfileEditScreen = ({ embedded = false }: ProfileEditProps) => {
  const { t } = useTranslation('profile');
  const navigation = useNavigation();
  const user = useAuthStore((s) => s.user);

  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      first_name: user?.first_name ?? '',
      birth_date: '',
      gender: 'male',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
  });

  const gender = watch('gender');

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const onSave = handleSubmit(() => {
    if (!embedded) navigation.goBack();
  });

  const Body = (
    <View style={styles.card}>
      <ControlledInput
        control={control}
        name="first_name"
        label={t('profile.edit.firstName')}
      />
      <ControlledInput
        control={control}
        name="birth_date"
        label={t('profile.edit.birthDate')}
        placeholder="01.02.2002"
      />
      <View>
        <Text style={styles.fieldLabel}>{t('profile.edit.gender')}</Text>
        <View style={[styles.genderRow, { marginTop: theme.spacing[1] }]}>
          {(['male', 'female'] as const).map((g) => {
            const active = gender === g;
            return (
              <TouchableOpacity
                key={g}
                style={[styles.genderOption, active && styles.genderOptionActive]}
                onPress={() => setValue('gender', g)}
                accessibilityRole="button"
                activeOpacity={0.8}
              >
                <Text style={[styles.genderText, active && styles.genderTextActive]}>
                  {t(g === 'male' ? 'profile.edit.genderMale' : 'profile.edit.genderFemale')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <ControlledInput
        control={control}
        name="email"
        label={t('profile.edit.email')}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <ControlledInput
        control={control}
        name="phone"
        label={t('profile.edit.phone')}
        keyboardType="phone-pad"
      />
    </View>
  );

  if (embedded) {
    return Body;
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Назад"
          activeOpacity={0.7}
          style={styles.headerSlot}
        >
          <Icon name="chevron-left" size={20} color={theme.colors.neutral[1]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile.edit.title')}</Text>
        <TouchableOpacity
          onPress={onSave}
          accessibilityRole="button"
          accessibilityLabel={t('profile.edit.save')}
          activeOpacity={0.7}
          style={styles.headerSlot}
        >
          <Icon name="check" size={20} color={theme.colors.primary[100]} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>{Body}</ScrollView>
    </SafeAreaView>
  );
};
