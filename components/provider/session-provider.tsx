"use client";
import { Session, SessionController } from "@/type";
import {
  PropsWithChildren,
  createContext,
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

export type SessionContextValue<R extends boolean = false> = R extends true
  ?
      | { data: Session; status: "authenticated" }
      | { data: null; status: "loading" }
  :
      | { data: Session; status: "authenticated" }
      | {
          data: null;
          status: "unauthenticated" | "loading";
        };
export const SessionContext = createContext?.<SessionContextValue | undefined>(
  undefined,
);

export function useSession<R extends boolean>(
  options?: any,
): SessionContextValue<R> {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }

  // @ts-expect-error Satisfy TS if branch on line below
  const value: SessionContextValue<R> = useContext(SessionContext);
  if (!value && process.env.NODE_ENV !== "production") {
    throw new Error(
      "[next-auth]: `useSession` must be wrapped in a <SessionProvider />",
    );
  }

  const { required, onUnauthenticated } = options ?? {};

  const requiredAndNotLoading = required && value.status === "unauthenticated";

  // useEffect(() => {
  //   if (requiredAndNotLoading) {
  //     const url = `/api/auth/signin?${new URLSearchParams({
  //       error: "SessionRequired",
  //       callbackUrl: window.location.href,
  //     })}`;
  //     if (onUnauthenticated) onUnauthenticated();
  //     else window.location.href = url;
  //   }
  // }, [requiredAndNotLoading, onUnauthenticated]);

  if (requiredAndNotLoading) {
    return {
      data: value.data,
      status: "loading",
    };
  }

  return value;
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
  const { children, basePath, refetchOnWindowFocus = true } = props;
  // TODO: env 백앤드 && 리다이렉트 url 연동
  const apiUrl = basePath || process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    __SESSION__._getSession = async () => {
      try {
        const { access, refresh } = session?.token || {};
        let token: Session["token"] = { access, refresh };
        if (!access) {
          if (refresh) {
            token = await getNewToken(refresh);
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
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    if (initial.current) {
      __SESSION__._getSession();
      initial.current = false;
    }
    return () => {
      __SESSION__.lastSync = 0;
      __SESSION__.session = null;
      __SESSION__._getSession = () => {};
    };
  }, [session]);
  useEffect(() => {
    const visibilityHandler = () => {
      console.log(document.cookie);
      if (refetchOnWindowFocus && document.visibilityState === "visible")
        __SESSION__._getSession();
    };
    document.addEventListener("visibilitychange", visibilityHandler, false);
    return () =>
      document.removeEventListener(
        "visibilitychange",
        visibilityHandler,
        false,
      );
  }, [refetchOnWindowFocus]);

  const value: any = useMemo(
    () => ({
      data: session,
      status: loading
        ? "loading"
        : session
          ? "authenticated"
          : "unauthenticated",
    }),
    [loading, session],
  );
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
