import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { YANDEX_MAPS_JS_KEY } from '../../../shared/config/env';
import { theme } from '../../../shared/config/theme';
import { injectYandexScript } from '../lib/inject-yandex-script';
import { MAP_HEIGHT_PX } from './address-picker.styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyMap = any;

const PIN_SVG =
  '<svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M20 0C9.507 0 1 8.507 1 19c0 11.875 18.5 28 18.5 28S38 30.875 38 19C38 8.507 29.493 0 20 0z" fill="#fa7201"/>' +
  '<circle cx="20" cy="19" r="8" fill="white"/>' +
  '<circle cx="20" cy="17" r="3" fill="#fa7201"/>' +
  '<path d="M15 22c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#fa7201" stroke-width="1.5" stroke-linecap="round"/>' +
  '</svg>';

const createPinElement = () => {
  const pinEl = document.createElement('div');
  pinEl.innerHTML = PIN_SVG;
  pinEl.style.cssText =
    'pointer-events:none;transform:translate(-50%,-100%);line-height:0;position:relative;z-index:10;';
  return pinEl;
};

const readCursorCoords = (event: { coordinates?: [number, number] }): [number, number] | null => {
  if (Array.isArray(event?.coordinates) && event.coordinates.length === 2) {
    return event.coordinates;
  }
  return null;
};

const readCommitCoords = (
  object: unknown,
  event: { coordinates?: [number, number] },
): [number, number] | null => {
  const mapObject = object as {
    geometry?: { coordinates?: [number, number] };
    entity?: { geometry?: { coordinates?: [number, number] } };
  } | null;

  const entityCoords = mapObject?.entity?.geometry?.coordinates;
  if (Array.isArray(entityCoords) && entityCoords.length === 2) {
    return entityCoords;
  }

  const geometryCoords = mapObject?.geometry?.coordinates;
  if (Array.isArray(geometryCoords) && geometryCoords.length === 2) {
    return geometryCoords;
  }

  return readCursorCoords(event);
};

export interface AddressPickerMapProps {
  lon: number;
  lat: number;
  zoom: number;
  onCoordinatesChange: (lon: number, lat: number, commit?: boolean) => void;
  onZoomChange: (zoom: number) => void;
}

export const AddressPickerMap = ({
  lon,
  lat,
  zoom,
  onCoordinatesChange,
  onZoomChange,
}: AddressPickerMapProps) => {
  const { t } = useTranslation('common');
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<AnyMap>(null);
  const markerRef = useRef<AnyMap>(null);
  const placePinRef = useRef<(coords: [number, number]) => void>(() => undefined);
  const onPickRef = useRef(onCoordinatesChange);
  const rafRef = useRef<number | null>(null);
  const pendingCoordsRef = useRef<[number, number] | null>(null);
  /** Until first click — pin follows cursor; after fix — only click switches position. */
  const followCursorRef = useRef(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  onPickRef.current = onCoordinatesChange;

  const shellStyle = useMemo<React.CSSProperties>(
    () => ({
      width: '100%',
      height: MAP_HEIGHT_PX,
      borderRadius: theme.client.radius.md,
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: theme.client.colors.secondaryMuted,
    }),
    [],
  );

  const mapHostStyle = useMemo<React.CSSProperties>(
    () => ({
      width: '100%',
      height: '100%',
      cursor: 'crosshair',
    }),
    [],
  );

  const zoomStackStyle = useMemo<React.CSSProperties>(
    () => ({
      position: 'absolute',
      right: theme.spacing[3],
      top: (MAP_HEIGHT_PX - 88) / 2,
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing[2],
      zIndex: 2,
      pointerEvents: 'none',
    }),
    [],
  );

  const zoomButtonStyle = useMemo<React.CSSProperties>(
    () => ({
      width: 40,
      height: 40,
      borderRadius: theme.client.radius.md,
      backgroundColor: theme.client.colors.primary,
      border: 'none',
      color: theme.client.colors.primaryForeground,
      fontFamily: theme.typography.fontFamilies.sourceSansProBold,
      fontSize: theme.typography.fontSizes[7],
      lineHeight: '24px',
      cursor: 'pointer',
      pointerEvents: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
    }),
    [],
  );

  useEffect(() => {
    if (!containerRef.current) return;
    if (!YANDEX_MAPS_JS_KEY) {
      setFailed(true);
      return;
    }

    let alive = true;

    injectYandexScript(YANDEX_MAPS_JS_KEY)
      .then(() => window.ymaps3!.ready as Promise<void>)
      .then(() => {
        if (!alive || !containerRef.current) return;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapListener } =
          window.ymaps3!;

        const map = new YMap(containerRef.current, {
          location: { center: [lon, lat], zoom },
        });
        map.addChild(new YMapDefaultSchemeLayer({ theme: 'light' }));
        map.addChild(new YMapDefaultFeaturesLayer());

        const placePin = (coords: [number, number]) => {
          if (markerRef.current) {
            map.removeChild(markerRef.current);
            markerRef.current = null;
          }
          const marker = new YMapMarker({ coordinates: coords, zIndex: 1800 }, createPinElement());
          map.addChild(marker);
          markerRef.current = marker;
        };

        placePinRef.current = placePin;
        followCursorRef.current = true;
        placePin([lon, lat]);

        const scheduleHoverPin = (coords: [number, number]) => {
          if (!followCursorRef.current) return;
          pendingCoordsRef.current = coords;
          if (rafRef.current != null) return;
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            const next = pendingCoordsRef.current;
            if (!next) return;
            placePin(next);
            onPickRef.current(next[0], next[1], false);
          });
        };

        const handleHover = (_object: unknown, event: { coordinates?: [number, number] }) => {
          const coords = readCursorCoords(event);
          if (!coords) return;
          scheduleHoverPin(coords);
        };

        const handleCommit = (object: unknown, event: { coordinates?: [number, number] }) => {
          const coords = readCommitCoords(object, event);
          if (!coords) return;
          if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
          followCursorRef.current = false;
          placePin(coords);
          onPickRef.current(coords[0], coords[1], true);
        };

        map.addChild(
          new YMapListener({
            layer: 'any',
            onMouseMove: handleHover,
            onClick: handleCommit,
            onFastClick: handleCommit,
          }),
        );

        mapRef.current = map;
        setReady(true);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });

    return () => {
      alive = false;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      mapRef.current?.destroy();
      mapRef.current = null;
      markerRef.current = null;
      placePinRef.current = () => undefined;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready || !mapRef.current) return;
    mapRef.current.setLocation({ zoom, duration: 200 });
  }, [ready, zoom]);

  useEffect(() => {
    if (!ready) return;
    placePinRef.current([lon, lat]);
    if (!followCursorRef.current) {
      mapRef.current?.setLocation({ center: [lon, lat], duration: 250 });
    }
  }, [ready, lon, lat]);

  const changeZoom = (delta: number) => {
    onZoomChange(Math.min(19, Math.max(4, zoom + delta)));
  };

  if (failed) {
    return (
      <div
        style={{
          ...shellStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing[4],
        }}
      >
        <span
          style={{
            fontFamily: theme.client.typography.fontFamily,
            fontSize: theme.typography.fontSizes[4],
            lineHeight: '24px',
            color: theme.client.colors.mutedForeground,
            textAlign: 'center',
          }}
        >
          {t('mapLoadError')}
        </span>
      </div>
    );
  }

  return (
    <div style={shellStyle}>
      <div ref={containerRef} style={mapHostStyle} />
      <div style={zoomStackStyle}>
        <button
          type="button"
          style={zoomButtonStyle}
          onClick={() => changeZoom(1)}
          aria-label={t('header.addressZoomIn')}
        >
          +
        </button>
        <button
          type="button"
          style={zoomButtonStyle}
          onClick={() => changeZoom(-1)}
          aria-label={t('header.addressZoomOut')}
        >
          −
        </button>
      </div>
    </div>
  );
};
