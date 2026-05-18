import React, { useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PeriodToggle } from './components/period-toggle';
import { KpiCard } from './components/kpi-card';
import { TopSalesCard } from './components/top-sales-card';
import { OutsidersCard } from './components/outsiders-card';
import { RevenueLineChart, HourlyBarChart } from '../../../widgets/business-charts';
import { PERIOD_KEYS, statsByPeriod, topSales, outsiders, type OverviewPeriod } from './data';
import { styles } from './styles';

export const BusinessOverviewScreen = () => {
  const { t } = useTranslation('business');
  const [statsPeriod, setStatsPeriod] = useState<OverviewPeriod>('30d');

  const stats = statsByPeriod[statsPeriod];
  const largeOptions = PERIOD_KEYS.map((value) => ({
    value,
    label: t(`overview.period.large.${value}`),
  }));

  const compactLabels = useMemo(
    () =>
      PERIOD_KEYS.reduce(
        (acc, key) => ({ ...acc, [key]: t(`overview.period.compact.${key}`) }),
        {} as Record<OverviewPeriod, string>
      ),
    [t]
  );

  const soldLabel = (n: number) => t('overview.sold', { count: n });
  const hourlyTooltipFmt = (hour: string, sales: number, plan: number) =>
    t('overview.hourlyChart.tooltipFmt', { hour, sales, plan, defaultValue: `${hour}:00 · продажи ${sales}, план ${plan}` });

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.toggleRow}>
        <PeriodToggle options={largeOptions} active={statsPeriod} onChange={setStatsPeriod} />
      </View>

      <View style={styles.kpiGrid}>
        {stats.map((stat) => (
          <KpiCard
            key={stat.labelKey}
            stat={stat}
            label={t(stat.labelKey)}
            trailing={stat.up ? t('overview.kpi.deltaUp') : t('overview.kpi.deltaDown')}
          />
        ))}
      </View>

      <View style={styles.bottomGrid}>
        <RevenueLineChart
          title={t('overview.revenueChart.title')}
          subtitle={t('overview.revenueChart.subtitle')}
          unit={t('overview.revenueChart.unit')}
          periodLabels={compactLabels}
        />
        <HourlyBarChart
          title={t('overview.hourlyChart.title')}
          subtitle={t('overview.hourlyChart.subtitle')}
          unit={t('overview.hourlyChart.unit')}
          legendSales={t('overview.hourlyChart.legendSales')}
          legendPlan={t('overview.hourlyChart.legendPlan')}
          tooltipFmt={hourlyTooltipFmt}
        />
      </View>

      <View style={styles.bottomGrid}>
        <TopSalesCard
          rows={topSales}
          title={t('overview.topSales.title')}
          subtitle={t('overview.topSales.subtitle')}
          cta={t('overview.topSales.cta')}
          headers={{
            rank: t('overview.topSales.headers.rank'),
            position: t('overview.topSales.headers.position'),
            revenue: t('overview.topSales.headers.revenue'),
            percent: t('overview.topSales.headers.percent'),
          }}
          soldLabel={soldLabel}
        />
        <OutsidersCard
          rows={outsiders}
          title={t('overview.outsiders.title')}
          subtitle={t('overview.outsiders.subtitle')}
          cta={t('overview.outsiders.cta')}
          rowAction={t('overview.outsiders.action')}
          headers={{
            rank: t('overview.outsiders.headers.rank'),
            position: t('overview.outsiders.headers.position'),
          }}
          soldLabel={soldLabel}
        />
      </View>
    </ScrollView>
  );
};
