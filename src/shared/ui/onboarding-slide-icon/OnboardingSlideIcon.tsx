import React, { useMemo } from 'react';
import { SvgXml } from 'react-native-svg';
import {
  ONBOARDING_BOOKING_SVG_XML,
  ONBOARDING_BOOK_SVG_XML,
  ONBOARDING_FOOD_SVG_XML,
} from '../../assets/icons/onboarding-svg-xml';

const DESIGN_PRIMARY_HEX = '#FA7201';

function tintOnboardingSvg(xml: string, color: string): string {
  return xml.replace(new RegExp(DESIGN_PRIMARY_HEX, 'gi'), color);
}

export type OnboardingSlideIconId = 'book' | 'booking' | 'food';

const XML_BY_ID: Record<OnboardingSlideIconId, string> = {
  book: ONBOARDING_BOOK_SVG_XML,
  booking: ONBOARDING_BOOKING_SVG_XML,
  food: ONBOARDING_FOOD_SVG_XML,
};

const ICON_PX = 46;

export interface OnboardingSlideIconProps {
  id: OnboardingSlideIconId;
  color: string;
}

export const OnboardingSlideIcon = ({ id, color }: OnboardingSlideIconProps) => {
  const xml = useMemo(() => tintOnboardingSvg(XML_BY_ID[id], color), [color, id]);
  return <SvgXml xml={xml} width={ICON_PX} height={ICON_PX} />;
};
