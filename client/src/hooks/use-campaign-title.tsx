import { useParams } from "next/navigation";

export const useCampaignTitle = () => {
  const params = useParams();
  return params.campaign_title as string;
};
