import { createSelector } from "@ngrx/store";
import { IPlayer } from "../RoulettePage/player-list/player/player.model";
import { IAppState, RouletteState } from "./RouletteReducers";

export const selectRouletteState = createSelector(
    (state: { roulette: RouletteState }) => state.roulette,
    (roulette: RouletteState) => roulette
);

export const selectPlayerById = createSelector(
    (state: IAppState) => state.roulette.PlayerList,
    (playerList: IPlayer[], props: { playerId: number }) => {
        return playerList.find((player: IPlayer) => player.id === props.playerId);
    }
);

export const selectListOfPlayers = createSelector(
    (state: IAppState) => state.roulette.PlayerList,
    (playerList) => playerList
);

export const selectNumberOfPlayers = createSelector(
    (state: IAppState) => state.roulette.numPlayers,
    (numPlayers) => numPlayers
);

export const selectPlayerGroups = createSelector(
    (state: IAppState) => state.roulette.Group,
    (groups) => groups
);

export const selectPlayerSpecs = createSelector(
    (state: IAppState) => state.roulette.PlayerList,
    (playerList: IPlayer[], props: { playerId: number }) => {
        const player = playerList.find((p: IPlayer) => p.id === props.playerId);
        return player ? player.SpecList : [];
    }
);

export const selectPlayerName = createSelector(
    (state: IAppState, props: { playerId: number }) => state.roulette.PlayerList.find((p: IPlayer) => p.id === props.playerId),
    (player, props: { playerId: number }) => player ? player.PlayerName : `Player ${props.playerId}`
);

export const selectAllPlayerNames = createSelector(
    (state: IAppState) => state.roulette.PlayerList,
    (playerList) => playerList.map((player: IPlayer) => player.PlayerName)
);

export const selectCompleteState = createSelector(
    (state: IAppState) => state.roulette,
    (roulette) => roulette
);

