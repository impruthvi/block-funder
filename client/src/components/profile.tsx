"use client";
import { Loader2 } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";

import Campaigns from "./campaigns";
import { Button } from "./ui/button";
import { useGetCampaignsByOwner } from "@/api/use-get-campaign-by-owner";

const Profile = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: campaigns, isLoading } = useGetCampaignsByOwner({
    owner: address ?? "",
  });

  if (!campaigns) return null;

  if (isConnecting) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isDisconnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-zinc-400">
          Please connect your wallet to view your profile
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="text-sm text-zinc-400">
            Connected:{" "}
            {address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "No wallet connected"}
          </p>
        </div>
        <Button
          variant="destructive"
          onClick={() => disconnect()}
          className="px-4 py-2"
        >
          Disconnect Wallet
        </Button>
      </div>

      <Campaigns
        title="Your Campaigns"
        campaigns={campaigns}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Profile;
