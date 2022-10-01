import { useContext } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import useSWR from "swr";
import { AppContext } from "../context/AppContext";
import { Contract, utils } from "koilib";

export async function getBalance(
  owner: string,
  koinContract: Contract
): Promise<string | undefined> {
  if (koinContract) {
    const { result: balanceOfResult } =
      await koinContract!.functions.balanceOf<{ value: string }>({
        owner,
      });

    return utils.formatUnits(balanceOfResult?.value!, 8);
  }

  return undefined;
}

export default function Balance() {
  const { state } = useContext(AppContext);

  const { account, koinContract } = state;

  const { data: balance } = useSWR([account, koinContract], getBalance);

  return (
    <Box marginTop="4">
      {!balance ? <Spinner /> : <Text>Koin balance: {balance}</Text>}
    </Box>
  );
}
