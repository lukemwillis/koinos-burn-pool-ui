import React, { useContext, createContext } from "react";
import { useAccount } from "./AccountProvider";
import poolAbi from "../contract/abi/pool_abi_js.json";
import { useContracts } from "./ContractsProvider";
import useSWR, { SWRResponse } from "swr";
import { getPoolBalanceFetcher, getTokenBalanceFetcher } from "./BalanceUtils";

// @ts-ignore koilib_types is needed when using koilib
poolAbi.koilib_types = poolAbi.types;

const SWR_KEYS = {
  ACCOUNT_KOIN: "account_koin",
  ACCOUNT_VHP: "account_vhp",
  ACCOUNT_PVHP: "account_pvhp",
  ACCOUNT_POOL: "account_pool",
};

type BalancesContextType = {
  koin?: SWRResponse;
  vhp?: SWRResponse;
  pvhp?: SWRResponse;
  pool?: SWRResponse;
};

export const BalancesContext = createContext<BalancesContextType>({});

export const useAccountBalances = () => useContext(BalancesContext);

const AccountBalancesProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { account } = useAccount();
  const { koin, vhp, pvhp, pool } = useContracts();

  return (
    <BalancesContext.Provider
      value={{
        koin: useSWR(
          SWR_KEYS.ACCOUNT_KOIN,
          getTokenBalanceFetcher(account, koin)
        ),
        vhp: useSWR(SWR_KEYS.ACCOUNT_VHP, getTokenBalanceFetcher(account, vhp)),
        pvhp: useSWR(
          SWR_KEYS.ACCOUNT_PVHP,
          getTokenBalanceFetcher(account, pvhp)
        ),
        pool: useSWR(
          SWR_KEYS.ACCOUNT_POOL,
          getPoolBalanceFetcher(account, pool)
        ),
      }}
    >
      {children}
    </BalancesContext.Provider>
  );
};

export default AccountBalancesProvider;