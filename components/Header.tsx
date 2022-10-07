import { Flex, Stack } from "@chakra-ui/react";
import WalletConnector from "./KondorConnector";
import ColorModeToggle from "./ColorModeToggle";
import RpcSelector from "./RpcSelector";
import Logo from "./Logo";
import Link from "next/link";

export default function Header() {
  return (
    <Flex
      h={20}
      alignItems={"center"}
      justifyContent={"space-between"}
      marginBottom={12}
    >
      <Link href="/">
        <a>
          <Logo size="64px" />
        </a>
      </Link>
      <Stack direction={"row"} spacing={7}>
        <WalletConnector />
        <RpcSelector />
        <ColorModeToggle />
      </Stack>
    </Flex>
  );
}
