"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface IHashContext extends AppRouterInstance {
  hashStack: string[];
  hash: string;
}
const initialContext: IHashContext = {
  hashStack: [],
  hash: "",
  back() {},
  forward() {},
  prefetch() {},
  push() {},
  refresh() {},
  replace() {},
};
export const HashContext = createContext<IHashContext>(initialContext);
const useHashRouter = (): IHashContext => {
  const [hashStack, setHashStack] = useState<string[]>([
    typeof window !== "undefined" ? window.location.hash : "",
  ]);

  const handleListener = useCallback(
    (event: PopStateEvent) => {
      event.preventDefault();
      const newHash = event.state?.hash as string;
      setHashStack([...hashStack, newHash || ""]);
    },
    [hashStack]
  );

  const push: AppRouterInstance["push"] = (href, options) => {
    const newHash = `#${href}`;
    if (hashStack[hashStack.length - 1] !== newHash) {
      window.history.pushState(
        { ...window.history.state, hash: newHash },
        "",
        newHash
      );
      window.dispatchEvent(
        new PopStateEvent("popstate", {
          state: { ...window.history.state, hash: newHash },
        })
      );
    }
  };

  const back: AppRouterInstance["back"] = () => {
    window.history.back();
  };

  const forward = () => {
    throw new Error("Not Implement");
  };
  const prefetch = () => {
    throw new Error("Not Implement");
  };
  const refresh = () => {
    throw new Error("Not Implement");
  };
  const replace = () => {
    throw new Error("Not Implement");
  };

  useEffect(() => {
    window.addEventListener("popstate", handleListener);
    return () => {
      window.removeEventListener("popstate", handleListener);
    };
  }, [handleListener]);
  return {
    push,
    back,
    forward,
    prefetch,
    refresh,
    replace,
    hash: hashStack[hashStack.length - 1],
    hashStack,
  };
};

const HashContextProvider = ({ children }: PropsWithChildren) => {
  const router = useHashRouter();
  return <HashContext.Provider value={router}>{children}</HashContext.Provider>;
};

export default HashContextProvider;
