import React from "react";
import axios from "axios";
import { notFound } from "next/navigation";
import APIs from "@/apis";
import UserProvider from "@/components/provider/user-provider";

interface GoogleSearchParams {
  code: string;
  scope: string;
  authuser: string;
  prompt: string;
}

interface AuthPageProps {
  searchParams: Partial<GoogleSearchParams>;
}

const Page = async ({ searchParams }: AuthPageProps) => {
  if (!searchParams.code) {
    notFound();
  }
  try {
    const { user, token } = await APIs.getUser(searchParams.code);
    if (!user) {
      notFound();
    }

    return <UserProvider user={user} token={token} />;
  } catch (error: any) {
    console.error(`[AUTH ERROR] : ${error?.message}`);
    notFound();
  }
};

export default Page;
