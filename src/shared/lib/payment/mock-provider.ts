import { randomUUID } from 'expo-crypto';
import { luhn } from './luhn';
import type { CardData, PaymentProvider, TokenizeResult } from './types';

const DELAY_MS = 1200;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export class MockPaymentProvider implements PaymentProvider {
  async tokenize(card: CardData): Promise<TokenizeResult> {
    await sleep(DELAY_MS);
    if (!luhn(card.pan)) {
      throw new Error('Invalid card number');
    }
    return { transaction_id: randomUUID() };
  }
}

export const mockPaymentProvider = new MockPaymentProvider();
