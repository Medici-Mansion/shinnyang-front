import Image from "next/image";

export default function SignOutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-yellow-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center bg-gradient-to-b from-red-400 pb-6 pt-8 backdrop-blur-2xl text-2xl">
          {/* 신냥이 우체국 */}
        </p>
      </div>

      <Image
        className="relative"
        src="/cat.gif"
        alt="Next.js Logo"
        width={450}
        height={70}
        priority
      />

      <div className=" grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/signin"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 "
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold text-red-400`}>
            로그인 완료{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </a>
      </div>
    </main>
  );
}
