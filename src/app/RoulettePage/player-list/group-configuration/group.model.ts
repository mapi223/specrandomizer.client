import { IRole } from "../Configuration";
import { IPlayer } from "../player/player.model";


export interface IGPlayer {
  Role: IRole;
  SpecName: string;
  ClassName: string;
  Player: IPlayer;
}
