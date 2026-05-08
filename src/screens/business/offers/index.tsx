import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { useBusinessAppStore } from '../../../entities/business-app/model/store';
import { showBusinessToast } from '../../../shared/lib/business-toast';
import { PublishedCounter } from './components/published-counter';
import { OfferTabs, type OfferTabValue } from './components/offer-tabs';
import { OfferRow } from './components/offer-row';
import { styles } from './styles';

export const BusinessOffersScreen = () => {
  const { t } = useTranslation('business');
  const { offers, publishOffer, removeOffer } = useBusinessAppStore(
    useShallow((state) => ({
      offers: state.offers,
      publishOffer: state.publishOffer,
      removeOffer: state.removeOffer,
    }))
  );
  const [tab, setTab] = useState<OfferTabValue>('all');

  const filtered = useMemo(
    () => (tab === 'all' ? offers : offers.filter((o) => o.status === tab)),
    [tab, offers]
  );

  const publishedCount = useMemo(() => offers.filter((o) => o.status === 'Опубликовано').length, [offers]);

  const tabOptions: { value: OfferTabValue; label: string }[] = [
    { value: 'all', label: t('offers.tabs.all') },
    { value: 'Опубликовано', label: t('offers.tabs.published') },
    { value: 'Черновик', label: t('offers.tabs.draft') },
  ];

  const publishLabel = t('offers.actions.publish');
  const editLabel = t('offers.actions.edit');
  const removeLabel = t('offers.actions.remove');

  const handlePublish = (id: string) => {
    publishOffer(id);
    showBusinessToast(t('offers.toast.published'));
  };

  const handleRemove = (id: string) => {
    removeOffer(id);
    showBusinessToast(t('offers.toast.removed'));
  };

  const handleEdit = (_id: string) => {
    // Stage 7.2 wires this to the edit modal.
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <PublishedCounter label={t('offers.counter')} count={publishedCount} />

      <View style={styles.card}>
        <OfferTabs
          options={tabOptions}
          active={tab}
          onChange={setTab}
          categoriesLabel={t('offers.tabs.categories')}
        />

        <View style={styles.tableHeaderRow}>
          <Text style={[styles.headerText, { flex: 2, minWidth: 200 }]}>{t('offers.table.product')}</Text>
          <Text style={[styles.headerText, { flex: 1, minWidth: 120 }]}>{t('offers.table.category')}</Text>
          <Text style={[styles.headerText, { width: 70 }]}>{t('offers.table.stock')}</Text>
          <Text style={[styles.headerText, { width: 70 }]}>{t('offers.table.oldPrice')}</Text>
          <Text style={[styles.headerText, { width: 70 }]}>{t('offers.table.price')}</Text>
          <Text style={[styles.headerText, { width: 130 }]}>{t('offers.table.status')}</Text>
          <Text style={[styles.headerText, styles.headerActionCol]}>{t('offers.table.action')}</Text>
        </View>

        {filtered.map((offer) => (
          <OfferRow
            key={offer.id}
            offer={offer}
            publishLabel={publishLabel}
            editLabel={editLabel}
            removeLabel={removeLabel}
            onPublish={() => handlePublish(offer.id)}
            onEdit={() => handleEdit(offer.id)}
            onRemove={() => handleRemove(offer.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
};
