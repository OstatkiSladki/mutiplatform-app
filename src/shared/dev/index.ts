// Mocks fall back automatically in dev. For backend-less deploys, opt in
// explicitly with EXPO_PUBLIC_USE_MOCKS=true (set at build/export time).
export const DEV_MOCKS_ENABLED =
  process.env.EXPO_PUBLIC_USE_MOCKS === 'true' ||
  (process.env.EXPO_PUBLIC_USE_MOCKS !== 'false' && __DEV__);
