import React from 'react';
import Svg, { Defs, Ellipse, G, LinearGradient, Stop } from 'react-native-svg';
import { theme } from '../../config/theme';

const GRADIENT_ID = 'splashOrangeRadialGrad';

/** Raster-free mirror of `decor1.svg` — brand radial for splash bottom-right. */
export interface SplashOrangeRadialProps {
  width?: number;
  height?: number;
}

export const SplashOrangeRadial = ({
  width = 290,
  height = 289,
}: SplashOrangeRadialProps) => (
  <Svg width={width} height={height} viewBox="0 0 290 289">
    <Defs>
      <LinearGradient
        id={GRADIENT_ID}
        x1={144.717}
        y1={121.126}
        x2={136.829}
        y2={282.163}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor={theme.colors.primary[20]} />
        <Stop offset="1" stopColor={theme.colors.primary[100]} />
      </LinearGradient>
    </Defs>
    <G transform="rotate(90 144.94 144.062)">
      <Ellipse
        cx={144.94}
        cy={144.062}
        rx={85.5}
        ry={86.3784}
        stroke={`url(#${GRADIENT_ID})`}
        strokeWidth={117.123}
        strokeDasharray="3.51 3.51"
        fill="none"
      />
    </G>
  </Svg>
);
