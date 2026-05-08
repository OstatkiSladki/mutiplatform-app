import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';
import { styles } from './styles';

export interface ControlledCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  label,
}: ControlledCheckboxProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => onChange(!value)}
          activeOpacity={0.7}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: !!value }}
        >
          <View
            style={[
              styles.box,
              value && styles.boxChecked,
              error && styles.boxError,
            ]}
          >
            {value ? <Icon name="check" size={14} color={theme.colors.neutral.white} /> : null}
          </View>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
        {error?.message ? <Text style={styles.errorText}>{error.message}</Text> : null}
      </View>
    )}
  />
);
