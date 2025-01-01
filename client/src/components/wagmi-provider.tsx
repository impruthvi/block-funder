"use client";
import React from "react";
import { State, WagmiProvider } from "wagmi";
import { config } from "@/lib/config";

interface WagmiProviderProps {
  children: React.ReactNode;
  initialState: State | undefined;
}

export const WagmiCustomProvider = ({
  children,
  initialState,
}: WagmiProviderProps) => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
};
