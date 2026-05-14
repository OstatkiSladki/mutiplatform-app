import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { theme } from '../../config/theme';

const b = theme.business;

interface BCardProps extends ViewProps {
  children: ReactNode;
}

export const BCard = ({ style, children, ...props }: BCardProps) => (
  <View style={[styles.card, style]} {...props}>
    {children}
  </View>
);

export const BCardHeader = ({ style, children, ...props }: BCardProps) => (
  <View style={[styles.header, style]} {...props}>
    {children}
  </View>
);

export const BCardContent = ({ style, children, ...props }: BCardProps) => (
  <View style={[styles.content, style]} {...props}>
    {children}
  </View>
);

export const BCardFooter = ({ style, children, ...props }: BCardProps) => (
  <View style={[styles.footer, style]} {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: b.colors.card,
    borderRadius: b.radius.card,
    ...b.shadows.card,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    rowGap: 4,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
});
