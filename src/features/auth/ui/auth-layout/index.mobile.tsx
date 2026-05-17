import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreenDecor } from '../../../../shared/ui/auth-screen-decor';
import { BackButton } from '../../../../shared/ui/back-button';
import { theme } from '../../../../shared/config/theme';
import type { AuthLayoutProps } from './auth-layout.types';

export type { AuthLayoutProps } from './auth-layout.types';

/** Typography token F1 Heavy 0+ → theme.typography.fontSizes[13] */
const TITLE_FS = theme.typography.fontSizes[13];
/** Отступ от подзаголовка до блока с полями ввода (макет). */
const HEADER_TO_FORM_GAP = 110;

export const AuthLayout = ({
  title,
  subtitle,
  children,
  onBackPress,
}: AuthLayoutProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <SafeAreaView style={styles.safeOuter} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.scene}>
          <AuthScreenDecor />
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollInner}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.topInset}>
              {onBackPress ? (
                <BackButton onPress={onBackPress} style={styles.back} />
              ) : (
                <View style={styles.backPlaceholder} />
              )}
              <Animated.View
                style={{
                  opacity,
                  transform: [{ translateY }],
                }}
              >
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  {subtitle ? (
                    <Text style={styles.subtitle}>{subtitle}</Text>
                  ) : null}
                </View>
              </Animated.View>
            </View>
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeOuter: {
    flex: 1,
    backgroundColor: theme.colors.neutral[9],
  },
  flex: { flex: 1 },
  scene: {
    flex: 1,
    backgroundColor: theme.colors.neutral[9],
  },
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.neutral[9],
    zIndex: 1,
  },
  scrollInner: {
    flexGrow: 1,
    paddingTop: theme.spacing[4],
    paddingBottom: 0,
  },
  topInset: {
    paddingHorizontal: theme.spacing[4],
  },
  back: {
    marginBottom: theme.spacing[5],
    alignSelf: 'flex-start',
  },
  backPlaceholder: {
    height: theme.spacing[7],
    marginBottom: theme.spacing[2],
  },
  header: {
    alignItems: 'center',
    marginBottom: HEADER_TO_FORM_GAP,
    gap: theme.spacing[3],
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: TITLE_FS,
    lineHeight: TITLE_FS * 1.02,
    fontWeight: '700',
    color: theme.colors.primary[100],
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * 1.4,
    fontWeight: '400',
    color: theme.colors.neutral[1],
    textAlign: 'center',
  },
});
