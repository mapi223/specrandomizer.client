import { createSelector } from "@ngrx/store";
import { IPlayer } from "../RoulettePage/player-list/player/player.model";
import { IAppState, RouletteState } from "./RouletteReducers";
import { state } from "@angular/animations";

export const selectRouletteState = createSelector(
    (state: { roulette: RouletteState }) => state.roulette,
    (roulette: RouletteState) => roulette
);

export const selectPlayerById = (state: IAppState, props: { playerId: number }) => {
    if (props.playerId === undefined || props.playerId === null) {
        return null;
    }
    return state.roulette.PlayerList.find((p: IPlayer) => p.id === props.playerId);
};

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

export const selectPlayerClasses = createSelector(
    selectPlayerById,
    (player) => {
        if (player?.classList === undefined || player?.classList === null) {
            return [];
        }
        else {
            return player.classList;
        }
    }
);

export const selectPlayerSpecs = createSelector(
    selectPlayerById,
    (player) => {
        const playerSpecs = player ? player.classList.flatMap(c => c.activeSpecs) : [];
        return player ? playerSpecs : [];
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
)

export const selectCookieConsent = createSelector(
    (state: IAppState) => state.roulette.consentState,
    (consentState) => consentState.consent
)

export const selectSavedGroups = createSelector(
    (state: IAppState) => state.roulette.consentState,
    (consentState) => consentState.history
)

