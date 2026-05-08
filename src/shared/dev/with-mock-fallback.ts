import type { UseQueryResult } from '@tanstack/react-query';
import { DEV_MOCKS_ENABLED } from './index';

function isEmpty(data: unknown): boolean {
  if (data == null) return true;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === 'object' && 'items' in data) {
    return (data as { items: unknown[] }).items.length === 0;
  }
  return false;
}

export function withMockFallback<T>(
  result: UseQueryResult<T>,
  fallback: T,
): UseQueryResult<T> {
  if (!DEV_MOCKS_ENABLED) return result;
  if (!result.isError && !isEmpty(result.data)) return result;
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
