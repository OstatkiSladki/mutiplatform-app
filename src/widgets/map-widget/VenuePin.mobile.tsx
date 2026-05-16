import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export const VenuePin = () => (
  <Svg width={32} height={40} viewBox="0 0 32 40" fill="none">
    <Path
      d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z"
      fill="#fa7201"
    />
    <Circle cx="16" cy="16" r="6" fill="white" />
  </Svg>
);
