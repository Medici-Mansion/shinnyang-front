import APIs from "@/apis";
import { Mail } from "@/type";
import { UseQueryOptions } from "@tanstack/react-query";

const getMails: UseQueryOptions<(Mail & { index: number })[]> = {
  queryKey: ["mails", "test"],
  queryFn: APIs.getMails,
  refetchOnMount: "always",
};

const MailQuery = {
  getMails,
};
export default MailQuery;
