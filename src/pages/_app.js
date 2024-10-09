import dotenv from "dotenv";
dotenv.config();
import toast, { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  baseSepolia,
  holesky,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// import { TOKEN_ICO_Provider } from "../context/index";

const config = getDefaultConfig({
  appName: "PharmVerify Dapp",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains: [baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {/* <TOKEN_ICO_Provider> */}
            <Component {...pageProps} />
            <Toaster />
            {/* </TOKEN_ICO_Provider> */}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
