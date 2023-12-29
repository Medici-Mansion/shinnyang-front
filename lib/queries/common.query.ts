import APIs from "@/apis";
import { Cat, Acc, UserCatResponse } from "@/type";
import { UseQueryOptions } from "@tanstack/react-query";

const getCat: UseQueryOptions<Cat[]> = {
  queryKey: ["common", "cats"],
  queryFn: APIs.getCats,
};

const getAcc: UseQueryOptions<Acc[]> = {
  queryKey: ["common", "accessories"],
  queryFn: APIs.getAccessories,
};

const getUserCat: UseQueryOptions<UserCatResponse[]> = {
  queryKey: ["common", "user-cat"],
  queryFn: APIs.getUserCat,
};

const CommonQuery = {
  getCat,
  getAcc,
  getUserCat,
};

export default CommonQuery;
