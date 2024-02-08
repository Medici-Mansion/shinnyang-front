import APIs from "@/apis";
import { useMutation } from "@tanstack/react-query";

import { LetterResponse, Letters } from "@/type";

interface UseSendLetterOptions {
  onSuccess?: (data: LetterResponse, variables: Letters) => void;
}

const useSendLetter = (options?: UseSendLetterOptions) => {
  const { onSuccess } = options || {};
  const { mutate, mutateAsync, isPending, data } = useMutation<
    LetterResponse,
    unknown,
    Letters
  >({
    mutationKey: ["send-post"],
    mutationFn: (param: Letters) => APIs.sendLetter(param),
    onSuccess(data, variables) {
      onSuccess && onSuccess(data, variables);
    },
    gcTime: 1000 * 60,
  });

  return {
    mutate,
    mutateAsync,
    isPending,
    data: data?.data,
  };
};

export default useSendLetter;
