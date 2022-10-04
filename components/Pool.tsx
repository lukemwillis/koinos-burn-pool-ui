import { useContext } from "react";
import {
  Box,
  Stack,
  ButtonGroup,
  Flex,
  Grid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useSWR from "swr";
import { AppContext } from "../context/AppContext";
import { Contract, utils } from "koilib";
import PoolActionButton from "./PoolActionButton";

export async function getBalance(
  owner: string,
  contract: Contract
): Promise<string | undefined> {
  if (contract) {
    const { result: balanceOfResult } = await contract!.functions.balanceOf<{
      value: string;
    }>({
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
    const { result: balanceOfResult } = await contract!.functions.balance_of<{
      value: string;
    }>({
      account,
    });

    return utils.formatUnits(balanceOfResult?.value!, 8);
  }

  return undefined;
}

export default function Pool() {
  const {
    state: { account, koinContract, pvhpContract, vhpContract, poolContract },
  } = useContext(AppContext);

  const { data: yourPoolBalance } = useSWR(
    [account, poolContract],
    getPoolBalance
  );
  const { data: yourPvhpBalance } = useSWR([account, pvhpContract], getBalance);
  const { data: yourKoinBalance } = useSWR([account, koinContract], getBalance);
  const { data: yourVhpBalance } = useSWR([account, vhpContract], getBalance);

  const { data: poolKoinBalance } = useSWR(
    [process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR, koinContract],
    getBalance
  );
  const { data: poolVhpBalance } = useSWR(
    [process.env.NEXT_PUBLIC_POOL_CONTRACT_ADDR, vhpContract],
    getBalance
  );

  return (
    <Grid>
      <Box
        borderWidth="thin"
        borderColor="gray.300"
        borderRadius="lg"
        padding="4"
        margin="4"
      >
        <Text>Your share of pool balance:</Text>
        {!yourPoolBalance ? (
          <Spinner />
        ) : (
          <Text fontSize="6xl">{yourPoolBalance}</Text>
        )}
        {!yourPvhpBalance ? (
          <Spinner />
        ) : (
          <Text fontSize="xs">{yourPvhpBalance} pVHP</Text>
        )}
      </Box>
      <Box
        borderWidth="thin"
        borderColor="gray.300"
        borderRadius="lg"
        padding="4"
        margin="4"
      >
        <Flex alignItems="center" gap={12}>
          <Stack>
            <Text>Your KOIN balance:</Text>
            {!yourKoinBalance ? (
              <Spinner />
            ) : (
              <Text fontSize="4xl">{yourKoinBalance}</Text>
            )}
          </Stack>
          <ButtonGroup
            gap={4}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <PoolActionButton action="deposit_koin" />
            <PoolActionButton action="withdraw_koin" />
          </ButtonGroup>
          <Stack>
            <Text>Pool KOIN balance:</Text>
            {!poolKoinBalance ? (
              <Spinner />
            ) : (
              <Text fontSize="4xl">{poolKoinBalance}</Text>
            )}
          </Stack>
        </Flex>
      </Box>
      <Box
        borderWidth="thin"
        borderColor="gray.300"
        borderRadius="lg"
        padding="4"
        margin="4"
      >
        <Flex alignItems="center" gap={12}>
          <Stack>
            <Text>Your VHP balance:</Text>
            {!yourVhpBalance ? (
              <Spinner />
            ) : (
              <Text fontSize="4xl">{yourVhpBalance}</Text>
            )}
          </Stack>
          <ButtonGroup
            gap={4}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <PoolActionButton action="deposit_vhp" />
            <PoolActionButton action="withdraw_vhp" />
          </ButtonGroup>
          <Stack>
            <Text>Pool VHP balance:</Text>
            {!poolVhpBalance ? (
              <Spinner />
            ) : (
              <Text fontSize="4xl">{poolVhpBalance}</Text>
            )}
          </Stack>
        </Flex>
      </Box>
    </Grid>
  );
}
