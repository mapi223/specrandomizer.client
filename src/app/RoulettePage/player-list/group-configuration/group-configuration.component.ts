import { Component, Input } from '@angular/core';
import { IClassDetails } from "../class-list/classDetails";
import { IGPlayer } from './group.model';
import { CLASSLIST } from '../class-list/mock-list';
import { Store } from '@ngrx/store';
import { selectListOfPlayers } from 'src/app/Store/RouletteSelectors';
import { IAppState } from 'src/app/Store/RouletteReducers';
import { filter, take } from 'rxjs';
import { IPlayer } from '../player/player.model';
import { IRole } from '../Configuration';


@Component({
  selector: 'app-group-configuration',
  templateUrl: './group-configuration.component.html',
  styleUrls: ['./group-configuration.component.css']
})
export class GroupConfigurationComponent {

  constructor(private store: Store<IAppState>) {}

  classList = CLASSLIST;
  players$ = this.store.select(selectListOfPlayers);
  chosenClasses: String[] = [];
  rolledBones: boolean = false;

  GetRole(player: IPlayer): IRole {
    // Implement your logic to get the role for the player

    return  IRole.Damage; // Placeholder return value
  }

  GetClass(player: IPlayer, role: IRole){
    const availableClasses: IClassDetails[] = this.classList.filter(spec => this.classList[spec.id] && player.SpecList.includes(spec.id));
    if(availableClasses.length > 0){
      const randomIndex = Math.floor(Math.random() * availableClasses.length);
      const chosenClass = availableClasses[randomIndex];
      this.chosenClasses[player.id] = chosenClass.className;
      console.log(`Player ${player.PlayerName} assigned to class ${chosenClass.className}`);
    } else {
      this.chosenClasses[player.id] = "No Available Classes";
      console.log(`Player ${player.PlayerName} has no available classes to choose from.`);
    }
  }

  rollTheBones(){
    console.log('Rolling the bones...');
    this.players$.pipe(take(1)).subscribe(players => {
      if(players && players.length) {
        this.store.dispatch({ type: '[Roulette] Start Roulette'})
        this.rolledBones = true;
        this.chosenClasses = [];
        players.forEach(player => {
          this.GetClass(player, this.GetRole(player));
        });
      } else {
        console.log('No players available to roll the bones for.');
      }
    });
  };

}
