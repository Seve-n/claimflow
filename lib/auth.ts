"use client";

import * as React from "react";
import type { User } from "@/types";
import { mockUser } from "@/lib/mock-data";

// Mock client-side auth for this portfolio demo — no real backend, no real secrets.

const DEMO_EMAIL = "demo@claimflow.app";
const DEMO_PASSWORD = "Demo123!";

const SESSION_KEY = "claimflow.session";
const ACCOUNTS_KEY = "claimflow.accounts";

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface StoredAccount extends SignupData {
  id: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

function readAccounts(): StoredAccount[] {
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]): void {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function accountToUser(account: StoredAccount): User {
  return {
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    phone: "",
    address: "",
    createdAt: new Date().toISOString(),
  };
}

function readSession(): User | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function writeSession(user: User | null): void {
  if (user) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

// Reading localStorage during render would mismatch the server-rendered HTML (which has no
// access to it), so we gate that read behind useSyncExternalStore's client/server snapshot
// split — it resolves to the server value on the first paint and to the real client value
// right after hydration, without calling setState from inside an effect.
function subscribeToNothing() {
  return () => {};
}
function getIsClientSnapshot() {
  return true;
}
function getIsClientServerSnapshot() {
  return false;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isClient = React.useSyncExternalStore(
    subscribeToNothing,
    getIsClientSnapshot,
    getIsClientServerSnapshot
  );
  // Bumped after login/logout/signup so the derived `user` below re-reads localStorage.
  const [sessionVersion, setSessionVersion] = React.useState(0);

  const user = React.useMemo<User | null>(() => {
    if (!isClient) return null;
    return readSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sessionVersion intentionally forces a re-read
  }, [isClient, sessionVersion]);

  const login = React.useCallback(async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === DEMO_EMAIL && password === DEMO_PASSWORD) {
      writeSession(mockUser);
      setSessionVersion((v) => v + 1);
      return;
    }

    const account = readAccounts().find(
      (acc) => acc.email.toLowerCase() === normalizedEmail && acc.password === password
    );

    if (!account) {
      throw new Error("Invalid email or password.");
    }

    writeSession(accountToUser(account));
    setSessionVersion((v) => v + 1);
  }, []);

  const logout = React.useCallback(() => {
    writeSession(null);
    setSessionVersion((v) => v + 1);
  }, []);

  const signup = React.useCallback(async (data: SignupData) => {
    const normalizedEmail = data.email.trim().toLowerCase();

    if (normalizedEmail === DEMO_EMAIL) {
      throw new Error("This email is reserved for the demo account.");
    }

    const accounts = readAccounts();
    if (accounts.some((acc) => acc.email.toLowerCase() === normalizedEmail)) {
      throw new Error("An account with this email already exists.");
    }

    const account: StoredAccount = {
      id: `usr-${Date.now().toString(36)}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.trim(),
      password: data.password,
    };

    writeAccounts([...accounts, account]);
    writeSession(accountToUser(account));
    setSessionVersion((v) => v + 1);
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading: !isClient,
      login,
      logout,
      signup,
    }),
    [user, isClient, login, logout, signup]
  );

  return React.createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
