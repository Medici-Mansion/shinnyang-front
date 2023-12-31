"use client";
import { Session, SessionController } from "@/type";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { api, getMe, getNewToken } from "@/apis";
import { PROVIDER, ServiceProviderType, ServiceProviders } from "@/constants";
import { z } from "zod";
import { useRouter } from "next/navigation";
const __SESSION__: SessionController = {
  _getSession: () => {},
  lastSync: 0,
  session: null,
};

export function now() {
  return Math.floor(Date.now() / 1000);
}

type UpdateSession = (data?: any) => Promise<Session | null>;

export type SessionContextValue =
  | { data: Session; status: "authenticated"; update: UpdateSession }
  | {
      data: null;
      status: "unauthenticated" | "loading";
      update: UpdateSession;
    };
export const SessionContext = createContext?.<SessionContextValue | undefined>(
  undefined,
);
type UseSessionOptions<R extends boolean> = R extends true
  ? {
      required: R;
      serviceName: z.infer<typeof ServiceProviders>;
      onUnauthenticated?: () => void;
    }
  : {
      required: R;
      serviceName?: z.infer<typeof ServiceProviders>;
      onUnauthenticated?: () => void;
    };

type SessionHandler = {
  signin: (args?: {
    provider?: ServiceProviderType;
    callbackUrl?: string;
  }) => void;
  signout: () => Promise<void>;
};
export function useSession<T extends boolean>(
  options?: UseSessionOptions<T>,
): SessionContextValue & SessionHandler {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }

  const router = useRouter();

  const value = useContext(SessionContext);
  if (!value && process.env.NODE_ENV !== "production") {
    throw new Error(
      "[next-auth]: `useSession` must be wrapped in a <SessionProvider />",
    );
  }

  const { required, onUnauthenticated, serviceName = "kakao" } = options ?? {};

  const requiredAndNotLoading = required && value?.status === "unauthenticated";
  const signin: SessionHandler["signin"] = useCallback(
    (args) => {
      const service = args?.provider || serviceName;
      const url = `/api/auth/signin/${service}?${new URLSearchParams({
        callbackUrl: PROVIDER[service].redirectUrl,
      })}`;
      if (args?.callbackUrl) {
        sessionStorage.setItem("callbackUrl", args.callbackUrl);
      }
      if (onUnauthenticated) onUnauthenticated();
      else window.location.href = url;
    },
    [onUnauthenticated, serviceName],
  );

  const signout: SessionHandler["signout"] = useCallback(async () => {
    const url = `/api/auth/signout`;
    await fetch(url, {
      method: "POST",
    });
    window.location.href = window.location.origin;
  }, []);

  useEffect(() => {
    const callbackUrl = sessionStorage.getItem("callbackUrl");
    if (callbackUrl) {
      sessionStorage.removeItem("callbackUrl");
      router.replace(callbackUrl);
    }

    if (requiredAndNotLoading) {
      signin();
    }
  }, [requiredAndNotLoading, onUnauthenticated, serviceName, signin, router]);

  if (requiredAndNotLoading) {
    return {
      data: null,
      status: value.status,
      update: value.update,
      signin,
      signout,
    };
  }

  return Object.assign(value!, { signin, signout });
}

export function SessionProvider(
  props: PropsWithChildren<{
    basePath?: string;
    refetchInterval?: boolean;
    session: Session | null;
    refetchOnWindowFocus?: boolean;
  }>,
) {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }

  const hasInitialSession = props.session !== undefined;
  const initial = useRef<boolean>(true);

  const [loading, setLoading] = useState(!hasInitialSession);
  const [session, setSession] = useState(() => {
    if (hasInitialSession) __SESSION__.session = props.session;
    return props.session;
  });
  const __SESSION = useMemo(() => {
    if (typeof window !== "undefined") {
      window.__SESSION__ = new Proxy(__SESSION__, {
        get(obj, key, proxy) {
          console.log(key);
          if ("session" === key) return null;
          return obj[key as keyof typeof obj];
        },
        set(target, p, newValue, receiver) {
          return true;
        },
      });
    }

    return __SESSION__;
  }, []);

  const { children, basePath, refetchOnWindowFocus = true } = props;
  // TODO: env 백앤드 && 리다이렉트 url 연동
  const apiUrl = basePath || process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    __SESSION._getSession = async (isFocus?: boolean) => {
      try {
        let { token } = session || {};

        if (token?.access) {
          api.defaults.headers["Authorization"] = `Bearer ${token.access}`;
        } else {
          if (token?.refresh) {
            token = await getNewToken(token.refresh);
          } else {
            __SESSION.lastSync = 0;
            __SESSION.session = null;
          }
        }

        if (token?.access) {
          const newSession = {
            token,
            user: await getMe(token.access),
          };
          __SESSION__.lastSync = now();
          __SESSION__.session = newSession;
          setSession(newSession);
        }
      } catch (error: any) {
        console.error("[SESSION_PROVIDER]: getSession:", error?.message);
        __SESSION.lastSync = 0;
        __SESSION.session = null;
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    if (initial.current) {
      __SESSION._getSession();
      initial.current = false;
    }
  }, [__SESSION, session]);
  useEffect(() => {
    /**
     * 포커스 시 refetch 여부
     */
    const visibilityHandler = () => {
      if (refetchOnWindowFocus && document.visibilityState === "visible") {
        __SESSION._getSession();
      }
    };
    document.addEventListener("visibilitychange", visibilityHandler, false);

    return () => {
      __SESSION.lastSync = 0;
      __SESSION.session = null;
      // __SESSION._getSession = () => {};
      document.removeEventListener(
        "visibilitychange",
        visibilityHandler,
        false,
      );
    };
  }, [__SESSION, refetchOnWindowFocus]);
  const value = useMemo(() => {
    const status = loading
      ? "loading"
      : session?.user
        ? "authenticated"
        : "unauthenticated";
    const data = status === "authenticated" ? session : null;
    return {
      status,
      data,
      update: async (callback?: () => void) => {
        await __SESSION._getSession();
        callback && callback();
      },
    };
  }, [__SESSION, loading, session]);
  return (
    <SessionContext.Provider value={value as any}>
      {children}
    </SessionContext.Provider>
  );
}
