import { WithParam } from "@/type";
import React, { Suspense } from "react";

const UserLayout = ({ children, params: { userId } }: WithParam<"userId">) => {
  return (
    <div className="h-[100dvh] sm:h-screen">
      <main className="flex h-full divide-x-2">
        <section className="pc-main-grid flex-[1]">{children}</section>
      </main>
    </div>
  );
};

export default UserLayout;
