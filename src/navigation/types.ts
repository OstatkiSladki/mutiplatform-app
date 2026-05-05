import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type ClientTabsParamList = {
  Home: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type ClientStackParamList = {
  ClientTabs: NavigatorScreenParams<ClientTabsParamList>;
  Venue: { venueId: number };
  Booking: { venueId: number };
};

export type BusinessTabsParamList = {
  Dashboard: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Client: NavigatorScreenParams<ClientStackParamList>;
  Business: NavigatorScreenParams<BusinessTabsParamList>;
};
