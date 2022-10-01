import type { NextPage } from "next";
import { Box, Flex } from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import Nav from "../components/Nav";
import { useContext } from "react";

import Pool from "../components/Pool";
import WalletConnector from "../components/KondorConnector";

const Home: NextPage = () => {
  const {
    state: { connected },
  } = useContext(AppContext);

  return (
    <Box>
      <Nav />
      <Flex
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        flexDirection="column"
      >
        {!connected ? <WalletConnector /> : <Pool />}
      </Flex>
    </Box>
  );
};

export default Home;
