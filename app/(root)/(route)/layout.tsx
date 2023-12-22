import React, { PropsWithChildren } from "react";
import lazy from "next/dynamic";
const Layout = lazy(() => import("@/components/layout"));

const OnBoardingLayout = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};

export default OnBoardingLayout;
