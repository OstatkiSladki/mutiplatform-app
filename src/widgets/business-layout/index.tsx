import React, { ReactNode } from 'react';
import { View } from 'react-native';
import type { BusinessStackParamList } from '../../navigation/types';
import { BusinessSidebar } from './business-sidebar';
import { BusinessTopbar } from './business-topbar';
import { styles } from './styles';

type BusinessRoute = keyof BusinessStackParamList;

export interface BusinessLayoutProps {
  routeName: BusinessRoute;
  children: ReactNode;
}

export const BusinessLayout = ({ routeName, children }: BusinessLayoutProps) => (
  <View style={styles.root}>
    <BusinessSidebar activeRoute={routeName} />
    <View style={styles.content}>
      <BusinessTopbar routeName={routeName} />
      <View style={styles.mainContent}>{children}</View>
    </View>
  </View>
);
