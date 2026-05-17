import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../shared/config/theme';
import { PrimaryButton } from '../../../shared/ui';
import { OnboardingPagination } from '../../../shared/ui/onboarding-pagination';
import type { OnboardingSlideIconId } from '../../../shared/ui/onboarding-slide-icon';
import { OnboardingSlideIcon } from '../../../shared/ui/onboarding-slide-icon';

/** Дизайн: верхние углы плашки 20px — токен `spacing[5]`. */
const CARD_TOP_RADIUS = theme.spacing[5];

export interface OnboardingContentProps {
  iconId: OnboardingSlideIconId;
  titleKey: string;
  descriptionKey: string;
  slideCount: number;
  screenWidth: number;
  scrollX: Animated.Value;
  primaryLabel: string;
  onPrimaryPress: () => void;
}

const DESC_MAX_W = 320;
const TITLE_FS = theme.typography.fontSizes[11];
const BODY_FS = theme.typography.fontSizes[5];

export const OnboardingContent = ({
  iconId,
  titleKey,
  descriptionKey,
  slideCount,
  screenWidth,
  scrollX,
  primaryLabel,
  onPrimaryPress,
}: OnboardingContentProps) => {
  const { t } = useTranslation('onboarding');
  const insets = useSafeAreaInsets();
  const primaryTint = theme.colors.primary[100];
  const descMax = Math.min(screenWidth - theme.spacing[6] * 2, DESC_MAX_W);

  return (
    <View
      style={[
        styles.shadowShell,
        {
          borderTopLeftRadius: CARD_TOP_RADIUS,
          borderTopRightRadius: CARD_TOP_RADIUS,
        },
        theme.client.shadows.onboardingCard,
      ]}
    >
      <View
        style={[
          styles.cardFace,
          {
            borderTopLeftRadius: CARD_TOP_RADIUS,
            borderTopRightRadius: CARD_TOP_RADIUS,
          },
        ]}
      >
        <View
          style={[
            styles.cardInner,
            {
              paddingBottom: insets.bottom + theme.spacing[6],
            },
          ]}
        >
          <View style={styles.upper}>
            <View style={styles.iconWrap}>
              <OnboardingSlideIcon id={iconId} color={primaryTint} />
            </View>
            <Text style={styles.title}>{t(titleKey)}</Text>
            <Text style={[styles.description, { maxWidth: descMax }]}>{t(descriptionKey)}</Text>
          </View>
          <View style={styles.footer}>
            <OnboardingPagination
              count={slideCount}
              scrollX={scrollX}
              slideWidth={screenWidth}
            />
            <PrimaryButton
              size="medium"
              title={primaryLabel}
              onPress={onPrimaryPress}
              style={styles.cta}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowShell: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.neutral.white,
    overflow: 'visible',
  },
  cardFace: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.neutral.white,
    overflow: 'hidden',
  },
  cardInner: {
    flex: 1,
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[8],
  },
  upper: {
    flex: 1,
    width: '100%',
    minHeight: 0,
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: theme.spacing[2],
  },
  iconWrap: {
    marginBottom: theme.spacing[5],
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: TITLE_FS,
    lineHeight: TITLE_FS,
    fontWeight: '700',
    color: theme.colors.primary[100],
    textAlign: 'center',
    letterSpacing: theme.typography.letterSpacing[0],
    marginBottom: theme.spacing[4],
  },
  description: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: BODY_FS,
    lineHeight: BODY_FS * theme.typography.lineHeights.loose,
    fontWeight: '400',
    color: theme.colors.neutral[1],
    textAlign: 'center',
    letterSpacing: theme.typography.letterSpacing[0],
  },
  cta: {
    alignSelf: 'stretch',
    width: '100%',
    marginTop: theme.spacing[4],
  },
});
