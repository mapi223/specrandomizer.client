import { createAction, createReducer, on } from "@ngrx/store";
import { IClass, IPlayer } from "../RoulettePage/player-list/player/player.model";
import { IPlayerGroup } from "../RoulettePage/player-list/Configuration";
import { addPlayer, removePlayer, updatePlayerName, updatePlayerClasses, updatePlayerSpecs } from "./RouletteActions";
import { CLASSLIST } from "../RoulettePage/player-list/class-list/mock-list";

export interface IAppState {
    roulette: RouletteState
};

export interface RouletteState {
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
    on(addPlayer, (state) => ({
        ...state,
        numPlayers: state.numPlayers + 1,
        PlayerList: [...state.PlayerList, { id: state.numPlayers + 1, PlayerName: `Player ${state.numPlayers + 1}`, classList: [] }]
    })),
    on((removePlayer), (state) => ({
        ...state,
        numPlayers: state.numPlayers - 1,
        PlayerList: state.PlayerList.filter(player => player.id !== state.numPlayers)
    })),
    on((updatePlayerClasses), (state, { playerId, newClassList: newClassList }) => ({
        ...state,
        PlayerList: state.PlayerList.map(player => {

            let spec: string[] = [];
            let updatednewClassList: IClass[] = [];
            if (player.id === playerId) {
                for (let i = 0; i < newClassList.length; i++) {
                    const tempSpecList = (CLASSLIST.filter(c => c.id === newClassList[i].id)[0].specs.shortName) || [];
                    spec.push(...tempSpecList);
                    updatednewClassList.push({ ...newClassList[i], activeSpecs: newClassList[i].activeSpecs.filter(s => tempSpecList.includes(s)) });
                }

                return { ...player, classList: newClassList };
            }
            return player;
        })
    })),
    on((updatePlayerSpecs), (state, { playerId, newSpecList, classId }) => ({
        ...state,
        PlayerList: state.PlayerList.map(player => {
            if (player.id === playerId) {
                const classListIndex = player.classList.findIndex(c => c.id === classId);
                if (classListIndex !== -1) {
                    return { ...player, classList: player.classList.map((c, index) => index === classListIndex ? { ...c, activeSpecs: newSpecList } : c) };
                }
            }
            return player;

        })
    })),
    on((updatePlayerName), (state, { playerId, newName }) => ({
        ...state,
        PlayerList: state.PlayerList.map(player => {
            if (player.id === playerId) {
                return { ...player, PlayerName: newName }
            }
            return player;
        })
    })));