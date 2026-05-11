import React from 'react';
import { ScreenContainer } from '../../shared/ui/layout';
import { TutorialContent } from '../../widgets/tutorial/TutorialContent';

interface TutorialScreenProps {
  onComplete: () => void;
}

export function TutorialScreen({ onComplete }: TutorialScreenProps) {
  return (
    <ScreenContainer>
      <TutorialContent onComplete={onComplete} />
    </ScreenContainer>
  );
}
