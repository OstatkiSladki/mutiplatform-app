import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../shared/config/theme';
import { useBreakpoint } from '../../../shared/lib/responsive';
import { ProfileLanding } from './ui/ProfileLanding';
import { ProfileEditScreen } from '../profile-edit';
import { styles } from './ui/styles';

export const ProfileScreen = () => {
  const { isAtLeast, isWeb } = useBreakpoint();
  const split = isWeb && isAtLeast('md');

  if (split) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral[9] }} edges={['top', 'left', 'right']}>
        <ScrollView>
          <View style={styles.splitRoot}>
            <View style={styles.splitColumn}>
              <ProfileLanding />
            </View>
            <View style={styles.splitColumn}>
              <ProfileEditScreen embedded />
            </View>
          </View>
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
