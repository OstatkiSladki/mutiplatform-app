import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../config/theme';
import { Stepper, type StepperProps } from './Stepper';

const STEPPER_WIDTH = 148;
const STEPPER_HEIGHT = 42;

export type DesktopQuantityStepperProps = Pick<
  StepperProps,
  'value' | 'onChange' | 'min' | 'max' | 'step'
>;

/** Desktop pill stepper — 148×42, same as product details modal. */
export const DesktopQuantityStepper = ({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
}: DesktopQuantityStepperProps) => (
  <View style={styles.wrap}>
    <View style={styles.inner}>
      <Stepper
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        size="sm"
        spread
        accentIncrement
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    width: STEPPER_WIDTH,
    height: STEPPER_HEIGHT,
    backgroundColor: theme.client.colors.secondary,
    borderRadius: theme.client.radius.pill,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[2],
    flexShrink: 0,
  },
  inner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});
