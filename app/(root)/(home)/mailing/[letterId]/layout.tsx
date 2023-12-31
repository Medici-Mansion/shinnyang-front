import Loading from "@/components/loading";
import BaseLayout from "@/layout/base-layout";
import React, { PropsWithChildren, Suspense } from "react";

const MailLayout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<Loading />}>
      <BaseLayout className='"flex p-6" h-full flex-col overflow-y-hidden bg-point-500'>
        {children}
      </BaseLayout>
    </Suspense>
  );
};

export default MailLayout;
