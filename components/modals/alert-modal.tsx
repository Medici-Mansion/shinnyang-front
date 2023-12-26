"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  leftBtnTitle: string;
  rightBtnTitle: string;
  title: string;
}

export const AlertModal = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
  leftBtnTitle,
  rightBtnTitle,
  title,
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Modal title={title} isOpen={isOpen} onClose={onClose}>
        <div className="flex w-full items-center justify-end space-x-2 pt-2 text-[16px]">
          <Button disabled={loading} variant={"secondary"} onClick={onClose}>
            {leftBtnTitle}
          </Button>
          <Button disabled={loading} onClick={onConfirm} className="bg-red">
            {rightBtnTitle}
          </Button>
        </div>
      </Modal>
    </>
  );
};
