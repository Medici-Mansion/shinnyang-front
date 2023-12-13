import { WithParam } from "@/type";
import React from "react";

const UserLayout = ({ children, params: { userId } }: WithParam<"userId">) => {
  return children;
};

export default UserLayout;
