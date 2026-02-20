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
      const timeString = new Date(data.E).toLocaleTimeString(); // Get HH:MM:SS

      // Update current price string
      this.btcPrice.set(currentPrice.toFixed(2));

      // NEW: Update history array for the chart
      this.priceHistory.update(history => {
        // Create new array with the latest point
        const newHistory = [...history, { x: timeString, y: currentPrice }];
        // Keep only the last 20 data points to prevent the chart from overflowing
        if (newHistory.length > 20) {
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