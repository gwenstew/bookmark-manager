//handle signin here
//will need use session to connect session interface to account db table
//next nav for navigation
// use effect possibly
'use client';

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function SignIn() {
    const { data: session } = useSession();
    const router = useRouter();

    //redirect user to home page if signed in
    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    const handleGoogleSignIn = async () => {
        await signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
            <button onClick={() => handleGoogleSignIn()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Sign in with Google
            </button>
        </div>
    );
}


