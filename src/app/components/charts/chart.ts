import { Component, effect, inject, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl mt-6">
      <h3 class="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">BTC/USDT Live Trend</h3>
      
      <apx-chart
        #chartRef
        [series]="chartSeries"
        [chart]="chartDetails"
        [xaxis]="xaxis"
        [yaxis]="yaxis"
        [colors]="colors"
        [stroke]="stroke"
        [fill]="fill"
        [theme]="theme"
        [dataLabels]="dataLabels"
        [grid]="grid"
        [tooltip]="tooltip"
      ></apx-chart>
    </div>
  `
})
export class Chart {
  @ViewChild('chartRef') chartRef!: ChartComponent;
  cryptoService = inject(CryptoService);

  chartSeries = [{ name: 'Bitcoin', data: [] as {x: number, y: number}[] }];
  
  chartDetails: any = { 
    type: 'area', 
    height: 350, 
    animations: { enabled: false }, // Keep off for performance
    toolbar: { show: false },
    zoom: { enabled: false }
  };

  // THE MAGIC: Treat X-axis as a flowing timeline
  xaxis: any = { 
    type: 'datetime', 
    labels: { show: false }, 
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false }
  };

  yaxis: any = {
    labels: {
      minWidth: 80, 
      maxWidth: 80,
      formatter: (value: number) => { return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); },
      style: { colors: '#6b7280', fontFamily: 'monospace' } // tailwind gray-500
    }
  };

  // Add a beautiful gradient fill under the line
  fill: any = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.05,
      stops: [0, 100]
    }
  };

  dataLabels: any = { enabled: false };

  grid: any = {
    show: true,
    borderColor: '#1f2937', // tailwind gray-800
    strokeDashArray: 3,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: true } },
  };

  tooltip: any = { theme: 'dark' };

  colors = ['#3b82f6']; // Bright blue
  stroke: any = { curve: 'smooth', width: 2 }; // Smooth curves instead of jagged straight lines
  theme: any = { mode: 'dark' };

  constructor() {
    effect(() => {
      const liveData = this.cryptoService.priceHistory();
      if (this.chartRef) {
        this.chartRef.updateSeries([{ name: 'Bitcoin', data: liveData }], false);
      }
    });
  }
}