import { useReadContract } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { abi, CONTRACT_ADDRESS } from "@/lib/contract";

interface UseGetCampaignByOwnerProps {
  owner: string;
}

export const useGetCampaignsByOwner = ({
  owner,
}: UseGetCampaignByOwnerProps) => {
  const {
    data,
    isError: isContractError,
    error: contractError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getCampaigns",
  });

  const query = useQuery<Campaign[]>({
    queryKey: ["campaign", owner],
    queryFn: async () => {
      if (!data) return [];
      try {
        const campaigns = data as Campaign[];
        return campaigns.filter((campaign) => campaign.owner === owner);
      } catch (error) {
        console.error("Error processing campaigns data:", error);
        throw error;
      }
    },
    enabled: !!data && !isContractError,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  if (isContractError) {
    console.error("Error reading contract:", contractError);
  }

  return query;
};
