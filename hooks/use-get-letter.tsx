import APIs from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useGetLetter = (letterId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-letter", letterId],
    queryFn: () => APIs.getLetter(letterId),
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetLetter;
