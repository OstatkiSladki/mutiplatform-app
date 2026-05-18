import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../config/theme';

export const IosStatusBarChrome = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const timeLabel = format(now, 'HH:mm');
  const fg = theme.colors.neutral.black;

  return (
    <View style={styles.row}>
      <Text style={styles.time} accessibilityRole="text">
        {timeLabel}
      </Text>
      <View style={styles.icons}>
        <MaterialCommunityIcons name="signal-cellular-3" size={17} color={fg} />
        <MaterialCommunityIcons name="wifi" size={17} color={fg} />
        <MaterialCommunityIcons name="battery" size={20} color={fg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[5],
    paddingBottom: theme.spacing[2],
  },
  time: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[6],
    fontWeight: '600',
    color: theme.colors.neutral.black,
    letterSpacing: theme.typography.letterSpacing[0],
    lineHeight: theme.typography.fontSizes[6],
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
});
