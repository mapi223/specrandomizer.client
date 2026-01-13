import { createAction, createReducer, on } from "@ngrx/store";
import { IClass, IPlayer } from "../RoulettePage/player-list/player/player.model";
import { IPlayerGroup, IRole } from "../RoulettePage/player-list/Configuration";
import { addPlayer, removePlayer, updatePlayerName, updatePlayerClasses, updatePlayerSpecs, setPlayerList, saveCurrentConfigurations, setCookieConsent, loadConfigurationHistory, setConfigurationHistory, setCookieConsentFromLoad } from "./RouletteActions";
import { CLASSLIST, DamageSpecs, HealerSpecs, TankSpecs } from "../RoulettePage/player-list/class-list/mock-list";

export interface IAppState {
    roulette: RouletteState,
    consentState: IRouletteFeatureState,
};

export interface RouletteState {
    consentState: any;
    numPlayers: number,
    PlayerList: IPlayer[],
    Group: IPlayerGroup[]
};

export interface IRouletteFeatureState {
    consent: boolean,
    history: IPlayer[][]
}

const initialState: RouletteState = {
    numPlayers: 0,
    PlayerList: [],
    Group: [],
    consentState: {
        consent: false,
        history: []
    }
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
            let roleList: IRole[] = [];
            if (player.id === playerId) {
                for (let i = 0; i < newClassList.length; i++) {
                    const tempSpecList = (CLASSLIST.filter(c => c.id === newClassList[i].id)[0].specs.list) || [];
                    spec.push(...tempSpecList);
                    CLASSLIST.find(c => newClassList[i].className === c.className)?.specs.list.forEach(s => {
                        if (TankSpecs.list.includes(s)) {
                            if (!roleList.includes(IRole.Tank)) {
                                roleList.push(IRole.Tank);
                            }
                            //do nothing
                        }
                        else if (HealerSpecs.list.includes(s)) {
                            if (!roleList.includes(IRole.Healer)) {
                                roleList.push(IRole.Healer);
                            }
                        }
                        else if (DamageSpecs.list.includes(s)) {
                            if (!roleList.includes(IRole.Damage)) {
                                roleList.push(IRole.Damage);
                            }
                        }
                        else {
                            roleList.push(IRole.INVALID);
                            console.log("Spec not found in any role list: ", s);
                        }
                    });
                    updatednewClassList.push({ ...newClassList[i], activeSpecs: newClassList[i].activeSpecs.filter(s => tempSpecList.includes(s)) });
                }

                return { ...player, classList: newClassList, roleList: roleList };
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
                    let newRoleList: IRole[] = []
                    for (const spec of newSpecList) {
                        if (TankSpecs.list.includes(spec)) {
                            if (!newRoleList.includes(IRole.Tank)) {
                                newRoleList.push(IRole.Tank);
                            }
                        }
                        else if (HealerSpecs.list.includes(spec)) {
                            if (!newRoleList.includes(IRole.Healer)) {
                                newRoleList.push(IRole.Healer);
                            }
                        }
                        else if (DamageSpecs.list.includes(spec)) {
                            if (!newRoleList.includes(IRole.Damage)) {
                                newRoleList.push(IRole.Damage);
                            }
                        }
                        else {
                            newRoleList.push(IRole.INVALID);
                            console.log("Spec not found in any role list: ", spec);
                        }
                    }
                    return { ...player, classList: player.classList.map((c, index) => index === classListIndex ? { ...c, activeSpecs: newSpecList } : c), roleList: newRoleList };
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
    })),
    on(setPlayerList, (state, { players }) => ({
  ...state,
  PlayerList: players,
  numPlayers: players.length
})),
on(setCookieConsent, (state, { consent }) => ({
    ...state,
    consentState: {
        ...state.consentState,
        consent: consent
    }
})),
on(setCookieConsentFromLoad, (state, { consent }) => ({
    ...state,
    consentState: {
        ...state.consentState,
        consent: consent
    }
})),
on(setConfigurationHistory, (state, { history }) => ({
    ...state,
    consentState: {
        ...state.consentState,
        history: history
    }
}))
);