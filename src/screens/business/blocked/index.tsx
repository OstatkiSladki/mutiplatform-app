import React, { useCallback } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { Icon } from '../../../shared/ui/icon';
import { theme } from '../../../shared/config/theme';
import { styles } from './styles';

const BUSINESS_WEB_URL =
  process.env.EXPO_PUBLIC_BUSINESS_WEB_URL ?? 'https://business.ostatki-sladki.ru';
const SUPPORT_URL =
  process.env.EXPO_PUBLIC_SUPPORT_URL ?? 'mailto:support@ostatki-sladki.ru';

export const BusinessBlockedScreen = () => {
  const { t } = useTranslation('business');

  const openWeb = useCallback(() => {
    void Linking.openURL(BUSINESS_WEB_URL);
  }, []);

  const openSupport = useCallback(() => {
    void Linking.openURL(SUPPORT_URL);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Svg width={168} height={168} style={styles.heroSvg}>
            <Defs>
              <LinearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={theme.business.gradients.primary[0]} />
                <Stop offset="1" stopColor={theme.business.gradients.primary[1]} />
              </LinearGradient>
            </Defs>
            <Circle cx={84} cy={84} r={84} fill="url(#heroGrad)" />
          </Svg>
          <Icon name="briefcase" size={56} color={theme.business.colors.primaryForeground} />
        </View>

        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{t('blocked.badge')}</Text>
          </View>
          <Text style={styles.title}>{t('blocked.title')}</Text>
          <Text style={styles.description}>{t('blocked.description')}</Text>

          <View style={styles.actions}>
            <Pressable
              onPress={openWeb}
              style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed]}
              accessibilityRole="button"
              accessibilityLabel={t('blocked.cta')}
            >
              <Text style={styles.primaryBtnText}>{t('blocked.cta')}</Text>
            </Pressable>
            <Pressable
              onPress={openSupport}
              style={({ pressed }) => [
                styles.secondaryBtn,
                pressed && styles.secondaryBtnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={t('blocked.secondary')}
            >
              <Text style={styles.secondaryBtnText}>{t('blocked.secondary')}</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.footnote}>{t('blocked.footnote')}</Text>
      </View>
    </SafeAreaView>
  );
};
