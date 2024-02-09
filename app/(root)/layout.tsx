import CalcLayout from "@/components/calc-layout";
import PrefetchQuery from "@/hydrate/prefetch-query";
import CommonQuery from "@/lib/queries/common.query";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <PrefetchQuery queries={[CommonQuery.getCat, CommonQuery.getAcc]}>
      {children}
      <CalcLayout />
    </PrefetchQuery>
  );
};

export default RootLayout;
