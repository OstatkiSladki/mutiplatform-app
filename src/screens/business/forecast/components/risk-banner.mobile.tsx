import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Icon } from '../../../../shared/ui/icon';
import { theme } from '../../../../shared/config/theme';

const b = theme.business;

export interface RiskBannerProps {
  visible: boolean;
  title: string;
  description: string;
  cta: string;
  onPress: () => void;
}

export const RiskBanner = ({ visible, title, description, cta, onPress }: RiskBannerProps) => {
  if (!visible) return null;

  return (
    <View style={styles.banner}>
      <View style={styles.left}>
        <View style={styles.iconTile}>
          <Icon name="alert-octagon" size={22} color="#b8520a" />
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <Pressable style={styles.cta} onPress={onPress} accessibilityRole="button" accessibilityLabel={cta}>
        <Text style={styles.ctaLabel}>{cta}</Text>
        <Icon name="chevron-right" size={16} color={b.colors.primaryForeground} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 12,
    columnGap: 16,
    backgroundColor: '#fff5dc',
    borderColor: '#f3d77a',
    borderWidth: 1,
    borderRadius: b.radius.card,
    padding: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 16,
    flex: 1,
    minWidth: 320,
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: b.radius.md,
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
  },
  title: {
    fontFamily: b.typography.fontFamilyBold,
    fontSize: 18,
    fontWeight: '400',
    color: b.colors.foreground,
  },
  description: {
    fontFamily: b.typography.fontFamily,
    fontSize: 13,
    color: b.colors.mutedForeground,
    marginTop: 4,
    lineHeight: 18,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    backgroundColor: b.colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: b.radius.pill,
    ...b.shadows.glow,
  },
  ctaLabel: {
    fontFamily: b.typography.fontFamilySemiBold,
    fontSize: 14,
    fontWeight: '400',
    color: b.colors.primaryForeground,
  },
});
