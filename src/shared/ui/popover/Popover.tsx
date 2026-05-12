import React, { ReactNode, useCallback, useRef, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  View,
  ViewStyle,
  findNodeHandle,
} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { styles } from './styles';

export interface PopoverRenderProps {
  close: () => void;
}

export interface PopoverProps {
  trigger: (api: { open: () => void; isOpen: boolean }) => ReactNode;
  children: (api: PopoverRenderProps) => ReactNode;
  align?: 'start' | 'end';
  width?: number;
  offset?: number;
}

interface AnchorRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    pressBehavior="close"
  />
);

const PopoverNative = ({ trigger, children }: PopoverProps) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const open = useCallback(() => sheetRef.current?.present(), []);
  const close = useCallback(() => sheetRef.current?.dismiss(), []);

  return (
    <View>
      {trigger({ open, isOpen: false })}
      <BottomSheetModal
        ref={sheetRef}
        enableDynamicSizing
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetHandle}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.sheetContent}>
          {children({ close })}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const PopoverWeb = ({
  trigger,
  children,
  align = 'end',
  width = 320,
  offset = 8,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  const triggerRef = useRef<View | null>(null);

  const open = useCallback(() => {
    const node = triggerRef.current;
    if (!node) return;
    const handle = findNodeHandle(node);
    if (handle == null) {
      setIsOpen(true);
      return;
    }
    node.measureInWindow((x, y, w, h) => {
      setAnchor({ top: y, left: x, width: w, height: h });
      setIsOpen(true);
    });
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const panelStyle: ViewStyle | null = anchor
    ? {
        position: 'absolute',
        top: anchor.top + anchor.height + offset,
        left:
          align === 'end'
            ? Math.max(anchor.left + anchor.width - width, 8)
            : anchor.left,
        width,
      }
    : null;

  return (
    <View ref={triggerRef} collapsable={false}>
      {trigger({ open, isOpen })}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={styles.backdrop} onPress={close} />
        {panelStyle ? (
          <View style={[styles.panel, panelStyle]} pointerEvents="box-none">
            <View style={styles.panelInner}>{children({ close })}</View>
          </View>
        ) : null}
      </Modal>
    </View>
  );
};

export const Popover = (props: PopoverProps) =>
  Platform.OS === 'web' ? <PopoverWeb {...props} /> : <PopoverNative {...props} />;
