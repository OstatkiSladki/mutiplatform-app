import React from 'react';
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { Input, InputProps } from '../../../../shared/ui/input';

export interface ControlledInputProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText' | 'onBlur' | 'error'> {
  control: Control<T>;
  name: Path<T>;
}

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  ...inputProps
}: ControlledInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
      <Input
        value={value as string | undefined}
        onChangeText={onChange}
        onBlur={onBlur}
        error={error?.message}
        {...inputProps}
      />
    )}
  />
);
