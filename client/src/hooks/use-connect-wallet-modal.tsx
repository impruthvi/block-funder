import { useQueryState, parseAsBoolean } from "nuqs";

export const useConnectWalletModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "connect-wallet",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
