import { Component } from '@angular/core';


@Component({
  selector: 'app-spec-roulette-header',
  templateUrl: './spec-roulette-header.component.html',
  styleUrls: ['./spec-roulette-header.component.css']
})
export class SpecRouletteHeaderComponent {
  
  isMenuOpen = false;
  username = '';
  password = '';
  isToken: boolean = false;
  isAdmin: boolean = false;

  
 



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goHome() {

  }

}
