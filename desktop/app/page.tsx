"use client";

import { useAuth } from "@/hooks/useAuth";

import { logout } from "@/lib/logout";
import Image from "next/image";

export default function Home() {
  const { isAuthenticated, loading, user } = useAuth();

  console.log(isAuthenticated);

  return (
    <div className="">
      {user && <p>{user.email}</p>}
      {user && (
        <Image
          width={800}
          height={800}
          alt="user"
          src={user?.user_metadata.avatar_url}
          className="w-12 aspect-square rounded-full"
        />
      )}
      {isAuthenticated && <button onClick={() => logout()}>logout</button>}
    </div>
  );
}
