import { createAction, createReducer, on } from "@ngrx/store";
import { IPlayer } from "../RoulettePage/player-list/player/player.model";
import { IPlayerGroup } from "../RoulettePage/player-list/Configuration";
import { addPlayer, removePlayer, updatePlayerName, updatePlayerSpecs } from "./RouletteActions";

export interface IAppState {
    roulette: RouletteState
};

export interface RouletteState{
    numPlayers: number,
    PlayerList: IPlayer[],
    Group: IPlayerGroup[]
};

const initialState: RouletteState = {
    numPlayers: 0,
    PlayerList: [],
    Group: []
};


export const rouletteReducer = createReducer(
    initialState,
    on(addPlayer,(state) => ({
        ...state,
        numPlayers: state.numPlayers + 1,
        PlayerList: [...state.PlayerList, {id: state.numPlayers + 1, PlayerName: `Player ${state.numPlayers + 1}`, SpecList: []}]
    })),
    on((removePlayer), (state) => ({
        ...state,
        numPlayers: state.numPlayers - 1,
        PlayerList: state.PlayerList.filter(player => player.id !== state.numPlayers)   
    })),
    on((updatePlayerSpecs), (state, { playerId, newSpecList }) => ({
        ...state,
        PlayerList: state.PlayerList.map(player =>  {
            if (player.id === playerId) {
                return { ...player, SpecList: newSpecList };
            }
            return player;
        })
    })),
    on((updatePlayerName), (state, { playerId, newName}) => ({
        ...state,
        PlayerList: state.PlayerList.map(player => {
            if (player.id === playerId) {
                return {...player, PlayerName: newName}
            }
            return player;
        })
    })));