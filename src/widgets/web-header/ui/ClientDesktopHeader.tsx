import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon, IconName } from '../../../shared/ui/icon';
import { theme } from '../../../shared/config/theme';
import type {
  ClientStackParamList,
  ClientTabsParamList,
} from '../../../navigation/types';
import { styles } from './styles';

type TabKey = keyof ClientTabsParamList;
type Nav = NativeStackNavigationProp<ClientStackParamList>;

const TAB_ORDER: TabKey[] = ['Home', 'Cart', 'Orders', 'Profile'];
const tabIcons: Record<TabKey, IconName> = {
  Home: 'home',
  Cart: 'shopping-bag',
  Orders: 'package',
  Profile: 'user',
};
const tabLabelKeys: Record<TabKey, string> = {
  Home: 'tabs.home',
  Cart: 'tabs.cart',
  Orders: 'tabs.orders',
  Profile: 'tabs.profile',
};

export interface ClientDesktopHeaderProps {
  activeTab?: TabKey;
}

export function ClientDesktopHeader({ activeTab }: ClientDesktopHeaderProps) {
  const { t } = useTranslation('common');
  const navigation = useNavigation<Nav>();

  const navigateToTab = (tab: TabKey) => {
    navigation.navigate('ClientTabs', { screen: tab });
  };

  return (
    <View style={styles.bar}>
      <View style={styles.inner}>
        <Pressable
          style={styles.brand}
          onPress={() => navigateToTab('Home')}
          accessibilityRole="button"
        >
          <Text style={styles.brandText}>{t('brand')}</Text>
        </Pressable>

        <View style={styles.tabs}>
          {TAB_ORDER.map((tab) => {
            const isFocused = activeTab === tab;
            const iconColor = isFocused
              ? theme.colors.primary[100]
              : theme.colors.neutral[3];
            return (
              <Pressable
                key={tab}
                onPress={() => navigateToTab(tab)}
                style={[styles.tab, isFocused && styles.tabActive]}
                accessibilityRole="tab"
                accessibilityState={{ selected: isFocused }}
              >
                <Icon name={tabIcons[tab]} size={18} color={iconColor} />
                <Text
                  style={[styles.tabLabel, isFocused && styles.tabLabelActive]}
                >
                  {t(tabLabelKeys[tab])}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.spacer} />
      </View>
    </View>
  );
}
