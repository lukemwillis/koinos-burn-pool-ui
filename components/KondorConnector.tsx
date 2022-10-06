import { Button } from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";

export default function KondorConnector() {
  const { account, isConnecting, connect } = useAccount();

  return account ? (
    <Button
      onClick={connect}
      variant="outline"
      isLoading={isConnecting}
      minWidth="unset"
      fontWeight="normal"
    >
      Connected as {account}
    </Button>
  ) : (
    <Button
      onClick={connect}
      variant="solid"
      isLoading={isConnecting}
      minWidth="unset"
      fontWeight="bold"
      colorScheme="blue"
    >
      Connect with Kondor
    </Button>
  );
}
