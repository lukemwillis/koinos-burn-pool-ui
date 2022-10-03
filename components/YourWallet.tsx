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

export default function YourWallet() {
  const { state: { account, koinContract, vhpContract, pvhpContract } } = useContext(AppContext);

  const { data: koinBalance } = useSWR([account, koinContract], getBalance);
  const { data: vhpBalance } = useSWR([account, vhpContract], getBalance);
  const { data: pvhpBalance } = useSWR([account, pvhpContract], getBalance);

  return (
    <Box marginTop="4">
      {!pvhpBalance ? <Spinner /> : <Text>Your PVHP balance: {pvhpBalance}</Text>}
      {!koinBalance ? <Spinner /> : <Text>Your KOIN balance: {koinBalance}</Text>}
      {!vhpBalance ? <Spinner /> : <Text>Your VHP balance: {vhpBalance}</Text>}
    </Box>
  );
}
