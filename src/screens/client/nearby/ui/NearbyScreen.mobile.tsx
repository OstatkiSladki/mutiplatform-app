import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../../../shared/ui/input';
import { MapPlaceholder } from '../../../../shared/ui/map-placeholder';
import { Button } from '../../../../shared/ui/button';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';

export const NearbyScreen = () => (
  <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Адрес</Text>
        <Text style={styles.title}>Где искать еду?</Text>
        <Text style={styles.subtitle}>
          Укажите адрес или используйте текущую геопозицию, чтобы найти
          заведения рядом.
        </Text>
      </View>

      <Input
        variant="pill"
        leadingIcon="search"
        placeholder="Введите адрес или район"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.locationCard} activeOpacity={0.8}>
        <View style={styles.locationIcon}>
          <Icon name="navigation" size={18} color={theme.colors.primary[100]} />
        </View>
        <View style={styles.locationText}>
          <Text style={styles.locationTitle}>Использовать текущее местоположение</Text>
          <Text style={styles.locationSubtitle}>Запрос геолокации появится позже</Text>
        </View>
      </TouchableOpacity>

      <MapPlaceholder
        label="Здесь будет карта с заведениями рядом"
        style={styles.map}
      />

      <View style={styles.savedBlock}>
        <Text style={styles.sectionTitle}>Популярные адреса</Text>
        {['проспект Ленина, 107/1', 'ул. Текучева, 140', 'парк Горького'].map(
          (address) => (
            <TouchableOpacity key={address} style={styles.addressRow} activeOpacity={0.75}>
              <Icon name="map-pin" size={16} color={theme.client.colors.mutedForeground} />
              <Text style={styles.addressText}>{address}</Text>
            </TouchableOpacity>
          ),
        )}
      </View>

      <Button title="Показать рядом" size="large" />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.client.colors.background,
  },
  content: {
    padding: theme.spacing[4],
    paddingBottom: theme.spacing[10],
    gap: theme.spacing[4],
  },
  header: {
    gap: theme.spacing[1],
  },
  eyebrow: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
  title: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[10],
    color: theme.client.colors.foreground,
  },
  subtitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.mutedForeground,
    lineHeight: theme.typography.fontSizes[4] * theme.typography.lineHeights.loose,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: theme.spacing[4],
    borderRadius: theme.client.radius.card,
    backgroundColor: theme.client.colors.card,
    borderWidth: 1,
    borderColor: theme.client.colors.border,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.client.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary[10],
  },
  locationText: {
    flex: 1,
    gap: theme.spacing[1],
  },
  locationTitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '600',
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.foreground,
  },
  locationSubtitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.mutedForeground,
  },
  map: {
    minHeight: 260,
    borderRadius: theme.client.radius.card,
  },
  savedBlock: {
    gap: theme.spacing[2],
  },
  sectionTitle: {
    fontFamily: theme.client.typography.fontFamily,
    fontWeight: '700',
    fontSize: theme.typography.fontSizes[5],
    color: theme.client.colors.foreground,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingVertical: theme.spacing[2],
  },
  addressText: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.foreground,
  },
});
