import { Button } from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";

export default function KondorConnector() {
  const { account, isConnecting, connect } = useAccount();

  return (
    <Button
      onClick={connect}
      variant="outline"
      isLoading={isConnecting}
      minWidth="unset"
    >
      {account ? `Connected as ${account}` : "Connect with Kondor"}
    </Button>
  );
}
