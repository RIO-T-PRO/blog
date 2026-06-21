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
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await getProfile();

        setUser(response.data.user);
      } catch (error) {
        console.error("Session restore failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    restoreSession();
  }, []);

  const handleSignin = async (payload: SigninPayload): Promise<void> => {
    setLoading(true);
    try {
      const response = await signin(payload);
      console.log("signin response:", response);
      console.log("user from response:", response.data.user);
      console.log("user from profile:", response.data.profile);
      setUser(response.data.user);
    } catch (error) {
      console.error("Signin error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (payload: SignupPayload): Promise<void> => {
    setLoading(true);

    try {
      const response = await signup(payload);

      setUser(response.data.user);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
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
      throw error;
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
