import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../shared/config/theme';
import { useBreakpoint } from '../../../shared/lib/responsive';
import { useAuthStore } from '../../../entities/auth/model/store';
import { AuthRequiredScreen } from '../../../widgets/auth-required';
import { ProfileLanding } from './ui/ProfileLanding';
import { ProfileEditScreen } from '../profile-edit';
import { ClientWebFooter } from '../../../widgets/client-web-footer';
import { styles } from './ui/styles';

export const ProfileScreenWeb = () => {
  const { isWebDesktop } = useBreakpoint();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const split = isWebDesktop;

  if (!isAuthenticated) {
    return <AuthRequiredScreen />;
  }

  if (split) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral[9] }} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.splitRoot}>
            <View style={styles.splitColumn}>
              <ProfileLanding />
            </View>
            <View style={styles.splitColumn}>
              <ProfileEditScreen embedded />
            </View>
          </View>
          <ClientWebFooter />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral[9] }} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ padding: theme.spacing[4] }}>
        <ProfileLanding />
      </ScrollView>
    </SafeAreaView>
  );
};
