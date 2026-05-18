import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YANDEX_MAPS_JS_KEY } from '../../shared/config/env';
import { MapPlaceholder } from '../../shared/ui/map-placeholder';
import type { MapWidgetProps } from './types';

// Yandex Maps 3.0 global loaded from CDN
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyMap = any;

declare global {
  interface Window {
    ymaps3?: AnyMap;
  }
}

// Ростов-на-Дону (default market city)
const DEFAULT_CENTER: [number, number] = [39.7015, 47.2357];
const DEFAULT_ZOOM = 13;

const PIN_SVG =
  '<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z" fill="#fa7201"/>' +
  '<circle cx="16" cy="16" r="6" fill="white"/>' +
  '</svg>';

function injectYandexScript(apiKey: string): Promise<void> {
  if (document.querySelector('[data-ymaps3]')) {
    return new Promise((resolve) => {
      const id = setInterval(() => {
        if (window.ymaps3) {
          clearInterval(id);
          resolve();
        }
      }, 50);
    });
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
    s.setAttribute('data-ymaps3', '1');
    s.onload = () => resolve();
    s.onerror = (err) => {
      document.querySelector('[data-ymaps3]')?.remove();
      reject(err);
    };
    document.head.appendChild(s);
  });
}

export const MapWidget = ({
  venues = [],
  style,
  initialCenter,
  onVenuePress,
}: MapWidgetProps) => {
  const { t } = useTranslation('common');
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<AnyMap>(null);
  const markersRef = useRef<AnyMap[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onVenuePressRef = useRef(onVenuePress);
  onVenuePressRef.current = onVenuePress;

  useEffect(() => {
    if (!containerRef.current) return;
    if (!YANDEX_MAPS_JS_KEY) {
      console.warn(
        '[MapWidget] Set EXPO_PUBLIC_YANDEX_MAPS_JS_KEY (or EXPO_PUBLIC_YANDEX_MAPS_KEY) in .env',
      );
      setFailed(true);
      return;
    }

    let alive = true;

    const center: [number, number] = initialCenter
      ? [initialCenter.lon, initialCenter.lat]
      : DEFAULT_CENTER;

    injectYandexScript(YANDEX_MAPS_JS_KEY)
      .then(() => window.ymaps3!.ready as Promise<void>)
      .then(() => {
        if (!alive || !containerRef.current) return;
        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = window.ymaps3!;
        const map = new YMap(containerRef.current, {
          location: { center, zoom: DEFAULT_ZOOM },
        });
        map.addChild(new YMapDefaultSchemeLayer({ theme: 'light' }));
        map.addChild(new YMapDefaultFeaturesLayer());
        mapRef.current = map;
        setMapReady(true);
      })
      .catch((err) => {
        console.error(err);
        setFailed(true);
      });

    return () => {
      alive = false;
      mapRef.current?.destroy();
      mapRef.current = null;
      markersRef.current = [];
      setMapReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapReady || !mapRef.current || !window.ymaps3) return;
    const { YMapMarker } = window.ymaps3;

    markersRef.current.forEach((m) => mapRef.current?.removeChild(m));
    markersRef.current = [];

    venues
      .filter((v) => v.latitude && v.longitude)
      .forEach((venue) => {
        const el = document.createElement('div');
        el.innerHTML = PIN_SVG;
        el.style.cssText = 'cursor:pointer;transform:translate(-50%,-100%);line-height:0;';
        el.addEventListener('click', () => onVenuePressRef.current?.(venue));

        const marker = new YMapMarker(
          { coordinates: [parseFloat(venue.longitude!), parseFloat(venue.latitude!)] },
          el,
        );
        mapRef.current!.addChild(marker);
        markersRef.current.push(marker);
      });
  }, [mapReady, venues]);

  const height =
    (typeof style?.height === 'number' ? style.height : undefined) ??
    (typeof style?.minHeight === 'number' ? style.minHeight : undefined) ??
    260;
  const borderRadius =
    typeof style?.borderRadius === 'number' ? style.borderRadius : 16;

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height,
    borderRadius,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f7f4f2',
  };

  if (failed) {
    return <MapPlaceholder label={t('mapLoadError')} style={style} />;
  }

  return <div ref={containerRef} style={containerStyle} />;
};
