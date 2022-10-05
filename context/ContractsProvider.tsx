import React, { useContext, useState, createContext, useEffect } from "react";
import { Contract, Provider, utils } from "koilib";
import * as kondor from "../node_modules/kondor-js/lib/browser";
import { useAccount } from "./AccountProvider";
import { useRpc } from "./RpcProvider";
import poolAbi from "../contract/abi/pool_abi_js.json";

// @ts-ignore koilib_types is needed when using koilib
poolAbi.koilib_types = poolAbi.types;

type ContractsContextType = {
  koin?: Contract;
  vhp?: Contract;
  pvhp?: Contract;
  pool?: Contract;
};

export const ContractsContext = createContext<ContractsContextType>({});

export const useContracts = () => useContext(ContractsContext);

export const ContractsProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { account } = useAccount();
  const { rpc } = useRpc();

  const [contracts, setContracts] = useState<ContractsContextType>({});

  useEffect(() => {
    if (!account || !rpc) return;

    const provider = new Provider(rpc);
    const signer = kondor.getSigner(account);

    setContracts({
      koin: new Contract({
        id: process.env.NEXT_PUBLIC_KOIN_CONTRACT_ADDR,
        abi: utils.tokenAbi,
        provider: provider,
        // @ts-ignore the signer provided is compatible
        signer: signer,
      }),
      vhp: new Contract({
        id: process.env.NEXT_PUBLIC_VHP_CONTRACT_ADDR,
        abi: utils.tokenAbi,
        provider: provider,
        // @ts-ignore the signer provided is compatible
        signer: signer,
      }),
      pvhp: new Contract({
        id: process.env.NEXT_PUBLIC_PVHP_CONTRACT_ADDR,
        abi: utils.tokenAbi,
        provider: provider,
        // @ts-ignore the signer provided is compatible
        signer: signer,
      }),
      pool: new Contract({
        id: process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR,
        // @ts-ignore the abi provided is compatible
        abi: poolAbi,
        provider: provider,
        // @ts-ignore the signer provided is compatible
        signer: signer,
      }),
    });
  }, [account, rpc]);

  return (
    <ContractsContext.Provider value={contracts}>
      {children}
    </ContractsContext.Provider>
  );
};
