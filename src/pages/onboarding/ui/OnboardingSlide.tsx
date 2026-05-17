import React from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import type { OnboardingSlideModel } from '../model/slides';
import { theme } from '../../../shared/config/theme';
import { OnboardingContent } from './OnboardingContent';

export interface OnboardingSlideProps {
  slide: OnboardingSlideModel;
  screenWidth: number;
  windowHeight: number;
  scrollX: Animated.Value;
  index: number;
  slideCount: number;
  primaryLabel: string;
  onPrimaryPress: () => void;
}

const ILLUS_HEIGHT_RATIO = 0.56;

export const OnboardingSlide = ({
  slide,
  screenWidth,
  windowHeight,
  scrollX,
  index,
  slideCount,
  primaryLabel,
  onPrimaryPress,
}: OnboardingSlideProps) => {
  const illusHeight = Math.round(windowHeight * ILLUS_HEIGHT_RATIO);
  const overlap = theme.spacing[6];

  const opacity = scrollX.interpolate({
    inputRange: [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ],
    outputRange: [0.72, 1, 0.72],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.slideRoot, { width: screenWidth }]}>
      <Animated.View style={[styles.slideFade, { opacity }]}>
        <View style={[styles.illusWell, { height: illusHeight }]}>
          <Image source={slide.image} style={styles.illus} resizeMode="cover" />
        </View>
        <View style={[styles.cardSlot, { marginTop: -overlap }]}>
          <OnboardingContent
            iconId={slide.icon}
            titleKey={slide.titleKey}
            descriptionKey={slide.descriptionKey}
            slideCount={slideCount}
            screenWidth={screenWidth}
            scrollX={scrollX}
            primaryLabel={primaryLabel}
            onPrimaryPress={onPrimaryPress}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  slideRoot: {
    flex: 1,
    backgroundColor: theme.colors.neutral.white,
    overflow: 'hidden',
  },
  slideFade: {
    flex: 1,
  },
  illusWell: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: theme.colors.neutral.white,
  },
  illus: {
    width: '100%',
    height: '100%',
  },
  cardSlot: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    minHeight: 0,
    backgroundColor: theme.colors.neutral.white,
  },
});
