"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

type HashAppRouterInstance = {
  back: () => void;
  forward: () => void;
  refresh: () => void;
  push: (
    href: string,
    options?: Parameters<AppRouterInstance["push"]>[1] & {
      native: boolean;
      state?: any;
    },
  ) => void;
  prefetch: (
    href: string,
    options?: Parameters<AppRouterInstance["push"]>[1] & {
      native: boolean;
    },
  ) => void;
  replace: (
    href: string,
    options?: Parameters<AppRouterInstance["push"]>[1] & {
      native: boolean;
    },
  ) => void;
};

export interface IHashContext extends HashAppRouterInstance {
  hashStack: string[];
  hash: string;
  state?: any;
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
  const nativeRouter = useRouter();
  const [state, setState] = useState<any>(null);
  const [hashStack, setHashStack] = useState<string[]>(
    typeof window !== "undefined"
      ? window.location.hash
        ? [window.location.hash]
        : []
      : [],
  );

  const handleListener = useCallback(
    (event: PopStateEvent) => {
      event.preventDefault();
      const type = event.state.type as keyof HashAppRouterInstance;
      const newHash = window.location.hash;
      setState(event.state?.state);
      switch (type) {
        case "push":
          setHashStack([...hashStack, newHash]);
          break;
        case "back":
        case undefined:
          setHashStack((prev) => {
            prev.pop();
            return [...prev];
          });
          break;
        case "replace":
          setHashStack(newHash ? [newHash] : []);
      }
    },
    [hashStack],
  );

  const push: IHashContext["push"] = (
    href,
    { native, state, ...options } = { native: false },
  ) => {
    if (native) {
      nativeRouter.push(href, options);
      return;
    }
    const newHash = `#${href}`;
    if (hashStack[hashStack.length - 1] !== newHash) {
      window.history.pushState({ ...window.history.state, state }, "", newHash);
      window.dispatchEvent(
        new PopStateEvent("popstate", {
          state: { ...window.history.state, state, type: "push" },
        }),
      );
    }
  };

  const back: IHashContext["back"] = () => {
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
  const replace: IHashContext["replace"] = (href, options) => {
    if (options?.native) {
      nativeRouter.replace(href);
      return;
    }
    const newHash = `#${href}`;
    window.history.replaceState({ ...window.history.state }, "", newHash);
    window.dispatchEvent(
      new PopStateEvent("popstate", {
        state: { ...window.history.state, type: "replace" },
      }),
    );
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
    state,
    hash: hashStack[hashStack.length - 1],
    hashStack,
  };
};

const HashContextProvider = ({ children }: PropsWithChildren) => {
  const router = useHashRouter();
  return <HashContext.Provider value={router}>{children}</HashContext.Provider>;
};

export default HashContextProvider;
