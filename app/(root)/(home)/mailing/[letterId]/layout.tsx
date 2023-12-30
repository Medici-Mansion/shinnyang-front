import Loading from "@/components/loading";
import BaseLayout from "@/layout/base-layout";
import React, { PropsWithChildren, Suspense } from "react";

const MailLayout = ({ children }: PropsWithChildren) => {
  return (
    <BaseLayout className='"flex p-6" h-full flex-col overflow-y-hidden bg-background'>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </BaseLayout>
  );
};

export default MailLayout;
