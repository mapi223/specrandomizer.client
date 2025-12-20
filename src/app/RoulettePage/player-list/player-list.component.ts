import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPlayer } from './player/player.model';
import { IConfiguration, IRoleAssignment } from './Configuration';
import { AppModule } from '../../app.module';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { addPlayer, removePlayer } from 'src/app/Store/RouletteActions';
import { selectListOfPlayers, selectNumberOfPlayers } from 'src/app/Store/RouletteSelectors';
import { IAppState } from 'src/app/Store/RouletteReducers';



export interface RouletteState {
  roulette: {
  numPlayers: number;
  PlayerList: IPlayer[];
  Group: IRoleAssignment[];
  }
};

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})

export class PlayerListComponent {
  isLoading = false;
  RoleAssignments: any;
  players$: Observable<number> = this.store.select(selectNumberOfPlayers);
  groups$: Observable<IRoleAssignment[]> = this.store.select((state: RouletteState) => state.roulette.Group);
  playerlist$: Observable<IPlayer[]> = this.store.select(selectListOfPlayers);
  userId = 1;
  playerList: IPlayer[] = [];

  Configuration = {
    UserID: this.userId,
    players: this.playerList,
  };

  constructor(private cdr: ChangeDetectorRef, private store: Store<IAppState>) { 
  }

  ngOnInit(){
  }


  ngOnChanges() {
    this.cdr.detectChanges();
  }


  addPlayer() {
    this.players$.pipe(take(1)).subscribe((numPlayers: number) => {
      if (numPlayers < 5) {
        this.store.dispatch(addPlayer());
      }
    }).unsubscribe();
  }

  removePlayer() {
    this.players$.pipe(take(1)).subscribe((numPlayers: number) => {
      if (numPlayers > 0) {
        this.store.dispatch(removePlayer());
      }
    }).unsubscribe();
  }


}
