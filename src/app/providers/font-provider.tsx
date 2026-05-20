import React, { ReactNode, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
} from '@expo-google-fonts/source-sans-pro';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

interface FontProviderProps {
  children: ReactNode;
}

export function FontProvider({ children }: FontProviderProps) {
  const [loaded] = useFonts({
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
    ...Feather.font,
    ...FontAwesome.font,
    ...MaterialCommunityIcons.font,
  });

  // On web, useFonts resolves before the browser has actually applied the
  // FontFace. On mobile Safari/Chrome that gap makes icon glyphs render with
  // the system fallback and never refresh. Wait for document.fonts.ready so
  // every @font-face registered above is committed before first paint.
  const [webFontsReady, setWebFontsReady] = useState(Platform.OS !== 'web');

  useEffect(() => {
    if (!loaded || Platform.OS !== 'web' || webFontsReady) return;
    if (typeof document === 'undefined' || !('fonts' in document)) {
      setWebFontsReady(true);
      return;
    }
    let cancelled = false;
    const fallback = setTimeout(() => {
      if (!cancelled) setWebFontsReady(true);
    }, 3000);
    document.fonts.ready.then(() => {
      if (cancelled) return;
      clearTimeout(fallback);
      setWebFontsReady(true);
    });
    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [loaded, webFontsReady]);

  if (!loaded || !webFontsReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <>{children}</>;
}
