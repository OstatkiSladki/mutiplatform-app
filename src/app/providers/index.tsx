import React, { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';
import { initMaps } from './init-maps';
import { initWebViewport } from '../../shared/lib/init-web-viewport';
import { FontProvider } from './font-provider';

initMaps();
initWebViewport();

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <QueryProvider>
        <ThemeProvider>
          <FontProvider>
            <AuthProvider>
              <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
            </AuthProvider>
          </FontProvider>
        </ThemeProvider>
      </QueryProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);
