import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YANDEX_MAPS_JS_KEY } from '../../shared/config/env';
import { theme } from '../../shared/config/theme';
import { ensureYmapsReady } from '../../shared/lib/yandex/inject-yandex-script';
import { MapPlaceholder } from '../../shared/ui/map-placeholder';
import { MapWalkingRadiusControl } from './MapWalkingRadiusControl.web';
import type { MapWidgetProps } from './types';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyMap = any;

const DEFAULT_CENTER: [number, number] = [39.7015, 47.2357];
const DEFAULT_ZOOM = 14;

const VENUE_PIN_SVG =
  '<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z" fill="#fa7201"/>' +
  '<circle cx="16" cy="16" r="6" fill="white"/>' +
  '</svg>';

const HOME_PIN_SVG =
  '<svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M20 0C9.507 0 1 8.507 1 19c0 11.875 18.5 28 18.5 28S38 30.875 38 19C38 8.507 29.493 0 20 0z" fill="#fa7201"/>' +
  '<circle cx="20" cy="19" r="8" fill="white"/>' +
  '<circle cx="20" cy="17" r="3" fill="#fa7201"/>' +
  '</svg>';

const RADIUS_CIRCLE_STYLE = {
  simplificationRate: 0,
  stroke: [{ width: 2, color: theme.colors.primary[100] }],
  fill: 'rgba(250, 114, 1, 0.15)',
  fillRule: 'nonzero',
};
export const MapWidget = ({
  venues = [],
  style,
  initialCenter,
  userLocation,
  walkingRadiusRing,
  walkingRadiusMinutes,
  onWalkingRadiusChange,
  onVenuePress,
}: MapWidgetProps) => {
  const { t: tCommon } = useTranslation('common');
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<AnyMap>(null);
  const markersRef = useRef<AnyMap[]>([]);
  const overlayRef = useRef<AnyMap[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onVenuePressRef = useRef(onVenuePress);
  onVenuePressRef.current = onVenuePress;

  const center: [number, number] = userLocation
    ? [userLocation.lon, userLocation.lat]
    : initialCenter
      ? [initialCenter.lon, initialCenter.lat]
      : DEFAULT_CENTER;

  useEffect(() => {    if (!containerRef.current) return;
    if (!YANDEX_MAPS_JS_KEY) {
      setFailed(true);
      return;
    }

    let alive = true;

    ensureYmapsReady(YANDEX_MAPS_JS_KEY)
      .then((ymaps3) => {
        if (!alive || !containerRef.current) return;
        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;
        const map = new YMap(containerRef.current, {
          location: { center, zoom: DEFAULT_ZOOM },
        });
        map.addChild(new YMapDefaultSchemeLayer({ theme: 'light' }));
        map.addChild(new YMapDefaultFeaturesLayer());
        mapRef.current = map;
        setMapReady(true);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });

    return () => {
      alive = false;
      mapRef.current?.destroy();
      mapRef.current = null;
      markersRef.current = [];
      overlayRef.current = [];
      setMapReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapReady || !mapRef.current || !window.ymaps3) return;
    const { YMapMarker, YMapFeature } = window.ymaps3;

    markersRef.current.forEach((marker) => mapRef.current?.removeChild(marker));
    overlayRef.current.forEach((feature) => mapRef.current?.removeChild(feature));
    markersRef.current = [];
    overlayRef.current = [];

    if (walkingRadiusRing && walkingRadiusRing.length >= 3) {
      const polygon = new YMapFeature({
        geometry: {
          type: 'Polygon',
          coordinates: [walkingRadiusRing],
        },
        style: RADIUS_CIRCLE_STYLE,
      });
      mapRef.current.addChild(polygon);
      overlayRef.current.push(polygon);
    }

    if (userLocation) {
      const homeEl = document.createElement('div');
      homeEl.innerHTML = HOME_PIN_SVG;
      homeEl.style.cssText = 'pointer-events:none;transform:translate(-50%,-100%);line-height:0;';
      const homeMarker = new YMapMarker(
        { coordinates: [userLocation.lon, userLocation.lat], zIndex: 2000 },
        homeEl,
      );
      mapRef.current.addChild(homeMarker);
      overlayRef.current.push(homeMarker);
    }

    venues
      .filter((venue) => venue.latitude && venue.longitude)
      .forEach((venue) => {
        const el = document.createElement('div');
        el.innerHTML = VENUE_PIN_SVG;
        el.style.cssText = 'cursor:pointer;transform:translate(-50%,-100%);line-height:0;';
        el.addEventListener('click', () => onVenuePressRef.current?.(venue));

        const marker = new YMapMarker(
          { coordinates: [parseFloat(venue.longitude!), parseFloat(venue.latitude!)] },
          el,
        );
        mapRef.current!.addChild(marker);
        markersRef.current.push(marker);
      });

    if (userLocation) {
      mapRef.current.setLocation({ center: [userLocation.lon, userLocation.lat], duration: 250 });
    }
  }, [mapReady, venues, userLocation, walkingRadiusRing]);

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
    backgroundColor: theme.client.colors.secondaryMuted,
  };

  if (failed) {
    return <MapPlaceholder label={tCommon('mapLoadError')} style={style} />;
  }

  return (
    <div style={containerStyle}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      {walkingRadiusMinutes && onWalkingRadiusChange ? (
        <MapWalkingRadiusControl
          minutes={walkingRadiusMinutes}
          onChange={onWalkingRadiusChange}
        />
      ) : null}    </div>
  );
};
