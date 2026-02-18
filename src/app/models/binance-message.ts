export interface BinanceTrade {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol (BTCUSDT)
  p: string; // Price
  q: string; // Quantity
  t: number; // Trade ID
}