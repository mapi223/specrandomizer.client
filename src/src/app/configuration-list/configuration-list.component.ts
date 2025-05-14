




import { Component } from '@angular/core';
import { IConfiguration } from '../player-list/Configuration';
import { HttpClient } from '@angular/common/http';
import { IPlayer } from '../player/player.model';
import { CLASSLIST } from '../class-list/mock-list';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.css']
})
export class ConfigurationListComponent {

  configs: IConfiguration[] = [];
  playerList: IPlayer[] = [];
  classes = CLASSLIST;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const userid = localStorage.getItem('userId');

    this.http.get<any>(AppModule.ConfigApi+'/api/Configuration/user/' + userid)
      .subscribe(data => {
        this.configs = data?.$values ? data.$values.map((config: { players: { $values: any; }; }) => ({
          ...config,
          players: config.players?.$values.map((player: any): IPlayer => ({
            id: player.playerId || null,
            PlayerName: player.playerName || '',
            SpecList: Array.isArray(player.specList?.$values) ? player.specList?.$values : []
          })),
          userId: userid

        })) : [];

      })
  }

  navigateWithGroup(config: IConfiguration) {
    config.players.forEach((player: { SpecList: any[]; }) => {
      player.SpecList.forEach((spec: number) => {
        if (spec === 13) {
          player.SpecList[player.SpecList.indexOf(spec)] = 12;
        }
      })
    });
    this.router.navigate(['/roulette'], { state: { configuration: config } });
  }

}
