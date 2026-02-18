import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:border-blue-500 transition-colors">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-gray-400 text-sm font-medium">Bitcoin (BTC)</h3>
            <p class="text-4xl font-bold text-white mt-1">
              $ {{ cryptoService.btcPrice() }}
            </p>
          </div>
          <div class="bg-orange-500/20 p-3 rounded-lg">
            <span class="text-2xl">₿</span>
          </div>
        </div>
        
        <div class="flex items-center gap-2 text-sm">
           <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span class="text-gray-400">Status: </span>
          <span [class.text-green-400]="cryptoService.connectionStatus() === 'Connected'"
                [class.text-red-400]="cryptoService.connectionStatus() !== 'Connected'">
            {{ cryptoService.connectionStatus() }}
          </span>
        </div>
      </div>

    </div>
  `
})
export class Ticker {
  cryptoService = inject(CryptoService);
}