import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayer } from '../player/player.model';
import { IUser } from './user.model';
import { IConfiguration } from '../player-list/Configuration';
import { CLASSLIST } from '../class-list/mock-list';
import { IClassDetails } from '../class-list/classDetails'
import { AppModule } from '../app.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  usrIndex: any = null;
  configIndex: any = null;
  usrId: Number = 0;
  userName:String = ""
  findUsers: boolean = true;
  isEditingAUser: boolean = false;
  isEditingAConfig: boolean = false;
  users: IUser[] = [];
  configs: IConfiguration[] = [];
  classes = CLASSLIST;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const userid = localStorage.getItem('userId');


    this.http.get<any>(AppModule.AdminApi+'/api/auth/admin/' + userid)
      .subscribe(data => {
        this.users = data?.$values ? data.$values.map((user: any): IUser => ({
          userName: user.userName || "",
          uId: user.uId || null,
          password: user.userName || ""

        })) : [];

      })
  }

  enterEditForUser(usrId: Number, index:any) {
    const adminId = localStorage.getItem('userId');
    this.findUsers = false;
    this.usrId = usrId;
    this.usrIndex = index;
    this.http.get<any>(AppModule.AdminApi+'/api/auth/admin/c/' + usrId + '?adminId=' + adminId)
      .subscribe(data => {
        this.configs = data?.$values ? data.$values.map((config: { players: { $values: any; }; }) => ({
          ...config,
          players: config.players?.$values.map((player: any): IPlayer => ({
            id: player.playerId || null,
            PlayerName: player.playerName || '',
            SpecList: Array.isArray(player.specList?.$values) ? player.specList?.$values : []
          })),
          userId: usrId

        })) : [];

      })

  }
  editUser( usrId:Number) {
    this.isEditingAUser = true;
    this.usrId = usrId;
  }

  editConfig(configIndex:any, usrId:Number) {
    this.isEditingAConfig = true;
    this.configIndex = configIndex;
    this.usrId = usrId;
  }
  
  backToUserList() {
    this.findUsers = true;
    this.isEditingAConfig = false;
    this.isEditingAUser = false;
  }

  sendDetails(usrId: Number, index:any) {
    let adminId = Number(localStorage.getItem('userId'));
    const password = this.users[index].userName;
    let userDto = this.users[index];
    if (this.isEditingAUser) {

      if (!userDto || Object.keys(userDto).length === 0) {
        console.error("userDto is empty or undefined");
        return;
      }
      this.isEditingAUser = false;
      this.http.put(`${AppModule.AdminApi}/api/auth/update/${usrId}?modifierId=${adminId}`, userDto, {
        headers: { 'Content-Type': 'application/json', 
                   'Accept': 'application/json'
        }
        
      }).subscribe(response => {
        console.log(response)
      }, error => {
        console.log("Beep Boop Edit User Error: " + error.message)
      });
      this.usrId = 0;
      this.backToUserList();
    }
    else if (this.isEditingAConfig) {
      this.isEditingAConfig = false;
      this.http.put(AppModule.AdminApi+"/api/auth/" + usrId + "?modifierId=" + adminId, this.configs[index], {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(response => {
        console.log(response)
      }, error => {
        console.log("Beep Boop Edit User Error: " + error)
      });
      this.usrId = 0;
      this.backToUserList();
    }
    else {
      console.log("how did we end up here");
      this.backToUserList();
    }
  }

  selectClasses(cId: any, index: any) {
    const specList:number[] = this.configs[this.configIndex].players[index].SpecList;
    const foundIndex = specList.findIndex(sp => sp==cId)

    if (foundIndex === -1) {
      this.configs[this.configIndex].players[index].SpecList.push(cId);
    } else {
      this.configs[this.configIndex].players[index].SpecList.splice(foundIndex, 1);
    }
  }
}
