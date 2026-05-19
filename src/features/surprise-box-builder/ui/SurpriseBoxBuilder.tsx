import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Chip } from '../../../shared/ui/chip';
import { useBreakpoint } from '../../../shared/lib/responsive';
import {
  ADDITION_KEYS,
  FILLING_KEYS,
  RESTRICTION_KEYS,
  SIZE_KEYS,
  TIME_SLOTS,
} from '../model/constants';
import type { UseSurpriseBoxBuilderResult } from '../model/use-surprise-box-builder';
import { styles } from './styles';
import { surpriseBoxBuilderWebStyles } from './surprise-box-builder-web.styles';

export interface SurpriseBoxBuilderProps {
  builder: UseSurpriseBoxBuilderResult;
}

export const SurpriseBoxBuilder = ({ builder }: SurpriseBoxBuilderProps) => {
  const { t } = useTranslation('catalog');
  const { isWeb, isAtLeast } = useBreakpoint();
  const wideWeb = isWeb && isAtLeast('wide');
  const webChipLabel = wideWeb ? surpriseBoxBuilderWebStyles.chipLabelActionSmall : undefined;
  const webGroupLabelStyle = wideWeb ? surpriseBoxBuilderWebStyles.groupLabelF6 : undefined;
  const { config, setSize, setFilling, setRestriction, setAddition, setTime } =
    builder;

  return (
    <View style={styles.root}>
      <View style={styles.sizeRow}>
        <Text style={styles.groupLabel}>{t('surpriseBox.sizeLabel')}</Text>
        {SIZE_KEYS.map((s) => (
          <Chip
            key={s}
            label={s}
            active={config.size === s}
            onPress={() => setSize(s)}
          />
        ))}
        <Text style={styles.sizeHint} numberOfLines={1}>
          {t(`surpriseBox.sizeHint.${config.size}`)}
        </Text>
      </View>

      <View style={styles.group}>
        <Text style={[styles.groupLabel, webGroupLabelStyle]}>{t('surpriseBox.fillingLabel')}</Text>
        <View style={styles.chipsRow}>
          {FILLING_KEYS.map((f) => (
            <Chip
              key={f}
              label={t(`surpriseBox.fillings.${f}`)}
              active={config.filling === f}
              onPress={() => setFilling(f)}
              labelStyle={webChipLabel}
            />
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={[styles.groupLabel, webGroupLabelStyle]}>{t('surpriseBox.restrictionLabel')}</Text>
        <View style={styles.chipsRow}>
          {RESTRICTION_KEYS.map((r) => (
            <Chip
              key={r}
              label={t(`surpriseBox.restrictions.${r}`)}
              active={config.restriction === r}
              onPress={() => setRestriction(r)}
              labelStyle={webChipLabel}
            />
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={[styles.groupLabel, webGroupLabelStyle]}>{t('surpriseBox.additionLabel')}</Text>
        <View style={styles.chipsRow}>
          {ADDITION_KEYS.map((a) => (
            <Chip
              key={a}
              label={t(`surpriseBox.additions.${a}`)}
              active={config.addition === a}
              onPress={() => setAddition(a)}
              labelStyle={webChipLabel}
            />
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>{t('surpriseBox.timeLabel')}</Text>
        <View style={styles.chipsRow}>
          {TIME_SLOTS.map((time) => (
            <Chip
              key={time}
              label={time}
              active={config.time === time}
              onPress={() => setTime(time)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
