import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import { kondorConnect } from "../context/AppActions";

export default function KondorConnector() {
  const {
    state,
    dispatch,
  } = useContext(AppContext);

  const connectClick = async () => {
    await kondorConnect(dispatch, state);
  };

  return (
    <Button
      onClick={connectClick}
      variant="outline"
      isLoading={state.connecting}
      minWidth="unset"
    >
      {state.connected ? `Connected as ${state.account}` : "Connect with Kondor"}
    </Button>
  );
}
