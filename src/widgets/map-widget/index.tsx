import { MapPlaceholder } from '../../shared/ui/map-placeholder';
import type { MapWidgetProps } from './types';

/** Native: Yandex Maps JS API is web-only; show placeholder until react-native-maps. */
export const MapWidget = ({ style }: MapWidgetProps) => (
  <MapPlaceholder fillParent style={style} />
);
