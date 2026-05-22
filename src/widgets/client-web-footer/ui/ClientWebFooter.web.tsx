import React, { useCallback } from 'react';
import { Linking, Platform, Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { clientAssets } from '../../../shared/assets/client';
import { getClientWebShellPadding } from '../../../shared/lib/client-web-shell';
import { useBreakpoint } from '../../../shared/lib/responsive';
import type { ClientStackParamList, ClientTabsParamList } from '../../../navigation/types';
import { styles } from './styles';

type Nav = NativeStackNavigationProp<ClientStackParamList>;

interface FooterLinkProps {
  label: string;
  onPress: () => void;
}

const FooterLink = ({ label, onPress }: FooterLinkProps) => (
  <Pressable onPress={onPress} style={styles.link} accessibilityRole="link">
    {({ hovered }) => (
      <Text style={[styles.linkText, Platform.OS === 'web' && hovered ? styles.linkTextHovered : null]}>
        {label}
      </Text>
    )}
  </Pressable>
);

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => (
  <View style={styles.columnBlock}>
    <Text style={styles.columnTitle}>{title}</Text>
    <View style={styles.links}>{children}</View>
  </View>
);

export function ClientWebFooter() {
  const { t } = useTranslation('common');
  const navigation = useNavigation<Nav>();
  const { isWebDesktop, isAtLeast } = useBreakpoint();
  const shellPadX = getClientWebShellPadding(isAtLeast);

  const goToTab = useCallback(
    (screen: keyof ClientTabsParamList) => {
      navigation.navigate('ClientTabs', { screen });
    },
    [navigation],
  );

  const openExternal = useCallback((url: string) => {
    void Linking.openURL(url);
  }, []);

  if (!isWebDesktop) return null;

  const year = new Date().getFullYear();

  return (
    <View style={styles.bar}>
      <View style={[styles.column, { paddingHorizontal: shellPadX }]}>
        <View style={styles.topRow}>
          <View style={styles.brandRow}>
            <Pressable
              onPress={() => goToTab('Home')}
              accessibilityRole="button"
              accessibilityLabel={t('brand')}
            >
              <Image source={clientAssets.logoFull} style={styles.logo} contentFit="contain" />
            </Pressable>
            <Text style={styles.tagline}>{t('footer.tagline')}</Text>
          </View>

          <View style={styles.columns}>
            <FooterColumn title={t('footer.columns.service')}>
              <FooterLink label={t('tabs.home')} onPress={() => goToTab('Home')} />
              <FooterLink label={t('tabs.catalog')} onPress={() => goToTab('Catalog')} />
              <FooterLink label={t('tabs.nearby')} onPress={() => goToTab('Nearby')} />
              <FooterLink label={t('header.menu.about')} onPress={() => navigation.navigate('About')} />
            </FooterColumn>

            <FooterColumn title={t('footer.columns.buyer')}>
              <FooterLink label={t('tabs.cart')} onPress={() => goToTab('Cart')} />
              <FooterLink label={t('header.menu.support')} onPress={() => navigation.navigate('Support')} />
              <FooterLink label={t('profileFallback')} onPress={() => navigation.navigate('Profile')} />
            </FooterColumn>

            <FooterColumn title={t('footer.columns.contacts')}>
              <Pressable
                onPress={() => openExternal(`mailto:${t('footer.email')}`)}
                accessibilityRole="link"
              >
                <Text style={styles.contactText}>
                  {t('footer.emailLabel')}{' '}
                  <Text style={styles.contactLink}>{t('footer.email')}</Text>
                </Text>
              </Pressable>
              <Pressable onPress={() => openExternal(`tel:${t('footer.phoneTel')}`)} accessibilityRole="link">
                <Text style={styles.contactText}>
                  {t('footer.phoneLabel')}{' '}
                  <Text style={styles.contactLink}>{t('footer.phone')}</Text>
                </Text>
              </Pressable>
              <Text style={styles.contactText}>{t('footer.hours')}</Text>
            </FooterColumn>
          </View>
        </View>

        <View style={styles.bottomBar}>
          <Text style={styles.copyright}>{t('footer.copyright', { year })}</Text>
          <View style={styles.legalLinks}>
            <Pressable
              style={styles.legalLink}
              onPress={() => navigation.navigate('About')}
              accessibilityRole="link"
            >
              <Text style={styles.legalLinkText}>{t('footer.privacy')}</Text>
            </Pressable>
            <Pressable
              style={styles.legalLink}
              onPress={() => navigation.navigate('About')}
              accessibilityRole="link"
            >
              <Text style={styles.legalLinkText}>{t('footer.terms')}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
