"use client";

import React from "react";
import Image from "next/image";
import { useGetCampaignBySlug } from "@/api/use-get-campaign-by-slug";
import { useCampaignTitle } from "@/hooks/use-campaign-title";
import { daysLeft } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: string | number;
}

interface CampaignDetailsProps {
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <Card className="flex-1 bg-[#1c1c24] border-[#3a3a43]">
    <CardHeader className="p-4">
      <CardTitle className="font-epilogue text-[14px] text-[#808191]">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <p className="font-epilogue font-semibold text-[24px] text-white">
        {value}
      </p>
    </CardContent>
  </Card>
);

const LoadingSkeleton: React.FC = () => (
  <div className="w-full space-y-6">
    <Skeleton className="h-[410px] w-full rounded-xl bg-[#3a3a43]" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-32 bg-[#3a3a43]" />
      ))}
    </div>
  </div>
);

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ className }) => {
  const campaign_title = useCampaignTitle();
  const { data: campaign, isLoading } = useGetCampaignBySlug({
    slug: campaign_title,
  });

  const [donationAmount, setDonationAmount] = React.useState<string>("");

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!campaign) {
    return (
      <Card className="p-6 bg-[#1c1c24] border-[#3a3a43]">
        <p className="text-center text-[#808191]">Campaign not found</p>
      </Card>
    );
  }

  const progress: number = Number(
    Number(campaign.amountCollected / campaign.target) * 100
  );
  const remainingDays: number = daysLeft(campaign.deadline);

  const handleDonationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value))) {
      setDonationAmount(value);
    }
  };

  const handleDonate = async () => {
    try {
      // Implement donation logic here
      console.log("Donating:", donationAmount);
    } catch (error) {
      console.error("Donation failed:", error);
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1">
          <Image
            src={campaign.image}
            alt={`${campaign.title} campaign`}
            className="w-full h-[410px] object-cover rounded-xl"
            width={410}
            height={410}
            priority
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <Progress value={progress} className="bg-[#8c6dfd]" />
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <StatCard title="Days Left" value={remainingDays} />
          <StatCard
            title={`Raised of ${campaign.target}`}
            value={Number(campaign.amountCollected)}
          />
          <StatCard title="Total Backers" value={campaign.donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <Card className="bg-[#1c1c24] border-[#3a3a43]">
            <CardHeader>
              <CardTitle className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Creator
              </CardTitle>
              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <Image
                    src="/assets/thirdweb.png"
                    alt="user"
                    className="w-[60%] h-[60%] object-contain"
                    width={52}
                    height={52}
                  />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                    {campaign.owner}
                  </h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                    10 Campaigns
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-[#1c1c24] border-[#3a3a43]">
            <CardHeader>
              <CardTitle className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {campaign.description}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1c1c24] border-[#3a3a43]">
            <CardHeader>
              <CardTitle className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Donators
              </CardTitle>
            </CardHeader>
            <CardContent>
              {campaign.donators.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {campaign.donators.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex justify-between items-center gap-4"
                    >
                      <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                        {index + 1}. {item}
                      </p>
                      <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                        {item} ETH
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Card className="bg-[#1c1c24] border-[#3a3a43]">
            <CardHeader>
              <CardTitle className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Fund
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                type="number"
                placeholder="ETH 0.1"
                min="0"
                step="0.01"
                value={donationAmount}
                onChange={handleDonationChange}
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                aria-label="Donation amount in ETH"
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <Button
                className="w-full bg-[#8c6dfd] text-white hover:bg-[#7c5fea]"
                size="lg"
                onClick={handleDonate}
                disabled={!donationAmount || Number(donationAmount) <= 0}
              >
                Fund Campaign
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
