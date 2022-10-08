import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";

import Dashboard from "../components/Dashboard";
import WalletConnector from "../components/KondorConnector";
import { useAccount } from "../context/AccountProvider";
import Header from "../components/Header";
import AccountBalancesProvider from "../context/AccountBalancesProvider";
import PoolBalancesProvider from "../context/PoolBalancesProvider";

const Home: NextPage = () => {
  const { account } = useAccount();

  return (
    <Box minHeight="100vh">
      {!account ? (
        <Box marginTop="40vh" textAlign="center">
          <WalletConnector />
        </Box>
      ) : (
        <Box padding={8} margin="auto" width="1024px">
          <PoolBalancesProvider>
            <AccountBalancesProvider>
              <Header />
              <Dashboard />
            </AccountBalancesProvider>
          </PoolBalancesProvider>
        </Box>
      )}
    </Box>
  );
};

export default Home;