import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NicknamePage = () => {
  return (
    <div className="max-w-sm h-full py-4 sm:py-0 mx-auto w-full px-4 bg-[#F6F6F6]">
      <div className="flex flex-col gap-6">
        <ArrowLeft />
        <div className="text-2xl text-black justify-start">
          편지를 보낼 때<br />
          표시할 닉네임을 알려주세요.
        </div>
        <div className="">닉네임</div>
      </div>
    </div>
  );
};

export default NicknamePage;
