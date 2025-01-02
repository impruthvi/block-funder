"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { useConnectWalletModal } from "@/hooks/use-connect-wallet-modal";
import AvailableWallets from "./available-wallets";

export const ConnectWalletModal = () => {
  const { isOpen, setIsOpen } = useConnectWalletModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <AvailableWallets />
    </ResponsiveModal>
  );
};
