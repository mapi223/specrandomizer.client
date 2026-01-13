import { createAction, props } from "@ngrx/store";
import { IClassDetails } from "../RoulettePage/player-list/class-list/classDetails";
import { IClass, IPlayer } from "../RoulettePage/player-list/player/player.model";

export const addPlayer = createAction('[Roulette] Add Player');
export const removePlayer = createAction('[Roulette] Remove Player');
export const assignRoles = createAction('[Roulette] Assign Roles');
export const resetRoulette = createAction('[Roulette] Reset Roulette');
export const updatePlayerName = createAction(
    '[Roulette] Update Player Name',
    props<{ playerId: number, newName: string }>()
);
export const updatePlayerClasses = createAction(
    '[Roulette] Update Player Classes',
    props<{ playerId: number, newClassList: IClass[] }>()
);
export const updatePlayerSpecs = createAction(
    '[Roulette] Update Player Specs',
    props<{ playerId: number, newSpecList: string[], classId: number }>()
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
export const loadConfigurationHistory = createAction('[Roulette] Load Configuration History');
export const saveCurrentConfigurations = createAction('[Roulette] Save Current Configurations');
export const getShortNameForSelectedSpecs = createAction(
    '[Roulette] Get Short Name For Selected Specs',
    (playerId: number) => ({ playerId })
);
export const setCookieConsent = createAction(
    '[Roulette] Set Cookie Consent',
    (consent: boolean) => ({ consent })
);

export const setCookieConsentFromLoad = createAction(
    '[Roulette] Set Cookie Consent From Load',
    (consent: boolean) => ({ consent })
);

export const setPlayerList = createAction(
  '[Roulette] Set Player List',
  props<{ players: IPlayer[] }>()
);

export const setConfigurationHistory = createAction(
  '[Roulette] Set Configuration History',
  props<{ history: IPlayer[][] }>()
);

export const clearConfigurationHistory = createAction(
  '[Roulette] Clear Configuration History'
);

export const saveCookieConsent = createAction(
    '[Roulette] Save Cookie Consent',
    (consent: boolean) => ({ consent })
);

export const loadCookieConsent = createAction(
    '[Roulette] Load Cookie Consent'
);


