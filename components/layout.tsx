import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DefaultLayout = ({ children, ...rest }: LayoutProps) => {
  return (
    <div {...rest} className={cn("h-[100dvh] sm:h-screen", rest.className)}>
      <main className="divide-x-3 flex h-full">
        <section className="pc-main-grid flex flex-[1] flex-col overflow-x-clip">
          {children}
        </section>
      </main>
    </div>
  );
};

export default DefaultLayout;
