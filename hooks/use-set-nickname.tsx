import APIs from "@/apis";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

const useSetNickName = (
  options?: UseMutationOptions<boolean, Error, { nickname: string }, unknown>,
) => {
  const { onSuccess, ...rest } = options || {};
  const { mutate } = useMutation({
    mutationFn: (param: { nickname: string }) => APIs.setNickName(param),
    onSuccess(data, variables, context) {
      onSuccess && onSuccess(data, variables, context);
    },
    ...rest,
  });

  return {
    mutate,
  };
};

export default useSetNickName;
