import APIs from "@/apis";
import { useMutation } from "@tanstack/react-query";

import { Letters } from "@/type";
import { LetterResponse } from "@/app/(root)/(home)/[userId]/letter/page";

interface UseSendLetterOptions {
  onSuccess?: (data: LetterResponse, variables: Letters) => void;
}

const useSendLetter = (options?: UseSendLetterOptions) => {
  const { onSuccess } = options || {};
  const { mutate, isPending } = useMutation<LetterResponse, unknown, Letters>({
    mutationKey: ["send-post"],
    mutationFn: (param: Letters) => APIs.sendLetter(param),
    onSuccess(data, variables) {
      onSuccess && onSuccess(data, variables);
    },
    gcTime: 1000 * 60,
  });

  return {
    mutate,
    isPending,
  };
};

export default useSendLetter;
