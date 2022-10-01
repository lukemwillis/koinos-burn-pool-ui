import React from "react";

import * as kondor from "../node_modules/kondor-js/lib/browser";
import { Contract, Provider, utils } from "koilib";

import poolAbi from "../contract/abi/pool_abi_js.json";
import { AppState } from "./AppReducer";

// @ts-ignore koilib_types is needed when using koilib
poolAbi.koilib_types = poolAbi.types;

export type AppActions =
  | Connecting
  | Connected
  | Disconnected
  | OpenWallet
  | SelectRpc
  | ConfigureContracts
  | Error;

export enum ActionType {
  Connecting,
  Connected,
  Disconnected,
  OpenWallet,
  SelectRpc,
  ConfigureContracts,
  Error,
}

type Connecting = {
  type: ActionType.Connecting;
};

type Connected = {
  type: ActionType.Connected;
};

type Disconnected = {
  type: ActionType.Disconnected;
};

type OpenWallet = {
  type: ActionType.OpenWallet;
  payload: {
    account: string;
  };
};

type SelectRpc = {
  type: ActionType.SelectRpc;
  payload: {
    rpc: string;
  };
};

type ConfigureContracts = {
  type: ActionType.ConfigureContracts;
  payload: {
    vhpContract: Contract;
    koinContract: Contract;
    pvhpContract: Contract;
    poolContract: Contract;
  };
};

type Error = { type: ActionType.Error };

export const connecting = (): Connecting => ({
  type: ActionType.Connecting,
});

export const connected = (): Connected => ({
  type: ActionType.Connected,
});

export const disconnected = (): Disconnected => ({
  type: ActionType.Disconnected,
});

export const openWallet = (account: string): OpenWallet => ({
  type: ActionType.OpenWallet,
  payload: {
    account,
  },
});

export const selectRpc = (rpc: string): SelectRpc => ({
  type: ActionType.SelectRpc,
  payload: {
    rpc,
  },
});

export const configureContracts = (
  vhpContract: Contract,
  koinContract: Contract,
  pvhpContract: Contract,
  poolContract: Contract
): ConfigureContracts => ({
  type: ActionType.ConfigureContracts,
  payload: {
    vhpContract,
    koinContract,
    pvhpContract,
    poolContract,
  },
});

export const error = (): Error => ({
  type: ActionType.Error,
});

export const kondorConnect = async (
  dispatch: React.Dispatch<AppActions>,
  state: AppState
): Promise<void> => {
  dispatch(connecting());

  try {
    const [account] = await kondor.getAccounts();
    // @ts-ignore getAccounts returns objects, not strings
    const address: string = account.address;
    dispatch(openWallet(address));

    loadContracts(dispatch, address, state.rpc);

    dispatch(connected());
  } catch (e) {
    console.error(e);
    dispatch(error());
  }
};

export const changeRpc = async (
  dispatch: React.Dispatch<AppActions>,
  state: AppState,
  rpc: string
): Promise<void> => {
  dispatch(connecting());

  try {
    dispatch(selectRpc(rpc));

    if (state.account) {
      loadContracts(dispatch, state.account, rpc);
      dispatch(connected());
    } else {
      dispatch(disconnected());
    }
  } catch (e) {
    console.error(e);
    dispatch(error());
  }
};

export const loadContracts = async (
  dispatch: React.Dispatch<AppActions>,
  account: string,
  rpc: string
): Promise<void> => {
  try {
    const provider = new Provider(rpc);
    const signer = kondor.getSigner(account);

    const vhpContract = new Contract({
      id: process.env.NEXT_PUBLIC_VHP_CONTRACT_ADDR,
      abi: utils.tokenAbi,
      provider: provider,
      // @ts-ignore the signer provided is compatible
      signer: signer,
    });

    const koinContract = new Contract({
      id: process.env.NEXT_PUBLIC_KOIN_CONTRACT_ADDR,
      abi: utils.tokenAbi,
      provider: provider,
      // @ts-ignore the signer provided is compatible
      signer: signer
    });

    const pvhpContract = new Contract({
      id: process.env.NEXT_PUBLIC_PVHP_CONTRACT_ADDR,
      abi: utils.tokenAbi,
      provider: provider,
      // @ts-ignore the signer provided is compatible
      signer: signer
    });

    const poolContract = new Contract({
      id: process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR,
      // @ts-ignore the abi provided is compatible
      abi: poolAbi,
      provider: provider,
      // @ts-ignore the signer provided is compatible
      signer: signer
    });

    dispatch(
      configureContracts(vhpContract, koinContract, pvhpContract, poolContract)
    );
  } catch (e) {
    console.error(e);
    dispatch(error());
  }
};