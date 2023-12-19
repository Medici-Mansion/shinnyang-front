import APIs from "@/apis";
import { useMutation } from "@tanstack/react-query";

interface UseSetNickNameOptions {
  onSuccess?: (data: boolean, variables: { nickname: string }) => void;
}

const useSetNickName = (options?: UseSetNickNameOptions) => {
  const { onSuccess } = options || {};
  const { mutate } = useMutation({
    mutationFn: (param: { nickname: string }) => APIs.setNickName(param),
    onSuccess(data, variables) {
      onSuccess && onSuccess(data, variables);
    },
  });

  return {
    mutate,
  };
};

export default useSetNickName;
