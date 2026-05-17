import React from 'react';
import { Animated, Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashGreyRadial } from '../../../shared/assets/images/SplashGreyRadial';
import { SplashOrangeRadial } from '../../../shared/assets/images/SplashOrangeRadial';
import { theme } from '../../../shared/config/theme';
import { useSplashMountFade } from '../model';

/** Logo asset — `shared/assets/images/logo-mobileapp.png` */
const LOGO = require('../../../shared/assets/images/logo-mobileapp.png');

const LOGO_WIDTH = 304;
const LOGO_HEIGHT = 250;

/** decor2.svg — серый радиал, центр в правом верхнем углу (~¼ круга внутри экрана). */
const GREY_DECOR_SIZE = 271 * 1.15;
/** decor1.svg — оранжевый радиал, центр в левом нижнем углу (~¼ круга внутри экрана). */
const ORANGE_DECOR_WIDTH = 290 * 1.15;
const ORANGE_DECOR_HEIGHT = ORANGE_DECOR_WIDTH * (289 / 290);

export const SplashPage = () => {
  const { width: windowWidth } = useWindowDimensions();
  const opacity = useSplashMountFade();

  const contentMaxWidth = Math.min(windowWidth, theme.layout.containerMaxWidth);
  const logoWidth = Math.min(
    LOGO_WIDTH,
    Math.max(theme.spacing[8], contentMaxWidth - theme.spacing[4] * 2),
  );
  const logoHeight = logoWidth * (LOGO_HEIGHT / LOGO_WIDTH);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={[styles.shell, { maxWidth: contentMaxWidth }]}>
        <Animated.View style={[styles.fadeLayer, { opacity }]} pointerEvents="none">
          <View style={styles.decorBottomLeftOrange} accessibilityElementsHidden>
            <SplashOrangeRadial width={ORANGE_DECOR_WIDTH} height={ORANGE_DECOR_HEIGHT} />
          </View>
          <View style={styles.decorTopRightGrey} accessibilityElementsHidden>
            <SplashGreyRadial width={GREY_DECOR_SIZE} height={GREY_DECOR_SIZE} />
          </View>
          <View style={styles.logoWrap}>
            <Image
              source={LOGO}
              style={[styles.logo, { width: logoWidth, height: logoHeight }]}
              resizeMode="contain"
              accessibilityRole="image"
              accessibilityLabel="Остатки сладки"
            />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.client.colors.card,
  },
  shell: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: theme.client.colors.card,
  },
  fadeLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  decorBottomLeftOrange: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: ORANGE_DECOR_WIDTH,
    height: ORANGE_DECOR_HEIGHT,
    transform: [
      { translateX: -ORANGE_DECOR_WIDTH / 2 },
      { translateY: ORANGE_DECOR_HEIGHT / 2 },
    ],
  },
  decorTopRightGrey: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: GREY_DECOR_SIZE,
    height: GREY_DECOR_SIZE,
    transform: [
      { translateX: GREY_DECOR_SIZE / 2 },
      { translateY: -GREY_DECOR_SIZE / 2 },
    ],
  },
  logoWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
  },
  logo: {
    maxWidth: LOGO_WIDTH,
    maxHeight: LOGO_HEIGHT,
  },
});
