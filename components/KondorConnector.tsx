import { Button } from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";

interface ConnectorProps {
  onConnect?: () => void;
  size?: string;
  connectedVariant?: JSX.Element;
}

export default function KondorConnector({
  onConnect,
  size = "md",
  connectedVariant,
}: ConnectorProps) {
  const { account, isConnecting, connect } = useAccount();

  const connectCallback = async () => {
    await connect();
    if (onConnect) {
      onConnect();
    }
  };

  return account ? (
    connectedVariant || (
      <Button
        onClick={connectCallback}
        variant="outline"
        isLoading={isConnecting}
        minWidth="unset"
        fontWeight="normal"
        size={size}
      >
        Connected as {account.substring(0, 4)}...{account.substring(account.length - 4)}
      </Button>
    )
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
