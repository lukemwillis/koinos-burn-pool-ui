import { Button } from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";

interface ConnectorProps {
  onConnect?: () => void;
}

export default function KondorConnector({ onConnect }: ConnectorProps) {
  const { account, isConnecting, connect } = useAccount();

  const connectCallback = async () => {
    await connect();
    if (account && onConnect) {
      onConnect();
    }
  }

  return account ? (
    <Button
      onClick={connectCallback}
      variant="outline"
      isLoading={isConnecting}
      minWidth="unset"
      fontWeight="normal"
    >
      Connected as {account}
    </Button>
  ) : (
    <Button
      onClick={connectCallback}
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
