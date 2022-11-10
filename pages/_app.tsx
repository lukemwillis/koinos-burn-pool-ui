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
import Head from "next/head";
import { ExperienceModeProvider } from "../context/ExperienceModeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SwrProvider>
        <RpcProvider>
          <AccountProvider>
            <ContractsProvider>
              <ExperienceModeProvider>
                <Head>
                  <title>Burn Koin</title>
                  <meta
                    name="viewport"
                    content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
                  />
                </Head>
                <Component {...pageProps} />
              </ExperienceModeProvider>
            </ContractsProvider>
          </AccountProvider>
        </RpcProvider>
      </SwrProvider>
    </ChakraProvider>
  );
}

export default MyApp;
