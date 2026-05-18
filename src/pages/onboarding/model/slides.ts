import type { ImageSourcePropType } from 'react-native';
import type { OnboardingSlideIconId } from '../../../shared/ui/onboarding-slide-icon';

export interface OnboardingSlideModel {
  key: string;
  image: ImageSourcePropType;
  icon: OnboardingSlideIconId;
  titleKey: string;
  descriptionKey: string;
}

export const ONBOARDING_SLIDES: OnboardingSlideModel[] = [
  {
    key: 'save-food',
    image: require('../../../shared/assets/images/tutor1.png'),
    icon: 'book',
    titleKey: 'slide1Title',
    descriptionKey: 'slide1Description',
  },
  {
    key: 'quick-booking',
    image: require('../../../shared/assets/images/tutor2.png'),
    icon: 'booking',
    titleKey: 'slide2Title',
    descriptionKey: 'slide2Description',
  },
  {
    key: 'tasty-value',
    image: require('../../../shared/assets/images/tutor3.png'),
    icon: 'food',
    titleKey: 'slide3Title',
    descriptionKey: 'slide3Description',
  },
];
