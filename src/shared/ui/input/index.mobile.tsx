import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { theme } from '../../config/theme';
import { Icon, IconName } from '../icon';

export type InputVariant = 'default' | 'pill';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  variant?: InputVariant;
  /** Pill search в шапке веб-клиента: r20, Neutral 9. */
  pillTone?: 'default' | 'headerSearch';
  leadingIcon?: IconName;
  onClear?: () => void;
  /** Иконка показа пароля (Feather eye / eye-off) для полей с `secureTextEntry`. */
  showPasswordToggle?: boolean;
}

const INPUT_RADIUS = theme.client.radius.sm;

export const Input = ({
  label,
  error,
  style,
  containerStyle,
  variant = 'default',
  leadingIcon,
  onClear,
  value,
  showPasswordToggle,
  secureTextEntry,
  onFocus,
  onBlur,
  pillTone = 'default',
  ...props
}: InputProps) => {
  const isPill = variant === 'pill';
  const hasValue = typeof value === 'string' && value.length > 0;
  const showClear = isPill && onClear && hasValue;

  const [hidden, setHidden] = useState(true);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const showPwToggle = !!secureTextEntry && !!showPasswordToggle;
  const effectiveSecure = showPwToggle ? hidden : secureTextEntry;

  const animateFocus = useCallback(
    (to: number) => {
      Animated.timing(focusAnim, {
        toValue: to,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    },
    [focusAnim],
  );

  const handleFocus = useCallback(
    (e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
      animateFocus(1);
      onFocus?.(e);
    },
    [animateFocus, onFocus],
  );

  const handleBlur = useCallback(
    (e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
      animateFocus(0);
      onBlur?.(e);
    },
    [animateFocus, onBlur],
  );

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.neutral[8], theme.colors.primary[100]],
  });

  const defaultWrapAnimatedStyle = useMemo(
    () => ({
      borderColor,
    }),
    [borderColor],
  );

  if (isPill) {
    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.pillWrap,
            pillTone === 'headerSearch' && styles.pillWrapHeaderSearch,
            error ? styles.pillWrapError : null,
          ]}
        >
          {leadingIcon && (
            <Icon
              name={leadingIcon}
              size={18}
              color={theme.client.colors.mutedForeground}
            />
          )}
          <TextInput
            style={[styles.pillInput, style]}
            placeholderTextColor={theme.client.colors.mutedForeground}
            value={value}
            {...props}
          />
          {showClear && (
            <TouchableOpacity
              onPress={onClear}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Clear"
            >
              <Icon name="x" size={18} color={theme.client.colors.mutedForeground} />
            </TouchableOpacity>
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {error ? (
        <View style={[styles.fieldShell, styles.fieldShellErrorFixed]}>
          <TextInput
            {...props}
            style={[styles.fieldInput, style]}
            placeholderTextColor={theme.colors.neutral[5]}
            value={value}
            secureTextEntry={effectiveSecure}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {showPwToggle ? (
            <TouchableOpacity
              onPress={() => setHidden((h) => !h)}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={hidden ? 'Показать пароль' : 'Скрыть пароль'}
              style={styles.toggleHit}
            >
              <Icon name={hidden ? 'eye' : 'eye-off'} size={20} color={theme.colors.neutral[5]} />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <Animated.View style={[styles.fieldShell, defaultWrapAnimatedStyle]}>
          <TextInput
            {...props}
            style={[styles.fieldInput, style]}
            placeholderTextColor={theme.colors.neutral[5]}
            value={value}
            secureTextEntry={effectiveSecure}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {showPwToggle ? (
            <TouchableOpacity
              onPress={() => setHidden((h) => !h)}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={hidden ? 'Показать пароль' : 'Скрыть пароль'}
              style={styles.toggleHit}
            >
              <Icon name={hidden ? 'eye' : 'eye-off'} size={20} color={theme.colors.neutral[5]} />
            </TouchableOpacity>
          ) : null}
        </Animated.View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: theme.spacing[4],
  },
  label: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
    marginBottom: theme.spacing[1],
    fontWeight: '400',
  },
  fieldShell: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: INPUT_RADIUS,
    backgroundColor: theme.colors.neutral.white,
    paddingHorizontal: theme.spacing[4],
    minHeight: 48,
  },
  fieldShellErrorFixed: {
    borderColor: theme.colors.status.error,
  },
  fieldInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[5],
    color: theme.colors.neutral[1],
    paddingVertical: theme.spacing[3],
    paddingRight: theme.spacing[2],
  },
  toggleHit: {
    padding: theme.spacing[1],
  },
  errorText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.status.error,
    marginTop: theme.spacing[1],
  },
  pillWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    height: 44,
    paddingHorizontal: theme.spacing[4],
    backgroundColor: theme.client.colors.secondary,
    borderRadius: theme.client.radius.pill,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillWrapHeaderSearch: {
    height: theme.client.chrome.headerBarHeight,
    borderRadius: theme.spacing[5],
    backgroundColor: theme.colors.neutral[9],
    borderColor: theme.colors.neutral[8],
  },
  pillWrapError: {
    borderColor: theme.colors.status.error,
  },
  pillInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.client.colors.foreground,
    paddingVertical: 0,
  },
});
