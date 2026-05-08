import React, { forwardRef, ReactNode } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { styles } from './styles';

export interface AppBottomSheetProps {
  snapPoints?: (string | number)[];
  children: ReactNode;
  onDismiss?: () => void;
  enableDynamicSizing?: boolean;
}

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    pressBehavior="close"
  />
);

export const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  ({ snapPoints, children, onDismiss, enableDynamicSizing = true }, ref) => (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enableDynamicSizing={enableDynamicSizing}
      onDismiss={onDismiss}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={renderBackdrop}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
    >
      <BottomSheetView style={styles.content}>{children}</BottomSheetView>
    </BottomSheetModal>
  ),
);

AppBottomSheet.displayName = 'AppBottomSheet';

export type AppBottomSheetRef = BottomSheetModal;
