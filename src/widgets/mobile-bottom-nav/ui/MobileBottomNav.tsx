import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context';
import type {
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import type {
  ClientTabsParamList,
  RootStackParamList,
} from '../../../navigation/types';
import { theme } from '../../../shared/config/theme';
import { useMobileLayout } from '../../../shared/lib/responsive';
import {
  MobileTabRouteIcon,
  type MobileTabRouteIconName,
} from '../../mobile-tab-route-icon';

/** Base bar height excluding the safe-area inset. */
export const MOBILE_BOTTOM_NAV_HEIGHT = 78;

/** Total bar height including the bottom safe-area inset. */
export const useMobileBottomNavHeight = (): number => {
  const insets = useSafeAreaInsets();
  return MOBILE_BOTTOM_NAV_HEIGHT + insets.bottom;
};

type Nav = NavigationContainerRef<RootStackParamList>;

interface MobileBottomNavProps {
  navigationRef: Nav;
  rootState: NavigationState | undefined;
}

const DESTINATIONS: readonly MobileTabRouteIconName[] = [
  'Home',
  'Nearby',
  'Catalog',
  'Cart',
];

type NavStateNode = {
  routes: { name: string; state?: unknown }[];
  index?: number;
};

/**
 * Walks the root navigation state. The bar is only shown while the `Client`
 * stack is the active root route; on Auth/Splash/Onboarding/Business it is
 * hidden. When ClientTabs is the focused client screen the active tab name is
 * returned for the highlight, otherwise null (a non-tab stack screen).
 */
const selectNav = (
  state: NavigationState | undefined,
): { onClient: boolean; focusedTab: MobileTabRouteIconName | null } => {
  const root = state as NavStateNode | undefined;
  const rootActive = root?.routes[root.index ?? 0];
  if (!rootActive || rootActive.name !== 'Client') {
    return { onClient: false, focusedTab: null };
  }

  const clientState = rootActive.state as NavStateNode | undefined;
  const clientActive = clientState?.routes[clientState.index ?? 0];
  if (!clientActive || clientActive.name !== 'ClientTabs' || !clientActive.state) {
    return { onClient: true, focusedTab: null };
  }

  const tabsState = clientActive.state as NavStateNode;
  const tabRoute = tabsState.routes[tabsState.index ?? 0]?.name ?? null;
  if (tabRoute && (DESTINATIONS as readonly string[]).includes(tabRoute)) {
    return { onClient: true, focusedTab: tabRoute as MobileTabRouteIconName };
  }
  return { onClient: true, focusedTab: null };
};

const buildStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      elevation: 100,
      flexDirection: 'row',
      height: MOBILE_BOTTOM_NAV_HEIGHT + insets.bottom,
      minHeight: MOBILE_BOTTOM_NAV_HEIGHT + insets.bottom,
      paddingTop: theme.spacing[4],
      paddingBottom: insets.bottom,
      backgroundColor: theme.client.colors.card,
      borderTopLeftRadius: theme.client.radius.md,
      borderTopRightRadius: theme.client.radius.md,
      ...theme.client.shadows.tabBar,
    },
    item: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export const MobileBottomNav = ({
  navigationRef,
  rootState,
}: MobileBottomNavProps) => {
  const isMobile = useMobileLayout();
  const insets = useSafeAreaInsets();
  const { onClient, focusedTab } = selectNav(rootState);

  const onPress = useCallback(
    (name: keyof ClientTabsParamList) => {
      navigationRef.navigate('Client', {
        screen: 'ClientTabs',
        params: { screen: name },
      });
    },
    [navigationRef],
  );

  if (!isMobile || !onClient) return null;

  const styles = buildStyles(insets);

  return (
    <View style={styles.container}>
      {DESTINATIONS.map((name) => (
        <Pressable
          key={name}
          style={styles.item}
          onPress={() => onPress(name)}
          accessibilityRole="button"
        >
          <MobileTabRouteIcon
            routeName={name}
            focused={focusedTab === name}
            activeColor={theme.colors.primary[100]}
            inactiveColor={theme.colors.neutral[7]}
          />
        </Pressable>
      ))}
    </View>
  );
};
