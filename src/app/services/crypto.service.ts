import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  btcPrice: WritableSignal<string> = signal('Loading...');
  connectionStatus: WritableSignal<string> = signal('Disconnected');

  private socket!: WebSocket;
  private readonly BINANCE_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade';

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.connectionStatus.set('Connecting...');
    this.socket = new WebSocket(this.BINANCE_URL);

    this.socket.onopen = () => {
      this.connectionStatus.set('Connected');
      console.log('Binance WebSocket Connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.btcPrice.set(parseFloat(data.p).toFixed(2));
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
      this.connectionStatus.set('Error');
    };

    this.socket.onclose = () => {
      this.connectionStatus.set('Disconnected');
      setTimeout(() => this.connect(), 5000);
    };
  }
}