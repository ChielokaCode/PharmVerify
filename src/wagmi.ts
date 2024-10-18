import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [baseSepolia],
  multiInjectedProviderDiscovery: false,
  connectors: [coinbaseWallet({ appName: "PharmVerify", preference: "all" })],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(
      "https://api.developer.coinbase.com/rpc/v1/base-sepolia/sCjIRMpZIJTfPBBay3i3wAhMirdM5qV_"
    ),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
