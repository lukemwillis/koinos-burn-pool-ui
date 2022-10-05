import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AccountProvider } from "../context/AccountProvider";
import { RpcProvider } from "../context/RpcProvider";
import { ContractsProvider } from "../context/ContractsProvider";
import { BalancesProvider } from "../context/BalancesProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AccountProvider>
        <RpcProvider>
          <ContractsProvider>
            <BalancesProvider>
              <Component {...pageProps} />
            </BalancesProvider>
          </ContractsProvider>
        </RpcProvider>
      </AccountProvider>
    </ChakraProvider>
  );
}

export default MyApp;
