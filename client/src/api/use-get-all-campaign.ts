import { useReadContract } from "wagmi";
import { useQuery } from "@tanstack/react-query";

import { abi, CONTRACT_ADDRESS } from "@/lib/contract";
import { titleToSlug } from "@/lib/utils";

export const useGetCampaigns = () => {
  const { data } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getCampaigns",
  });

  const query = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      if (!data) return [];

      const campaigns = data as Campaign[];

      return campaigns.map((campaign) => ({
        ...campaign,
        slug: titleToSlug(campaign.title),
      }));
    },
    enabled: !!data,
  });

  return query;
};
