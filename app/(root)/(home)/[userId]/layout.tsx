import APIs from "@/apis";
import PrefetchQuery from "@/hydrate/prefetch-query";
import CommonQuery from "@/lib/queries/common.query";
import { WithParam } from "@/type";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const UserLayout = async ({
  children,
  params: { userId },
}: WithParam<"userId">) => {
  const cookie = cookies();
  const access = cookie.get("access");
  const user = await APIs.getMe(access?.value || "");
  const header = headers();
  const pathname = header.get("x-url") || "";

  if (user.id !== userId) return redirect("/");
  if (!user.nickname && !pathname.includes("nickname"))
    return redirect(`nickname`);
  return (
    <PrefetchQuery queries={[CommonQuery.getCat]}>{children}</PrefetchQuery>
  );
};

export default UserLayout;
