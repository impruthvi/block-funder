import CreateCampaignFrom from "@/components/create-campaign-form";
import React from "react";

const CreateCampaignPage = () => {
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <div className="w-full mt-[65px] flex flex-col gap-[30px]">
        <CreateCampaignFrom />
      </div>
    </div>
  );
};

export default CreateCampaignPage;
