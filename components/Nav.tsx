import { Box, Flex, useColorModeValue, Stack, Heading } from "@chakra-ui/react";
import WalletConnector from "./KondorConnector";
import ColorModeToggle from "./ColorModeToggle";
import RpcSelector from "./RpcSelector";

export default function Nav() {
  return (
    <Box bg={useColorModeValue("gray.300", "gray.700")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Heading as="h3" size="md">
          Burn Koin
        </Heading>

        <Stack direction={"row"} spacing={7}>
          <WalletConnector />
          <RpcSelector />
          <ColorModeToggle />
        </Stack>
      </Flex>
    </Box>
  );
}
