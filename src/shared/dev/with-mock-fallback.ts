import type { UseQueryResult } from '@tanstack/react-query';
import { DEV_MOCKS_ENABLED } from './index';

function paginatedItems(data: unknown): unknown[] | null {
  if (data == null) return null;
  if (Array.isArray(data)) return data;
  if (typeof data === 'object' && 'items' in data) {
    const items = (data as { items: unknown }).items;
    if (items == null) return null;
    return Array.isArray(items) ? items : null;
  }
  return null;
}

function isEmpty(data: unknown): boolean {
  const items = paginatedItems(data);
  if (items === null) return true;
  return items.length === 0;
}

function readItemId(item: unknown): number | null {
  if (typeof item !== 'object' || item == null || !('id' in item)) return null;
  const id = (item as { id: unknown }).id;
  return typeof id === 'number' ? id : null;
}

function mergePaginatedResponse<T>(primary: T, fallback: T): T {
  const primaryItems = paginatedItems(primary);
  const fallbackItems = paginatedItems(fallback);
  if (primaryItems == null || fallbackItems == null) return primary;

  const seen = new Set(primaryItems.map(readItemId).filter((id): id is number => id != null));
  const mergedItems = [
    ...primaryItems,
    ...fallbackItems.filter((item) => {
      const id = readItemId(item);
      return id != null && !seen.has(id);
    }),
  ];

  const primaryMeta =
    typeof primary === 'object' && primary != null && 'meta' in primary
      ? (primary as { meta: Record<string, unknown> }).meta
      : {};
  const fallbackMeta =
    typeof fallback === 'object' && fallback != null && 'meta' in fallback
      ? (fallback as { meta: Record<string, unknown> }).meta
      : {};

  return {
    ...(primary as object),
    items: mergedItems,
    meta: {
      ...fallbackMeta,
      ...primaryMeta,
      total: mergedItems.length,
    },
  } as T;
}

export interface MockFallbackOptions {
  /** Append mock items missing from a successful API response (by `id`). */
  merge?: boolean;
}

export function withMockFallback<T>(
  result: UseQueryResult<T>,
  fallback: T,
  options?: MockFallbackOptions,
): UseQueryResult<T> {
  if (!DEV_MOCKS_ENABLED) return result;

  const hasApiData = !isEmpty(result.data);

  if (hasApiData) {
    if (options?.merge && result.data) {
      return {
        ...result,
        data: mergePaginatedResponse(result.data, fallback),
      } as UseQueryResult<T>;
    }
    return result;
  }

  const apiFailedOrEmpty = result.isError || isEmpty(result.data);
  if (!apiFailedOrEmpty) return result;

  return {
    ...result,
    data: fallback,
    isSuccess: true,
    isPending: false,
    isLoading: false,
    isError: false,
    error: null,
    status: 'success' as const,
    fetchStatus: 'idle' as const,
  } as unknown as UseQueryResult<T>;
}

export function withMockFallbackLazy<T>(
  result: UseQueryResult<T>,
  factory: () => T | undefined,
): UseQueryResult<T> {
  if (!DEV_MOCKS_ENABLED) return result;
  if (!result.isError && !isEmpty(result.data)) return result;
  const fallback = factory();
  if (fallback === undefined) return result;
  return {
    ...result,
    data: fallback,
    isSuccess: true,
    isPending: false,
    isLoading: false,
    isError: false,
    error: null,
    status: 'success' as const,
    fetchStatus: 'idle' as const,
  } as unknown as UseQueryResult<T>;
}
