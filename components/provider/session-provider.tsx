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
import { getMe, getNewToken } from "@/apis";
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
      serviceName: string;
      onUnauthenticated?: () => void;
    }
  : {
      required: R;
      serviceName?: string;
      onUnauthenticated?: () => void;
    };

type SessionHandler = {
  signin: () => void;
};
export function useSession<T extends boolean>(
  options?: UseSessionOptions<T>,
): SessionContextValue & SessionHandler {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }

  const value = useContext(SessionContext);
  if (!value && process.env.NODE_ENV !== "production") {
    throw new Error(
      "[next-auth]: `useSession` must be wrapped in a <SessionProvider />",
    );
  }

  const { required, onUnauthenticated, serviceName } = options ?? {};

  const requiredAndNotLoading = required && value?.status === "unauthenticated";
  const signin = useCallback(() => {
    const url = `/api/auth/signin/${serviceName}?${new URLSearchParams({
      callbackUrl: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,
    })}`;
    if (onUnauthenticated) onUnauthenticated();
    else window.location.href = url;
  }, [onUnauthenticated, serviceName]);

  useEffect(() => {
    if (requiredAndNotLoading) {
      signin();
    }
  }, [requiredAndNotLoading, onUnauthenticated, serviceName, signin]);

  if (requiredAndNotLoading) {
    return {
      data: null,
      status: "loading",
      update: value.update,
      signin,
    };
  }

  return Object.assign(value!, { signin });
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
        const { access, refresh } = session?.token || {};
        let token: Session["token"] = { access, refresh };
        if (!access) {
          if (refresh) {
            token = await getNewToken(refresh);
            console.log(token);
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
      : session
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
