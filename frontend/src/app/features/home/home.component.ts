import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  /** Burbujas con tamaños y posiciones variadas para animación continua */
  bubbles = Array.from({ length: 24 }, (_, i) => ({
    size: 12 + Math.random() * 28,
    left: Math.random() * 100,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 6
  }));
}
