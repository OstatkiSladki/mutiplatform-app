export interface CardData {
  pan: string;
  expiry: string;
  cvc: string;
  cardholder: string;
}

export interface TokenizeResult {
  transaction_id: string;
}

export interface PaymentProvider {
  tokenize(card: CardData): Promise<TokenizeResult>;
}
