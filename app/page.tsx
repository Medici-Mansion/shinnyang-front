"use client";
import React, { useEffect, useState } from "react";
import { getProviders, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Login = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      console.log(res);
      setProviders(res);
    })();
  }, []);
  const backgroundStyle = {
    backgroundImage: `url('/shincat-login.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <main
      className="max-w-sm py-4 sm:py-0 flex flex-col sm:justify-center mx-auto w-full h-full"
      style={backgroundStyle}
    >
      <div className="flex flex-col h-full">
        <div className="h-[80%] w-full"></div>
        <div className="p-5">
          <Button
            className="w-full transform rounded-md bg-[#FFCD29] px-4 py-2 tracking-wide text-black transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
            onClick={() =>
              signIn("kakao", { redirect: true, callbackUrl: "/test" })
            }
          >
            카카오 로그인
          </Button>
          <Button
            className="mt-5 w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          >
            Logout
          </Button>
        </div>
      </div>
    </main>
  );
};
export default Login;
