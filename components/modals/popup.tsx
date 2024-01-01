"use client";
import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const BUTTON_TYPES = ["confirm", "cancel"] as const;

type Noob = () => void | Promise<void>;
interface PopupProps {
  trigger?: ReactNode;
  title?: string;
  content?: ReactNode;
  onClose?: Noob;
  onConfirm?: Noob;
  confirm?: {
    label?: string;
    className?: string;
  };
  cancelLabel?: string;
}

const Popup = ({
  trigger,
  title,
  content,
  onClose,
  onConfirm,
  confirm = { label: "확인" },
  cancelLabel = "취소",
}: PopupProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onChange = (open: boolean) => {
    setOpen(open);
    if (!open) onClose?.();
  };

  const onSubmit = async () => {
    setLoading(true);
    onConfirm && (await onConfirm());
    setLoading(false);
    onChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onChange} modal={false}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogPortal forceMount>
        <DialogContent
          close={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.3247 5C16.9235 5.16602 17.2229 5.47316 17.2229 5.92142C16.4438 7.37133 15.4329 9.4632 14.1902 12.197C16.0896 14.311 17.6929 16.4029 19 18.4726C18.7618 18.9873 18.6426 19.3442 18.6426 19.5434H17.3967C15.5939 17.0255 14.1097 15.2407 12.9443 14.1893C10.4331 18.0631 9.0681 20 8.84918 20H8.67533C8.28257 19.6956 7.92521 19.5434 7.60327 19.5434V19.0869C7.60327 18.8046 8.19564 17.731 9.38039 15.8661L11.5245 12.8113V12.5042C7.84151 8.75761 6 6.71555 6 6.37797V5.92142C6.1159 5.61704 6.47325 5.46486 7.07207 5.46486C7.54854 5.46486 8.37915 6.28113 9.56389 7.91367C11.5792 9.64582 12.5869 10.6143 12.5869 10.819H12.7704C13.865 8.20144 14.8727 6.26176 15.7935 5H16.3247Z"
                fill="#A88A76"
              />
            </svg>
          }
          className="w-screen max-w-[calc(var(--max-width)*0.6)] grow rounded-xl bg-secondary-bg p-4 pb-8 font-pretendard"
        >
          <DialogTitle
            className="mx-auto mb-2 flex flex-col items-center"
            asChild
          >
            <h2 className="text-subtitle-menu text-point-300">{title}</h2>
          </DialogTitle>
          {content}
          <div className="flex w-full items-center justify-end space-x-2 pt-2 text-[16px]">
            <Button
              className="h-10"
              variant={"disable"}
              onClick={() => onChange(false)}
              disabled={loading}
            >
              {cancelLabel}
            </Button>

            <Button
              onClick={onSubmit}
              disabled={loading}
              className={cn("h-10", confirm.className)}
              variant={"primary"}
            >
              {confirm.label}
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Popup;
