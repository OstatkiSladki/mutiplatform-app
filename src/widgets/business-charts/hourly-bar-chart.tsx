import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Line, Rect, Text as SvgText } from 'react-native-svg';
import { theme } from '../../shared/config/theme';
import { Icon } from '../../shared/ui/icon';
import { hoursData } from './data';

const b = theme.business;

const W = 520;
const H = 280;
const PAD_L = 48;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 30;
const innerW = W - PAD_L - PAD_R;
const innerH = H - PAD_T - PAD_B;
const TICKS = 5;
const BAR_W = 11;
const GAP = 3;

export interface HourlyBarChartProps {
  title: string;
  subtitle: string;
  unit: string;
  legendSales: string;
  legendPlan: string;
  tooltipFmt: (hour: string, sales: number, plan: number) => string;
}

export const HourlyBarChart = ({ title, subtitle, unit, legendSales, legendPlan, tooltipFmt }: HourlyBarChartProps) => {
  const [hover, setHover] = useState<number | null>(null);
  const maxHour = useMemo(() => Math.max(...hoursData.map((d) => d.b)), []);
  const niceMax = Math.ceil(maxHour / 100) * 100;
  const slot = innerW / hoursData.length;

  const hovered = hover !== null ? hoursData[hover] : null;
  const hoverX = hover !== null ? PAD_L + slot * hover + slot / 2 : 0;
  const hoverYTop = hovered ? PAD_T + innerH - (Math.max(hovered.a, hovered.b) / niceMax) * innerH : 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.menuButton} accessibilityRole="button">
          <Icon name="more-horizontal" size={18} color={b.colors.mutedForeground} />
        </View>
      </View>

      <View style={styles.chartArea}>
        <Svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <Defs>
            <LinearGradient id="barSales" x1="0" x2="0" y1="0" y2="1">
              <Stop offset="0%" stopColor="#F97316" stopOpacity="1" />
              <Stop offset="100%" stopColor="#F97316" stopOpacity="0.55" />
            </LinearGradient>
            <LinearGradient id="barPlan" x1="0" x2="0" y1="0" y2="1">
              <Stop offset="0%" stopColor="#FDBA74" stopOpacity="0.9" />
              <Stop offset="100%" stopColor="#FDBA74" stopOpacity="0.35" />
            </LinearGradient>
          </Defs>
          {Array.from({ length: TICKS + 1 }).map((_, i) => {
            const y = PAD_T + (i * innerH) / TICKS;
            const val = Math.round(niceMax - (i * niceMax) / TICKS);
            return (
              <React.Fragment key={`tick-${i}`}>
                <Line x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} stroke={b.colors.border} strokeDasharray="2 3" opacity={0.7} />
                <SvgText x={PAD_L - 8} y={y + 3} textAnchor="end" fill={b.colors.mutedForeground} fontSize="10">
                  {`${val} ${unit}`}
                </SvgText>
              </React.Fragment>
            );
          })}
          {hoursData.map((point, i) => {
            const cx = PAD_L + slot * i + slot / 2;
            const xA = cx - BAR_W - GAP / 2;
            const xB = cx + GAP / 2;
            const hA = Math.max((point.a / niceMax) * innerH, BAR_W);
            const hB = Math.max((point.b / niceMax) * innerH, BAR_W);
            const yA = PAD_T + innerH - hA;
            const yB = PAD_T + innerH - hB;
            const active = hover === i;
            const webHandlers =
              Platform.OS === 'web'
                ? {
                    onPointerEnter: () => setHover(i),
                    onPointerLeave: () => setHover(null),
                  }
                : { onPress: () => setHover(active ? null : i) };
            return (
              <React.Fragment key={`bar-${point.h}`}>
                <Rect
                  x={cx - BAR_W - GAP / 2 - 4}
                  y={PAD_T}
                  width={BAR_W * 2 + GAP + 8}
                  height={innerH}
                  fill="transparent"
                  {...webHandlers}
                />
                <Rect x={xA} y={yA} width={BAR_W} height={hA} rx={BAR_W / 2} fill="url(#barSales)" opacity={active ? 1 : 0.95} />
                <Rect x={xB} y={yB} width={BAR_W} height={hB} rx={BAR_W / 2} fill="url(#barPlan)" opacity={active ? 1 : 0.95} />
                <SvgText x={cx} y={H - 10} textAnchor="middle" fill={b.colors.mutedForeground} fontSize="11">
                  {point.h}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>

        {hovered ? (
          <View
            pointerEvents="none"
            style={[
              styles.tooltip,
              {
                left: `${(hoverX / W) * 100}%`,
                top: `${(hoverYTop / H) * 100}%`,
              },
            ]}
          >
            <Text style={styles.tooltipText}>{tooltipFmt(hovered.h, hovered.a, hovered.b)}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F97316' }]} />
          <Text style={styles.legendText}>{legendSales}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FDBA74' }]} />
          <Text style={styles.legendText}>{legendPlan}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 320,
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
    marginBottom: 8,
    columnGap: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 20,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  subtitle: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
    marginTop: 2,
  },
  menuButton: {
    padding: 4,
  },
  chartArea: {
    height: 300,
    position: 'relative',
    marginTop: 16,
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
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 12,
    fontWeight: '400',
    color: b.colors.background,
  },
  legend: {
    flexDirection: 'row',
    columnGap: 16,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 12,
    color: b.colors.mutedForeground,
  },
});
