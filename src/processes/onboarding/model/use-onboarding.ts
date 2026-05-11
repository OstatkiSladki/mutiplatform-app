import { create } from 'zustand';

interface OnboardingState {
  hasCompletedTutorial: boolean;
  completeTutorial: () => void;
}

export const useOnboarding = create<OnboardingState>((set) => ({
  hasCompletedTutorial: false,
  completeTutorial: () => set({ hasCompletedTutorial: true }),
}));
