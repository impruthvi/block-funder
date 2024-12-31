import { http, createConfig } from 'wagmi'
import { base, mainnet, seiDevnet } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, base, seiDevnet],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [seiDevnet.id]: http(),
  },
})