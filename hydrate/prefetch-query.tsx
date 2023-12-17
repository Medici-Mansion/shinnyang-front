import {
  FetchQueryOptions,
  HydrationBoundary,
  QueryKey,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import getQueryClient from "./get-query-client";

interface HydrateQueryProps<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey
> {
  queries: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>[];
}

const PrefetchQuery = async <
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey
>({
  children,
  queries,
}: PropsWithChildren<
  HydrateQueryProps<TQueryFnData, TError, TData, TQueryKey>
>) => {
  try {
    const queryClient = getQueryClient();
    const queriesList = queries.map((query) =>
      queryClient.prefetchQuery(query)
    );
    await Promise.all(queriesList);
    const dehydratedState = dehydrate(queryClient);
    return (
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    );
  } catch (error) {
    return redirect("/");
  }
};

export default PrefetchQuery;
