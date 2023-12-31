"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useSession } from "../provider/session-provider";
import APIs from "@/apis";
import Popup from "./popup";

const Logout = () => {
  const { signout } = useSession();
  const { mutate } = useMutation({
    mutationFn: APIs.deleteMe,
    onSuccess(data, variables, context) {
      signout();
    },
  });
  return (
    <Popup
      trigger={
        <span className="text-subtitle-notice02 text-gray-500">탈퇴하기</span>
      }
      title="회원탈퇴"
      onConfirm={mutate}
      confirm={{
        label: "탈퇴",
      }}
      content={
        <div className="space-y-2 text-center font-pretendard">
          <h1 className="text-secondary-black font-bold">
            정말 탈퇴하시겠어요?
          </h1>
          <p>
            탈퇴 버튼 선택 시, 계정은
            <br />
            삭제되며 편지를 되돌릴 수 없습니다.
          </p>
        </div>
      }
    />
  );
};

export default Logout;
