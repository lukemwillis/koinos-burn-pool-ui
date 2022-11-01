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
import Logo from "../components/Logo";
import Link from "next/link";
import PoolBalancesProvider from "../context/PoolBalancesProvider";
import { useRouter } from "next/router";
import PoolStats from "../components/PoolStats";
import OutboundLink from "../components/OutboundLink";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      alignItems="center"
      padding={{ base: "2em", md: "4em", lg: "8em" }}
      gap={{ base: "4em", md: "6em" }}
    >
      <Stack direction={{ base: "column", md: "row" }} alignItems="center">
        <Logo size={{ base: "175px", md: "250px" }} />
        <Box textAlign={{ base: "center", md: "left" }}>
          <Heading as="h1" size={{ base: "3xl", md: "4xl" }} fontWeight="thin">
            Burn KOIN.
          </Heading>
          <Heading as="p" size={{ base: "3xl", md: "4xl" }} fontWeight="thin">
            Earn KOIN.
          </Heading>
          <Heading as="p" size={{ base: "3xl", md: "4xl" }} fontWeight="thin">
            Simple.
          </Heading>
        </Box>
      </Stack>

      {process.env.NEXT_PUBLIC_DISABLE_ACCESS === "true" ? (
        <a href="https://test.burnkoin.com">
          <Button
            variant="solid"
            minWidth="unset"
            fontWeight="bold"
            colorScheme="blue"
            size="lg"
          >
            Go to testnet pool
          </Button>
        </a>
      ) : (
        <>
          <Box>
            <WalletConnector
              onConnect={() => router.push("/dashboard")}
              size="lg"
              connectedVariant={
                <Link href="/dashboard">
                  <Button
                    variant="solid"
                    minWidth="unset"
                    fontWeight="bold"
                    colorScheme="blue"
                    size="lg"
                  >
                    Go to dashboard
                  </Button>
                </Link>
              }
            />
          </Box>

          <PoolBalancesProvider>
            <PoolStats />
          </PoolBalancesProvider>
        </>
      )}

      <Box textAlign="center" width={{ base: "100vw", md: "750px" }}>
        <Heading>FAQ</Heading>

        <Accordion textAlign="left">
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                What is this?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Burn Koin is the first burn pool developed for{" "}
              <OutboundLink href="https://koinos.io">Koinos</OutboundLink>.
              &quot;Burn pool&quot; is just the name we use for mining pools on
              Koinos Proof of Burn.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How does Proof of Burn work?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Proof of Burn is described in{" "}
              <OutboundLink href="https://koinos.io/unified-whitepaper">
                the Koinos whitepaper
              </OutboundLink>
              .
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Are there any fees?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Yes. The pool takes 5% of profits to cover operating costs. Your
              initial deposit amount is never touched.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Can I run my own node?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Yes! In fact, you probably should. Koinos mining is very
              accessible. You might even be able to use a computer you already
              have lying around which would make your costs effectively zero.
              You can find instructions in{" "}
              <OutboundLink href="https://docs.koinos.io">
                the official Koinos documentation
              </OutboundLink>
              .
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Who are you?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              We are Luke Willis and Kui He. Two USA-based dudes who have been
              involved with Koinos since well before mainnet. Luke handles
              development. Kui handles operations.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Is this open source?
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              Yes! You can find the source code for the smart contracts at{" "}
              <OutboundLink href="https://github.com/lukemwillis/koinos-burn-pool">
                github/koinos-burn-pool
              </OutboundLink>{" "}
              and for the website at{" "}
              <OutboundLink href="https://github.com/lukemwillis/koinos-burn-pool-ui">
                github/koinos-burn-pool-ui
              </OutboundLink>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  );
};

export default Home;
