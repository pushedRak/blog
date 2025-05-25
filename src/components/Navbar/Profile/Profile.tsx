"use client";

import styles from "./Profile.module.css";
import { createClient } from "@utils/supabase/client";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import Flex from "../../Flex/Flex";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setIsAdmin(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setIsAdmin(session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <div className={styles.profileWrapper} ref={profileRef}>
      <div className={styles.profileTrigger} onClick={toggleMenu}>
        {user && (
          <Image
            className={styles.profileImage}
            alt="user_avatar"
            src={user.user_metadata?.avatar_url}
            fill
          />
        )}
      </div>

      {isMenuOpen && (
        <div className={styles.profileMenu}>
          {user ? (
            <>
              <Flex gap={"sm"} className={styles.profileSection}>
                <div className={styles.profileImageWrapper}>
                  <Image
                    className={styles.profileImage}
                    alt="user_avatar"
                    src={user.user_metadata?.avatar_url}
                    fill
                  />
                </div>
                <div>
                  <p>{user.user_metadata?.preferred_username}</p>
                  <p className={styles.email}>{user.user_metadata?.email}</p>
                </div>
              </Flex>
              <div className={styles.divider} />
              <div className={styles.section}>
                {isAdmin && (
                  <div className={styles.button}>
                    <Link href="/admin/write">글쓰기</Link>
                  </div>
                )}
                <div className={styles.button} onClick={handleLogout}>
                  로그아웃
                </div>
              </div>
            </>
          ) : (
            <div className={styles.button} onClick={handleLogin}>
              로그인
            </div>
          )}
        </div>
      )}
    </div>
  );
}
