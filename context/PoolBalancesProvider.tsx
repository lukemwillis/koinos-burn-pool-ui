import React, { useContext, createContext } from "react";
import { SWRResponse } from "swr";
import {
  useKoinBalance,
  useManaBalance,
  useVhpBalance,
} from "./BalanceUtils";

type BalancesContextType = {
  koin?: SWRResponse;
  vhp?: SWRResponse;
  mana?: SWRResponse;
};

export const BalancesContext = createContext<BalancesContextType>({});

export const usePoolBalances = () => useContext(BalancesContext);

const PoolBalancesProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const balances = {
    koin: useKoinBalance(process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR!),
    vhp: useVhpBalance(process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR!),
    mana: useManaBalance(process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR!)
  };

  return (
    <BalancesContext.Provider value={balances}>
      {children}
    </BalancesContext.Provider>
  );
};

export default PoolBalancesProvider;
