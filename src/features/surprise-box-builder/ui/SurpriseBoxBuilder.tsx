import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Chip } from '../../../shared/ui/chip';
import { theme } from '../../../shared/config/theme';
import {
  ADDITION_KEYS,
  FILLING_KEYS,
  RESTRICTION_KEYS,
  SIZE_KEYS,
  TIME_SLOTS,
} from '../model/constants';
import type { UseSurpriseBoxBuilderResult } from '../model/use-surprise-box-builder';
import { styles } from './styles';

export interface SurpriseBoxBuilderProps {
  builder: UseSurpriseBoxBuilderResult;
}

export const SurpriseBoxBuilder = ({ builder }: SurpriseBoxBuilderProps) => {
  const { t } = useTranslation('catalog');
  const { config, setSize, setFilling, setRestriction, setAddition, setTime } =
    builder;

  return (
    <View style={{ gap: theme.spacing[3] }}>
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
        <Text style={styles.groupLabel}>{t('surpriseBox.fillingLabel')}</Text>
        <View style={styles.chipsRow}>
          {FILLING_KEYS.map((f) => (
            <Chip
              key={f}
              label={t(`surpriseBox.fillings.${f}`)}
              active={config.filling === f}
              onPress={() => setFilling(f)}
            />
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>{t('surpriseBox.restrictionLabel')}</Text>
        <View style={styles.chipsRow}>
          {RESTRICTION_KEYS.map((r) => (
            <Chip
              key={r}
              label={t(`surpriseBox.restrictions.${r}`)}
              active={config.restriction === r}
              onPress={() => setRestriction(r)}
            />
          ))}
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>{t('surpriseBox.additionLabel')}</Text>
        <View style={styles.chipsRow}>
          {ADDITION_KEYS.map((a) => (
            <Chip
              key={a}
              label={t(`surpriseBox.additions.${a}`)}
              active={config.addition === a}
              onPress={() => setAddition(a)}
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
