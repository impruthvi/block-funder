import Image from "next/image";

import { cn } from "@/lib/utils";

interface IconProps {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const Icon = ({
  styles,
  name,
  imgUrl,
  isActive,
  disabled,
  onClick,
}: IconProps) => {
  const baseClasses =
    "w-12 h-12 rounded-[10px] flex justify-center items-center transition-all duration-200 ease-in-out";
  const stateClasses = cn(
    isActive && "bg-[#2c2f32]",
    !disabled && "cursor-pointer hover:opacity-80",
    disabled && "opacity-50",
    styles
  );

  return (
    <div
      className={cn(baseClasses, stateClasses)}
      onClick={!disabled ? onClick : undefined}
      role={!disabled ? "button" : undefined}
      tabIndex={!disabled ? 0 : undefined}
      aria-disabled={disabled}
    >
      <div className="relative w-1/2 h-1/2">
        <Image
          src={imgUrl}
          alt={`${name || "icon"}`}
          fill
          sizes="(max-width: 24px) 100vw"
          className={cn("object-contain", !isActive && "grayscale")}
        />
      </div>
    </div>
  );
};
