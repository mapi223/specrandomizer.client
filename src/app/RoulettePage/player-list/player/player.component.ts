import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IClassDetails } from '../class-list/classDetails';
import { IPlayer } from './player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  @Input() isLoading!: boolean;
  @Input() playerId!: number;
  @Input() playerData!: IPlayer;

  player: IPlayer = { id: 0, SpecList: [], PlayerName: "" };

  @Output() sendPlayerDetails = new EventEmitter<IPlayer>();

  ngOnChanges() {
    if (this.playerData) {
      this.player = {
        ...this.playerData,
        id: this.playerId
      };
    } else {
      this.player = { id: this.playerId, SpecList: [], PlayerName: "Player " + this.playerId };
    }
  }

  inputPlayerSelection(eventList: IClassDetails[]) {
    if (!eventList || eventList.length === 0) {
      this.player.SpecList = [];
    } else {
      this.player.SpecList = eventList
        .filter(event => event && event.id !== undefined) // Ensure objects exist
        .map(event => event.id);
    }

    this.sendPlayerDetails.emit(this.player);
  }
}




