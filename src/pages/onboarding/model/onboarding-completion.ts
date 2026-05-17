import AsyncStorage from '@react-native-async-storage/async-storage';

export const ONBOARDING_COMPLETED_STORAGE_KEY = '@app/onboarding_completed_v1';

export async function getOnboardingCompleted(): Promise<boolean> {
  const v = await AsyncStorage.getItem(ONBOARDING_COMPLETED_STORAGE_KEY);
  return v === '1';
}

export async function setOnboardingCompleted(): Promise<void> {
  await AsyncStorage.setItem(ONBOARDING_COMPLETED_STORAGE_KEY, '1');
}
