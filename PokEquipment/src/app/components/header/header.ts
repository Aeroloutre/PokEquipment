import { Component } from '@angular/core';
import { Button } from '../button/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Button, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
