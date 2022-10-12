import React, { useContext, createContext } from "react";
import { useAccount } from "./AccountProvider";
import poolAbi from "../contract/abi/pool_abi_js.json";
import { SWRResponse } from "swr";
import {
  useKoinBalance,
  useVhpBalance,
  usePvhpBalance,
  usePoolBalance,
  useManaBalance,
} from "./BalanceUtils";

// @ts-ignore koilib_types is needed when using koilib
poolAbi.koilib_types = poolAbi.types;

type BalancesContextType = {
  koin?: SWRResponse;
  vhp?: SWRResponse;
  pvhp?: SWRResponse;
  pool?: SWRResponse;
  mana?: SWRResponse;
};

export const BalancesContext = createContext<BalancesContextType>({});

export const useAccountBalances = () => useContext(BalancesContext);

const AccountBalancesProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { account } = useAccount();

  const balances = {
    koin: useKoinBalance(account!),
    vhp: useVhpBalance(account!),
    pvhp: usePvhpBalance(account!),
    pool: usePoolBalance(account!),
    mana: useManaBalance(account!),
  };

  return (
    <BalancesContext.Provider value={balances}>
      {children}
    </BalancesContext.Provider>
  );
};

export default AccountBalancesProvider;
