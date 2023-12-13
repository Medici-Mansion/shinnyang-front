import { WithParam } from "@/type";
import React, { PropsWithChildren } from "react";

const UserLayout = ({ children, params: { userId } }: WithParam<"userId">) => {
  return children;
};

export default UserLayout;
