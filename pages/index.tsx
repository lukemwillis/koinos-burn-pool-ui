import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import Nav from "../components/Nav";

import Pool from "../components/Pool";
import WalletConnector from "../components/KondorConnector";
import { useAccount } from "../context/AccountProvider";
import { BalancesProvider } from "../context/BalancesProvider";
import { ContractsProvider } from "../context/ContractsProvider";

const Home: NextPage = () => {
  const { account } = useAccount();

  return (
    <Box minHeight="100vh">
      <Nav />
      {!account ? (
        <Box marginTop="40vh" textAlign="center">
          <WalletConnector />
        </Box>
      ) : (
        <Box padding={8} margin="auto" width="1024px">
          <ContractsProvider>
            <BalancesProvider>
              <Pool />
            </BalancesProvider>
          </ContractsProvider>
        </Box>
      )}
    </Box>
  );
};

export default Home;
