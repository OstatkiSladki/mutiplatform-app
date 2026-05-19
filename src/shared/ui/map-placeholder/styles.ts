import { StyleSheet } from 'react-native';
import { theme } from '../../config/theme';

const LABEL_FS = theme.typography.fontSizes[5];

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.neutral[9],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  /** Fills split-pane map shell on desktop (no fixed aspect ratio). */
  containerFill: {
    width: '100%',
    flex: 1,
    minHeight: 200,
    alignSelf: 'stretch',
    borderRadius: theme.radius.none,
    backgroundColor: theme.colors.neutral[9],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  markersLayer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  pin: {
    position: 'absolute',
  },
  pin1: {
    top: '26%',
    left: '24%',
  },
  pin2: {
    top: '42%',
    right: '28%',
  },
  pin3: {
    bottom: '30%',
    left: '38%',
  },
  centerBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Paragraph Base Regular */
  label: {
    marginTop: theme.spacing[2],
    fontFamily: theme.typography.fontFamilies.sourceSansProRegular,
    fontWeight: '400',
    fontSize: LABEL_FS,
    lineHeight: LABEL_FS,
    color: theme.colors.neutral[5],
  },
});
