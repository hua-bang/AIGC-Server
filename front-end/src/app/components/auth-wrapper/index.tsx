"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Session, createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getUserInfo } from "@/app/apis/user";
import { setAccessToken } from "@/app/utils/access-token-storage";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

type UserInfo = Record<string, any>;

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const fetchUserInfo = async () => {
    const { data } = await getUserInfo();

    setUserInfo(data);
  };

  const initSession = () => {
    supabase.auth.getSession().then(({ data: { session: nextSession } }) => {
      setSession(nextSession);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  };

  useEffect(() => initSession(), []);

  useEffect(() => {
    session && fetchUserInfo();
    setAccessToken(session?.access_token);
  }, [session]);

  if (!session) {
    return (
      <Auth
        providers={["github"]}
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
      />
    );
  }

  return children;
};

interface AuthWrapperProps {
  children?: ReactNode;
}

export default AuthWrapper;
