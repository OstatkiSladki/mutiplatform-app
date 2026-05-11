import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../../../shared/ui/button';
import { Text } from '../../../shared/ui/text';
import { theme } from '../../../shared/config/theme';
import { useRequestLocation } from '../model/use-request-location';

interface RequestLocationButtonProps {
  /**
   * Callback fired when location permission is successfully granted.
   * Useful for triggering navigation to the next screen.
   */
  onLocationGranted?: () => void;
  /**
   * Callback fired when permission is denied or fails.
   */
  onLocationError?: (error: Error) => void;
}

export const RequestLocationButton = ({
  onLocationGranted,
  onLocationError,
}: RequestLocationButtonProps) => {
  const { requestPermission, isLoading, error } = useRequestLocation(
    onLocationGranted,
    onLocationError
  );

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.errorText}>
          {error.message}
        </Text>
      )}
      <Button
        title="Allow Location Access"
        onPress={requestPermission}
        isLoading={isLoading}
        disabled={isLoading}
        size="large"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    color: theme.colors.status.error,
    marginBottom: 8,
    textAlign: 'center',
  },
});
