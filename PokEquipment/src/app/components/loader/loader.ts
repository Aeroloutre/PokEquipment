import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  @Input() message: string = 'Chargement...';
}
