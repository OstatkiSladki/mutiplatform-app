import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/config/theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.neutral[9],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    gap: theme.spacing[3],
  },
  headerSlot: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.neutral.white,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamilies.sourceSansProBold, fontWeight: '400',
    fontSize: theme.typography.fontSizes[7],
    color: theme.colors.neutral[1],
  },
  scroll: {
    padding: theme.spacing[4],
  },
  card: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.radius.xl,
    padding: theme.spacing[5],
    gap: theme.spacing[4],
    ...theme.shadows.tight[2],
  },
  genderRow: {
    flexDirection: 'row',
    gap: theme.spacing[2],
  },
  genderOption: {
    flex: 1,
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.neutral[8],
    backgroundColor: theme.colors.neutral.white,
    alignItems: 'center',
  },
  genderOptionActive: {
    borderColor: theme.colors.primary[100],
    backgroundColor: theme.colors.primary[10],
  },
  genderText: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[4],
    color: theme.colors.neutral[2],
  },
  genderTextActive: {
    color: theme.colors.primary[100],
    fontWeight: '600',
  },
  fieldLabel: {
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontSize: theme.typography.fontSizes[3],
    color: theme.colors.neutral[3],
  },
});
