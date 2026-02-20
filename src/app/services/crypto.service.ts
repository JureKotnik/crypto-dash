import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  btcPrice: WritableSignal<string> = signal('Loading...');
  connectionStatus: WritableSignal<string> = signal('Disconnected');
  
  // NEW SIGNAL: Array of objects holding time (x) and price (y)
  priceHistory: WritableSignal<{x: string, y: number}[]> = signal([]);

  private socket!: WebSocket;
  private readonly BINANCE_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.connectionStatus.set('Connecting...');
    this.socket = new WebSocket(this.BINANCE_URL);

    this.socket.onopen = () => this.connectionStatus.set('Connected');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const currentPrice = parseFloat(data.p);
      const timestamp = data.E; // Use raw milliseconds for the chart

      this.btcPrice.set(currentPrice.toFixed(2));

      this.priceHistory.update(history => {
        // x is now a number (timestamp), not a string
        const newHistory = [...history, { x: timestamp, y: currentPrice }];
        
        // Keep 40 points for a smoother, wider looking line
        if (newHistory.length > 40) {
          newHistory.shift(); 
        }
        return newHistory;
      });
    };

    this.socket.onerror = () => this.connectionStatus.set('Error');
    this.socket.onclose = () => {
      this.connectionStatus.set('Disconnected');
      setTimeout(() => this.connect(), 5000);
    };
  }
}