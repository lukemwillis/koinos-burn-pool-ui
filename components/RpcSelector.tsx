import { ChangeEvent, useContext, useState, useEffect } from "react";
import { Select, Input } from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import { changeRpc } from "../context/AppActions";

export default function RpcSelector() {
  const { dispatch, state } = useContext(AppContext);
  const [customRpcSelected, setCustomRpcSelected] = useState(false);
  const [customRpc, setCustomRpc] = useState("");

  const onRpcSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "koinosblocks":
        changeRpc(dispatch, state, "https://api.koinosblocks.com");
        break;
      case "koinosio":
        changeRpc(dispatch, state, "https://api.koinos.io");
        break;
      case "custom":
        setCustomRpcSelected(true);
        break;
    }
  };

  useEffect(() => {
    if (customRpcSelected && customRpc !== state.rpc) {
      changeRpc(dispatch, state, customRpc);
    }
  }, [customRpcSelected, customRpc, state, dispatch]);

  return customRpcSelected ? (
    // TODO debounce
    <Input
      autoFocus
      value={customRpc}
      onChange={(e) => setCustomRpc(e.target.value)}
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
