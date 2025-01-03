type Campaign = {
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  image: string;
  amountCollected: bigint;
  owner: string;
  isActive: boolean;
  category?: string;
};
