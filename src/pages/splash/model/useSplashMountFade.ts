import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const DURATION_MS = 600;

/** Opacity 0 → 1, ease-out — splash logo + decor (single native-driver fade). */
export const useSplashMountFade = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(opacity, {
      toValue: 1,
      duration: DURATION_MS,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return opacity;
};
