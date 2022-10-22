import React, { useContext, useState, createContext, useEffect } from "react";
import * as kondor from "../node_modules/kondor-js/lib/browser";

const LOCAL_STORAGE_KEY = "ACCOUNT";

type AccountContextType = {
  account?: string;
  isConnecting: boolean;
  connect: () => Promise<boolean>;
};

export const AccountContext = createContext<AccountContextType>({
  isConnecting: false,
  connect: async () => false,
});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isConnecting, setIsConnecting] = useState(false);

  const [account, setAccount] = useState<string | undefined>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setAccount(saved);
    }
  }, []);

  useEffect(() => {
    if (!account) return;
    localStorage.setItem(LOCAL_STORAGE_KEY, account);
  }, [account]);

  const connect = async () => {
    setIsConnecting(true);
    // @ts-ignore getAccounts returns objects, not strings
    const [{ address }] = await Promise.race([
      kondor.getAccounts(),
      new Promise<{address:string}[]>((resolve) => setTimeout(() => resolve([{ address: "" }]), 10000))
    ]);
    if (address) setAccount(address);
    setIsConnecting(false);

    return !!address;
  };

  return (
    <AccountContext.Provider value={{ account, isConnecting, connect }}>
      {children}
    </AccountContext.Provider>
  );
};
