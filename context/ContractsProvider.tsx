import React, { useContext, useState, createContext, useEffect } from "react";
import { Contract, Provider, Signer, utils } from "koilib";
import * as kondor from "../node_modules/kondor-js/lib/browser";
import { useAccount } from "./AccountProvider";
import { useRpc } from "./RpcProvider";
import poolAbiJson from "../contract/abi/pool_abi_js.json";
import { Spinner } from "@chakra-ui/react";
import { Abi } from "koilib/lib/interface";

const poolAbi: Abi = {
  koilib_types: poolAbiJson.types,
  ...poolAbiJson
};

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

  const provider = new Provider(rpc!);
  const signer = account ? kondor.getSigner(account) as Signer : undefined;

  return (
    <ContractsContext.Provider
      value={{
        koin: new Contract({
          id: process.env.NEXT_PUBLIC_KOIN_CONTRACT_ADDR,
          abi: utils.tokenAbi,
          provider: provider,
          signer: signer,
        }),
        vhp: new Contract({
          id: process.env.NEXT_PUBLIC_VHP_CONTRACT_ADDR,
          abi: utils.tokenAbi,
          provider: provider,
          signer: signer,
        }),
        pvhp: new Contract({
          id: process.env.NEXT_PUBLIC_PVHP_CONTRACT_ADDR,
          abi: utils.tokenAbi,
          provider: provider,
          signer: signer,
        }),
        pool: new Contract({
          id: process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR,
          abi: poolAbi,
          provider: provider,
          signer: signer,
        }),
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};
