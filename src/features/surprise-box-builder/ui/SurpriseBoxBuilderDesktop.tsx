import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Chip } from '../../../shared/ui/chip';
import { Icon } from '../../../shared/ui/icon';
import { theme } from '../../../shared/config/theme';
import { clientTextF6Regular } from '../../../shared/config/theme/client-text-styles';
import type { UseSurpriseBoxBuilderResult } from '../model/use-surprise-box-builder';
import {
  ADDITION_KEYS,
  FILLING_KEYS,
  RESTRICTION_KEYS,
  TIME_SLOTS,
} from '../model/constants';

export interface SurpriseBoxBuilderDesktopProps {
  builder: UseSurpriseBoxBuilderResult;
}

const CHIP_H = 26;
const CHIP_FS = theme.typography.fontSizes[4];
const CHIP_LH = Math.round(CHIP_FS * (theme.typography.lineHeights.normal as number));

const chipShell = {
  height: CHIP_H,
  minHeight: CHIP_H,
  paddingHorizontal: theme.spacing[3],
  paddingVertical: 0,
  justifyContent: 'center' as const,
  borderWidth: 1,
  borderColor: 'transparent' as const,
  borderRadius: theme.radius.full,
} as const;

const chipShellInactive = {
  ...chipShell,
  backgroundColor: theme.colors.neutral[9],
};

const chipLabelBase = {
  fontSize: CHIP_FS,
  lineHeight: CHIP_LH,
  fontWeight: '400' as const,
};

const chipLabelInactive = {
  ...chipLabelBase,
  fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
  color: theme.colors.neutral[5],
};

const chipLabelActive = {
  ...chipLabelInactive,
  color: theme.colors.neutral.white,
};

const chipStyle = (active: boolean) => (active ? chipShell : chipShellInactive);
const chipLabelStyle = (active: boolean) => (active ? chipLabelActive : chipLabelInactive);

export const SurpriseBoxBuilderDesktop = ({
  builder,
}: SurpriseBoxBuilderDesktopProps) => {
  const { t } = useTranslation('catalog');
  const { config, setFilling, setRestriction, setAddition, setTime } = builder;
  const [timeOpen, setTimeOpen] = useState(false);
  const chipRowGap = theme.spacing[2];

  return (
    <View style={styles.root}>
      <View style={styles.group}>
        <Text style={styles.groupLabel}>{t('surpriseBox.fillingLabel')}</Text>
        <View style={[styles.chipsRow, { gap: chipRowGap }]}>
          {FILLING_KEYS.map((f) => {
            const active = config.filling === f;
            return (
              <Chip
                key={f}
                label={t(`surpriseBox.fillings.${f}`)}
                active={active}
                onPress={() => setFilling(f)}
                style={chipStyle(active)}
                labelStyle={chipLabelStyle(active)}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>{t('surpriseBox.restrictionLabel')}</Text>
        <View style={[styles.chipsRow, { gap: chipRowGap }]}>
          {RESTRICTION_KEYS.map((r) => {
            const active = config.restriction === r;
            return (
              <Chip
                key={r}
                label={t(`surpriseBox.restrictions.${r}`)}
                active={active}
                onPress={() => setRestriction(r)}
                style={chipStyle(active)}
                labelStyle={chipLabelStyle(active)}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>{t('surpriseBox.additionLabel')}</Text>
        <View style={[styles.chipsRow, { gap: chipRowGap }]}>
          {ADDITION_KEYS.map((a) => {
            const active = config.addition === a;
            return (
              <Chip
                key={a}
                label={t(`surpriseBox.additions.${a}`)}
                active={active}
                onPress={() => setAddition(a)}
                style={chipStyle(active)}
                labelStyle={chipLabelStyle(active)}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>{t('surpriseBox.timeLabel')}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setTimeOpen(true)}
          style={(state) => {
            const { pressed } = state;
            const hovered =
              Platform.OS === 'web' &&
              'hovered' in state &&
              Boolean((state as { hovered?: boolean }).hovered);
            return [
              styles.timeTrigger,
              hovered ? styles.timeTriggerHovered : null,
              pressed ? styles.timeTriggerPressed : null,
            ];
          }}
        >
          <Text style={styles.timeTriggerText}>{config.time}</Text>
          <Icon name="chevron-down" size={20} color={theme.colors.neutral[5]} />
        </Pressable>
      </View>

      <Modal transparent visible={timeOpen} animationType="fade" onRequestClose={() => setTimeOpen(false)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.modalBackdropHit} onPress={() => setTimeOpen(false)} />
          <View style={styles.modalSheet}>
            <ScrollView>
              {TIME_SLOTS.map((slot) => (
                <Pressable
                  key={slot}
                  style={styles.modalRow}
                  onPress={() => {
                    setTime(slot);
                    setTimeOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalRowText,
                      config.time === slot && styles.modalRowTextActive,
                    ]}
                  >
                    {slot}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: theme.spacing[3],
    flexGrow: 1,
    minHeight: 0,
    minWidth: 0,
    overflow: 'hidden',
  },
  group: {
    gap: theme.spacing[3],
    minWidth: 0,
  },
  groupLabel: {
    ...clientTextF6Regular,
    color: theme.colors.neutral[1],
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  timeTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: theme.spacing[8],
    minHeight: theme.spacing[8],
    width: '100%',
    maxWidth: 220,
    paddingHorizontal: theme.spacing[4],
    borderRadius: theme.client.radius.surpriseBoxDesktopDropdown,
    backgroundColor: theme.colors.neutral[9],
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'pointer',
          transitionProperty: 'opacity, background-color',
          transitionDuration: '0.2s',
        } as Record<string, unknown>)
      : {}),
  },
  timeTriggerHovered: {
    opacity: 0.92,
  },
  timeTriggerPressed: {
    opacity: 0.88,
  },
  timeTriggerText: {
    ...clientTextF6Regular,
    color: theme.colors.neutral[1],
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a151233',
  },
  modalBackdropHit: {
    ...StyleSheet.absoluteFillObject,
  },
  modalSheet: {
    width: '100%',
    maxWidth: 320,
    maxHeight: 360,
    marginHorizontal: theme.spacing[6],
    borderRadius: theme.spacing[5],
    backgroundColor: theme.colors.neutral.white,
    ...theme.client.shadows.sectionSoft,
    zIndex: 1,
  },
  modalRow: {
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[4],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.neutral[8],
  },
  modalRowText: {
    ...clientTextF6Regular,
    color: theme.colors.neutral[1],
  },
  modalRowTextActive: {
    color: theme.colors.primary[100],
    fontFamily: theme.typography.fontFamilies.sourceSansProBold,
    fontWeight: '400',
  },
});
