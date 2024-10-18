"use client";
import dotenv from "dotenv";
dotenv.config();
import toast, { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "@coinbase/onchainkit/styles.css";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "../wagmi";
import PharmVerifyIcon from "../../public/img/PharmVerifyLogo.png";
import Head from "next/head";

// const config = getDefaultConfig({
//   appName: "PharmVerify Dapp",
//   projectId: "ba2493924d886268c979af445bdc48e8",
//   chains: [base, baseSepolia],
//   ssr: true, // If your dApp uses server side rendering (SSR)
// });

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  // const config = useWagmiConfig();
  return (
    <>
      <Head>
        <title>PharmVerify</title>
        <meta name="description" content="Welcome to PharmVerify" />
      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            apiKey="sCjIRMpZIJTfPBBay3i3wAhMirdM5qV_"
            chain={base}
          >
            <RainbowKitProvider>
              <Component {...pageProps} />
              <Toaster />
            </RainbowKitProvider>
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default App;
