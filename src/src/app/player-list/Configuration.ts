import { IPlayer } from "../player/player.model";


export interface IConfiguration {
  configurationId: number;
  userId: number;
  players: any[];
}
export interface IRoleAssignment {
  playerId: number,
  playerName: string,
  specName: string;
}

export interface ISpecialization {
  ClassId: number;
  Role: IRole;
  SpecName: string;
}

export enum IRole {
  Tank,
  Healer,
  Damage,
  INVALID
}
