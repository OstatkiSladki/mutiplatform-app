import type { NavigatorScreenParams } from '@react-navigation/native';
import type { Offer } from '../entities/offer';
import type { Product } from '../entities/product';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type ClientTabsParamList = {
  Home: undefined;
  Nearby: undefined;
  Catalog: undefined;
  Cart: undefined;
};

export type ClientStackParamList = {
  ClientTabs: NavigatorScreenParams<ClientTabsParamList>;
  Profile: undefined;
  Venue: { venueId: number };
  Booking: { venueId: number };
  ProfileEdit: undefined;
  Support: undefined;
  Addresses: undefined;
  NotificationsSettings: undefined;
  About: undefined;
  ProductDetails: {
    venueId: number;
    venueName: string;
    offer: Offer;
    product?: Product;
  };
};

export type BusinessStackParamList = {
  Overview: undefined;
  Forecast: undefined;
  Offers: undefined;
  Orders: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Client: NavigatorScreenParams<ClientStackParamList>;
  Business: NavigatorScreenParams<BusinessStackParamList>;
};
