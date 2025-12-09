import { Component, Input } from '@angular/core';
import { IClassDetails } from "../class-list/classDetails";
import { IGPlayer } from './group.model';
import { CLASSLIST } from '../class-list/mock-list';
import { props, Store } from '@ngrx/store';
import { selectListOfPlayers, selectPlayerById } from 'src/app/Store/RouletteSelectors';
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

  constructor(private store: Store<IAppState>) { }

  classList = CLASSLIST;
  players$ = this.store.select(selectListOfPlayers);
  chosenClasses: IGPlayer[] = [];
  rolledBones: boolean = false;
  tankPicked: boolean = false;
  healerPicked: boolean = false;
  allDamagePicked: number = 0;
  role: IRole = IRole.INVALID;

  getSpecName(specId: number, role: IRole): string {

    return 'Unknown Spec';
  }

  GetRole(player: IPlayer): IRole {
    // Implement your logic to get the role for the player
    this.store.select(selectListOfPlayers).pipe(take(1)).subscribe(players => {
      const numPlayers = players.length;
      // Logic to determine role based on number of players or other criteria
      if (numPlayers <= 3) {
        this.role = Math.floor(Math.random() * 3); // Tank, Healer, Damage
        if (this.role === IRole.Tank && !this.tankPicked) {
          this.tankPicked = true;
          return this.role = IRole.Tank;
        }
        else if (this.role === IRole.Healer && !this.healerPicked) {
          this.healerPicked = true;
          return this.role = IRole.Healer;
        }
        else if ((this.healerPicked || this.tankPicked || this.role === IRole.Damage) && this.allDamagePicked < 3) {
          this.allDamagePicked += 1;
          return this.role = IRole.Damage;
        }
        else {
          return this.role = IRole.INVALID;
        }
      }
      else if (numPlayers == 4) {
        this.role = Math.floor(Math.random() * 3); // Tank, Healer, Damage
        if (this.role === IRole.Tank && !this.tankPicked) {
          this.tankPicked = true;
          return this.role = IRole.Tank;
        }
        else if (this.role === IRole.Healer && !this.healerPicked) {
          this.healerPicked = true;
          return this.role = IRole.Healer;
        }
        else if ((this.healerPicked || this.tankPicked || this.role === IRole.Damage) && this.allDamagePicked < 3) {
          this.allDamagePicked += 1;
          return this.role = IRole.Damage;
        }
        else if (this.allDamagePicked >= 3 && !this.healerPicked && this.tankPicked) {
          this.healerPicked = true;
          return this.role = IRole.Healer;
        }
        else if (this.allDamagePicked >= 3 && !this.tankPicked && this.healerPicked) {
          this.tankPicked = true;
          return this.role = IRole.Tank;
        }
        else if (this.allDamagePicked >= 3 && !this.tankPicked && !this.healerPicked) {
          this.role = Math.floor(Math.random() * 2); // Tank or Healer
          if (this.role === IRole.Healer) {
            this.healerPicked = true;
            return this.role = IRole.Healer;
          } else {
            this.tankPicked = true;
            return this.role = IRole.Tank;
          }
        }
        else {
          console.log(`Error in role assignment for 4 players ${player.PlayerName}, Role: ${this.role}`);
          return this.role = IRole.INVALID;
        }
      }
      else {
        this.role = Math.floor(Math.random() * 3); // Tank, Healer, Damage
        if (this.role === IRole.Tank && !this.tankPicked) {
          this.tankPicked = true;
          return this.role = IRole.Tank;
        }
        else if (this.role === IRole.Healer && !this.healerPicked) {
          this.healerPicked = true;
          return this.role = IRole.Healer;
        }
        else if ((this.healerPicked || this.tankPicked || this.role === IRole.Damage) && this.allDamagePicked < 3) {
          this.allDamagePicked += 1;
          return this.role = IRole.Damage;
        }
        else if (this.allDamagePicked >= 3 && !this.healerPicked && this.tankPicked) {
          this.healerPicked = true;
          return this.role = IRole.Healer;
        }
        else if (this.allDamagePicked >= 3 && !this.tankPicked && this.healerPicked) {
          this.tankPicked = true;
          return this.role = IRole.Tank;
        }
        else if (this.allDamagePicked >= 3 && !this.tankPicked && !this.healerPicked) {
          this.role = Math.floor(Math.random() * 2); // Tank or Healer
          if (this.role === IRole.Healer) {
            this.healerPicked = true;
            return this.role = IRole.Healer;
          } else {
            this.tankPicked = true;
            return this.role = IRole.Tank;
          }
        }
        else {
          console.log(`Error in role assignment for 5 players ${player.PlayerName}, Role: ${this.role}`);
          return this.role = IRole.INVALID;
        }
      }
    });
    return this.role;
  }

  GetClass(player: IPlayer, role: IRole) {
    const availableClasses: IClassDetails[] = this.classList
      .filter(ICDets => player.classList.findIndex
        (Iclass => Iclass.id === ICDets.id) !== -1);

    if (availableClasses.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableClasses.length);
      const chosenClass = availableClasses[randomIndex];
      this.store.select(selectPlayerById, { playerId: player.id }).pipe(filter(p => p !== undefined), take(1)).subscribe(p => {
        if (!this.chosenClasses[player.id]) {
          this.chosenClasses[player.id] = {
            ...this.chosenClasses[player.id],
            Player: p as IPlayer,
            ClassName: chosenClass.className,
            SpecName: this.getSpecName(chosenClass.id, role),
          }
        };
      });
      console.log(`Player ${player.PlayerName} assigned to class ${this.chosenClasses[player.id].ClassName} Role:  ${role}`);

    } else {
      this.chosenClasses[player.id].ClassName = "No Available Classes";
      console.log(`Player ${player.PlayerName} has no available classes to choose from.`);
    }
  }

  rollTheBones() {
    console.log('Rolling the bones...');
    this.players$.pipe(take(1)).subscribe(players => {
      if (players && players.length) {
        this.store.dispatch({ type: '[Roulette] Start Roulette' })
        this.rolledBones = true;
        this.chosenClasses = [];
        players.forEach(player => {

          this.GetClass(player, this.GetRole(player));
        });
      } else {
        console.log('No players available to roll the bones for.');
      }
    });
    this.healerPicked = false;
    this.tankPicked = false;
    this.allDamagePicked = 0;
  };

}
