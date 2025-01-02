import Campaigns from "@/components/campaigns";

export default function Home() {
  const campaigns = [
    {
      title: "Campaign 1",
      description: "Description 1",
      target: 1000,
      deadline: new Date().getTime(),
      image: "https://via.placeholder.com/150",
      amountCollected: 500,
      owner: "0x0F4116b36773C212eD3aACb913211da4a77f98A0",
    },
    {
      title: "Campaign 2",
      description: "Description 2",
      target: 2000,
      deadline: new Date().getTime(),
      image: "https://via.placeholder.com/150",
      amountCollected: 500,
      owner: "0x0F4116b36773C212eD3aACb913211da4a77f98A0",
    },
    {
      title: "Campaign 3",
      description: "Description 3",
      target: 3000,
      deadline: new Date().getTime(),
      image: "https://via.placeholder.com/150",
      amountCollected: 500,
      owner: "0x0F4116b36773C212eD3aACb913211da4a77f98A0",
    },
  ];
  return (
    <Campaigns title="All Campaigns" isLoading={false} campaigns={campaigns} />
  );
}
