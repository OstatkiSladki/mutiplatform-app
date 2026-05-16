import React from 'react';
import { StyleSheet } from 'react-native';
import { Yamap, Marker } from 'react-native-yamap-plus';
import type { MapWidgetProps } from './types';
import { VenuePin } from './VenuePin.mobile';

export const MapWidget = ({
  venues = [],
  style,
  initialCenter,
  onVenuePress,
}: MapWidgetProps) => {
  const lat = initialCenter?.lat ?? 47.2357;
  const lon = initialCenter?.lon ?? 39.7015;

  return (
    <Yamap
      initialRegion={{ lat, lon, zoom: 13, azimuth: 0 }}
      style={[styles.map, style]}
    >
      {venues
        .filter((v) => v.latitude && v.longitude)
        .map((venue) => (
          <Marker
            key={venue.id}
            point={{
              lat: parseFloat(venue.latitude!),
              lon: parseFloat(venue.longitude!),
            }}
            anchor={{ x: 0.5, y: 1 }}
            onPress={() => onVenuePress?.(venue)}
          >
            <VenuePin />
          </Marker>
        ))}
    </Yamap>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    minHeight: 260,
  },
});
