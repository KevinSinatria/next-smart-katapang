"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { Profile } from "@/types";
import { getProfile } from "@/lib/actions";
import { prisma } from "./db";
import bcrypt from "bcrypt";

interface AuthContextType {
  user: SupabaseUser | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  // signUp: (
  //   email: string,
  //   password: string,
  //   fullName: string,
  // ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setProfile(data.user);
        setUser(data.user);
      } else {
        setProfile(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
      setUser(null);
    }
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setUser(session?.user ?? null);
    //   if (session?.user) {
    //     fetchProfile(session.user.id);
    //   }
    //   setLoading(false);
    // });
    // const {
    //   data: { subscription },
    // } = supabase.auth.onAuthStateChange((_event, session) => {
    //   setUser(session?.user ?? null);
    //   if (session?.user) {
    //     fetchProfile(session.user.id);
    //   } else {
    //     setProfile(null);
    //   }
    //   setLoading(false);
    // });
    // return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await fetchProfile();
      setLoading(false);
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchProfile();
        return { error: null };
      }

      return { error: new Error(data.message) };
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  // const signUp = async (email: string, password: string, fullName: string) => {
  //   try {
  //     const { error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: {
  //           full_name: fullName,
  //         },
  //       },
  //     });
  //     return { error };
  //   } catch (error) {
  //     return { error: error as Error };
  //   }
  // };

  const signOut = async () => {
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setUser(null);
        setProfile(null);
        return { error: null };
      }

      return { error: new Error(data.message) };
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        // signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
