import React from 'react';
import { StyleSheet } from 'react-native';
import { VStack, Spacer, Text, Button } from '@/shared/ui';
import { theme } from '@/shared/config/theme';

interface TutorialContentProps {
  onComplete: () => void;
}

export function TutorialContent({ onComplete }: TutorialContentProps) {
  return (
    <VStack style={styles.container}>
      <Spacer />
      <Text variant="title">Добро пожаловать!</Text>
      <Spacer size={4} />
      <Text variant="body" color="secondary">
        Узнайте, как пользоваться нашим приложением и находить лучшие предложения.
      </Text>
      <Spacer />
      <Button onPress={onComplete} title="Начать" />
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
