import { ChangeEvent, useEffect, useState } from "react";
import { Select, Input } from "@chakra-ui/react";
import { useRpc } from "../context/RpcProvider";

const KOINOS_BLOCKS_URL = "https://api.koinosblocks.com";
const KOINOS_URL = "https://api.koinos.io";

export default function RpcSelector() {
  const { rpc, setRpc } = useRpc();
  const [customRpcSelected, setCustomRpcSelected] = useState(
    rpc !== KOINOS_BLOCKS_URL && rpc !== KOINOS_URL
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
      <option value="https://api.koinosblocks.com">api.koinosblocks.com</option>
      <option value="https://api.koinos.io">api.koinos.io</option>
      <option value="custom">Enter your own RPC endpoint...</option>
    </Select>
  );
}
