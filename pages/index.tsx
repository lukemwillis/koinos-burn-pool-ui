import type { NextPage } from "next";
import {
  Accordion,
  AccordionItem,
  Box,
  Button,
  AccordionButton,
  Flex,
  Heading,
  Stack,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import WalletConnector from "../components/KondorConnector";
import { useAccount } from "../context/AccountProvider";
import Logo from "../components/Logo";
import Link from "next/link";
import PoolBalancesProvider from "../context/PoolBalancesProvider";
import { useRouter } from "next/router";
import PoolStats from "../components/PoolStats";

const Home: NextPage = () => {
  const router = useRouter();
  const { account } = useAccount();

  return (
    <Flex direction="column" alignItems="center" minHeight="100vh" padding="20" gap={20}>
      <Stack direction="row" alignItems="center">
        <Logo size="256px" />
        <Box textAlign="left">
          <Heading as="h1" size="4xl" fontWeight="thin">
            Burn KOIN.
          </Heading>
          <Heading as="p" size="4xl" fontWeight="thin">
            Earn KOIN.
          </Heading>
          <Heading as="p" size="4xl" fontWeight="thin">
            Simple.
          </Heading>
        </Box>
      </Stack>

      <Box marginBottom="5vh">
        {!account ? (
          <WalletConnector onConnect={() => router.push("/dashboard")} />
        ) : (
          <Link href="/dashboard">
            <Button
              variant="solid"
              minWidth="unset"
              fontWeight="bold"
              colorScheme="blue"
            >
              Go to dashboard
            </Button>
          </Link>
        )}
      </Box>

      <PoolBalancesProvider>
        <PoolStats />
      </PoolBalancesProvider>

      <Box textAlign="center" width="750px">
        <Heading>FAQ</Heading>

        <Accordion textAlign="left">
          <AccordionItem>
            <AccordionButton>
              <Box flex="1">What is this?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Burn Koin is the first burn pool developed for <Link href="https://koinos.io" target="_blank">Koinos</Link>. &quot;Burn pool&quot; is just the name we use for mining pools on Koinos Proof of Burn.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1">How does Proof of Burn work?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Proof of Burn is described in <Link href="https://koinos.io/unified-whitepaper" target="_blank">the Koinos whitepaper</Link>.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1">Are there any fees?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Yes. The pool takes 5% of profits to cover operating costs. Your initial deposit amount is never touched.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1">Can I run my own node?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Yes! In fact, you probably should. Koinos mining is very accessible. You might even be able to use a computer you already have lying around which would make your costs effectively zero. You can find instructions in <Link href="https://docs.koinos.io" target="_blank">the official Koinos documentation</Link>.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1">Who are you?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              We are Luke Willis and Kui He. Two USA-based dudes who have been involved with Koinos since well before mainnet. Luke handles development. Kui handles operations.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1">Is this open source?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Yes! You can find the source code for the smart contracts at <Link href="https://github.com/lukemwillis/koinos-burn-pool" target="_blank">github/koinos-burn-pool</Link> and for the website at <Link href="https://github.com/lukemwillis/koinos-burn-pool-ui" target="_blank">github/koinos-burn-pool-ui</Link>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  );
};

export default Home;
