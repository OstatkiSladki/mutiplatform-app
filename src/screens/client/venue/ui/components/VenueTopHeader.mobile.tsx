import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClientTopHeader } from '../../../../../widgets/client-top-header';
import { Input } from '../../../../../shared/ui/input';
import { Icon } from '../../../../../shared/ui/icon';
import { theme } from '../../../../../shared/config/theme';

interface VenueTopHeaderProps {
  onBack: () => void;
}

export const VenueTopHeader = ({ onBack }: VenueTopHeaderProps) => (
  <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
    <View style={styles.content}>
      <ClientTopHeader />
      <View style={styles.searchRow}>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.75}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Назад"
        >
          <Icon name="arrow-left" size={20} color={theme.client.colors.foreground} />
        </TouchableOpacity>
        <Input
          variant="pill"
          leadingIcon="search"
          placeholder="Search"
          autoCapitalize="none"
          containerStyle={styles.search}
        />
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.client.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing[4],
    paddingBottom: theme.spacing[2],
    gap: theme.spacing[5],
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: theme.client.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.client.colors.secondary,
  },
  search: {
    flex: 1,
    marginBottom: 0,
  },
});
