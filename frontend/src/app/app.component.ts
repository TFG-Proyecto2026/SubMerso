import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SubMerso';
  /** Burbujas globales (pastel) */
  bubbles = Array.from({ length: 72 }, (_, i) => i);
  /** Pocas burbujas azul oscuro solo en el main */
  mainBubbles = Array.from({ length: 14 }, (_, i) => i);
}
