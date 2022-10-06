import React, {
  useContext,
  createContext,
} from "react";
import { Contract, utils } from "koilib";
import { useAccount } from "./AccountProvider";
import poolAbi from "../contract/abi/pool_abi_js.json";
import { useContracts } from "./ContractsProvider";
import useSWR, { SWRResponse } from "swr";

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

type BalancesContextType = {
  pool: {
    koin?: SWRResponse;
    vhp?: SWRResponse;
  };
  account: {
    koin?: SWRResponse;
    vhp?: SWRResponse;
    pvhp?: SWRResponse;
    pool?: SWRResponse;
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

const getPoolBalanceFetcher =
  (
    account: string | undefined,
    pool: Contract | undefined
  ): (() => Promise<string | undefined>) =>
  async () => {
    if (!account || !pool) return;

    const { result } = await pool!.functions.balance_of<{
      value: string;
    }>({
      account,
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

  return (
    <BalancesContext.Provider value={{
      pool: {
        koin: useSWR(
          SWR_KEYS.POOL_KOIN!,
          getTokenBalanceFetcher(process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR, koin)
        ),
        vhp: useSWR(
          SWR_KEYS.POOL_VHP,
          getTokenBalanceFetcher(process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR, vhp)
        ),
      },
      account: {
        koin: useSWR(
          SWR_KEYS.ACCOUNT_KOIN,
          getTokenBalanceFetcher(account, koin)
        ),
        vhp: useSWR(SWR_KEYS.ACCOUNT_VHP, getTokenBalanceFetcher(account, vhp)),
        pvhp: useSWR(
          SWR_KEYS.ACCOUNT_PVHP,
          getTokenBalanceFetcher(account, pvhp)
        ),
        pool: useSWR(SWR_KEYS.ACCOUNT_POOL, getPoolBalanceFetcher(account, pool)),
      },
    }}>
      {children}
    </BalancesContext.Provider>
  );
};
