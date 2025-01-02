"use client";
import { useGetCampaigns } from "@/api/use-get-all-campaign";
import Campaigns from "@/components/campaigns";

export default function Home() {
  const { data: campaigns, isLoading } = useGetCampaigns();

  if (!campaigns) return null;

  return (
    <Campaigns
      title="All Campaigns"
      campaigns={campaigns}
      isLoading={isLoading}
    />
  );
}
