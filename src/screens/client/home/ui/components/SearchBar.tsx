import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { theme } from '../../../../../shared/config/theme';
import { Icon } from '../../../../../shared/ui/icon';

export interface SearchBarProps {
  value: string;
  placeholder: string;
  onChange: (next: string) => void;
}

export const SearchBar = ({ value, placeholder, onChange }: SearchBarProps) => (
  <View style={styles.container}>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={theme.client.colors.mutedForeground}
      style={styles.input}
    />
    <View style={styles.iconWrap} pointerEvents="none">
      <Icon name="search" size={18} color={theme.client.colors.mutedForeground} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 44,
    borderRadius: theme.client.radius.sm,
    backgroundColor: theme.colors.neutral[9],
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing[3],
    paddingRight: theme.spacing[5],
  },
  input: {
    flex: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[3],
    color: theme.client.colors.foreground,
    paddingVertical: theme.spacing[2],
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
  },
});
