import APIs from "@/apis";
import { Mail } from "@/type";
import { UseQueryOptions } from "@tanstack/react-query";

const getMails: UseQueryOptions<Mail[]> = {
  queryKey: ["mails"],
  queryFn: APIs.getMails,
};

const MailQuery = {
  getMails,
};
export default MailQuery;
