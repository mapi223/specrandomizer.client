import { Injectable } from "@angular/core";
import { ROOT_EFFECTS_INIT, Actions, createEffect, ofType } from "@ngrx/effects";
import * as RouletteActions from './RouletteActions';
import { Store } from '@ngrx/store';
import { IAppState } from './RouletteReducers';
import { withLatestFrom, map, tap, filter } from 'rxjs/operators';
import { RouletteStorageService } from '../Service/RouletteStorageService';

@Injectable()
export class RouletteEffects {
  constructor(private actions$: Actions, private store: Store<IAppState>, private storage: RouletteStorageService) {}


// ...existing code...
initConsent$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => RouletteActions.loadCookieConsent())
  )
);

initHistory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => RouletteActions.loadConfigurationHistory())
  )
);

  // Save current configuration (IPlayer[]) to session storage
  saveRoulette$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouletteActions.saveCurrentConfigurations),
      withLatestFrom(this.store.select(state => state.roulette.PlayerList)),
      tap(([_, players]) => this.storage.saveConfig(players)),
      map(([_, __]) => this.storage.loadHistory()),
      map(history => RouletteActions.setConfigurationHistory({ history }))
    )
  );

  // Load previous configuration from session storage and dispatch an action to set it
  loadRoulette$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouletteActions.loadPreviousConfigurations),
      map(() => this.storage.loadLatest()),
      filter((players): players is NonNullable<typeof players> => !!players && players.length > 0),
      map(players => {
        return RouletteActions.setPlayerList({ players });
      })
    )
  );

  loadConfigurationHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouletteActions.loadConfigurationHistory),
      map(() => this.storage.loadHistory()),
      withLatestFrom(this.store.select(state => state.roulette.consentState.consent)),
      filter(([_, consent]) => consent),
      map(([history, consent]) => ({ history, consent })),
      filter(({ history }) => !!history && history.length > 0),
      map(({ history, consent }) => consent ? RouletteActions.setConfigurationHistory({ history }) : RouletteActions.setConfigurationHistory({ history: [] }))
    )
  )

  clearConfigurationHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouletteActions.clearConfigurationHistory),
      tap(() => this.storage.clear()),
      map(() => RouletteActions.setConfigurationHistory({ history: [] }))
    )
  );

  saveCookieConsent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouletteActions.setCookieConsent),
      tap(({ consent }) => this.storage.saveCookieConsent(consent))
    ),
    { dispatch: false }
  );

  loadCookieConsent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouletteActions.loadCookieConsent),
      tap(() => console.log("RouletteEffects: Loading cookie consent from storage...")),
      map(() => this.storage.loadCookieConsent()),
      map(consent => RouletteActions.setCookieConsentFromLoad(consent))
    )
  );

  loadRouletteFromHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouletteActions.loadRouletteFromHistory),
      map(action => action.groupId),
      tap(groupId => console.log("RouletteEffects: Loading Roulette from saved history, redirect to follow")),
      map(groupId => this.storage.loadSpecificHistory(groupId)),
      map(players => RouletteActions.setRouletteFromHistory({ players }))
    )
  );
}