import { WithParam } from "@/type";
import React from "react";

const UserLayout = ({ children, params: { userId } }: WithParam<"userId">) => {
  return <main className="h-full overflow-hidden">{children}</main>;
};

export default UserLayout;
