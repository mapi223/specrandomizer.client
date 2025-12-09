import { IRole } from "../Configuration";

export interface IPlayer {
  id: number;
  classList: IClass[];
  PlayerName: string;
  roleList?: IRole[];
}


export interface IClass {
  id: number;
  className: string;
  activeSpecs: string[];
};
