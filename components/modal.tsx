"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const onChange = (open: boolean) => {
    if (!open) onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange} modal>
      <DialogContent className="w-[calc(100%-3rem)] max-w-[574px] rounded-md bg-background">
        <DialogHeader>
          <DialogTitle className="whitespace-pre-wrap text-[16px] leading-6">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
