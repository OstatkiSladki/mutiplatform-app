import React, { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, ViewProps, TextStyle } from 'react-native';
import { theme } from '../../config/theme';

const b = theme.business;

interface BTableProps extends ViewProps {
  children: ReactNode;
}

export interface BTableCellProps extends ViewProps {
  header?: boolean;
  flex?: number;
  children: ReactNode;
}

export const BTable = ({ style, children, ...props }: BTableProps) => (
  <View style={[styles.wrapper, style]} {...props}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.table}>{children}</View>
    </ScrollView>
  </View>
);

export const BTableHeader = ({ style, children, ...props }: BTableProps) => (
  <View style={[styles.headerRow, style]} {...props}>
    {children}
  </View>
);

export const BTableRow = ({ style, children, ...props }: BTableProps) => (
  <View style={[styles.row, style]} {...props}>
    {children}
  </View>
);

export const BTableCell = ({ header = false, flex = 1, style, children, ...props }: BTableCellProps) => {
  const textStyle: TextStyle = header ? styles.cellHeader : styles.cellBody;
  return (
    <View style={[styles.cellWrapper, { flex }, style]} {...props}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={textStyle}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: b.radius.lg,
    borderWidth: 1,
    borderColor: b.colors.border,
    overflow: 'hidden',
    backgroundColor: b.colors.card,
  },
  table: {
    minWidth: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: b.colors.muted,
    borderBottomWidth: 1,
    borderBottomColor: b.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    columnGap: 12,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: b.colors.border,
    paddingVertical: 14,
    paddingHorizontal: 16,
    columnGap: 12,
    alignItems: 'center',
  },
  cellWrapper: {
    minWidth: 80,
    justifyContent: 'center',
  },
  cellHeader: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 12,
    fontWeight: '400',
    color: b.colors.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cellBody: {
    fontFamily: b.typography.fontFamily,
    fontSize: 14,
    color: b.colors.foreground,
  },
});
