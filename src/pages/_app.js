import dotenv from "dotenv";
dotenv.config();
import toast, { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { OnchainKitProvider } from "@coinbase/onchainkit";
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
import { wagmiConfig } from "../wagmi";

// import { TOKEN_ICO_Provider } from "../context/index";

const config = getDefaultConfig({
  appName: "PharmVerify Dapp",
  projectId: "ba2493924d886268c979af445bdc48e8",
  chains: [base, baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <OnchainKitProvider
              client={queryClient}
              apiKey={"QVnPT0XROesIx8BFkjAETLpULlnb6rxG"}
              chain={baseSepolia}
            >
              <Component {...pageProps} />
              <Toaster />
            </OnchainKitProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default App;
