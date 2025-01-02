import { useReadContract } from "wagmi";
import { useQuery } from "@tanstack/react-query";

import { abi, CONTRACT_ADDRESS } from "@/lib/contract";

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
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: campaign.target,
        deadline: campaign.deadline,
        amountCollected: campaign.amountCollected,
        image: campaign.image,
        isActive: campaign.isActive,
      }));
    },
    enabled: !!data,
  });

  return query;
};
