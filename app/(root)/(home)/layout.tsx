import Layout from "@/components/layout";
import React, { PropsWithChildren } from "react";

const UserLayout = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};

export default UserLayout;
