"use client";
import React, {
  Context,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  m,
  LazyMotion,
  domAnimation,
  AnimatePresence,
  HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

type DIRECTION = "top" | "bottom" | "left" | "right";

export type PortalContext =
  | [open: boolean, setOpen: Dispatch<SetStateAction<boolean>>]
  | null;

interface PortalProps extends HTMLMotionProps<"aside"> {
  direction: DIRECTION;
  context: Context<PortalContext>;
}

const Portal = ({
  children,
  direction,
  context,
  ...rest
}: PropsWithChildren<PortalProps>) => {
  const [element, setElement] = useState<HTMLElement>();
  const openState = useContext(context);
  if (!openState) throw new Error();
  useEffect(() => {
    if (typeof document !== undefined) {
      setElement(document?.body);
    }
  }, []);

  if (!element) return;

  const initialVariants =
    direction === "right"
      ? { x: "100%" }
      : direction === "bottom"
        ? { y: "100%" }
        : direction === "left"
          ? { x: "-100%" }
          : { y: "-100%" };

  const [open, setOpen] = openState;
  return createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <div
            className={cn(
              "absolute right-0 top-0 z-[1] flex h-full w-full",
              direction === "right" && "justify-end",
              direction === "bottom" && "items-end",
            )}
          >
            <m.aside
              {...rest}
              initial={initialVariants}
              animate={
                direction === "right"
                  ? { x: 0 }
                  : direction === "bottom"
                    ? { y: 0 }
                    : direction === "left"
                      ? { x: 0 }
                      : { y: 0 }
              }
              exit={initialVariants}
              transition={{
                type: "tween",
                easings: ["backInOut", "circIn"],
              }}
              className={cn(
                "z-[1] bg-primary-beige px-6 py-8 drop-shadow-md",
                rest.className,
              )}
            >
              {children}
            </m.aside>
            <m.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.4)]"
            />
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>,
    element,
  );
};

export default Portal;
