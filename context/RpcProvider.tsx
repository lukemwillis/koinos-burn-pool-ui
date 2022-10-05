import React, {
  SetStateAction,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";

const LOCAL_STORAGE_KEY = "RPC";

type RpcContextType = {
  rpc?: string;
  setRpc: React.Dispatch<SetStateAction<string | undefined>>;
};

export const RpcContext = createContext<RpcContextType>({
  rpc: "",
  setRpc: () => undefined,
});

export const useRpc = () => useContext(RpcContext);

export const RpcProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [rpc, setRpc] = useState(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved || process.env.NEXT_PUBLIC_KOINOS_RPC_URL!;
  });

  useEffect(() => {
    if (!rpc || typeof window === "undefined") return;
    localStorage.setItem(LOCAL_STORAGE_KEY, rpc);
  }, [rpc])

  return (
    <RpcContext.Provider value={{ rpc, setRpc }}>
      {children}
    </RpcContext.Provider>
  );
};
