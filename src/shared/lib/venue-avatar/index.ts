const LOGO_PALETTE = [
  { bg: '#1a1a1a', fg: '#ffffff' },
  { bg: '#ffffff', fg: '#1a1a1a' },
  { bg: '#c8302a', fg: '#ffffff' },
  { bg: '#0e7c66', fg: '#ffffff' },
  { bg: '#3b3a8c', fg: '#ffffff' },
] as const;

export interface VenueAvatarPalette {
  bg: string;
  fg: string;
}

export function pickVenueAvatarPalette(seed: number): VenueAvatarPalette {
  const len = LOGO_PALETTE.length;
  const idx = ((seed % len) + len) % len;
  return LOGO_PALETTE[idx];
}

export function venueAvatarLabel(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '?';
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return trimmed.slice(0, 4).toUpperCase();
}
