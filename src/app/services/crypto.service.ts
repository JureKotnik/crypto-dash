import { Injectable, signal, WritableSignal } from '@angular/core';

export interface CryptoState {
  BTC: string;
  ETH: string;
  SOL: string;
}

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  cryptoPrices: WritableSignal<CryptoState> = signal({
    BTC: '0.00',
    ETH: '0.00',
    SOL: '0.00'
  });

  connectionStatus: WritableSignal<string> = signal('Disconnected');
  priceHistory: WritableSignal<{x: number, y: number}[]> = signal([]);

  private socket!: WebSocket;
  private readonly BINANCE_URL = 'wss://stream.binance.com:9443/stream?streams=btcusdt@trade/ethusdt@trade/solusdt@trade';

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.connectionStatus.set('Connecting...');
    this.socket = new WebSocket(this.BINANCE_URL);

    this.socket.onopen = () => this.connectionStatus.set('Connected');

    this.socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      const data = payload.data; 
      
      if (!data) return;

      const currentPrice = parseFloat(data.p);
      const symbol = data.s; 
      const timestamp = data.E;

      if (symbol === 'BTCUSDT') {
        this.cryptoPrices.update(state => ({ ...state, BTC: currentPrice.toFixed(2) }));
        
        this.priceHistory.update(history => {
          const newHistory = [...history, { x: timestamp, y: currentPrice }];
          if (newHistory.length > 40) newHistory.shift(); 
          return newHistory;
        });
      } 
      else if (symbol === 'ETHUSDT') {
        this.cryptoPrices.update(state => ({ ...state, ETH: currentPrice.toFixed(2) }));
      } 
      else if (symbol === 'SOLUSDT') {
        this.cryptoPrices.update(state => ({ ...state, SOL: currentPrice.toFixed(2) }));
      }
    };

    this.socket.onerror = () => this.connectionStatus.set('Error');
    this.socket.onclose = () => {
      this.connectionStatus.set('Disconnected');
      setTimeout(() => this.connect(), 5000);
    };
  }
}