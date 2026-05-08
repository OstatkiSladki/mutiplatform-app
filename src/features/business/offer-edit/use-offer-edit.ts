import { useCallback, useEffect, useState } from 'react';
import type { BusinessOffer } from '../../../entities/business-app/model/types';

export interface OfferEditFormState {
  price: number;
  stock: number;
}

export interface UseOfferEditApi {
  editing: BusinessOffer | null;
  form: OfferEditFormState;
  isValid: boolean;
  open: (offer: BusinessOffer) => void;
  close: () => void;
  setPrice: (next: number) => void;
  setStock: (next: number) => void;
}

export function useOfferEdit(): UseOfferEditApi {
  const [editing, setEditing] = useState<BusinessOffer | null>(null);
  const [form, setForm] = useState<OfferEditFormState>({ price: 0, stock: 0 });

  useEffect(() => {
    if (editing) setForm({ price: editing.price, stock: editing.stock });
  }, [editing]);

  const open = useCallback((offer: BusinessOffer) => setEditing(offer), []);
  const close = useCallback(() => setEditing(null), []);
  const setPrice = useCallback(
    (next: number) => setForm((prev) => ({ ...prev, price: Math.max(0, next) })),
    []
  );
  const setStock = useCallback(
    (next: number) => setForm((prev) => ({ ...prev, stock: Math.max(0, next) })),
    []
  );

  const isValid = form.price >= 0 && form.stock >= 0;

  return { editing, form, isValid, open, close, setPrice, setStock };
}
