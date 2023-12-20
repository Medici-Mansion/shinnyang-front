import APIs from "@/apis";
import { useMutation } from "@tanstack/react-query";

import { Letters } from "@/type";

const useSendLetter = () => {
  const { mutate } = useMutation({
    mutationFn: (param: Letters) => APIs.sendLetter(param),
  });

  return {
    mutate,
  };
};

export default useSendLetter;
