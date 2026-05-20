import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { Icon } from '../../../shared/ui/icon';
import { useSafeGoBack } from '../../../shared/lib/navigation';
import { theme } from '../../../shared/config/theme';
import { useMobileBottomNavHeight } from '../../../widgets/mobile-bottom-nav';

const titles: Record<string, string> = {
  Support: 'profile.menu.support',
  Addresses: 'profile.menu.addresses',
  NotificationsSettings: 'profile.menu.notifications',
  About: 'profile.menu.about',
};

export const PlaceholderScreen = () => {
  const { t } = useTranslation('profile');
  const route = useRoute();
  const goBack = useSafeGoBack();
  const bottomNavHeight = useMobileBottomNavHeight();
  const titleKey = titles[route.name] ?? 'profile.placeholder';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.neutral[9] }} edges={['top', 'left', 'right']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: theme.spacing[3], paddingVertical: theme.spacing[2], gap: theme.spacing[3] }}>
        <TouchableOpacity
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Назад"
          activeOpacity={0.7}
          style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radius.full, backgroundColor: theme.colors.neutral.white }}
        >
          <Icon name="chevron-left" size={20} color={theme.colors.neutral[1]} />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: 'center', fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400', fontSize: theme.typography.fontSizes[7], color: theme.colors.neutral[1] }}>
          {t(titleKey)}
        </Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing[5], paddingBottom: theme.spacing[5] + bottomNavHeight }}>
        <Text style={{ fontFamily: theme.typography.fontFamilies.sourceSansProRegular, fontSize: theme.typography.fontSizes[5], color: theme.colors.neutral[3] }}>
          {t('profile.placeholder')}
        </Text>
      </View>
    </SafeAreaView>
  );
};
