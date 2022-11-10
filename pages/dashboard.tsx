import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";

import AdvancedDashboard from "../components/AdvancedDashboard";
import WalletConnector from "../components/KondorConnector";
import { useAccount } from "../context/AccountProvider";
import Header from "../components/Header";
import AccountBalancesProvider from "../context/AccountBalancesProvider";
import PoolBalancesProvider from "../context/PoolBalancesProvider";
import { useExperienceMode } from "../context/ExperienceModeProvider";
import BasicDashboard from "../components/BasicDashboard";

const Dashboard: NextPage = () => {
  const { account } = useAccount();
  const { experienceMode } = useExperienceMode();

  return (
    <Box minHeight="100vh">
      {!account ? (
        <Box marginTop="40vh" textAlign="center">
          <WalletConnector />
        </Box>
      ) : (
        <Box padding={{ base: 4, md: 8 }} margin="auto" maxWidth="1024px">
          <PoolBalancesProvider>
            <AccountBalancesProvider>
              <Header />
              {experienceMode === "basic" ? (
                <BasicDashboard />
              ) : (
                <AdvancedDashboard />
              )}
            </AccountBalancesProvider>
          </PoolBalancesProvider>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
