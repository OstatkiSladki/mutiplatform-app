import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../shared/ui/input';
import { Icon } from '../../../shared/ui/icon';
import { BookingCtaButton } from '../../../shared/ui/booking-cta-button';
import { theme } from '../../../shared/config/theme';
import { useUserAddressStore, type UserAddress } from '../../../entities/location';
import { forwardGeocode, reverseGeocode } from '../lib/yandex-geocode';
import { AddressPickerMap } from './AddressPickerMap.web';
import { styles } from './address-picker.styles';
import type { AddressPickerModalProps } from './AddressPickerModal';

export type { AddressPickerModalProps };

const DEFAULT_ZOOM = 15;
const GEOCODE_DEBOUNCE_MS = 280;

export const AddressPickerModal = ({ visible, onClose }: AddressPickerModalProps) => {
  const { t } = useTranslation('common');
  const saved = useUserAddressStore((s) => s.deliveryAddress);
  const setDeliveryAddress = useUserAddressStore((s) => s.setDeliveryAddress);

  const [query, setQuery] = useState(saved.address);
  const [coords, setCoords] = useState({ lon: saved.lon, lat: saved.lat });
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [isSaving, setIsSaving] = useState(false);
  const [pinFixed, setPinFixed] = useState(false);
  const geocodeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const geocodeSeqRef = useRef(0);

  useEffect(() => {
    if (!visible) return;
    setQuery(saved.address);
    setCoords({ lon: saved.lon, lat: saved.lat });
    setZoom(DEFAULT_ZOOM);
    setPinFixed(false);
  }, [visible, saved.address, saved.lat, saved.lon]);

  useEffect(
    () => () => {
      if (geocodeTimerRef.current) clearTimeout(geocodeTimerRef.current);
    },
    [],
  );

  const handleMapPick = useCallback((lon: number, lat: number, commit = false) => {
    if (!commit && pinFixed) return;

    if (geocodeTimerRef.current) clearTimeout(geocodeTimerRef.current);

    const runGeocode = async () => {
      const seq = ++geocodeSeqRef.current;
      const result = await reverseGeocode(lon, lat, { snapToHouse: commit });
      if (seq !== geocodeSeqRef.current || !result) return;

      setQuery(result.fullAddress);
      if (commit) {
        setCoords({ lon: result.lon, lat: result.lat });
      }
    };

    if (commit) {
      setPinFixed(true);
      void runGeocode();
      return;
    }

    geocodeTimerRef.current = setTimeout(runGeocode, GEOCODE_DEBOUNCE_MS);
  }, [pinFixed]);

  const handleAdd = useCallback(async () => {
    setIsSaving(true);
    try {
      let next: UserAddress = {
        address: query.trim() || saved.address,
        lon: coords.lon,
        lat: coords.lat,
      };

      const geocoded = await forwardGeocode(query);
      if (geocoded) {
        next = {
          address: geocoded.address,
          lon: geocoded.lon,
          lat: geocoded.lat,
        };
      } else {
        const snapped = await reverseGeocode(coords.lon, coords.lat, { snapToHouse: true });
        if (snapped) {
          next = {
            address: snapped.address,
            lon: snapped.lon,
            lat: snapped.lat,
          };
        }
      }

      setDeliveryAddress(next);
      onClose();
    } finally {
      setIsSaving(false);
    }
  }, [coords.lat, coords.lon, onClose, query, saved.address, setDeliveryAddress]);

  const stopBackdropClose =
    Platform.OS === 'web'
      ? ({
          // Pressable on the card blocks map pointer events on web; stop backdrop close only.
          onClick: (event: { stopPropagation: () => void }) => event.stopPropagation(),
        } as object)
      : { onStartShouldSetResponder: () => true };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.card} {...stopBackdropClose}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={t('cancel')}
          >
            <Icon name="x" size={24} color={theme.client.colors.mutedForeground} />
          </TouchableOpacity>

          <Text style={styles.title}>{t('header.addressModalTitle')}</Text>

          <View style={styles.inputRow}>
            <Input
              variant="pill"
              pillTone="addressModal"
              leadingIcon="search"
              value={query}
              onChangeText={setQuery}
              onClear={() => setQuery('')}
              placeholder={t('header.addressSearchPlaceholder')}
              containerStyle={styles.searchInput}
            />
            <BookingCtaButton
              title={t('header.addressAdd')}
              onPress={handleAdd}
              isLoading={isSaving}
              style={styles.addButton}
            />
          </View>

          {visible ? (
            <AddressPickerMap
              lon={coords.lon}
              lat={coords.lat}
              zoom={zoom}
              onCoordinatesChange={handleMapPick}
              onZoomChange={setZoom}
            />
          ) : null}
        </View>
      </Pressable>
    </Modal>
  );
};
