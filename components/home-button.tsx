import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomeButton = () => {
  return (
    <Link href="/letter">
      <Button>편지쓰기</Button>
    </Link>
  );
};

export default HomeButton;
