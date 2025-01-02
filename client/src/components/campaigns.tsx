"use client";

import React from "react";
import FundCard from "./fund-card";
import { Loader2 } from "lucide-react";
import { useGetCampaigns } from "@/api/use-get-all-campaign";
interface CampaignsProps {
  title: string;
}

const Campaigns = ({ title }: CampaignsProps) => {
  const { data: campaigns, isLoading } = useGetCampaigns();

  if(!campaigns) return null;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center w-full min-h-[200px]">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (campaigns.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center w-full min-h-[200px] space-y-4 text-center">
          <p className="text-zinc-400 text-lg">No campaigns found</p>
          <p className="text-zinc-500 text-sm">
            Create your first campaign to get started
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {campaigns.map((campaign) => (
          <FundCard key={crypto.randomUUID()} {...campaign} />
        ))}
      </div>
    );
  };

  return (
    <section className="space-y-6" aria-label={`${title} Campaigns Section`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          {title}
          <span className="ml-2 text-sm text-zinc-400">
            ({campaigns.length})
          </span>
        </h2>
      </div>

      {renderContent()}
    </section>
  );
};

export default Campaigns;
