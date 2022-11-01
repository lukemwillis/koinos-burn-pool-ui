import type { NextPage } from "next";
import { Box, Button } from "@chakra-ui/react";

import DashboardComponent from "../components/Dashboard";
import WalletConnector from "../components/KondorConnector";
import { useAccount } from "../context/AccountProvider";
import Header from "../components/Header";
import AccountBalancesProvider from "../context/AccountBalancesProvider";
import PoolBalancesProvider from "../context/PoolBalancesProvider";

const Dashboard: NextPage = () => {
  const { account } = useAccount();

  return (
    <Box minHeight="100vh">
      {process.env.NEXT_PUBLIC_DISABLE_ACCESS === "true" ? (
        <Box marginTop="40vh" textAlign="center">
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
        </Box>
      ) : !account ? (
        <Box marginTop="40vh" textAlign="center">
          <WalletConnector />
        </Box>
      ) : (
        <Box padding={8} margin="auto" width="1024px">
          <PoolBalancesProvider>
            <AccountBalancesProvider>
              <Header />
              <DashboardComponent />
            </AccountBalancesProvider>
          </PoolBalancesProvider>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
