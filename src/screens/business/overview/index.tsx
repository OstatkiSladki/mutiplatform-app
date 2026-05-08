import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PeriodToggle } from './components/period-toggle';
import { KpiCard } from './components/kpi-card';
import { TopSalesCard } from './components/top-sales-card';
import { OutsidersCard } from './components/outsiders-card';
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

  const soldLabel = (n: number) => t('overview.sold', { count: n });

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
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartPlaceholderText}>{t('overview.chartsPlaceholder')}</Text>
        </View>
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
