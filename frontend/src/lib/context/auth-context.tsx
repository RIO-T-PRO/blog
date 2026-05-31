import { createContext, useContext, useEffect, useState } from "react";

import { getProfile, logout, signin, signup } from "@/lib/api/auth";

import type { User, SigninPayload, SignupPayload } from "@/types/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  signin: (payload: SigninPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);

  const [initialized, setInitialized] = useState(false);

  // RESTORE SESSION ON APP LOAD
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await getProfile();

        if (response?.data?.profile?.user) {
          setUser(response.data.profile.user);
        }
      } catch (error) {
        console.error("Session restore failed:", error);
        setUser(null);
      } finally {
        setInitialized(true);
      }
    };

    restoreSession();
  }, []);

  const handleSignin = async (payload: SigninPayload): Promise<void> => {
    setLoading(true);

    try {
      const response = await signin(payload);

      if (response?.data?.user) {
        setUser(response.data.user);
      } else {
        console.error("Signin failed: no user data in response");
      }
    } catch (error) {
      console.error("Signin error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (payload: SignupPayload): Promise<void> => {
    setLoading(true);

    try {
      const response = await signup(payload);

      if (response?.data?.user) {
        setUser(response.data.user);
      } else {
        console.error("Signup failed: no user data in response");
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    setLoading(true);

    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initialized,
        signin: handleSignin,
        signup: handleSignup,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
};
