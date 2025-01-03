import { useReadContract } from "wagmi";
import { useQuery } from "@tanstack/react-query";

import { abi, CONTRACT_ADDRESS } from "@/lib/contract";
import { titleToSlug } from "@/lib/utils";

export const useGetCampaignBySlug = ({ slug }: { slug: string }) => {
  const { data } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getCampaigns",
  });

  const query = useQuery({
    queryKey: ["campaign", "slug"],
    queryFn: async () => {
      if (!data) return null;

      const campaigns = data as Campaign[];

      return campaigns.find((campaign) => slug === titleToSlug(campaign.title));
    },
    enabled: !!data,
  });

  return query;
};
