import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { usePoolBalances } from "../context/PoolBalancesProvider";
import { useAccountBalances } from "../context/AccountBalancesProvider";
import Balance from "./Balance";
import PoolActionButton, { Actions, Tokens } from "./PoolActionButton";
import Section from "./Section";
import { utils } from "koilib";

export default function Dashboard() {
  const pool = usePoolBalances();
  const account = useAccountBalances();

  return (
    <Grid
      templateRows="auto auto auto"
      templateColumns="1fr 1fr"
      columnGap={12}
      rowGap={6}
    >
      <Section heading="Pool Summary" colspan={2}>
        <Flex alignItems="flex-end" justifyContent="space-between">
          <Balance
            label="Your pVHP"
            tooltip="Tokens issued to your wallet by the pool"
            value={account.pvhp?.data}
          />
          <Text lineHeight={2}>is worth</Text>
          <Balance
            label="KOIN or VHP"
            tooltip="How much KOIN/VHP you can withdraw from the pool"
            value={account.pool?.data}
          />
        </Flex>
      </Section>
      <Section heading="Your Wallet">
        <Box>
          <Balance
            label="Your KOIN"
            tooltip={`${utils.formatUnits(
              account.mana?.data || "0",
              8
            )} liquid and available to deposit. You will need to leave a small buffer in your wallet to pay the mana for depositing.`}
            value={account.koin?.data}
          />
          <PoolActionButton action={Actions.Deposit} token={Tokens.KOIN} />
        </Box>
        <Box marginTop={8}>
          <Balance
            label="Your VHP"
            tooltip="Available to deposit"
            value={account.vhp?.data}
          />
          <PoolActionButton action={Actions.Deposit} token={Tokens.VHP} />
        </Box>
      </Section>
      <Section heading="Pool Treasury">
        <Box>
          <Balance
            label="Pool KOIN"
            tooltip={`All KOIN held by pool and awaiting reburn. ${utils.formatUnits(
              pool.mana?.data || "0",
              8
            )} is liquid and available to withdraw minus a pool enforced 10 KOIN buffer to pay mana for block production.`}
            value={pool.koin?.data}
          />
          <PoolActionButton action={Actions.Withdraw} token={Tokens.KOIN} />
        </Box>
        <Box marginTop={8}>
          <Balance
            label="Pool VHP"
            tooltip="All VHP held by pool. Currently producing blocks, available to withdraw."
            value={pool.vhp?.data}
          />
          <PoolActionButton action={Actions.Withdraw} token={Tokens.VHP} />
        </Box>
      </Section>
      <Section heading="Governance Proposals" colspan={2}>
        Coming soon...
      </Section>
    </Grid>
  );
}
