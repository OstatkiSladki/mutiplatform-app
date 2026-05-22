import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  WALKING_RADIUS_OPTIONS_MIN,
  type WalkingRadiusMinutes,
} from '../../entities/location';
import { theme } from '../../shared/config/theme';
import { Icon } from '../../shared/ui/icon';

export interface MapWalkingRadiusControlProps {
  minutes: WalkingRadiusMinutes;
  onChange: (minutes: WalkingRadiusMinutes) => void;
}

export const MapWalkingRadiusControl = ({ minutes, onChange }: MapWalkingRadiusControlProps) => {
  const { t } = useTranslation('catalog');

  const wrapStyle = useMemo<React.CSSProperties>(
    () => ({
      position: 'absolute',
      top: theme.spacing[3],
      left: theme.spacing[3],
      zIndex: 4,
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing[2],
      height: theme.client.chrome.headerBarHeight,
      paddingLeft: theme.spacing[3],
      paddingRight: theme.spacing[2],
      borderRadius: theme.client.radius.pill,
      border: `1px solid ${theme.colors.neutral[8]}`,
      backgroundColor: theme.client.colors.card,
      boxShadow: '0 4px 12px rgba(26, 21, 18, 0.08)',
      pointerEvents: 'auto',
    }),
    [],
  );

  const selectStyle = useMemo<React.CSSProperties>(
    () => ({
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
      fontSize: theme.typography.fontSizes[3],
      color: theme.client.colors.foreground,
      cursor: 'pointer',
      paddingRight: theme.spacing[5],
      appearance: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1.5L6 6.5L11 1.5\' stroke=\'%23737373\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right center',
      minWidth: 72,
    }),
    [],
  );

  return (
    <div style={wrapStyle}>
      <Icon name="map-pin" size={16} color={theme.colors.primary[100]} />
      <select
        aria-label={t('walkingRadiusTitle')}
        value={minutes}
        onChange={(event) => onChange(Number(event.target.value) as WalkingRadiusMinutes)}
        style={selectStyle}
      >
        {WALKING_RADIUS_OPTIONS_MIN.map((option) => (
          <option key={option} value={option}>
            {t('walkingRadiusMinutes', { minutes: option })}
          </option>
        ))}
      </select>
    </div>
  );
};
