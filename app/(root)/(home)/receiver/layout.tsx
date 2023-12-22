import { PropsWithChildren } from "react";

const ReceiverLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[100dvh] bg-background sm:h-screen">
      <main className="flex h-full divide-x-2">
        <section className="pc-main-grid flex-[1]">{children}</section>
      </main>
    </div>
  );
};

export default ReceiverLayout;
