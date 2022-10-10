import { Button } from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";

interface ConnectorProps {
  onConnect?: () => void;
  size?: string;
}

export default function KondorConnector({ onConnect, size = "md" }: ConnectorProps) {
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
      size={size}
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
      size={size}
    >
      Connect with Kondor
    </Button>
  );
}
