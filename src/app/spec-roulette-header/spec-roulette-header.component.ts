import { Component } from '@angular/core';
import { IAppState } from '../Store/RouletteReducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


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
  CookieConsent$: Observable<boolean> = this.store.select(state => state.roulette.consentState.consent);
  CookieConsent: boolean = false;
  
 ngOnInit(){
  this.CookieConsent$.subscribe(consent => {
    this.CookieConsent = consent;
  });
  this.store.dispatch({ type: '[Roulette] Load Cookie Consent'})
 }

  onClearCacheButton(){
    this.store.dispatch({ type: '[Roulette] Clear Configuration History'});
  }

  onCookieConsentChange() {
    this.store.dispatch({ type: '[Roulette] Set Cookie Consent', consent: this.CookieConsent });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goHome() {

  }

}
