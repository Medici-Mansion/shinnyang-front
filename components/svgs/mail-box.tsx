"use client";
import React, { useMemo } from "react";
import { useSession } from "../provider/session-provider";
import Image from "next/image";
import Mail from "./mail";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import CommonQuery from "@/lib/queries/common.query";
import { useSearchParams } from "next/navigation";
import MailQuery from "@/lib/queries/mails.query";

const MailBox = () => {
  const { data } = useSession();
  const { data: cats } = useSuspenseQuery(CommonQuery.getCat);
  const { data: mails = [] } = useQuery(MailQuery.getMails);
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const currentCatIndex = useMemo(
    () => cats.findIndex((cat) => cat.code === type),
    [cats, type],
  );
  const startIndex = currentCatIndex * 9 + 1;
  const currentMails = useMemo(
    () =>
      Array(9)
        .fill(0)
        .map((_, index) => {
          const mail = mails[index + startIndex - 1] ?? null;
          return mail;
        }),
    [mails, startIndex],
  );

  return (
    <div className="mx-auto h-full max-w-[375px] px-4 pt-[10%]">
      <div className="relative flex h-[35%] justify-center px-[1%]">
        <svg
          className="aspect-[220/122] h-full w-full"
          viewBox="0 0 220 122"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200.35 32.73C200.02 32.73 199.69 32.56 199.5 32.26C199.21 31.79 199.35 31.17 199.82 30.88L217.08 20.1C216.65 19.55 216.12 19.06 215.5 18.69C207.68 13.98 181.53 2.71997 110.36 2.71997C39.1896 2.71997 13.0296 13.99 5.20961 18.7C4.74961 18.98 4.32961 19.32 3.96961 19.7L21.8796 30.88C22.3496 31.17 22.4896 31.79 22.1996 32.26C22.0096 32.56 21.6796 32.73 21.3496 32.73C21.1696 32.73 20.9896 32.68 20.8196 32.58L2.86961 21.37C2.53961 22.12 2.34961 22.94 2.34961 23.78V113.77C2.34961 114.89 2.66961 115.94 3.20961 116.84C3.22961 116.82 3.23961 116.8 3.25961 116.78L19.7096 102.96C20.1296 102.61 20.7596 102.66 21.1196 103.08C21.4796 103.5 21.4196 104.13 20.9996 104.49L4.54961 118.31C4.54961 118.31 4.50961 118.33 4.49961 118.34C5.52961 119.2 6.85961 119.72 8.30961 119.72H212.4C213.85 119.72 215.18 119.2 216.21 118.34C216.19 118.33 216.17 118.32 216.16 118.31L199.71 104.49C199.29 104.13 199.23 103.5 199.59 103.08C199.95 102.66 200.58 102.6 201 102.96L217.45 116.78C217.45 116.78 217.48 116.82 217.5 116.84C218.04 115.94 218.36 114.9 218.36 113.77V23.78C218.36 23.12 218.24 22.48 218.04 21.87L200.89 32.58C200.73 32.68 200.54 32.73 200.36 32.73H200.35Z"
            fill="#41271E"
          />
          <path
            d="M200.99 102.97C200.57 102.61 199.94 102.67 199.58 103.09C199.22 103.51 199.28 104.14 199.7 104.5L216.15 118.32C216.15 118.32 216.18 118.34 216.2 118.35C216.71 117.93 217.14 117.42 217.48 116.85C217.46 116.83 217.45 116.81 217.43 116.79L200.98 102.97H200.99Z"
            fill="#DDA973"
          />
          <path
            d="M20.9902 104.5C21.4102 104.14 21.4702 103.51 21.1102 103.09C20.7502 102.67 20.1202 102.61 19.7002 102.97L3.2502 116.79C3.2502 116.79 3.2202 116.83 3.2002 116.85C3.5402 117.42 3.9702 117.93 4.4802 118.35C4.5002 118.34 4.5202 118.33 4.5302 118.32L20.9802 104.5H20.9902Z"
            fill="#DDA973"
          />
          <path
            d="M199.82 30.8801C199.35 31.1701 199.21 31.7901 199.5 32.2601C199.69 32.5601 200.02 32.7301 200.35 32.7301C200.53 32.7301 200.71 32.6801 200.88 32.5801L218.03 21.8701C217.81 21.2301 217.5 20.6301 217.08 20.1001L199.82 30.8801Z"
            fill="#DDA973"
          />
          <path
            d="M21.3501 32.7299C21.6801 32.7299 22.0101 32.56 22.2001 32.26C22.4901 31.79 22.3501 31.1699 21.8801 30.8799L3.97012 19.7C3.51012 20.19 3.14012 20.76 2.87012 21.37L20.8201 32.58C20.9901 32.68 21.1701 32.7299 21.3501 32.7299Z"
            fill="#DDA973"
          />
          <path
            d="M201.86 27.65C195.05 23.93 172.29 15.04 110.35 15.04C48.4096 15.04 25.6496 23.93 18.8396 27.65C17.2896 28.5 16.3496 30.02 16.3496 31.67V102.73C16.3496 105.33 18.6696 107.43 21.5296 107.43H199.17C202.03 107.43 204.35 105.33 204.35 102.73V31.66C204.35 30.02 203.41 28.49 201.86 27.64V27.65Z"
            fill="#DDA973"
          />
          <path
            d="M199.17 108.93H21.5296C17.8496 108.93 14.8496 106.15 14.8496 102.73V31.66C14.8496 29.47 16.0996 27.43 18.1196 26.33C25.1596 22.48 48.2496 13.54 110.35 13.54C172.45 13.54 195.54 22.49 202.58 26.33C204.6 27.43 205.85 29.47 205.85 31.66V102.72C205.85 106.14 202.85 108.92 199.17 108.92V108.93ZM110.35 16.54C48.9396 16.54 26.3996 25.23 19.5596 28.96C18.4896 29.54 17.8496 30.55 17.8496 31.66V102.72C17.8496 104.48 19.4996 105.92 21.5296 105.92H199.17C201.2 105.92 202.85 104.48 202.85 102.72V31.66C202.85 30.55 202.21 29.54 201.14 28.96C194.3 25.22 171.76 16.54 110.35 16.54Z"
            fill="#ECD2B9"
          />
          <path
            d="M195.051 32.1099C188.751 28.8899 167.691 21.1799 110.351 21.1799C53.0106 21.1799 31.9506 28.8899 25.6506 32.1099C24.2106 32.8399 23.3506 34.1699 23.3506 35.5899V97.1999C23.3506 99.4499 25.5006 101.28 28.1506 101.28H192.561C195.211 101.28 197.361 99.4599 197.361 97.1999V35.5899C197.361 34.1699 196.491 32.8399 195.061 32.1099H195.051Z"
            fill="#ECD2B9"
          />
          <path
            d="M192.55 102.28H28.1504C24.9504 102.28 22.3604 99.9999 22.3604 97.1999V35.5899C22.3604 33.7899 23.4504 32.1199 25.2104 31.2199C31.7003 27.8999 52.9904 20.1799 110.36 20.1799C167.73 20.1799 189.02 27.8999 195.51 31.2199C197.27 32.1199 198.36 33.7899 198.36 35.5899V97.1999C198.36 99.9999 195.76 102.28 192.56 102.28H192.55ZM110.35 22.1799C53.4104 22.1799 32.4704 29.7499 26.1104 32.9999C25.0104 33.5599 24.3504 34.5299 24.3504 35.5899V97.1999C24.3504 98.8999 26.0504 100.28 28.1404 100.28H192.55C194.64 100.28 196.35 98.8999 196.35 97.1999V35.5899C196.35 34.5299 195.69 33.5599 194.59 32.9999C188.23 29.7499 167.29 22.1799 110.35 22.1799Z"
            fill="#BA7032"
          />
          <path
            d="M215.15 18.97C215.77 19.34 216.3 19.83 216.73 20.38C216.976 20.684 217.513 21.4635 217.69 22.15C217.89 22.76 218.01 23.4 218.01 24.06V114.05C218.01 115.18 217.69 116.22 217.15 117.12C217.007 117.4 216.548 118.092 215.86 118.62C214.83 119.48 213.5 120 212.05 120H7.96C6.51 120 5.18 119.48 4.15 118.62C3.47 118.092 3.00667 117.4 2.86 117.12C2.32 116.22 2 115.17 2 114.05V24.06C2 23.22 2.19 22.4 2.52 21.65C2.74139 21.0457 3.34558 20.2849 3.62 19.98C3.98 19.6 4.4 19.26 4.86 18.98C12.68 14.27 38.84 3 110.01 3C181.18 3 207.33 14.26 215.15 18.97Z"
            stroke="#28100B"
            strokeWidth="3"
          />
        </svg>
        <p className="absolute left-1/2 top-[17%] -translate-x-1/2 text-center font-umu text-xl font-bold text-black">
          {data?.user?.nickname}의
          <br />
          신냥이 우체국
        </p>
      </div>
      <div className="relative flex h-[65%] max-h-[254px] max-w-[375px] flex-col items-center">
        <Image
          src="/assets/상단.png"
          className="w-[90%]"
          alt="상단"
          height={18}
          width={353}
        />
        <div className="relative max-h-[223px] w-[80%] max-w-[324px] border-x-4 border-x-[#28100B] bg-[#977C6A]">
          <div className="absolute h-1 bg-[rgba(0,0,0,0.2)] mix-blend-multiply"></div>
          <div className="grid h-fit w-full grid-cols-3 gap-1 p-1">
            {currentMails.map((mail, index) => (
              <Mail
                type={!mail ? "empty" : mail.isRead ? "read" : "notRead"}
                key={mail?.id ? mail?.id + index : index}
                mail={mail}
                label={startIndex + index + ""}
              />
            ))}
          </div>
        </div>
        <Image
          className="w-[90%]"
          src="/assets/상단.png"
          alt="상단"
          height={18}
          width={353}
        />
      </div>
    </div>
  );
};

export default MailBox;
