interface LayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div className="h-[100dvh] sm:h-screen">
      <main className="divide-x-3 flex h-full">
        <section className="pc-main-grid flex-[1] ">{children}</section>
      </main>
    </div>
  );
};

export default DefaultLayout;
