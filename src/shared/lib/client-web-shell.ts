import { theme } from '../config/theme';

export function getClientWebShellPadding(isAtLeast: (breakpoint: 'md' | 'lg' | 'xl') => boolean): number {
  return isAtLeast('lg') ? theme.spacing[7] : theme.spacing[6];
}

export const clientWebShellLayout = {
  shellMaxWidth: theme.layout.clientShellMaxWidth,
  columnMaxWidth: theme.layout.clientColumnMaxWidth,
} as const;
