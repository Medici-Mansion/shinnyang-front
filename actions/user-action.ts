"use server";
import { getMe } from "@/apis";
import { Session } from "@/type";
import { cookies } from "next/headers";

export const userAction = async () => {
  "use server";
  const cookie = cookies();
  const access = cookie.get("access");
  const refresh = cookie.get("refresh");
  let session: Session = {
    token: null,
    user: null,
  };
  try {
    if (access?.value) {
      const user = await getMe(access.value);
      session.user = user;
      session.token = {
        access: access?.value,
        refresh: refresh?.value,
      };
    }
  } catch (error) {
    session.token = null;
  }
  return session;
};
