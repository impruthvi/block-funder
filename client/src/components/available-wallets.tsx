import { useConnect } from "wagmi";
import { Button } from "./ui/button";

const AvailableWallets = () => {
  const { connectors, connect } = useConnect();

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Select a Wallet
      </h2>
      <div className="w-full space-y-3">
        {connectors.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className="w-full px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md transition duration-200"
          >
            {connector.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AvailableWallets;
