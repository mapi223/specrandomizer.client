import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IClassDetails } from '../class-list/classDetails';
import { IClass, IPlayer } from './player.model';
import { filter, map, Observable, take } from 'rxjs';
import { RouletteState } from '../player-list.component';
import { Store } from '@ngrx/store';
import { selectPlayerById, selectPlayerName } from 'src/app/Store/RouletteSelectors';
import { IAppState } from 'src/app/Store/RouletteReducers';
import { updatePlayerName } from 'src/app/Store/RouletteActions';




@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() isLoading!: boolean;
  @Input() playerId!: number;
  playername: string = "";
  playerName$: Observable<string> = this.store.select(selectPlayerName, { playerId: this.playerId });
  player$!: Observable<IPlayer>;
  playerlist$: Observable<IPlayer[]> = this.store.select((state: IAppState) => state.roulette.PlayerList);

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.player$ = this.store.select(selectPlayerById, { playerId: this.playerId }).pipe(
      // Filter out undefined values
      filter((player): player is IPlayer => player !== undefined)
    );
    this.playername = "Player " + this.playerId;
    console.log('Initialized player component for playerId:', this.playerId);
  }

  onPlayerNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const newName = input.value;
    this.playername = newName;
    this.store.dispatch(updatePlayerName({ playerId: this.playerId, newName }));
  }

  inputPlayerSelection(eventList: IClassDetails[]) {
    if (!eventList || eventList.length === 0) {
      if (this.player$) {
        this.player$.pipe(take(1)).subscribe(player => {
          if (player) {
            player.classList = [];
          }
        });
        if (this.player$) {
          this.player$.pipe(take(1)).subscribe(player => {
            if (player) {
              const classListFromEvent: IClass[] = eventList
                .filter(ICDets => ICDets && ICDets.id !== undefined) // Ensure objects exist
                .map(ICDets => ({ id: ICDets.id, className: ICDets.className, activeSpecs: ICDets.specs.shortName }));
              player.classList = classListFromEvent;
            }
          });
        }
      }
    }
  }
}