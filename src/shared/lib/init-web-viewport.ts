import { Platform } from 'react-native';

const VIEWPORT_CONTENT = 'width=device-width, initial-scale=1, viewport-fit=cover';

/** Ensures mobile browsers use device width instead of a desktop-scaled viewport. */
export function initWebViewport(): void {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  let meta = document.querySelector('meta[name="viewport"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', VIEWPORT_CONTENT);
}
