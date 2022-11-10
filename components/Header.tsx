import { Flex, Stack } from "@chakra-ui/react";
import WalletConnector from "./KondorConnector";
import Logo from "./Logo";
import Link from "next/link";
import SettingsDrawer from "./SettingsDrawer";

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
      <Stack direction={"row"} spacing={{ base: 4, md: 7 }}>
        <WalletConnector />
        <SettingsDrawer />
      </Stack>
    </Flex>
  );
}
