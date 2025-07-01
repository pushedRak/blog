import { supabase } from "@lib/supabase/client";
import styles from "./UserAvatar.module.css";
import SafeImage from "@shared/components/SafeImage";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export default function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOwner = userProfile?.role === "owner";
  const canManageUsers = isOwner;

  console.log({ user, userProfile });

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const initializeUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      if (data.user) {
        await fetchUserProfile(data.user.id)
          .then((profile) => {
            setUserProfile(profile);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      setLoading(false);
    };

    initializeUser();

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);
        const profile = await fetchUserProfile(session.user.id);
        setUserProfile(profile);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (loading) return <div>{user?.user_metadata.avatar_url || ""}</div>;

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.profileImageWrapper}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <SafeImage
          alt="profileImage"
          src={user?.user_metadata?.avatar_url || ""}
          fill
        />
        {isOwner && <div className={styles.ownerBadge}>👑</div>}
      </div>

      {isOpen && (
        <div className={styles.profileMenu}>
          {user ? (
            <>
              <div className={styles.userInfo}>
                <p>{user.email}</p>
              </div>

              {canManageUsers && (
                <div className={styles.adminSection}>
                  <p className={styles.adminText}>관리자 권한</p>
                  <button className={styles.adminButton}>글쓰깅</button>
                </div>
              )}

              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <button onClick={handleLogin}>Github로 로그인</button>
          )}
        </div>
      )}
    </div>
  );
}
