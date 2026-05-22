import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { theme } from '../../config/theme';
import { useBreakpoint } from '../../lib/responsive';
import { styles } from './styles';

export type ScreenMaxWidth = number | 'container' | 'full';

export interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  keyboardAware?: boolean;
  maxWidth?: ScreenMaxWidth;
  /** Rendered after children inside the scroll area (e.g. site footer on web). */
  footer?: ReactNode;
}

function resolveMaxWidth(
  maxWidth: ScreenMaxWidth | undefined,
  isWebDesktop: boolean,
): number | undefined {
  if (maxWidth === 'full') return undefined;
  if (typeof maxWidth === 'number') return maxWidth;
  if (maxWidth === 'container') return theme.layout.containerMaxWidth;
  return isWebDesktop ? theme.layout.containerMaxWidth : undefined;
}

export function Screen({
  children,
  scroll = false,
  contentStyle,
  edges = ['top', 'left', 'right'],
  keyboardAware = false,
  maxWidth,
  footer,
}: ScreenProps) {
  const { isWebDesktop } = useBreakpoint();
  const constrainedWidth = resolveMaxWidth(maxWidth, isWebDesktop);
  const constraintStyle: ViewStyle | undefined = constrainedWidth
    ? { maxWidth: constrainedWidth }
    : undefined;

  const inner = scroll ? (
    <ScrollView
      style={styles.scrollOuter}
      contentContainerStyle={[
        styles.scrollContent,
        styles.centered,
        footer ? styles.scrollContentWithFooter : null,
        !footer ? constraintStyle : null,
        !footer ? contentStyle : null,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {footer ? (
        <View style={[styles.scrollMain, constraintStyle, contentStyle]}>{children}</View>
      ) : (
        children
      )}
      {footer}
    </ScrollView>
  ) : (
    <View style={[styles.staticContent, styles.centered, constraintStyle, contentStyle]}>
      {children}
    </View>
  );

  const body = keyboardAware ? (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {inner}
    </KeyboardAvoidingView>
  ) : (
    inner
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      {body}
    </SafeAreaView>
  );
}
