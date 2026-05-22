import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { Icon } from '../icon';
import { theme } from '../../config/theme';
import { useCartStore, type DraftVenueCart } from '../../../entities/order';
import { formatPrice } from '../../lib/format';

export interface CartMenuProps {
  onVenuePress: (venueId: number) => void;
  onViewAll: () => void;
  onGoHome: () => void;
}

interface VenueCartSummary {
  venueId: number;
  venueName: string;
  count: number;
  total: number;
}

const summarize = (cart: DraftVenueCart): VenueCartSummary => {
  let count = 0;
  let total = 0;
  for (const item of cart.items) {
    count += item.quantity;
    total += item.price * item.quantity;
  }
  return {
    venueId: Number(cart.venueId),
    venueName: cart.venueName,
    count,
    total,
  };
};

export const CartMenu = ({ onVenuePress, onViewAll, onGoHome }: CartMenuProps) => {
  const { t } = useTranslation('catalog');
  const { t: tc } = useTranslation('common');

  const rawCarts = useCartStore(useShallow((s) => Object.values(s.carts)));
  const carts = useMemo(
    () => rawCarts.filter((c) => c.items.length > 0).map(summarize),
    [rawCarts],
  );

  return (
    <View>
      <View style={styles.header}>
        <Icon name="shopping-bag" size={20} color={theme.client.colors.primary} />
        <Text style={styles.headerTitle}>{t('cart.title')}</Text>
      </View>

      {carts.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>{t('cart.emptyTitle')}</Text>
          <Pressable
            style={styles.emptyCta}
            onPress={onGoHome}
            accessibilityRole="button"
            accessibilityLabel={t('cart.emptyCta')}
          >
            <Text style={styles.emptyCtaText}>{t('cart.emptyCta')}</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {carts.map((cart) => (
              <Pressable
                key={String(cart.venueId)}
                style={({ pressed }) => [styles.venueRow, pressed && styles.venueRowPressed]}
                onPress={() => onVenuePress(cart.venueId)}
                accessibilityRole="button"
                accessibilityLabel={cart.venueName}
              >
                <View style={styles.venueMeta}>
                  <Text style={styles.venueName} numberOfLines={1}>
                    {cart.venueName}
                  </Text>
                  <Text style={styles.venueCount}>
                    {t('cart.venueItemsCount', { count: cart.count })}
                  </Text>
                </View>
                <Text style={styles.venueTotal}>{formatPrice(cart.total)}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <Pressable
              style={styles.footerLink}
              onPress={onViewAll}
              accessibilityRole="button"
              accessibilityLabel={tc('header.cart.viewAll')}
            >
              <Text style={styles.footerLinkText}>{tc('header.cart.viewAll')}</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    paddingBottom: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.client.colors.border,
  },
  headerTitle: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: 24,
    color: theme.client.colors.foreground,
  },
  list: {
    maxHeight: 320,
    paddingVertical: theme.spacing[2],
    gap: theme.spacing[2],
  },
  emptyWrap: {
    paddingVertical: theme.spacing[4],
    gap: theme.spacing[3],
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 22,
    color: theme.client.colors.mutedForeground,
    textAlign: 'center',
  },
  emptyCta: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.client.colors.primary,
  },
  emptyCtaText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.primaryForeground,
  },
  venueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[3],
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.client.radius.md,
  },
  venueRowPressed: {
    backgroundColor: theme.client.colors.secondary,
  },
  venueMeta: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  venueName: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.foreground,
  },
  venueCount: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    lineHeight: 20,
    color: theme.client.colors.mutedForeground,
  },
  venueTotal: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: 24,
    color: theme.client.colors.foreground,
    flexShrink: 0,
  },
  footer: {
    paddingTop: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.client.colors.border,
  },
  footerLink: {
    alignSelf: 'center',
    paddingVertical: theme.spacing[2],
  },
  footerLinkText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProSemiBold,
    fontSize: theme.typography.fontSizes[4],
    lineHeight: 24,
    color: theme.client.colors.primary,
  },
});
