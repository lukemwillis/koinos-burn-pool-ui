import React, {
  useContext,
  createContext,
} from "react";
import { useContracts } from "./ContractsProvider";
import useSWR, { SWRResponse } from "swr";
import { getManaBalanceFetcher, getTokenBalanceFetcher } from "./BalanceUtils";

const SWR_KEYS = {
  POOL_KOIN: "pool_koin",
  POOL_VHP: "pool_vhp",
  POOL_MANA: "pool_mana"
};

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
  const { koin, vhp, provider } = useContracts();

  return (
    <BalancesContext.Provider value={{
        koin: useSWR(
          SWR_KEYS.POOL_KOIN,
          getTokenBalanceFetcher(process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR, koin)
        ),
        vhp: useSWR(
          SWR_KEYS.POOL_VHP,
          getTokenBalanceFetcher(process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR, vhp)
        ),
        mana: useSWR(
          SWR_KEYS.POOL_MANA,
          getManaBalanceFetcher(process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR, provider)
        )
    }}>
      {children}
    </BalancesContext.Provider>
  );
};

export default PoolBalancesProvider;