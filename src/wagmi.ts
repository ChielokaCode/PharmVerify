// import { getDefaultConfig } from '@rainbow-me/rainbowkit';
// import {
//   arbitrum,
//   base,
//   mainnet,
//   optimism,
//   polygon,
//   sepolia,
// } from 'wagmi/chains';

// export const config = getDefaultConfig({
//   appName: 'RainbowKit App',
//   projectId: 'YOUR_PROJECT_ID',
//   chains: [
//     mainnet,
//     polygon,
//     optimism,
//     arbitrum,
//     base,
//     ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
//   ],
//   ssr: true,
// });

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: "PharmVerify",
      preference: "all", // set this to `all` to use EOAs as well
      version: "4",
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});
