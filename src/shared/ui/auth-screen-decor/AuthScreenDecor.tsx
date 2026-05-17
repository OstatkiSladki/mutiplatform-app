import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { SplashGreyRadial } from '../../assets/images/SplashGreyRadial';
import { SplashOrangeRadial } from '../../assets/images/SplashOrangeRadial';

/** Как у Splash: масштабированные декоративные размеры. */
const GREY_DECOR_SIZE = 271 * 1.15;
const ORANGE_DECOR_WIDTH = 290 * 1.15;
const ORANGE_DECOR_HEIGHT = ORANGE_DECOR_WIDTH * (289 / 290);

const DECOR_BASE_OPACITY = 0.14;

interface AuthScreenDecorProps {
  /** Смещение фазы второго декора (мс), чтобы движения не были синфазными. */
  phaseOffsetMs?: number;
}

/**
 * Фон авторизации: decor1 (оранжевый радиал) — верхний левый угол, decor2 (серый) — нижний правый,
 * частично за экраном. Очень мягкое «дыхание» без резких движений.
 */
export const AuthScreenDecor = ({ phaseOffsetMs = 400 }: AuthScreenDecorProps) => {
  const driftA = useRef(new Animated.Value(0)).current;
  const driftB = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const curve = Easing.bezier(0.42, 0, 0.58, 1);

    const loop = (v: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(v, {
            toValue: 1,
            duration: 9000,
            easing: curve,
            useNativeDriver: true,
          }),
          Animated.timing(v, {
            toValue: 0,
            duration: 9000,
            easing: curve,
            useNativeDriver: true,
          }),
        ]),
      );

    const la = loop(driftA, 0);
    const lb = loop(driftB, phaseOffsetMs);
    la.start();
    lb.start();

    return () => {
      la.stop();
      lb.stop();
    };
  }, [driftA, driftB, phaseOffsetMs]);

  const orangeTranslateY = driftA.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 7],
  });
  const orangeTranslateX = driftA.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  const greyTranslateY = driftB.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });
  const greyTranslateX = driftB.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  const orangeRotate = driftA.interpolate({
    inputRange: [0, 1],
    outputRange: ['-0.65deg', '0.65deg'],
  });
  const greyRotate = driftB.interpolate({
    inputRange: [0, 1],
    outputRange: ['0.55deg', '-0.55deg'],
  });

  return (
    <View style={styles.layer} pointerEvents="none" accessibilityElementsHidden>
      <View style={styles.decorTopLeftOrange}>
        <Animated.View
          style={{
            opacity: DECOR_BASE_OPACITY,
            transform: [
              { translateX: orangeTranslateX },
              { translateY: orangeTranslateY },
              { rotate: orangeRotate },
            ],
          }}
        >
          <SplashOrangeRadial width={ORANGE_DECOR_WIDTH} height={ORANGE_DECOR_HEIGHT} />
        </Animated.View>
      </View>
      <View style={styles.decorBottomRightGrey}>
        <Animated.View
          style={{
            opacity: DECOR_BASE_OPACITY,
            transform: [
              { translateX: greyTranslateX },
              { translateY: greyTranslateY },
              { rotate: greyRotate },
            ],
          }}
        >
          <SplashGreyRadial width={GREY_DECOR_SIZE} height={GREY_DECOR_SIZE} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: 'hidden',
  },
  decorTopLeftOrange: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: ORANGE_DECOR_WIDTH,
    height: ORANGE_DECOR_HEIGHT,
    transform: [
      { translateX: -ORANGE_DECOR_WIDTH / 2 },
      { translateY: -ORANGE_DECOR_HEIGHT / 2 },
    ],
  },
  decorBottomRightGrey: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: GREY_DECOR_SIZE,
    height: GREY_DECOR_SIZE,
    transform: [{ translateX: GREY_DECOR_SIZE / 2 }, { translateY: GREY_DECOR_SIZE / 2 }],
  },
});
