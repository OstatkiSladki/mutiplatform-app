import React, { ReactNode, useEffect } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Platform, ViewProps } from 'react-native';
import { theme } from '../../config/theme';

const b = theme.business;

export interface BDialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  closeLabel?: string;
  children: ReactNode;
  footer?: ReactNode;
}

interface BDialogSectionProps extends ViewProps {
  children: ReactNode;
}

export const BDialogHeader = ({ style, children, ...props }: BDialogSectionProps) => (
  <View style={[styles.header, style]} {...props}>
    {children}
  </View>
);

export const BDialogContent = ({ style, children, ...props }: BDialogSectionProps) => (
  <View style={[styles.content, style]} {...props}>
    {children}
  </View>
);

export const BDialogFooter = ({ style, children, ...props }: BDialogSectionProps) => (
  <View style={[styles.footer, style]} {...props}>
    {children}
  </View>
);

export const BDialog = ({ visible, onClose, title, closeLabel = 'Закрыть', children, footer }: BDialogProps) => {
  useEffect(() => {
    if (Platform.OS !== 'web' || !visible) return;
    const handler = (e: Event) => {
      if ((e as KeyboardEvent).key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={closeLabel}
        />
        <View
          style={styles.panel}
          accessibilityRole={Platform.OS === 'web' ? 'dialog' : 'none'}
          accessibilityViewIsModal
        >
          {title && (
            <View style={styles.header}>
              <Text style={styles.titleText}>{title}</Text>
              <Pressable onPress={onClose} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel={closeLabel}>
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>
            </View>
          )}
          <View style={styles.content}>{children}</View>
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: b.colors.scrim,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  panel: {
    backgroundColor: b.colors.card,
    borderRadius: b.radius.xl,
    width: '100%',
    maxWidth: 640,
    maxHeight: '92%',
    ...b.shadows.card,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: b.colors.border,
  },
  titleText: {
    fontFamily: b.typography.fontFamily,
    fontSize: b.typography.h3.fontSize,
    fontWeight: b.typography.h3.fontWeight,
    color: b.colors.foreground,
    flex: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: b.radius.sm,
  },
  closeBtnText: {
    fontSize: 16,
    color: b.colors.mutedForeground,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    columnGap: 12,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: b.colors.border,
  },
});
