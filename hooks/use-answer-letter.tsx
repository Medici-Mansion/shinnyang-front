import APIs from "@/apis";
import { useMutation } from "@tanstack/react-query";

import { LetterResponse, Letters } from "@/type";

interface UseSendLetterOptions {
  onSuccess?: (data: LetterResponse, variables: Letters) => void;
}

const useAnswerLetter = (options?: UseSendLetterOptions) => {
  const { onSuccess } = options || {};
  const { mutate, isPending } = useMutation<LetterResponse, unknown, Letters>({
    mutationKey: ["answer-post"],
    mutationFn: (param: Letters) => APIs.answerLetter(param),
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

export default useAnswerLetter;
