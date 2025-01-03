import React from "react";
import Image from "next/image";
import { daysLeft } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FundCardProps {
  owner: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
  category?: string;
}

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  category = "Education",
}: FundCardProps) => {
  const remainingDays = daysLeft(deadline);
  const progress = (Number(amountCollected) / Number(target)) * 100;

  return (
    <Card className="w-full sm:w-72 bg-zinc-900 hover:bg-zinc-800 transition-colors duration-200 overflow-hidden">
      <div className="relative h-40 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      <CardHeader className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/type.svg"
            alt="category"
            width={14}
            height={14}
            className="opacity-70"
          />
          <span className="text-xs text-zinc-400">{category}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-white line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        <Progress value={progress} className="h-2 bg-zinc-700" />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-white">
              {amountCollected.toLocaleString()} ETH
            </p>
            <p className="text-xs text-zinc-400">
              of {target.toLocaleString()} ETH
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-sm font-medium text-white">
              {remainingDays}
            </p>
            <p className="text-xs text-zinc-400">
              Days Left
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-3 w-full">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800">
            <Image
              src="/assets/thirdweb.png"
              alt="creator"
              width={16}
              height={16}
              className="opacity-70"
            />
          </div>
          <p className="text-xs text-zinc-400 truncate">
            by <span className="text-zinc-300">{owner}</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FundCard;