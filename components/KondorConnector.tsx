import { Button, Tooltip } from "@chakra-ui/react";
import { useAccount } from "../context/AccountProvider";
import { createAvatar } from "@dicebear/avatars";
import * as identiconStyle from "@dicebear/avatars-identicon-sprites";

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

  const identicon = createAvatar(identiconStyle, { seed: account });

  return account ? (
    connectedVariant || (
      <Tooltip label={account} placement="bottom" hasArrow>
        <Button
          onClick={connectCallback}
          variant="outline"
          isLoading={isConnecting}
          minWidth="unset"
          fontWeight="normal"
          size={size}
        >
          <span
            dangerouslySetInnerHTML={{ __html: identicon }}
            style={{
              display: "block",
              width: "18px",
              height: "18px",
              marginRight: "10px",
            }}
          />{" "}
          {account.substring(0, 4)}...{account.substring(account.length - 4)}
        </Button>
      </Tooltip>
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
