import { ChangeEvent, useState } from "react";
import { Select, Input } from "@chakra-ui/react";
import { useRpc } from "../context/RpcProvider";

export default function RpcSelector() {
  const { rpc, setRpc } = useRpc();
  const [customRpcSelected, setCustomRpcSelected] = useState(
    rpc && !process.env.NEXT_PUBLIC_KOINOS_RPC_URL?.includes(rpc)
  );

  const onRpcSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "custom") {
      setRpc("");
      setCustomRpcSelected(true);
    } else {
      setRpc(e.target.value);
    }
  };

  return customRpcSelected ? (
    // TODO debounce
    <Input
      autoFocus
      value={rpc}
      onChange={(e) => setRpc(e.target.value)}
      placeholder="https://..."
    />
  ) : (
    <Select onChange={onRpcSelect} defaultValue={rpc}>
      {process.env.NEXT_PUBLIC_KOINOS_RPC_URL?.split(",").map((url) => (
        <option key={url} value={url}>
          {url}
        </option>
      ))}
      <option value="custom">Enter your own RPC endpoint...</option>
    </Select>
  );
}
