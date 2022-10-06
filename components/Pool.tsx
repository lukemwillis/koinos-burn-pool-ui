import { Box, Flex, Grid, Spacer, Text } from "@chakra-ui/react";
import { useBalances } from "../context/BalancesProvider";
import Balance from "./Balance";
import PoolActionButton, { Actions, Tokens } from "./PoolActionButton";
import Section from "./Section";

export default function Pool() {
  const { account, pool } = useBalances();

  return (
    <Grid templateRows="auto auto" templateColumns="1fr 1fr" gap={6}>
      <Section heading="Pool Summary" colspan={2}>
        <Flex alignItems="flex-end" justifyContent="space-between">
          <Balance label="Your pVHP" tooltip="Tokens issued to your wallet by the pool" value={account.pvhp?.data} />
          <Text lineHeight={3.3}>is worth</Text>
          <Balance label="KOIN or VHP" tooltip="How much KOIN/VHP you can withdraw from the pool" value={account.pool?.data} />
        </Flex>
      </Section>
      <Section heading="Your Wallet">
        <Box>
          <Balance label="Your KOIN" tooltip="Available to deposit" value={account.koin?.data} />
          <PoolActionButton action={Actions.Deposit} token={Tokens.KOIN} />
        </Box>
        <Box marginTop={8}>
          <Balance label="Your VHP" tooltip="Available to deposit" value={account.vhp?.data} />
          <PoolActionButton action={Actions.Deposit} token={Tokens.VHP} />
        </Box>
      </Section>
      <Section heading="Pool Treasury">
        <Box>
          <Balance label="Pool KOIN" tooltip="All KOIN held by pool. Awaiting reburn, available to withdraw." value={pool.koin?.data} />
          <PoolActionButton action={Actions.Withdraw} token={Tokens.KOIN} />
        </Box>
        <Box marginTop={8}>
          <Balance label="Pool VHP" tooltip="All VHP held by pool. Currently producing blocks, available to withdraw." value={pool.vhp?.data} />
          <PoolActionButton action={Actions.Withdraw} token={Tokens.VHP} />
        </Box>
      </Section>
    </Grid>
  );
}
