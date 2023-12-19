import { getCats } from "@/apis";
import { Cat } from "@/type";
import { UseQueryOptions } from "@tanstack/react-query";

const getCat: UseQueryOptions<Cat[]> = {
  queryKey: ["common", "cats"],
  queryFn: getCats,
};

const CommonQuery = {
  getCat,
};

export default CommonQuery;
