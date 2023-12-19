import APIs from "@/apis";
import { useQuery } from "@tanstack/react-query";

const useGetMe = () => {
  const { data, isLoading, error, isFetched } = useQuery({
    queryKey: ["me"],
    queryFn: () => APIs.getMe(),
    retry: false,
  });

  return { data, isLoading, error, isFetched };
};

export default useGetMe;
