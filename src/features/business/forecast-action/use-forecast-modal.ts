import { useCallback, useState } from 'react';
import type { ForecastItem } from '../../../entities/business-app/model/types';
import type { BoxSize, ForecastModalState } from './types';

const INITIAL: ForecastModalState = {
  mode: 'idle',
  boxItems: [],
  boxName: 'Название сюрприз бокса',
  boxSize: 'S',
  single: null,
  singleQty: 0,
};

export interface UseForecastModalApi {
  state: ForecastModalState;
  openBox: (items: ForecastItem[]) => void;
  closeBox: () => void;
  setBoxName: (name: string) => void;
  setBoxSize: (size: BoxSize) => void;
  removeBoxItem: (id: string) => void;
  appendBoxItem: (item: ForecastItem) => void;
  openSingle: (item: ForecastItem) => void;
  closeSingle: () => void;
  setSingleQty: (qty: number) => void;
}

export function useForecastModal(): UseForecastModalApi {
  const [state, setState] = useState<ForecastModalState>(INITIAL);

  const openBox = useCallback((items: ForecastItem[]) => {
    setState({
      ...INITIAL,
      mode: 'box',
      boxItems: items,
    });
  }, []);

  const closeBox = useCallback(() => setState(INITIAL), []);

  const setBoxName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, boxName: name }));
  }, []);

  const setBoxSize = useCallback((size: BoxSize) => {
    setState((prev) => ({ ...prev, boxSize: size }));
  }, []);

  const removeBoxItem = useCallback((id: string) => {
    setState((prev) => ({ ...prev, boxItems: prev.boxItems.filter((i) => i.id !== id) }));
  }, []);

  const appendBoxItem = useCallback((item: ForecastItem) => {
    setState((prev) =>
      prev.boxItems.some((i) => i.id === item.id)
        ? prev
        : { ...prev, boxItems: [...prev.boxItems, item] }
    );
  }, []);

  const openSingle = useCallback((item: ForecastItem) => {
    setState({
      ...INITIAL,
      mode: 'single',
      single: item,
      singleQty: item.stock,
    });
  }, []);

  const closeSingle = useCallback(() => setState(INITIAL), []);

  const setSingleQty = useCallback((qty: number) => {
    setState((prev) => ({ ...prev, singleQty: Math.max(0, qty) }));
  }, []);

  return {
    state,
    openBox,
    closeBox,
    setBoxName,
    setBoxSize,
    removeBoxItem,
    appendBoxItem,
    openSingle,
    closeSingle,
    setSingleQty,
  };
}
