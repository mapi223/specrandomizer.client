import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IAppState } from './Store/RouletteReducers';
import { loadCookieConsent } from './Store/RouletteActions';
import { selectCookieConsent } from './Store/RouletteSelectors';

@Injectable({ providedIn: 'root' })
export class ConsentGuard implements CanActivate {
  constructor(private store: Store<IAppState>, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Ensure consent is loaded from storage
    console.log("ConsentGuard: Checking cookie consent...");
    this.store.dispatch(loadCookieConsent());
    return this.store.select(selectCookieConsent).pipe(
      take(1),
      map(consent => consent ? true : this.router.parseUrl('/newUser'))
    );
  }
}