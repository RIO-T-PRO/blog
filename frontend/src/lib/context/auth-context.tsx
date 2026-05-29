import { createContext, useContext, useEffect, useState } from "react";

import { getProfile } from "@/lib/api/auth";

import type { User } from "@/types/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  // logout: () => Promise<void>;
  // updateUser: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((res) => {
        if (!res) {
          setUser(null);
          return;
        }

        setUser(res.data.profile.user);
      })
      .finally(() => setLoading(false));
  }, []);

  // const logout = async () => {
  //   await apiLogout().catch(() => {});
  //   setUser(null);
  // };

  // const updateUser = (data: Partial<User>) => {
  //   setUser((prev) => (prev ? { ...prev, ...data } : prev));
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
};
