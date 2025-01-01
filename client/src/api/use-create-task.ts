import { toast } from "sonner";
import { abi, CONTRACT_ADDRESS } from "@/lib/contract";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "@/lib/config";
import { writeContract } from "@wagmi/core";

type ResponseType = {
  transactionHash: string;
};

type RequestType = {
  data: {
    address: string;
    title: string;
    description: string;
    target: number;
    deadline: Date;
    image?: string;
  };
};

const createCampaignOnChain = async (
  args: [
    address: string,
    title: string,
    description: string,
    target: number,
    deadline: number,
    image?: string
  ]
) => {
  return writeContract(config, {
    abi,
    address: CONTRACT_ADDRESS,
    functionName: "createCampaign",
    args,
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ data }) => {
      const { address, title, description, target, deadline, image } = data;

      // transfer deadline to timestamp
      const deadlineTimestamp = deadline.getTime() / 1000;

      const transactionHash = await createCampaignOnChain([
        address,
        title,
        description,
        target,
        deadlineTimestamp,
        image || "",
      ]);

      if (!transactionHash) {
        throw new Error("Failed to create task in smart contract");
      }

      // Return the transaction hash as part of the ResponseType
      return { transactionHash };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.success(
        `Campaign created successfully. Tx: ${data.transactionHash}`
      );
    },
    onError: () => {
      toast.error("Failed to create Campaign");
    },
  });

  return mutation;
};
