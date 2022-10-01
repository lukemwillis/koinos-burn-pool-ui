import { Contract } from "koilib";
import { AppActions, ActionType } from "./AppActions";

export interface AppState {
  account: string;
  rpc: string;
  connecting: boolean;
  connected: boolean;
  error: boolean;
  vhpContract: Contract | undefined;
  koinContract: Contract | undefined;
  pvhpContract: Contract | undefined;
  poolContract: Contract | undefined;
}

export const initialAppState: AppState = {
  account: "",
  rpc: process.env.NEXT_PUBLIC_KOINOS_RPC_URL!,
  connecting: false,
  connected: false,
  error: false,
  vhpContract: undefined,
  koinContract: undefined,
  pvhpContract: undefined,
  poolContract: undefined,
};

export const AppReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case ActionType.Connecting:
      return { ...state, connecting: true };
    case ActionType.Connected:
      return {
        ...state,
        connecting: false,
        connected: true,
      };
    case ActionType.Disconnected:
      return {
        ...state,
        connecting: false,
        connected: false,
      };
    case ActionType.OpenWallet:
      return {
        ...state,
        account: action.payload.account,
      };
    case ActionType.SelectRpc:
      return {
        ...state,
        rpc: action.payload.rpc,
      };
    case ActionType.ConfigureContracts:
      return {
        ...state,
        vhpContract: action.payload.vhpContract,
        koinContract: action.payload.koinContract,
        pvhpContract: action.payload.pvhpContract,
        poolContract: action.payload.poolContract,
      };
    case ActionType.Error:
      return { ...state, error: true, connecting: false };
    default:
      return state;
  }
};
