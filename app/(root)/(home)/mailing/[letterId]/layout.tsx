import Loading from "@/components/loading";
import Snow from "@/components/pages/snow";
import BaseLayout from "@/layout/base-layout";
import React, { PropsWithChildren, Suspense } from "react";

const MailLayout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<Loading />}>
      <BaseLayout className='"flex p-6" h-full flex-col overflow-y-hidden bg-point-500'>
        {children}
      </BaseLayout>
      <Snow />
    </Suspense>
  );
};

export default MailLayout;
