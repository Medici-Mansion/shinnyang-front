import { WithParam } from "@/type";
import React from "react";

const UserLayout = ({ children, params: { userId } }: WithParam<"userId">) => {
  return (
    <div className="h-full">
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
