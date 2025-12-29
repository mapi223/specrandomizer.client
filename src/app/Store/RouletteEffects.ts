import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RouletteActions from './RouletteActions';
import { Store } from '@ngrx/store';
import { IAppState } from './RouletteReducers';
import { withLatestFrom, map, tap, filter } from 'rxjs/operators';
import { RouletteStorageService } from '../Service/RouletteStorageService';

@Injectable()
export class RouletteEffects {
  constructor(private actions$: Actions, private store: Store<IAppState>, private storage: RouletteStorageService) {}

  // Save current configuration (IPlayer[]) to session storage
  saveRoulette$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RouletteActions.saveCurrentConfigurations),
      withLatestFrom(this.store.select(state => state.roulette.PlayerList)),
      tap(([_, players]) => this.storage.saveConfig(players))
    ),
    { dispatch: false }
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
}