import APIs from "@/apis";
import PrefetchQuery from "@/hydrate/prefetch-query";
import CommonQuery from "@/lib/queries/common.query";
import { WithParam } from "@/type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const UserLayout = async ({
  children,
  params: { userId },
}: WithParam<"userId">) => {
  const cookie = cookies();
  const access = cookie.get("access");
  const user = await APIs.getMe(access?.value || "");
  if (user.id !== userId) return redirect("/");
  return (
    <PrefetchQuery queries={[CommonQuery.getCat]}>{children}</PrefetchQuery>
  );
};

export default UserLayout;
