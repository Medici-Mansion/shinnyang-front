import ReceiverLoading from "@/components/receiver-loading";
import PrefetchQuery from "@/hydrate/prefetch-query";
import LetterQuery from "@/lib/queries/letter.query";
import { PropsWithChildren, Suspense } from "react";

const ReceiverLayout = ({
  children,
  params,
}: PropsWithChildren<{ params: { letterId: string } }>) => {
  const { letterId } = params;

  return (
    <PrefetchQuery queries={[LetterQuery.getLetterById(letterId)]}>
      {children}
    </PrefetchQuery>
  );
};

export default ReceiverLayout;
