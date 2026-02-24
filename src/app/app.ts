import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Ticker } from './components/ticker/ticker';
import { Chart } from './components/charts/chart';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Ticker, Chart],
  template: `
    <app-header></app-header>
    
    <main class="p-6 max-w-7xl mx-auto space-y-8">
      <section>
        <h2 class="text-2xl font-bold mb-2">Market Overview</h2>
        <p class="text-gray-400">Real-time cryptocurrency data streamed via Binance WebSockets.</p>
      </section>

      <app-ticker></app-ticker>
      
      <app-chart></app-chart>
    </main>
  `
})
export class App {}