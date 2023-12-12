import Reply from "@/components/reply";
import { Button } from "@/components/ui/button";
import { WithParam } from "@/type";
import React from "react";

const LetterPage = (props: WithParam<"letterId" | "userId">) => {
  return (
    <section className="flex flex-col space-y-4 h-full items-center">
      <h1 className="text-center mt-[10dvh] font-semibold text-2xl mb-4">
        냥이 1이 보관한
        <br />
        첫번 째 편지
        <br />
        <Button className="w-full">#1</Button>
      </h1>
      <Reply items={["df", "wfwef", "we213123"]} />
    </section>
  );
};

export default LetterPage;
