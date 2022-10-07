import "../styles/globals.css";
import "@fontsource/prompt";
import "@fontsource/prompt/200.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AccountProvider } from "../context/AccountProvider";
import { RpcProvider } from "../context/RpcProvider";
import { SwrProvider } from "../context/SwrProvider";
import theme from "../styles/theme";
import { ContractsProvider } from "../context/ContractsProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SwrProvider>
        <RpcProvider>
          <AccountProvider>
            <ContractsProvider>
              <Component {...pageProps} />
            </ContractsProvider>
          </AccountProvider>
        </RpcProvider>
      </SwrProvider>
    </ChakraProvider>
  );
}

export default MyApp;
