export interface IPlayer {
  id: number;
  classList: IClass[];
  PlayerName: string;
}


export interface IClass {
  id: number;
  className: string;
  activeSpecs: string[];
};