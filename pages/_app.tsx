import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AccountProvider } from "../context/AccountProvider";
import { RpcProvider } from "../context/RpcProvider";
import { SwrProvider } from "../context/SwrProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SwrProvider>
        <AccountProvider>
          <RpcProvider>
            <Component {...pageProps} />
          </RpcProvider>
        </AccountProvider>
      </SwrProvider>
    </ChakraProvider>
  );
}

export default MyApp;
