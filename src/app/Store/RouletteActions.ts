import { createAction, props } from "@ngrx/store";
import { IClassDetails } from "../RoulettePage/player-list/class-list/classDetails";

export const addPlayer = createAction('[Roulette] Add Player');
export const removePlayer = createAction('[Roulette] Remove Player');
export const assignRoles = createAction('[Roulette] Assign Roles');
export const resetRoulette = createAction('[Roulette] Reset Roulette');
export const updatePlayerName = createAction(
    '[Roulette] Update Player Name',
    (playerId: number, newName: string) => ({ playerId, newName })
);
export const updatePlayerSpecs = createAction(
    '[Roulette] Update Player Specs',
    props<{ playerId: number, newSpecList: number[] }>()
);
export const setLoadingState = createAction(
    '[Roulette] Set Loading State',
    (isLoading: boolean) => ({ isLoading })
);
export const setErrorState = createAction(
    '[Roulette] Set Error State',
    (errorMessage: string | null) => ({ errorMessage })
);
export const fetchClassDetails = createAction('[Roulette] Fetch Class Details');
export const fetchClassDetailsSuccess = createAction(
    '[Roulette] Fetch Class Details Success',
    (classDetails: IClassDetails[]) => ({ classDetails })
);
export const fetchClassDetailsFailure = createAction(
    '[Roulette] Fetch Class Details Failure',
    (error: string) => ({ error })
);
export const finalizePlayerConfigurations = createAction('[Roulette] Finalize Player Configurations');
export const startRoulette = createAction('[Roulette] Start Roulette');
export const completeRoulette = createAction('[Roulette] Complete Roulette');
export const resetPlayerConfigurations = createAction('[Roulette] Reset Player Configurations');
export const loadPreviousConfigurations = createAction('[Roulette] Load Previous Configurations');
export const saveCurrentConfigurations = createAction('[Roulette] Save Current Configurations');
export const getShortNameForSelectedSpecs = createAction(
    '[Roulette] Get Short Name For Selected Specs',
    (playerId: number) => ({ playerId })
);
