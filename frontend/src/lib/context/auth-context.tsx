import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteUser,
  getProfile,
  logout,
  signin,
  signup,
  updateProfile,
} from "@/lib/api/auth";
import type {
  User,
  Profile,
  SigninPayload,
  SignupPayload,
  UpdateProfilePayload,
} from "@/types/auth";
import { clearAccessToken } from "../api/refresh";

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  signin: (payload: SigninPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  deleteUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await getProfile();
        setUser(response.data.user);
        setProfile(response.data.profile ?? null);
      } catch (error) {
        console.error("Session restore failed:", error);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };
    restoreSession();
  }, []);

  const handleSignin = async (payload: SigninPayload) => {
    setLoading(true);
    try {
      const response = await signin(payload);
      setUser(response.data.user);
      setProfile(response.data.profile ?? null);
    } catch (error) {
      console.error("Signin error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (payload: SignupPayload) => {
    setLoading(true);
    try {
      const response = await signup(payload);
      setUser(response.data.user);
      setProfile(response.data.profile ?? null);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setProfile(null);
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (payload: UpdateProfilePayload) => {
    setLoading(true);
    try {
      const response = await updateProfile(payload);
      setProfile(response.data.profile ?? null);
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!user) throw new Error("No authenticated user");
    setLoading(true);
    try {
      await deleteUser(user.id);
      // Account deleted – clear all state and tokens
    } catch (error) {
      console.error("Delete user error:", error);
      throw error;
    } finally {
      // Always clean up local state, even on error (e.g., if token already invalid)
      clearAccessToken();
      setUser(null);
      setProfile(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        initialized,
        signin: handleSignin,
        signup: handleSignup,
        logout: handleLogout,
        updateProfile: handleUpdateProfile,
        deleteUser: handleDeleteUser,
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
