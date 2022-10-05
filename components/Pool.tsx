import { Grid } from "@chakra-ui/react";
import { useBalances } from "../context/BalancesProvider";
import Balance from "./Balance";
import PoolActionButton, { Actions, Tokens } from "./PoolActionButton";
import Section from "./Section";

export default function Pool() {
  const { account, pool } = useBalances();

  return (
    <Grid
      templateRows='1fr 2fr'
      templateColumns='1fr 1fr'
      gap={6}
    >
      <Section heading="Pool summary" colspan={2}>
        <Balance label="Your Value" value={account.pool?.value} />
        <Balance label="Your pVHP" value={account.pvhp?.value} />
      </Section>
      <Section heading="Your wallet">
        <Balance label="Your KOIN" value={account.koin?.value} />
        <PoolActionButton action={Actions.Deposit} token={Tokens.KOIN} />
        <Balance label="Your VHP" value={account.vhp?.value} />
        <PoolActionButton action={Actions.Deposit} token={Tokens.VHP} />
      </Section>
      <Section heading="pool treasury">
        <Balance label="Pool KOIN" value={pool.koin?.value} />
        <PoolActionButton action={Actions.Withdraw} token={Tokens.KOIN} />
        <Balance label="Pool VHP" value={pool.vhp?.value} />
        <PoolActionButton action={Actions.Withdraw} token={Tokens.VHP} />
      </Section>
    </Grid>
  );
}
