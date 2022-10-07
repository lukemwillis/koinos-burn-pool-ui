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

        <Accordion>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">What is this?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Burn Koin is the first burn pool developed for Koinos.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">Who are you?</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Luke and Kui.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  );
};

export default Home;
