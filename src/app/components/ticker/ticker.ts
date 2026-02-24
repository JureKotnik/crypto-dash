import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl hover:border-orange-500/50 transition-colors">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-gray-400 text-sm font-medium uppercase tracking-wider">Bitcoin (BTC)</h3>
            <p class="text-3xl font-bold text-white mt-1 font-mono">
              $ {{ cryptoService.cryptoPrices().BTC }}
            </p>
          </div>
          <div class="bg-orange-500/10 p-3 rounded-lg text-orange-500 text-2xl font-bold">₿</div>
        </div>
      </div>

      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl hover:border-blue-500/50 transition-colors">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-gray-400 text-sm font-medium uppercase tracking-wider">Ethereum (ETH)</h3>
            <p class="text-3xl font-bold text-white mt-1 font-mono">
              $ {{ cryptoService.cryptoPrices().ETH }}
            </p>
          </div>
          <div class="bg-blue-500/10 p-3 rounded-lg text-blue-400 text-2xl font-bold">Ξ</div>
        </div>
      </div>

      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl hover:border-purple-500/50 transition-colors">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-gray-400 text-sm font-medium uppercase tracking-wider">Solana (SOL)</h3>
            <p class="text-3xl font-bold text-white mt-1 font-mono">
              $ {{ cryptoService.cryptoPrices().SOL }}
            </p>
          </div>
          <div class="bg-purple-500/10 p-3 rounded-lg text-purple-400 text-2xl font-bold">◎</div>
        </div>
      </div>

    </div>
    
    <div class="mt-4 flex items-center gap-2 text-sm justify-end">
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
  `
})
export class Ticker {
  cryptoService = inject(CryptoService);
}