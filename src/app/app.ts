import { Component } from '@angular/core';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header],
  template: `
    <app-header></app-header>
    <main class="p-8 max-w-7xl mx-auto">
      <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
        <h2 class="text-2xl font-bold mb-2">Welcome to the Dashboard</h2>
        <p class="text-gray-400">
          Waiting for WebSocket connection...
        </p>
      </div>
    </main>
  `
})
export class AppComponent {}