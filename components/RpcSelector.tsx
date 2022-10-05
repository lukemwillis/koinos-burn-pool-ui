import { ChangeEvent, useState } from "react";
import { Select, Input } from "@chakra-ui/react";
import { useRpc } from "../context/RpcProvider";

export default function RpcSelector() {
  const {rpc, setRpc} = useRpc();
  const [customRpcSelected, setCustomRpcSelected] = useState(false);

  const onRpcSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "koinosblocks":
        setRpc("https://api.koinosblocks.com");
        break;
      case "koinosio":
        setRpc("https://api.koinos.io");
        break;
      case "custom":
        setRpc("");
        setCustomRpcSelected(true);
        break;
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
    <Select onChange={onRpcSelect}>
      <option value="koinosblocks">api.koinosblocks.com</option>
      <option value="koinosio">api.koinos.io</option>
      <option value="custom">Enter your own RPC endpoint...</option>
    </Select>
  );
}
