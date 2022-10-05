import type { NextPage } from "next";
import { Box, Flex } from "@chakra-ui/react";
import Nav from "../components/Nav";

import Pool from "../components/Pool";
import WalletConnector from "../components/KondorConnector";
import { useAccount } from "../context/AccountProvider";

const Home: NextPage = () => {
  const { account } = useAccount();

  return (
    <Box>
      <Nav />
      <Flex
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        flexDirection="column"
      >
        {!account ? <WalletConnector /> : <Pool />}
      </Flex>
    </Box>
  );
};

export default Home;
