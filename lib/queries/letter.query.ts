import APIs from "@/apis";
import { LetterResponse, Mail } from "@/type";
import { UseQueryOptions } from "@tanstack/react-query";

const getLetterById = (letterId: string): UseQueryOptions<LetterResponse> => ({
  queryKey: ["get-letter", letterId],
  queryFn: (args) => APIs.getLetter(args.queryKey[1] as string),
});

const LetterQuery = {
  getLetterById,
};
export default LetterQuery;
