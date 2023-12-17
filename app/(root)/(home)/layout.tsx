import { WithParam } from "@/type";
import Layout from "@/components/layout";
import React from "react";

const UserLayout = ({ children, params: { userId } }: WithParam<"userId">) => {
  return <Layout>{children}</Layout>;
};

export default UserLayout;
