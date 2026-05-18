import { theme } from '../../../shared/config/theme';

const { surpriseBoxImageWidthRef, surpriseBoxImageHeightRef } = theme.client.chrome;

/** Соотношение сторон фото (макет 280×500). */
export const SURPRISE_BOX_DESKTOP_IMAGE_ASPECT =
  surpriseBoxImageWidthRef / surpriseBoxImageHeightRef;

/** Верхняя граница высоты фото при широкой колонке. */
export const SURPRISE_BOX_DESKTOP_IMAGE_MAX_HEIGHT = surpriseBoxImageHeightRef;

/** Колонка тела карточки: фото и настройки поровну (flex 1 / 1). */
export const surpriseBoxDesktopBodyColumnStyle = {
  flex: 1,
  flexBasis: 0,
  flexGrow: 1,
  flexShrink: 1,
  minWidth: 0,
} as const;
