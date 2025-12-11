import { Component, Input } from '@angular/core';
import { IClassDetails } from "../class-list/classDetails";
import { IGPlayer } from './group.model';
import { CLASSLIST, DamageSpecs, HealerSpecs, TankSpecs } from '../class-list/mock-list';
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
  theParty: IPlayer[] = [];

  isRoleAvailable(player: IPlayer, role: IRole): boolean {
    return player.roleList?.includes(role) || false;
  }

  getAvailableRoles(player: IPlayer): IRole[] {
    return player.roleList || [];
  }

  getTankSpec(availableSpecs: string[]): string[] {
    if (!availableSpecs || availableSpecs.length === 0) {
      return ["IRole.INVALID"];
    }

    const tankSpecs = TankSpecs.list;
    const matchingSpecs = availableSpecs.filter(spec => tankSpecs.includes(spec));
    if (matchingSpecs.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingSpecs.length);
      const ClassName = CLASSLIST.find(classItem => classItem.specs.list.includes(matchingSpecs[randomIndex]))?.className || "Unknown Class";
      return [ClassName, matchingSpecs[randomIndex]];
    }
    return ["IRole.INVALID"];
  }

  getHealerSpec(availableSpecs: string[]): string[] {
    if (!availableSpecs || availableSpecs.length === 0) {
      return ["IRole.INVALID"];
    }
    const healerSpecs = HealerSpecs.list;
    const matchingSpecs = availableSpecs.filter(spec => healerSpecs.includes(spec));
    if (matchingSpecs.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingSpecs.length);
      const ClassName = CLASSLIST.find(classItem => classItem.specs.list.includes(matchingSpecs[randomIndex]))?.className || "Unknown Class";
      return [ClassName, matchingSpecs[randomIndex]];
    }
    return ["IRole.INVALID"];
  }

  getDamageSpec(availableSpecs: string[]): string[]{
    if (!availableSpecs || availableSpecs.length === 0) {
      return ["IRole.INVALID"];
    }
    const damageSpecs = DamageSpecs.list;
    const matchingSpecs = availableSpecs.filter(spec => damageSpecs.includes(spec));
    if (matchingSpecs.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingSpecs.length);
      const ClassName = CLASSLIST.find(classItem => classItem.specs.list.includes(matchingSpecs[randomIndex]))?.className || "Unknown Class";
      return [ClassName, matchingSpecs[randomIndex]];
    }
    return ["IRole.INVALID"];
  }

  /*
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
  }*/

  assignRole(roleList: IRole[], 
    isTankAvailable: boolean = true, isHealerAvailable: boolean = true, isDamageAvailable: boolean = true): IRole {
    if (!roleList || roleList.length === 0) {
      return IRole.INVALID;
    }
    if((isTankAvailable && roleList.includes(IRole.Tank)) || (isHealerAvailable && roleList.includes(IRole.Healer)) || (isDamageAvailable && roleList.includes(IRole.Damage))){
      const randomIndex = Math.floor(Math.random() * roleList.length);
      return roleList[randomIndex];
    }
    else if((!isTankAvailable && roleList.includes(IRole.Tank)) && (isHealerAvailable && roleList.includes(IRole.Healer)) && (isDamageAvailable && roleList.includes(IRole.Damage))){
      const filteredRoles = roleList.filter(r => r !== IRole.Tank);
      const randomIndex = Math.floor(Math.random() * filteredRoles.length);
      return filteredRoles[randomIndex];
    }
    else if((isTankAvailable && roleList.includes(IRole.Tank)) && (!isHealerAvailable && roleList.includes(IRole.Healer)) && (isDamageAvailable && roleList.includes(IRole.Damage))){
      const filteredRoles = roleList.filter(r => r !== IRole.Healer);
      const randomIndex = Math.floor(Math.random() * filteredRoles.length);
      return filteredRoles[randomIndex];
    }
    else if((isTankAvailable && roleList.includes(IRole.Tank)) && (isHealerAvailable && roleList.includes(IRole.Healer)) && (!isDamageAvailable && roleList.includes(IRole.Damage))){
      const filteredRoles = roleList.filter(r => r !== IRole.Damage);
      const randomIndex = Math.floor(Math.random() * filteredRoles.length);
      return filteredRoles[randomIndex];
    }
    return IRole.INVALID;
  }

  formGroupedParty(players: IPlayer[]): IGPlayer[] {
    const groupedParty: IGPlayer[] = [];
    let tankAssigned = false;
    let healerAssigned = false;
    let damageAssigned = 0;
    let atMaxDamage = false;
    let assignedClassAndSpec: string[] = [];
    if(players && players.length === 5) {
      players.forEach(player => {
        const availableRoles = this.getAvailableRoles(player);
        let assignedRole: IRole = IRole.INVALID;

        if (availableRoles.length > 0) {
          assignedRole = this.assignRole(availableRoles, !tankAssigned, !healerAssigned, !atMaxDamage);

          if (assignedRole === IRole.Tank) {
            tankAssigned = true;
          } else if (assignedRole === IRole.Healer) {
            healerAssigned = true;
          } else if (assignedRole === IRole.Damage) {
            damageAssigned += 1;
            if (damageAssigned >= 3) {
              atMaxDamage = true;
            }
          }
        }
        if (assignedRole !== IRole.INVALID) {
          if (assignedRole === IRole.Tank) {
            assignedClassAndSpec = this.getTankSpec(player.classList.flatMap(c => c.activeSpecs)) || ["Unknown Class", "Unknown Spec"];

          } else if (assignedRole === IRole.Healer) {
            assignedClassAndSpec = this.getHealerSpec(player.classList.flatMap(c => c.activeSpecs)) || ["Unknown Class", "Unknown Spec"];
          } else if (assignedRole === IRole.Damage) {
            assignedClassAndSpec = this.getDamageSpec(player.classList.flatMap(c => c.activeSpecs)) || ["Unknown Class", "Unknown Spec"];
          }
        } else {
          assignedClassAndSpec = ["Class.INVALID", "IRole.INVALID"];
        }
        groupedParty.push({
          Role: assignedRole,
          SpecName: assignedClassAndSpec[1],
          Player: player,
          ClassName: assignedClassAndSpec[0]
        });
      });
    }

    return groupedParty;
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
            SpecName: "Do this Later"
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
        this.chosenClasses = this.formGroupedParty(players);
        this.rolledBones = true;
        }
       else {
        console.log('No players available to roll the bones for.');
      }
    });
    this.healerPicked = false;
    this.tankPicked = false;
    this.allDamagePicked = 0;
  };

}
