import React, { useContext, useState, createContext, useEffect } from "react";
import { Contract, Provider, utils } from "koilib";
import { useAccount } from "./AccountProvider";
import poolAbi from "../contract/abi/pool_abi_js.json";
import { useContracts } from "./ContractsProvider";
import useSWR, { mutate } from "swr";

// @ts-ignore koilib_types is needed when using koilib
poolAbi.koilib_types = poolAbi.types;

const SWR_KEYS = {
  POOL_KOIN: "pool_koin",
  POOL_VHP: "pool_vhp",
  ACCOUNT_KOIN: "account_koin",
  ACCOUNT_VHP: "account_vhp",
  ACCOUNT_PVHP: "account_pvhp",
  ACCOUNT_POOL: "account_pool",
};

type Balance = {
  value?: string;
  refresh: () => Promise<void>;
};

type BalancesContextType = {
  pool: {
    koin?: Balance;
    vhp?: Balance;
  };
  account: {
    koin?: Balance;
    vhp?: Balance;
    pvhp?: Balance;
    pool?: Balance;
  };
};

export const BalancesContext = createContext<BalancesContextType>({
  account: {},
  pool: {},
});

export const useBalances = () => useContext(BalancesContext);

const getTokenBalanceFetcher =
  (
    owner: string | undefined,
    contract: Contract | undefined
  ): (() => Promise<string | undefined>) =>
  async () => {
    if (!owner || !contract) return;

    const { result } = await contract!.functions.balanceOf<{
      value: string;
    }>({
      owner,
    });

    return result?.value!;
  };

export function asFloat(value: string): number {
  if (!value) return 0;
  return parseFloat(utils.formatUnits(value, 8));
}

export const BalancesProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { account } = useAccount();
  const { koin, vhp, pvhp, pool } = useContracts();

  const getPoolBalance = async (): Promise<string | undefined> => {
    if (!account || !pool) return;

    const { result } = await pool!.functions.balance_of<{
      value: string;
    }>({
      account,
    });

    return result?.value!;
  };

  return (
    <BalancesContext.Provider
      value={{
        pool: {
          koin: {
            value: useSWR(
              SWR_KEYS.POOL_KOIN,
              getTokenBalanceFetcher(
                process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR,
                koin
              )
            ).data,
            refresh: () => mutate(SWR_KEYS.POOL_KOIN),
          },
          vhp: {
            value: useSWR(
              SWR_KEYS.POOL_VHP,
              getTokenBalanceFetcher(
                process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR,
                vhp
              )
            ).data,
            refresh: () => mutate(SWR_KEYS.POOL_VHP),
          },
        },
        account: {
          koin: {
            value: useSWR(
              SWR_KEYS.ACCOUNT_KOIN,
              getTokenBalanceFetcher(account, koin)
            ).data,
            refresh: () => mutate(SWR_KEYS.ACCOUNT_KOIN),
          },
          vhp: {
            value: useSWR(
              SWR_KEYS.ACCOUNT_VHP,
              getTokenBalanceFetcher(account, vhp)
            ).data,
            refresh: () => mutate(SWR_KEYS.ACCOUNT_VHP),
          },
          pvhp: {
            value: useSWR(
              SWR_KEYS.ACCOUNT_PVHP,
              getTokenBalanceFetcher(account, pvhp)
            ).data,
            refresh: () => mutate(SWR_KEYS.ACCOUNT_PVHP),
          },
          pool: {
            value: useSWR(SWR_KEYS.ACCOUNT_POOL, getPoolBalance).data,
            refresh: () => mutate(SWR_KEYS.ACCOUNT_POOL),
          },
        },
      }}
    >
      {children}
    </BalancesContext.Provider>
  );
};
