import React, { PropsWithChildren } from "react";

interface MailProps {
  type?: "notRead" | "empty" | "read";
  label?: string;
}

const Mail = ({ label, type = "empty" }: PropsWithChildren<MailProps>) => {
  return (
    <div className="relative flex aspect-[5/3] flex-1 flex-col items-center justify-center rounded-[3px] border-2 border-[#29110C] bg-[#ECD2B9] px-1 font-gookie text-base font-semibold leading-[6px]">
      <div className="flex w-full flex-[2] items-end pb-1">
        <div className="relative flex h-[12px] w-full justify-center rounded-md border-[2px] border-[#DDA973] bg-[#482609]">
          {type === "empty" ? (
            <div className="absolute h-[5px] w-full bg-[#ECD2B9]" />
          ) : type === "notRead" ? (
            <>
              <svg
                className="absolute -top-[200%] w-[120%]"
                width="84"
                height="26"
                viewBox="0 0 84 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g style={{ mixBlendMode: "plus-lighter" }} opacity="0.5">
                  <path
                    className="animate-pulse"
                    d="M75.1481 25.26L42.4996 25.26H9.99963C5.99963 25 4.99963 22 4.99963 20.26L0 0.76001H83.9996L79.9996 20.5C79.9996 23 77.7231 25.26 75.1481 25.26Z"
                    fill="url(#paint0_linear_664_1179)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_664_1179"
                    x1="42.499"
                    y1="0.909268"
                    x2="42.499"
                    y2="24.4493"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFAC00" stopOpacity="0" />
                    <stop offset="1" stopColor="#FFAC00" />
                  </linearGradient>
                </defs>
              </svg>

              <svg
                className="relative -top-[11px] w-full"
                width="64"
                height="20"
                viewBox="0 0 64 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g style={{ mixBlendMode: "multiply" }}>
                  <path
                    d="M63.33 19.9999L55.9 2.49937C55.41 1.27493 54.01 0.677646 52.78 1.16543L3 19.9999"
                    fill="black"
                    fillOpacity="0.3"
                  />
                </g>
                <path
                  d="M52.9 1.50401C52.41 0.279568 51.01 -0.317715 49.78 0.17007L0 20H60.34L52.91 1.50401H52.9Z"
                  fill="white"
                />
                <path
                  d="M51.2798 1.33478C50.8598 0.976411 50.2298 1.01623 49.8698 1.42437L33.5498 20H36.2098L51.3798 2.7384C51.7398 2.3203 51.6998 1.69316 51.2898 1.33478H51.2798Z"
                  fill="#965D4D"
                />
              </svg>
            </>
          ) : (
            <svg
              className="relative -top-[11px] w-full"
              width="64"
              height="20"
              viewBox="0 0 64 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g style={{ mixBlendMode: "multiply" }}>
                <path
                  d="M63.33 19.9999L55.9 2.49937C55.41 1.27493 54.01 0.677646 52.78 1.16543L3 19.9999"
                  fill="black"
                  fillOpacity="0.3"
                />
              </g>
              <path
                d="M52.9 1.50401C52.41 0.279568 51.01 -0.317715 49.78 0.17007L0 20H60.34L52.91 1.50401H52.9Z"
                fill="white"
              />
              <path
                d="M51.2798 1.33478C50.8598 0.976411 50.2298 1.01623 49.8698 1.42437L33.5498 20H36.2098L51.3798 2.7384C51.7398 2.3203 51.6998 1.69316 51.2898 1.33478H51.2798Z"
                fill="#965D4D"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="flex-1">
        <p>{label}</p>
      </div>
    </div>
  );
};

export default Mail;
