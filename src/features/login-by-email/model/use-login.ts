import { useState } from 'react';
import { LoginFormValues } from './login-schema';

export const useLogin = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  // In the future this will use TanStack Query and an API entity call.
  // For now, it's just a placeholder as requested.
  const login = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      // Simulate API verification
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSuccess?.();
    } catch (error) {
      console.error('Login error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
};
