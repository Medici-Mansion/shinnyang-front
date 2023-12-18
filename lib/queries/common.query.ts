import { getCats } from "@/apis";
import { UseQueryOptions } from "@tanstack/react-query";

const getCat: UseQueryOptions<ReturnType<typeof getCats>> = {
  queryKey: ["common", "cats"],
  queryFn: getCats,
};

const CommonQuery = {
  getCat,
};

export default CommonQuery;
