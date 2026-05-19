export const clientAssets = {
  logoHands: require('./logo-hands.png'),
  /** Full brand lockup — desktop client header (logoweb.png) */
  logoFull: require('../../../../assets/logoweb.png'),
  cafeKeks: require('./cafe-keks.jpg'),
  cafeSurf: require('./cafe-surf.jpg'),
  cafeBread: require('./cafe-bread.jpg'),
  surpriseBag: require('./surprise-bag.jpg'),
  emptyCart: require('./empty-cart.png'),
} as const;

export type ClientAssetKey = keyof typeof clientAssets;

export const venueCoverAssets = [
  clientAssets.cafeKeks,
  clientAssets.cafeSurf,
  clientAssets.cafeBread,
] as const;

export function pickVenueCover(venueId: number) {
  const idx = ((venueId % venueCoverAssets.length) + venueCoverAssets.length) % venueCoverAssets.length;
  return venueCoverAssets[idx];
}
