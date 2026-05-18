import type { ReactNode } from 'react';

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Mobile: показывает общий BackButton (закрыть auth modal). */
  onBackPress?: () => void;
  footer?: {
    text: string;
    linkLabel: string;
    onLinkPress: () => void;
  };
}
