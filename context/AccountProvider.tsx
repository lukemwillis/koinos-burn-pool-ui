import React, { useContext, useState, createContext, useEffect } from "react";
import * as kondor from "../node_modules/kondor-js/lib/browser";

const LOCAL_STORAGE_KEY = "ACCOUNT";

type AccountContextType = {
  account?: string;
  isConnecting: boolean;
  connect: () => Promise<void>;
};

export const AccountContext = createContext<AccountContextType>({
  isConnecting: false,
  connect: async () => undefined,
});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isConnecting, setIsConnecting] = useState(false);

  const [account, setAccount] = useState(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved || undefined;
  });

  useEffect(() => {
    if (!account || typeof window === "undefined") return;
    localStorage.setItem(LOCAL_STORAGE_KEY, account);
  }, [account]);

  const connect = async () => {
    setIsConnecting(true);
    // @ts-ignore getAccounts returns objects, not strings
    const [{ address }] = await kondor.getAccounts();
    setAccount(address);
    setIsConnecting(false);
  };

  return (
    <AccountContext.Provider value={{ account, isConnecting, connect }}>
      {children}
    </AccountContext.Provider>
  );
};
