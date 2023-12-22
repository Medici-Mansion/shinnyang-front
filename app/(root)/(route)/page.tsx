import React from "react";
import lazy from "next/dynamic";

const LoginButton = lazy(() => import("@/components/pages/login-button"));

// export const revalidate = "force-cache"; // revalidate at most every hour
// export const dynamic = "auto";

const OnBoardingPage = () => {
  return (
    <div className="theme-responsive">
      <div className="flex h-full w-full flex-col">
        <div className="mt-[4dvh] flex flex-1 flex-col justify-start text-center text-white">
          <div className="text-2xl font-medium">
            새해를 알리는
            <br />
            2024 신냥이 우체국
          </div>
          <span className="text-md mt-2">신년카드 대신 전달해드립니다.</span>
        </div>
        <div className="items-end">
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
