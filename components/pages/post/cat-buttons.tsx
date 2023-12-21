"use client";
import CommonQuery from "@/lib/queries/common.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import PostBox from "./post-box";

const CatButtons = () => {
  const { data } = useSuspenseQuery(CommonQuery.getCat);

  return data.map((cat) => (
    <PostBox
      key={cat.id}
      className={`font-${cat.code}`}
      style={{ fontFamily: cat.code }}
    >
      {cat.name}
    </PostBox>
  ));
};

export default CatButtons;
