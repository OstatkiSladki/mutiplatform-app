export const YANDEX_MAPS_API_KEY = process.env.EXPO_PUBLIC_YANDEX_MAPS_KEY ?? '';
export const YANDEX_MAPS_JS_KEY =
  process.env.EXPO_PUBLIC_YANDEX_MAPS_JS_KEY ?? YANDEX_MAPS_API_KEY;
/** Prefer JS key — it works for HTTP Geocoder when the dedicated key is missing or invalid. */
export const YANDEX_GEOCODER_KEY =
  process.env.EXPO_PUBLIC_YANDEX_MAPS_JS_KEY ??
  process.env.EXPO_PUBLIC_YANDEX_MAPS_KEY ??
  '';
