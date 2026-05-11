import React from 'react';
import { HStack } from '@/shared/ui/layout';
import { Text } from '@/shared/ui/text';
import { theme } from '@/shared/config/theme';

export const SplashBrandText = () => {
  return (
    <HStack alignItems="center" gap={0} justifyContent="center">
      <Text 
        variant="title" 
        weight="regular" 
        color={theme.colors.neutral[5]}
      >
        ОСТАТКИ
      </Text>
      <Text 
        variant="title" 
        weight="bold" 
        color={theme.colors.primary[100]}
      >
        СЛАДКИ
      </Text>
    </HStack>
  );
};
