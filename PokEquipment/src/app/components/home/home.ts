import { Component } from '@angular/core';
import { Header } from '../header/header';
import { TeamEditor } from "../team-editor/team-editor";

@Component({
  selector: 'app-home',
  imports: [Header, TeamEditor],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

}
