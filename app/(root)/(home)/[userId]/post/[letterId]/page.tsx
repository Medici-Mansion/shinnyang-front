import { WithParam } from "@/type";
import React from "react";

const LetterPage = (props: WithParam<"letterId" | "userId">) => {
  console.log(props.params.letterId);
  console.log(props.params.userId);
  return <div>LetterPage</div>;
};

export default LetterPage;
