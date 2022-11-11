import { Box, Flex, Grid, Progress, Stack, Text } from "@chakra-ui/react";
import { usePoolBalances } from "../context/PoolBalancesProvider";
import { useAccountBalances } from "../context/AccountBalancesProvider";
import Balance from "./Balance";
import PoolActionButton, { Actions, Tokens } from "./PoolActionButton";
import Section from "./Section";
import { utils } from "koilib";
import ManaOrb from "./ManaOrb";
import { asFloat } from "../context/BalanceUtils";

export default function BasicDashboard() {
  const pool = usePoolBalances();
  const account = useAccountBalances();

  return (
    <Flex alignItems="center" justifyContent="center">
      <Section>
        <Box marginBottom="2em">
          <Flex direction="row" alignItems="end" justifyContent="space-between">
            <Balance label="Your Deposits" value={account.pool?.data} />
            <ManaOrb
              percent={
                Math.min(
                  asFloat(pool.mana?.data),
                  asFloat(account.pool?.data)
                ) / asFloat(account.pool?.data)
              }
            />
          </Flex>
          <PoolActionButton action={Actions.Withdraw} token={Tokens.KOIN} />
        </Box>
        <Box>
          <Flex direction="row" alignItems="end" justifyContent="space-between">
            <Balance label="Your KOIN" value={account.koin?.data} />
            <ManaOrb
              percent={
                asFloat(account.mana?.data) / asFloat(account.koin?.data)
              }
            />
          </Flex>
          <PoolActionButton action={Actions.Deposit} token={Tokens.KOIN} />
        </Box>
      </Section>
    </Flex>
  );
}
