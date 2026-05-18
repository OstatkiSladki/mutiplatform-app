import React, { useCallback, useRef } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
  type ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../shared/config/theme';
import type { OnboardingSlideModel } from '../model/slides';
import { ONBOARDING_SLIDES } from '../model/slides';
import { OnboardingSlide } from './OnboardingSlide';

export interface OnboardingPageProps {
  onComplete: () => void;
}

export const OnboardingPage = ({ onComplete }: OnboardingPageProps) => {
  const { width: screenWidth, height: windowHeight } = useWindowDimensions();
  const { t } = useTranslation('onboarding');
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList<OnboardingSlideModel>>(null);

  const slideCount = ONBOARDING_SLIDES.length;
  const lastIndex = slideCount - 1;

  const handlePrimary = useCallback(
    (slideIndex: number) => {
      if (slideIndex < lastIndex) {
        const next = slideIndex + 1;
        listRef.current?.scrollToIndex({ index: next, animated: true });
      } else {
        onComplete();
      }
    },
    [lastIndex, onComplete],
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<OnboardingSlideModel>) => (
      <OnboardingSlide
        slide={item}
        screenWidth={screenWidth}
        windowHeight={windowHeight}
        scrollX={scrollX}
        index={index}
        slideCount={slideCount}
        primaryLabel={index === lastIndex ? t('ctaStart') : t('ctaNext')}
        onPrimaryPress={() => handlePrimary(index)}
      />
    ),
    [handlePrimary, lastIndex, screenWidth, scrollX, slideCount, t, windowHeight],
  );

  const keyExtractor = useCallback((item: OnboardingSlideModel) => item.key, []);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: screenWidth,
      offset: screenWidth * index,
      index,
    }),
    [screenWidth],
  );

  const onScrollToIndexFailed = useCallback(
    (info: { index: number }) => {
      const wait = new Promise((resolve) => setTimeout(resolve, 450));
      wait.then(() => {
        listRef.current?.scrollToIndex({ index: info.index, animated: true });
      });
    },
    [],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.shell}>
        <Animated.FlatList
          ref={listRef}
          style={styles.list}
          data={ONBOARDING_SLIDES}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          bounces={false}
          overScrollMode="never"
          getItemLayout={getItemLayout}
          onScrollToIndexFailed={onScrollToIndexFailed}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.neutral.white,
  },
  shell: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: theme.colors.neutral.white,
    position: 'relative',
  },
  list: {
    flex: 1,
  },
});
