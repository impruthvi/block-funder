"use client";

import React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "@/config";

interface WagmiProviderProps {
  children: React.ReactNode;
}

export const WagmiCustomProvider = ({ children }: WagmiProviderProps) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};
