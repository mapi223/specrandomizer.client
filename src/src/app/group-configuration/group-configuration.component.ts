import { Component, Input } from '@angular/core';
import { IClassDetails } from "../class-list/classDetails";
import { IGPlayer } from './group.model';
import { IRoleAssignment } from '../player-list/Configuration';
import { CLASSLIST } from '../class-list/mock-list';


@Component({
  selector: 'app-group-configuration',
  templateUrl: './group-configuration.component.html',
  styleUrls: ['./group-configuration.component.css']
})
export class GroupConfigurationComponent {

  classList = CLASSLIST;
  @Input() players: any[] = [];



}
