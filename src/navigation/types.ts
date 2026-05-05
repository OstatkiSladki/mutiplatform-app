import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Offer } from '../entities/offer';
import type { Product } from '../entities/product';

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
  ProductDetails: {
    venueId: number;
    venueName: string;
    offer: Offer;
    product?: Product;
  };
  ProfileEdit: undefined;
  Support: undefined;
  Addresses: undefined;
  NotificationsSettings: undefined;
  About: undefined;
};

export type BusinessTabsParamList = {
  Dashboard: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Client: NavigatorScreenParams<ClientStackParamList>;
  Business: NavigatorScreenParams<BusinessTabsParamList>;
};
