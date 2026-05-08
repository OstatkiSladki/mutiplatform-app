import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Line, Path, Circle } from 'react-native-svg';
import { theme } from '../../shared/config/theme';
import { PeriodToggle } from '../../screens/business/overview/components/period-toggle';
import { PERIOD_KEYS, type OverviewPeriod } from '../../screens/business/overview/data';
import { revenueByPeriod } from './data';

const b = theme.business;

const VIEWBOX_W = 700;
const VIEWBOX_H = 280;
const PAD_X = 40;
const Y_TOP = 40;
const Y_BOTTOM = 240;
const AREA_BASE = 260;

interface PointGeom {
  x: number;
  y: number;
  v: number;
  d: string;
}

function buildPoints(weekData: { d: string; v: number }[], maxV: number): PointGeom[] {
  const span = weekData.length - 1 || 1;
  const innerW = VIEWBOX_W - PAD_X * 2;
  const innerH = Y_BOTTOM - Y_TOP;
  return weekData.map((point, i) => ({
    x: PAD_X + (i * innerW) / span,
    y: Y_BOTTOM - (point.v / maxV) * (innerH - 20),
    v: point.v,
    d: point.d,
  }));
}

function buildLinePath(points: PointGeom[]): string {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
}

function buildAreaPath(points: PointGeom[], linePath: string): string {
  if (points.length === 0) return '';
  const last = points[points.length - 1];
  const first = points[0];
  return `${linePath} L ${last.x} ${AREA_BASE} L ${first.x} ${AREA_BASE} Z`;
}

export interface RevenueLineChartProps {
  title: string;
  subtitle: string;
  unit: string;
  periodLabels: Record<OverviewPeriod, string>;
}

export const RevenueLineChart = ({ title, subtitle, unit, periodLabels }: RevenueLineChartProps) => {
  const [period, setPeriod] = useState<OverviewPeriod>('7d');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = revenueByPeriod[period];
  const maxV = useMemo(() => Math.max(...data.map((d) => d.v)), [data]);
  const points = useMemo(() => buildPoints(data, maxV), [data, maxV]);
  const linePath = useMemo(() => buildLinePath(points), [points]);
  const areaPath = useMemo(() => buildAreaPath(points, linePath), [points, linePath]);

  const handlePeriodChange = (next: OverviewPeriod) => {
    setPeriod(next);
    setHoverIndex(null);
  };

  const periodOptions = PERIOD_KEYS.map((value) => ({ value, label: periodLabels[value] }));
  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <PeriodToggle
          options={periodOptions}
          active={period}
          onChange={handlePeriodChange}
          size="compact"
        />
      </View>

      <View style={styles.chartArea}>
        <Svg viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`} width="100%" height="100%" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="revenueArea" x1="0" x2="0" y1="0" y2="1">
              <Stop offset="0%" stopColor={b.colors.primary} stopOpacity="0.45" />
              <Stop offset="100%" stopColor={b.colors.primary} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          {data.map((_, i) => {
            const y = 40 + (i * 200) / Math.max(data.length - 1, 1);
            return (
              <Line
                key={`grid-${i}`}
                x1={0}
                x2={VIEWBOX_W}
                y1={y}
                y2={y}
                stroke={b.colors.border}
                strokeDasharray="3 3"
              />
            );
          })}
          <Path d={areaPath} fill="url(#revenueArea)" />
          <Path d={linePath} stroke={b.colors.primary} strokeWidth={2.5} fill="none" />
          {points.map((p, i) => {
            const isActive = hoverIndex === i;
            const webHandlers =
              Platform.OS === 'web'
                ? {
                    onPointerEnter: () => setHoverIndex(i),
                    onPointerLeave: () => setHoverIndex(null),
                  }
                : { onPress: () => setHoverIndex(isActive ? null : i) };
            return (
              <Circle
                key={`hit-${i}`}
                cx={p.x}
                cy={p.y}
                r={14}
                fill="transparent"
                {...webHandlers}
              />
            );
          })}
          {points.map((p, i) => (
            <Circle
              key={`dot-${i}`}
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 7 : 5}
              fill="#ffffff"
              stroke={b.colors.primary}
              strokeWidth={2.5}
            />
          ))}
        </Svg>
        {hovered ? (
          <View
            pointerEvents="none"
            style={[
              styles.tooltip,
              {
                left: `${(hovered.x / VIEWBOX_W) * 100}%`,
                top: `${(hovered.y / VIEWBOX_H) * 100}%`,
              },
            ]}
          >
            <Text style={styles.tooltipText}>
              {hovered.d}: {hovered.v} {unit}
            </Text>
          </View>
        ) : null}

        <View style={styles.xAxis}>
          {data.map((d, i) => (
            <Pressable
              key={`x-${i}`}
              onPress={() => setHoverIndex(i)}
              style={styles.xLabelHit}
              accessibilityRole="button"
              accessibilityLabel={d.d}
            >
              <Text style={styles.xLabel}>{d.d}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 2,
    minWidth: 480,
    backgroundColor: b.colors.surface,
    borderRadius: b.radius.card,
    padding: 24,
    borderWidth: 1,
    borderColor: b.colors.border,
    ...b.shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
    columnGap: 12,
    flexWrap: 'wrap',
    rowGap: 12,
  },
  headerText: {
    flex: 1,
    minWidth: 200,
  },
  title: {
    fontFamily: b.typography.fontFamily,
    fontSize: 20,
    fontWeight: '700',
    color: b.colors.foreground,
  },
  subtitle: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
    marginTop: 2,
  },
  chartArea: {
    height: 280,
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: b.colors.foreground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: b.radius.md,
    transform: [{ translateX: -50 }, { translateY: -100 }],
    marginTop: -8,
  },
  tooltipText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    fontWeight: '600',
    color: b.colors.background,
  },
  xAxis: {
    position: 'absolute',
    left: 40,
    right: 40,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xLabelHit: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  xLabel: {
    fontFamily: b.typography.fontFamily,
    fontSize: 11,
    color: b.colors.mutedForeground,
  },
});
