import { createContext, useContext, useState } from "react";
import { logout, signin, signup } from "@/lib/api/auth";
import type { User, SigninPayload, SignupPayload } from "@/types/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signin: (payload: SigninPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignin = async (payload: SigninPayload) => {
    setLoading(true);
    try {
      const response = await signin(payload);
      if (response?.data) {
        setUser(response.data);
      } else {
        console.error("Signin failed: no user data in response");
      }
    } catch (error) {
      console.error("Signin error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (payload: SignupPayload) => {
    setLoading(true);
    try {
      const response = await signup(payload);
      if (response?.data) {
        setUser(response.data);
      } else {
        console.error("Signup failed: no user data in response");
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
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
        signin: handleSignin,
        signup: handleSignup,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
