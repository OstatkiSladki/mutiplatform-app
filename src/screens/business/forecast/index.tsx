import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { useBusinessAppStore } from '../../../entities/business-app/model/store';
import { showBusinessToast } from '../../../shared/lib/business-toast';
import {
  SurpriseBoxModal,
  SingleOfferModal,
  useForecastModal,
} from '../../../features/business/forecast-action';
import { RiskBanner } from './components/risk-banner';
import { RiskFilterBar, type RiskFilterValue } from './components/risk-filter-bar';
import { ForecastRow } from './components/forecast-row';
import { styles } from './styles';

const LOSS_PER_UNIT = 50;
const BOX_PREFILL_COUNT = 4;

export const BusinessForecastScreen = () => {
  const { t } = useTranslation('business');
  const { forecast, addOfferFromForecast } = useBusinessAppStore(
    useShallow((state) => ({
      forecast: state.forecast,
      addOfferFromForecast: state.addOfferFromForecast,
    }))
  );
  const [filter, setFilter] = useState<RiskFilterValue>('all');
  const modal = useForecastModal();

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
    modal.openBox(highRiskItems.slice(0, BOX_PREFILL_COUNT));
  };

  const handleRowPress = (id: string) => {
    const item = forecast.find((f) => f.id === id);
    if (item) modal.openSingle(item);
  };

  const handleAppendBox = () => {
    const next = forecast.find((f) => !modal.state.boxItems.some((b) => b.id === f.id));
    if (next) modal.appendBoxItem(next);
  };

  const handleRebuild = () => {
    showBusinessToast(t('forecast.toast.boxRebuilt'));
  };

  const handlePublishBox = () => {
    modal.state.boxItems.forEach((item) => addOfferFromForecast(item));
    showBusinessToast(t('forecast.toast.boxPublished', { name: modal.state.boxName }));
    modal.closeBox();
  };

  const handlePublishSingle = () => {
    const item = modal.state.single;
    if (!item) return;
    addOfferFromForecast(item);
    showBusinessToast(t('forecast.toast.published', { name: item.name }));
    modal.closeSingle();
  };

  return (
    <>
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
              onPress={() => handleRowPress(item.id)}
              onAction={() => handleCreateOffer(item.id)}
            />
          ))}
        </View>
      </ScrollView>

      <SurpriseBoxModal
        visible={modal.state.mode === 'box'}
        items={modal.state.boxItems}
        boxName={modal.state.boxName}
        boxSize={modal.state.boxSize}
        onChangeName={modal.setBoxName}
        onChangeSize={modal.setBoxSize}
        onRemoveItem={modal.removeBoxItem}
        onAppendNext={handleAppendBox}
        onRebuild={handleRebuild}
        onPublish={handlePublishBox}
        onClose={modal.closeBox}
      />

      <SingleOfferModal
        visible={modal.state.mode === 'single'}
        item={modal.state.single}
        qty={modal.state.singleQty}
        onChangeQty={modal.setSingleQty}
        onPublish={handlePublishSingle}
        onClose={modal.closeSingle}
      />
    </>
  );
};
