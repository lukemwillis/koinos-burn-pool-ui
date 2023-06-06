import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Contract, Provider, Signer, utils } from "koilib";
import * as kondor from "../node_modules/kondor-js/lib/browser";
import { useAccount } from "./AccountProvider";
import { useRpc } from "./RpcProvider";
import poolAbi from "../contract/abi/pool_abi.json";
import nameServiceAbi from "../contract/abi/name_service_abi.json";

type ContractsContextType = {
  provider?: Provider;
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
  const [koinAddress, setKoinAddress] = useState();
  const [vhpAddress, setVhpAddress] = useState();

  const provider = useMemo(() => new Provider(rpc!), [rpc]);
  const signer = account ? (kondor.getSigner(account) as Signer) : undefined;

  useEffect(() => {
    const nameService = new Contract({
      id: process.env.NEXT_PUBLIC_NAME_SERVICE_CONTRACT_ADDR,
      abi: nameServiceAbi,
      provider,
      signer,
    });

    nameService.functions.get_address({ name: "koin" }).then(({ result }) => {
      setKoinAddress(result!.value.address);
    });

    nameService.functions.get_address({ name: "vhp" }).then(({ result }) => {
      setVhpAddress(result!.value.address);
    });
  }, [provider, signer]);

  return (
    <ContractsContext.Provider
      value={{
        provider: provider,
        koin: koinAddress
          ? new Contract({
              id: koinAddress,
              abi: utils.tokenAbi,
              provider: provider,
              signer: signer,
            })
          : undefined,
        vhp: vhpAddress
          ? new Contract({
              id: vhpAddress,
              abi: utils.tokenAbi,
              provider: provider,
              signer: signer,
            })
          : undefined,
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
