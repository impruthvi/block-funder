import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { base, mainnet, seiDevnet } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, base, seiDevnet],
  connectors: [injected(), metaMask()],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [seiDevnet.id]: http(),
  },
});
