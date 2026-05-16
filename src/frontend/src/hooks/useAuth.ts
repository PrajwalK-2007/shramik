import { createActor } from "@/backend";
import type { backendInterface } from "@/backend";
import type { UserType } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTH_KEY = "shramik_auth";

interface AuthState {
  userType: UserType;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  profession?: string | null;
  verificationStatus?: string | null;
}

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AuthState & { expiry?: number };
      if (parsed.expiry && Date.now() > parsed.expiry) {
        localStorage.removeItem(AUTH_KEY);
        return {
          userType: null,
          userId: null,
          userName: null,
          userEmail: null,
        };
      }
      return parsed;
    }
  } catch {
    // ignore
  }
  return { userType: null, userId: null, userName: null, userEmail: null };
}

function saveAuth(state: AuthState, rememberMe = false) {
  try {
    const data = rememberMe
      ? { ...state, expiry: Date.now() + 30 * 24 * 60 * 60 * 1000 }
      : state;
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

/** Wait up to `maxMs` for actor to become available, polling every `intervalMs` */
async function waitForActor(
  getActor: () => backendInterface | null | undefined,
  maxMs = 12000,
  intervalMs = 300,
): Promise<backendInterface | null> {
  const deadline = Date.now() + maxMs;
  while (Date.now() < deadline) {
    const a = getActor();
    if (a) return a;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return null;
}

export function useAuth() {
  const { actor, isFetching } = useActor(createActor);
  const actorRef = useRef<backendInterface | null>(actor ?? null);
  const [auth, setAuthState] = useState<AuthState>(loadAuth);
  const [actorReady, setActorReady] = useState(!!actor);

  useEffect(() => {
    actorRef.current = actor ?? null;
    if (actor) setActorReady(true);
  }, [actor]);

  const setAuth = useCallback((state: AuthState, rememberMe = false) => {
    saveAuth(state, rememberMe);
    setAuthState(state);
  }, []);

  const loginAsAdmin = useCallback(
    async (
      email: string,
      password: string,
      rememberMe = false,
    ): Promise<{ success: boolean; error?: string }> => {
      // Wait for actor to initialize (up to 12s)
      let a = actorRef.current;
      if (!a) {
        a = await waitForActor(() => actorRef.current);
      }
      if (!a) {
        return {
          success: false,
          error: "Could not connect to server. Please refresh and try again.",
        };
      }
      try {
        const result = await a.adminLogin(email, password);
        if (result.__kind__ === "ok") {
          setAuth(
            {
              userType: "admin",
              userId: "admin",
              userName: result.ok.name,
              userEmail: result.ok.email,
            },
            rememberMe,
          );
          return { success: true };
        }
        return { success: false, error: result.err };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Login failed",
        };
      }
    },
    [setAuth],
  );

  const loginAsWorker = useCallback(
    async (
      email: string,
      password: string,
      rememberMe = false,
    ): Promise<{ success: boolean; error?: string }> => {
      // Wait for actor to initialize (up to 12s)
      let a = actorRef.current;
      if (!a) {
        a = await waitForActor(() => actorRef.current);
      }
      if (!a) {
        return {
          success: false,
          error: "Could not connect to server. Please refresh and try again.",
        };
      }
      try {
        const result = await a.workerLogin(email, password);
        if (result.__kind__ === "ok") {
          setAuth(
            {
              userType: "worker",
              userId: result.ok.id,
              userName: result.ok.name,
              userEmail: result.ok.email,
              profession: result.ok.profession,
              verificationStatus: result.ok.verification_status,
            },
            rememberMe,
          );
          return { success: true };
        }
        return { success: false, error: result.err };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Login failed",
        };
      }
    },
    [setAuth],
  );

  const loginAsSeeker = useCallback(
    async (
      email: string,
      password: string,
      rememberMe = false,
    ): Promise<{ success: boolean; error?: string }> => {
      let a = actorRef.current;
      if (!a) {
        a = await waitForActor(() => actorRef.current);
      }
      if (!a) {
        return {
          success: false,
          error: "Could not connect to server. Please refresh and try again.",
        };
      }
      try {
        const result = await a.seekerLogin(email, password);
        if (result.__kind__ === "ok") {
          setAuth(
            {
              userType: "seeker",
              userId: result.ok.id,
              userName: result.ok.name,
              userEmail: result.ok.email,
            },
            rememberMe,
          );
          return { success: true };
        }
        return { success: false, error: result.err };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Login failed",
        };
      }
    },
    [setAuth],
  );

  /** Set worker session after successful registration (no re-login needed) */
  const setWorkerSession = useCallback(
    (
      id: string,
      name: string,
      email: string,
      profession: string,
      verificationStatus: string,
    ) => {
      setAuth({
        userType: "worker",
        userId: id,
        userName: name,
        userEmail: email,
        profession,
        verificationStatus,
      });
    },
    [setAuth],
  );

  /** Set seeker session after successful registration */
  const setSeekerSession = useCallback(
    (id: string, name: string, email: string) => {
      setAuth({
        userType: "seeker",
        userId: id,
        userName: name,
        userEmail: email,
      });
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setAuthState({
      userType: null,
      userId: null,
      userName: null,
      userEmail: null,
    });
  }, []);

  return {
    userType: auth.userType,
    userId: auth.userId,
    userName: auth.userName,
    userEmail: auth.userEmail,
    profession: auth.profession,
    verificationStatus: auth.verificationStatus,
    isAdmin: auth.userType === "admin",
    isWorker: auth.userType === "worker",
    isSeeker: auth.userType === "seeker",
    isAuthenticated: auth.userType !== null,
    /** True while the backend actor is still initializing */
    isConnecting: !actorReady && isFetching,
    loginAsAdmin,
    loginAsWorker,
    loginAsSeeker,
    setWorkerSession,
    setSeekerSession,
    logout,
  };
}
