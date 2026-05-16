import { YamapInstance } from 'react-native-yamap-plus';
import { YANDEX_MAPS_API_KEY } from '../../shared/config/env';

export const initMaps = (): void => {
  YamapInstance.init(YANDEX_MAPS_API_KEY);
};
