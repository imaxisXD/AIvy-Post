import { cn } from "@/lib/utils";
import React from "react";
import { SVGProps } from "react";

interface AppLogoProps extends SVGProps<SVGSVGElement> {
  height?: number | string;
  width?: number | string;
}

const AppLogo: React.FC<AppLogoProps> = ({
  height = 288,
  width = 288,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={cn("h-14 w-14", props.className)}
      viewBox="0 0 288 288"
      height={height}
      width={width}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        viewBox="0 0 54 33"
      >
        <path
          fill="#9333ea"
          d="M.115 16.144c0-8.836 7.164-16 16-16h21c8.837 0 16 7.164 16 16v16h-37c-8.836 0-16-7.163-16-16z"
          className="color4845D2 svgShape colorfc5185"
        ></path>
        <path
          fill="#d8b4fe"
          d="M37.115 6.144h-21c-5.522 0-10 4.477-10 10s4.477 10 10 10h21c5.523 0 10-4.477 10-10s-4.477-10-10-10z"
          className="colorA5B4FC svgShape color43dde6"
        ></path>
        <path
          fill="#000"
          d="M16.115 21.144a5 5 0 100-10 5 5 0 000 10z"
          className="color000 svgShape color364f6b"
        ></path>
        <path
          fill="#f0f0f0"
          d="M14.115 15.144a1 1 0 100-2 1 1 0 000 2z"
          className="colorfff svgShape colorf0f0f0"
        ></path>
        <path
          fill="#000"
          d="M38.115 21.144a5 5 0 100-10 5 5 0 000 10z"
          className="color000 svgShape color364f6b"
        ></path>
        <path
          fill="#f0f0f0"
          d="M36.115 15.144a1 1 0 100-2 1 1 0 000 2z"
          className="colorfff svgShape colorf0f0f0"
        ></path>
      </svg>
    </svg>
  );
};

export default AppLogo;
