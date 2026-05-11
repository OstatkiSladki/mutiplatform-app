import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../shared/ui/button';
import { useCompleteOnboarding } from '../model/use-complete-onboarding';

interface CompleteOnboardingButtonProps {
  /**
   * Callback fired when the onboarding is successfully marked as complete.
   * This is where the orchestrator (process) handles navigation to the main app flow.
   */
  onCompleted: () => void;
}

export const CompleteOnboardingButton = ({ onCompleted }: CompleteOnboardingButtonProps) => {
  const { completeOnboarding, isLoading } = useCompleteOnboarding(onCompleted);

  return (
    <View style={styles.container}>
      <Button
        title="Начать" // "Start" translated to Russian as required by localization rules
        size="large"
        variant="primary"
        isLoading={isLoading}
        disabled={isLoading}
        onPress={completeOnboarding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
  },
});
