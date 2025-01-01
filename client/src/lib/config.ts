import { createClient } from "viem";
import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  connectors: [injected(), metaMask()],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [sepolia.id]: http(),
  },
});

export const client = createClient({
  chain: sepolia,
  transport: http(),
});
