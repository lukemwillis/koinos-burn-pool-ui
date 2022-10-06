import { Box, Flex, useColorModeValue, Stack, Heading } from "@chakra-ui/react";
import WalletConnector from "./KondorConnector";
import ColorModeToggle from "./ColorModeToggle";
import RpcSelector from "./RpcSelector";
import Image from "next/image";

export default function Nav() {
  return (
    <Box bg={useColorModeValue("gray.300", "gray.700")} px={4}>
      <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction="row">
          <Image
            src="/burnkoin.svg"
            alt="Burn Koin Logo"
            width="64px"
            height="64px"
          />
          <Heading as="h2" size="lg" lineHeight="4rem" fontWeight="thin">
            Burn Koin
          </Heading>
        </Stack>

        <Stack direction={"row"} spacing={7}>
          <WalletConnector />
          <RpcSelector />
          <ColorModeToggle />
        </Stack>
      </Flex>
    </Box>
  );
}
