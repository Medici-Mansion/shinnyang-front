import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const GoBack = () => {
  return (
    <Link href="/">
      <Button>돌아 가기</Button>
    </Link>
  );
};

export default GoBack;
