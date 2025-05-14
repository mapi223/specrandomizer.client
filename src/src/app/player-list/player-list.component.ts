import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPlayer } from '../player/player.model';
import { HttpClient } from '@angular/common/http';
import { IConfiguration, IRoleAssignment } from './Configuration';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  isLoading = false;
  RoleAssignments: any;
  players: number = 0;
  userId = 1;
  playerList: IPlayer[] = [];

  Configuration = {
    UserID: this.userId,
    players: this.playerList,
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const Config = history.state.configuration;
    console.log(Config.players);
    console.log(Config);
    this.playerList = [...Config.players];
    console.log(this.playerList);
    this.Configuration = {
      ...this.Configuration,
      players: [...Config.players],
      UserID: Config.userId
    };
    this.userId = Config.userId;
    this.players = this.playerList.length;

    this.updateUserID();
  }

  ngOnChanges() {
    this.cdr.detectChanges();
  }

  updateUserID() {
    this.userId = Number(localStorage.getItem('userId'));
    this.Configuration.UserID = this.userId;
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

  onSubmit() {
    this.updateUserID();
    this.http.post<IConfiguration>(AppModule.ConfigApi+'/api/Configuration', this.Configuration, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe((response) => {
      this.isLoading = true;
      response.configurationId;
      console.log("Configuration saved successfully!");
      this.http.get<any>(AppModule.GroupApi+'/group/')
        .subscribe((GetResponse) => {
          console.log(GetResponse);
          this.RoleAssignments = GetResponse?.$values || [];
          this.isLoading = false;
        },
          error => {
            console.log("Beep Boop: Get Error ", error);
          });
    }, error => {
      console.error("Error occurred:", error);
    });
  }


  get playersArray() {
    return Array(this.players).fill(0);
  }

  inputPlayerList(eventList: IPlayer) {

    this.playerList[eventList.id - 1] = eventList;
    //console.log(this.playerList);
  }


}
