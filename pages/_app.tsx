import "../styles/globals.css";
import "@fontsource/prompt";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AccountProvider } from "../context/AccountProvider";
import { RpcProvider } from "../context/RpcProvider";
import { SwrProvider } from "../context/SwrProvider";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
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
