import { Component } from '@angular/core';
import { IAppState } from '../Store/RouletteReducers';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-spec-roulette-header',
  templateUrl: './spec-roulette-header.component.html',
  styleUrls: ['./spec-roulette-header.component.css']
})
export class SpecRouletteHeaderComponent {
  constructor(private store: Store<IAppState>) { }

  isMenuOpen = false;
  username = '';
  password = '';
  isToken: boolean = false;
  isAdmin: boolean = false;
  CookieConsent: boolean = false;
  
 



  onCookieConsentChange() {
    this.store.dispatch({ type: '[Roulette] Set Cookie Consent', consent: this.CookieConsent });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goHome() {

  }

}
