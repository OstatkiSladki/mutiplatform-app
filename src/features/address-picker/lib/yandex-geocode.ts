import { YANDEX_GEOCODER_KEY } from '../../../shared/config/env';

interface AddressComponent {
  kind: string;
  name: string;
}

interface GeocoderMetaData {
  text?: string;
  kind?: string;
  Address?: {
    Components?: AddressComponent[];
  };
}

interface GeoObject {
  metaDataProperty?: {
    GeocoderMetaData?: GeocoderMetaData;
  };
  Point?: {
    pos?: string;
  };
}

interface GeocodeResponse {
  response?: {
    GeoObjectCollection?: {
      featureMember?: Array<{
        GeoObject?: GeoObject;
      }>;
    };
  };
}

export interface GeocodeResult {
  /** Short label for header — street + house number. */
  address: string;
  /** Full formatted line for the search field. */
  fullAddress: string;
  lon: number;
  lat: number;
}

const geocodeUrl = (params: Record<string, string>) => {
  const query = new URLSearchParams({ format: 'json', lang: 'ru_RU', ...params });
  const key = YANDEX_GEOCODER_KEY;
  if (key) query.set('apikey', key);
  return `https://geocode-maps.yandex.ru/1.x/?${query.toString()}`;
};

const normalizeStreetPrefix = (name: string): string =>
  name
    .replace(/^улица\s+/i, 'ул. ')
    .replace(/^проспект\s+/i, 'просп. ')
    .replace(/^переулок\s+/i, 'пер. ')
    .replace(/^бульвар\s+/i, 'бул. ')
    .replace(/^шоссе\s+/i, 'ш. ');

export const formatShortAddress = (meta: GeocoderMetaData): string => {
  const components = meta.Address?.Components ?? [];
  const street = components.find((part) => part.kind === 'street')?.name;
  const house = components.find((part) => part.kind === 'house')?.name;

  if (street && house) {
    return `${normalizeStreetPrefix(street)} ${house}`.trim();
  }
  if (street) return normalizeStreetPrefix(street);

  const parts = (meta.text ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return parts.slice(-2).join(', ');
  }
  return parts.at(-1) ?? meta.text ?? '';
};

const parseGeoObject = (geo: GeoObject | undefined): GeocodeResult | null => {
  const pos = geo?.Point?.pos;
  const meta = geo?.metaDataProperty?.GeocoderMetaData;
  if (!pos || !meta?.text) return null;

  const [lonStr, latStr] = pos.split(' ');
  const lon = parseFloat(lonStr);
  const lat = parseFloat(latStr);
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;

  return {
    address: formatShortAddress(meta),
    fullAddress: meta.text,
    lon,
    lat,
  };
};

async function fetchGeocode(params: Record<string, string>): Promise<GeocodeResult | null> {
  try {
    const res = await fetch(geocodeUrl(params));
    if (!res.ok) return null;
    const data = (await res.json()) as GeocodeResponse;
    const geo = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;
    return parseGeoObject(geo);
  } catch {
    return null;
  }
}

export async function reverseGeocode(
  lon: number,
  lat: number,
  options?: { snapToHouse?: boolean },
): Promise<GeocodeResult | null> {
  const params: Record<string, string> = {
    geocode: `${lon},${lat}`,
    results: '1',
  };
  if (options?.snapToHouse) {
    params.kind = 'house';
  }
  return fetchGeocode(params);
}

export async function forwardGeocode(query: string): Promise<GeocodeResult | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;
  return fetchGeocode({ geocode: trimmed, results: '1', kind: 'house' });
}
