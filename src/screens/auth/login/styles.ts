import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

/** Отступ между полем email и блоком пароля (после инпута). */
const GAP_AFTER_EMAIL = theme.spacing[4];

export const styles = StyleSheet.create({
  submit: {
    marginTop: theme.spacing[5],
    alignSelf: 'stretch',
    width: '100%',
    borderRadius: theme.spacing[2],
  },
  inputEmail: {
    marginBottom: GAP_AFTER_EMAIL,
  },
  inputPassword: {
    marginBottom: theme.spacing[4],
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing[4],
    marginBottom: theme.spacing[4],
  },
  checkboxField: {
    flex: 1,
    marginBottom: 0,
  },
  forgotLink: {
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * 1.4,
    fontWeight: '400',
    color: theme.colors.primary[100],
  },
  registerRow: {
    marginTop: theme.spacing[7],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: theme.spacing[3],
  },
  registerPrompt: {
    flex: 1,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * 1.4,
    fontWeight: '400',
    color: theme.colors.neutral[1],
  },
  registerLink: {
    flexShrink: 0,
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[5],
    lineHeight: theme.typography.fontSizes[5] * 1.4,
    fontWeight: '700',
    color: theme.colors.primary[100],
  },
  orSeparator: {
    marginTop: theme.spacing[6],
    marginBottom: theme.spacing[5],
    fontFamily: theme.client.typography.fontFamily,
    fontSize: theme.typography.fontSizes[4],
    fontWeight: '400',
    color: theme.colors.neutral[5],
    textAlign: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing[6],
    marginTop: theme.spacing[2],
  },
  /** Обводка круга: достаточный тач-таргет; логотип 40×40. */
  socialHit: {
    width: theme.spacing[9],
    height: theme.spacing[9],
    borderRadius: theme.client.radius.pill,
    backgroundColor: theme.colors.neutral.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
  },
  socialHitPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
});
