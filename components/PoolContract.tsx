import { useContext } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { AppContext } from "../context/AppContext";
import { Contract, utils } from "koilib";

export async function getBalance(
  owner: string,
  contract: Contract
): Promise<string | undefined> {
  if (contract) {
    const { result: balanceOfResult } =
      await contract!.functions.balanceOf<{ value: string }>({
        owner,
      });

    return utils.formatUnits(balanceOfResult?.value!, 8);
  }

  return undefined;
}

export async function getPoolBalance(
  account: string,
  contract: Contract
): Promise<string | undefined> {
  if (contract) {
    const { result: balanceOfResult } =
      await contract!.functions.balance_of<{ value: string }>({
        account,
      });

    return utils.formatUnits(balanceOfResult?.value!, 8);
  }

  return undefined;
}

export default function PoolContract() {
  const { state: { account, koinContract, vhpContract, poolContract } } = useContext(AppContext);

  const { data: koinBalance } = useSWR([process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR, koinContract], getBalance);
  const { data: vhpBalance } = useSWR([process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR, vhpContract], getBalance);
  const { data: poolBalance } = useSWR([account, poolContract], getPoolBalance);

  return (
    <Box marginTop="4">
      {!poolBalance ? <Spinner /> : <Text>Your share of pool balance: {poolBalance}</Text>}
      {!koinBalance ? <Spinner /> : <Text>Pool KOIN balance: {koinBalance}</Text>}
      {!vhpBalance ? <Spinner /> : <Text>Pool VHP balance: {vhpBalance}</Text>}
    </Box>
  );
}
