import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dive-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-ocean diving-card transition-all duration-300 p-4">
      <div class="placeholder-shimmer h-40 rounded-lg mb-4"></div>
      <div class="placeholder-shimmer h-4 w-3/4 rounded mb-2"></div>
      <div class="placeholder-shimmer h-4 w-1/2 rounded"></div>
    </div>
  `
})
export class DiveCardComponent {
  @Input() dive: any;
}
