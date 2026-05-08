import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { useBusinessAppStore } from '../../../entities/business-app/model/store';
import { showBusinessToast } from '../../../shared/lib/business-toast';
import { RiskBanner } from './components/risk-banner';
import { RiskFilterBar, type RiskFilterValue } from './components/risk-filter-bar';
import { ForecastRow } from './components/forecast-row';
import { styles } from './styles';

const LOSS_PER_UNIT = 50;

export const BusinessForecastScreen = () => {
  const { t } = useTranslation('business');
  const { forecast, addOfferFromForecast } = useBusinessAppStore(
    useShallow((state) => ({
      forecast: state.forecast,
      addOfferFromForecast: state.addOfferFromForecast,
    }))
  );
  const [filter, setFilter] = useState<RiskFilterValue>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? forecast : forecast.filter((f) => f.risk === filter)),
    [filter, forecast]
  );

  const highRiskItems = useMemo(() => forecast.filter((f) => f.risk === 'Высокий'), [forecast]);
  const lossEstimate = useMemo(
    () => highRiskItems.reduce((sum, item) => sum + (item.stock - item.forecast) * LOSS_PER_UNIT, 0),
    [highRiskItems]
  );

  const filterOptions: { value: RiskFilterValue; label: string }[] = [
    { value: 'all', label: t('forecast.filters.all') },
    { value: 'Высокий', label: t('forecast.filters.high') },
    { value: 'Средний', label: t('forecast.filters.mid') },
    { value: 'Низкий', label: t('forecast.filters.low') },
  ];

  const surplusLabel = (n: number) => t('forecast.table.surplus', { n });
  const deficitLabel = (n: number) => t('forecast.table.deficit', { n });
  const actionLabel = t('forecast.table.createOffer');

  const handleCreateOffer = (id: string) => {
    const item = forecast.find((f) => f.id === id);
    if (!item) return;
    addOfferFromForecast(item);
    showBusinessToast(t('forecast.toast.created', { name: item.name }));
  };

  const handleBannerPress = () => {
    // Stage 6.2 wires this to surprise-box modal.
  };

  const handleRowPress = () => {
    // Stage 6.2 wires this to single-offer modal.
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <RiskBanner
        visible={highRiskItems.length > 0}
        title={t('forecast.banner.title', { count: highRiskItems.length })}
        description={t('forecast.banner.description', {
          loss: lossEstimate.toLocaleString('ru-RU').replace(/,/g, ' '),
        })}
        cta={t('forecast.banner.cta')}
        onPress={handleBannerPress}
      />

      <View style={styles.tableCard}>
        <RiskFilterBar
          options={filterOptions}
          active={filter}
          onChange={setFilter}
          categoriesLabel={t('forecast.filters.categories')}
        />

        <View style={styles.tableHeaderRow}>
          <Text style={[styles.headerText, { flex: 2, minWidth: 200 }]}>{t('forecast.table.product')}</Text>
          <Text style={[styles.headerText, { flex: 1, minWidth: 120 }]}>{t('forecast.table.category')}</Text>
          <Text style={[styles.headerText, { width: 80 }]}>{t('forecast.table.stock')}</Text>
          <Text style={[styles.headerText, { flex: 1, minWidth: 120 }]}>{t('forecast.table.demand')}</Text>
          <Text style={[styles.headerText, { width: 110 }]}>{t('forecast.table.risk')}</Text>
          <Text style={[styles.headerText, styles.headerActionCol]}>{t('forecast.table.action')}</Text>
        </View>

        {filtered.map((item) => (
          <ForecastRow
            key={item.id}
            item={item}
            surplusLabel={surplusLabel}
            deficitLabel={deficitLabel}
            actionLabel={actionLabel}
            onPress={handleRowPress}
            onAction={() => handleCreateOffer(item.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};
