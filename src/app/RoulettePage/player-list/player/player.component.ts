import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IClassDetails } from '../class-list/classDetails';
import { IPlayer } from './player.model';
import { filter, map, Observable, take } from 'rxjs';
import { RouletteState } from '../player-list.component';
import { Store } from '@ngrx/store';
import { selectPlayerById } from 'src/app/Store/RouletteSelectors';
import { IAppState } from 'src/app/Store/RouletteReducers';




@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() isLoading!: boolean;
  @Input() playerId!: number;
  player$!: Observable<IPlayer>;
  playerlist$: Observable<IPlayer[]> = this.store.select((state: IAppState) => state.roulette.PlayerList);

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(){
    this.player$ = this.store.select(selectPlayerById, { playerId: this.playerId }).pipe(
      // Filter out undefined values
      filter((player): player is IPlayer => player !== undefined)
    );
    console.log('Initialized player component for playerId:', this.playerId);
  }

  inputPlayerSelection(eventList: IClassDetails[]) {
    if (!eventList || eventList.length === 0) {
      if (this.player$) {
        this.player$.pipe(take(1)).subscribe(player => {
          if (player) {
            player.SpecList = [];
          }
        });
      if (this.player$) {
        this.player$.pipe(take(1)).subscribe(player => {
          if (player) {
            player.SpecList = eventList
              .filter(spec => spec && spec.id !== undefined) // Ensure objects exist
              .map(spec => spec.id);
          }
          });
        }
      }
    }
  }
}