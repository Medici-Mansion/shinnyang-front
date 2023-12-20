"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      Error
      <Button onClick={() => reset()}></Button>
    </div>
  );
};

export default error;
