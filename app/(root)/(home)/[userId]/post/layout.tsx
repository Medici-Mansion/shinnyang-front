import { generateBlurImageByImageList } from "@/actions/blur-image-.action";
import dynamic from "next/dynamic";
import React, { PropsWithChildren, ReactNode, Suspense } from "react";

const Background = dynamic(() => import("@/components/pages/post/background"));

const getBackground = async () => {
  const image = [
    {
      path: "https://res.cloudinary.com/dzfrlb2nb/image/upload/v1703753597/szxnpt36qkq5tvnrt909.png",
      name: "post" as const,
    },
  ];

  return await generateBlurImageByImageList(image);
};
const PostLayout = async ({
  children,
  letter,
}: PropsWithChildren<{ letter: ReactNode }>) => {
  const { post } = await getBackground();
  return (
    <>
      {children}
      {letter}
      <Background post={post} />
    </>
  );
};

export default PostLayout;
