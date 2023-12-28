"use client";
import { loadingStore } from "@/store/loading.store";
import React, { useEffect, useRef } from "react";
import Loading from "../loading";
import { AnimatePresence } from "framer-motion";

interface LoadingSubscriberProps {
  isPassive?: boolean;
}

const LoadingSubscriber = ({ isPassive = false }: LoadingSubscriberProps) => {
  const { isLoading, setIsLoading } = loadingStore();
  const isTriggerd = useRef(false);
  useEffect(() => {
    if (isPassive) {
      setIsLoading(true);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      isTriggerd.current = true;
    }
  }, []);
  return (
    <AnimatePresence>
      {isLoading ? (
        <Loading className="fixed left-0 top-0 z-[9999] w-full" />
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingSubscriber;
