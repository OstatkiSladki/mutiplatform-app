import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { useBusinessAppStore } from '../../../entities/business-app/model/store';
import { showBusinessToast } from '../../../shared/lib/business-toast';
import { OrderTabs, type OrderTabValue } from './components/order-tabs';
import { OrderRow } from './components/order-row';
import { styles } from './styles';

export const BusinessOrdersScreen = () => {
  const { t } = useTranslation('business');
  const { orders, advanceOrder } = useBusinessAppStore(
    useShallow((state) => ({ orders: state.orders, advanceOrder: state.advanceOrder }))
  );
  const [tab, setTab] = useState<OrderTabValue>('all');

  const filtered = useMemo(
    () => (tab === 'all' ? orders : orders.filter((o) => o.status === tab)),
    [tab, orders]
  );

  const tabOptions: { value: OrderTabValue; label: string }[] = [
    { value: 'all', label: t('orders.tabs.all') },
    { value: 'Подтверждён', label: t('orders.tabs.confirmed') },
    { value: 'Отменён', label: t('orders.tabs.cancelled') },
  ];

  const advanceLabel = t('orders.actions.advance');
  const noActionLabel = t('orders.actions.noAction');
  const timeWindow = t('orders.timeWindow');

  const handleAdvance = (id: string) => {
    advanceOrder(id);
    showBusinessToast(t('orders.toast.advanced', { id }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <OrderTabs
          options={tabOptions}
          active={tab}
          onChange={setTab}
          categoriesLabel={t('orders.tabs.categories')}
        />

        <View style={styles.tableHeaderRow}>
          <Text style={[styles.headerText, { width: 90 }]}>{t('orders.table.order')}</Text>
          <Text style={[styles.headerText, { flex: 1, minWidth: 160 }]}>{t('orders.table.client')}</Text>
          <Text style={[styles.headerText, { flex: 1.4, minWidth: 200 }]}>{t('orders.table.items')}</Text>
          <Text style={[styles.headerText, { width: 90 }]}>{t('orders.table.amount')}</Text>
          <Text style={[styles.headerText, { width: 110 }]}>{t('orders.table.time')}</Text>
          <Text style={[styles.headerText, { width: 140 }]}>{t('orders.table.status')}</Text>
          <Text style={[styles.headerText, styles.headerActionCol]}>{t('orders.table.action')}</Text>
        </View>

        {filtered.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            timeWindow={timeWindow}
            advanceLabel={advanceLabel}
            noActionLabel={noActionLabel}
            onAdvance={() => handleAdvance(order.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};
