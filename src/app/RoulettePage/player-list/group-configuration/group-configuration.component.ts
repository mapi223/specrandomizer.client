import { Component, Input } from '@angular/core';
import { IClassDetails } from "../class-list/classDetails";
import { IGPlayer } from './group.model';
import { CLASSLIST } from '../class-list/mock-list';


@Component({
  selector: 'app-group-configuration',
  templateUrl: './group-configuration.component.html',
  styleUrls: ['./group-configuration.component.css']
})
export class GroupConfigurationComponent {

  classList = CLASSLIST;
  @Input() players: any[] = [];



  rollTheBones(){
    if(this.players.length < 0)
      console.log("No players do something to output error")

    console.log("here are the players: ", this.players);
  }

}
