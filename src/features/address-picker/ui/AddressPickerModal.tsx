export interface AddressPickerModalProps {
  visible: boolean;
  onClose: () => void;
}

/** Native stub — address picker is web-only for now. */
export const AddressPickerModal = (_props: AddressPickerModalProps) => null;
