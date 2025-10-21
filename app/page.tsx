import Image from "next/image";

//add signin button
'use client'

import { useSession, signOut } from "next-auth/react";
import SignIn from "./auth/signin/page";
import { Session } from "next-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return null; 
  }

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <>
          <h1 className="text-2xl font-bold mb-2">Welcome, {session.user.name}</h1>
          <p>Email: {session.user.email}</p>
        </>
      ) : (
        <SignIn/>
      )}
    </div>
  );
      
}

