import { Component, effect, inject } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg mt-6">
      <h3 class="text-gray-400 text-sm font-medium mb-4">BTC/USDT Live Trend</h3>
      
      <apx-chart
        [series]="chartSeries"
        [chart]="chartDetails"
        [xaxis]="xaxis"
        [colors]="colors"
        [stroke]="stroke"
        [theme]="theme"
      ></apx-chart>
    </div>
  `
})
export class Chart {
  cryptoService = inject(CryptoService);
  chartSeries = [{ name: 'Bitcoin Price', data: [] as {x: string, y: number}[] }];
  chartDetails: any = { type: 'area', height: 350, animations: { enabled: false }, toolbar: { show: false } };
  xaxis: any = { type: 'category', labels: { style: { colors: '#9ca3af' } } };
  colors = ['#3b82f6'];
  stroke: any = { curve: 'smooth', width: 2 };
  theme: any = { mode: 'dark' };

  constructor() {
    effect(() => {
      const liveData = this.cryptoService.priceHistory();
      this.chartSeries = [{ name: 'Bitcoin Price', data: liveData }];
    });
  }
}