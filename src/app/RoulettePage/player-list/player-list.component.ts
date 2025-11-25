import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPlayer } from './player/player.model';
import { HttpClient } from '@angular/common/http';
import { IConfiguration, IRoleAssignment } from './Configuration';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
  isLoading = false;
  RoleAssignments: any;
  players: number = 0;
  userId = 1;
  playerList: IPlayer[] = [];

  Configuration = {
    UserID: this.userId,
    players: this.playerList,
  };

  constructor(private cdr: ChangeDetectorRef) { }


  ngOnChanges() {
    this.cdr.detectChanges();
  }


  addPlayer() {
    if (this.players < 5) {
      this.players++;
    }
  }
  removePlayer() {
    if (this.players > 0) {
      this.players--;
    }
  }

  get playersArray() {
    return Array(this.players).fill(0);
  }

  inputPlayerList(eventList: IPlayer) {

    this.playerList[eventList.id - 1] = eventList;
    //console.log(this.playerList);
  }


}
