import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee-carousel',
  imports: [CommonModule],
  templateUrl: './marquee-carousel.html',
  styleUrl: './marquee-carousel.css',
})
export class MarqueeCarousel {
  @Input() items: string[] = [];
  @Input() duration: number = 30; // Durée de l'animation en secondes
  @Input() direction: 'left' | 'right' = 'left';
  @Input() itemHeight: string = '4rem';
  @Input() gap: string = '2rem';
  @Input() repetitions: number = 3; // Nombre de répétitions du marquee

  get repetitionArray(): number[] {
    return Array.from({ length: this.repetitions }, (_, i) => i + 1);
  }
}
