import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, Modal, FlatList, StyleSheet, Platform } from 'react-native';
import { Icon } from '../icon';
import { theme } from '../../config/theme';

const b = theme.business;

export interface BSelectOption<T extends string | number = string> {
  label: string;
  value: T;
}

export interface BSelectProps<T extends string | number = string> {
  options: BSelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
}

export const BSelect = <T extends string | number = string>({
  options,
  value,
  onChange,
  placeholder = 'Выбрать...',
  label,
}: BSelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (Platform.OS !== 'web' || !open) return;
    const handler = (e: Event) => {
      if ((e as KeyboardEvent).key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  const handleSelect = (val: T) => {
    onChange(val);
    close();
  };

  const renderItem = ({ item }: { item: BSelectOption<T> }) => {
    const isActive = item.value === value;
    return (
      <Pressable
        style={[styles.option, isActive && styles.optionActive]}
        onPress={() => handleSelect(item.value)}
        accessibilityRole="menuitem"
        accessibilityState={{ selected: isActive }}
      >
        <Text style={[styles.optionText, isActive && styles.optionTextActive]} numberOfLines={1}>
          {item.label}
        </Text>
        {isActive && <Icon name="check" size={16} color={b.colors.primary} />}
      </Pressable>
    );
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable
        style={styles.trigger}
        onPress={() => setOpen(true)}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open }}
      >
        <Text
          style={selected ? styles.triggerValue : styles.triggerPlaceholder}
          numberOfLines={1}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Icon name="chevron-down" size={16} color={b.colors.mutedForeground} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
        <Pressable style={styles.backdrop} onPress={close} accessibilityRole="button" accessibilityLabel="Закрыть">
          <View style={styles.dropdown} accessibilityRole={Platform.OS === 'web' ? 'listbox' : 'none'}>
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    rowGap: 6,
  },
  label: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 13,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  trigger: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: b.radius.md,
    borderWidth: 1,
    borderColor: b.colors.input,
    paddingHorizontal: 12,
    backgroundColor: b.colors.background,
  },
  triggerValue: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.foreground,
    flex: 1,
  },
  triggerPlaceholder: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.mutedForeground,
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: b.colors.scrimLight,
    justifyContent: 'center',
    padding: 24,
  },
  dropdown: {
    backgroundColor: b.colors.popover,
    borderRadius: b.radius.lg,
    borderWidth: 1,
    borderColor: b.colors.border,
    maxHeight: 280,
    ...b.shadows.card,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: b.colors.border,
  },
  optionActive: {
    backgroundColor: b.colors.muted,
  },
  optionText: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.foreground,
    flex: 1,
  },
  optionTextActive: {
    color: b.colors.primary,
    fontWeight: '600',
  },
});
