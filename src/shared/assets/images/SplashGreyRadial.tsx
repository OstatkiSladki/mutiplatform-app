import React from 'react';
import Svg, { Circle, G } from 'react-native-svg';
import { theme } from '../../config/theme';

/** Raster-free mirror of `decor2.svg` — subtle grey radial for splash top-left. */
export interface SplashGreyRadialProps {
  width?: number;
  height?: number;
}

export const SplashGreyRadial = ({
  width = 271,
  height = 271,
}: SplashGreyRadialProps) => (
  <Svg width={width} height={height} viewBox="0 0 271 271">
    <G transform="rotate(90 135.5 135.5)">
      <Circle
        cx={135.5}
        cy={135.5}
        r={88.5}
        opacity={0.05}
        stroke={theme.colors.neutral.black}
        strokeWidth={94}
        strokeDasharray="4 4"
        fill="none"
      />
    </G>
  </Svg>
);
