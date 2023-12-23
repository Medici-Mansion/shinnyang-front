import GoBack from "@/components/pages/go-back";
import BaseLayout from "@/layout/base-layout";
import Image from "next/image";
export const revalidate = "force-cache"; // revalidate at most every hour
export const dynamic = "force-static";
const NotFoundPage = () => {
  return (
    <BaseLayout className="justify-center">
      <div className="flex flex-1 items-center">
        <div className="relative aspect-[640/303] w-full">
          <Image src="/assets/404.png" alt="404" width={640} height={298} />
        </div>
      </div>
      <GoBack />
    </BaseLayout>
  );
};

export default NotFoundPage;
