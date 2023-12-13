import React, { PropsWithChildren } from "react";

const OnBoardingLayout = ({ children }: PropsWithChildren) => {

  return (
    <div className="h-[100dvh] sm:h-screen">
      <main className="flex divide-x-2 h-full">
        <section className="flex-[1] pc-main-grid">{children}</section>
      </main>
    </div>
  );

};

export default OnBoardingLayout;
